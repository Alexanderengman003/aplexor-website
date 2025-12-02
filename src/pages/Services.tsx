import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
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
  Search as SearchIcon,
  Lightbulb,
  Rocket,
  Headphones
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Services = () => {
  const serviceCategories = [
    {
      title: "Discovery",
      icon: <SearchIcon className="w-6 h-6 text-primary" />,
      subtitle: "The discovery phase aims to analyze markets, map customers, partners and competitors, and validate the best opportunities.",
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
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
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
      icon: <Rocket className="w-6 h-6 text-primary" />,
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
      title: "Support",
      icon: <Headphones className="w-6 h-6 text-primary" />,
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
              Services
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Comprehensive sales solutions for Deeptech companies looking to scale and expand internationally. We provide the expertise, network, and results you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-2 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            {serviceCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-3 md:p-6 lg:hover:shadow-lg transition-shadow duration-300 bg-card/50 border-2 group cursor-pointer flex flex-col h-full">
                <Link to={`/services/${category.title.toLowerCase() === 'support' ? 'supporting' : category.title.toLowerCase().split(' ')[0]}`} className="block flex-1 flex flex-col">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-snug">
                      {category.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center">
                    <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex flex-col items-center justify-center gap-2 p-2 md:p-4 rounded-lg bg-background/80 border-2 lg:hover:bg-background transition-colors duration-200 text-center min-h-[80px] md:min-h-[120px]">
                          <div className="flex-shrink-0">
                            {service.icon}
                          </div>
                          <h3 className="font-heading text-xs md:text-base font-semibold text-foreground leading-tight">
                            {service.title}
                          </h3>
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
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-4 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Industries Covered
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Our expertise spans across key industries where Deeptech innovation drives growth and transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
            {[
              {
                icon: <Heart className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Medical",
                description: "Medical technology and devices"
              },
              {
                icon: <Cpu className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Electronics",
                description: "Consumer and industrial electronics"
              },
              {
                icon: <Wifi className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "IoT",
                description: "Smart devices and connected solutions"
              },
              {
                icon: <Factory className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Industrial",
                description: "Manufacturing and automation equipment"
              },
              {
                icon: <Smartphone className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Consumer",
                description: "Consumer electronics and lifestyle products"
              },
              {
                icon: <Building className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Enterprise",
                description: "B2B Deeptech and enterprise solutions"
              },
              {
                icon: <Leaf className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Cleantech",
                description: "Environmental and sustainability technology"
              },
              {
                icon: <ShieldCheck className="w-6 h-6 md:w-12 md:h-12 text-primary" />,
                title: "Defense",
                description: "Security systems and defense technology"
              }
            ].map((market, index) => (
              <div key={index} className="text-center p-2 md:p-6 rounded-lg bg-card border lg:hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center min-h-[80px] md:min-h-0">
                <div className="flex justify-center mb-1 md:mb-4">
                  {market.icon}
                </div>
                <h3 className="font-heading text-xs md:text-base lg:text-lg font-semibold text-foreground leading-tight">
                  {market.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <CtaBanner />
    </Layout>
  );
};

export default Services;
