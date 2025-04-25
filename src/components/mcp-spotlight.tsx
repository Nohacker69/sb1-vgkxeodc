import { useState } from 'react';

export function McpSpotlight() {
  const [isHovered, setIsHovered] = useState(false);
  
  const codeExample = `{
  "protocol_version": "mcp-v0.1",
  "model": {
    "id": "bittensor/llama3-8b-instruct",
    "version": "v1.0.0"
  },
  "context": {
    "system": "You are an AI assistant focused on Solana tech.",
    "messages": [
      {"role": "user", "content": "How do Solana programs integrate with AI models?"}
    ]
  },
  "constraints": {
    "max_tokens": 1024,
    "temperature": 0.7,
    "top_p": 0.95
  },
  "security": {
    "verification": "zk-step-s-v1",
    "required_proofs": ["exec_integrity", "input_privacy"]
  },
  "meta": {
    "created_at": 1718831590,
    "caller": "5yLtvp8Sj2fdCH35vXH33A5fdHTeKyVxmfdfzcnY8VF5"
  }
}`;
  
  return (
    <section id="mcp" className="py-24">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="heading-lg mb-6">
              Built Around MCP
              <span className="block text-xl text-muted-foreground">('The HTTP of AI')</span>
            </h2>
            <div className="space-y-4">
              <p className="body-md">
                The Model Context Protocol (MCP) standardizes how AI agents request inference, 
                making models, contexts, and constraints portable across providers.
              </p>
              <p className="body-md">
                ContextMesh-S extends MCP with Solana-native verification, enabling 
                trustless AI inference with cryptographic guarantees of execution. Every 
                request is validated through zero-knowledge proofs, ensuring both accuracy 
                and privacy without compromising on performance.
              </p>
              <p className="body-md">
                Develop once using the standard MCP interface, and your AI application 
                automatically gains access to verifiable inference across the entire mesh.
              </p>
            </div>
          </div>
          
          <div 
            className={`relative rounded-xl border border-border p-1 transition-all duration-300 ${
              isHovered ? 'shadow-xl shadow-primary/20' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative rounded-lg bg-muted p-4">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-destructive"></div>
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-muted-foreground">MCP Manifest Example</span>
              </div>
              <pre className="overflow-x-auto rounded bg-card p-4 text-sm">
                <code className="text-foreground">
                  {codeExample}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}