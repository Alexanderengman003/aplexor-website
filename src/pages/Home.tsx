import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import { Users, Target, TrendingUp, Handshake, Rocket, Globe, XCircle, MessageSquare, UserMinus, BarChart3, MapPin, Clock, Search, LifeBuoy, ArrowRight, Mail, Cpu, Network, Briefcase } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  // Home page component
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Technical Understanding",
      description: "Built by engineers who have delivered deeptech products, Aplexor quickly grasps your technology, assesses market fit, and communicates its value clearly."
    },
    {
      icon: <Network className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Market Access",
      description: "Your product is connected to relevant partners and customers through our industry network, accelerating adoption and reducing commercial barriers."
    },
    {
      icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Commercial Support",
      description: "Hands-on B2B sales expertise supplements small teams, letting founders focus on technology while driving sales and business development efforts without using vital company resources."
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Local Insight",
      description: "Commercial strategies are tailored to Swedish and Nordic business norms, building trust, credibility, and consensus with key decision-makers to secure partnerships."
    }
  ];

  const problems = [
    {
      icon: <Search className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Market Validation",
      description: "Innovative products are often not yet fully mature. Without clear product–market fit, it is difficult to convince customers, partners, or distributors to engage."
    }, 
    {
      icon: <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Technical Communication",
      description: "Technical products can be difficult for customers and partners to understand. Poorly communicated value propositions can limit adoption and slow partner engagement."
    },
    {
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Market Access",
      description: "SMEs struggle to reach the right distributors, integrators, and decision-makers. Without established networks, opportunities are delayed or lost."
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Limited Sales Capacity",
      description: "Founders often handle sales themselves and small teams need to prioritize other tasks, leading to overlooked prospects, slower growth and missed commercial opportunities."
    },
    {
      icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Missing Sales Experience",
      description: "Technical founders may lack B2B sales experience and prefer focusing on technology, making structured commercial engagement challenging. This can lead to ineffective business development."
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Local Market Knowledge",
      description: "Success in Sweden and internationally requires relationship-driven business approaches, local presence, and knowledge of market norms and regulatory expectations that SMEs often lack."
    }
  ];

  const services = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Discovery",
      description: "Comprehensive analysis of markets, mapping of potential customers, partners and competitors, and validate the best opportunities.",
      route: "discovery"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Strategy",
      description: "Shaping the roadmap with clear choices on markets, positioning, and paths to growth based on findings in discovery.",
      route: "strategy"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Execution",
      description: "Direct sales activity and growth through prospecting, lead generation, partnerships, and other business development activites.",
      route: "execution"
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-primary" />,
      title: "Support",
      description: "We provide you with tools, processes, insights and materials that allow you to continue growing beyond our collaboration.",
      route: "supporting"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-24 lg:py-40 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Driving Growth for<br />
              <span className="text-primary">Deeptech SMEs</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aplexor offers sales and business development support for Swedish deeptech SMEs. Whether you are a Swedish company intending to grow into global markets, or if you want strategies to enter the Swedish markets, we can offer services tailored to your business needs. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-heading font-semibold hover:bg-primary/90">
                <Link to="/services" className="flex items-center gap-2">
                  Our services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="font-heading font-semibold hover:bg-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Contact us
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              The Problem
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Deeptech SMEs that are on a growth journey face unique challenges that can lead to difficulties turning breakthrough technology into commercial success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="text-left lg:hover:shadow-lg transition-shadow duration-300 border-2">
                <CardContent className="p-3 md:p-6 flex flex-col items-start justify-start md:min-h-[220px]">
                  <div className="flex justify-start mb-2 md:mb-4">
                    {problem.icon}
                  </div>
                  <h3 className="font-heading text-sm md:text-base lg:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {problem.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm lg:text-base text-muted-foreground leading-snug">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Aplexor Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              The Solution
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Aplexor blends deep technical expertise with hands-on sales and business development experience to deliver measurable, sustainable growth for Deeptech SMEs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-left lg:hover:shadow-lg transition-shadow duration-300 border-2">
                <CardContent className="p-3 md:p-6 flex flex-col items-start justify-start md:min-h-[240px]">
                  <div className="flex justify-start mb-2 md:mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-heading text-sm md:text-base lg:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm lg:text-base text-muted-foreground leading-snug">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Our Services
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive sales solutions tailored specifically for Deeptech SMEs that want to enter the Swedish market, or Swedish companies looking to grow abroad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {services.map((service, index) => (
              <Link key={index} to={`/services/${service.route}`}>
                <Card className="lg:hover:shadow-lg transition-shadow duration-300 h-full border-2">
                  <CardContent className="p-3 md:p-6 flex flex-col justify-center min-h-[120px] md:min-h-[140px]">
                    <div className="flex items-center mb-2 md:mb-3">
                      {service.icon}
                      <h3 className="font-heading text-sm md:text-base lg:text-lg font-semibold text-foreground ml-2 md:ml-3">
                        {service.title}
                      </h3>
                    </div>
                    <p className="font-body text-xs md:text-sm text-muted-foreground leading-snug">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="font-heading font-semibold">
              <Link to="/services" className="flex items-center gap-2">
                View all services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </Layout>
  );
};

export default Home;
