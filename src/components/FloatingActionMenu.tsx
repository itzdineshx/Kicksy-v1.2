import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Plus, 
  Search, 
  Calendar, 
  Heart, 
  ShoppingCart, 
  Bell, 
  MessageCircle,
  Share2,
  Zap,
  X
} from "lucide-react";

interface ActionItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
  notification?: number;
}

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState({
    cart: 3,
    notifications: 7,
    messages: 2
  });

  const actionItems: ActionItem[] = [
    {
      id: 'search',
      label: 'Quick Search',
      icon: Search,
      action: () => console.log('Search clicked'),
      color: 'bg-primary hover:bg-primary/90'
    },
    {
      id: 'calendar',
      label: 'My Events',
      icon: Calendar,
      action: () => console.log('Calendar clicked'),
      color: 'bg-secondary hover:bg-secondary/90'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      action: () => console.log('Wishlist clicked'),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      action: () => console.log('Cart clicked'),
      color: 'bg-green-500 hover:bg-green-600',
      notification: notifications.cart
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      action: () => console.log('Notifications clicked'),
      color: 'bg-orange-500 hover:bg-orange-600',
      notification: notifications.notifications
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      action: () => console.log('Messages clicked'),
      color: 'bg-blue-500 hover:bg-blue-600',
      notification: notifications.messages
    },
    {
      id: 'share',
      label: 'Share App',
      icon: Share2,
      action: () => console.log('Share clicked'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
        {/* Action Items */}
        <div className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-4 scale-90 pointer-events-none'
        }`}>
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className={`relative w-12 h-12 rounded-full shadow-floating ${item.color} text-white animate-scale-in hover:scale-110 transition-all duration-300`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.notification && (
                      <Badge 
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-red-500 text-white border-2 border-background animate-pulse-glow"
                      >
                        {item.notification}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-card text-foreground border border-border/50">
                  <p className="font-medium">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Main FAB */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={`w-14 h-14 rounded-full shadow-stadium bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 ${
                isOpen ? 'rotate-45 scale-110' : 'hover:scale-105'
              }`}
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <div className="relative">
                  <Plus className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1">
                    <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-card text-foreground border border-border/50">
            <p className="font-medium">{isOpen ? 'Close Menu' : 'Quick Actions'}</p>
          </TooltipContent>
        </Tooltip>

        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default FloatingActionMenu;