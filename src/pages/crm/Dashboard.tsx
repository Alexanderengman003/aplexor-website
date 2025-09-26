import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Building2, Package, DollarSign } from "lucide-react";

const dashboardMetrics = [
  {
    title: "Total Revenue",
    value: "€2,847,395",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Active Deals",
    value: "247",
    change: "+3.2%",
    trend: "up", 
    icon: Building2,
    color: "text-blue-600"
  },
  {
    title: "New Contacts",
    value: "1,429",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "text-purple-600"
  },
  {
    title: "Products Sold",
    value: "89",
    change: "+8.7%",
    trend: "up",
    icon: Package,
    color: "text-orange-600"
  }
];

const regionData = [
  { region: "Sweden", revenue: 1250000, deals: 89, progress: 85 },
  { region: "Norway", revenue: 875000, deals: 67, progress: 72 },
  { region: "Denmark", revenue: 425000, deals: 45, progress: 58 },
  { region: "Finland", revenue: 297395, deals: 32, progress: 45 },
  { region: "Iceland", revenue: 95000, deals: 14, progress: 28 }
];

const recentDeals = [
  {
    company: "Ericsson AB",
    contact: "Lars Andersson",
    value: "€450,000",
    stage: "Negotiation",
    probability: 75,
    region: "Sweden"
  },
  {
    company: "Telenor ASA", 
    contact: "Nina Bergström",
    value: "€320,000",
    stage: "Proposal",
    probability: 60,
    region: "Norway"
  },
  {
    company: "TDC Group",
    contact: "Henrik Larsen", 
    value: "€185,000",
    stage: "Qualified",
    probability: 40,
    region: "Denmark"
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Nordic Market Overview</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
                <div className="flex items-center mt-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Regional Performance
          </h3>
          <div className="space-y-4">
            {regionData.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">
                    {region.region}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      €{(region.revenue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {region.deals} deals
                    </div>
                  </div>
                </div>
                <Progress value={region.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent High-Value Deals
          </h3>
          <div className="space-y-4">
            {recentDeals.map((deal, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {deal.company}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {deal.contact} • {deal.region}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {deal.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {deal.stage}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {deal.probability}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}