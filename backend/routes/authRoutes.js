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
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
            if (err) {
                console.error('❌ Error creating users table:', err.message);
            } else {
                console.log('✅ Users table ready.');
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

    // Check if user already exists
    const checkSql = 'SELECT * FROM users WHERE email = ?';
    db.get(checkSql, [email], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
        if (row) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Insert new user
        // NOTE: In production, password should be hashed!
        const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.run(insertSql, [name, email, password], function (err) {
            if (err) {
                console.error('Insert error:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to register user.' });
            }
            console.log(`✅ User registered: ${email}`);
            res.json({ success: true, message: 'User registered successfully!' });
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
        // In production, return a JWT token here
        res.json({
            success: true,
            message: 'Login successful!',
            user: { id: row.id, name: row.name, email: row.email }
        });
    });
});

module.exports = router;
