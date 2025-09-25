import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { 
  Handshake, 
  Target, 
  Globe, 
  Zap, 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Users, 
  User, 
  Network, 
  FileText, 
  TrendingUp, 
  Database, 
  Calculator,
  Search,
  UserSearch,
  Layers,
  Eye,
  ArrowRight
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Services = () => {
  const serviceCategories = [
    {
      title: "Discovery Services",
      subtitle: "Identify opportunities, qualify prospects, and understand the landscape before strategic planning",
      services: [
        {
          icon: <UserSearch className="w-12 h-12 text-primary" />,
          title: "Customer Needs Mapping",
          description: "Conduct structured interviews and surveys to uncover unmet customer needs and pain points."
        },
        {
          icon: <Layers className="w-12 h-12 text-primary" />,
          title: "Market Segmentation & Prioritization",
          description: "Categorize target markets and segments to focus sales efforts where they matter most."
        },
        {
          icon: <Search className="w-12 h-12 text-primary" />,
          title: "Opportunity Scouting & Lead Qualification",
          description: "Identify high-potential partners, distributors, and leads, and rank them for follow-up."
        },
        {
          icon: <Eye className="w-12 h-12 text-primary" />,
          title: "Early Engagement Analysis",
          description: "Evaluate initial interest and responsiveness from prospects to refine sales approach."
        }
      ]
    },
    {
      title: "Strategic Services",
      subtitle: "Where to go and how to win",
      services: [
        {
          icon: <Target className="w-12 h-12 text-primary" />,
          title: "Go-to-Market Strategy",
          description: "Define positioning, pricing, and market entry."
        },
        {
          icon: <BarChart3 className="w-12 h-12 text-primary" />,
          title: "Market Research & Insights",
          description: "Identify opportunities, competitors, and customer needs to inform strategic decisions."
        },
        {
          icon: <Globe className="w-12 h-12 text-primary" />,
          title: "Nordic Market Entry",
          description: "Tailored expertise for entering and scaling in the Nordic region."
        },
        {
          icon: <Shield className="w-12 h-12 text-primary" />,
          title: "Commercial Readiness Assessment",
          description: "Evaluate certifications, scalability, and sales readiness before engaging partners."
        }
      ]
    },
    {
      title: "Execution Services",
      subtitle: "Direct sales activity and growth",
      services: [
        {
          icon: <Users className="w-12 h-12 text-primary" />,
          title: "Lead Generation",
          description: "Build and qualify your sales pipeline."
        },
        {
          icon: <Handshake className="w-12 h-12 text-primary" />,
          title: "Matchmaking",
          description: "Connect with partners, distributors, and customers."
        },
        {
          icon: <User className="w-12 h-12 text-primary" />,
          title: "Sales Representation",
          description: "Act as your outsourced sales force."
        },
        {
          icon: <Network className="w-12 h-12 text-primary" />,
          title: "Channel Development & Business Development",
          description: "Establish and manage distributor/reseller networks and nurture long-term relationships."
        }
      ]
    },
    {
      title: "Supporting Services",
      subtitle: "Tools, processes, and materials that close deals",
      services: [
        {
          icon: <FileText className="w-12 h-12 text-primary" />,
          title: "Sales Enablement",
          description: "Create sales decks, datasheets, and messaging that win customers."
        },
        {
          icon: <TrendingUp className="w-12 h-12 text-primary" />,
          title: "Investor & Pitch Support",
          description: "Tailor presentations and materials to secure funding and partnerships."
        },
        {
          icon: <Database className="w-12 h-12 text-primary" />,
          title: "CRM & Sales Process Setup",
          description: "Implement tools and workflows to keep sales organized."
        },
        {
          icon: <Calculator className="w-12 h-12 text-primary" />,
          title: "Pricing & Packaging Advisory",
          description: "Define pricing models, bundles, and offers that fit the market."
        }
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
              Our Services
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Comprehensive sales solutions designed specifically for hardware startups entering and scaling in the Nordics. We provide the expertise, network, and strategic guidance you need to succeed in these markets.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
          {serviceCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-muted/50 text-center pb-6">
                <CardTitle className="font-heading text-3xl font-bold text-foreground mb-2">
                  {category.title}
                </CardTitle>
                <p className="font-body text-lg text-muted-foreground">
                  {category.subtitle}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="border-2 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                              {service.title}
                            </h4>
                            <p className="font-body text-muted-foreground text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
              We follow a proven methodology to ensure successful outcomes for every hardware startup entering the Nordics.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
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
              <div key={index} className="flex items-center">
                <div className="text-center max-w-xs">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-heading font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <ArrowRight className="w-6 h-6 text-primary mx-4 hidden md:block" />
                )}
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
              Submit your product information and let's discuss how we can help you reach your Nordic market sales goals.
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