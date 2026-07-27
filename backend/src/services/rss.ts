import Parser from "rss-parser";
import { getCache, setCache } from "./cache";

const parser = new Parser();

export async function fetchFeed(url: string) {
  const cached = getCache(url);

  if (cached) {
    console.log("📦 Cache hit:", url);
    return cached;
  }

  console.log("🌍 Fetching:", url);

  try {
    const feed = await parser.parseURL(url);

    const articles = feed.items.map((item) => {
      const description = (
        item.contentSnippet ||
        item.content ||
        item.summary ||
        item.contentEncoded ||
        ""
      )
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return {
        title: item.title ?? "Untitled",
        link: item.link ?? "#",
        pubDate: item.pubDate ?? new Date().toISOString(),
        description:
          description.length > 220
            ? description.substring(0, 220) + "..."
            : description,
      };
    });

    setCache(url, articles);

    return articles;
  } catch (err) {
    console.error("RSS Error:", url, err);
    return [];
  }
}