
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
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

    const createStars = () => {
      const stars: Star[] = [];
      const starCount = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 3000),
        200
      );

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 1000 + 100,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.4 + 0.2,
        });
      }

      starsRef.current = stars;
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      starsRef.current.forEach((star) => {
        // Move the star closer (reduce z)
        star.z -= star.speed;
        
        // Reset stars that reach too close to the viewer
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = 1000;
          star.size = Math.random() * 1.5 + 0.5;
          star.opacity = Math.random() * 0.7 + 0.3;
          star.speed = Math.random() * 0.4 + 0.2;
        }
        
        // Calculate 3D projection
        const factor = 400 / star.z;
        const x = (star.x - centerX) * factor + centerX;
        const y = (star.y - centerY) * factor + centerY;
        const size = star.size * (400 / star.z) * 2;
        
        // Draw star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * (1 - star.z/1000)})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      frameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
    });

    resizeCanvas();
    createStars();
    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default StarBackground;
