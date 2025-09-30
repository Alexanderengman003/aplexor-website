import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import CtaBanner from "@/components/CtaBanner";
import ProcessSection from "@/components/ProcessSection";
import { UserSearch, Layers, Search, Eye, ArrowLeft } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Discovery = () => {
  const services = [
    {
      icon: <UserSearch className="w-12 h-12 text-primary" />,
      title: "Customer Needs Mapping",
      description: "Identify unmet needs that inform product design and go-to-market strategy.",
      details: [
        "In-depth customer interviews to surface pain points and unmet needs",
        "Quantitative surveys and data analysis to validate and size customer demand",
        "Customer journey mapping to identify challenges and opportunities",
        "Competitive needs analysis to uncover market gaps"
      ]
    },
    {
      icon: <Layers className="w-12 h-12 text-primary" />,
      title: "Market Segmentation & Prioritization",
      description: "Prioritize high-value segments to maximize ROI.",
      details: [
        "Market sizing and potential assessment to quantify opportunities",
        "Customer segmentation and profiling based on needs, behavior, and value",
        "Priority matrix development to guide market entry sequencing",
        "Recommendations on how to focus investments where they matter most"
      ]
    },
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: "Opportunity Assessment & Engagement",
      description: "Build a qualified pipeline that accelerates sales.",
      details: [
        "Prospect identification and database building of high-value targets",
        "Lead scoring and qualification frameworks to rank prospects objectively",
        "Partner and distributor evaluation to ensure strategic alignment",
        "Pipeline prioritization and ranking for efficient sales focus"
      ]
    },
    {
      icon: <Eye className="w-12 h-12 text-primary" />,
      title: "Market & Competition Insights", 
      description: "Evaluate initial interest and responsiveness from prospects to refine sales approach.",
      details: [
        "Engagement metrics tracking and analysis to measure effectiveness of outreach",
        "Response pattern identification to understand prospect behavior",
        "Sales approach optimization based on real-time insights",
        "Conversion funnel analysis to highlight drop-off points and improvement areas"
      ]
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
              Discovery
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              The discovery phase aims to analyze markets, map customers, partners and competitors, and validate the best opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-3 md:p-4 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    {service.icon}
                    <CardTitle className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="font-body text-sm md:text-base text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="font-body text-xs md:text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection currentStep="discovery" />

      <CtaBanner />

    </Layout>
  );
};

export default Discovery;
