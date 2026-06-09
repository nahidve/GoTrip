/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from "./mockDb";
import { GeneratedContent } from "../types/generatedContent";

export const generationApi = {
  getAwaitingApproval: async (): Promise<GeneratedContent[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          db
            .getGeneratedContent()
            .filter((c) => c.status === "awaiting_approval"),
        );
      }, 100);
    });
  },

  getAllContent: async (): Promise<GeneratedContent[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getGeneratedContent());
      }, 100);
    });
  },

  approveContent: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.approveGeneratedContent(id);
        resolve(true);
      }, 100);
    });
  },

  rejectContent: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.rejectGeneratedContent(id);
        resolve(true);
      }, 100);
    });
  },
};
