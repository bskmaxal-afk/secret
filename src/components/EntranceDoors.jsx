import React, { useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function EntranceDoors({ onOpened }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;

    setIsOpened(true);
    // AudioManager.playDoorCreak();

    // After door swing animation finishes, zoom-in and fade out
    setTimeout(() => {
      setIsFading(true);
      
      // Let zoom/fade transitions complete before mounting lobby
      setTimeout(() => {
        onOpened();
      }, 1500);
    }, 1200);
  };

  return (
    <section 
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center overflow-hidden transition-all duration-[1500ms] ease-in-out ${isFading ? 'opacity-0 scale-120 pointer-events-none' : 'opacity-100 scale-100'}`}
      style={{
        background: 'radial-gradient(circle at center, #1b0f0d 0%, #0d0605 100%)',
        zIndex: 1001
      }}
    >
      <div className="text-center z-5 flex flex-col items-center">
        {/* Spotlights */}
        <div className="absolute top-[15vh] left-[15vw] w-[50px] h-[50px] rounded-full animate-flicker"
             style={{ background: 'radial-gradient(circle, #ffd700 20%, rgba(229, 193, 125, 0.4) 50%, transparent 100%)' }} />
        <div className="absolute top-[15vh] right-[15vw] w-[50px] h-[50px] rounded-full animate-flicker"
             style={{ background: 'radial-gradient(circle, #ffd700 20%, rgba(229, 193, 125, 0.4) 50%, transparent 100%)' }} />
        
        {/* Facade Text */}
        <div className="transition-all duration-1000 transform translate-y-0 opacity-100 mb-[50px]">
          <h1 className="font-title text-gold-bright text-[3.5rem] tracking-[6px] text-shadow-[0_4px_15px_rgba(0,0,0,0.9)] mb-2.5">
            MUSEUM OF US
          </h1>
          <p className="font-serif text-parchment-dark text-[1.1rem] tracking-wider italic">
            Silakan buka pintu untuk masuk
          </p>
        </div>

        {/* Double Doors */}
        <div 
          onClick={handleOpen}
          className="w-[280px] h-[380px] cursor-pointer mt-5"
          style={{ perspective: '1200px' }}
        >
          <div className="w-full h-full flex transform-style-3d opacity-100 transition-opacity duration-1000 delay-300">
            {/* Left Door */}
            <div 
              className={`w-1/2 h-full bg-gradient-to-br from-[#42251d] to-[#22110c] border-[8px] border-[#1c0e0b] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.5)] relative transition-transform duration-[1800ms] ease-out origin-left border-r-3 border-r-[#150906] rounded-l-md ${isOpened ? 'door-left-transform' : 'rotate-y-0'}`}
            >
              {/* Knob */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 right-2 w-3.5 h-3.5 rounded-full border border-[#8c6e2d] bg-radial from-[#dfc48c] to-[#997833] door-shadow"
              />
            </div>
            
            {/* Right Door */}
            <div 
              className={`w-1/2 h-full bg-gradient-to-br from-[#42251d] to-[#22110c] border-[8px] border-[#1c0e0b] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.5)] relative transition-transform duration-[1800ms] ease-out origin-right border-l-3 border-l-[#150906] rounded-r-md ${isOpened ? 'door-right-transform' : 'rotate-y-0'}`}
            >
              {/* Knob */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 left-2 w-3.5 h-3.5 rounded-full border border-[#8c6e2d] bg-radial from-[#dfc48c] to-[#997833] door-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
