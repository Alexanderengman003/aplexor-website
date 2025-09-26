import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Users, DollarSign, Calendar, Loader2, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CompanyData {
  company: string;
  contactCount: number;
  contactNames: string[];
}

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data: contacts, error } = await supabase
        .from('contacts')
        .select('company, first_name, last_name')
        .not('company', 'is', null);

      if (error) throw error;

      // Group contacts by company
      const companyMap = new Map<string, { count: number; names: string[] }>();
      
      contacts?.forEach(contact => {
        if (contact.company) {
          const existing = companyMap.get(contact.company) || { count: 0, names: [] };
          const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'Unnamed Contact';
          existing.count++;
          existing.names.push(fullName);
          companyMap.set(contact.company, existing);
        }
      });

      const companiesData: CompanyData[] = Array.from(companyMap.entries()).map(([company, data]) => ({
        company,
        contactCount: data.count,
        contactNames: data.names
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
                      onClick={() => setSelectedCompany(company)}
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
                          <Badge variant="outline">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Details */}
          {selectedCompany && (
            <div className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg">{selectedCompany.company}</h3>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Contacts ({selectedCompany.contactCount})</h4>
                    <div className="space-y-2 mb-3">
                      {selectedCompany.contactNames.slice(0, 3).map((name, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {name}
                        </div>
                      ))}
                      {selectedCompany.contactCount > 3 && (
                        <div className="text-sm text-muted-foreground">
                          ... and {selectedCompany.contactCount - 3} more
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewContacts(selectedCompany.company)}
                    >
                      View All Contacts
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