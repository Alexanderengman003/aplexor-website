import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-xl text-foreground mb-4">
              Aplexor
            </h3>
            <p className="font-body text-muted-foreground mb-4 max-w-md">
              Your trusted Nordic sales partner for hardware startups. We help bring innovative hardware products to Nordic markets through expert representation and strategic partnerships across the Nordics.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:hello@aplexor.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/aplexor" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services" 
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2 font-body text-muted-foreground">
              <li>Nordic Sales Representation</li>
              <li>Nordic Lead Generation</li>
              <li>Nordic Distributor Matchmaking</li>
              <li>Nordic Market Entry</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-muted-foreground text-sm">
              © {new Date().getFullYear()} Aplexor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="/privacy" 
                className="font-body text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="font-body text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;