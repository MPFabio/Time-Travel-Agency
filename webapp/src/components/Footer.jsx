import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-stone-950 border-t border-amber-900/30 py-12 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-amber-400 font-medium" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Time Travel Agency
        </p>
        <nav className="flex gap-6">
          <a href="#hero" className="text-stone-400 hover:text-amber-400 transition-colors text-sm">Accueil</a>
          <a href="#destinations" className="text-stone-400 hover:text-amber-400 transition-colors text-sm">Destinations</a>
          <a href="#quiz" className="text-stone-400 hover:text-amber-400 transition-colors text-sm">Quiz</a>
        </nav>
        <div className="text-stone-500 text-sm text-center md:text-right">
          <p className="mb-1">Projet pédagogique — M1/M2 Digital & IA. Assets Session 1 (Livrables). IA : Mistral/Groq.</p>
          <p className="text-stone-400">Lenny COSTON · Sebastien GIGUET · Fabio MARATEA</p>
        </div>
      </div>
    </motion.footer>
  )
}
