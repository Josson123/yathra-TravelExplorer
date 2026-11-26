import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Search, SlidersHorizontal, Sparkles, Wind, ChevronLeft, ChevronRight, Heart, ArrowRight, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import packages from '../data/packages.json'
import PackageCard from '../components/PackageCard'
import { useSaved } from '../context/SavedContext'

const CATEGORIES = ['All', 'Hill Station', 'Beach', 'Heritage', 'Adventure']

const SORT_OPTIONS = [
  { label: 'Top Rated',         value: 'rating' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: ' Wishlisted',         value: 'wishlisted' },
]

// ─── Carousel slides ─────────────────────────────────────────────
// Each slide: image (URL), headline, sub, and optionally a featured package id
const CAROUSEL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80',
    headline: 'Discover Your Next Adventure',
    sub: 'Handpicked escapes across India — mountains, beaches & heritage gems.',
    featured: null,
  },
  {
    image: 'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Munnar_main_tv_destination_img_1_l_630_946.jpg',
    headline: 'Misty Hills & Tea Estates',
    sub: 'Lose yourself in the rolling emerald gardens of Munnar.',
    featured: 'munnar-mist-3d',
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    headline: 'Drift Through Backwater Bliss',
    sub: 'Luxury houseboats and swaying palms — the soul of Kerala awaits.',
    featured: 'alleppey-backwaters-4d',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    headline: 'Crystal Waters & Coral Reefs',
    sub: 'Dive into paradise at the Andaman Islands.',
    featured: 'andaman-adventure-5d',
  },
]

// --- Carousel ---------------------------------------
function HeroCarousel({ onSearchFocus }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % CAROUSEL_SLIDES.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const go = (dir) => {
    setCurrent(c => (c + dir + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
    startTimer()
  }

  const slide = CAROUSEL_SLIDES[current]
  const featuredPkg = slide.featured ? packages.find(p => p.id === slide.featured) : null

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {CAROUSEL_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt={s.headline} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0f1e]/60 via-[#0a0f1e]/20 to-[#0a0f1e]" />

      {/* Orbs */}
      <div className="orb w-96 h-96 bg-sky-500 top-1/4 left-1/4 animate-float z-10" />
      <div className="orb w-72 h-72 bg-indigo-600 bottom-1/3 right-1/5 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass border border-sky-400/30 text-sky-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <Sparkles size={12} />
            Curated Holiday Experiences
          </div>

          {/* Headline — transitions per slide */}
          <h1
            key={current}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight animate-fade-in-up"
          >
            {slide.headline.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="text-gradient">{slide.headline.split(' ').slice(-2).join(' ')}</span>
          </h1>

          <p
            key={`sub-${current}`}
            className="text-slate-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          >
            {slide.sub}
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto animate-fade-in-up mb-8">
            <div className="relative" onClick={onSearchFocus}>
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search destinations or packages…"
                readOnly
                className="input-glass w-full pl-11 pr-5 py-4 rounded-2xl text-sm font-medium cursor-pointer"
              />
            </div>
          </div>

          {/* travel destination cards */}
          {featuredPkg && (
            <div className="flex justify-center animate-fade-in-up" key={`feat-${current}`}>
              <Link
                to={`/package/${featuredPkg.id}`}
                className="glass-card card-shine rounded-2xl overflow-hidden flex items-center gap-4 p-3 max-w-sm w-full text-left hover:-translate-y-1 transition-transform duration-300 border border-sky-400/20"
              >
                <img src={featuredPkg.image} alt={featuredPkg.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-sky-400 font-semibold mb-0.5">{featuredPkg.category}</div>
                  <div className="text-sm font-bold text-white truncate">{featuredPkg.title}</div>
                  <div className="text-xs text-slate-400">{featuredPkg.location}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-gradient-gold font-bold text-sm">₹{featuredPkg.pricePerPerson.toLocaleString('en-IN')}</div>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-400">{featuredPkg.rating}</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-sky-400 flex-shrink-0" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 glass border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 glass border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer() }}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2 bg-sky-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-6 z-30 animate-bounce">
        <Wind size={18} className="text-slate-400 rotate-90" />
      </div>
    </section>
  )
}

// ----Sort Popup ------------------------------
function SortPopup({ sort, setSort }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = SORT_OPTIONS.find(o => o.value === sort)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
          open ? 'pill-active text-white' : 'pill-inactive text-slate-300 hover:text-white'
        }`}
        aria-label="Sort options"
      >
        <SlidersHorizontal size={13} />
        <span>{current?.label ?? 'Sort'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 glass-strong rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-scale-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-xs font-bold text-white">Sort By</span>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={13} />
            </button>
          </div>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setSort(opt.value); setOpen(false) }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 flex items-center justify-between ${
                sort === opt.value
                  ? 'text-sky-300 bg-sky-500/10'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {opt.label}
              {sort === opt.value && <span className="text-sky-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ----Main Home---------------------------
export default function Home() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort]         = useState('rating')
  const { savedIds }            = useSaved()

  const searchInputRef  = useRef(null)
  const resultsRef      = useRef(null)

  // Clicking the hero search box focuses the real input below
  const handleHeroSearchClick = () => {
    searchInputRef.current?.focus()
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // On Enter → scroll to results
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const filtered = useMemo(() => {
    let result = [...packages]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
    }
    if (category !== 'All') result = result.filter(p => p.category === category)
    if (sort === 'rating')       result.sort((a, b) => b.rating - a.rating)
    else if (sort === 'price_asc')  result.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    else if (sort === 'price_desc') result.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
    else if (sort === 'wishlisted') result = result.filter(p => savedIds.includes(p.id))
    return result
  }, [search, category, sort, savedIds])

  return (
    <div className="min-h-screen">
      {/* =========== CAROUSEL HERO =========== */}
      <HeroCarousel onSearchFocus={handleHeroSearchClick} />

      {/* =========== FILTER BAR =========== */}
      <section className="sticky top-16 z-30 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Search input (real) */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search destinations or packages… (press Enter to jump to results)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-glass w-full pl-10 pr-5 py-2.5 rounded-xl text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category + Sort row */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    category === cat ? 'pill-active text-white' : 'pill-inactive text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <SortPopup sort={sort} setSort={setSort} />
          </div>
        </div>
      </section>

      {/* =========== PACKAGES GRID =========== */}
      <section ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-32">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-white mb-2">No destinations found</h3>
            <p className="text-slate-400">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {filtered.length} Package{filtered.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* =========== FOOTER =========== */}
      <footer className="glass border-t border-white/5 mt-16 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Wanderlust Explorer · Built for AIIP Task 1</p>
      </footer>
    </div>
  )
}
