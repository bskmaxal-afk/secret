import React, { useState, useEffect } from 'react';
import { AudioManager } from '../../utils/audio';

export default function GalleryModal({ photoData, initialPhotoId, onClose, reviewsMap, onAddReview }) {
  const initialIndex = photoData.findIndex(p => p.id === initialPhotoId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [reviewerName, setReviewerName] = useState('Maxal');
  const [reviewText, setReviewText] = useState('');

  const currentPhoto = photoData[currentIndex];
  const reviews = reviewsMap[currentPhoto.id] || [];

  useEffect(() => {
    // Lock body scroll on mount
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore body scroll on unmount
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleNext = () => {
    AudioManager.playClick();
    if (currentIndex < photoData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // If we are at the end, return to gallery!
      onClose();
    }
  };

  const handlePrev = () => {
    AudioManager.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;
    onAddReview(currentPhoto.id, reviewerName.trim(), reviewText.trim());
    setReviewText('');
    AudioManager.playClick();
  };

  const getFrameClass = (type) => {
    if (type === 'wood') return 'wood-frame';
    if (type === 'gold') return 'gold-frame';
    return 'vintage-frame';
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-black/95 z-[10001] flex flex-col justify-between items-center py-6 px-4 md:px-10 overflow-hidden"
    >
      {/* Film Grain noise overlay */}
      <div className="film-grain" />

      {/* Floating Close Button - stays pinned on screen */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 text-gold-bright hover:text-white cursor-pointer z-[10002] text-[2.2rem] bg-[#2F241B]/85 hover:bg-gold hover:text-wood-dark w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 backdrop-blur-sm transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-95"
      >
        &times;
      </button>

      {/* Left Navigation Arrow */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 text-gold-bright hover:text-wood-dark hover:bg-gold w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 bg-[#2F241B]/85 z-[10002] cursor-pointer shadow-lg transition-all active:scale-95"
        >
          &larr;
        </button>
      )}

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 text-gold-bright hover:text-wood-dark hover:bg-gold w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 bg-[#2F241B]/85 z-[10002] cursor-pointer shadow-lg transition-all active:scale-95"
      >
        &rarr;
      </button>

      {/* 1. IMMERSIVE FULL SCREEN IMAGE PANEL */}
      <div className="flex-1 w-full flex items-center justify-center max-h-[55vh] md:max-h-[60vh] mt-10">
        <div className={`p-4 md:p-6 max-w-[90vw] md:max-w-[70vw] relative ${getFrameClass(currentPhoto.frame)}`}>
          <div className="overflow-hidden bg-[#0d0605] flex items-center justify-center rounded-[2px] shadow-2xl">
            <img 
              src={currentPhoto.src} 
              alt={currentPhoto.title} 
              className="max-h-[45vh] md:max-h-[50vh] w-auto object-contain select-none" 
            />
          </div>
          {/* Reflection shine glass overlay */}
          <div className="reflection-overlay" />
        </div>
      </div>

      {/* 2. DESCRIPTION & COMMENTS PANEL */}
      <div className="w-full max-w-[800px] p-6 bg-[#2F241B]/95 border border-gold/25 rounded-md shadow-2xl z-10 flex flex-col md:flex-row gap-6 max-h-[35vh] md:max-h-[28vh] overflow-y-auto text-parchment-light">
        
        {/* Story details */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="font-title text-gold-bright text-[1.25rem] tracking-wider border-b border-gold/15 pb-2 mb-2 uppercase">
            {currentPhoto.title}
          </h3>
          <p className="font-sans text-[0.75rem] tracking-wide mb-3 uppercase text-gold font-semibold">
            TANGGAL: {currentPhoto.date}
          </p>
          <div className="font-serif text-parchment-dark text-[0.88rem] leading-relaxed italic flex flex-col gap-1.5">
            <p className="text-gold font-bold">"Masih inget ga ini?"</p>
            <p className="opacity-80">Waktu itu...</p>
            <p className="my-0.5 text-white">"{currentPhoto.desc}"</p>
            <p className="opacity-85">Aku sampe sekarang masih ketawa kalau inget hari itu. 😭</p>
          </div>
        </div>

        {/* Guestbook reviews */}
        <div className="flex-1 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gold/10 pt-4 md:pt-0 md:pl-6">
          <h4 className="font-title text-[0.7rem] text-gold-bright tracking-widest uppercase mb-2 font-bold">
            Buku Tamu Eksibit
          </h4>

          {/* Reviews list */}
          <div className="bg-black/35 border border-gold/10 rounded p-2.5 mb-3 flex flex-col gap-1.5 max-h-[100px] overflow-y-auto">
            {reviews.length === 0 ? (
              <div className="text-[0.7rem] text-parchment-dark/40 italic text-center py-2">Belum ada catatan pengunjung. Tulis kesan pertama kamu!</div>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="border-b border-gold/5 pb-1 last:border-b-0">
                  <strong className="text-[0.7rem] text-gold">{rev.user}</strong>
                  <p className="text-[0.75rem] text-parchment-dark font-serif italic mt-0.5">"{rev.comment}"</p>
                </div>
              ))
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-1">
            <input 
              type="text" 
              placeholder="Nama" 
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full sm:w-[75px] bg-black/45 border border-gold/20 p-2 font-sans text-[0.75rem] rounded text-parchment-light focus:outline-none focus:border-gold"
              required
            />
            <input 
              type="text" 
              placeholder="Tulis kesan..." 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="flex-1 bg-black/45 border border-gold/20 p-2 font-sans text-[0.75rem] rounded text-parchment-light focus:outline-none focus:border-gold"
              required
            />
            <button type="submit" className="bg-gold text-wood-dark font-title text-[0.7rem] py-1.5 px-3 rounded hover:bg-gold-bright transition-colors cursor-pointer font-bold whitespace-nowrap">
              KIRIM
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
