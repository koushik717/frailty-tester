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

// Google OAuth Strategy - Only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            // Check if user exists with this Google ID
            db.get('SELECT * FROM users WHERE google_id = ?', [profile.id], (err, user) => {
                if (err) return done(err);

                if (user) {
                    // User exists, log them in
                    return done(null, user);
                } else {
                    // Create new user
                    const name = profile.displayName || profile.name.givenName;
                    const email = profile.emails[0].value;

                    const sql = 'INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)';
                    db.run(sql, [name, email, profile.id], function (err) {
                        if (err) {
                            // Check if email already exists
                            db.get('SELECT * FROM users WHERE email = ?', [email], (err2, existingUser) => {
                                if (existingUser) {
                                    // Update existing user with Google ID
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
        }
    ));
    console.log('✅ Google OAuth initialized');
} else {
    console.log('⚠️  Google OAuth not configured (missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)');
}

// Routes
router.get('/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(500).json({
            success: false,
            message: 'Google OAuth is not configured. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env file.'
        });
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        const user = { id: req.user.id, name: req.user.name, email: req.user.email };

        // Redirect to frontend with user data
        // In a real app, you'd use JWT or session
        res.redirect(`http://localhost:5173/auth-success?user=${encodeURIComponent(JSON.stringify(user))}`);
    }
);

module.exports = router;
