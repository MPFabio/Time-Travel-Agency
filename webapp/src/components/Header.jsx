import { motion } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Accueil' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#quiz', label: 'Quiz' },
  { href: '#reservation', label: 'Réservation' },
]

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a09]/90 backdrop-blur-md border-b border-amber-900/30"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="font-semibold text-xl text-amber-400 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Time Travel Agency
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:hidden flex gap-4">
          <a href="#destinations" className="text-amber-400 text-sm">Destinations</a>
          <a href="#quiz" className="text-amber-400 text-sm">Quiz</a>
        </div>
      </nav>
    </motion.header>
  )
}
