import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioManager } from '../../utils/audio';

export default function Entrance({ onEnter }) {
  const [leaves, setLeaves] = useState([]);
  const [isZooming, setIsZooming] = useState(false);
  const [storyStep, setStoryStep] = useState(0);

  const storyLines = [
    "Sebelum masuk...",
    "Aku cuma mau bilang makasih.",
    "Karena sejak kamu datang, hari-hari yang tadinya biasa aja jadi punya banyak cerita.",
    "Walaupun baru bentar...",
    "Tapi udah lumayan banyak tempat yang kita datengin bareng ya. ☕🍁"
  ];

  // Generate random leaf particles
  useEffect(() => {
    const emojis = ['🍁', '🍂', '🍃', '🌸'];
    const leafList = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 95,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 6,
      scale: 0.7 + Math.random() * 0.6
    }));
    setLeaves(leafList);
  }, []);

  const handleNextText = () => {
    AudioManager.playClick();
    setStoryStep(prev => prev + 1);
  };

  const handleEnterClick = () => {
    setIsZooming(true);
    AudioManager.playDoorCreak();
    
    // Zoom in duration to let door swing complete
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center overflow-hidden transition-all duration-[1500ms] ease-in-out z-[1000] ${
        isZooming ? 'scale-[1.3] opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #1b100d 0%, #080302 100%)'
      }}
    >
      {/* Background Vignette */}
      <div className="vintage-vignette" />

      {/* Spotlights */}
      <div className="absolute top-[10vh] left-[15vw] w-[80px] h-[80px] rounded-full animate-flicker pointer-events-none opacity-40"
           style={{ background: 'radial-gradient(circle, #ffd700 20%, transparent 80%)' }} />
      <div className="absolute top-[10vh] right-[15vw] w-[80px] h-[80px] rounded-full animate-flicker pointer-events-none opacity-40"
           style={{ background: 'radial-gradient(circle, #ffd700 20%, transparent 80%)' }} />

      {/* Atmospheric Fog */}
      <div className="absolute bottom-0 left-0 w-full h-35vh bg-gradient-to-t from-black/50 via-[#1b100d]/20 to-transparent backdrop-blur-[1px] pointer-events-none z-5" />

      {/* Falling Leaves */}
      {leaves.map(l => (
        <span 
          key={l.id}
          className="leaf z-10"
          style={{
            left: `${l.left}vw`,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            transform: `scale(${l.scale})`,
            fontSize: '1.2rem'
          }}
        >
          {l.emoji}
        </span>
      ))}

      {/* Narrative Board / Final Panel */}
      <div className="text-center z-10 flex flex-col items-center max-w-[600px] px-6">
        <AnimatePresence mode="wait">
          {storyStep < storyLines.length ? (
            <motion.div
              key={storyStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-10"
            >
              <p className="font-serif text-[#E7D9C1] text-[1.4rem] sm:text-[1.8rem] leading-relaxed italic">
                {storyLines[storyStep]}
              </p>

              <button 
                onClick={handleNextText}
                className="font-title text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 px-4 text-[0.9rem] tracking-[3px] hover:text-[#F5F1E8] hover:border-[#F5F1E8] transition-colors cursor-pointer"
              >
                LANJUT
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Museum Building Facade Outline */}
              <div className="text-center text-[#D4AF37]/10 text-[9rem] sm:text-[12rem] font-title leading-none pointer-events-none select-none mb-6">
                🏛
              </div>

              <h1 className="font-title text-[#D4AF37] text-[2.2rem] sm:text-[2.8rem] tracking-[6px] text-shadow-[0_4px_15px_rgba(0,0,0,0.9)] mb-6">
                MUSEUM OF US
              </h1>
              
              <motion.button 
                onClick={handleEnterClick}
                whileHover={{ scale: 1.05, borderImageSource: 'linear-gradient(135deg, #e5c17d, #c5a059)' }}
                whileTap={{ scale: 0.98 }}
                className="font-title text-[#D4AF37] border-2 border-[#D4AF37]/45 px-10 py-4 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:text-white bg-black/45 shadow-2xl transition-all duration-300 relative group overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                MASUK MUSEUM
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 text-[0.65rem] text-[#7A5C3E] tracking-[2px]">
        DESIGNED FOR SABRINA &bull; EST. 2024
      </div>
    </div>
  );
}
