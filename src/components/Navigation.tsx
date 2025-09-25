import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import aplexorLogo from "@/assets/aplexor-logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/services/discovery", label: "Discovery Services" },
    { href: "/services/strategic", label: "Strategic Services" },
    { href: "/services/execution", label: "Execution Services" },
    { href: "/services/supporting", label: "Supporting Services" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={aplexorLogo} 
              alt="Aplexor" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`font-body text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                location.pathname.startsWith("/services") ? "text-primary" : "text-foreground"
              }`}>
                Services
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    All Services
                  </Link>
                </DropdownMenuItem>
                {serviceLinks.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link to={service.href} className="w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                      {service.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="default" className="ml-4">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Services Links */}
              <div className="space-y-2 pl-4">
                <Link
                  to="/services"
                  className={`font-body text-sm font-medium transition-colors hover:text-primary block ${
                    isActive("/services") ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Services
                </Link>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className={`font-body text-xs text-muted-foreground transition-colors hover:text-primary block ${
                      isActive(service.href) ? "text-primary" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
              
              <Button asChild variant="default" className="w-fit">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;