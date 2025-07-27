import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  Users,
  TrendingUp,
  BarChart3,
  Globe,
  Settings,
  AlertTriangle,
  Sparkles,
  Download,
  RefreshCw
} from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { LoadingState } from "./LoadingState";
import { AdvancedAnalyticsGrid } from "./AdvancedAnalyticsGrid";
import { useToast } from "@/hooks/use-toast";

interface AdminMetrics {
  totalUsers: number;
  totalOrganizers: number;
  totalRevenue: number;
  totalEvents: number;
  platformGrowth: number;
  activeUsers: number;
  systemHealth: number;
  revenue24h: number;
}

export const AdminAnalyticsDashboard: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock admin data
  const [adminMetrics] = useState<AdminMetrics>({
    totalUsers: 45623,
    totalOrganizers: 1247,
    totalRevenue: 12500000,
    totalEvents: 3456,
    platformGrowth: 32,
    activeUsers: 8934,
    systemHealth: 98,
    revenue24h: 245000
  });

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Admin Analytics Updated! 🔄",
        description: "Platform analytics have been refreshed successfully.",
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

  const handleExportReport = () => {
    toast({
      title: "Report Export Started! 📊",
      description: "Platform analytics report will be ready for download shortly.",
    });
  };

  const keyMetrics = [
    {
      title: "Total Users",
      value: adminMetrics.totalUsers.toLocaleString(),
      icon: <Users className="w-5 h-5 text-primary" />,
      trend: 12,
      subtitle: "Active platform users"
    },
    {
      title: "Total Organizers",
      value: adminMetrics.totalOrganizers.toLocaleString(),
      icon: <Crown className="w-5 h-5 text-primary" />,
      trend: 8,
      subtitle: "Event organizers"
    },
    {
      title: "Platform Revenue",
      value: `₹${(adminMetrics.totalRevenue / 10000000).toFixed(1)}Cr`,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      trend: adminMetrics.platformGrowth,
      subtitle: "Total lifetime revenue"
    },
    {
      title: "Total Events",
      value: adminMetrics.totalEvents.toLocaleString(),
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      trend: 25,
      subtitle: "Platform events hosted"
    },
    {
      title: "24h Revenue",
      value: `₹${(adminMetrics.revenue24h / 1000).toFixed(0)}K`,
      icon: <Globe className="w-5 h-5 text-primary" />,
      trend: 15,
      subtitle: "Last 24 hours"
    },
    {
      title: "Active Now",
      value: adminMetrics.activeUsers.toLocaleString(),
      icon: <Users className="w-5 h-5 text-primary" />,
      trend: 5,
      subtitle: "Currently online"
    },
    {
      title: "System Health",
      value: `${adminMetrics.systemHealth}%`,
      icon: <Settings className="w-5 h-5 text-primary" />,
      trend: 2,
      subtitle: "All systems operational"
    },
    {
      title: "Growth Rate",
      value: `${adminMetrics.platformGrowth}%`,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      trend: adminMetrics.platformGrowth,
      subtitle: "Monthly growth"
    }
  ];

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-sports bg-clip-text text-transparent flex items-center gap-3">
            <Crown className="w-8 h-8 text-primary" />
            Admin Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive platform oversight and analytics
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Super Admin
          </Badge>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportReport}
            className="transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefreshData}
            disabled={loading}
            className="transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Alert */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                All Systems Operational
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Platform running smoothly • {adminMetrics.systemHealth}% uptime • No critical issues
              </p>
            </div>
            <Badge className="ml-auto bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
              Healthy
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <MetricsCard
            key={metric.title}
            {...metric}
            loading={loading}
          />
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <AdvancedAnalyticsGrid userType="admin" loading={loading} />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                User Analytics Deep Dive
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingState type="chart" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {adminMetrics.totalUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Registered Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">
                      {adminMetrics.activeUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Active This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {Math.floor((adminMetrics.activeUsers / adminMetrics.totalUsers) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <AdvancedAnalyticsGrid userType="admin" loading={loading} />
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Revenue Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingState type="chart" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      ₹{(adminMetrics.totalRevenue / 10000000).toFixed(1)}Cr
                    </div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">
                      ₹{(adminMetrics.revenue24h / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Last 24h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-2">
                      {adminMetrics.platformGrowth}%
                    </div>
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      ₹{Math.floor(adminMetrics.totalRevenue / adminMetrics.totalUsers).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Revenue/User</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <AdvancedAnalyticsGrid userType="admin" loading={loading} />
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Events Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingState type="chart" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {adminMetrics.totalEvents.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Events Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">
                      {adminMetrics.totalOrganizers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Organizers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {Math.floor(adminMetrics.totalEvents / adminMetrics.totalOrganizers)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Events/Organizer</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <AdvancedAnalyticsGrid userType="admin" loading={loading} />
        </TabsContent>
        
        <TabsContent value="system" className="space-y-6">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                System Health Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingState type="chart" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">
                      {adminMetrics.systemHealth}%
                    </div>
                    <div className="text-sm text-muted-foreground">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      &lt;45ms
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">
                      0
                    </div>
                    <div className="text-sm text-muted-foreground">Critical Issues</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <AdvancedAnalyticsGrid userType="admin" loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};