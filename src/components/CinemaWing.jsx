import React, { useEffect, useState } from 'react';
import { AudioManager } from '../utils/audio';

export default function CinemaWing({ onBack }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [seats, setSeats] = useState([]);

  const slides = [
    { src: '/assets/poto1.jpg', title: 'Senyum Manismu' },
    { src: '/assets/poto2.jpg', title: 'Momen Kebersamaan Kita' },
    { src: '/assets/poto3.jpg', title: 'Tawa Lepas Bersamamu' },
    { src: '/assets/poto4.jpg', title: 'Cerita Indah Kita' }
  ];

  // Start projector hum on mount, stop on unmount
  useEffect(() => {
    AudioManager.startProjectorHum();
    return () => {
      AudioManager.stopProjectorHum();
    };
  }, []);

  // Slideshow auto scroll
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Load seats from localStorage
  useEffect(() => {
    const totalSeats = 24; // 4 rows of 6 seats
    const savedSeats = JSON.parse(localStorage.getItem('cinema_seat_status'));
    
    if (savedSeats) {
      setSeats(savedSeats);
    } else {
      // Default seat layout
      const initialSeats = Array.from({ length: totalSeats }, (_, idx) => {
        // Preset some reserved/busy seats to feel alive
        let status = 'empty';
        if (idx === 14) status = 'yours';      // Row C, Seat 3
        else if (idx === 15) status = 'sabrinas'; // Row C, Seat 4
        else if ([2, 7, 11, 20].includes(idx)) status = 'reserved';
        
        return { id: idx, status };
      });
      setSeats(initialSeats);
      localStorage.setItem('cinema_seat_status', JSON.stringify(initialSeats));
    }
  }, []);

  const handleSeatClick = (seatId) => {
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        let nextStatus = 'empty';
        if (s.status === 'empty') nextStatus = 'yours';
        else if (s.status === 'yours') nextStatus = 'sabrinas';
        else if (s.status === 'sabrinas') nextStatus = 'reserved';
        else if (s.status === 'reserved') nextStatus = 'empty';
        return { ...s, id: s.id, status: nextStatus };
      }
      return s;
    });

    setSeats(updatedSeats);
    localStorage.setItem('cinema_seat_status', JSON.stringify(updatedSeats));
    AudioManager.playClick();
  };

  const getSeatLetter = (id) => {
    const row = Math.floor(id / 6);
    const col = (id % 6) + 1;
    const rowLetter = ['A', 'B', 'C', 'D'][row];
    return `${rowLetter}${col}`;
  };

  return (
    <div className="min-h-screen bg-radial from-[#180b08] to-[#080201] px-5 sm:px-10 py-[100px] w-full text-parchment-light relative overflow-hidden">
      
      {/* Scratch overlay for vintage cinema look */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/5 animate-scratch pointer-events-none z-10" />

      {/* HUD Header */}
      <div className="flex justify-between items-center max-w-[1000px] mx-auto border-b border-gold/15 pb-4 mb-[40px] relative z-2">
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

      <div className="max-w-[1000px] mx-auto flex flex-col items-center relative z-2">
        
        <div className="text-center mb-[50px]">
          <h2 className="font-title text-gold-bright text-[2.2rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            RUANG SINEMA
          </h2>
          <p className="font-serif text-parchment-dark text-[1rem] italic mt-1.5">
            Menampilkan tayangan bisu kenangan indah kita
          </p>
        </div>

        {/* Projector Screen */}
        <div className="w-[90vw] max-w-[620px] bg-black border-6 border-wood-medium outline-3 outline-gold-dark rounded p-4 sm:p-6 shadow-2xl mb-12 flex flex-col items-center">
          
          {/* Lightbeam sweep projection */}
          <div className="w-full aspect-[16/10] bg-[#111] overflow-hidden relative border border-white/5 flex items-center justify-center">
            {/* The Beam */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent origin-top animate-projector-beam pointer-events-none z-5 mix-blend-screen" />
            
            {/* Film frame slide */}
            <img 
              src={slides[activeSlide].src} 
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
          </div>

          {/* Subtitle / Caption */}
          <div className="mt-5 w-[90%] bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent py-1.5 text-center text-gold-bright font-title text-[0.85rem] tracking-[1.5px] uppercase border-y border-[#ffd700]/10">
            MENAMPILKAN: {slides[activeSlide].title}
          </div>

          {/* Projector controls */}
          <div className="flex gap-6 mt-6 items-center">
            <button 
              onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}
              className="px-3.5 py-1.5 border border-gold text-gold font-title text-[0.75rem] rounded hover:bg-gold hover:text-wood-dark transition-colors cursor-pointer"
            >
              PREV
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2 border-2 border-gold-bright text-gold-bright font-title text-[0.8rem] tracking-wider rounded hover:bg-gold-bright hover:text-wood-dark transition-colors cursor-pointer"
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <button 
              onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}
              className="px-3.5 py-1.5 border border-gold text-gold font-title text-[0.75rem] rounded hover:bg-gold hover:text-wood-dark transition-colors cursor-pointer"
            >
              NEXT
            </button>
          </div>

        </div>

        {/* Seat Selector Section */}
        <div className="w-[90vw] max-w-[550px] bg-[#221310]/70 border border-gold-dark/40 rounded p-6 sm:p-8 flex flex-col items-center">
          
          <div className="text-center mb-6">
            <h3 className="font-title text-gold text-[1.1rem] tracking-wider">PILIH KURSI MENONTON</h3>
            <p className="font-sans text-[0.75rem] text-parchment-dark opacity-75 mt-0.5">Silakan pesan kursi menonton khusus untuk kita berdua</p>
          </div>

          {/* Seats grid */}
          <div className="grid grid-cols-6 gap-3.5 mb-8">
            {seats.map((seat) => {
              let seatColorClass = 'bg-[#4a2e2b] border-[#221310] hover:bg-[#6e4642]'; // empty
              if (seat.status === 'yours') seatColorClass = 'bg-gold border-gold-bright text-wood-dark shadow-[0_0_10px_#e5c17d]'; // yours
              else if (seat.status === 'sabrinas') seatColorClass = 'bg-burgundy-light border-[#8c262b] text-text-light shadow-[0_0_10px_#7e2428]'; // sabrinas
              else if (seat.status === 'reserved') seatColorClass = 'bg-black/45 border-white/5 text-[#665] cursor-not-allowed opacity-50'; // reserved

              return (
                <button
                  key={seat.id}
                  onClick={() => seat.status !== 'reserved' && handleSeatClick(seat.id)}
                  disabled={seat.status === 'reserved'}
                  className={`cinema-seat w-10 h-10 rounded border-2 flex items-center justify-center font-title text-[0.7rem] font-bold transition-all ${seatColorClass} ${seat.status !== 'reserved' ? 'cursor-pointer active:scale-95' : ''}`}
                >
                  {getSeatLetter(seat.id)}
                </button>
              );
            })}
          </div>

          {/* Seat legends */}
          <div className="flex gap-5 flex-wrap justify-center text-[0.75rem] font-semibold tracking-wide border-t border-gold/10 pt-4 w-full">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded border border-[#221310] bg-[#4a2e2b]" />
              <span className="text-[#a89] font-sans">KOSONG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded border border-gold-bright bg-gold" />
              <span className="text-[#a89] font-sans">MAXAL (KAMU)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded border border-[#8c262b] bg-burgundy-light" />
              <span className="text-[#a89] font-sans">SABRINA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded border border-white/5 bg-black/45 opacity-50" />
              <span className="text-[#a89] font-sans">TERISI</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
