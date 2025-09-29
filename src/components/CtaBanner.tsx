import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CtaBannerProps {
  description?: string;
}

const CtaBanner = ({ 
  description = "Let's discuss how our team can help accelerate your hardware company's growth and market success in the Nordic region." 
}: CtaBannerProps) => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Ready to work with us?
        </h2>
        <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button asChild variant="secondary" size="lg" className="font-heading font-semibold">
          <Link to="/contact">Get In Touch</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaBanner;