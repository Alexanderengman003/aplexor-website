import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Users, DollarSign, Calendar } from "lucide-react";

// Mock data
const mockAccounts = [
  {
    id: 1,
    name: "TechFlow AB",
    industry: "Technology",
    location: "Stockholm, Sweden",
    employees: 250,
    revenue: "€15M",
    status: "active",
    tier: "Enterprise",
    lastActivity: "2024-01-15",
    contacts: 3,
    deals: [
      { name: "Server Upgrade Project", value: "€45K", stage: "Negotiation" },
      { name: "Network Infrastructure", value: "€78K", stage: "Proposal" }
    ]
  },
  {
    id: 2,
    name: "Nordic Data Solutions",
    industry: "Data Analytics",
    location: "Oslo, Norway",
    employees: 180,
    revenue: "€12M",
    status: "active",
    tier: "Premium",
    lastActivity: "2024-01-12",
    contacts: 2,
    deals: [
      { name: "Analytics Platform", value: "€95K", stage: "Closed Won" }
    ]
  },
  {
    id: 3,
    name: "Danish Tech Group",
    industry: "Software Development",
    location: "Copenhagen, Denmark",
    employees: 320,
    revenue: "€22M",
    status: "prospect",
    tier: "Enterprise",
    lastActivity: "2024-01-10",
    contacts: 1,
    deals: [
      { name: "Cloud Migration", value: "€120K", stage: "Discovery" }
    ]
  },
  {
    id: 4,
    name: "Finnish Systems Oy",
    industry: "IT Services",
    location: "Helsinki, Finland",
    employees: 150,
    revenue: "€8M",
    status: "active",
    tier: "Standard",
    lastActivity: "2024-01-08",
    contacts: 2,
    deals: []
  },
  {
    id: 5,
    name: "IceTech Solutions",
    industry: "Renewable Energy",
    location: "Reykjavik, Iceland",
    employees: 75,
    revenue: "€5M",
    status: "inactive",
    tier: "Standard",
    lastActivity: "2023-12-20",
    contacts: 1,
    deals: []
  }
];

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<typeof mockAccounts[0] | null>(null);

  const filteredAccounts = mockAccounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "prospect": return "bg-blue-100 text-blue-800 border-blue-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Enterprise": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Premium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Standard": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage your customer accounts and organizations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Accounts List */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAccount?.id === account.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedAccount(account)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-foreground">{account.name}</h3>
                          <Badge className={getTierColor(account.tier)}>
                            {account.tier}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{account.industry}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{account.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{account.employees} employees</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>{account.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(account.status)}>
                          {account.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {account.contacts} contacts
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Details */}
        {selectedAccount && (
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedAccount.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAccount.industry}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedAccount.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedAccount.employees} employees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedAccount.revenue} annual revenue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last activity: {selectedAccount.lastActivity}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Badge className={getStatusColor(selectedAccount.status)}>
                    {selectedAccount.status}
                  </Badge>
                  <Badge className={getTierColor(selectedAccount.tier)}>
                    {selectedAccount.tier}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contacts ({selectedAccount.contacts})</h4>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Contacts
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Active Deals ({selectedAccount.deals.length})</h4>
                  {selectedAccount.deals.length > 0 ? (
                    <div className="space-y-2">
                      {selectedAccount.deals.map((deal, index) => (
                        <div key={index} className="p-2 bg-muted/50 rounded text-sm">
                          <div className="font-medium">{deal.name}</div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>{deal.value}</span>
                            <span>{deal.stage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No active deals</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button size="sm" className="w-full">
                    Create Deal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}