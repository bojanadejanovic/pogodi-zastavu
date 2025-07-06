import Database from 'better-sqlite3';

const db = new Database('scores.db');

// Create the scores table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    score INTEGER NOT NULL,
    totalQuestions INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;