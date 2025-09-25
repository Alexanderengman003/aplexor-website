import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CalendlyWidget from "./CalendlyWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <CalendlyWidget />
    </div>
  );
};

export default Layout;