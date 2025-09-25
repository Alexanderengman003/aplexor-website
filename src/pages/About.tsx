import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Shield, Lightbulb } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Transparency",
      description: "We believe in clear communication, honest reporting, and building trust through transparency in every interaction."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Results",
      description: "Our focus is on delivering measurable outcomes that drive real business growth and market success for our clients."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "We embrace new technologies and methodologies to stay ahead in the rapidly evolving hardware industry."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "15+ years in hardware sales and business development. Former VP of Sales at leading tech hardware companies.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Rodriguez",
      role: "VP of Business Development",
      description: "Expert in distributor relationships and channel partnerships. 12 years of experience in global hardware markets.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Jennifer Liu",
      role: "Senior Sales Manager",
      description: "Specialist in enterprise sales and customer relationship management. Track record with Fortune 500 clients.",
      image: "/api/placeholder/300/300"
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
              About Aplexor
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              We're passionate about helping innovative hardware companies succeed in Nordic markets through expert sales representation and strategic partnerships tailored for the Nordic region.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Our Mission
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              To bridge the gap between innovative hardware startups and Nordic market success by providing expert sales representation, strategic guidance, and access to established distribution networks across Sweden, Norway, Denmark, Finland, and Iceland. We believe that great technology deserves great market execution in the Nordic region.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                Aplexor was founded in 2019 with a simple observation: too many brilliant hardware innovations were struggling to reach their market potential, not because of product limitations, but due to sales and distribution challenges.
              </p>
              <p>
                Our founders, having witnessed this pattern repeatedly across various hardware sectors, decided to create a specialized agency that could bridge this critical gap specifically for the Nordic markets. We combine deep technical understanding with proven Nordic sales expertise to help hardware startups navigate complex B2B sales processes and build sustainable growth in Sweden, Norway, Denmark, Finland, and Iceland.
              </p>
              <p>
                Today, we've helped dozens of hardware companies successfully enter Nordic markets, establish key regional partnerships, and achieve significant revenue growth across the Nordic region. Our approach remains focused on building long-term relationships and delivering measurable results for every client we serve in these markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Team
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals who make Aplexor's success possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="font-body text-primary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our approach to every client relationship and business decision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-muted to-muted/80 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our hardware sales services and process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What types of hardware products do you work with?",
                answer: "We work with a wide range of hardware products, from consumer electronics to industrial equipment. Our team has experience across multiple sectors including IoT devices, medical devices, manufacturing equipment, and more."
              },
              {
                question: "How do you charge for your services?",
                answer: "Our pricing structure varies depending on the scope of work and client needs. We offer both commission-based and retainer-based models. Contact us to discuss the best approach for your specific situation."
              },
              {
                question: "How quickly can you start working on my project?",
                answer: "We can typically begin initial discovery and strategy development within 1-2 weeks of signing an agreement. The timeline depends on project complexity and our current capacity."
              },
                {
                  question: "Do you work with international markets?",
                  answer: "We specialize exclusively in Nordic markets (Sweden, Norway, Denmark, Finland, and Iceland). Our deep understanding of Nordic business culture, regulations, and distribution networks allows us to provide highly effective, localized support for hardware companies entering these markets."
                }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {faq.answer}
                  </p>
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

export default About;