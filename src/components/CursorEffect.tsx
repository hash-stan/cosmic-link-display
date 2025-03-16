
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

const CursorEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticles = (x: number, y: number, speed: number) => {
      const movementX = x - lastMousePos.current.x;
      const movementY = y - lastMousePos.current.y;
      const distance = Math.sqrt(movementX * movementX + movementY * movementY);
      
      // Only create particles if there's significant mouse movement
      if (distance < 5) return;
      
      // Create particles based on mouse speed
      const count = Math.min(Math.floor(distance / 2), 5);
      
      const colors = ['#5086ed', '#87a4e6', '#a8c3ff'];
      
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x,
          y,
          size: Math.random() * 6 + 2,
          speedX: (Math.random() - 0.5) * 2 + movementX * 0.1,
          speedY: (Math.random() - 0.5) * 2 + movementY * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.5,
          decay: 0.01 + Math.random() * 0.02,
        });
      }
      
      lastMousePos.current = { x, y };
    };

    const updateAndDrawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Update
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;
        
        // Remove dead particles
        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }
        
        // Draw
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Limit particle count to prevent performance issues
      if (particles.current.length > 100) {
        particles.current = particles.current.slice(-100);
      }
    };

    const animate = () => {
      updateAndDrawParticles();
      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      createParticles(e.clientX, e.clientY, Math.hypot(e.movementX, e.movementY));
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default CursorEffect;
