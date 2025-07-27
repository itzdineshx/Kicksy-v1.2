import { useState, useEffect } from "react";
import { X, AlertTriangle, TrendingUp, Clock, Sparkles, Zap, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNotifications } from "./NotificationProvider";

interface SmartNotification {
  id: string;
  type: "price-alert" | "flash-sale" | "demand-surge" | "recommendation";
  title: string;
  message: string;
  action?: string;
  priority: "high" | "medium" | "low";
  autoHide?: boolean;
  duration?: number;
}

const MobileNotificationManager = () => {
  const [currentNotification, setCurrentNotification] = useState<SmartNotification | null>(null);
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const smartNotifications: SmartNotification[] = [
    {
      id: "price-surge-1",
      type: "price-alert",
      title: "Price Alert",
      message: "AI detected 23% price increase for Cricket World Cup Final",
      action: "Book Now",
      priority: "high",
      autoHide: false
    },
    {
      id: "flash-sale-1",
      type: "flash-sale",
      title: "Flash Sale!",
      message: "25% OFF Football tickets - 87 min left!",
      action: "Grab Deal",
      priority: "high",
      autoHide: false
    },
    {
      id: "demand-surge-1",
      type: "demand-surge",
      title: "High Demand",
      message: "94% booking probability - 23 seats left!",
      action: "View Tickets",
      priority: "medium",
      autoHide: true,
      duration: 8000
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      // Only show if no sheet is open and no current notification
      if (!isNotificationSheetOpen && !currentNotification) {
        const randomNotification = smartNotifications[Math.floor(Math.random() * smartNotifications.length)];
        setCurrentNotification(randomNotification);
        
        if (randomNotification.autoHide && randomNotification.duration) {
          setTimeout(() => {
            setCurrentNotification(null);
          }, randomNotification.duration);
        }
      }
    };

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(showNotification, 5000);
    
    // Show random notifications every 30-45 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 15000 + 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [currentNotification, isNotificationSheetOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price-alert":
        return <TrendingUp className="w-4 h-4" />;
      case "flash-sale":
        return <Zap className="w-4 h-4" />;
      case "demand-surge":
        return <AlertTriangle className="w-4 h-4" />;
      case "recommendation":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleClose = () => {
    setCurrentNotification(null);
  };

  const handleAction = () => {
    console.log("Notification action triggered:", currentNotification?.action);
    setCurrentNotification(null);
  };

  return (
    <>
      {/* Mobile Notification Bell */}
      <div className="md:hidden">
        <Sheet open={isNotificationSheetOpen} onOpenChange={setIsNotificationSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs h-5 w-5 flex items-center justify-center p-0">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-full sm:w-80 p-0">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {notifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={`p-3 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-accent/50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            notification.priority === 'high' ? 'bg-destructive/20' : 'bg-primary/20'
                          }`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <Bell className="w-8 h-8 mb-2" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Smart Notification Banner */}
      {currentNotification && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden mobile-safe-area">
          <Card className={`mobile-notification-banner p-4 shadow-lg border-2 backdrop-blur-sm animate-notification-slide-up ${
            currentNotification.priority === 'high' 
              ? 'border-destructive/50 bg-destructive/10' 
              : 'border-primary/50 bg-primary/10'
          } animate-fade-in`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                currentNotification.priority === 'high' ? 'bg-destructive/20' : 'bg-primary/20'
              } flex-shrink-0`}>
                {getNotificationIcon(currentNotification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-foreground">{currentNotification.title}</h4>
                  {currentNotification.priority === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      URGENT
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-foreground/80 mb-2 line-clamp-2 leading-relaxed">
                  {currentNotification.message}
                </p>
                
                <div className="flex items-center gap-2">
                  {currentNotification.action && (
                    <Button 
                      size="sm" 
                      variant={currentNotification.priority === "high" ? "default" : "outline"}
                      onClick={handleAction}
                      className="text-xs h-8"
                    >
                      {currentNotification.action}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleClose}
                    className="text-xs h-8 w-8 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default MobileNotificationManager;