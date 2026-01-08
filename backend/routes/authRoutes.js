const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite Database
// Adjust path to point to 'data' folder in backend
const dbPath = path.join(__dirname, '../data/frailty_test_results.db');
console.log('📂 Database path:', dbPath); // Debug log
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database for Auth.');
        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT,
      personal_details TEXT, -- Stores JSON string
      subscription_plan TEXT, -- 'Free Trial', 'Individual', etc.
      subscription_status TEXT, -- 'Active', 'Inactive'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
            if (err) {
                console.error('❌ Error creating users table:', err.message);
            } else {
                console.log('✅ Users table ready.');
                // Attempt to add columns for existing tables (will fail harmlessly if exists)
                db.run("ALTER TABLE users ADD COLUMN subscription_plan TEXT", () => { });
                db.run("ALTER TABLE users ADD COLUMN subscription_status TEXT", () => { });
            }
        });
    }
});

// SIGNUP Endpoint
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if user exists
    db.get('SELECT email FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Server error check.' });
        }
        if (row) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // Insert new user
        const sql = `INSERT INTO users (name, email, password, subscription_plan, subscription_status) VALUES (?, ?, ?, ?, ?)`;
        const params = [name, email, password, 'None', 'Inactive'];

        db.run(sql, params, function (err) {
            if (err) {
                console.error('Insert error:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to create user.' });
            }

            const userId = this.lastID;
            console.log(`✅ User created: ${email}, ID: ${userId}`);

            // Auto-login (Create Session)
            req.session.user = { id: userId, name, email };
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Session init failed.' });
                }
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully!',
                    user: {
                        id: userId,
                        name,
                        email,
                        hasPersonalDetails: false,
                        subscription_plan: 'None',
                        subscription_status: 'Inactive'
                    }
                });
            });
        });
    });
});

// LOGIN Endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
        if (!row) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        console.log(`✅ User logged in: ${email}`);

        // Manual session set for local auth
        req.session.user = { id: row.id, name: row.name, email: row.email };

        // Explicitly save session before responding
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ success: false, message: 'Session save failed.' });
            }

            console.log('✅ Session saved successfully with user:', req.session.user);

            const hasPersonalDetails = !!(row.personal_details && row.personal_details.trim() !== '' && row.personal_details !== '{}');

            res.json({
                success: true,
                message: 'Login successful!',
                user: {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    hasPersonalDetails,
                    subscription_plan: row.subscription_plan || 'None',
                    subscription_status: row.subscription_status || 'Inactive'
                }
            });
        });
    });
});

module.exports = router;
