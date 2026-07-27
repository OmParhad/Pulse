export interface SearchArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
}

function scoreArticle(article: SearchArticle, query: string): number {

  let score = 0;

  const q = query.toLowerCase();

  if (article.title.toLowerCase().includes(q))
    score += 50;

  if (article.description.toLowerCase().includes(q))
    score += 25;

  if (article.title.toLowerCase().startsWith(q))
    score += 20;

  const age =
    (Date.now() - new Date(article.pubDate).getTime()) /
    (1000 * 60 * 60 * 24);

  if (age < 1)
    score += 15;
  else if (age < 7)
    score += 10;
  else if (age < 30)
    score += 5;

  return score;
}

export function searchArticles(
  articles: SearchArticle[],
  query: string
) {

  return articles
    .map(article => ({
      ...article,
      score: scoreArticle(article, query)
    }))
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score);

}