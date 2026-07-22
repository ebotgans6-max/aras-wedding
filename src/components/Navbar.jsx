import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onToggleOnboarding }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Paket', href: '#packages' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass-navbar py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <span className="font-playfair text-xl md:text-2xl font-bold tracking-widest text-gold-gradient uppercase">
              Aras Wedding
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onToggleOnboarding}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-300"
            >
              Onboarding Client
            </button>
            <a
              href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20konsultasi%20paket%20pernikahan"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient hover:bg-gold-gradient-hover text-charcoal-dark font-semibold px-5 py-2 rounded-full text-sm tracking-wide gold-glow hover:gold-glow-strong transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Konsultasi
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gold focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-charcoal-dark/95 border-b border-gold/10 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-3 glass-card border-t-0 border-x-0 rounded-none">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gold hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              onToggleOnboarding();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gold hover:bg-white/5 transition-all duration-200"
          >
            Onboarding Client
          </button>
          <div className="pt-2 px-3">
            <a
              href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20konsultasi%20paket%20pernikahan"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gold-gradient text-charcoal-dark font-semibold py-2.5 rounded-full text-sm gold-glow"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
