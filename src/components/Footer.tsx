import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import linkedinIcon from "@/assets/linkedin-icon.png";
import aplexorLogo from "@/assets/aplexor-logo-new-footer.png";

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={aplexorLogo} 
                alt="Aplexor Logo" 
                className="w-10 h-10"
                loading="lazy"
              />
              <h3 className="font-heading font-bold text-xl text-foreground">
                Aplexor
              </h3>
            </div>
            <p className="font-body text-muted-foreground mb-4 max-w-md">
              Aplexor helps Swedish Deeptech SMEs expand their business outside of Sweden, and international business to grow into the Swedish market.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:info@aplexor.com" 
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
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 rounded" loading="lazy" />
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

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="font-body text-muted-foreground text-sm">
              <p>© {new Date().getFullYear()} Aplexor. All rights reserved.</p>
              <p className="mt-1">Org. nr: 559558-5745</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
