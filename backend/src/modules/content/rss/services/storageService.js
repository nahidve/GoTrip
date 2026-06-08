import fs from "fs";

const FILE_PATH = "./src/data/articles.json";

export function getStoredArticles() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");

    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveArticles(articles) {
  fs.writeFileSync(
    FILE_PATH,
    JSON.stringify(articles, null, 2)
  );
}