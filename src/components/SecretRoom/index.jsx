import React, { useEffect, useRef, useState } from 'react';
import NarrativeScreen from '../NarrativeScreen';
import { AudioManager } from '../../utils/audio';

export default function SecretRoom({ onNavigate, onClose }) {
  const canvasRef = useRef(null);
  const [showNarrative, setShowNarrative] = useState(true);

  const secretStory = [
    "Ehh...",
    "Kamu nemu ruangan ini juga ternyata.",
    "Berarti emang niat ya muter museum ini sampai habis wkwkwk.",
    "Yaudah deh...",
    "Di sini aku cuma mau bilang sesuatu.",
    "Makasih ya.",
    "Walaupun kita baru mulai cerita ini.",
    "Aku seneng banget bisa kenal kamu.",
    "Semoga nanti...",
    "Museum ini bisa terus nambah isinya.",
    "Bukan karena kita sering foto-foto.",
    "Tapi karena kita terus bikin cerita baru bareng. ☕❤️"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 60;
    let animId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
      constructor(isCore = false, label = '', xPercent = 0.5, yPercent = 0.5) {
        this.isCore = isCore;
        this.label = label;
        this.xPercent = xPercent;
        this.yPercent = yPercent;
        this.size = isCore ? 3.5 : 1 + Math.random() * 1.5;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.alpha = 0.2 + Math.random() * 0.8;
      }

      update() {
        this.pulseAngle += this.pulseSpeed;
        this.alpha = 0.3 + Math.abs(Math.sin(this.pulseAngle)) * 0.7;
      }

      draw() {
        const x = this.xPercent * canvas.width;
        const y = this.yPercent * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = this.isCore ? 15 : 4;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        if (this.isCore && this.label) {
          ctx.fillStyle = 'rgba(231, 217, 193, 0.75)';
          ctx.font = '9px Outfit, sans-serif';
          ctx.letterSpacing = '1px';
          ctx.textAlign = 'center';
          ctx.fillText(this.label, x, y - 10);
        }
      }
    }

    // Build the Heart Constellation (Core Stars)
    const heartPattern = [
      { label: 'SABRINA', x: 0.5, y: 0.35 },
      { label: 'MAXAL', x: 0.5, y: 0.65 },
      { label: 'FIRST MEET', x: 0.4, y: 0.42 },
      { label: 'COFFEE HUNTING', x: 0.35, y: 0.52 },
      { label: 'LATE OBROLAN', x: 0.42, y: 0.62 },
      { label: 'SENYUMAN', x: 0.6, y: 0.42 },
      { label: 'PERJALANAN', x: 0.65, y: 0.52 },
      { label: 'TAWA BERSAMA', x: 0.58, y: 0.62 }
    ];

    heartPattern.forEach(h => {
      stars.push(new Star(true, h.label, h.x, h.y));
    });

    // Populate generic backing stars
    for (let i = 0; i < starCount; i++) {
      let overlap = false;
      const x = 0.1 + Math.random() * 0.8;
      const y = 0.1 + Math.random() * 0.8;
      
      // Avoid overlapping with core heart area
      if (x > 0.3 && x < 0.7 && y > 0.25 && y < 0.75) {
        overlap = true;
      }
      
      if (!overlap) {
        stars.push(new Star(false, '', x, y));
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Space backing gradient
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      grad.addColorStop(0, '#1E0E0B');
      grad.addColorStop(0.5, '#0C0504');
      grad.addColorStop(1, '#050201');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw constellation connector lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.lineWidth = 1;
      
      const drawLine = (idx1, idx2) => {
        const s1 = stars[idx1];
        const s2 = stars[idx2];
        if (s1 && s2) {
          ctx.moveTo(s1.xPercent * canvas.width, s1.yPercent * canvas.height);
          ctx.lineTo(s2.xPercent * canvas.width, s2.yPercent * canvas.height);
        }
      };

      // Draw heart connections
      drawLine(0, 2); drawLine(2, 3); drawLine(3, 4); drawLine(4, 1);
      drawLine(0, 5); drawLine(5, 6); drawLine(6, 7); drawLine(7, 1);
      
      ctx.stroke();

      // Update and draw stars
      stars.forEach(s => {
        s.update();
        s.draw();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  if (showNarrative) {
    return (
      <NarrativeScreen 
        story={secretStory} 
        onComplete={() => setShowNarrative(false)} 
      />
    );
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[10005] overflow-hidden flex flex-col justify-between items-center py-[60px] px-10">
      
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Close button (only shown if onClose callback is present, e.g. for easter egg typing overlay) */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gold-bright hover:text-white cursor-pointer z-10 font-title text-[0.8rem] tracking-wider border border-gold/30 px-3 py-1.5 rounded hover:bg-gold/15 transition-all"
        >
          TUTUP RUANG RAHASIA &times;
        </button>
      )}

      {/* Header Info */}
      <div className="relative z-1 text-center">
        <h2 className="font-title text-gold-bright text-[2rem] sm:text-[2.5rem] tracking-[5px] text-shadow-[0_4px_10px_rgba(0,0,0,0.85)] font-black">
          ❤️ SECRET ROOM
        </h2>
        <div className="w-[100px] h-[1px] bg-gold mx-auto my-3" />
        <p className="font-serif text-parchment-dark text-[0.95rem] tracking-wider italic">
          Rasi bintang cinta yang melukis ikatan kisah kita
        </p>
      </div>

      {/* Floating Center Card */}
      <div className="relative z-1 bg-black/75 border border-gold-dark/30 rounded p-6 sm:p-8 max-w-[420px] text-center shadow-2xl backdrop-blur-sm animate-float">
        <span className="text-[2.2rem] block mb-2">✨</span>
        <h3 className="font-title text-gold-bright text-[1.2rem] tracking-widest uppercase mb-3">
          KONSTELASI SABRINA & MAXAL
        </h3>
        <p className="font-serif text-parchment-medium text-[0.9rem] leading-relaxed italic">
          "Seperti bintang-bintang di angkasa yang selalu bersinar berdampingan, kisah kita telah tertulis dalam konstelasi abadi semesta ini."
        </p>
      </div>

      {/* Footer Info & Next trigger */}
      <div className="relative z-1 flex flex-col items-center gap-4 text-center">
        {onNavigate ? (
          <button 
            onClick={() => {
              AudioManager.playClick();
              onNavigate('ending');
            }}
            className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-2.5 rounded cursor-pointer tracking-[3px] text-[0.8rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            See You Next Weekend &rarr;
          </button>
        ) : (
          onClose && (
            <button 
              onClick={() => {
                AudioManager.playClick();
                onClose();
              }}
              className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-2.5 rounded cursor-pointer tracking-[3px] text-[0.8rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              KEMBALI KE MUSEUM &rarr;
            </button>
          )
        )}
        <div className="text-[0.65rem] text-gold/40 tracking-[2px] uppercase">
          EASTER EGG UNLOCKED &bull; CELESTIAL HEART CONSTELLATION
        </div>
      </div>

    </div>
  );
}
