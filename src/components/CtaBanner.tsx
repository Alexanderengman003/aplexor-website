import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          Ready to bring your product to market?
        </h2>
        <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button asChild variant="secondary" size="lg" className="font-heading font-semibold">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaBanner;
