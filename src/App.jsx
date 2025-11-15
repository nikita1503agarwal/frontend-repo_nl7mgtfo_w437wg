import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import BookingModal from './components/BookingModal'
import { motion } from 'framer-motion'

function App() {
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [bookingEvent, setBookingEvent] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/events`)
      if (res.ok) {
        const list = await res.json()
        setEvents(list)
        setFiltered(list)
      } else {
        // Try to seed and fetch again
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
        const res2 = await fetch(`${baseUrl}/api/events`)
        if (res2.ok) {
          const list = await res2.json()
          setEvents(list)
          setFiltered(list)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  useEffect(() => {
    let f = events
    if (category !== 'all') f = f.filter(e => e.category === category)
    if (query) {
      const q = query.toLowerCase()
      f = f.filter(e => e.title.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q) || (e.tags||[]).join(' ').toLowerCase().includes(q))
    }
    setFiltered(f)
  }, [events, query, category])

  const handleBook = (ev) => {
    setBookingEvent(ev)
  }

  const confirmBooking = (id) => {
    setConfirmation(id)
    setBookingEvent(null)
    setTimeout(() => setConfirmation(null), 5000)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar onSearch={setQuery} />
      <Hero />

      <section id="explore" className="relative py-14 bg-gradient-to-b from-black via-black to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,255,0.06),transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-semibold">Featured experiences</h2>
            <div className="flex items-center gap-2">
              {['all', 'concert', 'cinema', 'dine-in', 'live-show'].map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full border text-sm ${category===c ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-white' : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, idx) => (
              <EventCard key={idx} event={e} onBook={handleBook} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-white/60 text-center py-20">No events match your search. Try a different query.</p>
          )}
        </div>
      </section>

      <section id="how" className="py-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[{
            title: 'Discover',
            text: 'Browse concerts, cinema shows, restaurants and live performances curated for you.'
          },{
            title: 'Select seats',
            text: 'Use our interactive interface and transparent pricing to pick the best spots.'
          },{
            title: 'Book in seconds',
            text: 'Fast checkout with instant confirmation and calendar reminders.'
          }].map((b, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.05}} className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-white/70 text-sm">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {bookingEvent && (
        <BookingModal open={!!bookingEvent} onClose={() => setBookingEvent(null)} event={bookingEvent} onConfirm={confirmBooking} />
      )}

      {confirmation && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70]">
          <div className="px-4 py-2 rounded-lg bg-green-600 text-white shadow-lg">Booking confirmed! ID: {confirmation}</div>
        </div>
      )}

      <footer className="border-t border-white/10 py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} NightPass. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
