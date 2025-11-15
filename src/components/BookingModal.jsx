import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BookingModal({ open, onClose, event, onConfirm }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(2)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: event._id || event.id || event.mongo_id || event.event_id || event.id_str || event.idString || event.eventId || event.mongoId || event.objectId || event.oid || event.idHex || event.idhex || (event._id_str ?? ''),
          name,
          email,
          quantity: Number(quantity),
          notes
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Booking failed')
      onConfirm(data.booking_id)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="w-full max-w-md rounded-xl border border-white/10 bg-black/80 backdrop-blur p-6 text-white"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Book tickets</h3>
              <p className="text-white/60 text-sm">{event?.title}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/60" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/60" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Quantity</label>
                  <input type="number" min="1" max="12" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/60" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Notes</label>
                  <input value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/60" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
                <button disabled={loading} className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-60">{loading ? 'Booking...' : 'Confirm Booking'}</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingModal
