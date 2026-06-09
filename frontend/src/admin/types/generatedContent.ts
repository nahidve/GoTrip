/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeneratedContent {
  id: string;
  articleId: string;
  articleTitle: string;
  blogContent: string;
  linkedinPost: string;
  instagramPost: string;
  newsletter: string;
  status: "awaiting_approval" | "approved" | "rejected";
  createdAt: string;
}
