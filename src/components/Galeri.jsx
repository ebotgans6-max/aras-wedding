import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['Semua'];

  const items = [
    {
      id: 1,
      category: 'AKAD NIKAH',
      title: 'Momen Suci Akad Nikah',
      src: '/images/gallery-1.jpg',
      desc: 'Mengabadikan senyum kebahagiaan dan momen sakral yang tak terlupakan saat janji suci diucapkan.',
    },
    {
      id: 2,
      category: 'Pasangan',
      title: 'The Royal March',
      src: '/images/gallery-2.JPEG',
      desc: 'Momen kebahagiaan pasangan berjalan di pelaminan dikelilingi bunga mawar putih dan dekorasi emas.',
    },
    {
      id: 3,
      category: 'TIM WO',
      title: 'Kekompakan Tim & Pengantin',
      src: '/images/gallery-3.jpeg',
      desc: 'Kebahagiaan terpancar dari pasangan pengantin dan tim kami setelah seluruh rangkaian acara resepsi berjalan sukses dan lancar.',
    },
    {
      id: 4,
      category: 'KEPUASAN KLIEN',
      title: 'Senyum Puas Klien Kami',
      src: '/images/gallery-4.jpg',
      desc: 'Dedikasi penuh dari kru Aras Wedding untuk memastikan hari bahagia Anda berjalan sempurna tanpa hambatan dari awal hingga akhir.',
    },
  ];

  const filteredItems = activeFilter === 'Semua' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-charcoal-dark relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase block">Galeri Portofolio</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
            Setiap Momen Adalah <span className="text-gold-gradient">Karya Seni</span>
          </h2>
          <div className="h-[2px] w-24 bg-gold-gradient mx-auto"></div>
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base">
            Intip kemegahan dan detail elegan dari acara-acara yang telah sukses kami koordinasikan sebelumnya.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gold-gradient text-charcoal-dark gold-glow'
                  : 'border border-gold/20 text-gray-300 hover:border-gold hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-charcoal-card aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Hover State */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold" />
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-white leading-snug">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gold p-1 bg-charcoal-card/80 border border-gold/10 rounded-full focus:outline-none transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col bg-charcoal-card border border-gold/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="overflow-hidden bg-black flex items-center justify-center flex-grow max-h-[60vh]">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>
            
            {/* Modal Info */}
            <div className="p-6 md:p-8 border-t border-gold/15 bg-charcoal-dark">
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-1.5 inline-block">
                {selectedImage.category}
              </span>
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-light">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
