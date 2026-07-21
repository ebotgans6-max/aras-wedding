import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Kapan waktu terbaik untuk menghubungi WO sebelum hari pernikahan?',
      a: 'Kami menyarankan minimal 6 hingga 12 bulan sebelum hari-H pernikahan Anda, terutama jika memilih paket perencanaan penuh. Hal ini guna memastikan ketersediaan tanggal dan waktu yang fleksibel untuk mempersiapkan seluruh kebutuhan serta mengamankan vendor utama. Namun, kami juga melayani paket persiapan instan minimal 3 bulan sebelum hari-H.',
    },
    {
      q: 'Apakah paket yang disediakan sudah termasuk sewa gedung dan katering?',
      a: 'Jasa kami berfokus pada perencanaan, konsep, manajemen, koordinasi vendor, dan jalannya acara pernikahan (Organizer). Namun, kami memiliki jaringan mitra vendor katering, gedung/venue, gaun, dekorasi, hingga MC premium yang siap memberikan penawaran khusus dan potongan harga khusus bagi klien kami.',
    },
    {
      q: 'Bagaimana jika kami ingin mengadakan pernikahan di luar kota?',
      a: 'Saat ini Aras Wedding Organizer hanya melayani wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, dan Bekasi) saja. Kami memfokuskan layanan di area ini demi menjaga kualitas koordinasi yang intensif dan memastikan standar pelayanan maksimal untuk hari bahagia Anda.',
    },
    {
      q: 'Berapa banyak kru yang bertugas pada hari pernikahan kami?',
      a: 'Jumlah kru yang bertugas akan disesuaikan dengan kesepakatan janji dan paket pernikahan yang dipesan, dengan kisaran 5 sampai 8 kru pada hari-H pernikahan. Setiap kru memiliki peran spesifik (seperti LO Pengantin, LO Keluarga, LO Vendor, Stage Manager, dan Runner) untuk menjamin seluruh rangkaian acara berjalan lancar.',
    },
    {
      q: 'Bagaimana skema pembayaran di Aras Wedding Organizer?',
      a: 'Kami menerapkan sistem pembayaran bertahap yang fleksibel demi kenyamanan Anda. Pembayaran awal (Down Payment/DP) minimal hanya sebesar Rp 300.000 saja untuk mengamankan tanggal pernikahan Anda. Sisa pelunasan pembayaran pun dapat diselesaikan hingga H+1 setelah seluruh rangkaian acara selesai, guna memberikan rasa aman dan mengurangi kekhawatiran Anda.',
    },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-charcoal-dark relative overflow-hidden bg-grid-pattern">
      {/* Decorative Gold Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase block">Pertanyaan Umum</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
            Informasi & <span className="text-gold-gradient">Pertanyaan</span>
          </h2>
          <div className="h-[2px] w-24 bg-gold-gradient mx-auto"></div>
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base">
            Temukan jawaban cepat atas pertanyaan-pertanyaan yang sering diajukan mengenai layanan kami.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`glass-card rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-gold/60 gold-glow' : 'border-gold/15'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-gold' : 'text-gray-400'
                    }`} />
                    <span className="font-semibold text-sm md:text-base text-white tracking-wide">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Answer Box */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[500px] border-t border-gold/10' : 'max-h-0'
                }`}>
                  <p className="p-6 text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
