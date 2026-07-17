import { useEffect, useRef, useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function useCursor() {
  const [particles, setParticles] = useState([]);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const particleId = useRef(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.08) {
        spawnParticle(e.clientX, e.clientY, false);
      }
    };

    const onClick = (e) => {
      for (let i = 0; i < 6; i++) {
        spawnParticle(e.clientX, e.clientY, true);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
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
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 850);
  };

  return {
    mouseCoords,
    particles
  };
}
