import React, { useEffect, useRef, useState } from 'react';
import { milestoneData } from '../../data/timeline';
import NarrativeScreen from '../NarrativeScreen';
import { AudioManager } from '../../utils/audio';

export default function Timeline({ onNavigate }) {
  const [visibleItems, setVisibleItems] = useState({});
  const [showNarrative, setShowNarrative] = useState(true);
  const observerRef = useRef(null);

  const timelineStory = [
    "Aku baru sadar loh...",
    "Ternyata dalam waktu yang nggak terlalu lama kita udah lumayan sering jalan ya.",
    "Kadang emang nggak punya tujuan yang jelas.",
    "Yang penting jalan aja.",
    "Terus nyari tempat baru.",
    "Nyari kopi enak.",
    "Atau sekadar duduk sambil ngobrol.",
    "Entah kenapa...",
    "Hal-hal sesederhana itu malah jadi momen yang paling aku suka."
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          setVisibleItems(prev => ({ ...prev, [id]: true }));
        }
      });
    }, { threshold: 0.15 });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const registerNode = (node) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  };

  if (showNarrative) {
    return (
      <NarrativeScreen 
        story={timelineStory} 
        onComplete={() => setShowNarrative(false)} 
      />
    );
  }

  return (
    <div className="w-full bg-[#1b100d] px-5 sm:px-10 py-[120px] relative text-parchment-light min-h-screen">
      <div className="max-w-[800px] mx-auto relative">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-title text-gold-bright text-[2.5rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)] uppercase">
            🗺️ Room 3 — Next Stop
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto my-3" />
          <p className="font-serif text-parchment-dark text-[1.1rem] italic">
            Perjalanan dan destinasi yang pernah kita jelajahi bersama
          </p>
        </div>

        {/* Center alignment timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[180px] bottom-[100px] w-1 bg-gradient-to-b from-gold-dark via-gold to-gold-dark/20 rounded-full pointer-events-none" />

        {/* Milestones grid list */}
        <div className="flex flex-col gap-16 relative">
          {milestoneData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isVisible = visibleItems[item.id];
            
            return (
              <div 
                key={item.id}
                ref={registerNode}
                data-id={item.id}
                className={`flex flex-col md:flex-row items-center w-full relative transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : `opacity-0 scale-95 ${isEven ? '-translate-x-12' : 'translate-x-12'}`
                }`}
              >
                {/* Connector Dot */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-[22px] h-[22px] rounded-full border-3 border-gold-dark bg-[#3a221d] z-10 transition-all duration-500 delay-300 flex items-center justify-center ${
                    isVisible ? 'scale-110 shadow-[0_0_15px_#e5c17d]' : 'scale-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-gold-bright" />
                </div>

                {/* Left Card side */}
                <div className={`w-full md:w-[45%] flex justify-end order-1 md:order-1 ${isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                  {isEven && (
                    <div className="bg-[#2c1a17] border-2 border-gold-dark rounded p-6 shadow-xl w-full text-right hover:border-gold-bright transition-colors duration-300">
                      <div className="font-title text-gold-bright text-[1.15rem] font-bold tracking-wider mb-1">{item.title}</div>
                      <span className="inline-block bg-gold-dark/25 text-gold-bright text-[0.65rem] tracking-[1.5px] px-2 py-0.5 rounded font-title uppercase font-semibold mb-3">
                        {item.date}
                      </span>
                      <p className="font-serif text-parchment-dark text-[0.88rem] leading-relaxed italic">
                        "{item.desc}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Gap spacers */}
                <div className="w-[10%] order-2 hidden md:block" />

                {/* Right Card side */}
                <div className={`w-full md:w-[45%] flex justify-start order-3 md:order-3 ${!isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                  {!isEven && (
                    <div className="bg-[#2c1a17] border-2 border-gold-dark rounded p-6 shadow-xl w-full text-left hover:border-gold-bright transition-colors duration-300">
                      <div className="font-title text-gold-bright text-[1.15rem] font-bold tracking-wider mb-1">{item.title}</div>
                      <span className="inline-block bg-gold-dark/25 text-gold-bright text-[0.65rem] tracking-[1.5px] px-2 py-0.5 rounded font-title uppercase font-semibold mb-3">
                        {item.date}
                      </span>
                      <p className="font-serif text-parchment-dark text-[0.88rem] leading-relaxed italic">
                        "{item.desc}"
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Next Room Story Trigger */}
        <div className="flex flex-col items-center mt-20 relative z-20">
          <div className="inline-flex w-[50px] h-[50px] rounded-full bg-gradient-to-r from-burgundy to-burgundy-light border-2 border-gold items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">
            <span className="text-[1.5rem]">❤️</span>
          </div>
          <button 
            onClick={() => {
              console.log("Duduk & Mengobrol clicked. onNavigate exists:", typeof onNavigate === 'function');
              AudioManager.playClick();
              if (onNavigate) {
                onNavigate('scrapbook');
              }
            }}
            className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3.5 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Duduk & Mengobrol (Table Talk) &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
