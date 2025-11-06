import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { CrmLayout } from "@/components/CrmLayout";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
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

type AuthMode = "login" | "signup";

const Portal = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await checkAdminRole(session.user.id);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

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

    // Validation
    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast({
        title: "Validation error",
        description: "Email and password are required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (email.length > 255) {
      toast({
        title: "Validation error",
        description: "Email must be less than 255 characters",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (authMode === "signup") {
      if (password !== formData.confirmPassword) {
        toast({
          title: "Validation error",
          description: "Passwords do not match",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`
        }
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account, or contact support to get admin access.",
        });
        setAuthMode("login");
        setFormData({ email: "", password: "", confirmPassword: "" });
      }
    } else {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        await checkAdminRole(data.user.id);
        if (!isAdmin) {
          toast({
            title: "Access Denied",
            description: "You do not have admin privileges. Please contact support.",
            variant: "destructive"
          });
          await supabase.auth.signOut();
        } else {
          toast({
            title: "Login successful!",
            description: "Welcome to the Aplexor CRM."
          });
        }
      }
    }
    
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/portal');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  // Show CRM Layout when authenticated as admin
  if (user && isAdmin) {
    return (
      <CrmLayout 
        onLogout={handleLogout}
        userType="admin"
        userName={user.email?.split('@')[0] || "Admin"}
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
        className="relative h-80 lg:h-96 overflow-hidden flex items-center"
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
            <p className="font-body text-xl text-muted-foreground">
              Access your dashboard and manage your clients in the Aplexor CRM
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
                  {authMode === "login" ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <p className="font-body text-muted-foreground">
                  {authMode === "login" 
                    ? "Sign in to access your Aplexor CRM"
                    : "Sign up to get started with Aplexor CRM"}
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
                      placeholder="admin@example.com"
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
                        minLength={6}
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

                  {authMode === "signup" && (
                    <div>
                      <Label htmlFor="confirmPassword" className="font-body font-medium">
                        Confirm Password *
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pr-10"
                          placeholder="Confirm password"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full font-heading font-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : (authMode === "login" ? "Sign In" : "Sign Up")}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode(authMode === "login" ? "signup" : "login");
                        setFormData({ email: "", password: "", confirmPassword: "" });
                      }}
                      className="font-body text-sm text-muted-foreground hover:text-foreground underline"
                    >
                      {authMode === "login" 
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
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