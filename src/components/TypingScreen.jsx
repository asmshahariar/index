import { useEffect, useState } from 'react';
import birthdayConfig from '../config/birthdayConfig';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TypingScreen({ onDone }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('in');
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      for (const word of birthdayConfig.typingWords) {
        if (cancelled) return;
        setText(word);
        setPhase('in');
        setAnimKey((k) => k + 1);
        await sleep(2000);
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
    <div id="typingScreen" className="screen active">
      <div
        key={animKey}
        id="typingText"
        className="typing-text"
        style={{ animation: phase === 'in' ? 'zoomIn 0.5s ease-out' : 'zoomOut 0.5s ease-in forwards' }}
      >
        {text}
      </div>
      <span id="typingCursor" className="typing-cursor" style={{ display: 'none' }}>
        |
      </span>
    </div>
  );
}

export default TypingScreen;
