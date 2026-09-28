import { useEffect, useRef, useState } from 'react';
import birthdayConfig from '../config/birthdayConfig';

function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const audio = audioRef.current;
    audio.volume = 0.4;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }

  function toggle() {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      play();
    }
  }

  useEffect(() => {
    let triggered = false;
    function onFirstGesture() {
      if (triggered) return;
      triggered = true;
      play();
      document.removeEventListener('click', onFirstGesture);
      document.removeEventListener('touchstart', onFirstGesture);
    }
    // Try autoplay immediately on load; browsers that block it fall back
    // to starting on the first click/touch anywhere on the page.
    play();
    document.addEventListener('click', onFirstGesture);
    document.addEventListener('touchstart', onFirstGesture);
    return () => {
      document.removeEventListener('click', onFirstGesture);
      document.removeEventListener('touchstart', onFirstGesture);
    };
  }, []);

  return (
    <>
      <button id="musicToggle" className="music-toggle" aria-label="Toggle music" onClick={toggle}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: playing ? 'block' : 'none' }}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: playing ? 'none' : 'block' }}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <audio ref={audioRef} loop preload="auto">
        <source src={birthdayConfig.song} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default MusicToggle;
