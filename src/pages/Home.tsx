import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Users, Target, TrendingUp, Handshake, Zap, Globe, XCircle, Settings, UserMinus, BarChart3, MapPin, Clock } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const pillars = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expertise",
      description: "Deep industry knowledge and proven track record in hardware sales and market entry strategies."
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
      title: "No Market Validation",
      description: "Many products are innovative but not yet proven. Without product–market fit, it's hard to win investors, customers, or sales partners."
    },
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: "Immature Products & Low Volumes",
      description: "Startups often lack certifications, scalability, and volume. Distributors want high-volume, low-risk products — leaving startups out."
    },
    {
      icon: <UserMinus className="w-8 h-8 text-primary" />,
      title: "Limited Sales Resources",
      description: "Sales often falls on the CEO or founders. With small teams, opportunities are missed and growth slows."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Missing Sales Expertise",
      description: "Technical founders rarely have B2B sales experience. Hardware sales require trust, negotiation, and long cycles — skills that take years to build."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Nordic Business Culture",
      description: "Success in the Nordics relies on trust, relationships, and consensus. Startups without local sales know-how struggle to adapt."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Long Sales Cycles & Expansion Barriers",
      description: "Hardware deals take months of testing and negotiations. Expanding abroad requires networks and presence that startups rarely have."
    }
  ];

  const services = [
    {
      icon: <Handshake className="w-6 h-6 text-primary" />,
      title: "Sales Representation",
      description: "Professional representation of your hardware products to key buyers and decision makers."
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Lead Generation",
      description: "Targeted prospecting and qualification of high-value leads for your hardware solutions."
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Distributor Matchmaking",
      description: "Strategic partnerships with the right distributors for optimal market penetration."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Market Entry Consulting",
      description: "Expert guidance on market strategy, positioning, and go-to-market execution."
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
              Your Nordic Sales Partner for{" "}
              <span className="text-primary">Hardware Startups</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We help innovative hardware companies accelerate growth through expert sales representation, strategic partnerships, and proven market entry strategies.
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
              The Hardware Sales Challenge
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Hardware startups face unique barriers that traditional sales approaches can't overcome.
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
              We combine deep industry expertise with a proven network to deliver exceptional results for hardware startups.
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
              Comprehensive sales solutions tailored for hardware startups and growing companies.
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
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to bring your hardware to market?
          </h2>
          <p className="font-body text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can accelerate your growth and connect you with the right partners and customers.
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