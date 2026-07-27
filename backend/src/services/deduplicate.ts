import { SearchArticle } from "./search";

export function removeDuplicates(
    articles: SearchArticle[]
) {

    const seen = new Set<string>();

    return articles.filter(article => {

        const key = article.title
            .trim()
            .toLowerCase();

        if (seen.has(key))
            return false;

        seen.add(key);

        return true;

    });

}