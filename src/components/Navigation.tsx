import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import aplexorLogo from "@/assets/aplexor-logo-latest.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/portal", label: "Portal" },
  ];

  const serviceLinks = [
    { href: "/services/discovery", label: "Discovery" },
    { href: "/services/strategy", label: "Strategy" },
    { href: "/services/execution", label: "Execution" },
    { href: "/services/supporting", label: "Support" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <img 
              src={aplexorLogo} 
              alt="Aplexor" 
              className="h-4 md:h-6 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-body text-sm font-medium transition-all duration-200 px-4 py-2.5 rounded-md ${
                isActive("/") 
                  ? "bg-nav-selected text-foreground font-semibold" 
                  : "text-foreground hover:bg-nav-hover hover:text-foreground"
              }`}
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <Link 
                to="/services"
                className={`font-body text-sm font-medium transition-all duration-200 px-4 py-2.5 rounded-md flex items-center gap-1 ${
                  location.pathname.startsWith("/services") 
                    ? "bg-nav-selected text-foreground font-semibold" 
                    : "text-foreground hover:bg-nav-hover hover:text-foreground group-hover:bg-nav-hover"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </Link>
              <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {serviceLinks.map((service) => (
                  <Link 
                    key={service.href} 
                    to={service.href} 
                    className={`block px-4 py-3 text-sm transition-all duration-200 ${
                      isActive(service.href) 
                        ? "bg-nav-selected text-foreground font-semibold" 
                        : "text-foreground hover:bg-nav-hover hover:text-foreground"
                    }`}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm font-medium transition-all duration-200 px-4 py-2.5 rounded-md ${
                  isActive(link.href) 
                    ? "bg-nav-selected text-foreground font-semibold" 
                    : "text-foreground hover:bg-nav-hover hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`font-body text-base font-medium transition-all duration-200 px-4 py-3 rounded-md ${
                  isActive("/") 
                    ? "bg-nav-selected text-foreground font-semibold" 
                    : "text-foreground hover:bg-nav-hover hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-3">
                <div className="w-full flex items-center justify-between">
                  <Link
                    to="/services"
                    className={`font-body text-base font-medium transition-all duration-200 px-4 py-3 rounded-md flex-1 ${
                      location.pathname.startsWith("/services") 
                        ? "bg-nav-selected text-foreground font-semibold" 
                        : "text-foreground hover:bg-nav-hover hover:text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="p-2"
                    aria-label="Toggle services menu"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isServicesOpen && (
                  <div className="ml-4 space-y-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className={`block font-body text-base transition-all duration-200 px-4 py-3 ${
                          isActive(service.href) 
                            ? "bg-nav-selected text-foreground font-semibold" 
                            : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-base font-medium transition-all duration-200 px-4 py-3 rounded-md ${
                    isActive(link.href) 
                      ? "bg-nav-selected text-foreground font-semibold" 
                      : "text-foreground hover:bg-nav-hover hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
