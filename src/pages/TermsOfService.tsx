import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TermsOfService = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These terms govern your use of our services. Please read them carefully.
          </p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                1. Acceptance of Terms
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using Aplexor's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you and Aplexor regarding your use of our consulting services, website, and related offerings.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                2. Description of Services
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Aplexor provides business consulting services focused on helping hardware startups expand into Nordic markets. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Market discovery and analysis</li>
                    <li>Strategic planning and go-to-market strategies</li>
                    <li>Sales execution and channel development</li>
                    <li>Supporting services including partnership facilitation</li>
                  </ul>
                  <p>
                    Specific deliverables and timelines will be outlined in individual service agreements or statements of work.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                3. Client Responsibilities
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>As a client, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information necessary for service delivery</li>
                    <li>Respond to requests for information in a timely manner</li>
                    <li>Make agreed-upon payments according to the payment schedule</li>
                    <li>Maintain confidentiality of proprietary methodologies and insights shared by Aplexor</li>
                    <li>Use our services in compliance with all applicable laws and regulations</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                4. Payment Terms
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Payment terms will be specified in individual service agreements. Generally:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Invoices are due within 30 days of receipt unless otherwise specified</li>
                    <li>Late payments may incur additional fees as outlined in your service agreement</li>
                    <li>Services may be suspended for accounts with overdue payments</li>
                    <li>All prices are exclusive of applicable taxes unless stated otherwise</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                5. Intellectual Property
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Client IP:</strong> You retain ownership of your existing intellectual property and any IP developed independently during our engagement.
                  </p>
                  <p>
                    <strong>Aplexor IP:</strong> We retain ownership of our methodologies, frameworks, tools, and any general knowledge or insights not specifically created for your project.
                  </p>
                  <p>
                    <strong>Work Product:</strong> Deliverables created specifically for your project will be owned by you, subject to Aplexor's right to use general methodologies and learnings for future engagements.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                6. Confidentiality
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Both parties agree to maintain the confidentiality of proprietary information shared during the course of our engagement. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Business strategies, financial information, and trade secrets</li>
                    <li>Customer lists, pricing information, and market data</li>
                    <li>Technical specifications, product roadmaps, and development plans</li>
                    <li>Any other information marked as confidential or that would reasonably be considered confidential</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                7. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Aplexor's total liability for any claims arising from our services shall not exceed the total amount paid by the client for the specific services giving rise to the claim.
                  </p>
                  <p>
                    We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, business interruption, or loss of data.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                8. Termination
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Either party may terminate services with written notice as specified in the service agreement. Upon termination:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All unpaid fees for services performed become immediately due</li>
                    <li>Each party will return or destroy confidential information of the other party</li>
                    <li>Aplexor will deliver any completed work product to the client</li>
                    <li>Surviving provisions (confidentiality, payment obligations, etc.) will remain in effect</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                9. Governing Law
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of Sweden. Any disputes arising from these terms or our services shall be resolved through binding arbitration in Stockholm, Sweden, or as otherwise agreed by both parties.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                10. Changes to Terms
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                  </p>
                  <p>
                    For significant changes, we will make reasonable efforts to notify existing clients via email or other communication methods.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left text-xl font-semibold text-foreground hover:no-underline">
                11. Contact Information
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
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
            Last updated: September 25, 2025
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
