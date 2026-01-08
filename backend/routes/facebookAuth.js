const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite Database
const dbPath = path.join(__dirname, '../data/frailty_test_results.db');
const db = new sqlite3.Database(dbPath);

// Ensure users table has facebook_id column
db.run(`ALTER TABLE users ADD COLUMN facebook_id TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
        console.error('Error adding facebook_id column:', err.message);
    }
});

// Facebook OAuth Strategy
const MockStrategy = require('passport-mock-strategy');

// Check for credentials
const hasRealCreds = process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_ID !== 'your_app_id' && process.env.FACEBOOK_APP_SECRET;
const useMock = process.env.USE_MOCK_AUTH === 'true' || !hasRealCreds;

if (!useMock) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name']
    },
        (accessToken, refreshToken, profile, done) => {
            findOrCreateUser(profile, done);
        }
    ));
    console.log('✅ Facebook OAuth initialized (Real)');
} else {
    // initialize shared logic
}

const findOrCreateUser = (profile, done) => {
    db.get('SELECT * FROM users WHERE facebook_id = ?', [profile.id], (err, user) => {
        if (err) return done(err);

        if (user) {
            return done(null, user);
        } else {
            const name = (profile.name && profile.name.givenName)
                ? `${profile.name.givenName} ${profile.name.familyName}`
                : (profile.displayName || 'Facebook User');

            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@facebook.com`;

            const sql = 'INSERT INTO users (name, email, facebook_id) VALUES (?, ?, ?)';
            db.run(sql, [name, email, profile.id], function (err) {
                if (err) {
                    db.get('SELECT * FROM users WHERE email = ?', [email], (err2, existingUser) => {
                        if (existingUser) {
                            db.run('UPDATE users SET facebook_id = ? WHERE email = ?', [profile.id, email], (err3) => {
                                if (err3) return done(err3);
                                return done(null, existingUser);
                            });
                        } else {
                            return done(err);
                        }
                    });
                } else {
                    const newUser = { id: this.lastID, name, email, facebook_id: profile.id };
                    return done(null, newUser);
                }
            });
        }
    });
};

if (useMock) {
    passport.use(new MockStrategy({
        name: 'facebook',
        user: {
            id: 'mock-facebook-id-456',
            displayName: 'Mock Facebook User',
            name: { givenName: 'Mock', familyName: 'Facebook' },
            emails: [{ value: 'mock.facebook@example.com' }],
            provider: 'facebook'
        }
    }, (user, done) => {
        findOrCreateUser(user, done);
    }));
    console.log('⚠️  Using MOCK Facebook OAuth (Simulated Login Enabled)');
}

// Routes
router.get('/facebook', (req, res, next) => {
    // Route guard removed to allow Mock Strategy
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
});

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        const user = { id: req.user.id, name: req.user.name, email: req.user.email };
        res.redirect(`http://localhost:5173/auth-success?user=${encodeURIComponent(JSON.stringify(user))}`);
    }
);

module.exports = router;
