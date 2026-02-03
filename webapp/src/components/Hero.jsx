import { motion } from 'framer-motion'

const heroVideo = '/Livrables/Montage_Transition.mp4'
const heroFallbackImage = '/Livrables/Paris_1889_16.9.jpg'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video ou image */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroFallbackImage}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0c0a09]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Voyagez dans le temps
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl text-amber-200/90 mb-8"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Des destinations d'exception, des époques inoubliables
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="#destinations"
            className="inline-block px-8 py-3 bg-amber-500/20 border border-amber-400/60 text-amber-200 rounded-sm hover:bg-amber-500/30 transition-colors font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Découvrir les destinations
          </a>
        </motion.div>
      </div>
    </section>
  )
}
