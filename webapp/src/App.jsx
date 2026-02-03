import Header from './components/Header'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import QuizRecommandation from './components/QuizRecommandation'
import ReservationForm from './components/ReservationForm'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Destinations />
        <QuizRecommandation />
        <section id="reservation" className="py-20 px-4 bg-[#0c0a09]">
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Réserver
            </h2>
            <p className="text-center text-stone-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sélectionnez votre destination et vos dates.
            </p>
          </div>
          <ReservationForm />
        </section>
        <Footer />
      </main>
      <ChatWidget />
    </>
  )
}

export default App
