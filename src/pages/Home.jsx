import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Gallery from '../components/Gallery';
import Timeline from '../components/Timeline';
import Cinema from '../components/Cinema';
import Scrapbook from '../components/Scrapbook';
// SecretRoom removed
import NarrativeScreen from '../components/NarrativeScreen';
import Navbar from '../components/Navbar';
import { AudioManager } from '../utils/audio';

const roomIndices = {
  lobby: 0,
  gallery: 1,
  timeline: 2,
  scrapbook: 3,
  cinema: 4,
  ending: 5
};

const walkVariants = {
  initial: (direction) => ({
    opacity: 0,
    scale: direction === 'forward' ? 0.95 : 1.05,
    filter: 'blur(5px)'
  }),
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: (direction) => ({
    opacity: 0,
    scale: direction === 'forward' ? 1.05 : 0.95,
    filter: 'blur(8px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export default function Home({ collectedKeys, onCollectKey, onExit }) {
  const [activeRoom, setActiveRoom] = useState('lobby');
  const [direction, setDirection] = useState('forward');
  const [prevRoom, setPrevRoom] = useState('lobby');

  const handleRoomTransition = (targetRoom) => {
    if (targetRoom === activeRoom) return;

    const prevIdx = roomIndices[prevRoom] || 0;
    const targetIdx = roomIndices[targetRoom] || 0;
    const dir = targetIdx > prevIdx ? 'forward' : 'back';
    
    setDirection(dir);
    setPrevRoom(targetRoom);
    setActiveRoom(targetRoom);

    AudioManager.playClick();
    
    if (activeRoom === 'cinema') {
      AudioManager.stopProjectorHum();
    }

    window.scrollTo(0, 0);
  };

  const renderRoomContent = () => {
    switch (activeRoom) {
      case 'gallery':
        return <Gallery onNavigate={handleRoomTransition} onCollectKey={onCollectKey} collectedKeys={collectedKeys} />;
      case 'timeline':
        return <Timeline onNavigate={handleRoomTransition} />;
      case 'scrapbook':
        return <Scrapbook onNavigate={handleRoomTransition} onCollectKey={onCollectKey} collectedKeys={collectedKeys} />;
      case 'cinema':
        return <Cinema onNavigate={handleRoomTransition} />;
      // SecretRoom case removed
      case 'ending':
        return <EndingScreen onNavigate={handleRoomTransition} />;
      case 'lobby':
      default:
        return (
          <LobbyScene 
            onNavigate={handleRoomTransition} 
            onCollectKey={onCollectKey} 
            collectedKeys={collectedKeys} 
          />
        );
    }
  };

  return (
    <MainLayout>
      <Navbar />
      <div className="relative w-full min-h-screen overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeRoom}
            custom={direction}
            variants={walkVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            {renderRoomContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}

// Room 1 - First Sip
function LobbyScene({ onNavigate, onCollectKey, collectedKeys }) {
  const hasKey = Array.isArray(collectedKeys) && collectedKeys.includes('lobby');

  return (
    <div className="w-full bg-[#2F241B] px-5 sm:px-10 py-[120px] text-parchment-light min-h-screen flex flex-col justify-center items-center relative">
      <div className="film-grain" />

      <div className="max-w-[700px] mx-auto text-center z-10 w-full flex flex-col items-center">
        
        <div className="mb-12">
          <h2 className="font-title text-gold-bright text-[2.5rem] tracking-[5px] text-shadow-[0_4px_10px_rgba(0,0,0,0.85)] uppercase">
            ☕ Room 1 — First Sip
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto my-4" />
        </div>

        <div className="bg-[#221310] border border-gold-dark/40 rounded p-8 sm:p-12 shadow-2xl flex flex-col items-center gap-8 w-full max-w-[600px] mb-12">
          <div className="font-serif text-[#E7D9C1] text-[1.1rem] sm:text-[1.2rem] leading-relaxed italic flex flex-col gap-3.5">
            <p>"Nahhh. Ini ruangan favorit aku."</p>
            <p>"Soalnya hampir semua cerita kita dimulai dari nyari coffee shop wkwkwk."</p>
            <p>"Kadang niatnya cuma 'ngopi bentar'. Eh ujung-ujungnya ngobrol berjam-jam sampai lupa waktu."</p>
            <p>"Dan lucunya... Yang paling aku inget malah obrolannya, bukan kopinya. ☕🤍"</p>
          </div>
          
          <button 
            onClick={() => onNavigate('gallery')}
            className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3.5 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)] mt-4"
          >
            YUK SINI &rarr;
          </button>
        </div>

        {!hasKey && (
          <div 
            onClick={(e) => onCollectKey('lobby', e)}
            className="text-center text-[1.5rem] cursor-pointer opacity-15 hover:opacity-75 transition-opacity duration-300 select-none"
          >
            🔑
          </div>
        )}

      </div>
    </div>
  );
}

// Room 6 - See You Next Weekend (Ending)
function EndingScreen({ onNavigate }) {
  const endingStory = [
    "Udah selesai ternyata.",
    "Cepet juga ya.",
    "Padahal rasanya masih pengen muter lagi.",
    "Tapi tenang...",
    "Museum ini belum selesai kok.",
    "Justru ini baru ruangan-ruangan pertama.",
    "Aku berharap nanti...",
    "Setiap kita nemu coffee shop baru,",
    "Jalan ke tempat baru,",
    "Atau bikin cerita baru,",
    "Kita bisa pulang ke sini lagi buat nambah satu bingkai lagi.",
    "Jadi...",
    "Sampai ketemu di ruangan berikutnya ya, sayang. ☕🤍"
  ];

  const [storyStep, setStoryStep] = useState(0);

  const handleNext = () => {
    AudioManager.playClick();
    if (storyStep < endingStory.length - 1) {
      setStoryStep(prev => prev + 1);
    }
  };

  return (
    <div className="w-full bg-[#1b100d] px-5 sm:px-10 py-[120px] text-parchment-light min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="film-grain" />

      {/* Floating cup & heart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/5 text-[12rem] sm:text-[16rem] pointer-events-none select-none animate-float">
        ☕🤍
      </div>

      <div className="max-w-[600px] w-full text-center z-10 flex flex-col items-center gap-10">
        
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={storyStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[#E7D9C1] text-[1.3rem] sm:text-[1.6rem] leading-relaxed italic"
            >
              {endingStory[storyStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        {storyStep < endingStory.length - 1 ? (
          <button
            onClick={handleNext}
            className="font-title text-[#D4AF37] border-b border-[#D4AF37]/45 pb-1 px-4 text-[0.95rem] tracking-[3px] hover:text-[#F5F1E8] hover:border-[#F5F1E8] transition-colors cursor-pointer"
          >
            LANJUT
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-4 items-center"
          >
            <span className="font-title text-[#D4AF37] text-[1.1rem] tracking-[3px] uppercase font-bold">
              🌅 Room 6 — See You Next Weekend
            </span>
            <button
              onClick={() => {
                AudioManager.playClick();
                onNavigate('lobby');
              }}
              className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3.5 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:bg-gold-bright active:scale-95 transition-all font-black mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              MULAI LAGI DARI LOBBY &rarr;
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
