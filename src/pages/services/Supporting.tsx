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
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Sales Scaling",
      description: "",
      details: []
    },
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: "Operational Scaling",
      description: "",
      details: []
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Funding & Partnerships",
      description: "",
      details: [
        "Build growth-stage investor decks and financial models",
        "Identify strategic partnerships and grant opportunities"
      ]
    },
    {
      icon: <Calculator className="w-6 h-6 text-primary" />,
      title: "Market Expansion",
      description: "",
      details: []
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
              Scale
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              We help you grow efficiently, expanding your reach, capacity, and impact without breaking your business.
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
