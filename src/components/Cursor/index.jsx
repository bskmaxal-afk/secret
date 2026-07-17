import React, { useEffect, useRef, useState } from 'react';
import useCursor from '../../hooks/useCursor';

export default function Cursor() {
  const { particles, mouseCoords } = useCursor();
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const ringCoords = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    // Smooth Lerp/Glide for outer circle
    let animId;
    const updateRing = () => {
      const dx = mouseCoords.current.x - ringCoords.current.x;
      const dy = mouseCoords.current.y - ringCoords.current.y;
      
      ringCoords.current.x += dx * 0.12;
      ringCoords.current.y += dy * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringCoords.current.x}px`;
        ringRef.current.style.top = `${ringCoords.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseCoords.current.x}px`;
        dotRef.current.style.top = `${mouseCoords.current.y}px`;
      }
      animId = requestAnimationFrame(updateRing);
    };
    updateRing();

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, select, .clickable-exhibit, .cinema-seat, .timeline-end, .book-nav, [role="button"]');
      setIsHovered(!!isInteractive);
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className={`fixed pointer-events-none rounded-full z-[10000] -translate-x-1/2 -translate-y-1/2 border border-gold shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-[width,height,background-color] duration-200 ${isHovered ? 'w-10 h-10 bg-gold/15 border-gold-bright' : 'w-5 h-5'}`}
      />
      {/* Inner Dot */}
      <div 
        ref={dotRef}
        className="fixed pointer-events-none w-1 h-1 bg-gold rounded-full z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Trail particles */}
      {particles.map(p => (
        <span 
          key={p.id}
          className="fixed pointer-events-none z-[9998] text-gold select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            '--dx': `${p.destX - p.x}px`,
            '--dy': `${p.destY - p.y}px`,
            animation: 'cursorParticle 0.8s ease-out forwards'
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}
