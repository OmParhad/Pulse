import { feeds } from "../feeds";
import { fetchFeed } from "./rss";
import { removeDuplicates } from "./deduplicate";

let articles: any[] = [];

export async function refreshFeeds() {

    console.log("\n🔄 Refreshing feeds...\n");


    const results = await Promise.all(

        feeds
            .filter(feed => feed.enabled)
            .map(async feed => {

                try {

                    const data = await fetchFeed(feed.url);

                    console.log(`✅ ${feed.name} (${data.length} articles)`);

                    return data.map((article: any) => ({
                        ...article,
                        source: feed.name,
                        category: feed.category
                    }));

                } catch (err) {

                    console.error(`❌ ${feed.name} failed`);

                    return [];

                }

            })

    );

let success = 0;
let failed = 0;
success++;
failed++;
console.log("==============================");
console.log(`Feeds Loaded : ${success}`);
console.log(`Feeds Failed : ${failed}`);
console.log(`Articles     : ${articles.length}`);
console.log("==============================");

    articles = removeDuplicates(results.flat());

    console.log("\n==============================");
    console.log(`✅ Loaded ${articles.length} unique articles`);
    console.log("==============================\n");

}

export function getArticles() {
    return articles;


}