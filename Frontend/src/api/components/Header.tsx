export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">

      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
            ⚡
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Pulse
            </h1>

            <p className="text-xs text-zinc-400">
              Tech Intelligence Feed
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
            🟢 Live
          </div>

          <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-blue-500">
            GitHub
          </button>

        </div>

      </div>

    </header>
  );
}