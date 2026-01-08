const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data/frailty_test_results.db');
const db = new sqlite3.Database(dbPath);

console.log('📂 Database path:', dbPath);

db.serialize(() => {
    console.log('🔄 Attempting to add personal_details column...');

    db.run(`ALTER TABLE users ADD COLUMN personal_details TEXT`, (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('✅ Column personal_details already exists.');
            } else {
                console.error('❌ Error adding column:', err.message);
            }
        } else {
            console.log('✅ Successfully added personal_details column.');
        }
    });
});

db.close();
