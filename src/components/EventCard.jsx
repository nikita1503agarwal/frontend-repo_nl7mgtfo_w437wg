import { motion } from 'framer-motion'
import { MapPin, Clock, Ticket } from 'lucide-react'

function EventCard({ event, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:border-fuchsia-500/40 hover:bg-white/10 transition-all"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs uppercase tracking-wider text-fuchsia-300/80">{event.category}</span>
        {event.tags?.slice(0,2).map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">{t}</span>
        ))}
      </div>
      <h3 className="text-white text-lg font-semibold">{event.title}</h3>
      <p className="text-white/60 text-sm line-clamp-2 mt-1">{event.description}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-white/70 text-sm">
        <div className="flex items-center gap-2"><Clock size={16} className="text-white/50" /> {event.duration_minutes || 90} mins</div>
        <div className="flex items-center gap-2"><MapPin size={16} className="text-white/50" /> {event.venue?.city}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-white"><span className="text-xl font-bold">${event.price}</span> <span className="text-white/50 text-sm">{event.currency}</span></div>
        <button onClick={() => onBook(event)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm">
          <Ticket size={16} /> Book
        </button>
      </div>
    </motion.div>
  )
}

export default EventCard
