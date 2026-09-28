import { useCallback, useEffect, useRef, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import ParticleBackground from './components/ParticleBackground';
import FloatingHearts from './components/FloatingHearts';
import MusicToggle from './components/MusicToggle';
import LockScreen from './components/LockScreen';
import CounterScreen from './components/CounterScreen';
import TypingScreen from './components/TypingScreen';
import SliderScreen from './components/SliderScreen';
import GifScreen from './components/GifScreen';
import birthdayConfig from './config/birthdayConfig';

const SLIDER_DURATION = 12000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isUnlocked() {
  return Date.now() >= new Date(birthdayConfig.unlockDate).getTime();
}

function App() {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [screen, setScreen] = useState('counter');
  const [heartsActive, setHeartsActive] = useState(false);
  const startedSlider = useRef(false);

  useEffect(() => {
    if (unlocked) return;
    const id = setInterval(() => {
      if (isUnlocked()) {
        setUnlocked(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [unlocked]);

  useEffect(() => {
    if (screen === 'slider' && !startedSlider.current) {
      startedSlider.current = true;
      setHeartsActive(true);
      (async () => {
        await sleep(SLIDER_DURATION);
        setHeartsActive(false);
        setScreen('gif');
        setHeartsActive(true);
      })();
    }
  }, [screen]);

  const handleCounterDone = useCallback(() => setScreen('typing'), []);
  const handleTypingDone = useCallback(() => setScreen('slider'), []);

  if (!unlocked) {
    return (
      <>
        <MatrixBackground />
        <ParticleBackground />
        <LockScreen />
      </>
    );
  }

  return (
    <>
      <MatrixBackground />
      <ParticleBackground />

      {screen === 'counter' && <CounterScreen onDone={handleCounterDone} />}
      {screen === 'typing' && <TypingScreen onDone={handleTypingDone} />}
      {screen === 'slider' && <SliderScreen />}
      {screen === 'gif' && <GifScreen />}

      <FloatingHearts active={heartsActive} />
      <MusicToggle />
    </>
  );
}

export default App;
