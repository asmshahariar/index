import { useEffect, useState } from 'react';
import birthdayConfig from '../config/birthdayConfig';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function CounterScreen({ onDone }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('in');
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      for (const word of birthdayConfig.counterWords) {
        if (cancelled) return;
        setText(word);
        setPhase('in');
        setAnimKey((k) => k + 1);
        await sleep(1500);
        if (cancelled) return;
        setPhase('out');
        await sleep(500);
      }
      if (!cancelled) onDone();
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <div id="counterScreen" className="screen active">
      <div
        key={animKey}
        id="counterNumber"
        className="counter-number"
        style={{ animation: phase === 'in' ? 'zoomIn 0.5s ease-out' : 'zoomOut 0.5s ease-in forwards' }}
      >
        {text}
      </div>
    </div>
  );
}

export default CounterScreen;
