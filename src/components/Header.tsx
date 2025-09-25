import { Shield, Menu, Github, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center space-x-2">
          <Shield className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold text-foreground">
            Defen<span className="text-accent">Sys</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm lg:gap-8">
          <a
            href="#features"
            className="transition-smooth hover:text-accent text-muted-foreground"
          >
            Features
          </a>
          <a
            href="#security"
            className="transition-smooth hover:text-accent text-muted-foreground"
          >
            Security
          </a>
          <a
            href="#dashboard"
            className="transition-smooth hover:text-accent text-muted-foreground"
          >
            Dashboard
          </a>
          <a
            href="/pricing"
            className="transition-smooth hover:text-accent text-muted-foreground"
          >
            Pricing
          </a>
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost">
            Sign In
          </Button>
          
          <Button variant="default">
            Get Started
          </Button>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;