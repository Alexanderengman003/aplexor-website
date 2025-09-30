import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import { FileText, TrendingUp, Database, Calculator, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Supporting = () => {
  const services = [
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
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
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
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
      icon: <Database className="w-12 h-12 text-primary" />,
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
      icon: <Calculator className="w-12 h-12 text-primary" />,
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
              Support
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
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

      <ProcessSection currentStep="supporting" />

      <CtaBanner />

    </Layout>
  );
};

export default Supporting;
