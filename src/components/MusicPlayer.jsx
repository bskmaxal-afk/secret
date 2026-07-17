import React, { useRef, useState, useEffect } from 'react';

export default function MusicPlayer({ playlistUrl }) {
  const [spotifyUrl, setSpotifyUrl] = useState(playlistUrl || '');
  const [inputUrl, setInputUrl] = useState('');
  const [showEmbed, setShowEmbed] = useState(!!playlistUrl);

  // Convert Spotify URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    // Already an embed URL
    if (url.includes('/embed/')) return url;
    // Convert open.spotify.com/playlist/xxx to embed
    const match = url.match(/open\.spotify\.com\/(playlist|album|track)\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
    return url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setSpotifyUrl(inputUrl.trim());
      setShowEmbed(true);
      localStorage.setItem('museum_spotify_url', inputUrl.trim());
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('museum_spotify_url');
    if (saved) {
      setSpotifyUrl(saved);
      setShowEmbed(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      {showEmbed && spotifyUrl ? (
        <div className="w-full">
          <iframe
            src={getEmbedUrl(spotifyUrl)}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
            style={{ borderRadius: '12px' }}
          />
          <button
            onClick={() => {
              setShowEmbed(false);
              setSpotifyUrl('');
              localStorage.removeItem('museum_spotify_url');
            }}
            className="mt-2 text-parchment-dark/50 hover:text-gold-bright text-[0.7rem] font-title tracking-wider cursor-pointer transition-colors"
          >
            GANTI PLAYLIST
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="text-parchment-dark/70 text-[0.75rem] font-serif">
            Paste link Spotify playlist kamu di sini:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://open.spotify.com/playlist/..."
              className="flex-1 bg-wood-dark/60 border border-gold/30 rounded px-3 py-2 text-parchment-light text-[0.8rem] font-serif placeholder:text-parchment-dark/30 focus:outline-none focus:border-gold-bright transition-colors"
            />
            <button
              type="submit"
              className="bg-gold text-wood-dark font-title text-[0.75rem] tracking-wider px-4 py-2 rounded hover:bg-gold-bright transition-colors cursor-pointer font-bold"
            >
              PLAY
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
