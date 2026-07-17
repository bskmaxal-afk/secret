import React, { useEffect, useState } from 'react';
import { AudioManager } from '../utils/audio';
import photoData from '../data/photos.json';

export default function GalleryWing({ onBack, onCollectKey, collectedKeys }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Review systems
  const [reviewerName, setReviewerName] = useState('Maxal');
  const [reviewText, setReviewText] = useState('');
  const [reviewsMap, setReviewsMap] = useState({});

  useEffect(() => {
    setPhotos(photoData);

    // Load custom comments from localStorage
    const savedReviews = {};
    photoData.forEach(p => {
      const pReviews = JSON.parse(localStorage.getItem(`gallery_reviews_${p.id}`)) || [];
      savedReviews[p.id] = [...(p.comments || []), ...pReviews];
    });
    setReviewsMap(savedReviews);
  }, []);

  const handleOpenPhoto = (photo) => {
    setSelectedPhoto(photo);
    AudioManager.playCamera();
    
    // Camera shutter flash overlay
    const flash = document.createElement('div');
    flash.className = 'fixed top-0 left-0 w-screen h-screen bg-white z-[100000] pointer-events-none opacity-0 animate-shutter-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim() || !selectedPhoto) return;

    const newReview = {
      user: reviewerName.trim(),
      comment: reviewText.trim()
    };

    const photoId = selectedPhoto.id;
    const userReviews = JSON.parse(localStorage.getItem(`gallery_reviews_${photoId}`)) || [];
    userReviews.push(newReview);
    localStorage.setItem(`gallery_reviews_${photoId}`, JSON.stringify(userReviews));

    setReviewsMap(prev => ({
      ...prev,
      [photoId]: [...(prev[photoId] || []), newReview]
    }));

    setReviewText('');
    AudioManager.playClick();
  };

  // 3D Tilt Handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const rotateX = -((y - box.height / 2) / (box.height / 2)) * 10;
    const rotateY = ((x - box.width / 2) / (box.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const hasGalleryKey = collectedKeys.includes('gallery');

  return (
    <div className="min-h-screen bg-radial from-[#1f100d] to-[#0c0504] px-5 sm:px-10 py-[100px] w-full text-parchment-light">
      
      {/* HUD Header */}
      <div className="flex justify-between items-center max-w-[1200px] mx-auto border-b border-gold/15 pb-4 mb-[50px]">
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

      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-[70px]">
          <h2 className="font-title text-gold-bright text-[2.5rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            GALERI FOTO
          </h2>
          <p className="font-serif text-parchment-dark text-[1.1rem] italic mt-2.5">
            Pameran lukisan digital potret kebersamaan kita
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] px-5 mb-20">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="clickable-exhibit flex flex-col items-center cursor-pointer transition-all duration-300 ease-out origin-center"
            >
              {/* Photo Frame Container */}
              <div className={`p-4 sm:p-5 aspect-[4/3] w-full flex items-center justify-center ${photo.frame === 'wood' ? 'wood-frame' : photo.frame === 'gold' ? 'gold-frame' : 'vintage-frame'}`}>
                <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>
              </div>

              {/* Brass Plaque */}
              <div className="w-[80%] max-w-[260px] bg-gradient-to-b from-[#ffd89b] to-[#b8860b] border border-[#a2781b] rounded-[2px] mt-6 py-2 px-4 text-center text-text-dark relative brass-plaque-shadow brass-plaque-screw">
                <h4 className="font-title text-[0.8rem] font-black tracking-widest text-[#2c1a02]">
                  {photo.title}
                </h4>
                <p className="font-sans text-[0.55rem] text-[#4d3202] uppercase tracking-[1.5px] mt-0.5 font-bold">
                  {photo.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden key */}
        {!hasGalleryKey && (
          <div 
            onClick={(e) => onCollectKey('gallery', e)}
            className="text-center my-10 text-[1.5rem] cursor-pointer opacity-15 hover:opacity-75 transition-opacity duration-300"
          >
            🔑
          </div>
        )}
      </div>

      {/* Lightbox / Inspector Overlay */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed top-0 left-0 w-screen h-screen bg-black/90 flex justify-center items-center z-[10001] p-5 sm:p-10"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[900px] bg-[#1e110e] border border-gold-dark rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative max-h-[90vh]"
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-gold-bright hover:text-white cursor-pointer z-10 text-[1.5rem]"
            >
              &times;
            </button>

            {/* Left side: Photo Frame */}
            <div className="flex-1 bg-black/60 p-6 sm:p-10 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-gold/10 max-h-[45vh] md:max-h-none">
              <div className={`p-4 w-full max-w-[380px] aspect-[4/3] ${selectedPhoto.frame === 'wood' ? 'wood-frame' : selectedPhoto.frame === 'gold' ? 'gold-frame' : 'vintage-frame'}`}>
                <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right side: Plaque & Guestbook */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none">
              
              {/* Exhibit Info */}
              <div>
                <h3 className="font-title text-gold-bright text-[1.4rem] tracking-wider border-b border-gold/15 pb-2 mb-3">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-[0.8rem] text-parchment-dark tracking-wide mb-4 uppercase text-gold font-semibold">
                  TANGGAL: {selectedPhoto.date}
                </p>
                <p className="font-serif text-parchment-medium text-[0.95rem] leading-relaxed italic mb-6">
                  "{selectedPhoto.description}"
                </p>
              </div>

              {/* Guestbook / Comments System */}
              <div className="flex-1 flex flex-col justify-end mt-4">
                <h4 className="font-title text-[0.8rem] text-gold-bright tracking-widest uppercase mb-3">
                  Buku Tamu Eksibit
                </h4>

                {/* Comment list */}
                <div className="max-h-[140px] overflow-y-auto bg-black/30 border border-gold/10 rounded p-3 mb-4 flex flex-col gap-2.5">
                  {(reviewsMap[selectedPhoto.id] || []).length === 0 ? (
                    <div className="text-[0.75rem] text-[#887] italic text-center py-4">Belum ada catatan pengunjung. Tulis kesan pertama kamu!</div>
                  ) : (
                    (reviewsMap[selectedPhoto.id] || []).map((rev, idx) => (
                      <div key={idx} className="border-b border-gold/5 pb-1.5 last:border-b-0">
                        <strong className="text-[0.75rem] text-gold">{rev.user}</strong>
                        <p className="text-[0.8rem] text-parchment-medium mt-0.5 font-serif italic">"{rev.comment}"</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment form */}
                <form onSubmit={handleAddReview} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Nama (Maxal)" 
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="flex-1 bg-black/30 border border-gold/20 p-2 font-sans text-[0.8rem] rounded text-parchment-light focus:outline-none focus:border-gold"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Tulis kesan..." 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="flex-[2] bg-black/30 border border-gold/20 p-2 font-sans text-[0.8rem] rounded text-parchment-light focus:outline-none focus:border-gold"
                    required
                  />
                  <button type="submit" className="bg-gold text-wood-dark font-title text-[0.7rem] px-3.5 rounded hover:bg-gold-bright transition-colors cursor-pointer">
                    KIRIM
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
