import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Heart, MapPin, Clock, Star, ArrowLeft,
  CheckCircle, XCircle, ChevronLeft, ChevronRight, Images
} from 'lucide-react'
import packages from '../data/packages.json'
import { useSaved } from '../context/SavedContext'

// ── Photo catalogue config per package ───────────────────────────

// If a package id is not listed, the hero image is used as the only photo.
const GALLERY = {
  'munnar-mist-3d': [
    'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Munnar_main_tv_destination_img_1_l_630_946.jpg',
    'https://3.imimg.com/data3/JO/NY/MY-16453967/eravikulam-national-park-tour.jpg',
    'https://munnartourism.in/wp-content/uploads/2022/11/Eravikulam-National-Park.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/65/98/8a/cure-monastery.jpg?w=1000&h=-1&s=1',
  ],
  'alleppey-backwaters-4d': [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc7-DB1bY_qYwq9wY_8Z-QQRKHXJLhNN8K2QU8DgK792oD1e_9mUKK1LrV&s=10',
    'https://cdn.tripuntold.com/media/photos/location/2018/07/29/a5b8b743-2117-4c18-b016-100212cbdd60.jpg',
    'https://keralatourism.travel/images/v2/packages/kuttanad-places-to-visit.jpg',
  ],
  'rajasthan-heritage-6d': [
    'https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577',
    'https://s7ap1.scene7.com/is/image/incredibleindia/jodhpur-hero?qlt=82&ts=1726661024132',
    'https://www.toursandtaxi.com/wp-content/uploads/2020/09/Ghanta-Ghar-jodhpur1.jpg',
    'https://ik.imagekit.io/5tgxhsqev/saffronstays-media/1789712674136308197?tr=h-500%2Cw-828%2Cq-75%2Cf-webp',
  ],
  'andaman-adventure-5d': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPqUx833f6vSU59mStO1eE3AoF1M288HMLHILRMmraYsEg8CYCziIvz8&s=10',
    'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_havelock_tv_destination_img_1_l_813_1446.jpg',
  ],
  'coorg-coffee-3d': [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=800&q=80',
    'https://duniyaghumo360.com/wp-content/uploads/2026/02/coorg_tourist_places.jpg.webp',
  ],
  'varanasi-spiritual-4d': [
    'https://i.pinimg.com/736x/50/e0/a5/50e0a58aa4cb0cddc2cc131b4989d339.jpg',
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  ],
  'manali-adventure-5d': [
    'https://discoverkullumanali.in/wp-content/uploads/2019/10/Tourists-enjoy-snow-at-Rohtang-pass-6.jpg',
    'https://www.bababiswanathtravels.com/_next/image?url=%2Fimages%2Ftours%2Fshimla-kullu-manali.webp&w=3840&q=75',
    'https://s7ap1.scene7.com/is/image/incredibleindia/hidimba-temple-manali-himachal-pradesh-5-musthead-hero?qlt=82&ts=1726730757462',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkYiFGVVv91X6ULGZVnIBXS8_ZKakC93U0SiGXKSuSPnhJOuRNqNtsdOi&s=10',
  ],
  'goa-beach-4d': [
    'https://i.natgeofe.com/n/7f20b9f5-44a0-4b81-a158-7e4c1019e736/GettyImages-2205838945_RESIZED.jpg',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1678687733/banbanjara/sy5kiac0mg9x5pw46aje.png',
    'https://images.news18.com/ibnlive/uploads/2026/07/1-2026-07-4bc6410bad5648c053c63b85324557ac.png',
  ],
}

