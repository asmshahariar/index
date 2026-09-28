import { useEffect, useRef } from 'react';
import birthdayConfig from '../config/birthdayConfig';

const FONT_SIZE = 16;

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let columns = 0;
    let drops = [];
    let rafId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / FONT_SIZE);
      drops = Array(columns).fill(1);
    }
    resize();

    function draw() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'Orbitron', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const word = birthdayConfig.matrixWords[Math.floor(Math.random() * birthdayConfig.matrixWords.length)];
        const char = word[Math.floor(Math.random() * word.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        ctx.fillStyle = `rgba(255, 45, 149, ${0.15 + Math.random() * 0.15})`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rafId = requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="matrixCanvas" ref={canvasRef} />;
}

export default MatrixBackground;
