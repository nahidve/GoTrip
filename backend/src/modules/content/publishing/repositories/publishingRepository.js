import db from "../../../../db/database.js";

/* -------------------- CREATE -------------------- */

export async function createPublishingJob(job) {
  return new Promise((resolve, reject) => {
    const stmt = `INSERT INTO publishing_jobs (generatedContentId, platform, status, scheduledFor) VALUES (?, ?, ?, ?)`;
    db.run(
      stmt,
      [
        job.generatedContentId,
        job.platform,
        job.status || "PENDING",
        job.scheduledFor || null,
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, ...job });
      }
    );
  });
}

export async function createBulkPublishingJobs(jobs) {
  const results = [];

  for (const job of jobs) {
    const created = await createPublishingJob(job);
    results.push(created);
  }

  return {
    success: true,
    count: results.length,
  };
}

/* -------------------- READ -------------------- */

export async function getPendingJobs() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM publishing_jobs WHERE status = 'PENDING' ORDER BY createdAt ASC`,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

export async function getAllJobs() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM publishing_jobs ORDER BY createdAt DESC`,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

export async function getJobById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM publishing_jobs WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

export async function getFailedJobs() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT * FROM publishing_jobs
      WHERE status = 'FAILED'
      ORDER BY createdAt DESC
      `,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

/* -------------------- UPDATE -------------------- */

export async function updateJobStatus(id, status, extra = {}) {
  return new Promise((resolve, reject) => {
    const stmt = `
      UPDATE publishing_jobs
      SET status = ?,
          publishedAt = COALESCE(?, publishedAt),
          scheduledFor = COALESCE(?, scheduledFor)
      WHERE id = ?
    `;

    db.run(
      stmt,
      [
        status,
        extra.publishedAt || null,
        extra.scheduledFor || null,
        id,
      ],
      function (err) {
        if (err) return reject(err);
        resolve({ updated: this.changes });
      }
    );
  });
}

/* -------------------- ATOMIC CLAIM -------------------- */

export async function claimPendingJob() {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT * FROM publishing_jobs
      WHERE status = 'PENDING'
      ORDER BY createdAt ASC
      LIMIT 1
      `,
      [],
      (err, job) => {
        if (err) return reject(err);

        if (!job) {
          return resolve(null);
        }

        db.run(
          `
          UPDATE publishing_jobs
          SET status = 'IN_PROGRESS',
              attempts = COALESCE(attempts, 0) + 1
          WHERE id = ? AND status = 'PENDING'
          `,
          [job.id],
          function (err2) {
            if (err2) return reject(err2);

            if (this.changes === 0) {
              return resolve(null);
            }

            resolve({
              ...job,
              attempts: (job.attempts || 0) + 1,
            });
          }
        );
      }
    );
  });
}

/* -------------------- STATUS HELPERS -------------------- */

export async function markPublished(id) {
  return updateJobStatus(id, "PUBLISHED", {
    publishedAt: new Date().toISOString(),
  });
}

export async function markFailed(id, error) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE publishing_jobs
      SET status = 'FAILED',
          lastError = ?
      WHERE id = ?
      `,
      [error?.message || String(error), id],
      function (err) {
        if (err) return reject(err);
        resolve({ updated: this.changes });
      }
    );
  });
}

export async function queueJob(id) {
  return updateJobStatus(id, "PENDING");
}

export async function resetJobToPending(id, error) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE publishing_jobs
      SET status = 'PENDING',
          lastError = ?
      WHERE id = ?
      `,
      [error, id],
      function (err) {
        if (err) return reject(err);
        resolve({ updated: this.changes });
      }
    );
  });
}

export async function getJobsByStatus(status) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM publishing_jobs
      WHERE status = ?
      ORDER BY createdAt DESC
      `,
      [status],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}