import { useState } from 'react';
import { 
  Layers, 
  Shield, 
  Cpu, 
  DollarSign, 
  Users, 
  Globe 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative rounded-xl border border-border p-6 transition-all duration-300",
        isHovered && "translate-y-[-8px] shadow-xl shadow-primary/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
      </div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
          {icon}
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function Features() {
  const features = [
    {
      title: "Ephemeral Context Layer",
      description: "Temporary storage for model contexts with zero-trust verification and 100x faster access.",
      icon: <Layers size={24} />
    },
    {
      title: "ZK-Step-S Proofs",
      description: "Zero-knowledge validation of model execution steps with Solana-optimized verification circuits.",
      icon: <Shield size={24} />
    },
    {
      title: "Restaked-GPU Market",
      description: "Dynamic marketplace for GPU compute power with protocol-native restaking incentives.",
      icon: <Cpu size={24} />
    },
    {
      title: "FlowStreams Micropayments",
      description: "Real-time token streaming for inference with sub-second settlement and minimal overhead.",
      icon: <DollarSign size={24} />
    },
    {
      title: "Usage-Weighted DAO",
      description: "Governance weighted by actual protocol usage, not token holdings, for aligned incentives.",
      icon: <Users size={24} />
    },
    {
      title: "MCP-Native Everywhere",
      description: "Complete compatibility with the Model Context Protocol for seamless integration.",
      icon: <Globe size={24} />
    }
  ];
  
  return (
    <section id="features" className="py-24">
      <div className="container-wide">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="heading-lg mb-4">Core Capabilities</h2>
          <p className="body-lg text-muted-foreground">
            ContextMesh-S combines Solana's speed with zero-knowledge technology to 
            create a trustless AI inference network.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}