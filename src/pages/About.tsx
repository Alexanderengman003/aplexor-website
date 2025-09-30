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
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Transparency",
      description: "We believe in clear communication, honest reporting, and building trust through transparency in every interaction."
    },
    {
      icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Results",
      description: "Our focus is on delivering measurable outcomes that drive real business growth and market success for our clients."
    },
    {
      icon: <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Innovation",
      description: "We embrace new technologies and methodologies and strive to stay up to date with the latest innovations on the market."
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: "Partnership",
      description: "We build long-term relationships with our clients, acting as an extension of their team to achieve shared success."
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
              Read more about us, who we are, and how we started here.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8">
              Our Mission
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Our mission at Aplexor is to act as a bridge between Sweden and the international market. We help Swedish companies scale abroad while enabling international companies to enter and grow in Sweden. By combining deep market knowledge with strong local networks, we provide expert sales representation and strategic guidance. Our focus is on ensuring that innovative technologies and solutions reach their full potential in the right markets. We believe that successful growth is built on strong partnerships, honesty, having a curious mind and delivering exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-4 md:space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                We are passionate about helping innovative physical technology companies succeed by providing expert sales support and creating strategic partnerships. As engineers at heart, we thrive on the complexity of physical products, from cutting-edge electronics to advanced medical devices. We are committed to guiding our partners every step of the way, turning their innovation into positive sales results.
              </p>
              <p>
                Founded in 2025, Aplexor was born from a vision to combine technical expertise with proven sales excellence. Having witnessed how brilliant innovations often struggle to reach their full market potential due to sales and distribution challenges, we decided to bridge this critical gap. Today, we focus on building long-term partnerships and delivering measurable results, helping companies navigate complex B2B sales processes and achieve sustainable growth in both Swedish and international markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              The Team
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Meet the individuals who work on delivering exceptional services to our partners.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-sm">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-3 md:p-8">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto mb-3 md:mb-6 overflow-hidden">
                    <img
                      src={team[0].image as string}
                      alt={team[0].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-base md:text-xl font-semibold text-foreground mb-1 md:mb-2">
                    {team[0].name}
                  </h3>
                  <p className="font-body text-sm md:text-base text-primary font-medium mb-1 md:mb-2">
                    {team[0].role}
                  </p>
                  <p className="font-body text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
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
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-4 md:mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Our Values
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              The principles that guide our approach to every client relationship and business decision.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px]">
                  <div className="flex justify-center mb-2 md:mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-sm md:text-base lg:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm lg:text-base text-muted-foreground leading-snug">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-muted to-muted/80 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our services or want to discuss a potential partnership? We'd love to hear from you.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How do you define Physical Technology?",
                  answer: "Physical Technology refers to tangible, hardware-based products and solutions that combine engineering, electronics, and software. This includes everything from consumer electronics and IoT devices to industrial equipment, medical devices, and advanced manufacturing systems. Our expertise lies in understanding the unique challenges of selling physical products in today's market."
                },
                {
                  question: "What are the deliverables of a project with Aplexor?",
                  answer: "Project deliverables vary based on your specific needs but typically include comprehensive market analysis, sales strategy development, distributor and partner network establishment, lead generation and qualification, sales process management, and detailed performance reporting. We work closely with you to define clear milestones and measurable outcomes from day one."
                },
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
                  question: "What markets do you serve?",
                  answer: "We specialize in helping Swedish companies expand internationally and international companies enter the Swedish market. Our deep understanding of Swedish business culture, regulations, and distribution networks allows us to provide highly effective, localized support for companies looking to grow in or from Sweden."
                },
                {
                  question: "What makes Aplexor different from other sales agencies?",
                  answer: "As engineers at heart, we bring a unique combination of technical understanding and sales expertise. We don't just sell products—we deeply understand the technology behind them. This allows us to engage meaningfully with technical stakeholders, navigate complex B2B sales cycles, and build credibility with partners and customers in ways that traditional sales agencies cannot."
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
