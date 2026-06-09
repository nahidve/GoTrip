export interface Article {
  id: string;
  title: string;
  city: string;
  publishedDate: string;
  status: "pending" | "approved" | "rejected";
  score?: number; // quality match score
  sourceUrl?: string; // origin RSS
}
