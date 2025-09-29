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
      description: "Create compelling sales decks, datasheets, and messaging that win customers and close deals.",
      details: [
        "Sales deck design and messaging optimization to increase win rates",
        "Product datasheets and technical documentation to support buyer decisions",
        "Customer case studies and success stories to build credibility",
        "Sales training materials and playbooks to enable consistent execution"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Investor & Pitch Support",
      description: "Tailor presentations and materials to secure funding and strategic partnerships.",
      details: [
        "Investor pitch deck development tailored to funding goals",
        "Financial modeling and projections to support business case",
        "Due diligence preparation and support to streamline fundraising",
        "Partnership proposal creation to secure strategic alliances"
      ]
    },
    {
      icon: <Database className="w-12 h-12 text-primary" />,
      title: "CRM & Sales Process Setup",
      description: "Implement tools and workflows to keep sales organized and track performance effectively.",
      details: [
        "CRM system selection and implementation to fit business needs",
        "Sales pipeline design and automation for efficiency",
        "Performance tracking and analytics setup for data-driven insights",
        "Team training and process documentation for adoption and consistency"
      ]
    },
    {
      icon: <Calculator className="w-12 h-12 text-primary" />,
      title: "Pricing & Packaging Advisory",
      description: "Define pricing models, bundles, and offers that fit the market and maximize profitability.",
      details: [
        "Competitive pricing analysis to benchmark positioning",
        "Value-based pricing model development to capture willingness-to-pay",
        "Product packaging and bundling strategies to enhance appeal",
        "Revenue optimization recommendations to improve profitability"
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-6">
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

      <ProcessSection currentStep="supporting" />

      <CtaBanner />

    </Layout>
  );
};

export default Supporting;
