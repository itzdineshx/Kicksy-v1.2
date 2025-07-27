import { AlertTriangle, Clock, Flame, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UrgencyProgressProps {
  seatsLeft: number;
  totalSeats: number;
  title?: string;
  showCountdown?: boolean;
  className?: string;
}

const UrgencyProgress = ({ 
  seatsLeft, 
  totalSeats, 
  title = "Seats Filling Fast",
  showCountdown = true,
  className = ""
}: UrgencyProgressProps) => {
  const percentage = ((totalSeats - seatsLeft) / totalSeats) * 100;
  
  const getUrgencyLevel = () => {
    if (percentage >= 90) return "critical";
    if (percentage >= 75) return "high";
    if (percentage >= 50) return "medium";
    return "low";
  };

  const urgency = getUrgencyLevel();

  const getProgressColor = () => {
    switch (urgency) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getUrgencyMessage = () => {
    switch (urgency) {
      case "critical":
        return { 
          text: "Almost Sold Out!", 
          icon: AlertTriangle, 
          color: "text-red-500",
          badgeClass: "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
        };
      case "high":
        return { 
          text: "Selling Fast!", 
          icon: Flame, 
          color: "text-orange-500",
          badgeClass: "bg-orange-500/10 text-orange-500 border-orange-500/20"
        };
      case "medium":
        return { 
          text: "Good Demand", 
          icon: Users, 
          color: "text-yellow-600",
          badgeClass: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
        };
      default:
        return { 
          text: "Plenty Available", 
          icon: Users, 
          color: "text-green-500",
          badgeClass: "bg-green-500/10 text-green-500 border-green-500/20"
        };
    }
  };

  const urgencyInfo = getUrgencyMessage();
  const Icon = urgencyInfo.icon;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Badge className={urgencyInfo.badgeClass}>
          <Icon className="w-3 h-3 mr-1" />
          {urgencyInfo.text}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress 
          value={percentage} 
          className={`h-3 ${urgency === 'critical' ? 'animate-pulse' : ''}`}
        />
        
        <div className="flex items-center justify-between text-xs">
          <span className={urgencyInfo.color}>
            {Math.round(percentage)}% filled
          </span>
          <span className="text-muted-foreground">
            {seatsLeft} seats left
          </span>
        </div>
      </div>

      {/* Countdown or urgency message */}
      {showCountdown && urgency === "critical" && (
        <div className="flex items-center gap-2 text-xs text-red-500 animate-pulse">
          <Clock className="w-3 h-3" />
          <span className="font-medium">
            Only {seatsLeft} seats remaining! Book now to secure your spot.
          </span>
        </div>
      )}

      {urgency === "high" && showCountdown && (
        <div className="flex items-center gap-2 text-xs text-orange-500">
          <Flame className="w-3 h-3" />
          <span className="font-medium">
            High demand - {seatsLeft} seats available
          </span>
        </div>
      )}
    </div>
  );
};

export default UrgencyProgress;