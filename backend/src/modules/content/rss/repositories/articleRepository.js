import db from "../../../../db/database.js";

export function getArticleById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM articles WHERE id = ?",
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

export function createArticle(article) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO articles (
        id,
        title,
        link,
        content,
        city,
        status,
        publishedAt,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        article.id,
        article.title,
        article.link,
        article.content,
        article.city,
        article.status,
        article.publishedAt,
        article.createdAt,
      ],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function getAllArticles() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM articles ORDER BY createdAt DESC",
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

export function updateArticleStatus(
  id,
  status
) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE articles
      SET status = ?
      WHERE id = ?
      `,
      [status, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function getArticlesByStatus(
  status
) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM articles
      WHERE status = ?
      ORDER BY createdAt DESC
      `,
      [status],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}