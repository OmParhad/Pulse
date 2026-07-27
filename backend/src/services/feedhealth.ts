import { feeds } from "../feeds";
import { fetchFeed } from "./rss";

export async function checkFeeds() {
  const results = await Promise.allSettled(
    feeds
      .filter((feed) => feed.enabled)
      .map(async (feed) => {
        const start = Date.now();

        const articles = await fetchFeed(feed.url);

        return {
          id: feed.id,
          name: feed.name,
          category: feed.category,
          articles: articles.length,
          responseTime: Date.now() - start
        };
      })
  );

  return results;
}