import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Ticket from './components/Ticket';
import Entrance from './components/Entrance';
import MuseumDoor from './components/MuseumDoor';
import Home from './pages/Home';
// import SecretRoom from './components/SecretRoom';
import Cursor from './components/Cursor';
import { AudioManager } from './utils/audio';

import './styles/globals.css'; // New styles architecture path

export default function App() {
  const [scene, setScene] = useState('loading'); // loading, ticket, entrance, door, home
  
  // Easter Egg states
  const [collectedKeys, setCollectedKeys] = useState([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState('');
  
  // Passport overlay trigger
  const [showPassport, setShowPassport] = useState(false);

  // Restore states on mount
  useEffect(() => {
    const savedScene = sessionStorage.getItem('museum_scene');
    const enteredTicket = sessionStorage.getItem('has_entered_ticket') === 'true';
    const enteredMuseum = sessionStorage.getItem('has_entered_museum') === 'true';
    let keys = [];
    try {
      const stored = localStorage.getItem('secret_keys');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          keys = parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    setCollectedKeys(keys);

    if (savedScene) {
      setScene(savedScene);
    } else if (enteredMuseum) {
      setScene('home');
    } else if (enteredTicket) {
      setScene('entrance');
    }

    // Sound context check
    if (enteredTicket) {
      AudioManager.init();
      if (sessionStorage.getItem('bgm_playing') === 'true') {
        AudioManager.playBGM();
      }
    }
  }, []);

  // Keyboard Easter egg listener for "SABRINA"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toUpperCase();
      if (!/^[A-Z]$/.test(char)) return;

      setTypedBuffer(prev => {
        const nextBuffer = (prev + char).slice(-7);
        if (nextBuffer === 'SABRINA') {
          AudioManager.playCamera();
          setSecretUnlocked(true);
          return '';
        }
        return nextBuffer;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCollectKey = (roomKey, e) => {
    e.stopPropagation();
    if (collectedKeys.includes(roomKey)) return;

    const newKeys = [...collectedKeys, roomKey];
    setCollectedKeys(newKeys);
    localStorage.setItem('secret_keys', JSON.stringify(newKeys));
    
    AudioManager.playStamp();

    if (newKeys.length >= 3) {
      setTimeout(() => {
        alert("Semua kunci ditemukan! Pintu rahasia rasi bintang terbuka! ✨");
        setSecretUnlocked(true);
      }, 500);
    } else {
      alert(`Kamu menemukan kunci rahasia di ${roomKey === 'lobby' ? 'Lobby' : roomKey === 'gallery' ? 'Galeri' : 'Buku Kenangan'}! Cari ${3 - newKeys.length} kunci lagi...`);
    }
  };

  const handleTransition = (nextScene) => {
    setScene(nextScene);
    sessionStorage.setItem('museum_scene', nextScene);
  };

  const handleExit = () => {
    if (confirm("Apakah kamu yakin ingin keluar dari museum?")) {
      AudioManager.playClick();
      AudioManager.pauseBGM();
      sessionStorage.clear();
      handleTransition('loading');
    }
  };

  const renderActiveScene = () => {
    switch (scene) {
      case 'ticket':
        return (
          <Ticket 
            onEnter={() => {
              sessionStorage.setItem('has_entered_ticket', 'true');
              handleTransition('entrance');
            }} 
          />
        );
      case 'entrance':
        return (
          <Entrance 
            onEnter={() => {
              handleTransition('door');
            }} 
          />
        );
      case 'door':
        return (
          <MuseumDoor 
            onComplete={() => {
              sessionStorage.setItem('has_entered_museum', 'true');
              handleTransition('home');
            }} 
          />
        );
      case 'home':
        return (
          <Home 
            collectedKeys={collectedKeys}
            onCollectKey={handleCollectKey}
            onExit={handleExit}
            showPassport={showPassport}
            setShowPassport={setShowPassport}
          />
        );
      case 'loading':
      default:
        return (
          <Loading 
            onComplete={() => {
              handleTransition('ticket');
            }} 
          />
        );
    }
  };

  return (
    <>
      {/* Custom golden cursor particles */}
      <Cursor />

      {/* Main mount scenes */}
      {renderActiveScene()}

      {/* Celestial Constellation Red Room Overlay */}
      {/* {secretUnlocked && (
        <SecretRoom onClose={() => setSecretUnlocked(false)} />
      )} */}
    </>
  );
}
