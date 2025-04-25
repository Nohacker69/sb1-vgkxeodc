import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero3D } from './hero-3d';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    
    const particleCount = 50;
    const connectionDistance = 150;
    const baseSpeed = 0.3;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * baseSpeed,
        vy: (Math.random() - 0.5) * baseSpeed,
        size: Math.random() * 2 + 1,
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw connections
        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.2;
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            
            gradient.addColorStop(0, `rgba(19, 227, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(176, 83, 255, ${alpha})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
        
        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, 'rgba(19, 227, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(19, 227, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      <div className="container-wide relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <h1 className="heading-xl !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl">
                <span className="text-foreground">Proof-Powered AI on </span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Solana-Speed</span>
                <span className="text-foreground">.</span>
              </h1>
              <p className="body-lg text-muted-foreground max-w-[600px] text-base sm:text-lg">
                A decentralized fabric for AI inference with zero-knowledge guarantees,
                powered by the Model Context Protocol.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/launch" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Launch Testnet <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary">
                  <FileText className="mr-2 h-5 w-5" /> Read Docs
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block h-[500px]">
            <Hero3D />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 hidden sm:block">
        <div className="flex justify-center">
          <a
            href="#features"
            aria-label="Scroll to features"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}