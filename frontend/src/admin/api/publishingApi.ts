/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from "./mockDb";
import { PublishingJob, PublishingStatus } from "../types/publishing";

export const publishingApi = {
  getJobs: async (status?: PublishingStatus): Promise<PublishingJob[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getPublishingJobs(status));
      }, 100);
    });
  },

  queueJob: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.queueJob(id);
        resolve(true);
      }, 100);
    });
  },

  retryJob: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.retryJob(id);
        resolve(true);
      }, 100);
    });
  },
};
