import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import { UserSearch, Layers, Search, Eye, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Discovery = () => {
  const services = [
    {
      icon: <UserSearch className="w-12 h-12 text-primary" />,
      title: "Customer Discovery & Research",
      description: "Understand what customers really want to shape product design and market strategy.",
      details: [
        "Conduct interviews to uncover pain points and unmet needs",
        "Use surveys and data to confirm and measure demand",
        "Map the customer journey to find challenges and opportunities",
        "Analyze competitors to spot gaps in the market"
      ]
    },
    {
      icon: <Layers className="w-12 h-12 text-primary" />,
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
      icon: <Search className="w-12 h-12 text-primary" />,
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
      icon: <Eye className="w-12 h-12 text-primary" />,
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
              Discovery
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
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

      <ProcessSection currentStep="discovery" />

      <CtaBanner />

    </Layout>
  );
};

export default Discovery;
