import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioManager } from '../utils/audio';

export default function NarrativeScreen({ story, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    AudioManager.playClick();
    if (currentIndex < story.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#0d0605] flex flex-col justify-center items-center px-6 z-[900]"
         style={{ background: 'radial-gradient(circle at center, #1b100d 0%, #080302 100%)' }}>
      
      {/* Film Grain background */}
      <div className="film-grain" />

      {/* Narrative container */}
      <div className="max-w-[600px] w-full text-center flex flex-col items-center gap-10">
        
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-serif text-[#E7D9C1] text-[1.4rem] sm:text-[1.8rem] leading-relaxed italic"
            >
              {story[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-title text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 px-4 text-[0.95rem] tracking-[3px] hover:text-[#F5F1E8] hover:border-[#F5F1E8] transition-colors cursor-pointer"
        >
          {currentIndex === story.length - 1 ? 'LANJUTKAN' : 'LANJUT'}
        </motion.button>

      </div>
    </div>
  );
}
