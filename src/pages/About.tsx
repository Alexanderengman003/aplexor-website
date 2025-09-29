import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Shield, Lightbulb } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import alexanderEngman from "@/assets/alexander-engman.jpg";

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
      name: "Alexander Engman",
      role: "Founder & CEO",
      email: "alexander.engman@aplexor.com",
      description: "15+ years in hardware sales and business development. Former VP of Sales at leading tech hardware companies.",
      image: alexanderEngman
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
              We're passionate about helping hardware companies bridge the Swedish-global market gap through expert sales representation and strategic partnerships tailored for both Swedish expansion and global market entry.
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
              To bridge the gap between Swedish companies seeking global expansion and global companies entering Sweden by providing expert sales representation, strategic guidance, and access to established distribution networks. We believe that great technology deserves great market execution, whether expanding from Sweden globally or entering Sweden from international markets.
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
                Aplexor was founded in 2019 with a simple observation: too many brilliant hardware innovations were struggling to reach their market potential, not because of product limitations, but due to sales and distribution challenges in navigating market expansion.
              </p>
              <p>
                Our founders, having witnessed this pattern repeatedly across various hardware sectors, decided to create a specialized agency that could bridge this critical gap by focusing on the Swedish market as both a launching pad for global expansion and an entry point for international companies. We combine deep technical understanding with proven Swedish sales expertise and global networks to help hardware companies navigate complex B2B sales processes.
              </p>
              <p>
                Today, we've helped dozens of hardware companies successfully expand from Sweden to global markets and enter Sweden from international markets, establishing key partnerships and achieving significant revenue growth. Our approach remains focused on building long-term relationships and delivering measurable results through our unique bidirectional market expertise.
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
          
          <div className="flex justify-center">
            <div className="max-w-sm">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                    <img 
                      src={team[0].image as string}
                      alt={team[0].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {team[0].name}
                  </h3>
                  <p className="font-body text-primary font-medium mb-2">
                    {team[0].role}
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    <a href={`mailto:${team[0].email}`} className="hover:text-primary transition-colors">
                      {team[0].email}
                    </a>
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {team[0].description}
                  </p>
                </CardContent>
              </Card>
            </div>
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
                  answer: "We specialize in the Swedish market as both an entry point and expansion base. Our deep understanding of Swedish business culture, regulations, and global networks allows us to help Swedish companies expand internationally and global companies enter Sweden effectively."
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
              Let's discuss how our team can help accelerate your hardware company's growth through Swedish market expertise and global expansion.
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
