import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                1. Information We Collect
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fill out our contact forms or request information about our services</li>
                    <li>Schedule meetings or consultations through our booking system</li>
                    <li>Subscribe to our newsletters or marketing communications</li>
                    <li>Participate in surveys or provide feedback</li>
                  </ul>
                  <p>
                    This information may include your name, email address, phone number, company name, job title, and any messages or comments you provide.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                2. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Schedule and manage consultations and meetings</li>
                    <li>Send you information about our services and industry insights</li>
                    <li>Improve our website and services based on your feedback</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                3. Information Sharing and Disclosure
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting business</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                4. Data Security
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                  <p>
                    We regularly review our security practices and update them as necessary to ensure the ongoing protection of your data.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                5. Your Rights and Choices
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of the information we have about you</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                6. Cookies and Tracking
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our website may use cookies and similar tracking technologies to enhance your experience. These technologies help us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve our website functionality and performance</li>
                  </ul>
                  <p>
                    You can control cookie settings through your browser preferences.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                7. Changes to This Policy
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                8. Contact Us
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p><strong>Aplexor</strong></p>
                    <p>Email: info@aplexor.com</p>
                    <p>LinkedIn: linkedin.com/company/aplexor</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Last updated: September 25, 2024
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
