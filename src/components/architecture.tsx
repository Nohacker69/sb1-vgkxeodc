import { useEffect, useRef } from 'react';

export function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nodeElements = entry.target.querySelectorAll('.architecture-node');
          const connectionElements = entry.target.querySelectorAll('.architecture-connection');
          
          nodeElements.forEach((node, index) => {
            setTimeout(() => {
              node.classList.add('animate-in');
            }, index * 200);
          });
          
          connectionElements.forEach((connection, index) => {
            setTimeout(() => {
              connection.classList.add('animate-in');
            }, 100 + index * 200);
          });
          
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="architecture" className="py-24 overflow-hidden">
      <div className="container-wide">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="heading-lg mb-4">Architecture</h2>
          <p className="body-lg text-muted-foreground">
            The ContextMesh-S architecture enables verifiable AI inference with 
            sub-second latency and cryptographic guarantees.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative mx-auto max-w-5xl py-10"
        >
          {/* Diagram */}
          <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-6">
            {/* Node 1: Agent */}
            <div className="architecture-node opacity-0 translate-y-4 transition-all duration-500 md:translate-y-0 md:translate-x-4">
              <div className="relative flex h-32 w-64 flex-col items-center justify-center rounded-lg border border-border bg-card p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Step 1
                </div>
                <div className="mb-2 text-lg font-display font-semibold">Agent</div>
                <div className="text-center text-sm text-muted-foreground">
                  Sends inference request with MCP manifest
                </div>
              </div>
            </div>
            
            {/* Connection 1-2 */}
            <div className="architecture-connection hidden md:block absolute left-[15%] top-1/2 h-0.5 w-[15%] -translate-y-1/2 bg-gradient-to-r from-primary to-primary/50 opacity-0 transition-all duration-500">
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-primary"></div>
            </div>
            
            {/* Node 2: MCP Frames */}
            <div className="architecture-node opacity-0 translate-y-4 transition-all duration-500 md:translate-y-0 md:translate-x-4">
              <div className="relative flex h-32 w-64 flex-col items-center justify-center rounded-lg border border-border bg-card p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/80 px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Step 2
                </div>
                <div className="mb-2 text-lg font-display font-semibold">MCP Frames</div>
                <div className="text-center text-sm text-muted-foreground">
                  Standardizes context and inference parameters
                </div>
              </div>
            </div>
            
            {/* Connection 2-3 */}
            <div className="architecture-connection hidden md:block absolute left-[38%] top-1/2 h-0.5 w-[15%] -translate-y-1/2 bg-gradient-to-r from-primary/50 to-secondary/80 opacity-0 transition-all duration-500">
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-secondary"></div>
            </div>
            
            {/* Node 3: ECL-S */}
            <div className="architecture-node opacity-0 translate-y-4 transition-all duration-500 md:translate-y-0 md:translate-x-4">
              <div className="relative flex h-32 w-64 flex-col items-center justify-center rounded-lg border border-border bg-card p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary/80 px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Step 3
                </div>
                <div className="mb-2 text-lg font-display font-semibold">ECL-S</div>
                <div className="text-center text-sm text-muted-foreground">
                  Ephemeral context layer with fast access
                </div>
              </div>
            </div>
            
            {/* Connection 3-4 */}
            <div className="architecture-connection hidden md:block absolute left-[62%] top-1/2 h-0.5 w-[15%] -translate-y-1/2 bg-gradient-to-r from-secondary/80 to-secondary opacity-0 transition-all duration-500">
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-secondary"></div>
            </div>
            
            {/* Node 4: ZK-Step-S */}
            <div className="architecture-node opacity-0 translate-y-4 transition-all duration-500 md:translate-y-0 md:translate-x-4">
              <div className="relative flex h-32 w-64 flex-col items-center justify-center rounded-lg border border-border bg-card p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Step 4
                </div>
                <div className="mb-2 text-lg font-display font-semibold">ZK-Step-S</div>
                <div className="text-center text-sm text-muted-foreground">
                  Zero-knowledge proof generation and validation
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Node: Solana Programs */}
          <div className="architecture-node mx-auto mt-16 opacity-0 translate-y-4 transition-all duration-500 md:translate-y-0 md:translate-x-0">
            <div className="relative flex h-32 w-64 flex-col items-center justify-center rounded-lg border border-border bg-card p-4 shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-primary-foreground">
                Step 5
              </div>
              <div className="mb-2 text-lg font-display font-semibold">Solana Programs</div>
              <div className="text-center text-sm text-muted-foreground">
                On-chain verification and payment settlement
              </div>
            </div>
          </div>
          
          {/* Connecting Lines to Bottom Node */}
          <div className="architecture-connection hidden md:block absolute bottom-[45%] left-1/2 h-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-secondary to-accent opacity-0 transition-all duration-500">
            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}