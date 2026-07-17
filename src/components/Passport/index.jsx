import React from 'react';

export default function Passport({ onClose, collectedKeys }) {
  return (
    <div 
      onClick={onClose}
      className="fixed top-0 left-0 w-screen h-screen bg-black/85 flex justify-center items-center z-[10001] p-6"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[550px] bg-[#E7D9C1] border-8 border-[#7A5C3E] rounded-lg p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2F241B] hover:text-[#7A5C3E] cursor-pointer text-[1.5rem] font-bold"
        >
          &times;
        </button>

        {/* Passport Cover Details */}
        <div className="border border-[#7A5C3E]/30 rounded p-6 bg-[#F5F1E8]/40 shadow-inner flex flex-col items-center">
          <span className="text-[2.2rem] mb-2">🛂</span>
          <h3 className="font-title text-[#2F241B] text-[1.25rem] tracking-[4px] font-black uppercase text-center">
            PASPOR PENGUNJUNG
          </h3>
          <div className="w-16 h-[2px] bg-[#7A5C3E] my-4" />

          {/* Visitor metadata details */}
          <div className="w-full flex flex-col gap-3 font-sans text-[#2F241B] text-[0.88rem] border-b border-[#7A5C3E]/15 pb-4 mb-4">
            <div className="flex justify-between border-b border-dashed border-[#7A5C3E]/10 pb-1">
              <span className="text-[#7A5C3E] uppercase font-bold text-[0.7rem] tracking-wider">Nama Pengunjung</span>
              <strong className="font-title text-[#2F241B] text-[0.8rem]">MAXAL</strong>
            </div>
            <div className="flex justify-between border-b border-dashed border-[#7A5C3E]/10 pb-1">
              <span className="text-[#7A5C3E] uppercase font-bold text-[0.7rem] tracking-wider">Pendamping</span>
              <strong className="font-title text-[#2F241B] text-[0.8rem]">SABRINA</strong>
            </div>
            <div className="flex justify-between border-b border-dashed border-[#7A5C3E]/10 pb-1">
              <span className="text-[#7A5C3E] uppercase font-bold text-[0.7rem] tracking-wider">Tanggal Kunjungan</span>
              <strong className="font-title text-[#2F241B] text-[0.8rem]">17 JULI 2026</strong>
            </div>
            <div className="flex justify-between border-b border-dashed border-[#7A5C3E]/10 pb-1">
              <span className="text-[#7A5C3E] uppercase font-bold text-[0.7rem] tracking-wider">Status Paspor</span>
              <strong className="font-title text-green-700 text-[0.75rem] tracking-wider font-bold">AKTIF / VALID</strong>
            </div>
          </div>

          {/* Stamps grid */}
          <div className="w-full">
            <h4 className="font-title text-[0.75rem] text-[#7A5C3E] tracking-widest uppercase mb-4 text-center font-bold">
              STEMPEL RUANGAN & PRESTASI
            </h4>
            
            <div className="grid grid-cols-3 gap-4">
              
              {/* Stamp Lobby */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/50 border border-[#7A5C3E]/15 rounded shadow-sm relative overflow-hidden min-h-[90px]">
                <span className="text-[1.8rem] opacity-90">🏛️</span>
                <span className="text-[0.55rem] font-title text-[#7A5C3E] tracking-wider mt-1 text-center font-bold">LOBBY</span>
                <div className="absolute inset-0 bg-red-800/10 border-2 border-dashed border-red-800/40 rounded-full scale-90 flex items-center justify-center -rotate-12 font-title text-[0.6rem] text-red-800/60 font-black">
                  VISITED
                </div>
              </div>

              {/* Stamp Keys */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/50 border border-[#7A5C3E]/15 rounded shadow-sm relative overflow-hidden min-h-[90px]">
                <span className="text-[1.8rem] opacity-90">🔑</span>
                <span className="text-[0.55rem] font-title text-[#7A5C3E] tracking-wider mt-1 text-center font-bold">KEY HUNTER</span>
                {collectedKeys.length >= 3 && (
                  <div className="absolute inset-0 bg-blue-800/10 border-2 border-dashed border-blue-800/40 rounded-full scale-90 flex items-center justify-center rotate-6 font-title text-[0.55rem] text-blue-800/60 font-black">
                    UNLOCKED
                  </div>
                )}
              </div>

              {/* Stamp Secret Room */}
              <div className="flex flex-col items-center justify-center p-3 bg-white/50 border border-[#7A5C3E]/15 rounded shadow-sm relative overflow-hidden min-h-[90px]">
                <span className="text-[1.8rem] opacity-90">✨</span>
                <span className="text-[0.55rem] font-title text-[#7A5C3E] tracking-wider mt-1 text-center font-bold">CELESTIAL</span>
                {collectedKeys.length >= 3 && (
                  <div className="absolute inset-0 bg-green-800/10 border-2 border-dashed border-green-800/40 rounded-full scale-90 flex items-center justify-center -rotate-6 font-title text-[0.5rem] text-green-800/60 font-black">
                    SECRET
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
