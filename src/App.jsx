import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TentangKami from './components/TentangKami';
import Paket from './components/Paket';
import Galeri from './components/Galeri';
import Testimoni from './components/Testimoni';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import OnboardingForm from './components/OnboardingForm';

export default function App() {
  // Simple state to toggle between main site and onboarding form
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="bg-charcoal text-white min-h-screen relative selection:bg-gold selection:text-charcoal-dark">
      {/* Background Subtle Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

      {/* Main UI Wrapper */}
      <div className="relative z-10">
        <Navbar onToggleOnboarding={() => setShowOnboarding(!showOnboarding)} />
        
        {showOnboarding ? (
          <div className="pt-24 pb-12">
             <OnboardingForm />
          </div>
        ) : (
          <>
            <Hero />
            <TentangKami />
            <Paket />
            <Galeri />
            <Testimoni />
            <FAQ />
          </>
        )}
        
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
