import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";

interface ProcessSectionProps {
  currentStep?: "discovery" | "strategy" | "execution" | "supporting";
}

const ProcessSection = ({ currentStep }: ProcessSectionProps) => {
  const steps = [
    {
      step: "01",
      title: "Discovery",
      route: "discovery"
    },
    {
      step: "02", 
      title: "Strategy",
      route: "strategy"
    },
    {
      step: "03",
      title: "Execution", 
      route: "execution"
    },
    {
      step: "04",
      title: "Scale",
      route: "supporting"
    }
  ];

  return (
    <section id="process" className="py-8 md:py-16 bg-muted">
      <div className="container mx-auto px-2 md:px-4">
        <div className="text-center mb-4 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Our Process
          </h2>
          <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            We follow a proven methodology to ensure successful outcomes for our partners. You can choose to let us handle the entire process for you, or we can deliver each step separately as a service.
          </p>
        </div>
        
        <div className="flex items-center justify-center max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Circle and Text */}
              <div className="flex flex-col items-center px-0.5 md:px-2 lg:px-4">
                <Link to={`/services/${step.route}`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full font-heading font-bold text-sm md:text-base lg:text-2xl mb-1 md:mb-2 lg:mb-4 transition-all duration-300 cursor-pointer ${
                    currentStep === step.route 
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg ring-2 md:ring-4 ring-primary/30" 
                      : "bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg"
                  }`}>
                    {step.step}
                  </div>
                </Link>
                <h3 className={`font-heading text-xs md:text-base lg:text-2xl font-semibold mb-1 lg:mb-3 whitespace-nowrap text-center ${
                  currentStep === step.route ? "text-primary" : "text-foreground"
                }`}>
                  {step.title}
                </h3>
              </div>
              
              {/* Arrow - positioned exactly between circles */}
              {index < 3 && (
                <div className="flex items-center justify-center px-2 md:px-4 lg:px-8 -mt-6 md:-mt-8 lg:-mt-12">
                  <ChevronRight className="w-5 h-5 md:w-10 md:h-10 lg:w-14 lg:h-14 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;