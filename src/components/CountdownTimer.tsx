import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
  variant?: "deal" | "event" | "price";
  className?: string;
}

const CountdownTimer = ({ 
  targetDate, 
  title = "Time Remaining", 
  variant = "deal",
  className = ""
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const getVariantStyles = () => {
    switch (variant) {
      case "deal":
        return "bg-red-500/10 border-red-500/20 text-red-700";
      case "event":
        return "bg-primary/10 border-primary/20 text-primary";
      case "price":
        return "bg-orange-500/10 border-orange-500/20 text-orange-700";
      default:
        return "bg-muted/10 border-muted/20 text-muted-foreground";
    }
  };

  const isUrgent = timeLeft.hours < 2;

  return (
    <Card className={`p-4 border-2 ${getVariantStyles()} ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Clock className={`w-4 h-4 ${isUrgent ? 'animate-pulse' : ''}`} />
        <span className="font-medium text-sm">{title}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-center">
          <div className={`text-2xl font-bold ${isUrgent ? 'animate-pulse text-red-500' : ''}`}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs opacity-70">Hours</div>
        </div>
        
        <div className="text-xl font-bold opacity-50">:</div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${isUrgent ? 'animate-pulse text-red-500' : ''}`}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs opacity-70">Min</div>
        </div>
        
        <div className="text-xl font-bold opacity-50">:</div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${isUrgent ? 'animate-pulse text-red-500' : ''}`}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs opacity-70">Sec</div>
        </div>
      </div>
      
      {isUrgent && timeLeft.hours > 0 && (
        <div className="mt-2 text-xs font-medium text-red-500 animate-pulse">
          ⚡ Hurry! Deal expires soon!
        </div>
      )}
    </Card>
  );
};

export default CountdownTimer;