import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import  Features  from '../../components/landing/Features';
import AISection from '../../components/landing/AISection';
import Footer from '../../components/landing/Footer';
import Testimonials from '../../components/landing/Testimonials';
import Pricing from '../../components/landing/Pricing';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <Header />
      <Hero />
      <Features />
      <AISection />
      <Pricing/>
      <Testimonials />
      <Footer />
    </div>
  )
}

export default LandingPage;