import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Handshake, Target, Globe, Zap, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Sales Representation",
      description: "Professional representation of your hardware products to key buyers and decision makers across various industries and markets.",
      features: [
        "Direct sales to enterprise customers",
        "Relationship management with key accounts",
        "Product demonstrations and technical presentations",
        "Contract negotiation and closing",
        "Ongoing customer support and relationship building"
      ]
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Lead Generation",
      description: "Targeted prospecting and qualification of high-value leads using proven methodologies and industry-specific approaches.",
      features: [
        "Market research and customer identification",
        "Multi-channel outreach campaigns",
        "Lead qualification and scoring",
        "CRM integration and management",
        "Performance tracking and optimization"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Distributor Matchmaking",
      description: "Strategic partnerships with the right distributors for optimal market penetration and sustainable growth.",
      features: [
        "Distributor network evaluation",
        "Partnership negotiation and structuring",
        "Channel conflict resolution",
        "Performance monitoring and optimization",
        "Ongoing relationship management"
      ]
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Market Entry Consulting",
      description: "Expert guidance on market strategy, positioning, and go-to-market execution for hardware startups entering new markets.",
      features: [
        "Market analysis and opportunity assessment",
        "Competitive landscape evaluation",
        "Go-to-market strategy development",
        "Pricing and positioning recommendations",
        "Launch planning and execution support"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Comprehensive sales solutions designed specifically for hardware startups and growing companies. We provide the expertise, network, and strategic guidance you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-heading text-2xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful outcomes for every hardware startup we partner with.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Deep dive into your product, market, and goals to develop a customized strategy."
              },
              {
                step: "02",
                title: "Strategy",
                description: "Create a comprehensive go-to-market plan tailored to your specific needs and objectives."
              },
              {
                step: "03",
                title: "Execution",
                description: "Implement the strategy with precision, leveraging our network and expertise."
              },
              {
                step: "04",
                title: "Optimization",
                description: "Continuously monitor, analyze, and refine our approach for maximum results."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-heading font-bold text-xl mb-4">
                  {step.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to accelerate your hardware sales?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Submit your product information and let's discuss how we can help you reach your sales goals.
            </p>
            <Button asChild size="lg" className="font-heading font-semibold">
              <Link to="/contact">Submit Your Product</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;