import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Database, LogOut } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import HubSpotContactsList from "@/components/HubSpotContactsList";
import MockContactsList from "@/components/MockContactsList";

type AuthMode = "login" | "signup" | "forgot";
type AppMode = "auth" | "hubspot-crm";

const Portal = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [appMode, setAppMode] = useState<AppMode>("auth");
  const [hubspotAccessToken, setHubspotAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  // Check for OAuth callback parameters and handle HubSpot authentication
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      toast({
        title: "HubSpot Authentication Failed",
        description: `Error: ${error}`,
        variant: "destructive"
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code && !hubspotAccessToken) {
      exchangeCodeForToken(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('/.netlify/functions/hubspot-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setHubspotAccessToken(data.access_token);
        setAppMode("hubspot-crm");
        toast({
          title: "HubSpot Connected Successfully",
          description: "You can now access your CRM data.",
        });
      } else {
        throw new Error(data.error || 'Failed to authenticate with HubSpot');
      }
    } catch (error) {
      console.error('Token exchange failed:', error);
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Failed to connect to HubSpot",
        variant: "destructive"
      });
    }
  };

  const connectToHubSpot = () => {
    // Redirect to HubSpot OAuth
    window.location.href = '/.netlify/functions/hubspot-auth';
  };

  const disconnectFromHubSpot = () => {
    setHubspotAccessToken(null);
    setAppMode("auth");
    toast({
      title: "Disconnected from HubSpot",
      description: "You have been logged out of HubSpot CRM.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.email.trim()) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (authMode === "login" || authMode === "signup") {
      if (!formData.password.trim()) {
        toast({
          title: "Please enter your password",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      if (authMode === "signup") {
        if (!formData.name.trim()) {
          toast({
            title: "Please enter your name",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        if (formData.password.length < 8) {
          toast({
            title: "Password must be at least 8 characters long",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords do not match",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === "forgot") {
        toast({
          title: "Password reset email sent!",
          description: "Check your email for reset instructions."
        });
      } else if (authMode === "login") {
        // Check for hardcoded admin credentials
        if (formData.email === "alexander@aplexor.com" && formData.password === "Alexander1234") {
          setIsAuthenticated(true);
          setAppMode("hubspot-crm");
          toast({
            title: "Login successful!",
            description: "Welcome to the Aplexor Portal, Alexander."
          });
        } else {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      } else {
        toast({
          title: "Account creation successful!",
          description: "Welcome to the Aplexor Portal."
        });
      }
      
      resetForm();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = (newMode: AuthMode) => {
    setAuthMode(newMode);
    resetForm();
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    toast({
      title: `${provider === "google" ? "Google" : "Apple"} Sign-In`,
      description: "Social login will be connected once authentication is set up.",
    });
  };

  const getTitle = () => {
    switch (authMode) {
      case "login": return "Welcome Back";
      case "signup": return "Create Your Account";
      case "forgot": return "Reset Your Password";
      default: return "Portal Access";
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case "login": return "Sign in to access your Aplexor Portal";
      case "signup": return "Join the Aplexor Portal to manage your hardware sales";
      case "forgot": return "Enter your email to receive reset instructions";
      default: return "";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
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

        {/* Authentication Form */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {appMode === "auth" && (
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="font-heading text-2xl font-bold text-foreground">
                      {getTitle()}
                    </CardTitle>
                    <p className="font-body text-muted-foreground">
                      {getSubtitle()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">{/* ... keep existing form */}
                      {authMode === "signup" && (
                        <>
                          <div>
                            <Label htmlFor="name" className="font-body font-medium">
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1"
                              placeholder="Your full name"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="company" className="font-body font-medium">
                              Company
                            </Label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="mt-1"
                              placeholder="Your company name"
                            />
                          </div>
                        </>
                      )}

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
                          placeholder="your.email@company.com"
                          required
                        />
                      </div>

                      {authMode !== "forgot" && (
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
                              placeholder="Enter your password"
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
                      )}

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
                              placeholder="Confirm your password"
                              required
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
                        {isSubmitting ? "Processing..." : authMode === "login" ? "Sign In" : authMode === "signup" ? "Create Account" : "Send Reset Email"}
                      </Button>
                    </form>

                    {/* Social Login - Only show for login and signup */}
                    {authMode !== "forgot" && (
                      <>
                        <div className="mt-6">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleSocialLogin("google")}
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Google
                          </Button>
                          
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleSocialLogin("apple")}
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Apple
                          </Button>
                        </div>
                      </>
                    )}

                    <div className="mt-6 text-center space-y-3">
                      {authMode === "login" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleModeChange("forgot")}
                            className="font-body text-sm text-primary hover:underline"
                          >
                            Forgot your password?
                          </button>
                          <div className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <button
                              type="button"
                              onClick={() => handleModeChange("signup")}
                              className="text-primary hover:underline font-medium"
                            >
                              Sign up
                            </button>
                          </div>
                        </>
                      )}
                      
                      {authMode === "signup" && (
                        <div className="text-sm text-muted-foreground">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => handleModeChange("login")}
                            className="text-primary hover:underline font-medium"
                          >
                            Sign in
                          </button>
                        </div>
                      )}
                      
                      {authMode === "forgot" && (
                        <div className="text-sm text-muted-foreground">
                          Remember your password?{" "}
                          <button
                            type="button"
                            onClick={() => handleModeChange("login")}
                            className="text-primary hover:underline font-medium"
                          >
                            Back to sign in
                          </button>
                        </div>
                      )}
                    </div>

                    {/* HubSpot Connect Button */}
                    <div className="mt-6 pt-6 border-t">
                      <Button
                        onClick={connectToHubSpot}
                        className="w-full"
                        variant="outline"
                      >
                        <Database className="w-4 h-4 mr-2" />
                        Connect to HubSpot CRM
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Access your HubSpot contacts and manage your CRM data
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                  <p className="font-body text-sm text-muted-foreground">
                    Need help? Contact us at{" "}
                    <a href="mailto:support@aplexor.com" className="text-primary hover:underline">
                      support@aplexor.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Mock CRM Dashboard - for authenticated users without HubSpot connection */}
            {isAuthenticated && appMode === "hubspot-crm" && !hubspotAccessToken && (
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-heading font-bold">CRM Dashboard</h2>
                  <Button onClick={() => { setIsAuthenticated(false); setAppMode("auth"); }} variant="outline">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
                
                <MockContactsList />
              </div>
            )}

            {/* HubSpot CRM Dashboard */}
            {appMode === "hubspot-crm" && hubspotAccessToken && (
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-heading font-bold">CRM Dashboard</h2>
                  <Button onClick={disconnectFromHubSpot} variant="outline">
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
                
                <HubSpotContactsList accessToken={hubspotAccessToken} />
              </div>
            )}
          </div>
        </section>
    </Layout>
  );
};

export default Portal;