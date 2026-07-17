import React, { useEffect, useRef } from 'react';

export default function SecretRoom({ onClose }) {
  const canvasRef = useRef(null);

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
        this.x = canvas.width * xPercent;
        this.y = canvas.height * yPercent;
        this.size = isCore ? 6 : Math.random() * 2 + 1;
        this.alpha = Math.random();
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsing = Math.random() > 0.5;
      }

      update() {
        this.x = canvas.width * this.xPercent;
        this.y = canvas.height * this.yPercent;

        if (this.pulsing) {
          this.alpha += this.pulseSpeed;
          if (this.alpha >= 1) this.pulsing = false;
        } else {
          this.alpha -= this.pulseSpeed;
          if (this.alpha <= 0.1) this.pulsing = true;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.isCore) {
          ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'white';
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw label for core stars
        if (this.isCore && this.label) {
          ctx.fillStyle = 'rgba(242, 229, 213, 0.85)';
          ctx.font = '10px Cinzel';
          ctx.textAlign = 'center';
          ctx.fillText(this.label, this.x, this.y - 12);
        }
      }
    }

    // Set up core stars to form a heart constellation
    const coreStars = [
      new Star(true, 'Maxal', 0.5, 0.45),          // Center
      new Star(true, 'Sabrina', 0.5, 0.3),         // Top notch
      new Star(true, 'Tawa Bersama', 0.4, 0.28),    // Left lobe
      new Star(true, 'Langkah Pertama', 0.32, 0.36),// Left edge
      new Star(true, 'Saling Mengerti', 0.35, 0.52),// Left slope
      new Star(true, 'Satu Arah', 0.42, 0.65),     // Left bottom
      new Star(true, 'Selamanya', 0.5, 0.75),      // Bottom point
      new Star(true, 'Masa Depan', 0.58, 0.65),    // Right bottom
      new Star(true, 'Saling Menjaga', 0.65, 0.52),// Right slope
      new Star(true, 'Bahagia Selalu', 0.68, 0.36),// Right edge
      new Star(true, 'Kasih Hangat', 0.6, 0.28),    // Right lobe
    ];

    // Initialize regular stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(false, '', Math.random(), Math.random()));
    }
    stars = [...stars, ...coreStars];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space radial background
      const spaceBg = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      spaceBg.addColorStop(0, '#100b1e');
      spaceBg.addColorStop(0.5, '#05030b');
      spaceBg.addColorStop(1, '#000000');
      ctx.fillStyle = spaceBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(s => {
        s.update();
        s.draw();
      });

      // Draw constellation connection lines for core stars
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(229, 193, 125, 0.2)';
      ctx.lineWidth = 1;
      
      // Connect stars sequentially to form a outline heart + cross connections to center
      for (let i = 1; i < coreStars.length; i++) {
        ctx.moveTo(coreStars[i - 1].x, coreStars[i - 1].y);
        ctx.lineTo(coreStars[i].x, coreStars[i].y);
      }
      // Connect bottom back to top
      ctx.moveTo(coreStars[coreStars.length - 1].x, coreStars[coreStars.length - 1].y);
      ctx.lineTo(coreStars[2].x, coreStars[2].y); // Close loop

      // Connect everything to center (Maxal star)
      const centerStar = coreStars[0];
      for (let i = 1; i < coreStars.length; i++) {
        ctx.moveTo(centerStar.x, centerStar.y);
        ctx.lineTo(coreStars[i].x, coreStars[i].y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[10005] overflow-hidden flex flex-col justify-between items-center py-[60px] px-10">
      
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gold-bright hover:text-white cursor-pointer z-10 font-title text-[0.8rem] tracking-wider border border-gold/30 px-3 py-1.5 rounded hover:bg-gold/15 transition-all"
      >
        TUTUP RUANG RAHASIA &times;
      </button>

      {/* Header Info */}
      <div className="relative z-1 text-center">
        <h2 className="font-title text-gold-bright text-[2rem] sm:text-[2.5rem] tracking-[5px] text-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-black">
          RUANG RAHASIA CELESTIAL
        </h2>
        <div className="w-[100px] h-[1px] bg-gold mx-auto my-3" />
        <p className="font-serif text-parchment-dark text-[0.95rem] tracking-wider italic">
          Rasi bintang cinta yang melukis ikatan kisah kita
        </p>
      </div>

      {/* Floating Center Card */}
      <div className="relative z-1 bg-black/60 border border-gold-dark/30 rounded p-6 sm:p-8 max-w-[420px] text-center shadow-2xl backdrop-blur-sm animate-float">
        <span className="text-[2.2rem] block mb-2">✨</span>
        <h3 className="font-title text-gold-bright text-[1.2rem] tracking-widest uppercase mb-3">
          KONSTELASI SABRINA & MAXAL
        </h3>
        <p className="font-serif text-parchment-medium text-[0.9rem] leading-relaxed italic">
          "Seperti bintang-bintang di angkasa yang selalu bersinar berdampingan, kisah kita telah tertulis dalam konstelasi abadi semesta ini."
        </p>
      </div>

      {/* Footer Info */}
      <div className="relative z-1 text-center text-[0.7rem] text-gold/40 tracking-[2px]">
        EASTER EGG UNLOCKED &bull; CELESTIAL HEART CONSTELLATION
      </div>

    </div>
  );
}
