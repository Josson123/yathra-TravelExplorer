import { Link } from 'react-router-dom'
import { Heart, Trash2, ArrowLeft, Sparkles } from 'lucide-react'
import packages from '../data/packages.json'
import { useSaved } from '../context/SavedContext'
import PackageCard from '../components/PackageCard'

export default function SavedTrips() {
  const { savedIds, toggleSaved } = useSaved()
  const savedPackages = packages.filter(p => savedIds.includes(p.id))

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Link>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 glass border border-rose-400/30 text-rose-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                <Heart size={12} className="fill-rose-300" />
                Wishlist
              </div>
              <h1 className="text-4xl font-black text-white">Your Saved Trips</h1>
              <p className="text-slate-400 mt-2 text-sm">
                {savedPackages.length} destination{savedPackages.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            {savedPackages.length > 0 && (
              <button
                onClick={() => savedIds.forEach(id => toggleSaved(id))}
                className="flex items-center gap-2 glass border border-rose-400/20 text-rose-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {savedPackages.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center max-w-lg mx-auto">
            {/* Animated heart */}
            <div className="w-20 h-20 mx-auto mb-6 glass-strong rounded-full flex items-center justify-center animate-float">
              <Heart size={32} className="text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No saved trips yet</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Explore destinations and tap the heart icon to save your favourite trips here for easy access.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 liquid-btn px-6 py-3 rounded-xl text-white font-semibold text-sm"
            >
              <Sparkles size={15} />
              Explore Destinations
            </Link>
          </div>
        ) : (
          <>
            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPackages.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 glass border border-sky-400/30 text-sky-300 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-sky-500/10 transition-colors"
              >
                <Sparkles size={15} />
                Discover More Destinations
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
