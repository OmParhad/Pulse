import { SearchArticle } from "./search";

export function rankTrending(
  articles: SearchArticle[]
) {

  return articles
    .map(article => {

      let score = 0;

      const age =
        (Date.now() - new Date(article.pubDate).getTime()) /
        (1000 * 60 * 60 * 24);

      // Recent articles score higher
      if (age < 1)
        score += 40;
      else if (age < 7)
        score += 25;
      else if (age < 30)
        score += 10;

      // Prefer AI & Quantum for now
      if (article.category === "AI")
        score += 20;

      if (article.category === "Quantum")
        score += 15;

      return {
        ...article,
        trendingScore: score
      };

    })
    .sort(
      (a, b) =>
        b.trendingScore - a.trendingScore
    );

}