import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioManager } from '../../utils/audio';

export default function Loading({ onComplete }) {
  const [step, setStep] = useState(0);

  const openingLines = [
    "Hai Sayang 👋",
    "Makasih ya udah mau mampir ke museum kecil ini wkwkwk.",
    "Sebenernya ini bukan museum beneran sih...",
    "Aku cuma kepikiran, daripada foto-foto kita numpuk di galeri HP terus lama-lama ketimpa foto lain, mending aku bikinin tempat sendiri buat semuanya.",
    "Jadi kalau suatu saat kita lagi kangen sama momen-momen ini, kita tinggal balik ke sini aja.",
    "Okeee, yuk masuk. ☕🏛️"
  ];

  const handleNext = () => {
    AudioManager.playClick();
    if (step < openingLines.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black flex flex-col justify-center items-center overflow-hidden z-[10010]">
      {/* Film Grain */}
      <div className="film-grain" />

      {/* Projector light sweeps */}
      <div className="absolute top-[10vh] w-[250px] h-[250px] rounded-full animate-projector-beam pointer-events-none mix-blend-screen"
           style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)' }} />

      <div className="max-w-[600px] w-full text-center z-10 px-6 flex flex-col items-center gap-10">
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[#E7D9C1] text-[1.35rem] sm:text-[1.6rem] leading-relaxed italic"
            >
              {openingLines[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="font-title text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 px-5 text-[0.95rem] tracking-[3px] hover:text-[#F5F1E8] hover:border-[#F5F1E8] transition-colors cursor-pointer uppercase font-black"
        >
          {step === openingLines.length - 1 ? "OKEEE, YUK MASUK ➔" : "LANJUT"}
        </button>
      </div>
    </div>
  );
}
