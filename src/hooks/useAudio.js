import { useEffect, useState } from 'react';
import { AudioManager } from '../utils/audio'; // We can keep audio manager inside src/utils/audio.js!

export default function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(AudioManager.isPlaying());

    const handleStateChange = (e) => {
      setIsPlaying(e.detail.playing);
    };

    document.addEventListener('bgm-state-change', handleStateChange);
    return () => {
      document.removeEventListener('bgm-state-change', handleStateChange);
    };
  }, []);

  return {
    isPlaying,
    playBGM: () => AudioManager.playBGM(),
    pauseBGM: () => AudioManager.pauseBGM(),
    toggleBGM: () => AudioManager.toggleBGM(),
    playClick: () => AudioManager.playClick(),
    playStamp: () => AudioManager.playStamp(),
    playCamera: () => AudioManager.playCamera(),
    startProjectorHum: () => AudioManager.startProjectorHum(),
    stopProjectorHum: () => AudioManager.stopProjectorHum(),
    playDoorCreak: () => AudioManager.playDoorCreak()
  };
}
