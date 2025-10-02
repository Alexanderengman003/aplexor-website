import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const ServiceCard = ({ icon, title, description, details }: ServiceCardProps) => {
  return (
    <Card className="pl-2 pr-3 py-3 md:p-4 lg:hover:shadow-lg transition-shadow duration-300 border-2">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
          <CardTitle className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="ml-9">
          <p className="font-body text-sm md:text-base text-muted-foreground mb-4">
            {description}
          </p>
          <ul className="space-y-2">
            {details.map((detail, detailIndex) => (
              <li key={detailIndex} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="font-body text-xs md:text-sm text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
