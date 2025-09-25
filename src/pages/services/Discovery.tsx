import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { UserSearch, Layers, Search, Eye, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Discovery = () => {
  const services = [
    {
      icon: <UserSearch className="w-12 h-12 text-primary" />,
      title: "Customer Needs Mapping",
      description: "Conduct structured interviews and surveys to uncover unmet customer needs and pain points.",
      details: [
        "In-depth customer interviews to understand pain points",
        "Market research surveys and data analysis",
        "Customer journey mapping and touchpoint analysis",
        "Competitive needs analysis and gap identification"
      ]
    },
    {
      icon: <Layers className="w-12 h-12 text-primary" />,
      title: "Market Segmentation & Prioritization",
      description: "Categorize target markets and segments to focus sales efforts where they matter most.",
      details: [
        "Market sizing and potential assessment",
        "Customer segmentation and profiling",
        "Priority matrix development for market entry",
        "Resource allocation recommendations"
      ]
    },
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: "Opportunity Scouting & Lead Qualification",
      description: "Identify high-potential partners, distributors, and leads, and rank them for follow-up.",
      details: [
        "Prospect identification and database building",
        "Lead scoring and qualification frameworks",
        "Partner and distributor evaluation",
        "Pipeline prioritization and ranking"
      ]
    },
    {
      icon: <Eye className="w-12 h-12 text-primary" />,
      title: "Early Engagement Analysis", 
      description: "Evaluate initial interest and responsiveness from prospects to refine sales approach.",
      details: [
        "Engagement metrics tracking and analysis",
        "Response pattern identification",
        "Sales approach optimization",
        "Conversion funnel analysis"
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
              Identify opportunities, qualify prospects, and understand the landscape before strategic planning. Our discovery services provide the foundation for successful market entry and growth.
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

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to work with us?
          </h2>
            <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our team can help accelerate your hardware company's growth and market success in the Nordic region.
            </p>
          <Button asChild variant="secondary" size="lg" className="font-heading font-semibold">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

    </Layout>
  );
};

export default Discovery;
