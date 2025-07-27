import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  type?: 'card' | 'metrics' | 'chart' | 'list';
  count?: number;
  className?: string;
}

export const LoadingState = React.memo<LoadingStateProps>(({ 
  type = 'card', 
  count = 1,
  className 
}) => {
  const renderLoadingCard = () => (
    <Card className={cn("border-0 bg-gradient-card shadow-floating", className)}>
      <CardHeader>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoadingMetrics = () => (
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
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-3 bg-muted rounded w-12"></div>
            <div className="h-3 bg-muted rounded w-16"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoadingChart = () => (
    <Card className={cn("border-0 bg-gradient-card shadow-floating", className)}>
      <CardHeader>
        <div className="animate-pulse">
          <div className="h-5 bg-muted rounded w-1/3"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoadingList = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-muted/40"
        >
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
          </div>
          <div className="flex-1 animate-pulse space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="flex justify-between items-center">
              <div className="h-3 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  switch (type) {
    case 'metrics':
      return renderLoadingMetrics();
    case 'chart':
      return renderLoadingChart();
    case 'list':
      return renderLoadingList();
    default:
      return renderLoadingCard();
  }
});

LoadingState.displayName = "LoadingState";