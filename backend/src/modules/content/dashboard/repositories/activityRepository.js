import db from "../../../../db/database.js";

export function createActivityLog(data) {
  console.log("CREATING LOG", data);
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO activity_logs (
        type,
        entityId,
        entityType,
        message,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        data.type,
        data.entityId,
        data.entityType,
        data.message,
        data.createdAt,
      ],
      (err) => {
  if (err) {
    console.error("ACTIVITY LOG ERROR:", err);
    reject(err);
  } else {
    console.log("ACTIVITY LOG INSERTED");
    resolve();
  }
}
    );
  });
}

export function getRecentActivity(limit = 20) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM activity_logs
      ORDER BY createdAt DESC
      LIMIT ?
      `,
      [limit],
      (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("ACTIVITY ROWS:", rows);
          resolve(rows);
        }
      }
    );
  });
}