const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data/frailty_test_results.db');
const db = new sqlite3.Database(dbPath);

console.log('📂 Database path:', dbPath);

db.serialize(() => {
    console.log('🔄 Starting migration to make password nullable...');

    db.run("BEGIN TRANSACTION");

    // 1. Create new table with nullable password
    db.run(`CREATE TABLE IF NOT EXISTS users_migration (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT, -- Now nullable
        personal_details TEXT,
        google_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Copy data from old table
    // verify columns in old table first or just select what we know exists
    // We recently added personal_details and google_id via other means, so they might exist.
    // If google_id doesn't exist in 'users' yet (because ALTER might have failed or not run), we handle that.

    // Simplest approach: Use INSERT INTO ... SELECT
    // But we need to handle potential missing columns in source if we want to be robust.
    // However, googleAuth.js TRIED to add google_id.
    // Let's assume standard columns exist.

    // We'll read from 'users' and insert into 'users_migration'
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.error("❌ Error reading users:", err);
            db.run("ROLLBACK");
            return;
        }

        console.log(`Found ${rows.length} users to migrate.`);

        const stmt = db.prepare(`INSERT INTO users_migration (id, name, email, password, personal_details, google_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);

        rows.forEach(row => {
            stmt.run(
                row.id,
                row.name,
                row.email,
                row.password,
                row.personal_details || null,
                row.google_id || null,
                row.created_at
            );
        });

        stmt.finalize(() => {
            // 3. Drop old table
            db.run("DROP TABLE users", (err) => {
                if (err) {
                    console.error("❌ Error dropping users table:", err);
                    db.run("ROLLBACK");
                    return;
                }

                // 4. Rename new table
                db.run("ALTER TABLE users_migration RENAME TO users", (err) => {
                    if (err) {
                        console.error("❌ Error renaming table:", err);
                        db.run("ROLLBACK");
                        return;
                    }

                    db.run("COMMIT", () => {
                        console.log("✅ Migration completed successfully.");
                        db.close();
                    });
                });
            });
        });
    });
});
