import React, { useEffect, useState } from 'react';
import GalleryCard from '../GalleryCard';
import GalleryModal from '../GalleryModal';
import NarrativeScreen from '../NarrativeScreen';
import { photoData } from '../../data/photos';
import { AudioManager } from '../../utils/audio';

export default function Gallery({ onNavigate }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [reviewsMap, setReviewsMap] = useState({});
  const [showNarrative, setShowNarrative] = useState(true);

  const galleryStory = [
    "Okeee.",
    "Nah sekarang kita masuk ke ruangan foto.",
    "Jangan diketawain ya kalau ada foto yang mukaku aneh 😭",
    "Soalnya aku sengaja masukin semuanya.",
    "Yang bagus ada.",
    "Yang blur juga ada.",
    "Yang random apalagi wkwkwk.",
    "Karena menurut aku...",
    "Justru foto-foto yang nggak sempurna itu yang paling seru buat diinget."
  ];

  useEffect(() => {
    // Load local reviews
    const saved = {};
    photoData.forEach(p => {
      const pReviews = JSON.parse(localStorage.getItem(`gallery_reviews_${p.id}`)) || [];
      saved[p.id] = [...(p.comments || []), ...pReviews];
    });
    setReviewsMap(saved);
  }, []);

  const handleOpenPhoto = (photo) => {
    setSelectedPhoto(photo);
    AudioManager.playCamera();
    
    // Shutter flash
    const flash = document.createElement('div');
    flash.className = 'fixed top-0 left-0 w-screen h-screen bg-white z-[100000] pointer-events-none opacity-0 animate-shutter-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  };

  const handleAddReview = (photoId, user, comment) => {
    const userReviews = JSON.parse(localStorage.getItem(`gallery_reviews_${photoId}`)) || [];
    const newRev = { user, comment };
    userReviews.push(newRev);
    localStorage.setItem(`gallery_reviews_${photoId}`, JSON.stringify(userReviews));

    setReviewsMap(prev => ({
      ...prev,
      [photoId]: [...(prev[photoId] || []), newRev]
    }));
  };

  if (showNarrative) {
    return (
      <NarrativeScreen 
        story={galleryStory} 
        onComplete={() => setShowNarrative(false)} 
      />
    );
  }

  return (
    <div className="w-full bg-[#1b100d] px-5 sm:px-10 py-[120px] relative text-parchment-light min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Spatial Title */}
        <div className="text-center mb-16">
          <h2 className="font-title text-gold-bright text-[2.5rem] tracking-[4px] text-shadow-[0_4px_8px_rgba(0,0,0,0.6)] uppercase">
            📸 Room 2 — Coffee & Camera
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto my-3" />
          <p className="font-serif text-parchment-dark text-[1.1rem] italic">
            Kumpulan potret seru kebersamaan dan tawa lepas kita
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] px-4">
          {photoData.map(photo => (
            <GalleryCard 
              key={photo.id} 
              photo={photo} 
              onClick={() => handleOpenPhoto(photo)} 
            />
          ))}
        </div>

        {/* Next Room Story Trigger */}
        <div className="flex justify-center mt-20">
          <button 
            onClick={() => {
              AudioManager.playClick();
              onNavigate('timeline');
            }}
            className="font-title text-wood-dark bg-gold border-2 border-gold-bright px-8 py-3.5 rounded cursor-pointer tracking-[3px] text-[0.95rem] hover:bg-gold-bright active:scale-95 transition-all font-black relative z-30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Jalan ke Pemberhentian Berikutnya (Next Stop) &rarr;
          </button>
        </div>

      </div>

      {/* Exhibit Lightbox Modal */}
      {selectedPhoto && (
        <GalleryModal 
          photoData={photoData}
          initialPhotoId={selectedPhoto.id}
          onClose={() => setSelectedPhoto(null)}
          reviewsMap={reviewsMap}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
}
