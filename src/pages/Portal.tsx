import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { CrmLayout } from "@/components/CrmLayout";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import Contacts from "./crm/Contacts";
import Accounts from "./crm/Accounts";
import Products from "./crm/Products";
import { Dashboard } from "./crm/Dashboard";
import { Pipeline } from "./crm/Pipeline";
import { Activities } from "./crm/Activities";
import { Quotes } from "./crm/Quotes";
import { Orders } from "./crm/Orders";
import { Support } from "./crm/Support";
import { Analytics } from "./crm/Analytics";
import { Settings } from "./crm/Settings";

type AuthMode = "login" | "signup" | "forgot";

const Portal = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"admin" | "customer" | "supplier">("admin");
  const [userName, setUserName] = useState("Alexander");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check for hardcoded admin credentials
    if (formData.email === "alexander.engman@aplexor.com" && formData.password === "Alexander1234") {
      setIsAuthenticated(true);
      setUserType("admin");
      setUserName("Alexander");
      toast({
        title: "Login successful!",
        description: "Welcome to the Aplexor CRM, Alexander."
      });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  // Show CRM Layout when authenticated
  if (isAuthenticated) {
    return (
      <CrmLayout 
        onLogout={() => setIsAuthenticated(false)}
        userType={userType}
        userName={userName}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/support" element={<Support />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </CrmLayout>
    );
  }

  return (
    <Layout>
      <section 
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Aplexor Portal
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Access your partner dashboard and manage your Nordic market presence
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl font-bold text-foreground">
                  Welcome Back
                </CardTitle>
                <p className="font-body text-muted-foreground">
                  Sign in to access your Aplexor CRM
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="font-body font-medium">
                      Email Address *
                    </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter email"
                        required
                      />
                  </div>

                  <div>
                    <Label htmlFor="password" className="font-body font-medium">
                      Password *
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pr-10"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-heading font-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portal;