import React from 'react';
import { motion } from 'framer-motion';

export default function MuseumMap({ activeRoom, onNavigate, onClose, collectedKeys }) {
  const rooms = [
    { key: 'lobby', label: 'Grand Lobby', x: '50%', y: '85%' },
    { key: 'gallery', label: 'Galeri Foto', x: '20%', y: '55%' },
    { key: 'timeline', label: 'Linimasa Kita', x: '80%', y: '55%' },
    { key: 'cinema', label: 'Ruang Sinema', x: '20%', y: '25%' },
    { key: 'scrapbook', label: 'Buku Kenangan', x: '80%', y: '25%' },
    { key: 'memorywall', label: 'Papan Pesan', x: '50%', y: '10%' }
  ];

  const handleRoomClick = (key) => {
    onNavigate(key);
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[10001] p-6"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] bg-[#E7D9C1] border-10 border-[#7A5C3E] outline-4 outline-[#2F241B] rounded-lg p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative"
        style={{
          backgroundImage: 'radial-gradient(circle, transparent 70%, rgba(47, 36, 27, 0.15) 100%)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2F241B] hover:text-[#7A5C3E] cursor-pointer text-[1.5rem] font-bold"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <h3 className="font-title text-[#2F241B] text-[1.4rem] tracking-[3px] font-bold">PETA MUSEUM</h3>
          <p className="font-serif text-[#7A5C3E] text-[0.85rem] italic mt-1">Gunakan untuk teleportasi cepat ke ruangan lain</p>
        </div>

        {/* Blueprint Map layout */}
        <div className="w-full aspect-[4/3] bg-[#F5F1E8]/60 border-2 border-dashed border-[#7A5C3E]/30 rounded-lg relative overflow-hidden shadow-inner p-4">
          
          {/* Connecting blueprint dashed lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <line x1="50%" y1="85%" x2="20%" y2="55%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="50%" y1="85%" x2="80%" y2="55%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="20%" y1="55%" x2="20%" y2="25%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="80%" y1="55%" x2="80%" y2="25%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="20%" y1="25%" x2="50%" y2="10%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="80%" y1="25%" x2="50%" y2="10%" stroke="#7A5C3E" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
          </svg>

          {/* Map Rooms nodes */}
          {rooms.map(room => {
            const isCurrent = activeRoom === room.key;
            return (
              <button
                key={room.key}
                onClick={() => handleRoomClick(room.key)}
                className={`absolute w-[100px] h-[55px] -translate-x-1/2 -translate-y-1/2 rounded border flex flex-col justify-center items-center cursor-pointer transition-all duration-300 text-center z-10 shadow-[0_3px_6px_rgba(0,0,0,0.15)] ${
                  isCurrent 
                    ? 'bg-[#7A5C3E] border-[#2F241B] text-[#F5F1E8] scale-108 font-bold' 
                    : 'bg-[#F5F1E8] border-[#7A5C3E]/60 text-[#2F241B] hover:border-[#2F241B] hover:bg-[#E7D9C1]'
                }`}
                style={{ left: room.x, top: room.y }}
              >
                <span className="font-title text-[0.65rem] tracking-[1px]">{room.label}</span>
                {isCurrent && <span className="text-[0.45rem] mt-0.5 tracking-wider font-semibold">KAMU DI SINI</span>}
              </button>
            );
          })}

        </div>

        {/* Collected keys status */}
        <div className="flex justify-center gap-6 mt-6 border-t border-[#7A5C3E]/20 pt-5">
          <div className="text-[0.8rem] text-[#2F241B] font-semibold flex items-center gap-2">
            <span>Kunci Ditemukan:</span>
            <div className="flex gap-2 text-[1rem]">
              <span className={collectedKeys.includes('lobby') ? 'opacity-100' : 'opacity-20'}>🔑</span>
              <span className={collectedKeys.includes('gallery') ? 'opacity-100' : 'opacity-20'}>🔑</span>
              <span className={collectedKeys.includes('scrapbook') ? 'opacity-100' : 'opacity-20'}>🔑</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
