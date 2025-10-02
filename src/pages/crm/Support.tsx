import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Filter, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  Building2,
  Tag,
  Calendar,
  MessageSquare,
  Settings,
  ArrowUp
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ticketStatuses = [
  { status: "open", label: "Open", icon: AlertCircle, color: "bg-red-500" },
  { status: "in-progress", label: "In Progress", icon: Clock, color: "bg-yellow-500" },
  { status: "resolved", label: "Resolved", icon: CheckCircle, color: "bg-green-500" },
  { status: "closed", label: "Closed", icon: XCircle, color: "bg-gray-500" }
];

const priorities = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-orange-600" },
  { value: "critical", label: "Critical", color: "text-red-600" }
];

const mockTickets = [
  {
    id: "TK-001",
    title: "IoT Sensor connectivity issues in harsh Nordic conditions",
    description: "Customer reports intermittent connectivity with IoT sensors when temperatures drop below -20°C. Affecting 45 units at Ericsson's Kiruna facility.",
    status: "open",
    priority: "high",
    customer: "Ericsson AB",
    contact: "Lars Andersson",
    assignee: "Technical Support",
    created: "2024-01-15",
    updated: "2024-01-15",
    slaTarget: "2024-01-17",
    category: "Technical",
    region: "Sweden",
    hardwareType: "IoT Sensors",
    comments: 3
  },
  {
    id: "TK-002", 
    title: "Feature request: Norwegian language support",
    description: "Request to add Norwegian language support to the device configuration interface. Customer has 200+ technicians who prefer Norwegian interface.",
    status: "in-progress",
    priority: "medium",
    customer: "Telenor ASA",
    contact: "Nina Bergström",
    assignee: "Product Team",
    created: "2024-01-12",
    updated: "2024-01-14",
    slaTarget: "2024-01-26",
    category: "Feature Request",
    region: "Norway",
    hardwareType: "Industrial Controllers",
    comments: 8
  },
  {
    id: "TK-003",
    title: "Billing inquiry: Discrepancy in quarterly invoice",
    description: "Customer reports discrepancy in Q4 2023 invoice. Expected discount for volume purchase not applied correctly. Invoice #INV-2023-Q4-1247.",
    status: "resolved",
    priority: "medium",
    customer: "TDC Group",
    contact: "Henrik Larsen",
    assignee: "Finance Team",
    created: "2024-01-10",
    updated: "2024-01-13",
    slaTarget: "2024-01-24",
    category: "Billing",
    region: "Denmark",
    hardwareType: "Consumer Electronics",
    comments: 12
  },
  {
    id: "TK-004",
    title: "GDPR compliance documentation request",
    description: "Customer requests updated GDPR compliance documentation for their legal review. Needs Finnish translation for local compliance team.",
    status: "in-progress",
    priority: "high",
    customer: "Nokia Corporation",
    contact: "Mikko Virtanen",
    assignee: "Legal Team",
    created: "2024-01-08",
    updated: "2024-01-11",
    slaTarget: "2024-01-15",
    category: "Legal",
    region: "Finland",
    hardwareType: "IoT Sensors",
    comments: 5
  },
  {
    id: "TK-005",
    title: "Training session request for new product line",
    description: "Customer requests on-site training for their technical team on the new industrial automation product line. 15 technicians need certification.",
    status: "open",
    priority: "low",
    customer: "Marel",
    contact: "Björn Einarsson",
    assignee: "Training Team",
    created: "2024-01-05",
    updated: "2024-01-05",
    slaTarget: "2024-01-19",
    category: "Training",
    region: "Iceland",
    hardwareType: "Industrial Controllers",
    comments: 1
  }
];

const slaMetrics = {
  totalTickets: 247,
  openTickets: 89,
  overdueTickets: 12,
  avgResolutionTime: "2.3 days",
  customerSatisfaction: 4.6
};

