import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendlyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = () => {
    (window as any).Calendly?.initPopupWidget({url: 'https://calendly.com/alexander-engman-aplexor/30min'});
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openCalendly}
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book Meeting
      </Button>
    </div>
  );
};

export default CalendlyWidget;