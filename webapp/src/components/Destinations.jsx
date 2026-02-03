import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { destinations } from '../data/destinations'

function Card({ destination, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.article
      id={`dest-${destination.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative rounded-lg overflow-hidden bg-stone-900/80 border border-amber-900/30 shadow-xl"
    >
      <a href={`#dest-${destination.id}`} className="block">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-amber-400/90 text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            {destination.subtitle}
          </p>
          <h2 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {destination.title}
          </h2>
          <p className="text-stone-400 text-sm line-clamp-2 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            {destination.description}
          </p>
          <p className="text-amber-300 text-sm font-medium">{destination.price}</p>
        </div>
      </a>
    </motion.article>
  )
}

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 md:py-28 px-4 bg-[#0c0a09]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold text-center text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Nos destinations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-stone-400 mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Trois époques, trois expériences uniques. Choisissez votre voyage.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <Card key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
