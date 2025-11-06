import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Users, DollarSign, Calendar, Loader2, Database, ArrowRight, Building2, Power, PowerOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface Account {
  id: string;
  company_name: string;
  industry: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  annual_revenue: number | null;
  employee_count: number | null;
  created_at: string;
  updated_at: string;
}

interface CompanyData {
  company: string;
  contactCount: number;
  contactNames: string[];
  accountId?: string;
  accountStatus?: string;
}

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [companyContacts, setCompanyContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    company_name: "",
    industry: "",
    website: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    status: "active",
    notes: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (accounts.length >= 0) {
      fetchCompanies();
    }
  }, [accounts]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If accounts table doesn't exist, that's okay - we'll work with contacts
        if (error.code === '42P01') {
          return;
        }
        throw error;
      }
      setAccounts(data || []);
    } catch (error) {
      // Silently fail if accounts table doesn't exist
      console.log('Accounts table not available');
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data: contacts, error } = await supabase
        .from('contacts')
        .select('company, first_name, last_name')
        .not('company', 'is', null);

      if (error) throw error;

      // Group contacts by company
      const companyMap = new Map<string, { count: number; names: string[]; accountId?: string; accountStatus?: string }>();
      
      contacts?.forEach(contact => {
        if (contact.company) {
          const existing = companyMap.get(contact.company) || { count: 0, names: [] };
          const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'Unnamed Contact';
          existing.count++;
          existing.names.push(fullName);
          companyMap.set(contact.company, existing);
        }
      });

      // Merge account data if available
      accounts.forEach(account => {
        const companyData = companyMap.get(account.company_name);
        if (companyData) {
          companyData.accountId = account.id;
          companyData.accountStatus = account.status;
        }
      });

      const companiesData: CompanyData[] = Array.from(companyMap.entries()).map(([company, data]) => ({
        company,
        contactCount: data.count,
        contactNames: data.names,
        accountId: data.accountId,
        accountStatus: data.accountStatus || 'active'
      }));

      setCompanies(companiesData.sort((a, b) => b.contactCount - a.contactCount));
    } catch (error) {
      toast({
        title: "Error fetching companies",
        description: "Could not load company data from contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewContacts = (companyName: string) => {
    navigate(`/portal/contacts?company=${encodeURIComponent(companyName)}`);
  };

  const fetchCompanyContacts = async (companyName: string) => {
    try {
      setLoadingContacts(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('company', companyName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanyContacts(data || []);
    } catch (error) {
      toast({
        title: "Error fetching contacts",
        description: "Could not load contacts for this company",
        variant: "destructive"
      });
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleCompanySelect = (company: CompanyData) => {
    setSelectedCompany(company);
    fetchCompanyContacts(company.company);
  };

  const getFullName = (contact: Contact) => {
    return `${contact.first_name || ""} ${contact.last_name || ""}`.trim() || "Unnamed Contact";
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "prospect": return "bg-blue-100 text-blue-800 border-blue-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const createAccount = async () => {
    if (!newAccount.company_name.trim()) {
      toast({
        title: "Missing required field",
        description: "Company name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([{
          company_name: newAccount.company_name,
          industry: newAccount.industry || null,
          website: newAccount.website || null,
          address: newAccount.address || null,
          city: newAccount.city || null,
          country: newAccount.country || null,
          phone: newAccount.phone || null,
          status: newAccount.status,
          notes: newAccount.notes || null
        }])
        .select();

      if (error) throw error;

      if (data) {
        toast({
          title: "Account created",
          description: `${newAccount.company_name} has been added`
        });
        
        setNewAccount({
          company_name: "",
          industry: "",
          website: "",
          address: "",
          city: "",
          country: "",
          phone: "",
          status: "active",
          notes: ""
        });
        setIsDialogOpen(false);
        fetchAccounts();
        fetchCompanies();
      }
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: "Account already exists",
          description: "An account with this company name already exists",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error creating account",
          description: "Could not create the account",
          variant: "destructive"
        });
      }
    }
  };

  const toggleAccountStatus = async (company: CompanyData) => {
    const currentStatus = company.accountStatus || 'active';
    const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';

    if (!company.accountId) {
      // If no account exists, create one first with the new status
      try {
        const { data, error } = await supabase
          .from('accounts')
          .insert([{
            company_name: company.company,
            status: newStatus
          }])
          .select();

        if (error) {
          // Check if accounts table doesn't exist
          if (error.code === '42P01') {
            toast({
              title: "Accounts table not available",
              description: "Please run the database migration to enable account management",
              variant: "destructive"
            });
            return;
          }
          // Check for duplicate company name
          if (error.code === '23505') {
            // Account might have been created by another process, try to fetch and update
            const { data: existingAccount } = await supabase
              .from('accounts')
              .select('id, status')
              .eq('company_name', company.company)
              .single();
            
            if (existingAccount) {
              // Update the existing account
              const { error: updateError } = await supabase
                .from('accounts')
                .update({ status: newStatus })
                .eq('id', existingAccount.id);
              
              if (updateError) throw updateError;
              
              toast({
                title: `Account ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
                description: `${company.company} is now ${newStatus}`
              });
              fetchAccounts();
              fetchCompanies();
              return;
            }
          }
          throw error;
        }
        
        if (data) {
          toast({
            title: `Account ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
            description: `${company.company} is now ${newStatus}`
          });
          fetchAccounts();
          fetchCompanies();
        }
      } catch (error: any) {
        console.error('Error creating/updating account:', error);
        toast({
          title: "Error updating account",
          description: error.message || "Could not update the account status. The accounts table may not be set up yet.",
          variant: "destructive"
        });
      }
      return;
    }

    // Account exists, just update the status
    try {
      const { error } = await supabase
        .from('accounts')
        .update({ status: newStatus })
        .eq('id', company.accountId);

      if (error) {
        if (error.code === '42P01') {
          toast({
            title: "Accounts table not available",
            description: "Please run the database migration to enable account management",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: `Account ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
        description: `${company.company} is now ${newStatus}`
      });

      fetchAccounts();
      fetchCompanies();
    } catch (error: any) {
      console.error('Error updating account:', error);
      toast({
        title: "Error updating account",
        description: error.message || "Could not update the account status",
        variant: "destructive"
      });
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="font-heading text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Company accounts based on your contacts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={newAccount.company_name}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="Acme Inc"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={newAccount.industry}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="Technology"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newAccount.phone}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+47 123 45 678"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={newAccount.website}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newAccount.address}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAccount.city}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Oslo"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newAccount.country}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Norway"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAccount.notes}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional information about the account"
                  rows={3}
                />
              </div>
              <Button onClick={createAccount} className="w-full">
                Create Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {companies.length === 0 ? (
        <Card className="p-8 text-center">
          <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Company Data</h3>
          <p className="text-muted-foreground mb-4">
            Add contacts with company information to see accounts here.
          </p>
          <Button onClick={() => navigate('/portal/contacts')}>
            Add Contacts
          </Button>
        </Card>
      ) : (
        <div className="flex gap-6">
          {/* Companies List */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.company}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedCompany?.company === company.company
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => handleCompanySelect(company)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium text-foreground">{company.company}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{company.contactCount} contact{company.contactCount !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(company.accountStatus || 'active')}>
                            {company.accountStatus || 'active'}
                          </Badge>
                          <Button
                            variant={company.accountStatus === 'inactive' ? "default" : "outline"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAccountStatus(company);
                            }}
                            className="flex items-center gap-1"
                          >
                            {company.accountStatus === 'inactive' ? (
                              <>
                                <Power className="h-3 w-3" />
                                Activate
                              </>
                            ) : (
                              <>
                                <PowerOff className="h-3 w-3" />
                                Deactivate
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Contacts */}
          {selectedCompany && (
            <div className="w-96">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCompany.company}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompany.contactCount} contact{selectedCompany.contactCount !== 1 ? 's' : ''}
                  </p>
                </CardHeader>
                <CardContent>
                  {loadingContacts ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : companyContacts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No contacts found</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {companyContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
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
                      ))}
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex items-center gap-2"
                      onClick={() => handleViewContacts(selectedCompany.company)}
                    >
                      View all contacts
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}