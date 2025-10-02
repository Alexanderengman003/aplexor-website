import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  FileText,
  Clock,
  User,
  Building2,
  Edit
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

const activityTypes = [
  { type: "call", label: "Call", icon: Phone, color: "bg-blue-500" },
  { type: "email", label: "Email", icon: Mail, color: "bg-green-500" },
  { type: "meeting", label: "Meeting", icon: CalendarIcon, color: "bg-purple-500" },
  { type: "note", label: "Note", icon: FileText, color: "bg-orange-500" }
];

const mockActivities = [
  {
    id: 1,
    type: "call",
    title: "Discovery call with Ericsson",
    description: "Discussed their IoT sensor requirements for Q2 deployment. They need 500 units with Nordic weather resistance.",
    contact: "Lars Andersson",
    account: "Ericsson AB",
    date: "2024-01-15",
    time: "14:30",
    duration: "45 min",
    outcome: "Positive",
    nextAction: "Send technical specifications",
    tags: ["discovery", "iot", "q2-deployment"]
  },
  {
    id: 2,
    type: "email",
    title: "Proposal sent to Telenor",
    description: "Sent comprehensive proposal for industrial controller upgrade project. Included Nordic compliance documentation.",
    contact: "Nina Bergström",
    account: "Telenor ASA",
    date: "2024-01-14",
    time: "10:15",
    duration: null,
    outcome: "Sent",
    nextAction: "Follow up in 3 days",
    tags: ["proposal", "industrial", "compliance"]
  },
  {
    id: 3,
    type: "meeting",
    title: "Technical review meeting",
    description: "In-person meeting at TDC offices in Copenhagen. Reviewed product roadmap and discussed localization requirements.",
    contact: "Henrik Larsen",
    account: "TDC Group",
    date: "2024-01-13",
    time: "13:00",
    duration: "2 hours",
    outcome: "Scheduled follow-up",
    nextAction: "Prepare localization timeline",
    tags: ["technical", "roadmap", "localization"]
  },
  {
    id: 4,
    type: "note",
    title: "Market research findings",
    description: "Analyzed Q4 Nordic hardware market trends. Consumer electronics segment showing 15% growth, particularly in Denmark and Finland.",
    contact: null,
    account: null,
    date: "2024-01-12",
    time: "16:45",
    duration: null,
    outcome: "Research completed",
    nextAction: "Share with sales team",
    tags: ["research", "market-trends", "consumer"]
  },
  {
    id: 5,
    type: "call",
    title: "Follow-up with Nokia",
    description: "Discussed partnership opportunities for their upcoming 5G infrastructure project. Need to align on delivery timelines.",
    contact: "Mikko Virtanen",
    account: "Nokia Corporation",
    date: "2024-01-11",
    time: "09:00",
    duration: "30 min",
    outcome: "Partnership interest",
    nextAction: "Schedule technical deep-dive",
    tags: ["partnership", "5g", "infrastructure"]
  }
];

export function Activities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<typeof mockActivities[0] | null>(null);
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false);

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (activity.contact && activity.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (activity.account && activity.account.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !filterType || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(t => t.type === type);
    return activityType ? activityType.icon : FileText;
  };

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find(t => t.type === type);
    return activityType ? activityType.color : "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground">Track all customer interactions</p>
        </div>
        <Dialog open={isNewActivityOpen} onOpenChange={setIsNewActivityOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log New Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.type} value={type.type}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input placeholder="Contact name" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Title</Label>
                <Input placeholder="Activity title" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Activity description" rows={3} />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input placeholder="30 min" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="outcome">Outcome</Label>
                <Input placeholder="Activity outcome" />
              </div>
              
              <div>
                <Label htmlFor="next-action">Next Action</Label>
                <Input placeholder="What's the next step?" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewActivityOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewActivityOpen(false)}>
                  Save Activity
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Activity Type Filter */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType(null)}
          >
            All
          </Button>
          {activityTypes.map((type) => (
            <Button
              key={type.type}
              variant={filterType === type.type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type.type === filterType ? null : type.type)}
            >
              <type.icon className="mr-1 h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Activities List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className={`p-4 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedActivity?.id === activity.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)} text-white`}>
                        <ActivityIcon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {activity.time}
                            {activity.duration && ` • ${activity.duration}`}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {activity.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {activity.contact && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                {activity.contact}
                              </div>
                            )}
                            {activity.account && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                {activity.account}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {activity.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {activity.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{activity.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Activity Details Panel */}
        {selectedActivity && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Activity Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${getActivityColor(selectedActivity.type)} text-white`}>
                  {(() => {
                    const ActivityIcon = getActivityIcon(selectedActivity.type);
                    return <ActivityIcon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{selectedActivity.title}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{selectedActivity.type}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm text-foreground">{selectedActivity.description}</p>
                </div>
                
                {selectedActivity.contact && (
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium text-foreground">{selectedActivity.contact}</p>
                  </div>
                )}
                
                {selectedActivity.account && (
                  <div>
                    <p className="text-sm text-muted-foreground">Account</p>
                    <p className="font-medium text-foreground">{selectedActivity.account}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{selectedActivity.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium text-foreground">{selectedActivity.time}</p>
                  </div>
                </div>
                
                {selectedActivity.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{selectedActivity.duration}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-muted-foreground">Outcome</p>
                  <Badge variant="outline">{selectedActivity.outcome}</Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Next Action</p>
                  <p className="font-medium text-foreground">{selectedActivity.nextAction}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedActivity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button className="w-full mb-2 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit activity
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create follow-up
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}