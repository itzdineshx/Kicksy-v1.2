import { useState, useEffect } from "react";
import { X, AlertTriangle, TrendingUp, Clock, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "price-alert" | "flash-sale" | "demand-surge" | "recommendation";
  title: string;
  message: string;
  action?: string;
  priority: "high" | "medium" | "low";
  autoHide?: boolean;
  duration?: number;
}

const SmartNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const smartNotifications: Notification[] = [
    {
      id: "price-surge-1",
      type: "price-alert",
      title: "Price Alert",
      message: "AI detected 23% price increase for Cricket World Cup Final based on demand patterns!",
      action: "Book Now",
      priority: "high",
      autoHide: false
    },
    {
      id: "flash-sale-1",
      type: "flash-sale",
      title: "AI Flash Sale Triggered!",
      message: "Dynamic pricing activated: 25% OFF Football League tickets expires in 87 minutes!",
      action: "Grab Deal",
      priority: "high",
      autoHide: false
    },
    {
      id: "demand-surge-1",
      type: "demand-surge",
      title: "AI Demand Surge",
      message: "Predictive analytics show 94% booking probability - Only 23 premium seats remain!",
      action: "View Tickets",
      priority: "medium",
      autoHide: true,
      duration: 8000
    },
    {
      id: "ai-recommendation-1",
      type: "recommendation",
      title: "Smart Recommendation Engine",
      message: "ML algorithms found 3 events with 96% match to your preferences this weekend!",
      action: "See AI Picks",
      priority: "low",
      autoHide: true,
      duration: 6000
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = smartNotifications[Math.floor(Math.random() * smartNotifications.length)];
      setCurrentNotification(randomNotification);
      
      if (randomNotification.autoHide && randomNotification.duration) {
        setTimeout(() => {
          setCurrentNotification(null);
        }, randomNotification.duration);
      }
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000);
    
    // Show random notifications every 20-30 seconds
    const interval = setInterval(() => {
      if (!currentNotification) {
        showNotification();
      }
    }, Math.random() * 10000 + 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [currentNotification]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price-alert":
        return <TrendingUp className="w-5 h-5" />;
      case "flash-sale":
        return <Zap className="w-5 h-5" />;
      case "demand-surge":
        return <AlertTriangle className="w-5 h-5" />;
      case "recommendation":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") {
      return "border-red-500/50 bg-red-500/20 text-red-900 ring-2 ring-red-500/30 shadow-lg shadow-red-500/25";
    }
    
    switch (type) {
      case "price-alert":
        return "border-orange-500/50 bg-orange-500/20 text-orange-900 ring-2 ring-orange-500/30 shadow-lg shadow-orange-500/25";
      case "flash-sale":
        return "border-primary/50 bg-primary/20 text-primary-foreground ring-2 ring-primary/30 shadow-lg shadow-primary/25";
      case "demand-surge":
        return "border-yellow-500/50 bg-yellow-500/20 text-yellow-900 ring-2 ring-yellow-500/30 shadow-lg shadow-yellow-500/25";
      case "recommendation":
        return "border-purple-500/50 bg-purple-500/20 text-purple-900 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/25";
      default:
        return "border-muted-foreground/50 bg-muted/20 text-muted-foreground ring-2 ring-muted/30";
    }
  };

  const handleClose = () => {
    setCurrentNotification(null);
  };

  const handleAction = () => {
    // In a real app, this would trigger the appropriate action
    console.log("Notification action triggered:", currentNotification?.action);
    setCurrentNotification(null);
  };

  if (!currentNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm animate-slide-in-right hidden md:block">
      <Card className={`p-6 shadow-2xl border-2 backdrop-blur-sm ${getNotificationColor(currentNotification.type, currentNotification.priority)} ${currentNotification.priority === 'high' ? 'animate-notification-glow' : 'animate-float'} transform hover:scale-105 transition-all duration-300`}>
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-full ${currentNotification.priority === 'high' ? 'bg-red-500/20 animate-pulse' : 'bg-primary/20'} ring-2 ${currentNotification.priority === 'high' ? 'ring-red-500/40' : 'ring-primary/40'}`}>
            <div className="w-6 h-6">{getNotificationIcon(currentNotification.type)}</div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-lg">{currentNotification.title}</h4>
              {currentNotification.priority === "high" && (
                <Badge variant="destructive" className="text-xs animate-pulse font-bold">
                  🚨 URGENT
                </Badge>
              )}
            </div>
            <p className="text-sm opacity-90 mb-3 leading-relaxed">
              {currentNotification.message}
            </p>
            
            <div className="flex items-center gap-2">
              {currentNotification.action && (
                <Button 
                  size="sm" 
                  variant={currentNotification.priority === "high" ? "default" : "outline"}
                  onClick={handleAction}
                  className="text-xs"
                >
                  {currentNotification.action}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleClose}
                className="text-xs"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmartNotifications;