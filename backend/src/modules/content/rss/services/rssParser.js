import crypto from "crypto";
import Parser from "rss-parser";

const parser = new Parser();

export async function fetchFeed(url) {
  try {
    const feed = await parser.parseURL(url);

    return feed.items.map((item) => ({
      id: crypto
        .createHash("md5")
        .update(item.link)
        .digest("hex"),

      title: item.title,
      link: item.link,
      content: item.contentSnippet || "",
      publishedAt: item.pubDate,
    }));
  } catch (error) {
    console.error(error);

    return [];
  }
}