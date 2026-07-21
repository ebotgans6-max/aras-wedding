import { Quote, Star } from 'lucide-react';

export default function Testimoni() {
  const testimonials = [
    {
      name: 'Ratmani & Rindiani',
      date: 'Januari 2026',
      venue: 'Rusunawa Rawabebek',
      quote: 'Aku dan mas mau ngucapin makasih sebanyak banyaknya karena udah dibantu untuk kelancaran acaranya nikahan kita 😽\n\nSalah satu hal yg aku gk sesali adalah pake wo dari aras. Kerennn banget aku sampe happy bgt. Hal hal kecil aja di bantu bgt, aku terharu 🥺🥰\n\nTeam nya gercep bgt, keren sihhh ka. Aku bner bner happyyyy 😍sampe rasanya pas acara aku gk bisa jauh dri team aras, terutama Ka Caca yg kmren intens bantu aku. 🙌😚\n\nMakasih banyak yah 🙌🤍\n\nAku dan keluarga juga mau minta maaf kalo sambutan dan sajian nya kurang baik. Mohon di maklumi yah ka 🤭\n\nSukses terus untuk Aras wedding organizer 🔥✨',
      rating: 5,
    },
    {
      name: 'Dapa & Suci',
      date: 'Maret 2026',
      venue: 'Cibinong Kab Bogor',
      quote: 'Kakaaaakkk ,aku mau ngucapin terimakasih banyakkkk ke kaka2 semuaaa,team nya ramah semuaa masyaallah. Wajib aku rekomendasikan ke temen2 aku untuk team wo aras inii🤗🥰',
      rating: 5,
    },
    {
      name: 'Rendy & Frisca',
      date: 'Mei 2026',
      venue: 'GOR Sawah Besar',
      quote: 'Kakk makasi yaa udah suksesin acara aku!!! Sumpah aku terharuu🥹🥹, crew kakak pd baik semua, pd lembut, pd ramah, pd peka, pd ga sibuk sendiri, pokonya ngelayanin aku bgt & atur acaranya aku, bener2 sesuai ekspektasi aku bahkan lebih, mcnya juga seru bgtt kak aku suka, seneng bgt ka eddy bisa ngeusahain semuanya, aku rekomen bangett jasa kakak pd keren2, next klo aku buka paket all in pasti wonya mau kaka aja gamau yg lain!!!🥹🥹🥹🩷🩷🩷🩷🩷',
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
                <p className="text-gray-300 font-light italic leading-relaxed text-sm md:text-base whitespace-pre-line text-left">
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
