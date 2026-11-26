import { Link, useLocation } from 'react-router-dom'
import { Heart, Compass, Menu, X } from 'lucide-react'
import { useSaved } from '../context/SavedContext'
import { useState } from 'react'

export default function Navbar() {
  const { savedIds } = useSaved()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl liquid-btn flex items-center justify-center">
              <Compass size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gradient hidden sm:block">
              Yathra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-sky-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/saved"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/saved') ? 'text-sky-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart size={15} className={isActive('/saved') ? 'fill-sky-400 text-sky-400' : ''} />
              Saved Trips
              {savedIds.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-sky-500 text-white rounded-full animate-pulse-glow">
                  {savedIds.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg glass text-slate-300 hover:text-white"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 flex flex-col gap-4 animate-fade-in-up">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium ${isActive('/') ? 'text-sky-400' : 'text-slate-300'}`}
          >
            Explore
          </Link>
          <Link
            to="/saved"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 text-sm font-medium ${isActive('/saved') ? 'text-sky-400' : 'text-slate-300'}`}
          >
            <Heart size={15} />
            Saved Trips
            {savedIds.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-sky-500 text-white rounded-full">
                {savedIds.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  )
}
