import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { 
  Search, 
  Target, 
  Users, 
  FileText
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Services = () => {
  // Clean minimalistic services page
  const serviceCategories = [
    {
      title: "Discovery",
      icon: <Search className="w-6 h-6 text-primary" />,
      subtitle: "Identify opportunities and understand the landscape",
      services: [
        "Customer needs mapping and pain point analysis",
        "Market segmentation and prioritization",
        "Opportunity scouting and lead qualification",
        "Early engagement analysis and market feedback"
      ]
    },
    {
      title: "Strategy",
      icon: <Target className="w-6 h-6 text-primary" />,
      subtitle: "Where to go and how to win",
      services: [
        "Go-to-market strategy and positioning",
        "Market research and competitive insights",
        "Nordic market entry planning",
        "Commercial readiness assessment"
      ]
    },
    {
      title: "Execution",
      icon: <Users className="w-6 h-6 text-primary" />,
      subtitle: "Direct sales activity and growth",
      services: [
        "Lead generation and pipeline building",
        "Partner and customer matchmaking",
        "Outsourced sales representation",
        "Channel and business development"
      ]
    },
    {
      title: "Support",
      icon: <FileText className="w-6 h-6 text-primary" />,
      subtitle: "Tools and processes that close deals",
      services: [
        "Sales enablement and collateral creation",
        "Investor and pitch presentation support",
        "CRM and sales process optimization",
        "Pricing and packaging advisory"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Comprehensive sales solutions designed specifically for hardware startups entering and scaling in the Nordics. We provide the expertise, network, and strategic guidance you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {serviceCategories.map((category, index) => (
              <div key={index} className="space-y-8">
                {/* Category Header */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    {category.icon}
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                    {category.subtitle}
                  </p>
                </div>
                
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="group">
                      <p className="font-body text-foreground hover:text-primary transition-colors duration-200 cursor-default">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Divider */}
                {index < serviceCategories.length - 1 && (
                  <div className="flex justify-center pt-12">
                    <div className="w-24 h-px bg-border"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology for hardware startup success in Nordic markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Deep dive into your product, market, and goals"
              },
              {
                step: "02", 
                title: "Strategy",
                description: "Create a comprehensive go-to-market plan"
              },
              {
                step: "03",
                title: "Execution", 
                description: "Implement with precision using our network"
              },
              {
                step: "04",
                title: "Optimization",
                description: "Monitor, analyze, and refine for maximum results"
              }
            ].map((step, index) => (
              <div key={index} className="text-center lg:text-left space-y-4">
                <div className="inline-block">
                  <span className="font-heading text-6xl font-bold text-primary/20">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to accelerate your hardware sales?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Submit your product information and let's discuss how we can help you reach your Nordic sales goals.
            </p>
            <Button asChild size="lg" className="font-heading font-semibold">
              <Link to="/contact">Submit Your Product</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;