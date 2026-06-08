import openai from "../../../../lib/openai.js";

export async function generateContent(article) {
  const prompt = `
You are a luxury travel content writer.

Based on this article:

Title:
${article.title}

Summary:
${article.content}

Generate:

1. Blog Article
2. LinkedIn Post
3. Instagram Caption
4. Newsletter Snippet

Return ONLY valid JSON.

{
  "blog": "...",
  "linkedin": "...",
  "instagram": "...",
  "newsletter": "..."
}
`;

  const response = await openai.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return JSON.parse(response.output_text);
}