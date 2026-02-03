import { useState } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'

export default function ReservationForm() {
  const [destination, setDestination] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!destination) e.destination = 'Choisissez une destination.'
    if (!dateStart) e.dateStart = 'Date de début requise.'
    if (!dateEnd) e.dateEnd = 'Date de fin requise.'
    if (dateStart && dateEnd && new Date(dateEnd) <= new Date(dateStart)) {
      e.dateEnd = 'La date de fin doit être après la date de début.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-amber-500/10 border border-amber-500/40 rounded-lg p-8 text-center"
      >
        <p className="text-amber-300 font-semibold text-lg mb-2">Demande enregistrée</p>
        <p className="text-stone-400 text-sm">
          Merci pour votre demande de réservation. Notre équipe vous recontactera sous 48 h pour confirmer votre voyage dans le temps.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-stone-900/60 border border-amber-900/30 rounded-lg p-6 sm:p-8 max-w-lg mx-auto space-y-4"
    >
      <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Demande de réservation
      </h3>
      <div>
        <label htmlFor="res-dest" className="block text-stone-400 text-sm mb-1">Destination</label>
        <select
          id="res-dest"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-2 rounded bg-stone-950 border border-stone-600 text-stone-200 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
        >
          <option value="">Sélectionnez</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>{d.title} — {d.price}</option>
          ))}
        </select>
        {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-start" className="block text-stone-400 text-sm mb-1">Date de début</label>
          <input
            id="res-start"
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="w-full px-4 py-2 rounded bg-stone-950 border border-stone-600 text-stone-200 focus:ring-1 focus:ring-amber-500/50"
          />
          {errors.dateStart && <p className="text-red-400 text-xs mt-1">{errors.dateStart}</p>}
        </div>
        <div>
          <label htmlFor="res-end" className="block text-stone-400 text-sm mb-1">Date de fin</label>
          <input
            id="res-end"
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="w-full px-4 py-2 rounded bg-stone-950 border border-stone-600 text-stone-200 focus:ring-1 focus:ring-amber-500/50"
          />
          {errors.dateEnd && <p className="text-red-400 text-xs mt-1">{errors.dateEnd}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-amber-500/20 border border-amber-400/60 text-amber-200 rounded hover:bg-amber-500/30 transition-colors font-medium"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Envoyer la demande
      </button>
    </motion.form>
  )
}
