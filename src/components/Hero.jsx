import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            <span className="text-xs tracking-wide">Book tickets instantly</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Futuristic tickets for concerts, cinema, dine-in and live shows
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl">
            Discover hand-picked experiences near you. Fast checkout, interactive seats, and a sleek dark mode experience.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#explore" className="px-5 py-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm text-center">Explore events</a>
            <a href="#how" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm text-center">How it works</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
