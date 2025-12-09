import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Target, Shield, Lightbulb, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import alexanderEngman from "@/assets/alexander-engman.jpg";
import granitZymberi from "@/assets/granit-zymberi.jpeg";

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
      role: "Consultant",
      email: "alexander.engman@aplexor.com",
      image: alexanderEngman,
      linkedin: "https://www.linkedin.com/in/alexanderengman",
      bio: "Alexander has a master's degree in nanotechnology from KTH in Stockholm and has worked in SMEs spanning disciplines such as medical technology and electronics. He has 6 years of professional experience from both sales and hands-on engineering work."
    },
    {
      name: "Granit Zymberi",
      role: "Consultant",
      email: "granit.zymberi@aplexor.com",
      image: granitZymberi,
      linkedin: "https://www.linkedin.com/in/granitzymberi",
      bio: "Granit has a master's degree in technical design from KTH in Stockholm and has worked for over 10 years in engineering spanning disciplines such as aerospace, medical technology and industrial sectors. He completed his master thesis at Microsoft and has extensive hands-on engineering experience."
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
              About Aplexor
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Read more about us, who we are, and how we started here.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section - Text Left, Image Right */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:px-8">
              {/* Mission Text - Left Side */}
              <div className="text-left">
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8">
                  Our Mission
                </h2>
                <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                  Our mission at Aplexor is to act as a bridge between Sweden and the international market. We help Swedish companies scale abroad while enabling international companies to enter and grow in Sweden. Our focus is on ensuring that innovative technologies and solutions reach their full potential in the right markets. We believe that successful growth is built on strong partnerships, honesty, having a curious mind and delivering exceptional results.
                </p>
              </div>
              
              {/* Mission Image - Right Side */}
              <div className="hidden lg:flex justify-center lg:justify-end">
                <div className="w-full max-w-sm lg:max-w-md">
                  <img
                    src="/mission.jpg"
                    alt="Our Mission"
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Text Right, Image Left */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:px-8">
              {/* Story Image - Left Side */}
              <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="w-full max-w-sm lg:max-w-md">
                  <img
                    src="/story.jpg"
                    alt="Our Story"
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Story Text - Right Side */}
              <div className="text-left order-1 lg:order-2 lg:pl-16 lg:-mt-2">
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8">
                  Our Story
                </h2>
                <div className="space-y-4 md:space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Aplexor was founded in 2025 with the realization that too many brilliant innovations are struggling to reach their market potential, not because of product limitations, but due to sales and distribution challenges. We decided to combine technical expertise with sales methodologies to act as a one-stop-shop for sales development for Deeptech SMEs. Our approach focuses on building long-term partnerships and delivering measurable results across both Swedish and international markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-2 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
                Our People
              </h2>
              <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Meet the individuals who work on delivering exceptional services to our partners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center lg:hover:shadow-lg transition-shadow duration-300 border-2">
                  <CardContent className="p-3 md:p-8">
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto mb-3 md:mb-6 overflow-hidden">
                      <img
                        src={member.image as string}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-heading text-base md:text-xl font-semibold text-foreground mb-1 md:mb-2">
                      {member.name}
                    </h3>
                    <p className="font-body text-sm md:text-base text-primary font-medium mb-1 md:mb-2">
                      {member.role}
                    </p>
                    <p className="font-body text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                        {member.email}
                      </a>
                    </p>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors mb-3"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-heading text-xs font-semibold text-primary mb-2">
                        Business areas
                      </h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.name === "Alexander Engman" ? (
                          <>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Electronics</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Medical</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Materials</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Cleantech</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Consumer</Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Medical</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Aerospace</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Industrial</Badge>
                            <Badge variant="outline" className="text-xs bg-white text-black border-gray-300 font-normal">Defense</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-muted to-muted/80 border-t border-border">
        <div className="container mx-auto px-4">
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
              <Card key={index} className="text-center lg:hover:shadow-lg transition-shadow duration-300 border-2">
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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services, approach, and how we work with our partners.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What are the deliverables of a project with Aplexor?",
                  answer: (
                    <>
                      Our deliverables vary based on the engagement model. We tailor our deliverables to meet your specific business objectives and growth targets. Our process involves Discovery, Strategy, Execution and Scale. The outcome will depend on which activity is relevant for you. We always discuss expectations before any collaboration. Learn more about{" "}
                      <Link to="/services#process" className="text-primary hover:underline font-semibold">
                        our process
                      </Link>
                      .
                    </>
                  )
                },
                {
                  question: "What types of Deeptech products do you work with?",
                  answer: (
                    <>
                      We work with a wide range of Deeptech products. Our team has experience across multiple sectors including electronics, medical devices, novel materials, mechantronics and more. We also have a network expert available for other areas. View{" "}
                      <Link to="/services#industries" className="text-primary hover:underline font-semibold">
                        industries covered
                      </Link>
                      .
                    </>
                  )
                },
                {
                  question: "How do you charge for your services?",
                  answer: (
                    <>
                      Our pricing structure varies depending on the scope of work and client needs.{" "}
                      <Link to="/contact" className="text-primary hover:underline font-semibold">
                        Contact us
                      </Link>
                      {" "}to discuss the best approach for your specific situation.
                    </>
                  )
                },
                {
                  question: "How quickly can you start working on my project?",
                  answer: (
                    <>
                      We can typically begin initial discovery and strategy development within 2 weeks of signing an agreement. The timeline depends on project complexity and our current capacity.{" "}
                      <Link to="/contact" className="text-primary hover:underline font-semibold">
                        Contact us
                      </Link>
                      {" "}to discuss your project timeline.
                    </>
                  )
                },
                {
                  question: "What markets do you serve?",
                  answer: "We primarily focus on the Swedish market with strong capabilities for both helping Swedish companies expand internationally and assisting international companies enter Sweden. Our understanding of Swedish business culture allows us to provide localized support."
                },
                {
                  question: "What makes Aplexor different from other sales agencies?",
                  answer: "Our unique combination of technical engineering expertise and proven sales capabilities sets us apart. As engineers at heart, we understand the complexity of deeptech products, which allows us to effectively communicate their value and navigate technical sales processes. We focus on building long-term partnerships and delivering measurable results, not just generating leads."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-heading text-lg font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
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
