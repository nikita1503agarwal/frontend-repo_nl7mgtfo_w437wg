import { Menu, Ticket, Search } from 'lucide-react'

function Navbar({ onSearch }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 text-white/70">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Ticket className="text-fuchsia-400" size={22} />
            <span className="text-white font-semibold tracking-wide">NightPass</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 w-1/2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              onChange={(e) => onSearch(e.target.value)}
              type="text"
              placeholder="Search concerts, cinema, dine-in, live shows..."
              className="w-full bg-white/5 text-white placeholder-white/40 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 ring-fuchsia-500/60"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">Sign in</button>
          <button className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm">Create account</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
