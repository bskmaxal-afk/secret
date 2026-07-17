import React, { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const particleId = useRef(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      
      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      // Throttled particle spawn on move
      if (Math.random() < 0.08) {
        spawnParticle(e.clientX, e.clientY, false);
      }
    };

    const onClick = (e) => {
      // Spawn heart burst
      for (let i = 0; i < 6; i++) {
        spawnParticle(e.clientX, e.clientY, true);
      }

      // Check click targets for SFX
      const target = e.target.closest('a, button, .clickable-exhibit, .cinema-seat, .timeline-end, .book-nav');
      if (target) {
        if (target.classList.contains('clickable-exhibit')) {
          AudioManager.playCamera();
          triggerFlash();
        } else {
          AudioManager.playClick();
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Smooth Lerp/Glide animation for outer ring
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
      animId = requestAnimationFrame(updateRing);
    };
    updateRing();

    // Event delegation for mouse hovering
    const handleMouseOver = (e) => {
      const isOverInteractive = e.target.closest('a, button, input, textarea, select, .clickable-exhibit, .cinema-seat, .timeline-end, .book-nav, [role="button"]');
      setIsHovered(!!isOverInteractive);
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  const spawnParticle = (x, y, isExplosion = false) => {
    const emojis = ['❤️', '✨', '💖', '🌸', '🧸'];
    const selectedEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const id = particleId.current++;
    
    const size = isExplosion ? (Math.random() * 10 + 12) : (Math.random() * 8 + 8);
    const angle = isExplosion ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() * 0.4 - 0.2);
    const distance = isExplosion ? (Math.random() * 50 + 20) : (Math.random() * 30 + 30);
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance - (isExplosion ? 0 : 40);

    const newParticle = {
      id,
      emoji: selectedEmoji,
      x,
      y,
      destX,
      destY,
      size,
    };

    setParticles(prev => [...prev, newParticle]);

    // Remove particle after animation ends
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 850);
  };

  const triggerFlash = () => {
    const flash = document.createElement('div');
    flash.className = 'fixed top-0 left-0 w-screen h-screen bg-white z-[100000] pointer-events-none opacity-0 animate-shutter-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  };

  return (
    <>
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className={`fixed pointer-events-none rounded-full z-[10000] -translate-x-1/2 -translate-y-1/2 border-1.5 border-gold shadow-[0_0_8px_rgba(197,160,89,0.4)] transition-[width,height,background-color] duration-200 ${isHovered ? 'w-10 h-10 bg-gold/15 border-gold-bright' : 'w-5 h-5'}`}
      />
      {/* Center Dot */}
      <div 
        ref={dotRef}
        className="fixed pointer-events-none w-1 h-1 bg-gold rounded-full z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Floating Particles */}
      {particles.map(p => (
        <span 
          key={p.id}
          className="fixed pointer-events-none z-[9998] text-[#e5c17d] select-none"
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
