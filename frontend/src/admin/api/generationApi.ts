import { apiFetch } from "./client";
import { GeneratedContent } from "../types/generatedContent";

function mapGeneratedContent(item: any): GeneratedContent {
  return {
    id: String(item.id),
    articleId: item.articleId,
    articleTitle: item.articleTitle,

    blogContent: item.blog,
    linkedinPost: item.linkedin,
    instagramPost: item.instagram,
    newsletter: item.newsletter,

    status: item.status.toLowerCase(),
    createdAt: item.createdAt,
  };
}

export const generationApi = {
  getAwaitingApproval: async (): Promise<GeneratedContent[]> => {
    const data = await apiFetch("/generation/awaiting-approval");
    return data.map(mapGeneratedContent);
  },

  getAllContent: async (): Promise<GeneratedContent[]> => {
    const data = await apiFetch("/generation/awaiting-approval");
    return data.map(mapGeneratedContent);
  },

  approveContent: async (id: string): Promise<boolean> => {
    await apiFetch(`/generation/approve/${id}`, {
      method: "PATCH",
    });

    return true;
  },

  rejectContent: async (id: string): Promise<boolean> => {
    await apiFetch(`/generation/reject/${id}`, {
      method: "PATCH",
    });

    return true;
  },
};
