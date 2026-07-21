import { Calendar, Award, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Luxury Wedding Altar Setup" 
          className="w-full h-full object-cover transform scale-105 animate-fade-in"
          style={{ animationDuration: '3s' }}
        />
        <div className="absolute inset-0 bg-overlay-gradient"></div>
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
        {/* Small Intro Badge */}
        <div className="inline-flex items-center space-x-2 bg-charcoal-dark/70 border border-gold/30 rounded-full px-4 py-1.5 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">Luxury Wedding, Friendly Budget</span>
        </div>

        {/* Heading */}
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Mewujudkan Pernikahan Mewah <br />
          <span className="text-gold-gradient italic">dengan Harga yg Murah</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mb-10 leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.6s' }}>
          Paket pernikahan eksklusif mulai dari Rp300rb-an, dan semua paket sudah termasuk Free Undangan Digital untuk mewujudkan pernikahan impian Anda di Jabodetabek
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <a
            href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20konsultasi%20paket%20pernikahan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gold-gradient hover:bg-gold-gradient-hover text-charcoal-dark font-bold px-8 py-4 rounded-full tracking-wide shadow-xl gold-glow hover:gold-glow-strong transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Konsultasi Gratis
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#packages"
            className="w-full sm:w-auto border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold-light font-medium px-8 py-4 rounded-full tracking-wide transition-all duration-300 transform hover:-translate-y-1"
          >
            Lihat Paket Pernikahan
          </a>
        </div>

        {/* Mini Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gold/10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-gold mb-2" />
            <h3 className="font-playfair text-lg font-bold text-gold-light">Premium Service</h3>
            <p className="text-xs text-gray-400">Kualitas & standar bintang lima</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-6 h-6 text-gold mb-2" />
            <h3 className="font-playfair text-lg font-bold text-gold-light">Seamless Planning</h3>
            <p className="text-xs text-gray-400">Perencanaan detail & tanpa stres</p>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-gold mb-2" />
            <h3 className="font-playfair text-lg font-bold text-gold-light">Unforgettable</h3>
            <p className="text-xs text-gray-400">Momen terindah seumur hidup</p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-charcoal-dark to-transparent z-10"></div>
    </section>
  );
}
