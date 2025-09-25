import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours."
      });
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      label: "Email",
      value: "hello@aplexor.com",
      link: "mailto:hello@aplexor.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <Linkedin className="w-6 h-6 text-primary" />,
      label: "LinkedIn",
      value: "linkedin.com/company/aplexor",
      link: "https://linkedin.com/company/aplexor"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      label: "Location",
      value: "San Francisco, CA",
      link: null
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Talk
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Ready to accelerate your hardware sales? Get in touch with our team to discuss how we can help bring your products to market.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-bold text-foreground">
                  Submit Your Product
                </CardTitle>
                <p className="font-body text-muted-foreground">
                  Tell us about your hardware product and how we can help you grow your sales.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-body font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="font-body font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-body font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-body font-medium">
                      Message / Product Description *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 min-h-32"
                      placeholder="Tell us about your hardware product, target market, and how we can help..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-heading font-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="lg:pl-8">
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Get In Touch
                </h2>
                <p className="font-body text-muted-foreground mb-6">
                  Have questions about our services or want to discuss a potential partnership? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {item.icon}
                    <div className="ml-4">
                      <p className="font-body font-medium text-foreground">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="font-body text-muted-foreground hover:text-primary transition-colors"
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-muted-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  Response Time
                </h3>
                <p className="font-body text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
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
                answer: "Yes, we have experience helping clients enter both domestic and international markets. Our network includes partners and distributors across North America, Europe, and Asia-Pacific regions."
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
    </Layout>
  );
};

export default Contact;