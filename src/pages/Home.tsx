import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Users, Target, TrendingUp, Handshake, Zap, Globe, XCircle, Settings, UserMinus, BarChart3, MapPin, Clock, Search, CheckCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const pillars = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expertise",
      description: "Deep industry knowledge and track record in hardware sales and market entry strategies."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Network",
      description: "Extensive connections with distributors, retailers, and key decision makers across global markets."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Results",
      description: "Measurable outcomes through strategic partnerships and data-driven sales approaches."
    }
  ];

  const problems = [
    {
      icon: <XCircle className="w-8 h-8 text-primary" />,
      title: "Market Validation",
      description: "Many products are innovative but not yet mature. Without an established product–market fit, it is challenging to convince customers, sales partners and distribution networks to accept your innovative solution."
    }, 
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: "Sales Volume",
      description: "Startups often lack certifications, scale, and volume. Distributors often want high-volume, low-risk products, out of reach for many SMEs that release innovative products."
    },
    {
      icon: <UserMinus className="w-8 h-8 text-primary" />,
      title: "Limited Sales Resources",
      description: "Sales often falls on the CEO or founders. With small teams and limited bandwidth dedicated to expansion, opportunities are missed, resources are blocked and growth slows."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Missing Sales Expertise",
      description: "Technical founders sometimes lack the B2B sales experience necessary to ensure sucessful sales activites, and often want to focus on core technology development."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Swedish Business Culture",
      description: "Success for business in Sweden and with Swedish companies requires a unique approach to business, based on trust, relationships, and consensus."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Expansion Barriers",
      description: "Expanding into and outside of Sweden requires networks and presence that SMEs struggle to build, and complex regulatory considerations are demanding."
    }
  ];

  const services = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Discovery",
      description: "Identify opportunities, qualify prospects, and understand the landscape before strategic planning."
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Strategic",
      description: "Where to go and how to win with comprehensive go-to-market strategies."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Execution",
      description: "Direct sales activity and growth through lead generation, matchmaking, and representation."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Supporting",
      description: "Tools, processes, and materials that close deals and accelerate growth."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 overflow-hidden"
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
              <span className="text-primary">Hardware SMEs</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aplexor offers sales and business development support for hardware SMEs. Whether you are a Swedish company intending to grow into global markets, or if you want strategies to enter the Swedish markets, we can offer services tailored for your business needs. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-heading font-semibold">
                <Link to="/services">Our Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-heading font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Challenge
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Hardware SMEs that are on a growth journey face unique challenges that can be lead to wasted time and unnecessary costs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {problem.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Aplexor Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Aplexor?
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine industry expertise with a wide network to deliver exceptional results for hardware startups. We can digest the fine details of your hardware solution, and find the partners you need for business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive sales solutions tailored specifically for hardware startups entering and scaling in the Nordic markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {service.icon}
                    <h3 className="font-heading text-lg font-semibold text-foreground ml-3">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="font-heading font-semibold">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to bring your hardware to market?
          </h2>
            <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can accelerate your growth and connect you with the right partners and customers in the Nordic region.
            </p>
          <Button asChild variant="secondary" size="lg" className="font-heading font-semibold">
            <Link to="/contact">Let's Talk</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
