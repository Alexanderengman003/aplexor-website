import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
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
  Heart,
  Cpu,
  Wifi,
  Factory,
  Smartphone,
  Building,
  Leaf,
  ShieldCheck,
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
          description: "Conduct structured interviews and surveys to uncover unmet needs, pain points, and buying behaviors."
        },
        {
          icon: <Layers className="w-8 h-8 text-primary" />,
          title: "Market Segmentation & Prioritization",
          description: "Categorize target markets and segments to focus efforts where they matter most."
        },
        {
          icon: <Search className="w-8 h-8 text-primary" />,
          title: "Opportunity Assessment & Engagement",
          description: "Identify high-potential partners, distributors, and leads. We rank them for follow-up and evaluate initial responsiveness."
        },
        {
          icon: <Eye className="w-8 h-8 text-primary" />,
          title: "Market & Competition Insights",
          description: "Analyze competitors, market trends, and ecosystem dynamics to validate opportunity attractiveness and strategic positioning."
        }
      ]
    },
    {
      title: "Strategy",
      subtitle: "Shaping the roadmap with clear choices on markets, positioning, and paths to growth based on findings in discovery.",
      services: [
        {
          icon: <Target className="w-8 h-8 text-primary" />,
          title: "Go-to-Market Strategy",
          description: "Define positioning, pricing, and market approach to achieve competitive advantage."
        },
        {
          icon: <BarChart3 className="w-8 h-8 text-primary" />,
          title: "Market Research & Insights",
          description: "Identify opportunities, competitors, and customer needs to guide strategic decisions."
        },
        {
          icon: <Globe className="w-8 h-8 text-primary" />,
          title: "Market Entry",
          description: "Tailored expertise for entering and scaling in Sweden, or internationally for Swedish companies."
        },
        {
          icon: <Shield className="w-8 h-8 text-primary" />,
          title: "Commercial Readiness Assessment",
          description: "Evaluate certifications, scalability, and sales readiness to ensure successful partner engagement."
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
          description: "Generate and qualify leads to accelerate and grow your sales pipeline."
        },
        {
          icon: <Handshake className="w-8 h-8 text-primary" />,
          title: "Matchmaking",
          description: "Connect with the right partners, distributors, and customers to maximize opportunities. We leverage our technical expertise to understand customer needs."
        },
        {
          icon: <User className="w-8 h-8 text-primary" />,
          title: "Sales Representation",
          description: "Act as your outsourced sales team to drive growth and close deals."
        },
        {
          icon: <Network className="w-8 h-8 text-primary" />,
          title: "Channel & Business Development",
          description: "Establish and manage distributor/reseller networks while nurturing long-term business relationships."
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
          description: "Develop decks, datasheets, and messaging that help you win more customers"
        },
        {
          icon: <TrendingUp className="w-8 h-8 text-primary" />,
          title: "Investor & Pitch Support",
          description: "Craft tailored presentations and materials to secure funding and strategic partnerships."
        },
        {
          icon: <Database className="w-8 h-8 text-primary" />,
          title: "CRM & Sales Process Setup",
          description: "Set up CRM tools and workflows to streamline and track your sales process, with data-driven insights. We offer customized CRM solutions for your specific needs."
        },
        {
          icon: <Calculator className="w-8 h-8 text-primary" />,
          title: "Pricing & Packaging Advisory",
          description: "Design pricing models, bundles, and offers that resonate with your target market."
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
              Comprehensive sales solutions developed specifically for Physical Technology SMEs established in Sweden and looking to expand internationally, and companies outside of Sweden who are looking to enter the market. We provide the expertise, network, and results you need to succeed with scaling your business.
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
              Our expertise spans across key industries where Physical Technology innovation drives growth and transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Medical",
                description: "Medical technology and devices"
              },
              {
                icon: <Cpu className="w-12 h-12 text-primary" />,
                title: "Electronics",
                description: "Consumer and industrial electronics"
              },
              {
                icon: <Wifi className="w-12 h-12 text-primary" />,
                title: "IoT & Connectivity",
                description: "Smart devices and connected solutions"
              },
              {
                icon: <Factory className="w-12 h-12 text-primary" />,
                title: "Industrial",
                description: "Manufacturing and automation equipment"
              },
              {
                icon: <Smartphone className="w-12 h-12 text-primary" />,
                title: "Consumer",
                description: "Consumer electronics and lifestyle products"
              },
              {
                icon: <Building className="w-12 h-12 text-primary" />,
                title: "Enterprise",
                description: "B2B Physical Technology and enterprise solutions"
              },
              {
                icon: <Leaf className="w-12 h-12 text-primary" />,
                title: "Cleantech",
                description: "Environmental and sustainability technology"
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-primary" />,
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
              We follow a proven methodology to ensure successful outcomes for our partners. You can choose to let us handle the entire process for you, or we can deliver each step separately as a service.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery",
              },
              {
                step: "02",
                title: "Strategy",
              },
              {
                step: "03",
                title: "Execution",
              },
              {
                step: "04",
                title: "Support",
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col md:flex-col lg:flex-row items-center">
                <div className="text-center px-2 lg:px-4">
                  <Link to={`/services/${["discovery", "strategy", "execution", "supporting"][index]}`}>
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary text-primary-foreground rounded-full font-heading font-bold text-sm lg:text-xl mb-2 lg:mb-4 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      {step.step}
                    </div>
                  </Link>
                  <h3 className="font-heading text-sm md:text-base lg:text-xl font-semibold text-foreground mb-1 lg:mb-3">
                    {step.title}
                  </h3>
                </div>
                {index < 3 && (
                  <>
                    <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-primary my-2 md:my-4 lg:hidden" />
                    <ChevronRight className="w-12 h-12 text-primary mx-4 hidden lg:block" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </Layout>
  );
};

export default Services;
