import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import ServiceCard from "@/components/ServiceCard";
import { Users, Handshake, User, Network, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Execution = () => {
  const services = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
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
      icon: <Handshake className="w-6 h-6 text-primary" />,
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
      icon: <User className="w-6 h-6 text-primary" />,
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
      icon: <Network className="w-6 h-6 text-primary" />,
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
              Execution
            </h1>
            <p className="font-body text-xl text-muted-foreground">
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

      <ProcessSection currentStep="execution" />

      <CtaBanner />

    </Layout>
  );
};

export default Execution;