// ── Light-box / Gallery ───────────────────────────────────────────
function PhotoGallery({ photos }) {
  const [lightbox, setLightbox] = useState(null)

  const go = (dir) =>
    setLightbox(i => (i + dir + photos.length) % photos.length)

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="relative overflow-hidden rounded-xl aspect-video group focus:outline-none"
          >
            <img
              src={src}
              alt={`Gallery photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 glass border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <img
            src={photos[lightbox]}
            alt="Full view"
            className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); go(1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 glass border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 glass border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10"
          >
            ✕
          </button>
          <div className="absolute bottom-4 text-slate-400 text-sm">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}

// ── Itinerary row ─────────────────────────────────────────────────
function ItineraryRow({ day, title, description, isLast }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full liquid-btn flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg">
          {day}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-sky-500/40 to-transparent mt-1" />}
      </div>
      <div className="pb-6 flex-1">
        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
          Day {day}: {title}
        </h4>
        <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export default function PackageDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleSaved, isSaved } = useSaved()

  const pkg = packages.find(p => p.id === id)

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <div className="text-6xl"></div>
        <h2 className="text-2xl font-bold text-white">Package Not Found</h2>
        <Link to="/" className="liquid-btn px-6 py-2.5 rounded-xl text-white text-sm font-semibold">
          Back to Explore
        </Link>
      </div>
    )
  }

  const saved  = isSaved(pkg.id)
  const photos = GALLERY[pkg.id] ?? [pkg.image]

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* ── Hero Image ── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/30 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 glass border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="absolute top-6 right-6 flex gap-2">
          <span className="glass text-sm font-semibold text-sky-300 px-4 py-2 rounded-xl border border-sky-400/30">
            {pkg.category}
          </span>
          <button
            onClick={() => toggleSaved(pkg.id)}
            className={`w-11 h-11 rounded-xl glass border flex items-center justify-center transition-all duration-300 ${
              saved ? 'border-rose-400/50 bg-rose-500/20 text-rose-400' : 'border-white/20 text-white/60 hover:text-rose-400'
            }`}
          >
            <Heart size={18} className={saved ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-sky-400" />{pkg.location}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-sky-400" />{pkg.duration}</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400" />{pkg.rating} / 5</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Seamless info panel ── */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl overflow-hidden">

              {/* About */}
              <div className="px-7 pt-7 pb-6 border-b border-white/5">
                <h2 className="text-lg font-bold text-white mb-3">About This Trip</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{pkg.summary}</p>
              </div>

              {/* Highlights */}
              <div className="px-7 py-6 border-b border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Trip Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/[0.04] rounded-xl p-3 border border-sky-400/10">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0 text-xs">✦</span>
                      <span className="text-sm text-slate-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="px-7 py-6 border-b border-white/5">
                <h2 className="text-lg font-bold text-white mb-6">Day-wise Itinerary</h2>
                {pkg.itinerary.map((item, idx) => (
                  <ItineraryRow
                    key={item.day}
                    {...item}
                    isLast={idx === pkg.itinerary.length - 1}
                  />
                ))}
              </div>

              {/* Inclusions + Exclusions side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                <div className="px-7 py-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
                    <CheckCircle size={15} className="text-emerald-400" /> Inclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 py-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
                    <XCircle size={15} className="text-rose-400" /> Exclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-rose-400 mt-0.5 flex-shrink-0 text-xs">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Photo Catalogue */}
              <div className="px-7 pt-6 pb-7 border-t border-white/5">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Images size={18} className="text-sky-400" />
                  Photo Catalogue
                  <span className="text-xs text-slate-500 font-normal ml-1">· click to enlarge</span>
                </h2>
                <PhotoGallery photos={photos} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking sticky ── */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-24 animate-pulse-glow">
              <div className="text-center mb-6">
                <div className="text-sm text-slate-400 mb-1">Starting from</div>
                <div className="text-4xl font-black text-gradient-gold">
                  ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-slate-400">per person</div>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-300">
                {[
                  { icon: <Clock size={15} className="text-sky-400" />, label: pkg.duration },
                  { icon: <MapPin size={15} className="text-sky-400" />, label: pkg.location },
                  { icon: <Star size={15} className="text-amber-400 fill-amber-400" />, label: `${pkg.rating} / 5 · Highly Rated` },
                ].map(({ icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3 glass rounded-xl p-3 border border-white/5">
                    {icon}
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <Link
                to={`/book/${pkg.id}`}
                className="block liquid-btn text-center py-3.5 rounded-xl text-white font-bold text-sm w-full"
              >
                🛫 Book This Trip
              </Link>

              <button
                onClick={() => toggleSaved(pkg.id)}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                  saved
                    ? 'border-rose-400/50 bg-rose-500/10 text-rose-400'
                    : 'border-white/10 text-slate-300 hover:border-sky-400/30 hover:text-sky-300'
                }`}
              >
                <Heart size={15} className={saved ? 'fill-current' : ''} />
                {saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
