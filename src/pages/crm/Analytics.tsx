import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  DollarSign, 
  Target,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const performanceMetrics = [
  {
    title: "Revenue YTD",
    value: "€8.2M",
    change: "+18.5%",
    trend: "up",
    target: "€10M",
    progress: 82
  },
  {
    title: "New Accounts",
    value: "147",
    change: "+12.8%", 
    trend: "up",
    target: "200",
    progress: 73.5
  },
  {
    title: "Win Rate",
    value: "67%",
    change: "+5.2%",
    trend: "up",
    target: "70%",
    progress: 95.7
  },
  {
    title: "Avg Deal Size",
    value: "€187K",
    change: "-3.1%",
    trend: "down",
    target: "€200K",
    progress: 93.5
  }
];

const regionPerformance = [
  {
    region: "Sweden",
    revenue: 3200000,
    deals: 89,
    winRate: 72,
    avgDealSize: 185000,
    growth: 15.2,
    marketShare: 28.5
  },
  {
    region: "Norway", 
    revenue: 2100000,
    deals: 67,
    winRate: 68,
    avgDealSize: 165000,
    growth: 22.8,
    marketShare: 18.7
  },
  {
    region: "Denmark",
    revenue: 1800000,
    deals: 45,
    winRate: 64,
    avgDealSize: 142000,
    growth: 8.9,
    marketShare: 15.2
  },
  {
    region: "Finland",
    revenue: 897000,
    deals: 32,
    winRate: 59,
    avgDealSize: 128000,
    growth: 31.4,
    marketShare: 12.1
  },
  {
    region: "Iceland",
    revenue: 203000,
    deals: 14,
    winRate: 61,
    avgDealSize: 95000,
    growth: 45.7,
    marketShare: 8.9
  }
];

const industryAnalysis = [
  {
    industry: "Telecommunications",
    revenue: 4200000,
    deals: 78,
    avgDealSize: 298000,
    growth: 18.5,
    share: 51.2
  },
  {
    industry: "Industrial Automation",
    revenue: 2100000,
    deals: 89,
    avgDealSize: 156000,
    growth: 24.1,
    share: 25.6
  },
  {
    industry: "Consumer Electronics",
    revenue: 1200000,
    deals: 67,
    avgDealSize: 95000,
    growth: 12.8,
    share: 14.6
  },
  {
    industry: "Healthcare Technology",
    revenue: 450000,
    deals: 23,
    avgDealSize: 187000,
    growth: 38.9,
    share: 5.5
  },
  {
    industry: "Food Processing",
    revenue: 250000,
    deals: 12,
    avgDealSize: 125000,
    growth: 15.2,
    share: 3.1
  }
];

const hardwareCategories = [
  {
    category: "IoT Sensors",
    revenue: 3800000,
    units: 15420,
    avgPrice: 246,
    growth: 28.5,
    margin: 45.2
  },
  {
    category: "Industrial Controllers", 
    revenue: 2600000,
    units: 8950,
    avgPrice: 290,
    growth: 15.8,
    margin: 52.1
  },
  {
    category: "Consumer Electronics",
    revenue: 1400000,
    units: 28750,
    avgPrice: 49,
    growth: 8.9,
    margin: 28.7
  },
  {
    category: "Communication Modules",
    revenue: 400000,
    units: 2100,
    avgPrice: 190,
    growth: 42.1,
    margin: 38.9
  }
];

