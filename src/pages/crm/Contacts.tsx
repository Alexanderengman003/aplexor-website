import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, Building2 } from "lucide-react";

// Mock data
const mockContacts = [
  {
    id: 1,
    name: "Erik Larsson",
    email: "erik.larsson@techflow.se",
    phone: "+46 8 123 4567",
    company: "TechFlow AB",
    position: "CTO",
    status: "active",
    lastContact: "2024-01-15",
    tags: ["Premium", "Tech Partner"]
  },
  {
    id: 2,
    name: "Maria Andersson",
    email: "maria.andersson@nordicdata.no",
    phone: "+47 22 345 678",
    company: "Nordic Data Solutions",
    position: "Procurement Manager",
    status: "active",
    lastContact: "2024-01-12",
    tags: ["Enterprise", "Norway"]
  },
  {
    id: 3,
    name: "Hans Nielsen",
    email: "hans.nielsen@danishtech.dk",
    phone: "+45 33 456 789",
    company: "Danish Tech Group",
    position: "Head of IT",
    status: "prospect",
    lastContact: "2024-01-10",
    tags: ["Prospect", "Denmark"]
  },
  {
    id: 4,
    name: "Anna Virtanen",
    email: "anna.virtanen@finnishsystems.fi",
    phone: "+358 9 567 890",
    company: "Finnish Systems Oy",
    position: "Technical Director",
    status: "active",
    lastContact: "2024-01-08",
    tags: ["Partner", "Finland"]
  },
  {
    id: 5,
    name: "Olaf Johannsson",
    email: "olaf.johannsson@icetech.is",
    phone: "+354 555 1234",
    company: "IceTech Solutions",
    position: "CEO",
    status: "inactive",
    lastContact: "2023-12-20",
    tags: ["Inactive", "Iceland"]
  }
];

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "prospect": return "bg-blue-100 text-blue-800 border-blue-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">Manage your customer and partner contacts</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Contacts List */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-foreground">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.position}</p>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{contact.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last: {contact.lastContact}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details */}
        {selectedContact && (
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedContact.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedContact.position}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`tel:${selectedContact.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedContact.company}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedContact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Last Contact</h4>
                  <p className="text-sm text-muted-foreground">{selectedContact.lastContact}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
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