import React, { useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function ScrapbookWing({ onBack, onCollectKey, collectedKeys }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = 6; // 0: Cover, 1: Page 1-2, 2: Page 3-4, 3: Page 5-6 (Back Cover)
  // Let's divide pages into pairs:
  // Pair 0: Cover (Right Page only)
  // Pair 1: Page 1 (Left) & Page 2 (Right)
  // Pair 2: Page 3 (Left) & Page 4 (Right)
  // Pair 3: Page 5 (Left) & Page 6 (Right)
  // Pair 4: Back Cover (Left Page only)

  const handleNext = () => {
    if (currentPage < pageCount) {
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

  const hasScrapbookKey = collectedKeys.includes('scrapbook');

  return (
    <div className="min-h-screen bg-radial from-[#1e100d] to-[#0c0504] px-5 sm:px-10 py-[100px] w-full text-parchment-dark">
      
      {/* HUD Header */}
      <div className="flex justify-between items-center max-w-[1100px] mx-auto border-b border-gold/15 pb-4 mb-[40px]">
        <button 
          onClick={onBack}
          className="font-title text-gold text-[0.8rem] sm:text-[0.9rem] tracking-wider border border-gold px-4 py-2 rounded hover:bg-gold hover:text-wood-dark cursor-pointer transition-colors"
        >
          &larr; KEMBALI KE LOBBY
        </button>
        <span className="font-title text-gold-bright text-[1.2rem] sm:text-[1.5rem] tracking-[4px] font-bold">
          MUSEUM OF US
        </span>
      </div>

      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        
        <div className="text-center mb-[40px]">
          <h2 className="font-title text-gold-bright text-[2.2rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            BUKU KENANGAN
          </h2>
          <p className="font-serif text-parchment-dark text-[1rem] italic mt-1.5">
            Buka lembar demi lembar catatan hangat perjalanan kita
          </p>
        </div>

        {/* 3D Scrapbook Container */}
        <div 
          className="w-[90vw] max-w-[850px] h-[60vh] min-h-[400px] max-h-[550px] relative select-none"
          style={{ perspective: '1600px' }}
        >
          {/* Complete Scrapbook */}
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
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col justify-between text-text-dark book-shadow-left page-shadow-left">
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
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-text-dark book-shadow page-shadow-right">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/assets/poto1.jpg" alt="Polaroid 1" className="w-full h-full object-cover" />
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
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col justify-between text-text-dark book-shadow-left page-shadow-left">
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
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-text-dark book-shadow page-shadow-right">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/assets/poto2.jpg" alt="Polaroid 2" className="w-full h-full object-cover" />
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
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-l-4 border-wood-medium rounded-l-[12px] p-6 sm:p-10 flex flex-col items-center justify-center text-text-dark book-shadow-left page-shadow-left">
                <div className="bg-white p-3.5 pb-10 border border-black/10 rounded shadow-md w-[80%] max-w-[240px] rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full aspect-square bg-[#ddd] overflow-hidden relative shadow-inner">
                    <img src="/assets/poto3.jpg" alt="Polaroid 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-cursive text-[1.3rem] text-center text-black mt-4 leading-tight">
                    Menjelajah Waktu ⏳
                  </div>
                </div>
              </div>
              
              {/* Right page: Letter Part 2 & Hidden Key */}
              <div className="w-1/2 h-full bg-parchment-light border-y-4 border-r-4 border-wood-medium rounded-r-[12px] p-6 sm:p-10 flex flex-col justify-between text-text-dark book-shadow page-shadow-right relative">
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
                  
                  {/* Hidden Key 2 */}
                  {!hasScrapbookKey && (
                    <div 
                      onClick={(e) => onCollectKey('scrapbook', e)}
                      className="text-[1.5rem] cursor-pointer opacity-15 hover:opacity-75 transition-opacity duration-300"
                    >
                      🔑
                    </div>
                  )}
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

          {/* Book navigation buttons overlay */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-10 z-[30]">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center font-title text-[1.2rem] bg-wood-dark hover:bg-gold hover:text-wood-dark cursor-pointer disabled:opacity-30 disabled:hover:bg-wood-dark disabled:hover:text-gold transition-colors"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === 4}
              className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center font-title text-[1.2rem] bg-wood-dark hover:bg-gold hover:text-wood-dark cursor-pointer disabled:opacity-30 disabled:hover:bg-wood-dark disabled:hover:text-gold transition-colors"
            >
              &rarr;
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
