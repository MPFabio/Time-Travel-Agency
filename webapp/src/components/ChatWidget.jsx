import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Time Travel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être trop familier.
Tu connais parfaitement : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), le Crétacé il y a 65 millions d'années (dinosaures, nature préhistorique), Florence 1504 (Renaissance, art, Michel-Ange).
Tu peux donner des prix fictifs cohérents (ex. Paris 1889 ~12 900€, Crétacé ~24 500€, Florence 1504 ~15 700€), des conseils pour choisir une époque, et répondre à la FAQ agence.
Réponds uniquement en français, de façon concise et pertinente.`

const API_GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const API_MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions'

async function sendMessage(messages, apiKey, provider = 'groq') {
  const url = provider === 'mistral' ? API_MISTRAL_URL : API_GROQ_URL
  const model = provider === 'mistral' ? 'mistral-small-latest' : 'llama-3.1-8b-instant'
  const body = provider === 'mistral'
    ? { model, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages] }
    : { model, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages] }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || res.statusText)
  }
  const data = await res.json()
  const choice = data.choices?.[0]
  if (!choice?.message?.content) throw new Error('Réponse API invalide')
  return choice.message.content.trim()
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis l’assistant de Time Travel Agency. Posez-moi vos questions sur les voyages temporels, nos destinations (Paris 1889, Crétacé, Florence 1504) ou les tarifs.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listRef = useRef(null)

  const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_MISTRAL_API_KEY
  const provider = import.meta.env.VITE_MISTRAL_API_KEY ? 'mistral' : 'groq'

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    if (!apiKey) {
      setError('Clé API non configurée. Ajoutez VITE_GROQ_API_KEY ou VITE_MISTRAL_API_KEY dans .env')
      return
    }
    setError(null)
    const userMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    try {
      const history = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }))
      const reply = await sendMessage(history, apiKey, provider)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Désolé, une erreur s’est produite : ${err.message}. Vérifiez votre clé API.` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-900 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Ouvrir le chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.861 9.861 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[480px] flex flex-col rounded-lg border border-amber-900/40 bg-stone-950 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-amber-900/30 bg-stone-900/80">
              <span className="font-semibold text-amber-400" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Assistant Time Travel
              </span>
              <button type="button" onClick={() => setOpen(false)} className="text-stone-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-amber-500/20 text-amber-100 border border-amber-500/40'
                        : 'bg-stone-800/80 text-stone-200 border border-stone-700'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {error && <p className="text-red-400 text-sm">{error}</p>}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-stone-800/80 rounded-lg px-3 py-2 text-stone-400 text-sm">Réflexion...</div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="p-3 border-t border-amber-900/30">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="w-full px-4 py-2 rounded bg-stone-900 border border-amber-900/40 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                style={{ fontFamily: 'Inter, sans-serif' }}
                disabled={loading}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
