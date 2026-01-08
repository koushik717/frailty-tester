const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize Database Connection
const dbPath = path.join(__dirname, '../data/frailty_test_results.db');
const db = new sqlite3.Database(dbPath);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log('Checking Auth for:', req.originalUrl);
    console.log('Session User:', req.session?.user);

    if (req.session && req.session.user) {
        return next();
    }
    console.log('❌ Unauthorized Access Attempt');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
};

// GET /api/user/details
router.get('/details', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;

    db.get('SELECT personal_details FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        let details = null;
        if (row && row.personal_details) {
            try {
                details = JSON.parse(row.personal_details);
            } catch (e) {
                console.error('JSON parse error:', e);
            }
        }

        res.json({ success: true, details });
    });
});

// POST /api/user/update-details
router.post('/update-details', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    const details = req.body;

    const detailsString = JSON.stringify(details);

    db.run('UPDATE users SET personal_details = ? WHERE id = ?', [detailsString, userId], function (err) {
        if (err) {
            console.error('Update error:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to update details' });
        }

        console.log(`✅ Personal details updated for user ${userId}`);
        res.json({ success: true, message: 'Details updated successfully' });
    });
});

// POST /api/user/subscription - Update subscription plan
router.post('/subscription', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    const { plan, status } = req.body; // e.g., plan='Individual', status='Active'

    db.run(
        'UPDATE users SET subscription_plan = ?, subscription_status = ? WHERE id = ?',
        [plan, status, userId],
        function (err) {
            if (err) {
                console.error('Subscription update error:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to update subscription' });
            }

            console.log(`✅ Subscription updated for user ${userId}: ${plan} (${status})`);

            // Update session data
            if (req.session.user) {
                req.session.user.subscription_plan = plan;
                req.session.user.subscription_status = status;
                req.session.save(); // Best effort save
            }

            res.json({ success: true, message: 'Subscription updated', plan, status });
        }
    );
});

module.exports = router;
