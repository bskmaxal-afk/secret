import React, { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../../utils/audio';
import NarrativeScreen from '../NarrativeScreen';

export default function Cinema({ onNavigate }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);

  const cinemaStory = [
    "Capek ga?",
    "Duduk dulu sini.",
    "Aku udah nyiapin bioskop mini.",
    "Tenang...",
    "Filmnya bukan film Marvel kok 😭",
    "Isinya cuma video singkat momen kita aja. 🎬🍿"
  ];

  useEffect(() => {
    AudioManager.startProjectorHum();
    return () => {
      AudioManager.stopProjectorHum();
    };
  }, []);

  // Auto-hide controls after 3 seconds
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      resetControlsTimer();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(err => {
        // Fallback: try on video element directly
        if (videoRef.current && videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      });
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  if (showNarrative) {
    return (
      <NarrativeScreen 
        story={cinemaStory} 
        onComplete={() => setShowNarrative(false)} 
      />
    );
  }

  return (
    <div className="w-full bg-[#140b09] px-5 sm:px-10 py-[120px] relative text-parchment-light min-h-screen overflow-hidden">
      
      {/* Projection slide scratch */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/5 animate-scratch pointer-events-none z-10" />

      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-title text-gold-bright text-[2.2rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)] uppercase">
            🎬 Room 5 — Coffee Break Cinema
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto my-3" />
          <p className="font-serif text-parchment-dark text-[1rem] italic">
            Duduk manis dan nikmati video singkat kenangan kita
          </p>
        </div>

        {/* Cinema Screen Container */}
        <div 
          ref={containerRef}
          className="w-full max-w-[720px] bg-black border-8 border-[#2d1b18] rounded shadow-[0_30px_60px_rgba(0,0,0,0.95)] relative mb-16 overflow-hidden group"
          onMouseMove={resetControlsTimer}
          onClick={resetControlsTimer}
        >
          
          {/* Light projection screen overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent pointer-events-none z-10 mix-blend-screen" />

          {/* Video Player */}
          <div className="aspect-[16/9] w-full flex items-center justify-center relative bg-[#090504]">
            <video
              ref={videoRef}
              src="/images/video1.mp4"
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              onEnded={handleVideoEnd}
              poster="/images/cinema-poster.jpg"
            />

            {/* Play overlay when paused */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-20"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 rounded-full bg-gold/80 flex items-center justify-center hover:bg-gold transition-colors shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <svg className="w-8 h-8 text-wood-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Player controls bar */}
          <div className={`bg-[#2d1b18] p-4 flex justify-between items-center border-t border-gold/15 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Pause / Play */}
            <button 
              onClick={togglePlay}
              className="text-gold hover:text-white font-title text-[0.85rem] tracking-wider cursor-pointer font-bold transition-colors flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  PAUSE
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  PLAY
                </>
              )}
            </button>

            {/* Status + Fullscreen */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-600 animate-ping' : 'bg-gray-500'}`} />
                <span className="font-title text-gold-bright text-[0.65rem] tracking-[1.5px]">
                  {isPlaying ? 'PLAYING' : 'PAUSED'}
                </span>
              </div>
              
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-gold hover:text-white font-title text-[0.8rem] tracking-wider cursor-pointer font-bold transition-colors flex items-center gap-1.5 border border-gold/30 px-3 py-1.5 rounded hover:border-gold-bright"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                FULLSCREEN
              </button>
            </div>
          </div>

        </div>

        {/* Info text */}
        <div className="text-center mb-12">
          <p className="font-serif text-parchment-dark/60 text-[0.85rem] italic">
            Taruh file video kamu di <span className="text-gold/80 font-mono text-[0.75rem]">public/videos/cinema.mp4</span>
          </p>
          <p className="font-serif text-parchment-dark/40 text-[0.75rem] italic mt-1">
            Durasi ideal: 1-2 menit
          </p>
        </div>

        {/* Next Room - Ending */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => {
              AudioManager.playClick();
              onNavigate('ending');
            }}
            className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3.5 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Lanjut ke Penutup &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
