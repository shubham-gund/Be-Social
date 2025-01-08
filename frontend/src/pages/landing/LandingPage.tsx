import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import  Features  from '../../components/landing/Features';
import AISection from '../../components/landing/AISection';
import Footer from '../../components/landing/Footer';
import Testimonials from '../../components/landing/Testimonials';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <Header />
      <Hero />
      <Features />
      <AISection />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default LandingPage;