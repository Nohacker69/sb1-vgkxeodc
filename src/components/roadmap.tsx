import { useEffect, useRef } from 'react';

type RoadmapItemProps = {
  name: string;
  date: string;
  description: string;
  isRight?: boolean;
  index: number;
};

function RoadmapItem({ name, date, description, isRight = false, index }: RoadmapItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => observer.disconnect();
  }, [index]);
  
  return (
    <div 
      ref={itemRef}
      className={`roadmap-item mb-8 flex w-full items-center justify-between opacity-0 transition-all duration-700 ${
        isRight 
          ? 'flex-row-reverse translate-x-12'
          : '-translate-x-12'
      }`}
    >
      <div className={`hidden w-5/12 md:block ${isRight ? 'text-right' : ''}`}>
        {!isRight && (
          <div>
            <h3 className="font-display text-xl font-semibold">{name}</h3>
            <time className="text-sm text-muted-foreground">{date}</time>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
      
      <div className="relative flex h-full w-full items-center justify-center md:w-2/12">
        <div className="h-full w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40"></div>
        <div className={`absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg ${
          index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'
        }`}>
          {index + 1}
        </div>
      </div>
      
      <div className={`w-full md:w-5/12 ${!isRight ? 'text-right' : ''}`}>
        {isRight && (
          <div className="md:hidden">
            <h3 className="font-display text-xl font-semibold">{name}</h3>
            <time className="text-sm text-muted-foreground">{date}</time>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        )}
        
        {isRight && (
          <div className="hidden md:block">
            <h3 className="font-display text-xl font-semibold">{name}</h3>
            <time className="text-sm text-muted-foreground">{date}</time>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        )}
        
        {!isRight && (
          <div className="md:hidden">
            <h3 className="font-display text-xl font-semibold">{name}</h3>
            <time className="text-sm text-muted-foreground">{date}</time>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Roadmap() {
  const roadmapItems = [
    {
      name: "Ember",
      date: "Q3 2025",
      description: "Initial testnet launch with ECL-S and basic ZK-Step-S proof validation for small models."
    },
    {
      name: "Sprite",
      date: "Q1 2026",
      description: "Mainnet beta with FlowStreams micropayments and first restaked-GPU marketplace."
    },
    {
      name: "Sealevel",
      date: "Q3 2026",
      description: "Full Solana program integration with optimized on-chain proof verification."
    },
    {
      name: "Surf",
      date: "2027",
      description: "Complete decentralization with Usage-Weighted DAO governance and protocol ownership."
    }
  ];
  
  return (
    <section id="roadmap" className="py-24">
      <div className="container-wide">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="heading-lg mb-4">Roadmap</h2>
          <p className="body-lg text-muted-foreground">
            Our path to building the first fully verifiable AI fabric on Solana.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {roadmapItems.map((item, index) => (
              <RoadmapItem
                key={item.name}
                name={item.name}
                date={item.date}
                description={item.description}
                isRight={index % 2 === 1}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}