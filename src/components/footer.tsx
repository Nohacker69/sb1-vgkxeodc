import { GithubIcon, TwitterIcon, Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-border/40 py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5"></div>
      <div className="container-wide">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ContextMesh Labs. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex justify-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Docs</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">GitHub</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Brand Kit</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</a>
            </div>
            
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Twitter"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 9V5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v4" />
                  <polyline points="13 15 16 17 22 17" />
                  <path d="M14 19l-2-1-2 1V9h4v10Z" />
                  <path d="M22 15v-3a2 2 0 0 0-2-2h-4" />
                  <path d="M18 22l-4-2-4 2" />
                  <path d="M18 15v7" />
                  <path d="M22 17v3a2 2 0 0 1-2 2h-4" />
                  <path d="M10 15H4a2 2 0 0 1-2-2v-2a3 3 0 0 1 3-3h3" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}