import { useState } from "react";
import { Bell, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import NotificationService from "@/services/NotificationService";

const NotificationTester = () => {
  const [selectedNotification, setSelectedNotification] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const notificationTypes = [
    {
      id: "booking_confirmed",
      name: "Booking Confirmation",
      description: "Test booking confirmation with redirect to dashboard"
    },
    {
      id: "price_drop",
      name: "Price Drop Alert", 
      description: "Test price drop notification with redirect to event"
    },
    {
      id: "match_reminder",
      name: "Match Reminder",
      description: "Test match reminder with event details"
    },
    {
      id: "live_update",
      name: "Live Match Update",
      description: "Test live score update notification"
    }
  ];

  const simulateNotification = async () => {
    if (!selectedNotification) {
      toast({
        title: "Select notification type",
        description: "Please choose a notification type to test",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Show loading toast
      toast({
        title: "🔔 Sending notification...",
        description: "Simulating push notification delivery"
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      switch (selectedNotification) {
        case "booking_confirmed":
          await NotificationService.showBookingConfirmation({
            eventTitle: "India vs Australia ODI",
            bookingId: "BK123456",
            qrCodeUrl: "/placeholder.svg",
            seats: 2,
            venue: "Wankhede Stadium"
          });
          
          // Simulate redirect after notification
          setTimeout(() => {
            toast({
              title: "✅ Redirect triggered!",
              description: "Navigating to dashboard..."
            });
            navigate('/dashboard');
          }, 2000);
          break;

        case "price_drop":
          await NotificationService.showPriceDrop({
            eventTitle: "Mumbai Indians vs Chennai Super Kings",
            eventId: "123",
            oldPrice: 3500,
            newPrice: 2500,
            discount: 30
          });
          
          setTimeout(() => {
            toast({
              title: "🎯 Redirect triggered!",
              description: "Opening event details..."
            });
            navigate('/events/123');
          }, 2000);
          break;

        case "match_reminder":
          await NotificationService.scheduleMatchReminder({
            title: "India vs Australia ODI",
            teams: "IND vs AUS",
            venue: "Wankhede Stadium, Mumbai",
            reminderTime: new Date(Date.now() + 5000), // 5 seconds from now
            eventId: "456",
            image: "/hero-cricket.jpg"
          });
          
          toast({
            title: "⏰ Match reminder scheduled!",
            description: "You'll receive a reminder in 5 seconds"
          });
          break;

        case "live_update":
          await NotificationService.scheduleLiveMatchUpdates({
            title: "India vs Australia ODI",
            score: "IND 245/4 (45 overs)",
            eventId: "789"
          });
          
          toast({
            title: "🔴 Live updates scheduled!",
            description: "You'll receive live score updates"
          });
          break;
      }

      toast({
        title: "✅ Notification sent successfully!",
        description: "Check your notification panel or wait for the redirect"
      });

    } catch (error) {
      console.error('Notification test failed:', error);
      toast({
        title: "❌ Notification failed",
        description: "Failed to send test notification",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Select Notification Type
          </label>
          <Select value={selectedNotification} onValueChange={setSelectedNotification}>
            <SelectTrigger>
              <SelectValue placeholder="Choose notification type..." />
            </SelectTrigger>
            <SelectContent>
              {notificationTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div>
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {type.description}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={simulateNotification}
          disabled={!selectedNotification || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Test Notification
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          <CheckCircle className="w-4 h-4 inline mr-1" />
          This will simulate real push notifications with working redirects and visual feedback.
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationTester;