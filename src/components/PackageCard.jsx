import { Link } from 'react-router-dom'
import { Heart, Star, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useSaved } from '../context/SavedContext'

function StarRating({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
        
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-sm">
      {stars}
      <span className="text-slate-400 text-xs ml-1">{rating}</span>
    </span>
  )
}

export default function PackageCard({ pkg, index = 0 }) {
  const { toggleSaved, isSaved } = useSaved()
  const saved = isSaved(pkg.id)

  return (
    <div
      className="glass-card card-shine rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="glass text-xs font-semibold text-sky-300 px-3 py-1 rounded-full border border-sky-400/30">
            {pkg.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleSaved(pkg.id) }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full glass border flex items-center justify-center transition-all duration-300 ${
            saved
              ? 'border-rose-400/50 bg-rose-500/20 text-rose-400'
              : 'border-white/20 text-white/60 hover:text-rose-400 hover:border-rose-400/40'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save trip'}
        >
          <Heart size={15} className={saved ? 'fill-current' : ''} />
        </button>

        {/* Duration pill on image */}
        <div className="absolute bottom-3 left-3">
          <span className="glass text-xs text-white/80 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
            <Clock size={11} />
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-white leading-tight line-clamp-2 flex-1">
            {pkg.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
          <MapPin size={12} className="text-sky-400 flex-shrink-0" />
          <span className="truncate">{pkg.location}</span>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {pkg.summary}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <StarRating rating={pkg.rating} />
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">per person</div>
            <div className="text-gradient-gold font-bold text-lg">
              ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <Link
          to={`/package/${pkg.id}`}
          className="mt-4 w-full liquid-btn flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
