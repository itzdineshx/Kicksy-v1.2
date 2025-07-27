import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
  loading?: boolean;
}

export const MetricsCard = React.memo<MetricsCardProps>(({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className={cn("border-0 bg-gradient-card shadow-floating", className)}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </div>
              <div className="w-12 h-12 bg-muted rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "border-0 bg-gradient-card shadow-floating transition-all duration-300 hover:shadow-floating-lg hover:scale-[1.02]", 
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold text-foreground animate-fade-in">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="p-3 rounded-full bg-primary/10 transition-colors duration-300 hover:bg-primary/20">
            {icon}
          </div>
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center mt-4 text-sm">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={cn(
              "font-medium",
              trend >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-muted-foreground ml-1">vs last month</span>
            
            {Math.abs(trend) > 20 && (
              <Badge 
                variant={trend >= 0 ? "default" : "destructive"} 
                className="ml-2 text-xs animate-pulse"
              >
                {trend >= 0 ? "🚀 High Growth" : "⚠️ Needs Attention"}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

MetricsCard.displayName = "MetricsCard";