const pipelineAnalysis = [
  { stage: "Prospecting", count: 45, value: 2100000, avgDays: 14, conversionRate: 71 },
  { stage: "Qualified", count: 32, value: 1800000, avgDays: 18, conversionRate: 56 },
  { stage: "Proposal", count: 18, value: 1200000, avgDays: 22, conversionRate: 67 },
  { stage: "Negotiation", count: 12, value: 950000, avgDays: 28, conversionRate: 75 },
  { stage: "Closed Won", count: 8, value: 650000, avgDays: 0, conversionRate: 100 }
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Market Analysis & Reporting</h1>
          <p className="text-muted-foreground">Nordic market insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="q1-2024">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
              <div className="flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target: {metric.target}</span>
                <span className="font-medium">{metric.progress}%</span>
              </div>
              <Progress value={metric.progress} className="h-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* Regional Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Regional Performance Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-medium text-foreground">Region</th>
                <th className="text-right p-2 font-medium text-foreground">Revenue</th>
                <th className="text-right p-2 font-medium text-foreground">Deals</th>
                <th className="text-right p-2 font-medium text-foreground">Win Rate</th>
                <th className="text-right p-2 font-medium text-foreground">Avg Deal Size</th>
                <th className="text-right p-2 font-medium text-foreground">Growth</th>
                <th className="text-right p-2 font-medium text-foreground">Market Share</th>
              </tr>
            </thead>
            <tbody>
              {regionPerformance.map((region) => (
                <tr key={region.region} className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">{region.region}</td>
                  <td className="p-2 text-right text-foreground">€{(region.revenue / 1000000).toFixed(1)}M</td>
                  <td className="p-2 text-right text-foreground">{region.deals}</td>
                  <td className="p-2 text-right text-foreground">{region.winRate}%</td>
                  <td className="p-2 text-right text-foreground">€{(region.avgDealSize / 1000).toFixed(0)}K</td>
                  <td className="p-2 text-right">
                    <span className={`font-medium ${region.growth > 20 ? 'text-green-600' : region.growth > 10 ? 'text-yellow-600' : 'text-foreground'}`}>
                      +{region.growth}%
                    </span>
                  </td>
                  <td className="p-2 text-right text-foreground">{region.marketShare}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Industry and Hardware Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Industry Breakdown
          </h3>
          <div className="space-y-4">
            {industryAnalysis.map((industry) => (
              <div key={industry.industry} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{industry.industry}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      €{(industry.revenue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {industry.deals} deals
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: €{(industry.avgDealSize / 1000).toFixed(0)}K</span>
                  <span className="text-green-600">+{industry.growth}%</span>
                </div>
                <Progress value={industry.share} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Hardware Category Performance
          </h3>
          <div className="space-y-4">
            {hardwareCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{category.category}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      €{(category.revenue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category.units.toLocaleString()} units
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>€{category.avgPrice}/unit • {category.margin}% margin</span>
                  <span className="text-green-600">+{category.growth}%</span>
                </div>
                <Progress value={(category.revenue / 4000000) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pipeline Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Sales Pipeline Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pipelineAnalysis.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <Card className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-foreground mb-2">{stage.stage}</h4>
                  <div className="text-2xl font-bold text-foreground mb-1">{stage.count}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    €{(stage.value / 1000000).toFixed(1)}M
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      Avg: {stage.avgDays} days
                    </div>
                    <div className="text-xs">
                      <span className="text-green-600">{stage.conversionRate}%</span>
                      <span className="text-muted-foreground"> conversion</span>
                    </div>
                  </div>
                </div>
              </Card>
              {index < pipelineAnalysis.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="w-4 h-0.5 bg-border"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Market Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Nordic Market Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Key Trends</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 5G infrastructure driving IoT sensor demand (+28%)</li>
              <li>• Industrial automation growing fastest in Finland (+31%)</li>
              <li>• Consumer electronics stabilizing in Denmark</li>
              <li>• Healthcare tech emerging as growth sector (+39%)</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Opportunities</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Iceland market showing 45% growth potential</li>
              <li>• Telecom partnerships expanding in Norway</li>
              <li>• Green tech initiatives across all regions</li>
              <li>• Enterprise IoT adoption accelerating</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Challenges</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Supply chain constraints in Q4</li>
              <li>• Increasing competition in consumer segment</li>
              <li>• Regulatory compliance complexity</li>
              <li>• Currency fluctuation impact on pricing</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}