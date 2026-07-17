import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioManager } from '../../utils/audio';

export default function Ticket({ onEnter }) {
  const [isValidated, setIsValidated] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [ticketStep, setTicketStep] = useState(0);

  const ticketLines = [
    "Nih tiketnya jangan sampe ilang yaa.",
    "Soalnya kalau ilang...",
    "Ya paling aku bikinin lagi sih 😭",
    "Udah ah, masuk yuk. 🎫🤍"
  ];

  const handleNextText = () => {
    AudioManager.playClick();
    setTicketStep(prev => prev + 1);
  };

  const handleStampClick = () => {
    if (isValidated) return;
    
    setIsValidated(true);
    AudioManager.playStamp();
    AudioManager.init();

    // After stamp chimes, rip ticket and exit
    setTimeout(() => {
      AudioManager.playBGM();
      setIsExiting(true);
      
      setTimeout(() => {
        onEnter();
      }, 1000);
    }, 1400);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[10005] overflow-hidden"
         style={{ background: 'radial-gradient(circle at center, #231714 0%, #0d0605 100%)' }}>
      
      {/* Film Grain background */}
      <div className="film-grain" />

      <AnimatePresence>
        {!isExiting && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -200, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="flex flex-col items-center gap-8 text-center max-w-[550px] px-6"
          >
            
            {/* Story Dialogue phase first */}
            {ticketStep < ticketLines.length ? (
              <motion.div
                key={ticketStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-10"
              >
                <p className="font-serif text-[#E7D9C1] text-[1.4rem] sm:text-[1.7rem] leading-relaxed italic">
                  {ticketLines[ticketStep]}
                </p>

                <button 
                  onClick={handleNextText}
                  className="font-title text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 px-4 text-[0.95rem] tracking-[3px] hover:text-[#F5F1E8] hover:border-[#F5F1E8] transition-colors cursor-pointer"
                >
                  LANJUT
                </button>
              </motion.div>
            ) : (
              /* The actual Ticket stamp phase */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <div 
                  className={`flex flex-col sm:flex-row bg-[#F5F1E8] border border-black/10 rounded-lg overflow-hidden w-[90vw] max-w-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative transition-all duration-700 ${
                    isValidated ? 'scale-98 opacity-90' : 'scale-100'
                  }`}
                >
                  {/* Main Ticket Area */}
                  <div className="flex-[2.8] p-8 border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-[#2F241B]/25 flex flex-col justify-between relative min-h-[180px] sm:min-h-[220px]">
                    {/* Hole cutouts */}
                    <div className="hidden sm:block absolute -right-2.5 top-0 w-5 h-5 bg-[#0d0605] rounded-full -translate-y-1/2" />
                    <div className="hidden sm:block absolute -right-2.5 bottom-0 w-5 h-5 bg-[#0d0605] rounded-full translate-y-1/2" />
                    
                    <div className="text-left">
                      <span className="font-title text-[#D4AF37] text-[0.8rem] tracking-[3px] font-bold">
                        MUSEUM TICKET
                      </span>
                      <h2 className="font-serif text-[#2F241B] text-[1.6rem] font-bold leading-tight mt-3">
                        SABRINA & MAXAL
                      </h2>
                      <p className="font-sans text-[#7A5C3E] text-[0.85rem] mt-1">
                        Visitor: <span className="font-title font-bold text-[#2F241B]">Sabrina</span>
                      </p>
                    </div>
                    
                    <div className="flex gap-6 mt-4 sm:mt-0 border-t border-[#2F241B]/10 pt-4 text-left">
                      <div>
                        <span className="block text-[0.6rem] text-[#7A5C3E]/70 tracking-widest uppercase font-bold">ADMIT ONE</span>
                        <strong className="font-title text-[#2F241B] text-[0.85rem] tracking-wider">ENTRY PASS</strong>
                      </div>
                      <div>
                        <span className="block text-[0.6rem] text-[#7A5C3E]/70 tracking-widest uppercase font-bold">VALIDITY</span>
                        <strong className="font-title text-[#2F241B] text-[0.85rem] tracking-wider">FOREVER</strong>
                      </div>
                    </div>
                  </div>

                  {/* Stamp Area */}
                  <div className="flex-1 bg-[#E7D9C1] p-6 flex flex-col items-center justify-center gap-4 relative min-h-[140px] sm:min-h-0">
                    <span className="font-title text-[#2F241B]/35 text-[0.6rem] tracking-widest sm:-rotate-90 sm:absolute sm:left-4 whitespace-nowrap uppercase font-bold">
                      VALIDATE TICK
                    </span>

                    {/* Wax Seal Stamp */}
                    <div 
                      onClick={handleStampClick}
                      className={`w-[68px] h-[68px] rounded-full flex justify-center items-center cursor-pointer border border-[#7d151e] transition-all duration-300 shadow-[0_5px_12px_rgba(0,0,0,0.3)] hover:scale-108 ${
                        isValidated 
                          ? 'scale-90 -rotate-12 bg-gradient-to-br from-[#851620] to-[#610d14] shadow-inner border-[#49080d]' 
                          : 'bg-gradient-to-br from-[#c82333] to-[#a71d2a] hover:shadow-[0_8px_18px_rgba(0,0,0,0.45)]'
                      }`}
                    >
                      <span className="text-[1.8rem] text-white/95 select-none transform transition-transform duration-300 active:scale-90">
                        ❤️
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[#E7D9C1] text-[0.8rem] tracking-wider opacity-60 animate-pulse">
                  Klik stempel lilin merah untuk memvalidasi tiket masuk
                </p>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
