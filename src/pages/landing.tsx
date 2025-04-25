import { MeshBackground } from '@/components/mesh-background';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LogoRoulette } from '@/components/logo-roulette';
import { Features } from '@/components/features';
import { Architecture } from '@/components/architecture';
import { McpSpotlight } from '@/components/mcp-spotlight';
import { Roadmap } from '@/components/roadmap';
import { Footer } from '@/components/footer';

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0C0C12] text-neutral-100 selection:bg-primary/30">
      <MeshBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <LogoRoulette />
          <Features />
          <Architecture />
          <McpSpotlight />
          <Roadmap />
        </main>
        <Footer />
      </div>
    </div>
  );
}