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
      description: "Build a strong and qualified sales pipeline.",
      details: [
        "Identify and research targeted prospects",
        "Run outreach campaigns across email, LinkedIn, and events",
        "Qualify and score leads to focus on top opportunities",
        "Manage and track pipeline for consistent flow"
      ]
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Matchmaking",
      description: "Connect with the right partners, distributors, and customers.",
      details: [
        "Identify strategic partners aligned with business goals",
        "Map distributor networks for market access",
        "Match solutions with customers to speed adoption",
        "Support partnership facilitation and negotiation"
      ]
    },
    {
      icon: <User className="w-12 h-12 text-primary" />,
      title: "Sales Representation",
      description: "Act as your dedicated Nordic sales force.",
      details: [
        "Assign a local sales professional for execution",
        "Build customer relationships to establish trust",
        "Manage and execute sales processes to drive deals",
        "Provide regular reporting for transparency"
      ]
    },
    {
      icon: <Network className="w-12 h-12 text-primary" />,
      title: "Channel & Business Development",
      description: "Build and grow long-term channel partnerships.",
      details: [
        "Recruit and onboard channel partners to expand reach",
        "Manage distributor relationships for ongoing success",
        "Provide enablement and training to improve performance",
        "Monitor and optimize partner results"
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

      <ProcessSection currentStep="execution" />

      <CtaBanner />

    </Layout>
  );
};

export default Execution;
