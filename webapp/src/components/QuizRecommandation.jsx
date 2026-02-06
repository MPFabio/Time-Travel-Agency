import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '../data/destinations'

const QUESTIONS = [
  {
    id: 'experience',
    label: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { value: 'culturelle', label: 'Culturelle et artistique' },
      { value: 'aventure', label: 'Aventure et nature' },
      { value: 'elegance', label: 'Élégance et raffinement' },
    ],
  },
  {
    id: 'period',
    label: 'Votre période préférée ?',
    options: [
      { value: 'moderne', label: 'Histoire moderne (XIXe-XXe siècle)' },
      { value: 'origines', label: 'Temps anciens et origines' },
      { value: 'renaissance', label: 'Renaissance et classicisme' },
    ],
  },
  {
    id: 'preference',
    label: 'Vous préférez :',
    options: [
      { value: 'urbain', label: 'L\'effervescence urbaine' },
      { value: 'nature', label: 'La nature sauvage' },
      { value: 'art', label: 'L\'art et l\'architecture' },
    ],
  },
  {
    id: 'activity',
    label: 'Votre activité idéale :',
    options: [
      { value: 'monuments', label: 'Visiter des monuments' },
      { value: 'faune', label: 'Observer la faune' },
      { value: 'musees', label: 'Explorer des musées' },
    ],
  },
]

function mapAnswersToDestination(answers) {
  const a = Object.fromEntries(answers)
  let score = { 'paris-1889': 0, 'cretace': 0, 'florence-1504': 0 }
  if (a.experience === 'culturelle' || a.preference === 'art' || a.activity === 'musees') {
    score['florence-1504'] += 2
    score['paris-1889'] += 1
  }
  if (a.experience === 'aventure' || a.preference === 'nature' || a.activity === 'faune') {
    score.cretace += 2
  }
  if (a.experience === 'elegance' || a.period === 'moderne' || a.preference === 'urbain' || a.activity === 'monuments') {
    score['paris-1889'] += 2
  }
  if (a.period === 'renaissance') score['florence-1504'] += 2
  if (a.period === 'origines') score.cretace += 2
  const max = Math.max(...Object.values(score))
  const id = Object.keys(score).find((k) => score[k] === max) || 'paris-1889'
  return destinations.find((d) => d.id === id) || destinations[0]
}

const EXPLANATIONS = {
  'paris-1889': 'Paris 1889 correspond à votre goût pour l\'élégance et l\'histoire moderne : Exposition universelle, Tour Eiffel et vie mondaine vous attendent.',
  'cretace': 'Le Crétacé est idéal pour vous : aventure, nature préservée et rencontres inoubliables avec la faune préhistorique.',
  'florence-1504': 'Florence 1504 s\'accorde parfaitement à votre attrait pour l\'art et la Renaissance : ateliers, musées et palais au programme.',
}

export default function QuizRecommandation() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [aiExplanation, setAiExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

  const question = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  const handleChoice = (value) => {
    const next = [...answers, [question.id, value]]
    setAnswers(next)
    if (isLast) {
      const dest = mapAnswersToDestination(next)
      setResult(dest)
      setLoading(true)
      const apiKey = (import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_MISTRAL_API_KEY || '').trim()
      if (apiKey) {
        const provider = (import.meta.env.VITE_MISTRAL_API_KEY || '').trim() ? 'mistral' : 'groq'
        const url = provider === 'mistral' ? 'https://api.mistral.ai/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions'
        const model = provider === 'mistral' ? 'mistral-small-latest' : 'llama-3.1-8b-instant'
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'user',
                content: `En 2 phrases maximum, explique pourquoi la destination "${dest.title}" (${dest.subtitle}) est idéale pour quelqu'un qui a répondu : ${JSON.stringify(Object.fromEntries(next))}. Ton style : chaleureux et professionnel.`,
              },
            ],
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            const text = data.choices?.[0]?.message?.content?.trim()
            if (text) setAiExplanation(text)
          })
          .catch(() => setAiExplanation(EXPLANATIONS[dest.id]))
          .finally(() => setLoading(false))
      } else {
        setAiExplanation(EXPLANATIONS[dest.id])
        setLoading(false)
      }
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
    setAiExplanation('')
  }

  return (
    <section id="quiz" className="py-20 md:py-28 px-4 bg-stone-950">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold text-center text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Trouvez votre destination
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-stone-400 mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Répondez à 4 questions pour une recommandation personnalisée.
        </motion.p>

        <div ref={containerRef} className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-stone-900/60 border border-amber-900/30 rounded-lg p-6 sm:p-8"
              >
                <p className="text-amber-400/90 text-sm mb-4">Question {step + 1} / {QUESTIONS.length}</p>
                <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {question.label}
                </h3>
                <ul className="space-y-3">
                  {question.options.map((opt) => (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => handleChoice(opt.value)}
                        className="w-full text-left px-4 py-3 rounded border border-stone-600 hover:border-amber-500/50 hover:bg-amber-500/10 text-stone-200 transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-stone-900/60 border border-amber-900/30 rounded-lg p-6 sm:p-8"
              >
                <p className="text-amber-400 text-sm mb-2">Votre destination recommandée</p>
                <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {result.title}
                </h3>
                <p className="text-stone-400 text-sm mb-4">{result.subtitle}</p>
                {loading ? (
                  <p className="text-stone-500">Génération de votre recommandation...</p>
                ) : (
                  <p className="text-stone-300 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {aiExplanation || EXPLANATIONS[result.id]}
                  </p>
                )}
                <p className="text-amber-300 font-medium mb-6">{result.price}</p>
                <a
                  href={`#dest-${result.id}`}
                  className="inline-block px-5 py-2 bg-amber-500/20 border border-amber-400/60 text-amber-200 rounded hover:bg-amber-500/30 transition-colors text-sm font-medium"
                >
                  Voir cette destination
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="ml-4 text-stone-400 hover:text-amber-400 text-sm"
                >
                  Refaire le quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
