import React, { useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function LoadingTicket({ onEnter }) {
  const [isValidated, setIsValidated] = useState(false);
  const [isRipped, setIsRipped] = useState(false);

  const handleValidation = (e) => {
    e.stopPropagation();
    if (isValidated) return;

    setIsValidated(true);
    AudioManager.playStamp();
    AudioManager.init();

    // Delay before sliding ticket up
    setTimeout(() => {
      AudioManager.playBGM();
      setIsRipped(true);
      
      // Delay to let rip animations complete before mounting Entrance facade
      setTimeout(() => {
        onEnter();
      }, 1200);
    }, 1500);
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[10002] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${isRipped ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        background: 'radial-gradient(circle at center, #2e1e1a 0%, #110908 100%)'
      }}
    >
      <div className="flex flex-col items-center gap-5">
        <div 
          className={`flex bg-parchment-light rounded-lg border border-black/10 w-[90vw] max-w-[550px] h-auto sm:h-[220px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ticket-shadow flex-col sm:flex-row ${isValidated ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        >
          {/* Main Stub */}
          <div className="flex-[2.8] p-[30px] border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-wood-dark/25 flex flex-col justify-between relative">
            {/* Ticket holes */}
            <div className="hidden sm:block absolute -right-2 top-0 w-4 h-4 bg-wood-dark rounded-full -translate-y-1/2" />
            <div className="hidden sm:block absolute -right-2 bottom-0 w-4 h-4 bg-wood-dark rounded-full translate-y-1/2" />
            
            <span className="font-title text-gold-dark text-[0.8rem] tracking-[2px] font-bold">
              MUSEUM OF US
            </span>
            <div className="my-5 sm:my-0">
              <h2 className="font-serif text-wood-dark text-[1.8rem] font-bold leading-tight">
                SABRINA & MAXAL
              </h2>
              <p className="font-sans text-[#665] text-[0.8rem] mt-1">
                Pameran Abadi Perjalanan Cinta Kita
              </p>
            </div>
            <div className="flex gap-[30px]">
              <div>
                <span className="block text-[0.6rem] text-[#887] tracking-wider mb-0.5">TANGGAL ENTRY</span>
                <strong className="font-title text-wood-medium text-[0.85rem]">SELAMANYA</strong>
              </div>
              <div>
                <span className="block text-[0.6rem] text-[#887] tracking-wider mb-0.5">NOMOR TIKET</span>
                <strong className="font-title text-wood-medium text-[0.85rem]">N0. 140224</strong>
              </div>
            </div>
          </div>

          {/* Verification Stub */}
          <div className="flex-1 bg-parchment-medium p-5 flex flex-col items-center justify-center gap-[15px] relative min-h-[140px] sm:min-h-0">
            <div className="font-title text-wood-dark/40 text-[0.6rem] tracking-widest sm:-rotate-90 sm:absolute sm:left-5 whitespace-nowrap">
              VALID FOR ONE ENTRY
            </div>
            
            <div 
              onClick={handleValidation}
              className={`w-[65px] h-[65px] rounded-full flex justify-center items-center cursor-pointer border border-[#7d151e] transition-all duration-200 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:scale-108 hover:shadow-[0_6px_15px_rgba(0,0,0,0.4)] ${isValidated ? 'scale-90 -rotate-12 bg-radial from-[#851620] to-[#610d14] shadow-inner border-[#49080d]' : 'bg-radial from-[#c82333] to-[#a71d2a]'}`}
            >
              <span className="text-[1.8rem] text-white/85 select-none text-shadow">❤️</span>
            </div>
          </div>
        </div>
        <div className="font-sans text-gold text-[0.8rem] tracking-wider opacity-70 animate-pulse">
          Klik segel lilin merah untuk memvalidasi tiket masuk
        </div>
      </div>
    </div>
  );
}
