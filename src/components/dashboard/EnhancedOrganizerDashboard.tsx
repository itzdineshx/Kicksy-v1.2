import React, { useMemo } from "react";
import { TrendingUp, Users, Target, DollarSign, Calendar, Sparkles, AlertTriangle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "@/hooks/useDashboardData";
import { MetricsCard } from "./MetricsCard";
import { PredictionCard } from "./PredictionCard";
import { InsightCard } from "./InsightCard";
import { LoadingState } from "./LoadingState";
import { RefreshButton } from "./RefreshButton";
import { useToast } from "@/hooks/use-toast";
import { AdvancedAnalyticsGrid } from "./AdvancedAnalyticsGrid";
import { DashboardContainer } from "./DashboardContainer";

export const EnhancedOrganizerDashboard = React.memo(() => {
  const { 
    metrics, 
    predictions, 
    insights, 
    loading, 
    error, 
    lastUpdated, 
    refreshData, 
    isStale 
  } = useDashboardData();
  
  const { toast } = useToast();

  const handleApplySuggestion = (event: string) => {
    console.log(`Applied suggestion for: ${event}`);
    // In real app, this would trigger API calls
  };

  const handleInsightAction = (id: string, action: string) => {
    console.log(`Executed action: ${action} for insight: ${id}`);
    // In real app, this would trigger API calls
  };

  // Memoized quick stats for performance
  const quickStats = useMemo(() => {
    if (!metrics) return [];
    
    return [
      {
        title: "Revenue This Month",
        value: `₹${(metrics.totalRevenue / 100000).toFixed(1)}L`,
        trend: Math.floor(((metrics.totalRevenue - 250000) / 250000) * 100),
        icon: <DollarSign className="w-5 h-5 text-primary" />,
        subtitle: "vs last month"
      },
      {
        title: "Tickets Sold",
        value: metrics.ticketsSold.toLocaleString(),
        trend: 15,
        icon: <Users className="w-5 h-5 text-primary" />,
        subtitle: `${Math.floor((metrics.ticketsSold / 1500) * 100)}% of target`
      },
      {
        title: "Customer Satisfaction",
        value: `${metrics.customerSatisfaction}%`,
        trend: 8,
        icon: <TrendingUp className="w-5 h-5 text-primary" />,
        subtitle: "Above industry avg"
      },
      {
        title: "Active Events",
        value: metrics.activeEvents,
        trend: -5,
        icon: <Calendar className="w-5 h-5 text-primary" />,
        subtitle: `${Math.max(0, metrics.activeEvents - 6)} need attention`
      }
    ];
  }, [metrics]);

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">
              Failed to Load Dashboard
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <RefreshButton onRefresh={refreshData} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      {/* Header with Refresh Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-sports bg-clip-text text-transparent">
            Organizer Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered insights to maximize your event success
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Enhanced
          </Badge>
          
          <RefreshButton
            onRefresh={refreshData}
            lastUpdated={lastUpdated}
            isStale={isStale}
            loading={loading}
          />
        </div>
      </div>

      {/* Sales Predictions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Sales Predictions</h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingState key={i} type="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <PredictionCard
                key={`${prediction.event}-${index}`}
                {...prediction}
                onApplySuggestion={handleApplySuggestion}
              />
            ))}
          </div>
        )}
      </div>

      {/* AI Insights & Recommendations */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Smart Insights & Recommendations
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingState type="list" count={3} />
          ) : (
            <div className="space-y-4">
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  {...insight}
                  onActionClick={handleInsightAction}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Performance Overview
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingState key={i} type="metrics" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <MetricsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                trend={stat.trend}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Dashboard Editor */}
      <DashboardContainer userType="organizer" />

      {/* Advanced Analytics Section */}
      <AdvancedAnalyticsGrid userType="organizer" loading={loading} />
    </div>
  );
});

EnhancedOrganizerDashboard.displayName = "EnhancedOrganizerDashboard";