import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function GalleryCard({ photo, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const rotateX = -((y - box.height / 2) / (box.height / 2)) * 10;
    const rotateY = ((x - box.width / 2) / (box.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const getFrameClass = (type) => {
    if (type === 'wood') return 'wood-frame';
    if (type === 'gold') return 'gold-frame';
    return 'vintage-frame';
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="clickable-exhibit flex flex-col items-center cursor-pointer transition-all duration-300 ease-out origin-center w-full"
    >
      {/* Framed image */}
      <div className={`p-4 sm:p-5 w-full flex items-center justify-center relative ${getFrameClass(photo.frame)}`}>
        <div className="w-full relative overflow-hidden bg-black flex items-center justify-center shadow-inner rounded-[2px] min-h-[220px] max-h-[340px]">
          <img 
            src={photo.src} 
            alt={photo.title}
            className="w-full h-auto max-h-[300px] object-contain transition-transform duration-500 hover:scale-105" 
          />
          {/* Glass reflection shine overlay */}
          <div className="reflection-overlay" />
          <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
        </div>
      </div>

      {/* Brass Plaque */}
      <div className="w-[80%] max-w-[260px] bg-gradient-to-b from-[#ffd89b] to-[#b8860b] border border-[#a2781b] rounded-[2px] mt-6 py-2 px-4 text-center text-[#2F241B] relative brass-plaque-shadow brass-plaque-screw">
        <h4 className="font-title text-[0.8rem] font-black tracking-widest text-[#2c1a02] truncate">
          {photo.title}
        </h4>
        <p className="font-sans text-[0.55rem] text-[#4d3202] uppercase tracking-[1.5px] mt-0.5 font-bold">
          {photo.date}
        </p>
      </div>
    </div>
  );
}
