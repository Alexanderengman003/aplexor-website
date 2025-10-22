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
      description: "Shape your positioning, pricing, and entry plan for the Nordic markets.",
      details: [
        "Develop market positioning and value propositions tailored to Nordic buyers",
        "Define pricing strategy and analyze competitors to create a strong offer",
        "Build a channel strategy and select the right partners for local reach",
        "Plan launch milestones and timelines for structured execution"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Market Research & Insights",
      description: "Understand the market, competitors, and customers to guide decisions.",
      details: [
        "Conduct market analysis and sizing to support investments",
        "Map the competitive landscape to spot opportunities and risks",
        "Study customer behavior and preferences to build strategy",
        "Track trends and predict shifts to stay ahead"
      ]
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Market Entry",
      description: "Expert support for Swedish market actors",
      details: [
        "Navigate regulatory and compliance requirements",
        "Adapt messaging and approach for local culture and adoption",
        "Identify and evaluate partners for faster growth",
        "Assess and mitigate risks of market entry"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Commercial Readiness Assessment",
      description: "Check readiness before scaling and partnering.",
      details: [
        "Validate product-market fit",
        "Optimize sales processes to improve win rates",
        "Audit certifications and compliance to meet requirements",
        "Assess scalability and give recommendations for growth"
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
                description={service.description}
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