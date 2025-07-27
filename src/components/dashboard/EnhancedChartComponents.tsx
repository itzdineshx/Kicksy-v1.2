import React from "react";
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
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Users, Calendar, Activity, Award } from "lucide-react";

interface ChartComponentProps {
  data: any[];
  title: string;
  subtitle?: string;
  loading?: boolean;
  className?: string;
}

// Revenue Analytics Chart
export const RevenueAnalyticsChart: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  subtitle, 
  loading, 
  className 
}) => (
  <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        {title}
        {subtitle && <Badge variant="secondary">{subtitle}</Badge>}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-muted-foreground text-xs"
          />
          <YAxis yAxisId="revenue" className="text-muted-foreground text-xs" />
          <YAxis yAxisId="bookings" orientation="right" className="text-muted-foreground text-xs" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            }}
          />
          <Bar 
            yAxisId="revenue"
            dataKey="revenue" 
            fill="hsl(var(--primary))" 
            fillOpacity={0.8}
            radius={[4, 4, 0, 0]}
          />
          <Line 
            yAxisId="bookings"
            type="monotone" 
            dataKey="bookings" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Sports Performance Radar
export const SportsPerformanceRadar: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  loading, 
  className 
}) => (
  <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid className="opacity-30" />
          <PolarAngleAxis dataKey="sport" className="text-xs" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            className="text-xs opacity-60"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            }}
          />
          <Radar
            name="Performance"
            dataKey="performance"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Popularity"
            dataKey="popularity"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Audience Demographics Pie Chart
export const AudienceDemographicsChart: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  loading, 
  className 
}) => {
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))'
  ];

  return (
    <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-medium">{entry.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {entry.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Event Timeline Chart
export const EventTimelineChart: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  loading, 
  className 
}) => (
  <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
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
            dataKey="events"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="attendance"
            stackId="2"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Performance Scatter Plot
export const PerformanceScatterChart: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  loading, 
  className 
}) => (
  <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            type="number" 
            dataKey="satisfaction" 
            name="Satisfaction"
            domain={[0, 100]}
            className="text-muted-foreground text-xs"
          />
          <YAxis 
            type="number" 
            dataKey="revenue" 
            name="Revenue"
            className="text-muted-foreground text-xs"
          />
          <ZAxis type="number" dataKey="attendance" range={[50, 300]} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            }}
            formatter={(value, name) => {
              if (name === 'satisfaction') return [`${value}%`, 'Satisfaction'];
              if (name === 'revenue') return [`₹${value}K`, 'Revenue'];
              return [value, name];
            }}
          />
          <Scatter 
            name="Events" 
            dataKey="revenue" 
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

// Trend Comparison Chart
export const TrendComparisonChart: React.FC<ChartComponentProps> = ({ 
  data, 
  title, 
  loading, 
  className 
}) => (
  <Card className={`border-0 bg-gradient-card shadow-floating ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="period" 
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
          <Line
            type="monotone"
            dataKey="currentYear"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            name="2024"
          />
          <Line
            type="monotone"
            dataKey="previousYear"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="8 8"
            dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 3 }}
            name="2023"
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);