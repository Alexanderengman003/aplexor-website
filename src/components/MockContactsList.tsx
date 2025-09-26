import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Mail, Phone, Building, User, RefreshCw } from "lucide-react";

interface MockContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
}

const mockContacts: MockContact[] = [
  {
    id: "1",
    properties: {
      firstname: "John",
      lastname: "Smith",
      email: "john.smith@techcorp.com",
      company: "TechCorp Solutions",
      phone: "+47 123 45 678"
    }
  },
  {
    id: "2",
    properties: {
      firstname: "Maria",
      lastname: "Hansen",
      email: "maria.hansen@nordictech.no",
      company: "Nordic Tech AS",
      phone: "+47 987 65 432"
    }
  },
  {
    id: "3",
    properties: {
      firstname: "Erik",
      lastname: "Andersen",
      email: "erik.andersen@datanord.com",
      company: "DataNord",
      phone: "+47 456 78 901"
    }
  },
  {
    id: "4",
    properties: {
      firstname: "Sofia",
      lastname: "Larsson",
      email: "sofia.larsson@innovatetech.se",
      company: "InnovateTech Sweden",
      phone: "+46 234 56 789"
    }
  },
  {
    id: "5",
    properties: {
      firstname: "Mikael",
      lastname: "Johansson",
      email: "mikael@hardwareplus.no",
      company: "Hardware Plus",
      phone: "+47 345 67 890"
    }
  }
];

const MockContactsList = () => {
  const [contacts, setContacts] = useState<MockContact[]>(mockContacts);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    phone: ""
  });
  const { toast } = useToast();

  const refreshContacts = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Contacts refreshed",
      description: `Found ${contacts.length} contacts`,
    });
  };

  const createContact = async () => {
    if (!newContact.firstname || !newContact.email) {
      toast({
        title: "Missing required fields",
        description: "First name and email are required",
        variant: "destructive",
      });
      return;
    }

    // Simulate creating contact
    const newContactData: MockContact = {
      id: (contacts.length + 1).toString(),
      properties: { ...newContact }
    };

    setContacts(prev => [...prev, newContactData]);
    
    toast({
      title: "Contact created successfully",
      description: `${newContact.firstname} ${newContact.lastname} has been added to your contacts`,
    });

    setNewContact({
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      phone: ""
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold">CRM Contacts</h2>
        <div className="flex gap-2">
          <Button
            onClick={refreshContacts}
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname">First Name *</Label>
                    <Input
                      id="firstname"
                      value={newContact.firstname}
                      onChange={(e) => setNewContact(prev => ({ ...prev, firstname: e.target.value }))}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      value={newContact.lastname}
                      onChange={(e) => setNewContact(prev => ({ ...prev, lastname: e.target.value }))}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newContact.company}
                    onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Acme Inc"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+47 123 45 678"
                  />
                </div>
                <Button onClick={createContact} className="w-full">
                  Create Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading contacts...</p>
        </div>
      )}

      {!loading && contacts.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground mb-4">
              Your CRM doesn't have any contacts yet.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && contacts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {contact.properties.firstname || 'Unknown'} {contact.properties.lastname || ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contact.properties.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${contact.properties.email}`}
                      className="text-primary hover:underline"
                    >
                      {contact.properties.email}
                    </a>
                  </div>
                )}
                {contact.properties.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{contact.properties.company}</span>
                  </div>
                )}
                {contact.properties.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a 
                      href={`tel:${contact.properties.phone}`}
                      className="text-primary hover:underline"
                    >
                      {contact.properties.phone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockContactsList;