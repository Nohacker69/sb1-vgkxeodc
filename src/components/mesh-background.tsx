import { useEffect, useRef } from 'react';

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    const points: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      angle: number;
      speed: number;
      originalX: number;
      originalY: number;
    }[] = [];
    
    const numberOfPoints = 12;
    const maxRadius = 400;
    const minRadius = 200;
    
    for (let i = 0; i < numberOfPoints; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      points.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.002
      });
    }
    
    const createGradient = (x: number, y: number, radius: number, alpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(19, 227, 255, ${alpha * 0.2})`);
      gradient.addColorStop(0.5, `rgba(176, 83, 255, ${alpha * 0.1})`);
      gradient.addColorStop(1, 'rgba(12, 12, 18, 0)');
      return gradient;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      time += 0.005;
      
      points.forEach((point, i) => {
        // Orbital movement
        point.angle += point.speed;
        const orbitRadius = 50;
        
        // Calculate base position with orbital movement
        const orbitX = point.originalX + Math.cos(point.angle) * orbitRadius;
        const orbitY = point.originalY + Math.sin(point.angle) * orbitRadius;
        
        // Add mouse influence
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 400;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.2;
          point.vx -= dx * force * 0.00001;
          point.vy -= dy * force * 0.00001;
        }
        
        // Update velocity with some resistance
        point.vx *= 0.99;
        point.vy *= 0.99;
        
        // Update position
        point.x = orbitX + Math.sin(time + i) * 2;
        point.y = orbitY + Math.cos(time + i * 0.7) * 2;
        
        // Add velocity
        point.x += point.vx;
        point.y += point.vy;
        
        // Boundary check with smooth wrapping
        const padding = point.radius;
        if (point.x < -padding) point.x = canvas.width + padding;
        if (point.x > canvas.width + padding) point.x = -padding;
        if (point.y < -padding) point.y = canvas.height + padding;
        if (point.y > canvas.height + padding) point.y = -padding;
        
        // Calculate alpha based on mouse proximity
        const mouseDistance = Math.sqrt(
          Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
        );
        const alpha = Math.min(
          1,
          Math.max(0.3, 1 - mouseDistance / (canvas.width * 0.7))
        );
        
        // Draw gradient
        ctx.fillStyle = createGradient(point.x, point.y, point.radius, alpha);
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 h-full w-full opacity-50 mix-blend-screen"
    />
  );
}