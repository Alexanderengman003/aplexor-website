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
  ChevronRight,
  ChevronDown
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Services = () => {
  const serviceCategories = [
    {
      title: "Discovery",
      subtitle: "We analyze markets, map customers, partners and competitors, and validate the best opportunities.",
      services: [
        {
          icon: <UserSearch className="w-8 h-8 text-primary" />,
          title: "Customer Needs Mapping",
          description: "Conduct structured interviews and surveys to uncover unmet customer needs and pain points."
        },
        {
          icon: <Layers className="w-8 h-8 text-primary" />,
          title: "Market Segmentation & Prioritization",
          description: "Categorize target markets and segments to focus sales efforts where they matter most."
        },
        {
          icon: <Search className="w-8 h-8 text-primary" />,
          title: "Opportunity Scouting & Lead Qualification",
          description: "Identify high-potential partners, distributors, and leads, and rank them for follow-up."
        },
        {
          icon: <Eye className="w-8 h-8 text-primary" />,
          title: "Early Engagement Analysis",
          description: "Evaluate initial interest and responsiveness from prospects to refine sales approach."
        }
      ]
    },
    {
      title: "Strategic",
      subtitle: "Shaping the roadmap with clear choices on markets, positioning, and paths to growth based on findings in discovery.",
      services: [
        {
          icon: <Target className="w-8 h-8 text-primary" />,
          title: "Go-to-Market Strategy",
          description: "Define positioning, pricing, and market entry."
        },
        {
          icon: <BarChart3 className="w-8 h-8 text-primary" />,
          title: "Market Research & Insights",
          description: "Identify opportunities, competitors, and customer needs to inform strategic decisions."
        },
        {
          icon: <Globe className="w-8 h-8 text-primary" />,
          title: "Nordic Market Entry",
          description: "Tailored expertise for entering and scaling in the Nordics."
        },
        {
          icon: <Shield className="w-8 h-8 text-primary" />,
          title: "Commercial Readiness Assessment",
          description: "Evaluate certifications, scalability, and sales readiness before engaging partners."
        }
      ]
    },
    {
      title: "Execution",
      subtitle: "Direct sales activity and growth through prospecting, lead generation, partnerships, and other business development activites.",
      services: [
        {
          icon: <Users className="w-8 h-8 text-primary" />,
          title: "Lead Generation",
          description: "Build and qualify your sales pipeline."
        },
        {
          icon: <Handshake className="w-8 h-8 text-primary" />,
          title: "Matchmaking",
          description: "Connect with partners, distributors, and customers."
        },
        {
          icon: <User className="w-8 h-8 text-primary" />,
          title: "Sales Representation",
          description: "Act as your outsourced sales force."
        },
        {
          icon: <Network className="w-8 h-8 text-primary" />,
          title: "Channel Development & Business Development",
          description: "Establish and manage distributor/reseller networks and nurture long-term relationships."
        }
      ]
    },
    {
      title: "Supporting",
      subtitle: "We provide you with tools, processes, insights and materials that allow you to continue growing beyond our collaboration.",
      services: [
        {
          icon: <FileText className="w-8 h-8 text-primary" />,
          title: "Sales Enablement",
          description: "Create sales decks, datasheets, and messaging that win customers."
        },
        {
          icon: <TrendingUp className="w-8 h-8 text-primary" />,
          title: "Investor & Pitch Support",
          description: "Tailor presentations and materials to secure funding and partnerships."
        },
        {
          icon: <Database className="w-8 h-8 text-primary" />,
          title: "CRM & Sales Process Setup",
          description: "Implement tools and workflows to keep sales organized."
        },
        {
          icon: <Calculator className="w-8 h-8 text-primary" />,
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
              All Services
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Comprehensive sales solutions developed specifically for hardware SMEs established in Sweden and looking to expand internationally, and companies outside of Sweden who are looking to enter the market. We provide the expertise, network, and results you need to succeed with scaling your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {serviceCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 hover:shadow-lg transition-shadow duration-300 bg-card/50 border-2 group cursor-pointer">
                <Link to={`/services/${category.title.toLowerCase().split(' ')[0]}`} className="block">
                  <CardHeader className="pb-6">
                    <CardTitle className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <p className="font-body text-muted-foreground">
                      {category.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-start gap-4 p-4 rounded-lg bg-background/80 border hover:bg-background transition-colors duration-200">
                          <div className="flex-shrink-0 mt-1">
                            {service.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                              {service.title}
                            </h3>
                            <p className="font-body text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Industries Covered
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Our expertise spans across key industries where hardware innovation drives growth and transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-primary" />,
                title: "Medical",
                description: "Healthcare devices and medical technology"
              },
              {
                icon: <Zap className="w-12 h-12 text-primary" />,
                title: "Electronics",
                description: "Consumer and industrial electronic products"
              },
              {
                icon: <Network className="w-12 h-12 text-primary" />,
                title: "IoT & Connectivity",
                description: "Smart devices and connected solutions"
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Industrial",
                description: "Manufacturing and automation equipment"
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Consumer",
                description: "Consumer electronics and lifestyle products"
              },
              {
                icon: <Database className="w-12 h-12 text-primary" />,
                title: "Enterprise",
                description: "B2B hardware and enterprise solutions"
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-primary" />,
                title: "Cleantech",
                description: "Environmental and sustainability technology"
              },
              {
                icon: <Target className="w-12 h-12 text-primary" />,
                title: "Defense & Security",
                description: "Security systems and defense technology"
              }
            ].map((market, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card border hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {market.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {market.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {market.description}
                </p>
              </div>
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
              We follow a proven methodology to ensure successful outcomes for every hardware startup entering Nordic markets.
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8">
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
                <div key={index} className="flex flex-col lg:flex-row items-center">
                  <div className="text-center max-w-xs px-4">
                    <Link to={`/services/${["discovery", "strategic", "execution", "supporting"][index]}`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-heading font-bold text-xl mb-4 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        {step.step}
                      </div>
                    </Link>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-6 lg:mb-0">
                      {step.description}
                    </p>
                  </div>
                  {index < 3 && (
                    <>
                      <ChevronRight className="w-20 h-20 text-primary mx-4 hidden lg:block" />
                      <ChevronDown className="w-12 h-12 text-primary my-4 lg:hidden" />
                    </>
                  )}
                </div>
              ))}
            </div>
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

export default Services;
