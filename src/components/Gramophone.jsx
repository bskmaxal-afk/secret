import React, { useEffect, useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function Gramophone() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Keep in sync with actual audio state
    setIsPlaying(AudioManager.isPlaying());

    const handleStateChange = (e) => {
      setIsPlaying(e.detail.playing);
    };

    document.addEventListener('bgm-state-change', handleStateChange);
    return () => {
      document.removeEventListener('bgm-state-change', handleStateChange);
    };
  }, []);

  const handleToggle = () => {
    AudioManager.toggleBGM();
    AudioManager.playClick();
  };

  return (
    <div className="gramophone-container flex items-center gap-2.5 bg-wood-dark/80 border border-gold-dark px-4 py-1.5 rounded-[25px] shadow-[0_4_10px_rgba(0,0,0,0.3)] pointer-events-auto">
      <div 
        onClick={handleToggle}
        className={`gramophone-disc w-9 h-9 rounded-full relative cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.4)] border border-gold ${isPlaying ? 'animate-spin-slow' : ''}`}
        style={{
          background: 'radial-gradient(circle, #333 30%, #111 60%, #000 100%)'
        }}
      >
        <div className="w-2 h-2 bg-gold rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <span className="font-title text-gold text-[11px] tracking-wider hidden sm:inline whitespace-nowrap">
        Dewa 19 - Aku Milikmu
      </span>
    </div>
  );
}
