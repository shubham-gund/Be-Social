import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import  Features  from '../../components/landing/Features';
import AISection from '../../components/landing/AISection';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <Header />
      <Hero />
      <Features />
      <AISection />
      <Footer />
    </div>
  )
}

export default LandingPage;