import db from "../../../../db/database.js";

export function createGeneratedContent(data) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO generated_content (
        articleId,
        blog,
        linkedin,
        instagram,
        newsletter,
        status,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.articleId,
        data.blog,
        data.linkedin,
        data.instagram,
        data.newsletter,
        data.status,
        data.createdAt,
      ],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function getGeneratedContentByArticleId(
  articleId
) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM generated_content
      WHERE articleId = ?
      `,
      [articleId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

export function getGeneratedContentByStatus(
  status
) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT
        gc.*,
        a.title AS articleTitle
      FROM generated_content gc
      LEFT JOIN articles a
        ON a.id = gc.articleId
      WHERE gc.status = ?
      ORDER BY gc.createdAt DESC
      `,
      [status],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

export function updateGeneratedContentStatus(
  id,
  status
) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE generated_content
      SET status = ?
      WHERE id = ?
      `,
      [status, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}