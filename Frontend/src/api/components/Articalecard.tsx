interface Props {
  article: {
    title: string;
    description?: string;
    source: string;
    category: string;
    link: string;
    pubDate?: string;
  };
}

export default function ArticleCard({ article }: Props) {
  const formattedDate = article.pubDate
    ? new Date(article.pubDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
            📰
          </div>

          <span className="font-medium text-blue-400">
            {article.source}
          </span>
        </div>

        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
          {article.category}
        </span>

      </div>

      {/* Title */}
      <h2 className="mt-5 min-h-[90px] text-2xl font-bold leading-tight text-white transition-colors group-hover:text-blue-400">
        {article.title}
      </h2>

      {/* Description */}
      <p className="mt-4 min-h-[96px] text-sm leading-7 text-zinc-400 line-clamp-4">
        {article.description || "No description available."}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4">

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>

        <a
          href={article.link}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Read Article →
        </a>

      </div>

    </article>
  );
}