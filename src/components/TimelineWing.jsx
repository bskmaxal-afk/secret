import React, { useEffect, useRef, useState } from 'react';
import milestoneData from '../data/timeline.json';

export default function TimelineWing({ onBack }) {
  const [milestones, setMilestones] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    setMilestones(milestoneData);

    // IntersectionObserver to reveal timeline items as they scroll into view
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const itemId = entry.target.getAttribute('data-id');
          setVisibleItems(prev => ({ ...prev, [itemId]: true }));
        }
      });
    }, { threshold: 0.15 });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Callback to register DOM nodes with the observer
  const registerNode = (node) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-[#1d120f] to-[#0c0504] px-5 sm:px-10 py-[100px] w-full text-parchment-light">
      
      {/* HUD Header */}
      <div className="flex justify-between items-center max-w-[1000px] mx-auto border-b border-gold/15 pb-4 mb-[50px]">
        <button 
          onClick={onBack}
          className="font-title text-gold text-[0.8rem] sm:text-[0.9rem] tracking-wider border border-gold px-4 py-2 rounded hover:bg-gold hover:text-wood-dark cursor-pointer transition-colors"
        >
          &larr; KEMBALI KE LOBBY
        </button>
        <span className="font-title text-gold-bright text-[1.2rem] sm:text-[1.5rem] tracking-[4px] font-bold">
          MUSEUM OF US
        </span>
      </div>

      <div className="max-w-[800px] mx-auto relative">
        <div className="text-center mb-[80px]">
          <h2 className="font-title text-gold-bright text-[2.5rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            LINIMASA KITA
          </h2>
          <p className="font-serif text-parchment-dark text-[1.1rem] italic mt-2.5">
            Setiap detik yang berharga, diabadikan dalam ruang waktu
          </p>
        </div>

        {/* Center line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[180px] bottom-[120px] w-1 bg-gradient-to-b from-gold-dark via-gold to-gold-dark/20 rounded-full" />

        {/* Timeline Items */}
        <div className="flex flex-col gap-16 relative">
          {milestones.map((item, index) => {
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
                {/* Connector Node */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-[22px] h-[22px] rounded-full border-3 border-gold-dark bg-[#3a221d] z-10 transition-all duration-500 delay-300 flex items-center justify-center ${
                    isVisible ? 'scale-110 shadow-[0_0_15px_#e5c17d]' : 'scale-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-gold-bright" />
                </div>

                {/* Left side card (for Even indexes) */}
                <div className={`w-full md:w-[45%] flex justify-end order-1 md:order-1 ${isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                  {isEven && (
                    <div className="bg-[#2c1a17] border-2 border-gold-dark rounded p-6 shadow-xl relative w-full text-right hover:border-gold-bright transition-colors">
                      <div className="font-title text-gold-bright text-[1.15rem] font-bold tracking-wider mb-1">{item.title}</div>
                      <span className="inline-block bg-gold-dark/25 text-gold-bright text-[0.65rem] tracking-[1.5px] px-2 py-0.5 rounded font-title uppercase font-semibold mb-3">
                        {item.date}
                      </span>
                      <p className="font-serif text-parchment-dark text-[0.88rem] leading-relaxed italic">
                        "{item.description}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Gap spacer (for Even/Odd alignment) */}
                <div className="w-[10%] order-2 hidden md:block" />

                {/* Right side card (for Odd indexes) */}
                <div className={`w-full md:w-[45%] flex justify-start order-3 md:order-3 ${!isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                  {!isEven && (
                    <div className="bg-[#2c1a17] border-2 border-gold-dark rounded p-6 shadow-xl relative w-full text-left hover:border-gold-bright transition-colors">
                      <div className="font-title text-gold-bright text-[1.15rem] font-bold tracking-wider mb-1">{item.title}</div>
                      <span className="inline-block bg-gold-dark/25 text-gold-bright text-[0.65rem] tracking-[1.5px] px-2 py-0.5 rounded font-title uppercase font-semibold mb-3">
                        {item.date}
                      </span>
                      <p className="font-serif text-parchment-dark text-[0.88rem] leading-relaxed italic">
                        "{item.description}"
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Ending Node */}
        <div className="text-center mt-20 relative">
          <div className="inline-flex w-[50px] h-[50px] rounded-full bg-radial from-[#58181a] to-[#3a0b0d] border-2 border-gold items-center justify-center shadow-[0_0_15px_rgba(229,193,125,0.4)] transition-transform duration-500 hover:scale-110">
            <span className="text-[1.5rem]">❤️</span>
          </div>
          <h4 className="font-title text-gold-bright text-[1.2rem] tracking-wider mt-4">
            DAN PERJALANAN KITA AKAN TERUS BERLANJUT...
          </h4>
        </div>
      </div>

    </div>
  );
}
