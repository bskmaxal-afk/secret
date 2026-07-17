import React, { useState } from 'react';
import { AudioManager } from '../../utils/audio';

export default function MuseumDoor({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleDoorClick = () => {
    if (isOpened) return;
    
    setIsOpened(true);
    AudioManager.playDoorCreak();
    
    // Zoom/fade transition to lobby
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center overflow-hidden z-[990]"
      style={{
        background: 'radial-gradient(circle at center, #1b100d 0%, #080302 100%)'
      }}
    >
      {/* Film Grain */}
      <div className="film-grain" />

      {/* Guide text */}
      <div className="text-center mb-8 px-6 relative z-10">
        <p className="font-serif text-[#E7D9C1] text-[1.15rem] sm:text-[1.3rem] italic leading-relaxed">
          Pas pintu museum...
        </p>
        <p className="font-serif text-gold-bright text-[1.2rem] sm:text-[1.4rem] font-bold mt-1.5 animate-pulse">
          Klik pintunya yaa.
        </p>
        <p className="font-sans text-[#7A5C3E] text-[0.8rem] tracking-wider uppercase mt-3">
          (Tenang... Ga ada jumpscare kok wkwkwk 😭)
        </p>
      </div>

      {/* 3D Doors */}
      <div 
        onClick={handleDoorClick}
        className="w-[280px] h-[380px] scale-[1.1] sm:scale-[1.25] cursor-pointer relative group"
        style={{ perspective: '1200px' }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gold/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="w-full h-full flex transform-style-3d opacity-100 transition-opacity duration-[1500ms]">
          
          {/* Left Door Panel */}
          <div 
            className={`w-1/2 h-full bg-gradient-to-br from-[#42251d] to-[#22110c] border-[8px] border-[#1c0e0b] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.5)] relative transition-transform duration-[1800ms] ease-out origin-left border-r-3 border-r-[#150906] rounded-l-md ${
              isOpened ? 'door-left-transform scale-y-105' : 'rotate-y-0'
            }`}
          >
            {/* Brass Knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 right-2 w-3.5 h-3.5 rounded-full border border-[#8c6e2d] bg-gradient-to-r from-[#dfc48c] to-[#997833] shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* Right Door Panel */}
          <div 
            className={`w-1/2 h-full bg-gradient-to-br from-[#42251d] to-[#22110c] border-[8px] border-[#1c0e0b] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.5)] relative transition-transform duration-[1800ms] ease-out origin-right border-l-3 border-l-[#150906] rounded-r-md ${
              isOpened ? 'door-right-transform scale-y-105' : 'rotate-y-0'
            }`}
          >
            {/* Brass Knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-2 w-3.5 h-3.5 rounded-full border border-[#8c6e2d] bg-gradient-to-r from-[#dfc48c] to-[#997833] shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </div>

        </div>
      </div>

      {/* Camera zoom simulation tunnel */}
      <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-[1000ms] delay-[1000ms] ${
        isOpened ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}
