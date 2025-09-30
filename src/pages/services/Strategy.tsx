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
      description: "Define positioning, pricing, and market entry strategies tailored to Nordic markets.",
      details: [
        "Market positioning and value proposition development tailored to Nordic buyers",
        "Pricing strategy and competitive analysis to establish a compelling offer",
        "Channel strategy and partner selection to maximize local reach",
        "Launch timeline and milestone planning for structured execution"
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Market Research & Insights",
      description: "Identify opportunities, competitors, and customer needs to inform strategic decisions.",
      details: [
        "Comprehensive market analysis and sizing to guide investment decisions",
        "Competitive landscape mapping to identify threats and opportunities",
        "Customer behavior and preference studies to inform product design and messaging",
        "Trend analysis and future market predictions to anticipate shifts"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Nordic Market Entry",
      description: "Tailored expertise for entering and scaling in the Nordic markets.",
      details: [
        "Regulatory requirements and compliance guidance for Nordic markets",
        "Cultural adaptation and localization strategies to increase adoption",
        "Local partner identification and evaluation for faster scaling",
        "Market entry risk assessment and mitigation strategies"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Commercial Readiness Assessment",
      description: "Evaluate certifications, scalability, and sales readiness before engaging partners.",
      details: [
        "Product-market fit evaluation to validate readiness",
        "Sales process optimization to shorten cycles and improve win rates",
        "Certification and compliance audit to meet regulatory and partner requirements",
        "Scalability assessment and recommendations to support sustainable growth"
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