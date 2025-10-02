import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import ServiceCard from "@/components/ServiceCard";
import { FileText, TrendingUp, Database, Calculator, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Supporting = () => {
  const services = [
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Sales Enablement",
      description: "Create the tools and content that help close deals.",
      details: [
        "Design impactful sales decks and refine messaging",
        "Produce datasheets and documentation to support buyers",
        "Develop case studies and success stories for credibility",
        "Provide training materials and playbooks for consistency"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Investor & Pitch Support",
      description: "Prepare to win funding and strategic partnerships.",
      details: [
        "Develop investor pitch decks aligned with funding goals",
        "Build financial models and projections to back the case",
        "Help to find soft-funding",
        "Create partnership proposals to secure alliances"
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: "CRM & Sales Process Setup",
      description: "Implement tools and workflows for organized, effective sales.",
      details: [
        "Select and implement the right CRM system",
        "Custom CRM system available for implementation",
        "Set up tracking and analytics for data-driven insights",
        "Train teams and document processes for adoption"
      ]
    },
    {
      icon: <Calculator className="w-6 h-6 text-primary" />,
      title: "Pricing & Packaging Advisory",
      description: "Set pricing and offers that fit the market and maximize profit.",
      details: [
        "Benchmark with competitive pricing analysis",
        "Build value-based pricing models to capture demand",
        "Design product packaging and bundles for appeal",
        "Recommend strategies to optimize revenue"
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
              Support
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Tools, processes, and materials that close deals. Our supporting services provide the foundation and resources your sales team needs to succeed consistently.
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

      <ProcessSection currentStep="supporting" />

      <CtaBanner />

    </Layout>
  );
};

export default Supporting;
