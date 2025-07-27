import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Target, Calendar, Users, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface InsightCardProps {
  id: string;
  type: 'pricing' | 'marketing' | 'inventory' | 'capacity';
  title: string;
  message: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  confidence: number;
  timestamp: Date;
  onActionClick?: (id: string, action: string) => void;
}

export const InsightCard = React.memo<InsightCardProps>(({
  id,
  type,
  title,
  message,
  action,
  priority,
  impact,
  confidence,
  timestamp,
  onActionClick
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const getTypeIcon = () => {
    switch (type) {
      case "pricing":
        return <DollarSign className="w-4 h-4 text-primary" />;
      case "marketing":
        return <Target className="w-4 h-4 text-primary" />;
      case "inventory":
        return <Calendar className="w-4 h-4 text-primary" />;
      case "capacity":
        return <Users className="w-4 h-4 text-primary" />;
      default:
        return <Zap className="w-4 h-4 text-primary" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const handleAction = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onActionClick?.(id, action);
      
      toast({
        title: "Action Completed! 🎯",
        description: `${action} has been successfully implemented.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const timeAgo = React.useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  }, [timestamp]);

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-muted/40",
      "hover:bg-muted/40 transition-all duration-300 hover:scale-[1.01]",
      priority === 'high' && "ring-2 ring-red-500/20"
    )}>
      {/* Icon */}
      <div className="p-2 rounded-full bg-primary/10 transition-transform duration-300 hover:scale-110">
        {getTypeIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <Badge className={getPriorityColor()}>
            {priority.toUpperCase()}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {timeAgo}
          </div>
        </div>
        
        {/* Message */}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {message}
        </p>
        
        {/* Impact & Confidence */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Expected Impact</div>
            <div className="font-medium text-green-600 text-sm">{impact}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="font-bold text-primary">{confidence}%</div>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          size="sm" 
          variant={priority === 'high' ? "default" : "outline"}
          className="transition-all duration-300 hover:scale-[1.02]"
          onClick={handleAction}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              {action}
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

InsightCard.displayName = "InsightCard";