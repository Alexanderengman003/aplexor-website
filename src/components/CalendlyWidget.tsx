import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyWidget = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    const checkCalendly = () => {
      if (typeof (window as any).Calendly !== 'undefined') {
        setCalendlyLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkCalendly, 100);
      }
    };
    checkCalendly();
  }, []);

  const openCalendly = () => {
    if (calendlyLoaded && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/alexander-engman-aplexor/30min'});
    } else {
      console.warn('Calendly not loaded yet');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      <Button
        onClick={openCalendly}
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 pointer-events-auto"
        disabled={!calendlyLoaded}
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book Meeting
      </Button>
    </div>
  );
};

export default CalendlyWidget;