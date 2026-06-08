import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "./src/data/gotrip.db"
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      link TEXT UNIQUE NOT NULL,
      content TEXT,
      city TEXT,
      status TEXT,
      publishedAt TEXT,
      createdAt TEXT
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS generated_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    articleId TEXT NOT NULL,
    blog TEXT,
    linkedin TEXT,
    instagram TEXT,
    newsletter TEXT,
    status TEXT,
    createdAt TEXT,
    FOREIGN KEY(articleId) REFERENCES articles(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    entityId TEXT,
    entityType TEXT,
    message TEXT,
    createdAt TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS publishing_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    generatedContentId INTEGER NOT NULL,
    platform TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    scheduledFor TEXT,
    publishedAt TEXT,
    attempts INTEGER DEFAULT 0,
    lastError TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`ALTER TABLE publishing_jobs ADD COLUMN attempts INTEGER DEFAULT 0`, (err) => {
  if (err && !err.message.includes("duplicate column")) {
    console.error(err.message);
  }
});

db.run(`ALTER TABLE publishing_jobs ADD COLUMN lastError TEXT`, (err) => {
  if (err && !err.message.includes("duplicate column")) {
    console.error(err.message);
  }
});


});

export default db;