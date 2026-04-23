import Header from './app/components/Header';
import HeroSection from './app/components/HeroSection';
import DailyPrayer from './app/components/DailyPrayer';
import NewsSection from './app/components/NewsSection';
import EventsSection from './app/components/EventsSection';
import Footer from './app/components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <DailyPrayer />
        <NewsSection />
        <EventsSection />
      </main>

      <Footer />
    </div>
  )
}

export default App