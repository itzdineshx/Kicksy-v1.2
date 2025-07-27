import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bell, X, Calendar, Trophy, MapPin, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NotificationService from '@/services/NotificationService';

export interface Notification {
  id: string;
  type: 'booking' | 'match' | 'price' | 'reminder' | 'live' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
  priority?: 'low' | 'medium' | 'high';
  actionable?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  scheduleNotification: (notification: any) => void;
  enablePushNotifications: () => Promise<boolean>;
  pushNotificationsEnabled: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your tickets for IPL 2025 Finals have been confirmed',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high',
      actionable: true,
      data: { eventId: '1', bookingId: 'BK001' }
    },
    {
      id: '2',
      type: 'match',
      title: 'Match Starting Soon',
      message: 'India vs Australia starts in 30 minutes',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium',
      actionable: true,
      data: { eventId: '2' }
    },
    {
      id: '3',
      type: 'price',
      title: 'Price Drop Alert',
      message: 'Hockey India League tickets now ₹400 (was ₹500)',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: true,
      priority: 'medium',
      actionable: true,
      data: { eventId: '3', oldPrice: 500, newPrice: 400 }
    },
    {
      id: '4',
      type: 'live',
      title: 'Live Score Update',
      message: 'India: 156/3 (25 overs) - Virat Kohli hits a boundary!',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      read: false,
      priority: 'low',
      actionable: false,
      data: { matchId: 'IND_AUS_001' }
    }
  ]);

  useEffect(() => {
    // Initialize notification service
    NotificationService.initialize().then(() => {
      setPushNotificationsEnabled(NotificationService.isPermissionGranted());
    });

    // Set up demo notifications for testing
    const demoTimer = setTimeout(() => {
      addNotification({
        type: 'reminder',
        title: 'Match Reminder',
        message: 'Mumbai City FC vs Kerala Blasters starts in 2 hours',
        priority: 'medium',
        actionable: true,
        data: { eventId: '5' }
      });
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(demoTimer);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const scheduleNotification = async (notificationData: any) => {
    try {
      await NotificationService.scheduleMatchReminder(notificationData);
      addNotification({
        type: 'reminder',
        title: 'Reminder Set',
        message: `You'll be notified about ${notificationData.title}`,
        priority: 'low'
      });
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  const enablePushNotifications = async (): Promise<boolean> => {
    try {
      await NotificationService.initialize();
      const enabled = NotificationService.isPermissionGranted();
      setPushNotificationsEnabled(enabled);
      return enabled;
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
      return false;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
      unreadCount,
      scheduleNotification,
      enablePushNotifications,
      pushNotificationsEnabled
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, enablePushNotifications, pushNotificationsEnabled } = useNotifications();

  if (!isOpen) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'match': return <Trophy className="w-4 h-4 text-accent" />;
      case 'price': return <DollarSign className="w-4 h-4 text-secondary" />;
      case 'reminder': return <Calendar className="w-4 h-4 text-tertiary" />;
      case 'live': return <Trophy className="w-4 h-4 text-destructive animate-pulse" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="absolute top-full right-0 w-96 max-h-[500px] bg-card border border-border rounded-lg shadow-floating z-50 mt-2 overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center gap-2">
            {!pushNotificationsEnabled && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={enablePushNotifications}
                className="text-xs"
              >
                Enable Push
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {notifications.length > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
            Mark all read
          </Button>
        )}
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
            <p className="text-xs mt-1">You'll see booking updates, match alerts, and more here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-accent/10 ${
                !notification.read ? "bg-primary/5 border-l-4 border-l-primary" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {notification.title}
                      </p>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {notification.actionable && (
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        View
                      </Button>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {pushNotificationsEnabled && (
        <div className="p-3 border-t border-border bg-muted/10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-3 h-3 text-primary" />
            <span>Push notifications enabled</span>
          </div>
        </div>
      )}
    </div>
  );
};