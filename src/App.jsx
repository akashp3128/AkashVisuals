import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedWorks from './components/FeaturedWorks';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  // Initialize smooth scrolling
  useLenis();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedWorks />
        <Services />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
