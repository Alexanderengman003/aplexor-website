import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import ServiceCard from "@/components/ServiceCard";
import { Target, BarChart3, Globe, Shield, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Strategy = () => {
  const services = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Go-to-Market Strategy",
      details: [
        "Develop positioning and value propositions for potential customers",
        "Define pricing strategy and benchmark against competitors",
        "Build channel strategy and select partners for local reach",
        "Define the actions and resources needed for market introduction"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Market Research",
      details: [
        "Conduct market analysis and sizing to support investments",
        "Map the competitive landscape to identify opportunities and risks",
        "Study customer behaviors and preferences to inform strategy",
        "Track trends and forecast shifts to stay ahead"
      ]
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Market Entry",
      details: [
        "Navigate regulatory and compliance requirements",
        "Adapt messaging and approach to local culture and adoption",
        "Identify and assess partners for faster growth",
        "Evaluate and mitigate market-entry risks"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Commercial Readiness",
      details: [
        "Validate product-market fit",
        "Optimize sales processes to improve win rates",
        "Audit certifications and compliance requirements",
        "Assess scalability and provide growth recommendations"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative h-80 lg:h-96 overflow-hidden flex items-center"
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
              Strategy
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Shaping the roadmap with clear choices on markets, positioning, and paths to growth based on findings in discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                details={service.details}
              />
            ))}
          </div>
        </div>
      </section>

      <ProcessSection currentStep="strategy" />

      <CtaBanner />

    </Layout>
  );
};

export default Strategy;