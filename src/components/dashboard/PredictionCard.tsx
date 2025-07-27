import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Sparkles, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PredictionCardProps {
  event: string;
  currentSales: number;
  predictedFinal: number;
  trend: 'up' | 'down' | 'moderate';
  suggestion: string;
  confidence: number;
  urgency: 'high' | 'medium' | 'low';
  onApplySuggestion?: (event: string) => void;
}

export const PredictionCard = React.memo<PredictionCardProps>(({
  event,
  currentSales,
  predictedFinal,
  trend,
  suggestion,
  confidence,
  urgency,
  onApplySuggestion
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Target className="w-4 h-4 text-orange-500" />;
    }
  };

  const getUrgencyColor = () => {
    switch (urgency) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const handleApplySuggestion = async () => {
    setIsApplying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onApplySuggestion?.(event);
      
      toast({
        title: "Suggestion Applied! ✨",
        description: `AI recommendation for ${event} has been implemented.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply suggestion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className={cn(
      "hover:shadow-floating transition-all duration-300 hover:scale-[1.02]",
      urgency === 'high' && "ring-2 ring-red-500/20 animate-pulse"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{event}</CardTitle>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            {urgency === 'high' && (
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sales Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Sales</span>
            <span className="font-medium">{currentSales}%</span>
          </div>
          <Progress 
            value={currentSales} 
            className="h-2 transition-all duration-500" 
          />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Predicted Final</span>
            <span className="font-medium text-primary">{predictedFinal}%</span>
          </div>
          <Progress 
            value={predictedFinal} 
            className="h-2 opacity-60" 
          />
        </div>

        {/* AI Suggestion */}
        <div className="bg-muted/30 p-4 rounded-lg border border-muted/40 transition-colors duration-300 hover:bg-muted/40">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI Suggestion</span>
            <Badge className={getUrgencyColor()}>
              {urgency.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {confidence}% confident
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {suggestion}
          </p>
          
          <Button 
            size="sm" 
            variant={urgency === 'high' ? "default" : "outline"}
            className="w-full transition-all duration-300 hover:scale-[1.02]"
            onClick={handleApplySuggestion}
            disabled={isApplying}
          >
            {isApplying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Applying...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Apply Suggestion
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

PredictionCard.displayName = "PredictionCard";