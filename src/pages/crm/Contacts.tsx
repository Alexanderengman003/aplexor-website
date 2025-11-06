import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Mail, Phone, Building2, Loader2, Edit, Power, PowerOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  status: string | null;
  tags: string[] | null;
  last_contact_date: string | null;
  created_at: string;
  updated_at: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    status: "prospect",
    tags: [] as string[]
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
    
    // Check for company filter in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const companyFilter = urlParams.get('company');
    if (companyFilter) {
      setSearchTerm(companyFilter);
    }
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      toast({
        title: "Error fetching contacts",
        description: "Could not load contacts from the database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createContact = async () => {
    if (!newContact.first_name || !newContact.email) {
      toast({
        title: "Missing required fields",
        description: "First name and email are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          first_name: newContact.first_name,
          last_name: newContact.last_name,
          email: newContact.email,
          phone: newContact.phone,
          company: newContact.company,
          position: newContact.position,
          status: newContact.status,
          tags: newContact.tags
        }])
        .select();

      if (error) throw error;

      if (data) {
        setContacts(prev => [data[0], ...prev]);
        toast({
          title: "Contact created",
          description: `${newContact.first_name} ${newContact.last_name} has been added`
        });
        
        setNewContact({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          status: "prospect",
          tags: []
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error creating contact",
        description: "Could not create the contact",
        variant: "destructive"
      });
    }
  };

  const updateContact = async () => {
    if (!editingContact) return;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          first_name: editingContact.first_name,
          last_name: editingContact.last_name,
          email: editingContact.email,
          phone: editingContact.phone,
          company: editingContact.company,
          position: editingContact.position,
          status: editingContact.status,
          tags: editingContact.tags
        })
        .eq('id', editingContact.id)
        .select();

      if (error) throw error;

      if (data) {
        setContacts(prev => prev.map(contact => 
          contact.id === editingContact.id ? data[0] : contact
        ));
        
        if (selectedContact?.id === editingContact.id) {
          setSelectedContact(data[0]);
        }
        
        toast({
          title: "Contact updated",
          description: `${editingContact.first_name} ${editingContact.last_name} has been updated`
        });
        
        setEditingContact(null);
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error updating contact",
        description: "Could not update the contact",
        variant: "destructive"
      });
    }
  };

  const toggleContactStatus = async (contact: Contact) => {
    const newStatus = contact.status === 'inactive' ? 'active' : 'inactive';
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', contact.id)
        .select();

      if (error) throw error;

      if (data) {
        setContacts(prev => prev.map(c => 
          c.id === contact.id ? { ...c, status: newStatus } : c
        ));
        
        if (selectedContact?.id === contact.id) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
        
        toast({
          title: `Contact ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
          description: `${contact.first_name} ${contact.last_name} is now ${newStatus}`
        });
      }
    } catch (error) {
      toast({
        title: "Error updating contact",
        description: "Could not update the contact status",
        variant: "destructive"
      });
    }
  };

  const startEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditDialogOpen(true);
  };

  const getFullName = (contact: Contact) => {
    return `${contact.first_name || ""} ${contact.last_name || ""}`.trim() || "Unnamed Contact";
  };

  const filteredContacts = contacts.filter(contact =>
    getFullName(contact).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.company || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "prospect": return "bg-blue-100 text-blue-800 border-blue-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">Manage your customer and partner contacts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
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
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={newContact.first_name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={newContact.last_name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, last_name: e.target.value }))}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+47 123 45 678"
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newContact.position}
                    onChange={(e) => setNewContact(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="CEO"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newContact.status} onValueChange={(value) => setNewContact(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={createContact} className="w-full">
                Create Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Edit Contact Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
            </DialogHeader>
            {editingContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_first_name">First Name *</Label>
                    <Input
                      id="edit_first_name"
                      value={editingContact.first_name || ""}
                      onChange={(e) => setEditingContact(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_last_name">Last Name</Label>
                    <Input
                      id="edit_last_name"
                      value={editingContact.last_name || ""}
                      onChange={(e) => setEditingContact(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit_email">Email *</Label>
                  <Input
                    id="edit_email"
                    type="email"
                    value={editingContact.email || ""}
                    onChange={(e) => setEditingContact(prev => prev ? { ...prev, email: e.target.value } : null)}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_phone">Phone</Label>
                    <Input
                      id="edit_phone"
                      value={editingContact.phone || ""}
                      onChange={(e) => setEditingContact(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      placeholder="+47 123 45 678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_company">Company</Label>
                    <Input
                      id="edit_company"
                      value={editingContact.company || ""}
                      onChange={(e) => setEditingContact(prev => prev ? { ...prev, company: e.target.value } : null)}
                      placeholder="Acme Inc"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_position">Position</Label>
                    <Input
                      id="edit_position"
                      value={editingContact.position || ""}
                      onChange={(e) => setEditingContact(prev => prev ? { ...prev, position: e.target.value } : null)}
                      placeholder="CEO"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_status">Status</Label>
                    <Select 
                      value={editingContact.status || "prospect"} 
                      onValueChange={(value) => setEditingContact(prev => prev ? { ...prev, status: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={updateContact} className="w-full">
                  Update Contact
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
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
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No contacts found</p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
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
                          <h3 className="font-medium text-foreground">{getFullName(contact)}</h3>
                          {contact.position && (
                            <p className="text-sm text-muted-foreground">{contact.position}</p>
                          )}
                          {contact.company && (
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{contact.company}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status || 'unknown'}
                          </Badge>
                          {contact.last_contact_date && (
                            <span className="text-xs text-muted-foreground">
                              Last: {new Date(contact.last_contact_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {contact.tags && contact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {contact.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
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
                  <h3 className="font-medium text-lg">{getFullName(selectedContact)}</h3>
                  {selectedContact.position && (
                    <p className="text-sm text-muted-foreground">{selectedContact.position}</p>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedContact.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  )}
                  {selectedContact.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`tel:${selectedContact.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedContact.company}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status || 'unknown'}
                  </Badge>
                </div>

                {selectedContact.tags && selectedContact.tags.length > 0 && (
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
                )}

                {selectedContact.last_contact_date && (
                  <div>
                    <h4 className="font-medium mb-2">Last Contact</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedContact.last_contact_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => startEdit(selectedContact)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Contact
                  </Button>
                  <Button 
                    variant={selectedContact.status === 'inactive' ? "default" : "outline"}
                    size="sm" 
                    className="w-full"
                    onClick={() => toggleContactStatus(selectedContact)}
                  >
                    {selectedContact.status === 'inactive' ? (
                      <>
                        <Power className="mr-2 h-4 w-4" />
                        Activate Contact
                      </>
                    ) : (
                      <>
                        <PowerOff className="mr-2 h-4 w-4" />
                        Deactivate Contact
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    asChild
                  >
                    <a href={`mailto:${selectedContact.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
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