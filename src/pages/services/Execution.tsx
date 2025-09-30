import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import { Users, Handshake, User, Network, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Execution = () => {
  const services = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Lead Generation",
      description: "Build and qualify your sales pipeline with targeted prospect identification and outreach.",
      details: [
        "Targeted prospect identification and research to build a qualified pipeline",
        "Multi-channel outreach campaigns (email, LinkedIn, events) to maximize reach",
        "Lead qualification and scoring to focus on the best opportunities",
        "Pipeline management and tracking to ensure consistent deal flow"
      ]
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Matchmaking",
      description: "Connect with the right partners, distributors, and customers for your hardware solutions.",
      details: [
        "Strategic partner identification aligned with business goals",
        "Distributor network mapping to unlock market access",
        "Customer-solution matching to accelerate adoption",
        "Partnership facilitation and negotiation support to close deals"
      ]
    },
    {
      icon: <User className="w-12 h-12 text-primary" />,
      title: "Sales Representation",
      description: "Professional sales representation acting as your dedicated Nordic sales force.",
      details: [
        "Dedicated sales professional assignment for localized execution",
        "Customer relationship development to build trust and loyalty",
        "Sales process execution and management to drive conversions",
        "Regular reporting and performance tracking for transparency"
      ]
    },
    {
      icon: <Network className="w-12 h-12 text-primary" />,
      title: "Channel Development & Business Development",
      description: "Establish and manage distributor/reseller networks and nurture long-term relationships.",
      details: [
        "Channel partner recruitment and onboarding to expand market reach",
        "Distributor relationship management for long-term success",
        "Channel enablement and training to ensure partner effectiveness",
        "Performance monitoring and optimization to maximize results"
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
              Execution
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Hands-on execution to convert strategy into immediate and sustainable revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    {service.icon}
                    <CardTitle className="font-heading text-2xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="font-body text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-body text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection currentStep="execution" />

      <CtaBanner />

    </Layout>
  );
};

export default Execution;
