import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Users, MousePointer, Clock, Globe, RefreshCw, LineChart } from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number; percentage: number }>;
  deviceTypes: Array<{ type: string; count: number; percentage: number }>;
  countries: Array<{ country: string; count: number; percentage: number }>;
  cities: Array<{ city: string; count: number; percentage: number }>;
  browsers: Array<{ browser: string; count: number; percentage: number }>;
  dailyViews: Array<{ date: string; views: number; uniqueVisitors: number }>;
  bounceRate: number;
  trafficSources: Array<{ source: string; count: number; percentage: number }>;
  recentActivity: Array<{ 
    type: string; 
    page: string; 
    location: string; 
    time: string;
    userAgent?: string;
    deviceType?: string;
    browser?: string;
    sessionId?: string;
  }>;
}

const SiteAnalytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("7");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
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
      const daysAgo = parseInt(timeRange) === 0 ? 365 : parseInt(timeRange);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      // Get total page views and unique sessions
      const { data: pageViews } = await supabase
        .from('aplexor_page_views')
        .select('*')
        .gte('created_at', startDate.toISOString());

      const { data: sessions } = await supabase
        .from('aplexor_sessions')
        .select('*')
        .gte('first_visit_at', startDate.toISOString());

      const { data: events } = await supabase
        .from('aplexor_events')
        .select('*')
        .gte('created_at', startDate.toISOString());

      if (!pageViews || !sessions || !events) {
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

      // Cities
      const cityCount = pageViews.reduce((acc, view) => {
        const city = view.city || 'Unknown';
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const cities = Object.entries(cityCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([city, count]) => ({
          city,
          count,
          percentage: Math.round((count / totalPageViews) * 100)
        }));

      // User interactions from events
      const interactionCount = events.reduce((acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const userInteractions = Object.entries(interactionCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([type, count]) => ({
          type,
          count,
          percentage: Math.round((count / events.length) * 100)
        }));

      // Traffic sources from referrers
      const sourceCount = pageViews.reduce((acc, view) => {
        const source = view.referrer ? 
          new URL(view.referrer).hostname.replace('www.', '') : 
          'Direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const trafficSources = Object.entries(sourceCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([source, count]) => ({
          source,
          count,
          percentage: Math.round((count / totalPageViews) * 100)
        }));

      // Click statistics (from actual click events)
      const clickEvents = events.filter(event => event.event_type === 'click');
      const clickCount = clickEvents.reduce((acc, event) => {
        const eventData = event.event_data as any;
        const element = eventData?.element || 'Unknown';
        acc[element] = (acc[element] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const clickStatistics = Object.entries(clickCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([element, clicks]) => ({
          element,
          clicks,
          percentage: clickEvents.length > 0 ? Math.round((clicks / clickEvents.length) * 100) : 0
        }));

      // Recent activity (last 10 page views)
      const recentActivity = pageViews
        .slice(-10)
        .reverse()
        .map(view => ({
          type: "Page view",
          page: view.page_path === '/' ? 'Home' : view.page_path.replace('/', ''),
          location: `${view.city || 'Unknown'}, ${view.country || 'Unknown'}`,
          time: new Date(view.created_at).toLocaleString()
        }));

      // Chart data aggregation based on time range
      const timeRangeInt = parseInt(timeRange);
      const dailyViews = [];
      
      if (timeRangeInt <= 7) {
        // Daily aggregation for 1-7 days
        const chartDays = timeRangeInt === 0 ? 7 : timeRangeInt;
        for (let i = chartDays - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const dayViews = pageViews.filter(view => 
            view.created_at.startsWith(dateStr)
          ).length;

          const dayVisitors = sessions.filter(session => 
            session.first_visit_at.startsWith(dateStr)
          ).length;
          
          const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric' 
          });
          
          dailyViews.push({
            date: formattedDate,
            views: dayViews,
            uniqueVisitors: dayVisitors
          });
        }
      } else if (timeRangeInt <= 30) {
        // Daily aggregation for 8-30 days
        for (let i = timeRangeInt - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const dayViews = pageViews.filter(view => 
            view.created_at.startsWith(dateStr)
          ).length;

          const dayVisitors = sessions.filter(session => 
            session.first_visit_at.startsWith(dateStr)
          ).length;
          
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          
          dailyViews.push({
            date: formattedDate,
            views: dayViews,
            uniqueVisitors: dayVisitors
          });
        }
      } else if (timeRangeInt <= 90) {
        // Weekly aggregation for 31-90 days
        const weeks = Math.ceil(timeRangeInt / 7);
        for (let i = weeks - 1; i >= 0; i--) {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() - (i * 7));
          const startDate = new Date(endDate);
          startDate.setDate(startDate.getDate() - 6);
          
          const weekViews = pageViews.filter(view => {
            const viewDate = new Date(view.created_at);
            return viewDate >= startDate && viewDate <= endDate;
          }).length;

          const weekVisitors = sessions.filter(session => {
            const sessionDate = new Date(session.first_visit_at);
            return sessionDate >= startDate && sessionDate <= endDate;
          }).length;
          
          const formattedDate = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
          
          dailyViews.push({
            date: formattedDate,
            views: weekViews,
            uniqueVisitors: weekVisitors
          });
        }
      } else {
        // Monthly aggregation for longer periods
        const months = Math.min(12, Math.ceil(timeRangeInt / 30));
        for (let i = months - 1; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const year = date.getFullYear();
          const month = date.getMonth();
          
          const monthViews = pageViews.filter(view => {
            const viewDate = new Date(view.created_at);
            return viewDate.getFullYear() === year && viewDate.getMonth() === month;
          }).length;

          const monthVisitors = sessions.filter(session => {
            const sessionDate = new Date(session.first_visit_at);
            return sessionDate.getFullYear() === year && sessionDate.getMonth() === month;
          }).length;
          
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          });
          
          dailyViews.push({
            date: formattedDate,
            views: monthViews,
            uniqueVisitors: monthVisitors
          });
        }
      }

      setAnalyticsData({
        totalPageViews,
        uniqueVisitors,
        avgSessionDuration,
        bounceRate,
        topPages,
        deviceTypes,
        countries,
        cities,
        browsers,
        dailyViews,
        trafficSources,
        recentActivity
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
              Analytics Dashboard
            </h1>
            <p className="font-body text-muted-foreground mt-1">
              Track portfolio performance and visitor insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadAnalyticsData}
              className="font-body"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="font-body"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Time Range Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: "1", label: "24h" },
            { value: "7", label: "7 days" },
            { value: "30", label: "30 days" },
            { value: "90", label: "90 days" },
            { value: "180", label: "6 months" },
            { value: "365", label: "1 year" },
            { value: "0", label: "All data" }
          ].map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setTimeRange(range.value);
                setTimeout(() => loadAnalyticsData(), 100);
              }}
              className="font-body"
            >
              {range.label}
            </Button>
          ))}
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

            {/* Traffic Overview Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Traffic Overview
                </CardTitle>
                <p className="text-sm text-muted-foreground">Daily page views and unique visitors trend</p>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart 
                      data={analyticsData.dailyViews}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--popover-foreground))'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Page Views"
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="uniqueVisitors" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={3}
                        name="Unique Visitors"
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--secondary))', strokeWidth: 2 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <p className="text-sm text-muted-foreground">Most visited pages on the website</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.topPages.slice(0, 10).map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                          <span className="font-body text-sm">{page.page === '/' ? 'Home' : page.page.replace('/', '')}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{page.views}</div>
                          <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <p className="text-sm text-muted-foreground">Latest visitor activity with detailed information</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 text-sm p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{activity.type}</div>
                          <div className="text-muted-foreground truncate">{activity.page}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.location} • {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Countries */}
              <Card>
                <CardHeader>
                  <CardTitle>Countries</CardTitle>
                  <p className="text-sm text-muted-foreground">All countries with visitors</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.countries.slice(0, 4).map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                          <span className="font-body text-sm">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{country.count}</div>
                          <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cities */}
              <Card>
                <CardHeader>
                  <CardTitle>Cities</CardTitle>
                  <p className="text-sm text-muted-foreground">All cities with visitors</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.cities.slice(0, 4).map((city, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                          <span className="font-body text-sm">{city.city}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{city.count}</div>
                          <div className="text-xs text-muted-foreground">{city.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Activity Detail Dialog */}
            <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Activity Details</DialogTitle>
                </DialogHeader>
                {selectedActivity && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <p className="text-sm">{selectedActivity.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Page</label>
                      <p className="text-sm">{selectedActivity.fullPagePath || selectedActivity.page}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Page Title</label>
                      <p className="text-sm">{selectedActivity.pageTitle || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-sm">{selectedActivity.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Device & Browser</label>
                      <p className="text-sm">{selectedActivity.deviceType} • {selectedActivity.browser}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Time</label>
                      <p className="text-sm">{selectedActivity.time}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Session ID</label>
                      <p className="text-xs font-mono text-muted-foreground break-all">{selectedActivity.sessionId}</p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
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