import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface RefreshButtonProps {
  onRefresh: () => void;
  lastUpdated?: Date | null;
  isStale?: boolean;
  loading?: boolean;
  className?: string;
}

export const RefreshButton = React.memo<RefreshButtonProps>(({
  onRefresh,
  lastUpdated,
  isStale = false,
  loading = false,
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      await onRefresh();
      toast({
        title: "Data Refreshed! ✨",
        description: "Dashboard data has been updated with the latest information.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh data. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never";
    
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  const isCurrentlyLoading = loading || isRefreshing;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Status Badge */}
      <Badge 
        variant={isStale ? "destructive" : "secondary"}
        className={cn(
          "transition-all duration-300",
          isStale && "animate-pulse"
        )}
      >
        {isStale ? (
          <>
            <WifiOff className="w-3 h-3 mr-1" />
            Stale Data
          </>
        ) : (
          <>
            <Wifi className="w-3 h-3 mr-1" />
            Live
          </>
        )}
      </Badge>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          Updated {formatLastUpdated()}
        </div>
      )}

      {/* Refresh Button */}
      <Button
        size="sm"
        variant={isStale ? "default" : "outline"}
        onClick={handleRefresh}
        disabled={isCurrentlyLoading}
        className={cn(
          "transition-all duration-300 hover:scale-105",
          isStale && "animate-pulse"
        )}
      >
        <RefreshCw 
          className={cn(
            "w-4 h-4 mr-2",
            isCurrentlyLoading && "animate-spin"
          )} 
        />
        {isCurrentlyLoading ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
});

RefreshButton.displayName = "RefreshButton";