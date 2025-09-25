import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Users, Handshake, User, Network, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Execution = () => {
  const services = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Lead Generation",
      description: "Build and qualify your sales pipeline with targeted prospect identification and outreach.",
      details: [
        "Targeted prospect identification and research",
        "Multi-channel outreach campaigns",
        "Lead qualification and scoring",
        "Pipeline management and tracking"
      ]
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Matchmaking",
      description: "Connect with the right partners, distributors, and customers for your hardware solutions.",
      details: [
        "Strategic partner identification",
        "Distributor network mapping",
        "Customer-solution matching",
        "Partnership facilitation and negotiation support"
      ]
    },
    {
      icon: <User className="w-12 h-12 text-primary" />,
      title: "Sales Representation",
      description: "Professional sales representation acting as your dedicated Nordic sales force.",
      details: [
        "Dedicated sales professional assignment",
        "Customer relationship development",
        "Sales process execution and management",
        "Regular reporting and performance tracking"
      ]
    },
    {
      icon: <Network className="w-12 h-12 text-primary" />,
      title: "Channel Development & Business Development",
      description: "Establish and manage distributor/reseller networks and nurture long-term relationships.",
      details: [
        "Channel partner recruitment and onboarding",
        "Distributor relationship management",
        "Channel enablement and training",
        "Performance monitoring and optimization"
      ]
    }
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <span>/</span>
          <span>Execution Services</span>
        </div>
      </div>

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
              Execution Services
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Direct sales activity and growth execution. Turn your strategy into results with our hands-on execution services designed to drive immediate and sustainable growth.
            </p>
            <Button asChild size="lg" className="font-heading font-semibold">
              <Link to="/contact">Start Executing</Link>
            </Button>
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

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to execute your growth strategy?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Let our experienced team handle the execution while you focus on product development and business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-heading font-semibold">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-heading font-semibold">
                <Link to="/services">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Execution;