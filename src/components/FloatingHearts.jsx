import { useEffect, useRef, useState } from 'react';

let heartId = 0;

function FloatingHearts({ active }) {
  const [hearts, setHearts] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        heartId += 1;
        setHearts((prev) => [
          ...prev,
          {
            id: heartId,
            left: Math.random() * 100 + '%',
            fontSize: 14 + Math.random() * 18 + 'px',
            duration: 6 + Math.random() * 6 + 's',
          },
        ]);
      }, 400);
    }
    return () => clearInterval(intervalRef.current);
  }, [active]);

  function removeHeart(id) {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <div id="heartsContainer">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-heart"
          style={{ left: h.left, fontSize: h.fontSize, animationDuration: h.duration }}
          onAnimationEnd={() => removeHeart(h.id)}
        >
          &#9829;
        </div>
      ))}
    </div>
  );
}

export default FloatingHearts;
