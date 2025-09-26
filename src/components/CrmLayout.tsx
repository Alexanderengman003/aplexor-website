import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { 
  Users, 
  Building2, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  GitBranch,
  Activity,
  Headphones,
  TrendingUp,
  Zap,
  FileText
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/portal/dashboard", icon: BarChart3 },
  { title: "Contacts", url: "/portal/contacts", icon: Users },
  { title: "Accounts", url: "/portal/accounts", icon: Building2 },
  { title: "Pipeline", url: "/portal/pipeline", icon: GitBranch },
  { title: "Activities", url: "/portal/activities", icon: Activity },
  { title: "Products", url: "/portal/products", icon: Package },
  { title: "Support", url: "/portal/support", icon: Headphones },
  { title: "Analytics", url: "/portal/analytics", icon: TrendingUp },
  { title: "Automation", url: "/portal/automation", icon: Zap },
  { title: "Reports", url: "/portal/reports", icon: FileText },
  { title: "Settings", url: "/portal/settings", icon: Settings },
];

interface CrmLayoutProps {
  onLogout: () => void;
  userType: "admin" | "customer" | "supplier";
  userName: string;
  children: React.ReactNode;
}

export function CrmLayout({ onLogout, userType, userName, children }: CrmLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Aplexor CRM
              </h2>
              <p className="text-sm text-muted-foreground">
                {userName} ({userType})
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, {userName}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}