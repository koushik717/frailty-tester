const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite Database
const dbPath = path.join(__dirname, '../data/frailty_test_results.db');
const db = new sqlite3.Database(dbPath);

// Ensure users table has google_id column
db.run(`ALTER TABLE users ADD COLUMN google_id TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
        console.error('Error adding google_id column:', err.message);
    }
});

// Make password nullable for Google users
db.run(`CREATE TABLE IF NOT EXISTS users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  google_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.log('Users table already has correct schema or error:', err.message);
    }
});

// Passport serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        done(err, user);
    });
});

// Google OAuth Strategy
const MockStrategy = require('passport-mock-strategy');

// Check for real credentials
const hasRealCreds = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id_here' && process.env.GOOGLE_CLIENT_SECRET;
const useMock = process.env.USE_MOCK_AUTH === 'true' || !hasRealCreds;

if (!useMock) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            findOrCreateUser(profile, done);
        }
    ));
    console.log('✅ Google OAuth initialized (Real)');
} else {
    // initialize logic for finding/creating user to be reused
}

// Reusable find/create logic
const findOrCreateUser = (profile, done) => {
    // Check if user exists with this Google ID
    db.get('SELECT * FROM users WHERE google_id = ?', [profile.id], (err, user) => {
        if (err) return done(err);

        if (user) {
            return done(null, user);
        } else {
            const name = profile.displayName || (profile.name ? profile.name.givenName : 'Google User');
            const email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : `${profile.id}@gmail.com`;

            const sql = 'INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)';
            db.run(sql, [name, email, profile.id], function (err) {
                if (err) {
                    db.get('SELECT * FROM users WHERE email = ?', [email], (err2, existingUser) => {
                        if (existingUser) {
                            db.run('UPDATE users SET google_id = ? WHERE email = ?', [profile.id, email], (err3) => {
                                if (err3) return done(err3);
                                return done(null, existingUser);
                            });
                        } else {
                            return done(err);
                        }
                    });
                } else {
                    const newUser = { id: this.lastID, name, email, google_id: profile.id };
                    return done(null, newUser);
                }
            });
        }
    });
};

if (useMock) {
    // Mock Strategy
    passport.use(new MockStrategy({
        name: 'google',
        user: {
            id: 'mock-google-id-123',
            displayName: 'Mock Google User',
            name: { givenName: 'Mock', familyName: 'User' },
            emails: [{ value: 'mock.google@example.com' }],
            provider: 'google'
        }
    }, (user, done) => {
        // transform mock user to profile format expected by findOrCreate
        findOrCreateUser(user, done);
    }));
    console.log('⚠️  Using MOCK Google OAuth (Simulated Login Enabled)');
}

// Routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
    (req, res) => {
        // If using MockStrategy, passport.authenticate calls next() on success.
        // We manually redirect to the callback to simulate the OAuth flow.
        res.redirect('/api/auth/google/callback');
    }
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        const pDetails = req.user.personal_details;
        const hasPersonalDetails = !!(pDetails && pDetails.trim() !== '' && pDetails !== '{}');

        const user = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            hasPersonalDetails
        };

        // Redirect to frontend with user data
        // In a real app, you'd use JWT or session
        res.redirect(`http://localhost:5173/auth-success?user=${encodeURIComponent(JSON.stringify(user))}`);
    }
);

module.exports = router;
