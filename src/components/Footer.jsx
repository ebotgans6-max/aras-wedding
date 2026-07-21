import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/aras_wedingorganizer',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'Threads',
      href: 'https://www.threads.net/@aras_wedingorganizer',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
        </svg>
      )
    },
  ];

  const quickLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Paket', href: '#packages' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="bg-charcoal-dark border-t border-gold/15 relative overflow-hidden">
      {/* Decorative Gold Grid bottom */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-gold fill-gold/25" />
              <span className="font-playfair text-2xl font-bold tracking-widest text-gold-gradient uppercase">
                Aras Wedding
              </span>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
              Kami menghadirkan kesempurnaan di setiap detail pernikahan. Layanan eksklusif yang dirancang khusus untuk memastikan hari paling istimewa Anda berjalan tanpa hambatan dan penuh kebahagiaan.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-charcoal-card border border-gold/20 hover:border-gold rounded-full text-gold-light hover:text-gold hover:bg-white/5 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-playfair text-lg font-bold text-white tracking-wide border-b border-gold/20 pb-2.5 inline-block">
              Navigasi Cepat
            </h3>
            <ul className="grid grid-cols-1 gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info / WhatsApp card */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-playfair text-lg font-bold text-white tracking-wide border-b border-gold/20 pb-2.5 inline-block">
              Hubungi Kami
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.app.goo.gl/arGhKL5XQjD1mfTYA?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 text-gray-400 hover:text-gold transition-colors duration-300 group"
                >
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-light leading-relaxed">
                    Jl. Gatot Subroto, Karangasih, Cikarang Utara, Kabupaten Bekasi, 17530
                  </span>
                </a>
              </li>

              <li className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:araswedding@gmail.com" className="text-sm text-gray-400 hover:text-gold transition-colors font-light">
                  araswedding@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a
                  href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20konsultasi%20paket%20pernikahan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-gold transition-colors font-light"
                >
                  +62 851-8327-0299 (WhatsApp)
                </a>
              </li>
            </ul>

            {/* Quick WhatsApp Badge CTA */}
            <div className="glass-card border border-gold/25 p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider">Fast Response WhatsApp</p>
                <p className="text-[10px] text-gray-400">Hubungi langsung via WA chat</p>
              </div>
              <a
                href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20tanya%20paket%20pernikahan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-charcoal-dark font-bold text-xs px-4 py-2 rounded-full gold-glow hover:bg-gold-light transition-colors shrink-0"
              >
                Chat Sekarang
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Credits */}
        <div className="border-t border-gold/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <p className="text-xs text-gray-500 font-light">
            &copy; {currentYear} Aras Wedding Organizer. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-gray-500 font-light">
            Designed for Elegant and Luxury Wedding Ceremonies.
          </p>
        </div>

      </div>
    </footer>
  );
}
