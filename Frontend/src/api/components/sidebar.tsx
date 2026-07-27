interface SidebarProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  "Trending",
  "AI",
  "Machine Learning",
  "Quantum",
  "Programming",
  "Security",
  "Linux",
  "Research",
];

export default function Sidebar({
  selected,
  onSelect,
}: SidebarProps) {
  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-72 border-r border-zinc-800 bg-zinc-950 p-6 overflow-y-auto">
      <h2 className="text-zinc-400 uppercase text-sm mb-4">
        Categories
      </h2>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selected === category
                ? "bg-blue-600 text-white"
                : "text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
}