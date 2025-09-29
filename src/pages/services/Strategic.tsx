import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import { Target, BarChart3, Globe, Shield, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Strategic = () => {
  const services = [
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Go-to-Market Strategy",
      description: "Define positioning, pricing, and market entry strategies tailored to Nordic markets.",
      details: [
        "Market positioning and value proposition development",
        "Pricing strategy and competitive analysis",
        "Channel strategy and partner selection",
        "Launch timeline and milestone planning"
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Market Research & Insights",
      description: "Identify opportunities, competitors, and customer needs to inform strategic decisions.",
      details: [
        "Comprehensive market analysis and sizing",
        "Competitive landscape mapping",
        "Customer behavior and preference studies",
        "Trend analysis and future market predictions"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Nordic Market Entry",
      description: "Tailored expertise for entering and scaling in the Nordic markets.",
      details: [
        "Regulatory requirements and compliance guidance",
        "Cultural adaptation and localization strategies",
        "Local partner identification and evaluation",
        "Market entry risk assessment and mitigation"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Commercial Readiness Assessment",
      description: "Evaluate certifications, scalability, and sales readiness before engaging partners.",
      details: [
        "Product-market fit evaluation",
        "Sales process optimization",
        "Certification and compliance audit",
        "Scalability assessment and recommendations"
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
              Strategic
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Define where to go and how to win. Our strategic services help you develop comprehensive plans for successful market entry and sustainable growth in Nordic markets.
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

      <CtaBanner />

    </Layout>
  );
};

export default Strategic;
