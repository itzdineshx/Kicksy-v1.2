import { TrendingUp, Clock, Users, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DemandIndicatorProps {
  demand: "high" | "medium" | "low";
  seatsLeft?: number;
  totalSeats?: number;
  prediction?: string;
  className?: string;
}

const DemandIndicator = ({ 
  demand, 
  seatsLeft = 0, 
  totalSeats = 1000, 
  prediction,
  className = ""
}: DemandIndicatorProps) => {
  const getDemandColor = () => {
    switch (demand) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getDemandBadge = () => {
    switch (demand) {
      case "high":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 animate-pulse">
            <Flame className="w-3 h-3 mr-1" />
            High Demand
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            Moderate Demand
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <Users className="w-3 h-3 mr-1" />
            Good Availability
          </Badge>
        );
      default:
        return null;
    }
  };

  const getUrgencyMessage = () => {
    const percentage = ((totalSeats - seatsLeft) / totalSeats) * 100;
    
    if (percentage > 90) {
      return { message: "Almost Sold Out!", color: "text-red-500", animate: "animate-pulse" };
    } else if (percentage > 75) {
      return { message: "Selling Fast!", color: "text-orange-500", animate: "" };
    } else if (percentage > 50) {
      return { message: "Good Availability", color: "text-green-500", animate: "" };
    } else {
      return { message: "Plenty Available", color: "text-muted-foreground", animate: "" };
    }
  };

  const urgency = getUrgencyMessage();
  const filledPercentage = ((totalSeats - seatsLeft) / totalSeats) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Demand Badge */}
      <div className="flex items-center justify-between">
        {getDemandBadge()}
        {prediction && (
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            {prediction}
          </Badge>
        )}
      </div>

      {/* Seats Left Indicator */}
      {seatsLeft > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${urgency.color} ${urgency.animate}`}>
              {urgency.message}
            </span>
            <span className="text-muted-foreground">
              {seatsLeft} left
            </span>
          </div>
          
          <Progress 
            value={filledPercentage} 
            className="h-2"
          />
          
          {demand === "high" && seatsLeft < 50 && (
            <div className="flex items-center gap-1 text-xs text-red-500 animate-pulse">
              <Clock className="w-3 h-3" />
              <span>Hurry! Only {seatsLeft} tickets left</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DemandIndicator;