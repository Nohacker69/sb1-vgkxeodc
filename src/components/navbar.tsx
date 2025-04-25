import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md py-3 shadow-lg" : "py-5 bg-transparent"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl font-bold tracking-tight md:text-2xl">
              <span className="text-foreground">Context</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mesh</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex gap-6">
              <li><a href="#features" className="text-sm hover:text-primary transition-colors">Features</a></li>
              <li><a href="#architecture" className="text-sm hover:text-primary transition-colors">Architecture</a></li>
              <li><a href="#mcp" className="text-sm hover:text-primary transition-colors">MCP</a></li>
              <li><a href="#roadmap" className="text-sm hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Docs</a></li>
            </ul>
            <Link to="/launch">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Launch App
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[60px] z-40 bg-background/95 backdrop-blur-md shadow-lg transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container py-6">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="flex items-center text-sm hover:text-primary transition-colors py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#architecture" 
              className="flex items-center text-sm hover:text-primary transition-colors py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Architecture
            </a>
            <a 
              href="#mcp" 
              className="flex items-center text-sm hover:text-primary transition-colors py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              MCP
            </a>
            <a 
              href="#roadmap" 
              className="flex items-center text-sm hover:text-primary transition-colors py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmap
            </a>
            <a 
              href="#" 
              className="flex items-center text-sm hover:text-primary transition-colors py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </a>
            <div className="pt-2">
              <Link to="/launch" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Launch App
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}