import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Cpu, Shield, Wallet } from 'lucide-react';

export function Launch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    
    const particleCount = 30;
    const connectionDistance = 150;
    const baseSpeed = 0.2;
    
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
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.15;
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
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, 'rgba(19, 227, 255, 0.2)');
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
    <div className="relative min-h-screen bg-[#0C0C12] text-neutral-100">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full opacity-20"
      />
      <Navbar />
      <main className="relative z-10 container-wide pt-24 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="heading-lg !text-3xl sm:!text-4xl md:!text-5xl mb-4">
              <span className="text-foreground">Launch </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Testnet</span>
            </h1>
            <p className="body-lg text-muted-foreground text-base sm:text-lg">
              Experience the future of AI inference with cryptographic guarantees
            </p>
          </div>
          
          <Tabs defaultValue="connect" className="space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2">
              <TabsTrigger value="connect" className="flex flex-col items-center space-y-2 p-3">
                <Wallet className="h-5 w-5" />
                <span>Connect</span>
              </TabsTrigger>
              <TabsTrigger value="model" className="flex flex-col items-center space-y-2 p-3">
                <Brain className="h-5 w-5" />
                <span>Model</span>
              </TabsTrigger>
              <TabsTrigger value="compute" className="flex flex-col items-center space-y-2 p-3">
                <Cpu className="h-5 w-5" />
                <span>Compute</span>
              </TabsTrigger>
              <TabsTrigger value="verify" className="flex flex-col items-center space-y-2 p-3">
                <Shield className="h-5 w-5" />
                <span>Verify</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4">Connect Wallet</h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Connect your Solana wallet to get started with ContextMesh testnet.
                </p>
                <Button size="lg" className="w-full bg-primary text-primary-foreground">
                  Connect Wallet
                </Button>
              </Card>
            </TabsContent>
            
            <TabsContent value="model">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4">Select Model</h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Choose from our curated list of AI models or bring your own.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Brain className="mr-2 h-5 w-5" />
                    Llama 3 8B (Instruct)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Brain className="mr-2 h-5 w-5" />
                    Mistral 7B
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Brain className="mr-2 h-5 w-5" />
                    Custom Model
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="compute">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4">Select Compute</h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Choose your preferred compute provider from the marketplace.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Cpu className="mr-2 h-5 w-5" />
                    High Performance (A100)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Cpu className="mr-2 h-5 w-5" />
                    Balanced (RTX 4090)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Cpu className="mr-2 h-5 w-5" />
                    Economic (RTX 3090)
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="verify">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4">Verification Settings</h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Configure your zero-knowledge proof requirements.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Shield className="mr-2 h-5 w-5" />
                    Standard Verification
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Shield className="mr-2 h-5 w-5" />
                    Enhanced Privacy
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start text-sm sm:text-base">
                    <Shield className="mr-2 h-5 w-5" />
                    Custom Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}