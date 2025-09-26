import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Globe, 
  Database,
  Mail,
  Calendar,
  Zap,
  Users,
  Settings as SettingsIcon,
  Save,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const userRoles = [
  { value: "admin", label: "Administrator", description: "Full system access" },
  { value: "manager", label: "Sales Manager", description: "Team and pipeline management" },
  { value: "rep", label: "Sales Representative", description: "Basic CRM access" },
  { value: "support", label: "Support Agent", description: "Customer support access" },
  { value: "viewer", label: "Viewer", description: "Read-only access" }
];

const languages = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "sv", label: "Svenska", flag: "🇸🇪" },
  { value: "no", label: "Norsk", flag: "🇳🇴" },
  { value: "da", label: "Dansk", flag: "🇩🇰" },
  { value: "fi", label: "Suomi", flag: "🇫🇮" },
  { value: "is", label: "Íslenska", flag: "🇮🇸" }
];

const timezones = [
  { value: "Europe/Stockholm", label: "Stockholm (CET)" },
  { value: "Europe/Oslo", label: "Oslo (CET)" },
  { value: "Europe/Copenhagen", label: "Copenhagen (CET)" },
  { value: "Europe/Helsinki", label: "Helsinki (EET)" },
  { value: "Atlantic/Reykjavik", label: "Reykjavik (GMT)" }
];

const integrations = [
  {
    name: "Microsoft Outlook",
    description: "Sync calendar and email activities",
    status: "connected",
    icon: Mail,
    lastSync: "2024-01-15 14:30"
  },
  {
    name: "Google Workspace",
    description: "Access Gmail and Google Calendar",
    status: "available",
    icon: Calendar,
    lastSync: null
  },
  {
    name: "LinkedIn Sales Navigator",
    description: "Import prospect data and insights",
    status: "connected",
    icon: Users,
    lastSync: "2024-01-15 09:15"
  },
  {
    name: "Microsoft Teams",
    description: "Schedule and track team meetings",
    status: "available",
    icon: User,
    lastSync: null
  },
  {
    name: "SharePoint",
    description: "Document storage and collaboration",
    status: "connected",
    icon: Database,
    lastSync: "2024-01-15 12:00"
  }
];

