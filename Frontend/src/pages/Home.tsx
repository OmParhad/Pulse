import { useEffect, useState } from "react";
import { api } from "../api/client";
import Header from "../api/components/Header";
import Sidebar from "../api/components/sidebar";
import ArticleCard from "../api/components/Articalecard";

interface Article {
  title: string;
  source: string;
  description?: string;
  link?: string;
  category?: string;
  pubDate?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/trending")
      .then((res) => {
        setArticles(res.data.articles || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter((article) => {
    const categoryMatch =
      selectedCategory === "Trending" ||
      article.category === selectedCategory;

    const searchMatch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      (article.description ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white text-xl">
        Loading Pulse...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="flex pt-20">

        <Sidebar
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <main className="flex-1 overflow-y-auto p-8">

          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <h1 className="text-5xl font-bold">
                {selectedCategory}
              </h1>

              <p className="text-zinc-400 mt-2">
                {filteredArticles.length} Articles
              </p>
            </div>

            <input
              type="text"
              placeholder="🔍 Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                lg:w-96
                bg-zinc-900
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-zinc-500
                outline-none
                transition
                focus:border-blue-500
              "
            />

          </div>

          {filteredArticles.length === 0 ? (
            <div className="max-w-7xl mx-auto h-[60vh] flex items-center justify-center">

              <div className="text-center">

                <div className="text-7xl mb-4">
                  📰
                </div>

                <h2 className="text-3xl font-semibold">
                  No articles found
                </h2>

                <p className="text-zinc-500 mt-3">
                  Try another category or search term.
                </p>

              </div>

            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6">

              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  article={{
                    ...article,
                    category: article.category ?? "",
                    link: article.link ?? "",
                  }}
                />
              ))}

            </div>
          )}

        </main>

      </div>
    </div>
  );
}