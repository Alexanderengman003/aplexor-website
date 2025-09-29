import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Users, MousePointer, Clock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number; percentage: number }>;
  deviceTypes: Array<{ type: string; count: number; percentage: number }>;
  countries: Array<{ country: string; count: number; percentage: number }>;
  browsers: Array<{ browser: string; count: number; percentage: number }>;
  dailyViews: Array<{ date: string; views: number }>;
  bounceRate: number;
}

const SiteAnalytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Use same credentials as portal
    if (formData.email === "alexander.engman@aplexor.com" && formData.password === "Alexander1234") {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to Aplexor Analytics"
      });
      loadAnalyticsData();
    } else {
      toast({
        title: "Access denied",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Get total page views and unique sessions
      const { data: pageViews } = await supabase
        .from('analytics_page_views')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const { data: sessions } = await supabase
        .from('analytics_sessions')
        .select('*')
        .gte('first_visit_at', thirtyDaysAgo.toISOString());

      if (!pageViews || !sessions) {
        throw new Error('Failed to fetch analytics data');
      }

      // Calculate metrics
      const totalPageViews = pageViews.length;
      const uniqueVisitors = sessions.length;

      // Calculate average session duration
      const totalDuration = sessions.reduce((sum, session) => sum + (session.duration_seconds || 0), 0);
      const avgSessionDuration = sessions.length > 0 ? Math.round(totalDuration / sessions.length) : 0;

      // Calculate bounce rate
      const bouncedSessions = sessions.filter(session => session.bounce).length;
      const bounceRate = sessions.length > 0 ? Math.round((bouncedSessions / sessions.length) * 100) : 0;

      // Top pages
      const pageCount = pageViews.reduce((acc, view) => {
        acc[view.page_path] = (acc[view.page_path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPages = Object.entries(pageCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([page, views]) => ({
          page: page || '/',
          views,
          percentage: Math.round((views / totalPageViews) * 100)
        }));

      // Device types
      const deviceCount = pageViews.reduce((acc, view) => {
        const device = view.device_type || 'Unknown';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const deviceTypes = Object.entries(deviceCount)
        .sort(([,a], [,b]) => b - a)
        .map(([type, count]) => ({
          type,
          count,
          percentage: Math.round((count / totalPageViews) * 100)
        }));

      // Countries
      const countryCount = pageViews.reduce((acc, view) => {
        const country = view.country || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const countries = Object.entries(countryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([country, count]) => ({
          country,
          count,
          percentage: Math.round((count / totalPageViews) * 100)
        }));

      // Browsers
      const browserCount = pageViews.reduce((acc, view) => {
        const browser = view.browser || 'Unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const browsers = Object.entries(browserCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([browser, count]) => ({
          browser,
          count,
          percentage: Math.round((count / totalPageViews) * 100)
        }));

      // Daily views for last 7 days
      const dailyViews = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayViews = pageViews.filter(view => 
          view.created_at.startsWith(dateStr)
        ).length;
        
        dailyViews.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          views: dayViews
        });
      }

      setAnalyticsData({
        totalPageViews,
        uniqueVisitors,
        avgSessionDuration,
        bounceRate,
        topPages,
        deviceTypes,
        countries,
        browsers,
        dailyViews
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl font-bold text-foreground">
              Analytics Access
            </CardTitle>
            <p className="font-body text-muted-foreground">
              Enter credentials to view site analytics
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-body font-medium">
                  Email Address
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
                  Password
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
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full font-heading font-semibold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Access Analytics"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Site Analytics
            </h1>
            <p className="font-body text-muted-foreground mt-1">
              Website traffic and user behavior insights (Last 30 days)
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="font-body"
          >
            Exit
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">Loading analytics...</p>
          </div>
        ) : analyticsData ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalPageViews.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatDuration(analyticsData.avgSessionDuration)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.bounceRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Views Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Page Views (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-2 h-32">
                  {analyticsData.dailyViews.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-primary w-full rounded-t-sm"
                        style={{ 
                          height: `${Math.max((day.views / Math.max(...analyticsData.dailyViews.map(d => d.views))) * 100, 5)}%`,
                          minHeight: '8px'
                        }}
                      />
                      <div className="text-xs text-muted-foreground mt-2">{day.date}</div>
                      <div className="text-xs font-medium">{day.views}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analyticsData.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-body text-sm truncate">{page.page}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{page.views}</div>
                          <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analyticsData.deviceTypes.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-body text-sm">{device.type}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{device.count}</div>
                          <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Countries */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analyticsData.countries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-body text-sm">{country.country}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{country.count}</div>
                          <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Browsers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analyticsData.browsers.map((browser, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-body text-sm">{browser.browser}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{browser.count}</div>
                          <div className="text-xs text-muted-foreground">{browser.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteAnalytics;