import React, { useState } from 'react';
import MusicPlayer from '../MusicPlayer';

export default function Navbar() {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  return (
    <header className="fixed top-0 right-0 py-4 px-6 sm:px-10 flex justify-end items-center z-[990]">
      {/* Music Player Toggle */}
      <button 
        onClick={() => setShowMusicPlayer(!showMusicPlayer)}
        className="font-title text-gold text-[0.75rem] sm:text-[0.8rem] tracking-wider border border-gold/45 bg-wood-dark/80 backdrop-blur-md px-4 py-2 rounded-full hover:bg-gold hover:text-wood-dark cursor-pointer transition-all duration-300 shadow-lg"
      >
        🎵 MUSIK
      </button>

      {/* Music Player Dropdown */}
      {showMusicPlayer && (
        <div className="absolute top-full right-4 mt-2 bg-wood-dark/95 backdrop-blur-md border border-gold/30 rounded-lg p-4 shadow-2xl z-[999] min-w-[320px]">
          <div className="flex justify-between items-center mb-3">
            <span className="font-title text-gold-bright text-[0.8rem] tracking-[2px]">🎵 MUSIC PLAYER</span>
            <button 
              onClick={() => setShowMusicPlayer(false)}
              className="text-parchment-dark/60 hover:text-gold-bright transition-colors cursor-pointer text-lg"
            >
              ✕
            </button>
          </div>
          <MusicPlayer />
        </div>
      )}
    </header>
  );
}
