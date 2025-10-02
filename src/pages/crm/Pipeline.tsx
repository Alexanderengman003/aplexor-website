import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, MoreHorizontal, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pipelineStages = [
  { name: "Prospecting", deals: 45, value: 2100000, color: "bg-gray-500" },
  { name: "Qualified", deals: 32, value: 1800000, color: "bg-blue-500" },
  { name: "Proposal", deals: 18, value: 1200000, color: "bg-yellow-500" },
  { name: "Negotiation", deals: 12, value: 950000, color: "bg-orange-500" },
  { name: "Closed Won", deals: 8, value: 650000, color: "bg-green-500" },
  { name: "Closed Lost", deals: 6, value: 0, color: "bg-red-500" }
];

const mockDeals = [
  {
    id: 1,
    company: "Ericsson AB",
    contact: "Lars Andersson",
    value: 450000,
    stage: "Negotiation",
    probability: 75,
    region: "Sweden",
    lastActivity: "2024-01-15",
    dealSource: "Trade Show",
    industry: "Telecommunications",
    hardwareType: "IoT Sensors"
  },
  {
    id: 2,
    company: "Telenor ASA",
    contact: "Nina Bergström", 
    value: 320000,
    stage: "Proposal",
    probability: 60,
    region: "Norway",
    lastActivity: "2024-01-14",
    dealSource: "Referral",
    industry: "Telecommunications",
    hardwareType: "Industrial Controllers"
  },
  {
    id: 3,
    company: "TDC Group",
    contact: "Henrik Larsen",
    value: 185000,
    stage: "Qualified",
    probability: 40,
    region: "Denmark", 
    lastActivity: "2024-01-13",
    dealSource: "Inbound",
    industry: "Telecommunications",
    hardwareType: "Consumer Electronics"
  },
  {
    id: 4,
    company: "Nokia Corporation",
    contact: "Mikko Virtanen",
    value: 275000,
    stage: "Prospecting",
    probability: 20,
    region: "Finland",
    lastActivity: "2024-01-12",
    dealSource: "Outbound",
    industry: "Technology",
    hardwareType: "IoT Sensors"
  },
  {
    id: 5,
    company: "Marel",
    contact: "Björn Einarsson",
    value: 95000,
    stage: "Proposal",
    probability: 55,
    region: "Iceland",
    lastActivity: "2024-01-11",
    dealSource: "Trade Show",
    industry: "Food Processing",
    hardwareType: "Industrial Controllers"
  }
];

export function Pipeline() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<typeof mockDeals[0] | null>(null);

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = !selectedStage || deal.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-green-600";
    if (probability >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getStageColor = (stage: string) => {
    const stageObj = pipelineStages.find(s => s.name === stage);
    return stageObj?.color || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground">Nordic Market Opportunities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {pipelineStages.map((stage) => (
          <Card key={stage.name} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${stage.color}`} />
              <h3 className="font-medium text-sm text-foreground">{stage.name}</h3>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stage.deals}
            </div>
            <div className="text-sm text-muted-foreground">
              €{(stage.value / 1000).toFixed(0)}K
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {selectedStage || "All Stages"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedStage(null)}>
              All Stages
            </DropdownMenuItem>
            {pipelineStages.map((stage) => (
              <DropdownMenuItem
                key={stage.name}
                onClick={() => setSelectedStage(stage.name)}
              >
                {stage.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Deals List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              {filteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className={`p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedDeal?.id === deal.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedDeal(deal)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{deal.company}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                        <DropdownMenuItem>Add Activity</DropdownMenuItem>
                        <DropdownMenuItem>Change Stage</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium text-foreground">{deal.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="font-medium text-foreground">€{deal.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium text-foreground">{deal.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Probability</p>
                      <p className={`font-medium ${getProbabilityColor(deal.probability)}`}>
                        {deal.probability}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`${getStageColor(deal.stage)} text-white border-transparent`}
                    >
                      {deal.stage}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Last activity: {deal.lastActivity}
                    </span>
                  </div>
                  
                  <Progress value={deal.probability} className="mt-2 h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Deal Details Panel */}
        {selectedDeal && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Deal Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground text-lg">{selectedDeal.company}</h4>
                <p className="text-muted-foreground">{selectedDeal.contact}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Deal Value</p>
                  <p className="font-medium text-foreground">€{selectedDeal.value.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Probability</p>
                  <p className={`font-medium ${getProbabilityColor(selectedDeal.probability)}`}>
                    {selectedDeal.probability}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Stage</p>
                  <Badge variant="outline">{selectedDeal.stage}</Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium text-foreground">{selectedDeal.region}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-medium text-foreground">{selectedDeal.industry}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Hardware Type</p>
                  <p className="font-medium text-foreground">{selectedDeal.hardwareType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Lead Source</p>
                  <p className="font-medium text-foreground">{selectedDeal.dealSource}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium text-foreground">{selectedDeal.lastActivity}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button className="w-full mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Move to next stage
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add activity
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}