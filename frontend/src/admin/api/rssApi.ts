/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from "./mockDb";
import { Article } from "../types/article";

export const rssApi = {
  getArticles: async (): Promise<Article[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getArticles());
      }, 100);
    });
  },

  getPendingArticles: async (): Promise<Article[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getArticles().filter((art) => art.status === "pending"));
      }, 100);
    });
  },

  approveArticle: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.approveArticle(id);
        resolve(true);
      }, 100);
    });
  },

  rejectArticle: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.rejectArticle(id);
        resolve(true);
      }, 100);
    });
  },
};
