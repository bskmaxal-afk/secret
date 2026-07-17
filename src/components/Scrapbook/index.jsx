import React, { useState, useEffect } from 'react';
import { AudioManager } from '../../utils/audio';
import NarrativeScreen from '../NarrativeScreen';

export default function Scrapbook({ onNavigate }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showNarrative, setShowNarrative] = useState(true);

  const scrapbookStory = [
    "Nah...",
    "Kalau yang ini bukan cuma foto.",
    "Tapi cerita kecil di balik fotonya.",
    "Mungkin nanti pas baca kamu bakal bilang,",
    "\"Ihh masa kamu masih inget sih?\"",
    "Ya gimana ya...",
    "Soalnya buat aku hal-hal kecil gitu malah susah dilupain. ☕📖"
  ];

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage(prev => prev + 1);
      AudioManager.playClick();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      AudioManager.playClick();
    }
  };

  if (showNarrative) {
    return (
      <NarrativeScreen 
        story={scrapbookStory} 
        onComplete={() => setShowNarrative(false)} 
      />
    );
  }

  return (
    <div className="w-full bg-[#1e100d] px-5 sm:px-10 py-[120px] relative text-parchment-dark min-h-screen">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-title text-gold-bright text-[2.2rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)] uppercase">
            📖 Room 4 — Table Talk
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto my-3" />
          <p className="font-serif text-[#C5B39A] text-[1.05rem] italic">
            Obrolan, cerita receh, dan detail kisah kecil di balik potret kita
          </p>
        </div>

        {/* 3D Book Layout Container */}
        <div 
          className="w-[90vw] max-w-[850px] h-[60vh] min-h-[400px] max-h-[550px] relative select-none mb-10"
          style={{ perspective: '1600px' }}
        >
          <div className="w-full h-full flex transform-style-3d relative">
            
            {/* ==================== PAGE 0: COVER ==================== */}
            <div 
              className={`absolute top-0 right-0 w-1/2 h-full bg-[#3d231d] border-4 border-gold-dark rounded-r-[12px] p-6 flex flex-col items-center justify-center text-center transform-style-3d transition-transform duration-1000 origin-left z-20 book-shadow page-shadow-right ${currentPage > 0 ? 'rotate-y-180 z-1 pointer-events-none opacity-0' : 'rotate-y-0'}`}
            >
              <div className="w-full h-full border border-gold/15 rounded-[6px] flex flex-col items-center justify-center p-4">
                <span className="text-[2.2rem] mb-4">📖</span>
                <h3 className="font-title text-gold-bright text-[1.6rem] tracking-[3px] font-black leading-tight">
                  OUR MEMORIES
                </h3>
                <div className="w-16 h-[2px] bg-gold my-4" />
                <p className="font-serif text-parchment-light text-[0.95rem] italic">
                  Sabrina & Maxal
                </p>
                <div className="text-[0.7rem] text-gold/60 mt-10 tracking-[2px] uppercase">
                  Klik panah kanan untuk membuka
                </div>
              </div>
            </div>

            {/* ==================== PAGE 1 & 2: INTRO & POLAROID 1 ==================== */}
            <div 
              className={`absolute top-0 left-0 w-full h-full flex transform-style-3d transition-all duration-1000 pointer-events-none ${
                currentPage === 1 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-1'
              }`}
            >
              {/* Left page: Intro Letter */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col justify-between text-wood-dark book-shadow-left page-shadow-left">
                <div>
                  <h4 className="font-title text-gold-dark text-[1.1rem] border-b border-wood-dark/10 pb-2 mb-4">
                    Dear Sabrina,
                  </h4>
                  <p className="font-cursive text-[1.4rem] leading-relaxed text-wood-dark">
                    Museum ini dibangun sebagai saksi bisu dari setiap tawa, cerita, dan perjalanan indah yang telah kita lalui bersama. Setiap sudut di tempat ini menyimpan serpihan memori berharga kita berdua.
                  </p>
                </div>
                <div className="text-right font-title text-[0.8rem] font-bold text-gold-dark">
                  — Maxal
                </div>
              </div>
              
              {/* Right page: Polaroid 1 */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-wood-dark book-shadow page-shadow-right">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/images/poto1.jpg" alt="Polaroid 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-cursive text-[1.3rem] text-center text-black mt-4 leading-tight">
                    Hari Spesial Kita 🌸
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== PAGE 3 & 4: LETTER PART 1 & POLAROID 2 ==================== */}
            <div 
              className={`absolute top-0 left-0 w-full h-full flex transform-style-3d transition-all duration-1000 pointer-events-none ${
                currentPage === 2 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-1'
              }`}
            >
              {/* Left page: Letter part 1 */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col justify-between text-wood-dark book-shadow-left page-shadow-left">
                <div>
                  <h4 className="font-title text-gold-dark text-[1.1rem] border-b border-wood-dark/10 pb-2 mb-4">
                    Pertemuan Pertama
                  </h4>
                  <p className="font-cursive text-[1.4rem] leading-relaxed text-wood-dark">
                    Aku masih ingat betul pertama kali kita mengobrol. Rasanya hangat, tidak canggung, dan saat itu juga aku tahu ada sesuatu yang sangat spesial dalam dirimu yang akan mengubah duniaku.
                  </p>
                </div>
                <div className="text-[0.7rem] text-[#887] font-semibold">Lembar 1 dari 2</div>
              </div>
              
              {/* Right page: Polaroid 2 */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-wood-dark book-shadow page-shadow-right">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/images/poto2.jpg" alt="Polaroid 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-cursive text-[1.3rem] text-center text-black mt-4 leading-tight">
                    Tawa Bersamamu ❤️
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== PAGE 5 & 6: POLAROID 3 & KEY PAGE ==================== */}
            <div 
              className={`absolute top-0 left-0 w-full h-full flex transform-style-3d transition-all duration-1000 pointer-events-none ${
                currentPage === 3 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-1'
              }`}
            >
              {/* Left page: Polaroid 3 */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-wood-dark book-shadow-left page-shadow-left">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/images/poto3.jpg" alt="Polaroid 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-cursive text-[1.3rem] text-center text-black mt-4 leading-tight">
                    Menjelajah Waktu ⏳
                  </div>
                </div>
              </div>
              
              {/* Right page: Letter Part 2 */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col justify-between text-wood-dark book-shadow page-shadow-right relative">
                <div>
                  <h4 className="font-title text-gold-dark text-[1.1rem] border-b border-wood-dark/10 pb-2 mb-4">
                    Harapan Kita
                  </h4>
                  <p className="font-cursive text-[1.4rem] leading-relaxed text-wood-dark">
                    Terima kasih telah menemani setiap langkah perjalananku. Aku berharap buku kenangan kita ini tidak akan pernah selesai ditulis, dan kita akan terus menambahkan lembar-lembar baru yang jauh lebih indah.
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-[0.7rem] text-[#887] font-semibold">Lembar 2 dari 2</div>
                </div>
              </div>
            </div>

            {/* ==================== PAGE 7: BACK COVER ==================== */}
            <div 
              className={`absolute top-0 left-0 w-1/2 h-full bg-[#3d231d] border-4 border-gold-dark rounded-l-[12px] p-6 flex flex-col items-center justify-center text-center transform-style-3d transition-transform duration-1000 origin-right z-1 pointer-events-none opacity-0 ${currentPage === 4 ? 'opacity-100 z-20 pointer-events-auto rotate-y-0' : 'rotate-y-180'}`}
            >
              <div className="w-full h-full border border-gold/15 rounded-[6px] flex flex-col items-center justify-center p-4">
                <span className="text-[2.2rem] mb-4">💖</span>
                <h3 className="font-title text-gold-bright text-[1.4rem] tracking-[3px] font-black leading-tight">
                  TERIMA KASIH
                </h3>
                <div className="w-16 h-[2px] bg-gold my-4" />
                <p className="font-serif text-parchment-light text-[0.85rem] italic">
                  Bersamamu adalah petualangan terbaik dalam hidupku.
                </p>
              </div>
            </div>

          </div>

          {/* Controls */}
          <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-[30] w-full max-w-[320px]">
            <div className="flex gap-10">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center font-title text-[1.2rem] bg-wood-dark hover:bg-gold hover:text-wood-dark cursor-pointer disabled:opacity-30 disabled:hover:bg-wood-dark disabled:hover:text-gold transition-all duration-300"
              >
                &larr;
              </button>
              <button 
                onClick={handleNext}
                disabled={currentPage === 4}
                className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center font-title text-[1.2rem] bg-wood-dark hover:bg-gold hover:text-wood-dark cursor-pointer disabled:opacity-30 disabled:hover:bg-wood-dark disabled:hover:text-gold transition-all duration-300"
              >
                &rarr;
              </button>
            </div>

            <button 
              onClick={() => {
                AudioManager.playClick();
                onNavigate('cinema');
              }}
              className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3 rounded cursor-pointer tracking-[3px] text-[0.8rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)] whitespace-nowrap mt-2"
            >
              Masuk ke Bioskop Mini (Coffee Break Cinema) &rarr;
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
