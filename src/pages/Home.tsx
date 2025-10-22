import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import { Users, Target, TrendingUp, Handshake, Zap, Globe, XCircle, Settings, UserMinus, BarChart3, MapPin, Clock, Search, CheckCircle, ArrowRight, Mail } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Expertise",
      description: "Aplexor is founded and run exclusively by engineers with deep industry knowledge across many engineering domains. We have experience from working in Physical Technology SMEs, and understand the unique challenges and opportunities of trying to grow."
    },
    {
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Network",
      description: "We have a wide network of partners, including extensive connections with distributors, retailers, and key decision makers, which we can leverage to grow your business. Our established relationships enable us to accelerate market entry and increase sales."
    },
    {
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Results",
      description: "We provide measurable outcomes through strategic partnerships and data-driven sales approaches. We track crucial metrics to consistently track that our strategies are delivering real and tangible results. We do not succeed unless you succeed ."
    }
  ];

  const problems = [
    {
      icon: <XCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Market Validation",
      description: "Many products are innovative but not yet mature. Without an established product–market fit, it is challenging to convince customers, sales partners and distribution networks to accept your innovative solution."
    }, 
    {
      icon: <Settings className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Sales Volume",
      description: "Startups often lack certifications, scale, and volume. Distributors often want high-volume, low-risk products, out of reach for many SMEs that release innovative products."
    },
    {
      icon: <UserMinus className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Limited Sales Resources",
      description: "Sales often falls on the CEO or founders. With small teams and limited bandwidth dedicated to expansion, opportunities are missed, resources are blocked and growth slows."
    },
    {
      icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Missing Sales Expertise",
      description: "Technical founders sometimes lack the B2B sales experience necessary to ensure sucessful sales activites, and often want to focus on core technology development."
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Swedish Business Culture",
      description: "Success for business in Sweden and with Swedish companies requires a unique approach to business, based on trust, relationships, and consensus."
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Expansion Barriers",
      description: "Expanding into and outside of Sweden requires networks and presence that SMEs struggle to build, and complex regulatory considerations are demanding."
    }
  ];

  const services = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Discovery",
      description: "Comphrehensive analysis of markets, mapping of potential customers, partners and competitors, and validate the best opportunities.",
      route: "discovery"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Strategy",
      description: "Shaping the roadmap with clear choices on markets, positioning, and paths to growth based on findings in discovery.",
      route: "strategy"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Execution",
      description: "Direct sales activity and growth through prospecting, lead generation, partnerships, and other business development activites.",
      route: "execution"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
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
              Swedish Business Partner for{" "}
              <span className="text-primary">Physical Technology SMEs</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aplexor offers sales and business development support for physical technology SMEs. Whether you are a Swedish company intending to grow into global markets, or if you want strategies to enter the Swedish markets, we can offer services tailored for your business needs. 
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
              The Challenge
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Physical Technology SMEs that are on a growth journey face unique challenges that can be lead to wasted time and unnecessary costs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="text-center lg:hover:shadow-lg transition-shadow duration-300 border-2">
                <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px]">
                  <div className="flex justify-center mb-2 md:mb-4">
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
              Why Choose Aplexor?
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We combine technical expertise with a wide network to deliver results and growth for Physical Technology SMEs. We can digest the fine technical details of your products and explain these to customers. We help you find the partners that fit your products and solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-center lg:hover:shadow-lg transition-shadow duration-300 border-2">
                <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center min-h-[200px] md:min-h-[240px]">
                  <div className="flex justify-center mb-2 md:mb-4">
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
              Comprehensive sales solutions tailored specifically for Physical Technology SMEs that want to enter the Swedish market, or Swedish companies looking to grow abroad.
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
