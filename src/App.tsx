import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Discovery from "./pages/services/Discovery";
import Strategy from "./pages/services/Strategy";
import Execution from "./pages/services/Execution";
import Supporting from "./pages/services/Supporting";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Portal from "./pages/Portal";
import SiteAnalytics from "./pages/SiteAnalytics";
import { Dashboard } from "./pages/crm/Dashboard";
import Contacts from "./pages/crm/Contacts";
import Accounts from "./pages/crm/Accounts";
import { Pipeline } from "./pages/crm/Pipeline";
import { Activities } from "./pages/crm/Activities";
import { Quotes } from "./pages/crm/Quotes";
import { Orders } from "./pages/crm/Orders";
import Products from "./pages/crm/Products";
import { Support } from "./pages/crm/Support";
import { Analytics } from "./pages/crm/Analytics";
import { Settings } from "./pages/crm/Settings";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/discovery" element={<Discovery />} />
          <Route path="/services/strategy" element={<Strategy />} />
          <Route path="/services/execution" element={<Execution />} />
          <Route path="/services/supporting" element={<Supporting />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal/*" element={<Portal />} />
          <Route path="/analytics" element={<SiteAnalytics />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
