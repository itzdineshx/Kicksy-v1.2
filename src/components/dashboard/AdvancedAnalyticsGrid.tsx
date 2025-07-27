import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Activity,
  Award,
  Filter,
  Download,
  Maximize2
} from "lucide-react";
import {
  RevenueAnalyticsChart,
  SportsPerformanceRadar,
  AudienceDemographicsChart,
  EventTimelineChart,
  PerformanceScatterChart,
  TrendComparisonChart
} from "./EnhancedChartComponents";

interface AdvancedAnalyticsGridProps {
  userType: 'user' | 'organizer' | 'admin';
  loading?: boolean;
}

export const AdvancedAnalyticsGrid: React.FC<AdvancedAnalyticsGridProps> = ({ 
  userType, 
  loading = false 
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data for different visualizations
  const revenueData = useMemo(() => [
    { month: 'Jan', revenue: 45000, bookings: 120, events: 8 },
    { month: 'Feb', revenue: 52000, bookings: 145, events: 10 },
    { month: 'Mar', revenue: 48000, bookings: 135, events: 9 },
    { month: 'Apr', revenue: 61000, bookings: 168, events: 12 },
    { month: 'May', revenue: 58000, bookings: 155, events: 11 },
    { month: 'Jun', revenue: 67000, bookings: 180, events: 13 }
  ], []);

  const sportsPerformanceData = useMemo(() => [
    { sport: 'Cricket', performance: 85, popularity: 92, revenue: 78 },
    { sport: 'Football', performance: 78, popularity: 85, revenue: 70 },
    { sport: 'Kabaddi', performance: 72, popularity: 65, revenue: 68 },
    { sport: 'Tennis', performance: 80, popularity: 75, revenue: 72 },
    { sport: 'Badminton', performance: 70, popularity: 60, revenue: 65 },
    { sport: 'Hockey', performance: 75, popularity: 68, revenue: 69 }
  ], []);

  const audienceData = useMemo(() => [
    { name: '18-24', value: 25, percentage: 25 },
    { name: '25-34', value: 35, percentage: 35 },
    { name: '35-44', value: 20, percentage: 20 },
    { name: '45-54', value: 15, percentage: 15 },
    { name: '55+', value: 5, percentage: 5 }
  ], []);

  const eventTimelineData = useMemo(() => [
    { date: 'Week 1', events: 12, attendance: 3200 },
    { date: 'Week 2', events: 15, attendance: 4100 },
    { date: 'Week 3', events: 18, attendance: 4800 },
    { date: 'Week 4', events: 14, attendance: 3700 }
  ], []);

  const performanceScatterData = useMemo(() => [
    { satisfaction: 85, revenue: 45, attendance: 1200, name: 'Cricket Final' },
    { satisfaction: 92, revenue: 67, attendance: 1800, name: 'Football League' },
    { satisfaction: 78, revenue: 32, attendance: 800, name: 'Tennis Match' },
    { satisfaction: 88, revenue: 54, attendance: 1400, name: 'Kabaddi Cup' },
    { satisfaction: 82, revenue: 41, attendance: 1100, name: 'Badminton Open' }
  ], []);

  const trendComparisonData = useMemo(() => [
    { period: 'Q1', currentYear: 145000, previousYear: 125000 },
    { period: 'Q2', currentYear: 162000, previousYear: 138000 },
    { period: 'Q3', currentYear: 178000, previousYear: 155000 },
    { period: 'Q4', currentYear: 195000, previousYear: 167000 }
  ], []);

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  const getChartsForUserType = () => {
    switch (userType) {
      case 'user':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendComparisonChart
                data={trendComparisonData}
                title="Spending vs Industry Average"
                loading={loading}
              />
              <AudienceDemographicsChart
                data={audienceData}
                title="Age Demographics"
                loading={loading}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <EventTimelineChart
                data={eventTimelineData}
                title="Event Attendance Pattern"
                loading={loading}
                className="lg:col-span-2"
              />
              <SportsPerformanceRadar
                data={sportsPerformanceData}
                title="Sport Preferences"
                loading={loading}
              />
            </div>
          </div>
        );

      case 'organizer':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueAnalyticsChart
                data={revenueData}
                title="Revenue & Bookings Analytics"
                subtitle="6M"
                loading={loading}
              />
              <PerformanceScatterChart
                data={performanceScatterData}
                title="Event Performance Matrix"
                loading={loading}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SportsPerformanceRadar
                data={sportsPerformanceData}
                title="Sports Category Performance"
                loading={loading}
              />
              <AudienceDemographicsChart
                data={audienceData}
                title="Audience Segmentation"
                loading={loading}
              />
              <EventTimelineChart
                data={eventTimelineData}
                title="Event Scheduling Trends"
                loading={loading}
              />
            </div>
            
            <TrendComparisonChart
              data={trendComparisonData}
              title="Year-over-Year Performance"
              loading={loading}
            />
          </div>
        );

      case 'admin':
        return (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueAnalyticsChart
                  data={revenueData}
                  title="Platform Revenue Analytics"
                  subtitle="All Organizers"
                  loading={loading}
                />
                <PerformanceScatterChart
                  data={performanceScatterData}
                  title="Event Performance Overview"
                  loading={loading}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SportsPerformanceRadar
                  data={sportsPerformanceData}
                  title="Platform Sports Analytics"
                  loading={loading}
                />
                <AudienceDemographicsChart
                  data={audienceData}
                  title="Platform Demographics"
                  loading={loading}
                />
                <EventTimelineChart
                  data={eventTimelineData}
                  title="Platform Activity"
                  loading={loading}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceScatterChart
                  data={performanceScatterData}
                  title="Satisfaction vs Revenue Analysis"
                  loading={loading}
                />
                <SportsPerformanceRadar
                  data={sportsPerformanceData}
                  title="Sports Performance Metrics"
                  loading={loading}
                />
              </div>
              
              <TrendComparisonChart
                data={trendComparisonData}
                title="Platform Growth Trends"
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AudienceDemographicsChart
                  data={audienceData}
                  title="User Age Distribution"
                  loading={loading}
                />
                <EventTimelineChart
                  data={eventTimelineData}
                  title="User Engagement Timeline"
                  loading={loading}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrendComparisonChart
                  data={trendComparisonData}
                  title="Revenue Growth Comparison"
                  loading={loading}
                />
                <RevenueAnalyticsChart
                  data={revenueData}
                  title="Monthly Trends Analysis"
                  loading={loading}
                />
              </div>
            </TabsContent>
          </Tabs>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header with Controls */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-6 h-6 text-primary" />
                Advanced Analytics Dashboard
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Enhanced
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Comprehensive data visualization and insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Timeframe Selector */}
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                {(['3m', '6m', '1y'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    size="sm"
                    variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className="px-3 py-1 text-xs"
                  >
                    {timeframe === '3m' ? '3M' : timeframe === '6m' ? '6M' : '1Y'}
                  </Button>
                ))}
              </div>
              
              {/* Filter Button */}
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              {/* Export Button */}
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleExportData}
                className="transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              {/* Fullscreen Button */}
              <Button size="sm" variant="outline">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dynamic Charts Based on User Type */}
      {getChartsForUserType()}
      
      {/* Analytics Summary */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Key Insights Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group cursor-pointer">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary group-hover:animate-pulse" />
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                Growth Trend
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === 'user' 
                  ? "Your engagement increased by 23% this quarter"
                  : "Revenue growth of 28% compared to last quarter"
                }
              </p>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="p-4 bg-secondary/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-secondary/20 transition-colors duration-300 flex items-center justify-center">
                <Target className="w-8 h-8 text-secondary group-hover:animate-pulse" />
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-secondary transition-colors duration-300">
                Peak Performance
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === 'user'
                  ? "Best engagement during weekend events"
                  : "Cricket events show highest ROI at 85%"
                }
              </p>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-accent/20 transition-colors duration-300 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent group-hover:animate-pulse" />
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-accent transition-colors duration-300">
                Audience Insight
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === 'user'
                  ? "You're in the top 15% of active users"
                  : "25-34 age group represents your largest audience"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};