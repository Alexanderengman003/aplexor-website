import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import { Target, BarChart3, Globe, Shield, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Strategy = () => {
  const services = [
    {
      icon: <Target className="w-12 h-12 text-primary" />,
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
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Market Research & Insights",
      description: "Understand the market, competitors, and customers to guide decisions.",
      details: [
        "Conduct market analysis and sizing to support investments",
        "Map the competitive landscape to spot opportunities and risks",
        "Study customer behavior and preferences to inform design and messaging",
        "Track trends and predict shifts to stay ahead"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Nordic Market Entry",
      description: "Expert support for entering and scaling in the Nordics.",
      details: [
        "Navigate regulatory and compliance requirements",
        "Adapt messaging and approach for local culture and adoption",
        "Identify and evaluate partners for faster growth",
        "Assess and mitigate risks of market entry"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
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
              Strategy
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Define where to go and how to win. Our strategic services help you develop comprehensive plans for successful market entry and sustainable growth in Nordic markets.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-3 md:p-4 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    {service.icon}
                    <CardTitle className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="font-body text-sm md:text-base text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="font-body text-xs md:text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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