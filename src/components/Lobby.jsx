import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AudioManager } from '../utils/audio';
import defaultMessages from '../data/messages.json';

export default function Lobby({ onNavigate, onCollectKey, collectedKeys }) {
  const canvasRef = useRef(null);
  const lobbyTitleRef = useRef(null);
  const lobbySubtitleRef = useRef(null);
  const cardsRef = useRef([]);
  
  const [sender, setSender] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('pink');
  const [messages, setMessages] = useState([]);

  // Load notes from messages.json and localStorage
  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('memory_wall_notes')) || [];
    setMessages([...defaultMessages, ...userNotes]);
  }, []);

  // GSAP animations
  useEffect(() => {
    const cardTargets = cardsRef.current.filter(Boolean);

    // Re-initialize GSAP tweens safely
    gsap.killTweensOf([lobbyTitleRef.current, lobbySubtitleRef.current, cardTargets]);
    gsap.set([lobbyTitleRef.current, lobbySubtitleRef.current, cardTargets], { clearProps: "all" });

    gsap.from(lobbyTitleRef.current, {
      duration: 1.2,
      opacity: 0,
      y: -30,
      ease: 'power3.out',
      onComplete: () => {
        if (lobbyTitleRef.current) {
          gsap.set(lobbyTitleRef.current, { clearProps: "all" });
        }
      }
    });

    gsap.from(lobbySubtitleRef.current, {
      duration: 1.2,
      opacity: 0,
      delay: 0.3,
      y: -20,
      ease: 'power3.out',
      onComplete: () => {
        if (lobbySubtitleRef.current) {
          gsap.set(lobbySubtitleRef.current, { clearProps: "all" });
        }
      }
    });

    if (cardTargets.length > 0) {
      gsap.from(cardTargets, {
        duration: 0.8,
        opacity: 0,
        y: 40,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(cardTargets, { clearProps: "all" });
        }
      });
    }
  }, []);

  // Canvas Dust Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;
    let animId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Mote {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y -= this.speedY;

        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10 || this.x > canvas.width + 10) {
          this.x = Math.random() * canvas.width;
        }

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.7) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.growing = true;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 193, 125, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(229, 193, 125, 0.4)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Mote());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Lightbeam radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 0, 100, 
        canvas.width / 2, 0, canvas.height * 0.8
      );
      gradient.addColorStop(0, 'rgba(229, 193, 125, 0.04)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Form submit note
  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (!sender.trim() || !noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      sender: sender.trim(),
      text: noteText.trim(),
      color: noteColor,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const userNotes = JSON.parse(localStorage.getItem('memory_wall_notes')) || [];
    userNotes.push(newNote);
    localStorage.setItem('memory_wall_notes', JSON.stringify(userNotes));

    setMessages([...defaultMessages, ...userNotes]);
    setNoteText('');
    AudioManager.playStamp();
  };

  const hasLobbyKey = collectedKeys.includes('lobby');

  return (
    <section className="min-h-screen bg-radial from-[#231411] to-[#0d0605] px-5 sm:px-10 py-[100px] relative w-full overflow-hidden">
      {/* Motes Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none" />

      <div className="relative z-2 max-w-[1000px] mx-auto">
        <div className="text-center mb-[60px]">
          <h1 ref={lobbyTitleRef} className="font-title text-gold-bright text-[3rem] tracking-[5px] text-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            GRAND LOBBY
          </h1>
          <p ref={lobbySubtitleRef} className="font-serif text-parchment-dark text-[1.1rem] mt-2.5 italic">
            Selamat datang di galeri kenangan cinta Sabrina & Maxal
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5 mb-20">
          
          <button 
            ref={el => cardsRef.current[0] = el}
            onClick={() => onNavigate('gallery')}
            className="h-[200px] bg-gradient-to-br from-[#3a221d] to-[#1e110e] border-3 border-gold-dark rounded p-[30px] flex flex-col justify-center relative text-left overflow-hidden transition-all duration-[400ms] group cursor-pointer hover:border-gold-bright hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-gold/20 rounded-[2px]" />
            <div className="text-[2.2rem] mb-3.5 transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-6">🎨</div>
            <h3 className="font-title text-gold-bright text-[1.3rem] tracking-wider mb-1">GALERI FOTO</h3>
            <p className="font-sans text-parchment-dark text-[0.85rem] leading-relaxed opacity-80">Ruang pameran lukisan & foto romantis</p>
          </button>

          <button 
            ref={el => cardsRef.current[1] = el}
            onClick={() => onNavigate('timeline')}
            className="h-[200px] bg-gradient-to-br from-[#3a221d] to-[#1e110e] border-3 border-gold-dark rounded p-[30px] flex flex-col justify-center relative text-left overflow-hidden transition-all duration-[400ms] group cursor-pointer hover:border-gold-bright hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-gold/20 rounded-[2px]" />
            <div className="text-[2.2rem] mb-3.5 transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-6">⏳</div>
            <h3 className="font-title text-gold-bright text-[1.3rem] tracking-wider mb-1">LINIMASA KITA</h3>
            <p className="font-sans text-parchment-dark text-[0.85rem] leading-relaxed opacity-80">Perjalanan kisah dari hari pertama kita bertemu</p>
          </button>

          <button 
            ref={el => cardsRef.current[2] = el}
            onClick={() => onNavigate('scrapbook')}
            className="h-[200px] bg-gradient-to-br from-[#3a221d] to-[#1e110e] border-3 border-gold-dark rounded p-[30px] flex flex-col justify-center relative text-left overflow-hidden transition-all duration-[400ms] group cursor-pointer hover:border-gold-bright hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-gold/20 rounded-[2px]" />
            <div className="text-[2.2rem] mb-3.5 transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-6">📖</div>
            <h3 className="font-title text-gold-bright text-[1.3rem] tracking-wider mb-1">BUKU KENANGAN</h3>
            <p className="font-sans text-parchment-dark text-[0.85rem] leading-relaxed opacity-80">Buku kenangan digital yang bisa kamu buka</p>
          </button>

          <button 
            ref={el => cardsRef.current[3] = el}
            onClick={() => onNavigate('cinema')}
            className="h-[200px] bg-gradient-to-br from-[#3a221d] to-[#1e110e] border-3 border-gold-dark rounded p-[30px] flex flex-col justify-center relative text-left overflow-hidden transition-all duration-[400ms] group cursor-pointer hover:border-gold-bright hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-gold/20 rounded-[2px]" />
            <div className="text-[2.2rem] mb-3.5 transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-6">🎬</div>
            <h3 className="font-title text-gold-bright text-[1.3rem] tracking-wider mb-1">RUANG SINEMA</h3>
            <p className="font-sans text-parchment-dark text-[0.85rem] leading-relaxed opacity-80">Putar slideshow foto layaknya film silent jadul</p>
          </button>

        </div>

        {/* Memory Wall */}
        <div className="bg-[#251613] border-[15px] border-[#1a0d0a] outline-4 outline-gold-dark rounded-lg p-5 sm:p-10 shadow-2xl mb-12">
          <div className="text-center mb-8">
            <h2 className="font-title text-gold-bright text-[1.8rem] tracking-wider">PAPAN PESAN CINTA</h2>
            <p className="font-serif text-parchment-dark text-[0.95rem] italic mt-1">Tulis pesan manis dan sematkan ke papan corkboard ini</p>
          </div>

          <div className="mb-10 bg-parchment-medium p-6 rounded border border-parchment-dark shadow-lg">
            <form onSubmit={handleSubmitNote} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Nama (cth: Maxal)" 
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="bg-white border border-parchment-dark p-3 font-sans text-[0.9rem] rounded text-text-dark w-full focus:outline-none focus:border-gold"
                required 
              />
              <textarea 
                placeholder="Tulis catatan cinta..." 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="bg-white border border-parchment-dark p-3 font-sans text-[0.9rem] rounded text-text-dark w-full focus:outline-none focus:border-gold resize-none"
                rows="3"
                required 
              />
              
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 items-center">
                  <span className="text-[0.8rem] text-wood-medium font-semibold">Warna Kertas:</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="pink" checked={noteColor === 'pink'} onChange={() => setNoteColor('pink')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#ffd1dc] border-2 ${noteColor === 'pink' ? 'border-gold-dark scale-110' : 'border-transparent'}`} />
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="yellow" checked={noteColor === 'yellow'} onChange={() => setNoteColor('yellow')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#fffaaa] border-2 ${noteColor === 'yellow' ? 'border-gold-dark scale-110' : 'border-transparent'}`} />
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="blue" checked={noteColor === 'blue'} onChange={() => setNoteColor('blue')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#bfe3ff] border-2 ${noteColor === 'blue' ? 'border-gold-dark scale-110' : 'border-transparent'}`} />
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="bg-wood-medium text-text-light font-title border border-wood-dark px-6 py-3 rounded cursor-pointer tracking-wider hover:bg-gold hover:text-wood-dark transition-colors">
                  SEMATKAN CATATAN
                </button>
              </div>
            </form>
          </div>

          {/* Corkboard notes grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-gradient-to-r from-[#55352c] to-[#3d231d] p-6 rounded border-2 border-[#23120f] shadow-inner min-h-[250px]">
            {messages.map((note) => {
              // Deterministic rotation based on id
              const rotation = (note.id % 14) - 7;
              return (
                <div 
                  key={note.id}
                  className={`cork-note note-${note.color} p-4 h-[160px] relative flex flex-col justify-between rounded shadow-[2px_8px_15px_rgba(0,0,0,0.4)]`}
                  style={{ '--note-rot': `${rotation}deg` }}
                >
                  <div className="note-pin" />
                  <div className="note-sender font-title text-[0.75rem] font-bold border-b border-black/10 pb-1 mb-2 tracking-wider">
                    {note.sender}
                  </div>
                  <div className="note-text font-cursive text-[1.15rem] leading-snug flex-1 overflow-hidden">
                    {note.text}
                  </div>
                  <div className="note-date text-[0.55rem] text-right opacity-70 font-semibold tracking-wide mt-1">
                    {note.date || '17 Juli 2026'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hidden key */}
        {!hasLobbyKey && (
          <div 
            onClick={(e) => onCollectKey('lobby', e)}
            className="text-center my-10 text-[1.5rem] cursor-pointer opacity-15 hover:opacity-75 transition-opacity duration-300"
          >
            🔑
          </div>
        )}

        <div className="lobby-footer text-center text-gold-dark text-[0.8rem] mt-[60px] border-t border-gold/15 pt-6">
          <p>&copy; 2026 Museum of Us. Created with love for Sabrina.</p>
        </div>
      </div>
    </section>
  );
}