const mockUsers = [
  {
    id: 1,
    name: "Alexander Engman",
    email: "alexander@aplexor.com",
    role: "admin",
    region: "Sweden",
    status: "active",
    lastLogin: "2024-01-15"
  },
  {
    id: 2,
    name: "Nina Bergström",
    email: "nina@aplexor.com",
    role: "manager",
    region: "Norway",
    status: "active",
    lastLogin: "2024-01-14"
  },
  {
    id: 3,
    name: "Henrik Larsen",
    email: "henrik@aplexor.com",
    role: "rep",
    region: "Denmark",
    status: "active",
    lastLogin: "2024-01-13"
  },
  {
    id: 4,
    name: "Mikko Virtanen",
    email: "mikko@aplexor.com",
    role: "rep",
    region: "Finland",
    status: "inactive",
    lastLogin: "2024-01-10"
  }
];

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dealUpdates: true,
    taskReminders: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const [gdprSettings, setGdprSettings] = useState({
    dataRetention: "36",
    consentTracking: true,
    rightToDelete: true,
    dataExport: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your CRM configuration and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Alexander Engman" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="alexander@aplexor.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+46 70 123 4567" />
                </div>
                
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="CEO & Founder" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Aplexor AB" />
                </div>
                
                <div>
                  <Label htmlFor="region">Primary Region</Label>
                  <Select defaultValue="sweden">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweden">Sweden</SelectItem>
                      <SelectItem value="norway">Norway</SelectItem>
                      <SelectItem value="denmark">Denmark</SelectItem>
                      <SelectItem value="finland">Finland</SelectItem>
                      <SelectItem value="iceland">Iceland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="Europe/Stockholm">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={3}
                    defaultValue="Hardware solutions expert with 15+ years experience in Nordic markets. Specializing in IoT, industrial automation, and telecommunications."
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Email Alerts</h4>
                  <p className="text-sm text-muted-foreground">Receive important system notifications via email</p>
                </div>
                <Switch 
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Deal Updates</h4>
                  <p className="text-sm text-muted-foreground">Get notified when deals change status</p>
                </div>
                <Switch 
                  checked={notifications.dealUpdates}
                  onCheckedChange={(checked) => setNotifications({...notifications, dealUpdates: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Task Reminders</h4>
                  <p className="text-sm text-muted-foreground">Reminders for overdue tasks and follow-ups</p>
                </div>
                <Switch 
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, taskReminders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Weekly Reports</h4>
                  <p className="text-sm text-muted-foreground">Automated weekly performance summaries</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">Product updates and marketing communications</p>
                </div>
                <Switch 
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Third-party Integrations</h3>
            </div>
            
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <integration.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={integration.status === "connected" ? "default" : "secondary"}
                    >
                      {integration.status}
                    </Badge>
                    <Button 
                      variant={integration.status === "connected" ? "outline" : "default"}
                      size="sm"
                    >
                      {integration.status === "connected" ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              </div>
              <Button>
                <User className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline">
                        {userRoles.find(r => r.value === user.role)?.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{user.region}</p>
                    </div>
                    <Badge 
                      variant={user.status === "active" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">Edit</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {user.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Security & GDPR Compliance</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Data Retention</h4>
                <div className="flex items-center gap-4">
                  <Label htmlFor="retention">Delete inactive data after:</Label>
                  <Select 
                    value={gdprSettings.dataRetention}
                    onValueChange={(value) => setGdprSettings({...gdprSettings, dataRetention: value})}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Consent Tracking</h4>
                  <p className="text-sm text-muted-foreground">Track and manage customer consent</p>
                </div>
                <Switch 
                  checked={gdprSettings.consentTracking}
                  onCheckedChange={(checked) => setGdprSettings({...gdprSettings, consentTracking: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Right to Delete</h4>
                  <p className="text-sm text-muted-foreground">Allow customers to request data deletion</p>
                </div>
                <Switch 
                  checked={gdprSettings.rightToDelete}
                  onCheckedChange={(checked) => setGdprSettings({...gdprSettings, rightToDelete: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Data Export</h4>
                  <p className="text-sm text-muted-foreground">Enable customer data export requests</p>
                </div>
                <Switch 
                  checked={gdprSettings.dataExport}
                  onCheckedChange={(checked) => setGdprSettings({...gdprSettings, dataExport: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Audit Logs</h4>
                <p className="text-sm text-muted-foreground">
                  All user actions are automatically logged for compliance. 
                  Logs are retained for 7 years as required by Nordic regulations.
                </p>
                <Button variant="outline" size="sm">
                  View Audit Logs
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Language & Localization</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="sek">SEK (kr)</SelectItem>
                      <SelectItem value="nok">NOK (kr)</SelectItem>
                      <SelectItem value="dkk">DKK (kr)</SelectItem>
                      <SelectItem value="isk">ISK (kr)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Nordic Holiday Calendars</Label>
                  <div className="space-y-2 mt-2">
                    {["Sweden", "Norway", "Denmark", "Finland", "Iceland"].map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <label className="text-sm text-foreground">{country}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="09:00" className="w-20" />
                    <span className="text-muted-foreground">to</span>
                    <Input defaultValue="17:00" className="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Pipeline Configuration</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm text-foreground">Prospecting → Qualified</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm text-foreground">Qualified → Proposal</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm text-foreground">Proposal → Negotiation</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Lead Assignment Rules</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Auto-assign by region</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Round-robin distribution</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Company size based assignment</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Automation Settings</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="followup-days">Send follow-up reminders after:</Label>
                    <div className="flex items-center gap-2">
                      <Input defaultValue="14" className="w-20" />
                      <span className="text-sm text-muted-foreground">days of inactivity</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sla-hours">Support ticket SLA:</Label>
                    <div className="flex items-center gap-2">
                      <Input defaultValue="24" className="w-20" />
                      <span className="text-sm text-muted-foreground">hours for first response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}