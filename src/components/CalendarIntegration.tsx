import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMockData } from "@/components/MockDataProvider";
import { useUserData } from "@/components/UserDataProvider";
import { 
  Calendar, 
  CalendarPlus, 
  Clock, 
  MapPin, 
  Download, 
  Smartphone, 
  Laptop,
  Share2,
  Bell,
  AlertCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  reminder: boolean;
}

export const CalendarIntegration: React.FC = () => {
  const { toast } = useToast();
  const { events } = useMockData();
  const { getUpcomingBookings } = useUserData();
  const [addedEvents, setAddedEvents] = useState<string[]>([]);

  const upcomingBookings = getUpcomingBookings();

  const createCalendarEvent = (eventData: any) => {
    const startDate = new Date(eventData.eventDate || eventData.date);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

    return {
      id: eventData.id,
      title: eventData.eventTitle || eventData.title,
      description: `Sports Event: ${eventData.eventTitle || eventData.title}\n\nVenue: ${eventData.venue}\nSeats: ${eventData.seats?.join(', ') || 'General Admission'}\n\nEnjoy the game!`,
      startDate,
      endDate,
      location: eventData.venue,
      reminder: true
    };
  };

  const generateICSFile = (event: CalendarEvent) => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sports Tickets//Event Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@sportstickets.com`,
      `DTSTART:${formatDate(event.startDate)}`,
      `DTEND:${formatDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      'STATUS:CONFIRMED',
      event.reminder ? 'BEGIN:VALARM' : '',
      event.reminder ? 'ACTION:DISPLAY' : '',
      event.reminder ? 'DESCRIPTION:Event Reminder' : '',
      event.reminder ? 'TRIGGER:-PT1H' : '', // 1 hour before
      event.reminder ? 'END:VALARM' : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(line => line !== '').join('\n');

    return icsContent;
  };

  const downloadICSFile = (event: CalendarEvent) => {
    const icsContent = generateICSFile(event);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setAddedEvents([...addedEvents, event.id]);
    
    toast({
      title: "Calendar File Downloaded!",
      description: "Import the .ics file to your calendar app",
    });
  };

  const addToGoogleCalendar = (event: CalendarEvent) => {
    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const googleUrl = new URL('https://calendar.google.com/calendar/render');
    googleUrl.searchParams.set('action', 'TEMPLATE');
    googleUrl.searchParams.set('text', event.title);
    googleUrl.searchParams.set('dates', `${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}`);
    googleUrl.searchParams.set('details', event.description);
    googleUrl.searchParams.set('location', event.location);
    googleUrl.searchParams.set('sf', 'true');
    googleUrl.searchParams.set('output', 'xml');

    window.open(googleUrl.toString(), '_blank');
    
    setAddedEvents([...addedEvents, event.id]);
    
    toast({
      title: "Redirected to Google Calendar",
      description: "Event details pre-filled for you",
    });
  };

  const addToOutlook = (event: CalendarEvent) => {
    const outlookUrl = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
    outlookUrl.searchParams.set('subject', event.title);
    outlookUrl.searchParams.set('startdt', event.startDate.toISOString());
    outlookUrl.searchParams.set('enddt', event.endDate.toISOString());
    outlookUrl.searchParams.set('body', event.description);
    outlookUrl.searchParams.set('location', event.location);

    window.open(outlookUrl.toString(), '_blank');
    
    setAddedEvents([...addedEvents, event.id]);
    
    toast({
      title: "Redirected to Outlook",
      description: "Event details pre-filled for you",
    });
  };

  const isEventAdded = (eventId: string) => addedEvents.includes(eventId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
          Calendar Integration
        </h2>
      </div>

      {/* Your Upcoming Events */}
      {upcomingBookings.length > 0 && (
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="w-5 h-5 text-primary" />
              Your Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.map(booking => {
              const calendarEvent = createCalendarEvent(booking);
              return (
                <div key={booking.id} className="p-4 rounded-lg border bg-background">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{booking.eventTitle}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Seats: {booking.seats.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    {isEventAdded(booking.id) && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Added
                      </Badge>
                    )}
                  </div>

                  <Separator className="my-3" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToGoogleCalendar(calendarEvent)}
                      disabled={isEventAdded(booking.id)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToOutlook(calendarEvent)}
                      disabled={isEventAdded(booking.id)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Outlook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadICSFile(calendarEvent)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.share?.({
                          title: calendarEvent.title,
                          text: `${calendarEvent.title} - ${calendarEvent.location}`,
                          url: window.location.href
                        });
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Featured Events to Add */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Add Events to Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.slice(0, 4).map(event => {
            const calendarEvent = createCalendarEvent(event);
            return (
              <div key={event.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{event.category}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToGoogleCalendar(calendarEvent)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToOutlook(calendarEvent)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Outlook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadICSFile(calendarEvent)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="default" size="sm">
                    Book Tickets
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Calendar Features */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6" />
            <h3 className="text-lg font-bold">Calendar Features</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5" />
                <span className="font-semibold">Mobile Sync</span>
              </div>
              <p className="text-sm opacity-90">
                Works with iPhone, Android, and all major calendar apps
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5" />
                <span className="font-semibold">Smart Reminders</span>
              </div>
              <p className="text-sm opacity-90">
                Get notified 1 hour before the event starts
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Laptop className="w-5 h-5" />
                <span className="font-semibold">Desktop Integration</span>
              </div>
              <p className="text-sm opacity-90">
                Sync with Outlook, Google Calendar, and Apple Calendar
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Pro Tip:</h4>
                <p className="text-sm opacity-90">
                  Download .ics files for maximum compatibility across all devices and platforms. 
                  The calendar event includes all your ticket details and venue information.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};