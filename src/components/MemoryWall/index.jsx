import React, { useEffect, useState } from 'react';
import { defaultNotes } from '../../data/notes';
import { AudioManager } from '../../utils/audio';

export default function MemoryWall() {
  const [sender, setSender] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('pink');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('memory_wall_notes')) || [];
    setMessages([...defaultNotes, ...userNotes]);
  }, []);

  const handleSubmit = (e) => {
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

    setMessages([...defaultNotes, ...userNotes]);
    setNoteText('');
    AudioManager.playStamp();
  };

  return (
    <div className="w-full bg-[#1b100d] px-5 sm:px-10 py-[120px] relative text-parchment-light min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-title text-gold-bright text-[2.2rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)] uppercase">
            PAPAN PESAN CINTA
          </h2>
          <p className="font-serif text-parchment-dark text-[1rem] italic mt-2">
            Tulis pesan manis dan sematkan ke papan corkboard ini
          </p>
        </div>

        {/* Corkboard container layout */}
        <div className="bg-[#251613] border-[15px] border-[#1a0d0a] outline-4 outline-gold-dark rounded-lg p-5 sm:p-10 shadow-2xl mb-12">
          
          {/* Post Form */}
          <div className="mb-10 bg-[#f2e5d5] p-6 rounded border border-[#e6d8c8] shadow-lg text-[#2F241B]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Nama (cth: Maxal)" 
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="bg-white border border-[#e6d8c8] p-3 font-sans text-[0.9rem] rounded text-[#2F241B] w-full focus:outline-none focus:border-gold"
                required 
              />
              <textarea 
                placeholder="Tulis catatan cinta..." 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="bg-white border border-[#e6d8c8] p-3 font-sans text-[0.9rem] rounded text-[#2F241B] w-full focus:outline-none focus:border-gold resize-none"
                rows="3"
                required 
              />
              
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 items-center">
                  <span className="text-[0.8rem] text-[#7A5C3E] font-semibold">Warna Kertas:</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="pink" checked={noteColor === 'pink'} onChange={() => setNoteColor('pink')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#ffd1dc] border-2 ${noteColor === 'pink' ? 'border-[#7A5C3E] scale-110' : 'border-transparent'}`} />
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="yellow" checked={noteColor === 'yellow'} onChange={() => setNoteColor('yellow')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#fffaaa] border-2 ${noteColor === 'yellow' ? 'border-[#7A5C3E] scale-110' : 'border-transparent'}`} />
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="note-color" value="blue" checked={noteColor === 'blue'} onChange={() => setNoteColor('blue')} className="hidden" />
                      <span className={`inline-block w-5.5 h-5.5 rounded-full bg-[#bfe3ff] border-2 ${noteColor === 'blue' ? 'border-[#7A5C3E] scale-110' : 'border-transparent'}`} />
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="bg-[#7A5C3E] text-white font-title border border-[#2F241B] px-6 py-3 rounded cursor-pointer tracking-wider hover:bg-gold hover:text-wood-dark transition-colors font-bold">
                  SEMATKAN CATATAN
                </button>
              </div>
            </form>
          </div>

          {/* Notes Cork Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-gradient-to-r from-[#55352c] to-[#3d231d] p-6 rounded border-2 border-[#23120f] shadow-inner min-h-[250px]">
            {messages.map((note) => {
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

      </div>
    </div>
  );
}
