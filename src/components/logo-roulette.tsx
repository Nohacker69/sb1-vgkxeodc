import { useEffect, useRef } from 'react';
import { Brain, Bot, Sparkles, MessageSquare, Share2, BrainCircuit } from 'lucide-react';

export function LogoRoulette() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  const logos = [
    {
      name: "OpenAI",
      icon: Brain,
      gradient: "from-[#10a37f] to-[#0a856b]"
    },
    {
      name: "Anthropic",
      icon: Sparkles,
      gradient: "from-[#6b48ff] to-[#8f75ff]"
    },
    {
      name: "Google AI",
      icon: BrainCircuit,
      gradient: "from-[#4285f4] to-[#34a853]"
    },
    {
      name: "Meta AI",
      icon: Bot,
      gradient: "from-[#0081fb] to-[#0064c2]"
    },
    {
      name: "Telegram",
      icon: MessageSquare,
      gradient: "from-[#29b6f6] to-[#0288d1]"
    },
    {
      name: "X",
      icon: Share2,
      gradient: "from-neutral-200 to-neutral-400"
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 border-y border-border/20">
      <div 
        ref={containerRef}
        className="flex gap-16 items-center whitespace-nowrap overflow-x-hidden"
        style={{ width: '200%' }}
      >
        {[...logos, ...logos].map((logo, index) => {
          const Icon = logo.icon;
          return (
            <div
              key={`${logo.name}-${index}`}
              className="flex flex-col items-center justify-center min-w-[120px] gap-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${logo.gradient} bg-opacity-10`}>
                <Icon className="w-8 h-8 text-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{logo.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}