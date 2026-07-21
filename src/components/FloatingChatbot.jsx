import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, AlertTriangle } from 'lucide-react';

const SYSTEM_PROMPT = `Anda adalah Aras AI Planner, asisten virtual dan Customer Service resmi dari Aras Wedding Organizer (Aras WO).
Tugas Anda adalah melayani calon pengantin dengan ramah, profesional, dan informatif. Panggil mereka dengan sapaan hangat seperti "Kak" atau "Kakak".

Berikut adalah informasi resmi mengenai Aras Wedding Organizer:
1. Layanan & Lokasi:
- Kami melayani perencanaan, koordinasi, dan konsultasi pernikahan.
- Lokasi Kantor: Jakarta.
- Wilayah Operasional: Seluruh area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi).

2. Kontak Resmi:
- WhatsApp: +62 851-8327-0299 (Planner Aras Wedding).
- Konsultasi awal melalui WhatsApp adalah gratis / free konsultasi.

3. Rincian Paket & Layanan:
- WO On The Day (Untuk koordinasi di hari H pernikahan, durasi maks 6 jam):
  * Bronze (3 Crew WO): Rp 1,8 Juta (Diskon dari Rp 2,3 Juta) - Cocok untuk akad/resepsi intim skala kecil.
  * Silver (4 Crew WO): Rp 2,3 Juta (Diskon dari Rp 3 Juta) - Pilihan paling populer.
  * Gold (5 Crew WO): Rp 2,5 Juta (Diskon dari Rp 3,5 Juta) - Koordinasi penuh eksklusif.
- Paket Hemat (Paket gabungan WO, MC, dan Content Creator):
  * Sakinah: Rp 3,2 Juta (1 MC + 4 Crew WO).
  * Mawaddah: Rp 3,3 Juta (1 MC + 1 Content Creator 3 jam + 3 Crew WO).
  * Warahmah: Rp 6 Juta (1 MC + 1 Wedding Content Creator + Fotografer & Videografer maks 10 jam + 4 Crew WO).
- Paket Lamaran (Layanan WO khusus hari pertunangan/lamaran, durasi 3 jam):
  * Bronze: Rp 1,6 Juta (1 MC + 2 Crew WO, free TM 2x, rundown).
  * Silver: Rp 1,3 Juta (1 MC + 1 Content Creator, free TM 2x).
  * Gold: Rp 2 Juta (1 MC + 1 Content Creator + 2 Crew WO, free TM 2x).
- Jasa Individual / Ala Carte:
  * Exclusive Single MC: Rp 1,3 Juta (Diskon dari Rp 3 Juta, durasi 6 jam).
  * Wedding Content Creator (WCC) - dokumentasi realtime medsos:
    * Bronze (3 Jam): Rp 350 Ribu.
    * Silver (5 Jam): Rp 450 Ribu.
    * Gold (7 Jam): Rp 700 Ribu.
  * Fotografer & Videografer:
    * Bronze (10 Jam, 1 Photographer, Flashdisk, Album): Rp 1,8 Juta.
    * Silver (10 Jam, 1 Photographer + 1 Videographer, Flashdisk, Album): Rp 2,5 Juta.
- Layanan Dekorasi & Makeup:
  * Berstatus "Coming Soon" di website, namun kami memiliki jaringan vendor dekorasi rekanan & MUA profesional premium. Arahkan Kakak untuk berkonsultasi via WhatsApp untuk merancang konsep kustom.

Aturan Tambahan:
- Berbicaralah dengan santun, gunakan emoji bertema pernikahan (🌸, ✨, 💍, 📋, 😊, 📍) agar terlihat menarik dan menyenangkan.
- Jika ada Kakak yang ingin memesan/booking, ingin konsep kustom, atau bertanya lebih lanjut tentang detail teknis yang tidak ada di atas, arahkan mereka untuk langsung menghubungi WhatsApp Planner kami di +62 851-8327-0299 atau dengan mengeklik tautan WhatsApp resmi yang disediakan.
- Jangan mengarang informasi di luar data di atas. Jika tidak tahu, arahkan dengan ramah ke WhatsApp.
- Batasi jawaban agar tidak terlalu panjang, tetapi tetap jelas dan informatif.`;

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Halo! Selamat datang di Aras Wedding. 🌸 Saya Aras AI Planner, asisten virtual Anda.',
      timestamp: new Date()
    },
    {
      id: 'init-2',
      sender: 'bot',
      text: 'Ada yang bisa saya bantu untuk persiapan hari bahagia Anda? Silakan ketik pertanyaan Anda atau pilih salah satu menu cepat di bawah ini.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  // Scroll visibility logic (shows floating button after scrolling down 200px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to the bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, error]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    // Get API Keys from Vite env
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

    try {
      let botResponseText = '';

      if (geminiKey) {
        // Format history for Gemini API
        const formattedHistory = updatedMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

        // Adjust role alternation for Gemini
        const alternatedHistory = [];
        formattedHistory.forEach(item => {
          if (alternatedHistory.length === 0) {
            alternatedHistory.push(item);
          } else {
            const last = alternatedHistory[alternatedHistory.length - 1];
            if (last.role === item.role) {
              last.parts[0].text += '\n' + item.parts[0].text;
            } else {
              alternatedHistory.push(item);
            }
          }
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: alternatedHistory,
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API error (Status: ${response.status})`);
        }

        const data = await response.json();
        botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!botResponseText) {
          throw new Error('Format respon Gemini tidak valid');
        }

      } else if (openaiKey) {
        // Format messages for OpenAI API
        const formattedMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: formattedMessages
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error (Status: ${response.status})`);
        }

        const data = await response.json();
        botResponseText = data.choices?.[0]?.message?.content || '';

        if (!botResponseText) {
          throw new Error('Format respon OpenAI tidak valid');
        }

      } else {
        // Fallback: Simulated keyword-based response
        await new Promise(resolve => setTimeout(resolve, 1000));
        botResponseText = getSimulatedResponse(text);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot API Error:', err);
      setError(
        'Maaf, terjadi gangguan jaringan saat menghubungi asisten AI. Silakan periksa koneksi internet Anda atau coba kirim ulang pesan.'
      );
    } finally {
      setIsTyping(false);
    }
  };

  const getSimulatedResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes('paket') || text.includes('harga') || text.includes('biaya') || text.includes('price') || text.includes('tarif') || text.includes('promo')) {
      return `Kami memiliki berbagai pilihan paket menarik untuk mewujudkan pernikahan impian Anda:

• **Paket Hemat Sakinah / Mawaddah / Warahmah** (Mulai Rp 3,2 Juta)
• **WO On The Day (3-5 Crew)** (Mulai Rp 1,8 Juta)
• **Paket Lamaran (3 Jam)** (Mulai Rp 1,3 Juta)
• **Single MC & Wedding Content Creator (WCC)** (Mulai Rp 350 Ribu)

Anda bisa mengklik tombol "Lihat Pilihan Paket & Harga" di website ini atau hubungi Planner kami untuk mendapatkan e-brochure lengkap! 📋`;
    }
    
    if (text.includes('lokasi') || text.includes('alamat') || text.includes('kantor') || text.includes('dimana') || text.includes('di mana') || text.includes('kota') || text.includes('wilayah') || text.includes('cabang')) {
      return `Kantor pusat kami berlokasi di **Jakarta**. 

Kami melayani koordinasi pernikahan di seluruh wilayah **Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)**. Ingin menjadwalkan sesi konsultasi offline? Hubungi WhatsApp kami! 📍`;
    }
    
    if (text.includes('wa') || text.includes('whatsapp') || text.includes('kontak') || text.includes('nomor') || text.includes('tanya') || text.includes('hubung') || text.includes('admin') || text.includes('planner') || text.includes('telepon')) {
      return `Tentu saja! Anda bisa langsung berkonsultasi secara gratis dengan Wedding Planner kami via WhatsApp di nomor **+62 851-8327-0299**. 

Klik link berikut untuk langsung memulai percakapan: [Hubungi WhatsApp](https://wa.me/6285183270299) 💬`;
    }

    if (text.includes('dekor') || text.includes('dekorasi')) {
      return `Untuk layanan dekorasi pelaminan dan venue saat ini berstatus *Coming Soon* di website, namun kami memiliki jaringan vendor dekorasi rekanan berkualitas tinggi. 
      
Kami siap membantu merancang dekorasi kustom sesuai tema pilihan Anda (Modern, Tradisional, Rustic, dll).`;
    }

    if (text.includes('makeup') || text.includes('mua') || text.includes('busana') || text.includes('rias')) {
      return `Layanan rias wajah (Makeup) dan busana pengantin saat ini berstatus *Coming Soon*. Kami bekerja sama dengan MUA profesional terkemuka yang siap menyempurnakan penampilan Anda di hari bahagia.`;
    }
    
    if (text.includes('halo') || text.includes('hai') || text.includes('hello') || text.includes('assalamualaikum') || text.includes('p') || text.includes('siang') || text.includes('pagi') || text.includes('sore') || text.includes('malam') || text.includes('test')) {
      return `Halo! Selamat datang di Aras Wedding. 😊 Ada yang bisa saya bantu hari ini? 

Anda bisa bertanya seputar:
1. Pilihan Paket & Harga 📋
2. Lokasi Kantor & Wilayah Layanan 📍
3. Kontak WhatsApp Wedding Planner 💬`;
    }
    
    if (text.includes('terima kasih') || text.includes('makasih') || text.includes('nuhun') || text.includes('thank') || text.includes('ok') || text.includes('oke') || text.includes('sip') || text.includes('siap')) {
      return `Sama-sama! Senang bisa memberikan informasi. Semoga persiapan pernikahan Anda berjalan dengan lancar dan penuh kebahagiaan. 

Jika ada hal lain yang perlu ditanyakan, saya selalu siap membantu! 🌸✨`;
    }
    
    return `Maaf, saya tidak memahami pertanyaan tersebut. 😅 

Anda bisa menanyakan perihal:
• **Pilihan Paket & Harga**
• **Lokasi Kantor**
• **Kontak WhatsApp**

Atau hubungi admin kami secara langsung untuk respon cepat!`;
  };

  const quickReplies = [
    { label: '📋 Pilihan Paket & Harga', value: 'Berapa harga paket pernikahan yang tersedia?' },
    { label: '📍 Lokasi Kantor', value: 'Di mana lokasi kantor Aras Wedding?' },
    { label: '💬 Hubungi WhatsApp', value: 'Minta kontak WhatsApp Wedding Planner' },
    { label: '✨ Konsultasi Kustom', value: 'Bagaimana cara berkonsultasi kustom?' }
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gold-gradient hover:bg-gold-gradient-hover text-charcoal-dark rounded-full shadow-2xl transition-all duration-500 ease-in-out flex items-center justify-center group ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }`}
        style={{ boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)' }}
        aria-label="Tanya Aras AI Planner"
      >
        {/* Glow pulse effect when chatbot is closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-gold opacity-40 animate-ping group-hover:animate-none"></span>
        )}
        
        {isOpen ? (
          <X className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <MessageCircle className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[400px] h-[550px] max-h-[80vh] rounded-3xl glass-card border border-gold/30 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ease-out origin-bottom-right transform ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        style={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)' }}
      >
        {/* Header */}
        <div className="bg-charcoal-light/80 border-b border-gold/15 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-charcoal-dark font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-charcoal-dark rounded-full animate-pulse"></span>
            </div>
            <div>
              <h4 className="font-playfair font-bold text-white text-sm">Aras AI Planner</h4>
              <p className="text-[10px] text-gray-400 font-light flex items-center gap-1 flex-wrap">
                <span>Online</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>• Siap Membantu</span>
                {!geminiKey && !openaiKey && (
                  <span className="text-[8px] bg-gold/15 text-gold px-1.5 py-0.5 rounded border border-gold/30">
                    Demo Mode
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-charcoal/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-full animate-fade-in`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed max-w-[85%] whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-gold-gradient text-charcoal-dark font-medium rounded-tr-none shadow-md'
                    : 'bg-charcoal-light/60 text-gray-200 border border-gold/10 rounded-tl-none shadow-sm'
                }`}
              >
                {/* Parse Markdown-like bold text and links in responses */}
                {msg.text.split('\n').map((line, lIdx) => {
                  let formattedLine = line;
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  let match;
                  const elements = [];
                  let lastIndex = 0;
                  
                  while ((match = linkRegex.exec(formattedLine)) !== null) {
                    const textBefore = formattedLine.substring(lastIndex, match.index);
                    const linkText = match[1];
                    const linkUrl = match[2];
                    
                    if (textBefore) {
                      elements.push(parseBoldText(textBefore, msg.sender === 'user'));
                    }
                    
                    elements.push(
                      <a
                        key={match.index}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold font-bold underline hover:text-white transition-colors duration-200"
                      >
                        {linkText}
                      </a>
                    );
                    
                    lastIndex = linkRegex.lastIndex;
                  }
                  
                  if (lastIndex < formattedLine.length) {
                    elements.push(parseBoldText(formattedLine.substring(lastIndex), msg.sender === 'user'));
                  }
                  
                  return (
                    <div key={lIdx} className="min-h-[1.2rem]">
                      {elements.length > 0 ? elements : parseBoldText(line, msg.sender === 'user')}
                    </div>
                  );
                })}
              </div>
              <span className="text-[9px] text-gray-500 mt-1 px-1 font-light">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start max-w-full">
              <div className="px-4 py-3 rounded-2xl bg-charcoal-light/60 border border-gold/10 rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          {/* Network Error Display */}
          {error && (
            <div className="flex flex-col items-center max-w-full animate-fade-in">
              <div className="px-4 py-3 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs text-center max-w-[90%] shadow-md flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Kesalahan Jaringan</span>
                </div>
                <p className="font-light text-[11px] leading-relaxed">{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
                    if (lastUserMessage) {
                      handleSendMessage(lastUserMessage.text);
                    }
                  }}
                  className="mt-1 px-4 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-200 hover:text-white font-bold transition-all duration-200 cursor-pointer text-[10px]"
                >
                  Coba Kirim Ulang
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Menu Options (Chips) */}
        {messages.length <= 4 && !isTyping && !error && (
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 justify-start border-t border-gold/5 bg-charcoal/20">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qr.value)}
                className="text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-gold/20 text-gray-300 hover:border-gold hover:text-white bg-charcoal-card/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="p-4 border-t border-gold/15 bg-charcoal-light/40 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik pertanyaan di sini..."
            className="flex-1 bg-charcoal/60 border border-gold/25 focus:border-gold rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 ${
              inputValue.trim() && !isTyping
                ? 'bg-gold-gradient text-charcoal-dark hover:scale-105 active:scale-95 cursor-pointer shadow-md'
                : 'bg-charcoal-light/80 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}

// Helper function to render bold formatting from **text**
function parseBoldText(text, isUser = false) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className={`font-bold ${isUser ? 'text-charcoal-dark font-extrabold' : 'text-gold'}`}>{part}</strong>;
    }
    return part;
  });
}
