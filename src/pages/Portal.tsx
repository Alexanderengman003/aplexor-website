import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import heroBackground from "@/assets/hero-background.jpg";

type AuthMode = "login" | "signup" | "forgot";

const Portal = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      } else {
        toast({
          title: `${authMode === "login" ? "Login" : "Account creation"} successful!`,
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
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  )}

                  {authMode === "signup" && (
                    <div>
                      <Label htmlFor="confirmPassword" className="font-body font-medium">
                        Confirm Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Confirm your password"
                        required
                      />
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
        </div>
      </section>
    </Layout>
  );
};

export default Portal;