export function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || ticket.status === filterStatus;
    const matchesPriority = !filterPriority || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    const statusObj = ticketStatuses.find(s => s.status === status);
    return statusObj ? statusObj.icon : AlertCircle;
  };

  const getStatusColor = (status: string) => {
    const statusObj = ticketStatuses.find(s => s.status === status);
    return statusObj ? statusObj.color : "bg-gray-500";
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : "text-gray-600";
  };

  const getDaysUntilSLA = (slaTarget: string) => {
    const today = new Date();
    const target = new Date(slaTarget);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Support</h1>
          <p className="text-muted-foreground">Manage support tickets and customer success</p>
        </div>
        <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Input placeholder="Customer name" />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input placeholder="Contact name" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input placeholder="Brief description of the issue" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Detailed description of the issue" rows={4} />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <span className={priority.color}>{priority.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignee">Assign to</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="product">Product Team</SelectItem>
                      <SelectItem value="finance">Finance Team</SelectItem>
                      <SelectItem value="legal">Legal Team</SelectItem>
                      <SelectItem value="training">Training Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewTicketOpen(false)}>
                  Create Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* SLA Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">{slaMetrics.totalTickets}</div>
          <div className="text-sm text-muted-foreground">Total Tickets</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">{slaMetrics.openTickets}</div>
          <div className="text-sm text-muted-foreground">Open Tickets</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{slaMetrics.overdueTickets}</div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-foreground">{slaMetrics.avgResolutionTime}</div>
          <div className="text-sm text-muted-foreground">Avg Resolution</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{slaMetrics.customerSatisfaction}</div>
          <div className="text-sm text-muted-foreground">Satisfaction Score</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus || "all"} onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ticketStatuses.map((status) => (
              <SelectItem key={status.status} value={status.status}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterPriority || "all"} onValueChange={(value) => setFilterPriority(value === "all" ? null : value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {priorities.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                <span className={priority.color}>{priority.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tickets List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                const daysUntilSLA = getDaysUntilSLA(ticket.slaTarget);
                return (
                  <div
                    key={ticket.id}
                    className={`p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedTicket?.id === ticket.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-full ${getStatusColor(ticket.status)} text-white`}>
                          <StatusIcon className="h-3 w-3" />
                        </div>
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(ticket.priority)} border-current`}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {ticket.comments}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {ticket.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {ticket.customer}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="h-3 w-3" />
                        {ticket.contact}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        {ticket.category}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {daysUntilSLA > 0 ? `${daysUntilSLA} days left` : `${Math.abs(daysUntilSLA)} days overdue`}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {ticket.assignee}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Updated: {ticket.updated}
                      </span>
                    </div>
                    
                    {daysUntilSLA <= 1 && (
                      <div className="mt-2">
                        <div className={`h-1 rounded-full ${daysUntilSLA < 0 ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Ticket Details Panel */}
        {selectedTicket && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">{selectedTicket.id}</span>
                <Badge 
                  variant="outline" 
                  className={`${getPriorityColor(selectedTicket.priority)} border-current`}
                >
                  {selectedTicket.priority}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-1">{selectedTicket.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full ${getStatusColor(selectedTicket.status)} text-white`}>
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedTicket.status);
                        return <StatusIcon className="h-3 w-3" />;
                      })()}
                    </div>
                    <span className="font-medium text-foreground capitalize">
                      {selectedTicket.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium text-foreground">{selectedTicket.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium text-foreground">{selectedTicket.contact}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Region</p>
                    <p className="font-medium text-foreground">{selectedTicket.region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">{selectedTicket.category}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Hardware Type</p>
                  <p className="font-medium text-foreground">{selectedTicket.hardwareType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Assigned to</p>
                  <Badge variant="secondary">{selectedTicket.assignee}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium text-foreground">{selectedTicket.created}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Updated</p>
                    <p className="font-medium text-foreground">{selectedTicket.updated}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">SLA Target</p>
                  <p className={`font-medium ${
                    getDaysUntilSLA(selectedTicket.slaTarget) < 0 ? 'text-red-600' : 
                    getDaysUntilSLA(selectedTicket.slaTarget) <= 1 ? 'text-yellow-600' : 'text-foreground'
                  }`}>
                    {selectedTicket.slaTarget}
                    {getDaysUntilSLA(selectedTicket.slaTarget) < 0 && ' (Overdue)'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Comments</p>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{selectedTicket.comments}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button className="w-full flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Update status
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Add comment
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  Escalate
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}