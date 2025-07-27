import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/components/LocalStorageProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Target,
  Zap,
  Filter,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricsCard } from "./MetricsCard";
import { LoadingState } from "./LoadingState";
import { RefreshButton } from "./RefreshButton";
import { useToast } from "@/hooks/use-toast";
import { AdvancedAnalyticsGrid } from "./AdvancedAnalyticsGrid";
import { DashboardContainer } from "./DashboardContainer";

interface UserStats {
  totalBookings: number;
  totalSpent: number;
  eventsViewed: number;
  favoriteEvents: number;
  avgSessionTime: number;
  preferredSport: string;
  preferredVenue: string;
  bookingStreak: number;
}

interface MonthlyData {
  month: string;
  bookings: number;
  spent: number;
  views: number;
}

interface SportPreference {
  sport: string;
  bookings: number;
  spent: number;
  color: string;
}

export const EnhancedUserAnalytics = React.memo(() => {
  const { userProfile } = useLocalStorage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('6m');
  
  // Simulated data - in real app, this would come from API
  const [stats] = useState<UserStats>({
    totalBookings: 12,
    totalSpent: 28500,
    eventsViewed: 47,
    favoriteEvents: 8,
    avgSessionTime: 12.5,
    preferredSport: "Cricket",
    preferredVenue: "Wankhede Stadium",
    bookingStreak: 5
  });

  const [monthlyData] = useState<MonthlyData[]>([
    { month: "Jan", bookings: 2, spent: 3200, views: 8 },
    { month: "Feb", bookings: 1, spent: 1500, views: 5 },
    { month: "Mar", bookings: 3, spent: 5800, views: 12 },
    { month: "Apr", bookings: 2, spent: 4200, views: 9 },
    { month: "May", bookings: 1, spent: 2800, views: 6 },
    { month: "Jun", bookings: 3, spent: 6000, views: 13 }
  ]);

  const [sportPreferences] = useState<SportPreference[]>([
    { sport: "Cricket", bookings: 7, spent: 15000, color: "hsl(var(--primary))" },
    { sport: "Football", bookings: 3, spent: 8500, color: "hsl(var(--secondary))" },
    { sport: "Kabaddi", bookings: 2, spent: 5000, color: "hsl(var(--accent))" }
  ]);

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Analytics Updated! 📊",
        description: "Your personal analytics have been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to update analytics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export Started! 📁",
      description: "Your analytics data will be ready for download shortly.",
    });
  };

  // Memoized metrics for performance
  const keyMetrics = useMemo(() => [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <Calendar className="w-5 h-5 text-primary" />,
      trend: 25,
      subtitle: "This period"
    },
    {
      title: "Total Spent",
      value: `₹${stats.totalSpent.toLocaleString()}`,
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      trend: 15,
      subtitle: "Lifetime value"
    },
    {
      title: "Events Viewed",
      value: stats.eventsViewed,
      subtitle: "Browsing activity",
      icon: <Eye className="w-5 h-5 text-primary" />,
      trend: 8,
    },
    {
      title: "Booking Streak",
      value: `${stats.bookingStreak} months`,
      subtitle: "Consecutive activity",
      icon: <Zap className="w-5 h-5 text-primary" />,
      trend: stats.bookingStreak > 3 ? 20 : -10,
    }
  ], [stats]);

  const filteredData = useMemo(() => {
    const months = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    return monthlyData.slice(-months);
  }, [monthlyData, timeRange]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your Analytics</h2>
          <p className="text-muted-foreground">Track your sports event engagement</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time Range Filter */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            {(['3m', '6m', '1y'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "ghost"}
                onClick={() => setTimeRange(range)}
                className="px-3 py-1 text-xs"
              >
                {range === '3m' ? '3M' : range === '6m' ? '6M' : '1Y'}
              </Button>
            ))}
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportData}
            className="transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <RefreshButton
            onRefresh={handleRefreshData}
            loading={loading}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <MetricsCard
            key={metric.title}
            {...metric}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Chart */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Activity
              <Badge variant="secondary" className="ml-auto">
                {timeRange.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingState type="chart" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis className="text-muted-foreground text-xs" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stackId="2"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Sport Preferences */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Sport Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingState type="list" count={3} />
            ) : (
              <div className="space-y-4">
                {sportPreferences.map((sport, index) => (
                  <div key={sport.sport} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125"
                          style={{ backgroundColor: sport.color }}
                        />
                        <span className="font-medium">{sport.sport}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{sport.bookings} bookings</div>
                        <div className="text-xs text-muted-foreground">
                          ₹{sport.spent.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={(sport.bookings / stats.totalBookings) * 100} 
                      className="h-2 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Trend */}
        <Card className="border-0 bg-gradient-card shadow-floating lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingState type="chart" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis className="text-muted-foreground text-xs" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => [`₹${value}`, "Spent"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <LoadingState type="list" count={3} />
            ) : (
              <>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 transition-all duration-300 hover:bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Avg Session</span>
                  </div>
                  <span className="font-semibold">{stats.avgSessionTime}m</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 transition-all duration-300 hover:bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <span className="font-semibold">{stats.favoriteEvents}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 transition-all duration-300 hover:bg-muted/30">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Top Venue</span>
                  </div>
                  <span className="font-semibold text-xs">{stats.preferredVenue}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interactive Dashboard Editor */}
      <DashboardContainer userType="user" />

      {/* Advanced Analytics Section */}
      <AdvancedAnalyticsGrid userType="user" loading={loading} />
    </div>
  );
});

EnhancedUserAnalytics.displayName = "EnhancedUserAnalytics";