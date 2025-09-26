import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Package, DollarSign, Database } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">CRM Overview</p>
      </div>

      {/* Placeholder for when metrics are connected to Supabase */}
      <Card className="p-8 text-center">
        <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Dashboard Metrics</h3>
        <p className="text-muted-foreground mb-4">
          Dashboard metrics will be displayed here once connected to your CRM data.
        </p>
        <p className="text-sm text-muted-foreground">
          Metrics like revenue, active deals, contacts, and products will be calculated from your Supabase data.
        </p>
      </Card>

      {/* Grid showing what metrics will be available */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-dashed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-muted-foreground">
                --
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                From deals data
              </p>
            </div>
            <div className="p-3 rounded-full bg-muted">
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-dashed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Deals
              </p>
              <p className="text-2xl font-bold text-muted-foreground">
                --
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                From pipeline
              </p>
            </div>
            <div className="p-3 rounded-full bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-dashed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Contacts
              </p>
              <p className="text-2xl font-bold text-muted-foreground">
                --
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                From contacts table
              </p>
            </div>
            <div className="p-3 rounded-full bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-dashed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Products Sold
              </p>
              <p className="text-2xl font-bold text-muted-foreground">
                --
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                From orders data
              </p>
            </div>
            <div className="p-3 rounded-full bg-muted">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}