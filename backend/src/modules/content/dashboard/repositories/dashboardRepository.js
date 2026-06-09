import db from "../../../../db/database.js";

function getCount(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row.count);
    });
  });
}

export async function getDashboardStats() {
  const pendingArticles = await getCount(
    "SELECT COUNT(*) as count FROM articles WHERE status='PENDING'"
  );

  const approvedArticles = await getCount(
    "SELECT COUNT(*) as count FROM articles WHERE status='APPROVED'"
  );

  const rejectedArticles = await getCount(
    "SELECT COUNT(*) as count FROM articles WHERE status='REJECTED'"
  );

  const awaitingApprovalContent = await getCount(
    `
    SELECT COUNT(*) as count
    FROM generated_content
    WHERE status='AWAITING_APPROVAL'
    `
  );

  const approvedContent = await getCount(
    `
    SELECT COUNT(*) as count
    FROM generated_content
    WHERE status='APPROVED'
    `
  );

  const draftPublishingJobs = await getCount(
  `
  SELECT COUNT(*) as count
  FROM publishing_jobs
  WHERE status='DRAFT'
  `
);

const pendingPublishingJobs = await getCount(
  `
  SELECT COUNT(*) as count
  FROM publishing_jobs
  WHERE status='PENDING'
  `
);

const publishedJobs = await getCount(
  `
  SELECT COUNT(*) as count
  FROM publishing_jobs
  WHERE status='PUBLISHED'
  `
);

const failedPublishingJobs = await getCount(
  `
  SELECT COUNT(*) as count
  FROM publishing_jobs
  WHERE status='FAILED'
  `
);

  return {
  pendingArticles,
  approvedArticles,
  rejectedArticles,

  awaitingApprovalContent,
  approvedContent,

  draftPublishingJobs,
  pendingPublishingJobs,
  publishedJobs,
  failedPublishingJobs,
};
}