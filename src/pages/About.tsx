import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      description: "We embrace new technologies and methodologies and strive to stay up to date with the latest innovations on the market."
    }
  ];

  const team = [
    {
      name: "Alexander Engman",
      role: "Founder & CEO",
      email: "alexander.engman@aplexor.com",
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
             We are passionate about helping innovative physical technology companies succeed by providing expert sales support and creating strategic partnerships. As engineers at heart, we thrive on the complexity of physical products, from cutting-edge electronics to advanced medical devices. We are committed to guiding our partners every step of the way, turning their innovation into positive sales results.
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
              To bridge the gap between innovative Physical Technology startups and Nordic market success by providing expert sales representation, strategic guidance, and access to established distribution networks across Sweden, Norway, Denmark, Finland, and Iceland. We believe that great technology deserves great market execution in the Nordic region.
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
                Aplexor was founded in 2019 with a simple observation: too many brilliant Physical Technology innovations were struggling to reach their market potential, not because of product limitations, but due to sales and distribution challenges.
              </p>
              <p>
                Our founders, having witnessed this pattern repeatedly across various Physical Technology sectors, decided to create a specialized agency that could bridge this critical gap specifically for the Nordic markets. We combine deep technical understanding with proven Nordic sales expertise to help Physical Technology startups navigate complex B2B sales processes and build sustainable growth in Sweden, Norway, Denmark, Finland, and Iceland.
              </p>
              <p>
                Today, we've helped dozens of Physical Technology companies successfully enter Nordic markets, establish key regional partnerships, and achieve significant revenue growth across the Nordic region. Our approach remains focused on building long-term relationships and delivering measurable results for every client we serve in these markets.
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
              Find answers to common questions about our Physical Technology sales services and process.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What types of Physical Technology products do you work with?",
                  answer: "We work with a wide range of Physical Technology products, from consumer electronics to industrial equipment. Our team has experience across multiple sectors including IoT devices, medical devices, manufacturing equipment, and more."
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
                  answer: "We specialize exclusively in Nordic markets (Sweden, Norway, Denmark, Finland, and Iceland). Our deep understanding of Nordic business culture, regulations, and distribution networks allows us to provide highly effective, localized support for Physical Technology companies entering these markets."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-heading text-lg font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CtaBanner />
    </Layout>
  );
};

export default About;
