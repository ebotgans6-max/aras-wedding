import { useState } from 'react';
import { Check, Star, Sparkles, ChevronDown } from 'lucide-react';

export default function Paket() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'Semua', label: 'Semua' },
    { id: 'Paket hemat', label: 'Paket Hemat' },
    { id: 'Paket Lamaran', label: 'Paket Lamaran' },
    { id: 'Wo On The Day', label: 'WO On The Day' },
    { id: 'Mc', label: 'MC' },
    { id: 'Wedding Content Creator', label: 'Wedding Content Creator' },
    { id: 'Fotographer/Videographer', label: 'Fotografer & Videografer' },
    { id: 'Dekorasi', label: 'Dekorasi' },
    { id: 'Makeup', label: 'Makeup' },
  ];

  const allServices = [
    {
      id: 1,
      category: 'Wo On The Day',
      name: 'Bronze - 3 Crew',
      priceLabel: 'Harga',
      originalPrice: 'Rp 2,3 Juta',
      price: 'Rp 1,8 Juta',
      desc: 'Koordinasi hari-H hemat dan rapi untuk pernikahan intim berskala kecil.',
      features: [
        'Max 6 jam kerja',
        '1 Confetti Popper',
        'free konsultasi',
        'teknikal meeting 2x online / offline (charge)',
        'rundown acara',
        'teks izin nikah',
        'tulisan meja akad',
        'Koordinasi Seluruh Vendor',
        'Koordinasi KUA',
        'Memandu Akad+Resepsi',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Bronze - 3 Crew.',
    },
    {
      id: 2,
      category: 'Wo On The Day',
      name: 'Silver - 4 Crew',
      priceLabel: 'Harga',
      originalPrice: 'Rp 3 Juta',
      price: 'Rp 2,3 Juta',
      desc: 'Layanan WO paling populer untuk koordinasi hari-H secara profesional dan menyeluruh.',
      features: [
        'Max 6 jam kerja',
        '1 Confetti Popper',
        'Free konsultasi',
        'Teknikal meeting 2x online / offline (charge)',
        'Rundown acara',
        'Teks izin nikah',
        'Tulisan meja akad',
        'Koordinasi Seluruh Vendor',
        'Koordinasi KUA',
        'Memandu Akad+Resepsi',
      ],
      popular: true,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Silver - 4 Crew.',
    },
    {
      id: 3,
      category: 'Wo On The Day',
      name: 'Gold - 5 Crew',
      priceLabel: 'Harga',
      originalPrice: 'Rp 3,5 Juta',
      price: 'Rp 2,5 Juta',
      desc: 'Layanan koordinasi WO super eksklusif untuk kelancaran penuh hari pernikahan Anda.',
      features: [
        'Max 6 jam kerja',
        '1 Confetti Popper',
        'Free konsultasi',
        'Teknikal meeting 2x online / offline (charge)',
        'Rundown acara',
        'Teks izin nikah',
        'Tulisan meja akad',
        'Koordinasi Seluruh Vendor',
        'Koordinasi KUA',
        'Memandu Akad+Resepsi',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Gold - 5 Crew.',
    },
    {
      id: 4,
      category: 'Paket hemat',
      name: 'Sakinah',
      priceLabel: 'Harga',
      originalPrice: 'Rp 4 Juta',
      price: 'Rp 3,2 Juta',
      desc: '( 1 Mc + 4 Crew )',
      features: [
        '1 Mc',
        '4 Crew Wo',
        'Max 6 jam kerja',
        '1 Confetti Popper',
        'free konsultasi',
        'teknikal meeting 2x online / offline (charge)',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Sakinah.',
    },
    {
      id: 5,
      category: 'Paket hemat',
      name: 'Mawaddah',
      priceLabel: 'Harga',
      originalPrice: 'Rp 4 Juta',
      price: 'Rp 3,3 Juta',
      desc: '( 1 Mc + 1 Content Creator + 3 Crew )',
      features: [
        '1 Mc',
        '1 Content Creator 3 jam',
        '3 Crew Wo',
        'Max 6 jam kerja',
        '1 Confetti Popper',
        'free konsultasi',
        'teknikal meeting 2x online / offline (charge)',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Mawaddah.',
    },
    {
      id: 20,
      category: 'Paket hemat',
      name: 'Warahmah',
      priceLabel: 'Harga',
      originalPrice: 'Rp 10 Juta',
      price: 'Rp 6 Juta',
      desc: '( 1 Mc + 1 Wcc + Fg & Vg + 4 Crew )',
      features: [
        '1 Mc',
        '1 Wcc',
        '1 Fg & 1 Vg Max 10 Jam',
        '4 Crew Wo',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Warahmah.',
    },
    {
      id: 17,
      category: 'Paket Lamaran',
      name: 'Bronze - 3 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 2 Juta',
      price: 'Rp 1,6 Juta',
      desc: 'Paket lengkap hemat untuk merayakan momen lamaran hangat bersama keluarga.',
      features: [
        '1 Mc',
        '2 Crew Wo',
        'Free Konsultasi',
        'Free Teknikal Meeting 2x',
        'Ebook Panduan Acara & Rundown',
        'Memandu Sesi Games',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Bronze - 3 Jam.',
    },
    {
      id: 18,
      category: 'Paket Lamaran',
      name: 'Silver - 3 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 1,8 Juta',
      price: 'Rp 1,3 Juta',
      desc: 'Paket lengkap hemat lamaran terpadu dengan bantuan Wedding Content Creator.',
      features: [
        '1 Mc',
        '1 Content Creator',
        'Free Konsultasi',
        'Free Teknikal Meeting 2x',
        'Ebook Panduan Acara & Rundown',
        'Memandu Sesi Games',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Silver - 3 Jam.',
    },
    {
      id: 19,
      category: 'Paket Lamaran',
      name: 'Gold - 3 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 3 Juta',
      price: 'Rp 2 Juta',
      desc: 'Paket lamaran lengkap dan eksklusif dengan MC, kru WO, dan Content Creator terintegrasi.',
      features: [
        '1 Mc',
        '1 Content Creator',
        '2 Crew Wo',
        'Free Konsultasi',
        'Free Teknikal Meeting 2x',
        'Ebook Panduan Acara & Rundown',
        'Memandu Sesi Games',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Gold - 3 Jam.',
    },
    {
      id: 6,
      category: 'Mc',
      name: 'Exclusive Single MC',
      priceLabel: 'Harga',
      originalPrice: 'Rp 3 Juta',
      price: 'Rp 1,3 Juta',
      desc: 'Dipandu oleh 1 MC pernikahan profesional untuk suasana khidmat dan elegan.',
      features: [
        '1 MC Profesional Pria Atau Wanita',
        'Durasi Acara 6 Jam',
        'Bahasa Indonesia Formal & Kasual',
      ],
      popular: true,
      whatsappText: 'Halo Aras Wedding, saya tertarik menyewa jasa Exclusive Single MC.',
    },
    {
      id: 8,
      category: 'Wedding Content Creator',
      name: 'Bronze - 3 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 500.000',
      price: 'Rp 350.000',
      desc: 'Pengambilan momen estetis di balik layar untuk media sosial Anda.',
      features: [
        'Up 3-5 Story (Realtime)',
        '1 Video Cinematic/BTS (1-2 Menit, Sameday Edit)',
        '1 Video Trend (Free Request)',
        'Kirim Via Google Drive',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Bronze - 3 Jam.',
    },
    {
      id: 9,
      category: 'Wedding Content Creator',
      name: 'Silver - 5 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 600.000',
      price: 'Rp 450.000',
      desc: 'Liputan konten real-time terlengkap untuk tren video TikTok & Reels modern.',
      features: [
        'Up 5-7 Story (Realtime)',
        '1 Video Cinematic/BTS (1-2 Menit, Sameday Edit)',
        '2 Video Trend (Free Request)',
        'Kirim Via Google Drive',
      ],
      popular: true,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Silver - 5 Jam.',
    },
    {
      id: 16,
      category: 'Wedding Content Creator',
      name: 'Gold - 7 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 1 Juta',
      price: 'Rp 700.000',
      desc: 'Liputan konten real-time eksklusif dan lengkap selama acara pernikahan Anda.',
      features: [
        'Up 7-10 Story (Realtime)',
        '1 Video Cinematic/BTS (1-2 Menit, Sameday Edit)',
        '3 Video Trend (Free Request)',
        'Kirim Via Google Drive',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Gold - 7 Jam.',
    },
    {
      id: 10,
      category: 'Fotographer/Videographer',
      name: 'Bronze - 10 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 3 Juta',
      price: 'Rp 1,8 Juta',
      desc: 'Dokumentasi lengkap foto berkualitas untuk mengabadikan momen penting Anda.',
      features: [
        'Max. 10 hours',
        '1 Photographer',
        'Best file edited',
        'Edited retouch for file pose',
        'Album Magnetic 110 photo 4R (Magazine 10 sheet + 600rb)',
        'All file on flashdisk/USB',
        'Free edited layout for post',
      ],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Bronze - 10 Jam.',
    },
    {
      id: 11,
      category: 'Fotographer/Videographer',
      name: 'Silver - 10 Jam',
      priceLabel: 'Harga',
      originalPrice: 'Rp 4 Juta',
      price: 'Rp 2,5 Juta',
      desc: 'Dokumentasi visual berkualitas tinggi untuk mengabadikan hari istimewa Anda secara lengkap.',
      features: [
        'Max. 10 hours',
        '1 Photographer (Bonus 1 Crew jika ada)',
        '1 Videografer',
        'Best file edited',
        'Edited retouch for file pose',
        'Album Magnetic 80 photo 4R (Magazine 10 sheet + 600rb)',
        'Liputan video (Cinematic + 800rb)',
        'All file on flashdisk/USB',
        'Free edited layout for post',
      ],
      popular: true,
      whatsappText: 'Halo Aras Wedding, saya tertarik dengan paket Silver - 10 Jam.',
    },
    {
      id: 12,
      category: 'Dekorasi',
      name: 'Coming Soon',
      isComingSoon: true,
      desc: 'Kami sedang menyiapkan pilihan dekorasi terbaik dan elegan untuk hari bahagia Anda. Nantikan segera!',
      features: [],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya ingin bertanya info tentang layanan Dekorasi.',
      buttonText: 'Hubungi Admin untuk Info',
    },
    {
      id: 14,
      category: 'Makeup',
      name: 'Coming Soon',
      isComingSoon: true,
      desc: 'Kami sedang menyiapkan pilihan Makeup Artist (MUA) dan busana pengantin terbaik untuk hari bahagia Anda. Nantikan segera!',
      features: [],
      popular: false,
      whatsappText: 'Halo Aras Wedding, saya ingin bertanya info tentang layanan Makeup & Busana.',
      buttonText: 'Hubungi Admin untuk Info',
    },
  ];

  const filteredServices = activeCategory === 'Semua'
    ? allServices
    : allServices.filter(service => service.category === activeCategory);

  return (
    <section id="packages" className="py-24 bg-charcoal relative overflow-hidden bg-grid-pattern">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase block">Pilihan Layanan</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
            Paket & <span className="text-gold-gradient">Layanan Kami</span>
          </h2>
          <div className="h-[2px] w-24 bg-gold-gradient mx-auto"></div>
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base">
            Kami menyediakan paket terlengkap dan layanan individual terbaik yang bisa Anda sesuaikan untuk mewujudkan pernikahan impian Anda.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-charcoal-dark font-bold text-sm md:text-base tracking-wider transition-all duration-300 gold-glow hover:gold-glow-strong hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <span>{isExpanded ? 'Sembunyikan Pilihan Paket & Harga' : 'Lihat Pilihan Paket & Harga'}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isExpanded && (
          <div className="animate-slide-up">
            {/* Category Tabs (Horizontally scrollable on mobile) */}
            <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-6 mb-16 max-w-full justify-start lg:justify-center scrollbar-thin scrollbar-thumb-gold/60 scrollbar-track-charcoal-dark px-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 inline-block shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-gold-gradient text-charcoal-dark gold-glow font-bold'
                      : 'border border-gold/20 text-gray-300 hover:border-gold hover:text-white bg-charcoal-card/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Pricing Cards Grid */}
            <div className={`grid grid-cols-1 gap-8 items-stretch ${
              filteredServices.length === 1 
                ? 'max-w-md mx-auto w-full' 
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filteredServices.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between ${
                    pkg.popular
                      ? 'glass-card border-gold/80 gold-glow-strong scale-100 lg:scale-105 z-10'
                      : 'glass-card border-gold/20 opacity-90 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  {/* Popular/Recommendation Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gold-gradient text-charcoal-dark font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-charcoal-dark" />
                      Rekomendasi
                      <Sparkles className="w-3.5 h-3.5 fill-charcoal-dark" />
                    </div>
                  )}

                  {/* Package Header */}
                  <div>
                    <span className="text-[10px] font-semibold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                      {pkg.category}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-xs text-gray-400 font-light min-h-[36px] mb-6">{pkg.desc}</p>
                    {!pkg.isComingSoon && (
                      <div className="border-b border-gold/10 pb-6 mb-6">
                        <span className="text-xs text-gold uppercase tracking-wider block font-semibold mb-1">
                          {pkg.priceLabel || 'Mulai Dari'}
                        </span>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {pkg.originalPrice}
                            </span>
                          )}
                          <span className="font-playfair text-3xl md:text-4xl font-bold text-gold-gradient">
                            {pkg.price}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Features List */}
                    {!pkg.isComingSoon && pkg.features && pkg.features.length > 0 && (
                      <ul className="space-y-3.5 mb-8">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-3 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Button */}
                  <div>
                    <a
                      href={`https://wa.me/6285183270299?text=${encodeURIComponent(pkg.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-3.5 px-6 rounded-full font-semibold tracking-wide text-sm transition-all duration-300 ${
                        pkg.popular
                          ? 'bg-gold-gradient hover:bg-gold-gradient-hover text-charcoal-dark gold-glow hover:gold-glow-strong'
                          : 'border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold-light'
                      }`}
                    >
                      {pkg.buttonText || 'Tanya Layanan Ini'}
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* Custom package notice */}
            <div className="mt-16 text-center glass-card border border-gold/15 p-6 max-w-3xl mx-auto rounded-2xl">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-gold-light">Ingin konsep kustom di luar paket di atas?</span> Hubungi kami untuk berkonsultasi mengenai rancangan pernikahan impian Anda yang disesuaikan secara personal.
                <a 
                  href="https://wa.me/6285183270299?text=Halo%20Aras%20Wedding,%20saya%20tertarik%20konsultasi%20paket%20kustom%20pernikahan"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold font-bold hover:underline inline-flex items-center ml-2"
                >
                  Hubungi Planner Kami &rarr;
                </a>
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
