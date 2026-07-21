import { Quote, Star } from 'lucide-react';

export default function Testimoni() {
  const testimonials = [
    {
      name: 'Aditya & Kinanti',
      date: 'Januari 2026',
      venue: 'Hotel Mulia Jakarta',
      quote: 'Dari awal konsultasi sampai hari-H, semuanya berjalan sangat rapi. Kak Aras dan tim benar-benar detail-oriented. Dekorasi hitam-emas yang kami inginkan terwujud melebihi ekspektasi!',
      rating: 5,
    },
    {
      name: 'Reza & Amanda',
      date: 'Maret 2026',
      venue: 'Plataran Cilandak',
      quote: 'Sangat merekomendasikan Aras Wedding! Kami sebagai pengantin tidak merasa stres sama sekali di hari pernikahan. Semua vendor dikoordinasikan dengan sangat baik, rundown tepat waktu.',
      rating: 5,
    },
    {
      name: 'Dimas & Felicia',
      date: 'Mei 2026',
      venue: 'Ritz-Carlton Mega Kuningan',
      quote: 'Terima kasih banyak atas dukungannya! Tim yang sigap, ramah, dan solutif. Pesta pernikahan megah kami dihadiri 1200 tamu dan semua berjalan tertib berkat sistem RSVP digital dari Aras.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase block">Testimoni Klien</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
            Kisah Kebahagiaan <span className="text-gold-gradient">Mereka</span>
          </h2>
          <div className="h-[2px] w-24 bg-gold-gradient mx-auto"></div>
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base">
            Kepuasan dan kebahagiaan pasangan adalah kebanggaan terbesar dan bukti dedikasi profesional kami.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl p-8 border-gold-hover relative flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute -top-5 left-8 bg-gold-gradient text-charcoal-dark p-3 rounded-xl shadow-lg">
                <Quote className="w-5 h-5 fill-charcoal-dark" />
              </div>

              {/* Text / Body */}
              <div className="mt-4 mb-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-300 font-light italic leading-relaxed text-sm md:text-base">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Footer / Author info */}
              <div className="border-t border-gold/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-playfair text-base font-bold text-gold-light">{test.name}</h4>
                  <p className="text-xs text-gray-400">{test.venue}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gold border border-gold/30 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                    {test.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
