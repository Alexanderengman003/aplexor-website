import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

interface CtaBannerProps {
  description?: string;
}

const CtaBanner = ({ 
  description = "Let's discuss how Aplexor can help accelerate your company's growth and market success. We want to hear from you!"
}: CtaBannerProps) => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Ready to level up your business?
        </h2>
        <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button asChild variant="outline" size="lg" className="font-heading font-semibold">
          <Link to="/contact" className="flex items-center gap-2">
            Contact us
            <Mail className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaBanner;
