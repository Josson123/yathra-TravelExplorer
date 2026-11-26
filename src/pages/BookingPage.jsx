import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { ArrowLeft, Users, CalendarDays, Minus, Plus, Receipt, CheckCircle2 } from 'lucide-react'
import packages from '../data/packages.json'

// --- Confirmation screen----------
function BookingConfirmation({ pkg, travelers, date, refId }) {
  const navigate  = useNavigate()
  const subtotal  = pkg.pricePerPerson * travelers
  const gst       = Math.round(subtotal * 0.05)
  const grand     = subtotal + gst

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Faded hero background */}
      <img
        src={pkg.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/70 via-[#0a0f1e]/80 to-[#0a0f1e]" />

      <div className="relative z-10 max-w-lg w-full">
        <div className="glass-card rounded-3xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full liquid-btn flex items-center justify-center animate-pulse-glow">
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <div className="inline-flex items-center gap-2 glass border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            ✓ Booking Confirmed
          </div>
          <h1 className="text-2xl font-black text-white mb-2">You're all set!</h1>
          <p className="text-slate-400 text-sm mb-6">Your trip has been successfully reserved.</p>

          <div className="glass rounded-xl p-4 mb-6 border border-sky-400/20">
            <div className="text-xs text-slate-400 mb-1">Booking Reference</div>
            <div className="text-xl font-bold text-gradient tracking-widest">{refId}</div>
          </div>

          <div className="text-left glass-card rounded-xl p-5 mb-6 space-y-3">
            <h3 className="font-bold text-white text-sm mb-3">Booking Summary</h3>
            <div className="text-sm space-y-2.5">
              <Row label="Package"      value={pkg.title} />
              <Row label="Destination"  value={pkg.location} />
              <Row label="Travel Date"  value={new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <Row label="Travelers"    value={`${travelers} Person${travelers > 1 ? 's' : ''}`} />
              <div className="border-t border-white/5 pt-2.5 space-y-2">
                <Row label="Subtotal"   value={`₹${subtotal.toLocaleString('en-IN')}`} />
                <Row label="GST (5%)"   value={`₹${gst.toLocaleString('en-IN')}`} />
                <div className="flex justify-between font-bold text-base pt-1">
                  <span className="text-white">Grand Total</span>
                  <span className="text-gradient-gold">₹{grand.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 glass border border-white/10 text-slate-300 hover:text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Explore More
            </button>
            <Link
              to={`/package/${pkg.id}`}
              className="flex-1 liquid-btn text-center py-3 rounded-xl text-white text-sm font-semibold"
            >
              View Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200 font-medium text-right max-w-[55%] truncate">{value}</span>
    </div>
  )
}

// ── Main Booking Page ─────────────────────────────────────────────
export default function BookingPage() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const pkg         = packages.find(p => p.id === id)

  const [travelers, setTravelers] = useState(2)
  const [date, setDate]           = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [refId, setRefId]         = useState('')
  const [errors, setErrors]       = useState({})

  const subtotal = pkg ? pkg.pricePerPerson * travelers : 0
  const gst      = Math.round(subtotal * 0.05)
  const grand    = subtotal + gst

  const handleSubmit = useCallback(() => {
    const newErrors = {}
    if (!date)        newErrors.date      = 'Please select a travel date.'
    if (travelers < 1) newErrors.travelers = 'At least 1 traveler required.'
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }
    setErrors({})
    setRefId('WL-' + Math.random().toString(36).toUpperCase().slice(2, 8))
    setConfirmed(true)
  }, [date, travelers])

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <div className="text-6xl">😕</div>
        <h2 className="text-2xl font-bold text-white">Package Not Found</h2>
        <Link to="/" className="liquid-btn px-6 py-2.5 rounded-xl text-white text-sm font-semibold">Back to Explore</Link>
      </div>
    )
  }

  if (confirmed) {
    return <BookingConfirmation pkg={pkg} travelers={travelers} date={date} refId={refId} />
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ── Destination picture fills top half, fades out ── */}
      <div className="absolute inset-0 h-[55%] pointer-events-none">
        <img
          src={pkg.image}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Top-to-bottom: transparent → opaque page bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/40 via-[#0a0f1e]/70 to-[#0a0f1e]" />
        {/* Left-side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/30 to-transparent" />
      </div>
      {/* Below the image: solid page colour */}
      <div className="absolute inset-x-0 top-[55%] bottom-0 bg-[#0a0f1e] pointer-events-none" />

      {/* ── Page content ── */}
      <div className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-10 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Package
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left — Form */}
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl font-black text-white mb-1">Book Your Trip</h1>
                <p className="text-slate-400 text-sm">{pkg.title}</p>
              </div>

              {/* Package mini chip */}
              <div className="glass-card rounded-2xl overflow-hidden flex gap-4 items-center p-4">
                <img src={pkg.image} alt={pkg.title} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div>
                  <div className="text-xs text-sky-400 font-semibold mb-0.5">{pkg.category}</div>
                  <div className="text-sm font-bold text-white leading-snug mb-1">{pkg.title}</div>
                  <div className="text-xs text-slate-400">{pkg.location} · {pkg.duration}</div>
                </div>
              </div>

              {/* Traveler Counter */}
              <div className="glass-card rounded-2xl p-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                  <Users size={16} className="text-sky-400" /> Number of Travelers
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTravelers(t => Math.max(1, t - 1))}
                    disabled={travelers <= 1}
                    className="w-11 h-11 glass-strong border border-white/10 rounded-xl flex items-center justify-center text-white hover:border-sky-400/40 disabled:opacity-30 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-black text-gradient">{travelers}</span>
                    <div className="text-xs text-slate-400 mt-0.5">traveler{travelers > 1 ? 's' : ''}</div>
                  </div>
                  <button
                    onClick={() => setTravelers(t => Math.min(20, t + 1))}
                    disabled={travelers >= 20}
                    className="w-11 h-11 glass-strong border border-white/10 rounded-xl flex items-center justify-center text-white hover:border-sky-400/40 disabled:opacity-30 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {errors.travelers && <p className="text-rose-400 text-xs mt-2">{errors.travelers}</p>}
              </div>

              {/* Date Picker */}
              <div className="glass-card rounded-2xl p-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                  <CalendarDays size={16} className="text-sky-400" /> Travel Start Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="input-glass w-full px-4 py-3 rounded-xl text-sm [color-scheme:dark]"
                />
                {errors.date && <p className="text-rose-400 text-xs mt-2">{errors.date}</p>}
              </div>
            </div>

            {/* Right — Cost Summary */}
            <div>
              <div className="glass-strong rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Receipt size={18} className="text-sky-400" />
                  <h2 className="text-lg font-bold text-white">Trip Cost Summary</h2>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Rate per person</span>
                    <span className="text-slate-200">₹{pkg.pricePerPerson.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Travelers</span>
                    <span className="text-slate-200">× {travelers}</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-slate-200 font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">GST (5%)</span>
                    <span className="text-slate-200">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between">
                    <span className="font-bold text-white">Grand Total</span>
                    <span className="text-2xl font-black text-gradient-gold">₹{grand.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {['Free cancellation within 48 hrs', 'Secure frontend reservation', 'Instant confirmation'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400">✓</span>{item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full liquid-btn py-4 rounded-xl text-white font-bold text-base"
                >
                  🎉 Confirm Booking
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
