import { CheckCircle2, Heart, Award, Users } from 'lucide-react';

export default function TentangKami() {
  const stats = [
    { label: 'Tahun Pengalaman', value: '5+', icon: Award },
    { label: 'Pernikahan Sukses', value: '500+', icon: Heart },
    { label: 'Mitra Vendor Premium', value: '10+', icon: Users },
  ];

  const features = [
    'Konsep pernikahan kustom & eksklusif',
    'Tim profesional & berpengalaman di lapangan',
    'Jaringan vendor dekorasi, katering & gaun terbaik',
    'Manajemen anggaran yang transparan',
    'Koordinasi hari-H yang mulus & tanpa stres',
  ];

  return (
    <section id="about" className="py-24 bg-charcoal-dark relative overflow-hidden">
      {/* Decorative Golden Blur Circles */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Outer Golden Border Effect */}
              <div className="absolute -inset-2 rounded-2xl bg-gold-gradient opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
              
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 aspect-[4/5] bg-charcoal-card">
                <img 
                  src="/images/gallery-2.JPEG" 
                  alt="Aras Wedding Couple Portrait" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Stat Widget */}
              <div className="absolute -bottom-6 -right-6 glass-card p-5 rounded-2xl border border-gold/30 gold-glow">
                <p className="font-playfair text-3xl font-bold text-gold">99.8%</p>
                <p className="text-xs tracking-wider text-gray-300 font-semibold uppercase">Kepuasan Klien</p>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold tracking-widest text-gold uppercase block">Tentang Kami</span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight">
                Mewujudkan Kisah Cinta Anda Menjadi <span className="text-gold-gradient">Mahakarya Indah</span>
              </h2>
              <div className="h-[2px] w-24 bg-gold-gradient"></div>
            </div>

            <p className="text-gray-300 leading-relaxed font-light">
              Di <strong>Aras Wedding Organizer</strong>, kami percaya bahwa setiap pernikahan adalah cerminan unik dari kisah cinta dua insan. Kami hadir untuk menanggung semua beban perencanaan agar Anda dapat menikmati setiap detik berharga menuju hari bahagia Anda.
            </p>

            <p className="text-gray-300 leading-relaxed font-light">
              Dari konsep awal, pemilihan vendor premium, manajemen anggaran, hingga koordinasi hari-H secara presisi, tim kami memastikan setiap detail dieksekusi dengan sempurna dan mencerminkan kemewahan yang personal.
            </p>

            {/* Core Advantages List */}
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/10">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:space-x-3 mb-2 justify-center md:justify-start">
                      <IconComponent className="w-5 h-5 text-gold mb-1 md:mb-0" />
                      <span className="font-playfair text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">{stat.label}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
