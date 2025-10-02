import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import ServiceCard from "@/components/ServiceCard";
import { UserSearch, Layers, Search, Eye, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Discovery = () => {
  const services = [
    {
      icon: <UserSearch className="w-6 h-6 text-primary" />,
      title: "Customer Discovery & Research",
      description: "Understand what customers really want to shape market strategy.",
      details: [
        "Conduct interviews to uncover pain points and unmet needs",
        "Use surveys and data to confirm and measure demand",
        "Map the customer journey to find challenges and opportunities",
        "Analyze competitors to spot gaps in the market"
      ]
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: "Market Segmentation & Prioritization",
      description: "Focus on the customer groups that create the most value.",
      details: [
        "Estimate market size and potential to define opportunities",
        "Segment and profile customers by needs, behavior, and value",
        "Create a priority matrix to guide market entry",
        "Recommend where to focus resources for the best return"
      ]
    },
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Opportunity Assessment & Engagement",
      description: "Identify and rank the best prospects for growth.",
      details: [
        "Map and profile high-value prospects",
        "Assess and rank opportunities objectively",
        "Evaluate potential partners and distributors for fit",
        "Prioritize prospects to sharpen sales efforts"
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "Market & Competition Insights", 
      description: "Learn from early sales interactions to improve results.",
      details: [
        "Track and analyze engagement metrics",
        "Identify response patterns to understand customer behavior",
        "Adjust sales approach based on real-time insights",
        "Review the sales funnel to find and fix weak points"
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
              Discovery
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              The discovery phase aims to analyze markets, map customers, partners and competitors, and validate the best opportunities.
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

      <ProcessSection currentStep="discovery" />

      <CtaBanner />

    </Layout>
  );
};

export default Discovery;
