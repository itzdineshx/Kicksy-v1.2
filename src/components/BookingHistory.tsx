import { useState } from "react";
import { Calendar, MapPin, Users, Download, Eye, Star, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  eventTitle: string;
  eventSubtitle?: string;
  date: string;
  time: string;
  venue: string;
  seats: number;
  category: string;
  totalAmount: number;
  bookingDate: string;
  status: "confirmed" | "completed" | "cancelled";
  qrCode?: string;
  eventCategory: string;
}

const BookingHistory = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  const bookings: Booking[] = [
    {
      id: "BK001",
      eventTitle: "IPL 2024 Finals",
      eventSubtitle: "Mumbai Indians vs Chennai Super Kings",
      date: "Dec 22, 2024",
      time: "7:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      seats: 2,
      category: "Premium",
      totalAmount: 3300,
      bookingDate: "Nov 15, 2025",
      status: "confirmed",
      eventCategory: "Cricket"
    },
    {
      id: "BK002",
      eventTitle: "Badminton Premier League",
      eventSubtitle: "PV Sindhu vs Carolina Marin",
      date: "Nov 10, 2025",
      time: "6:00 PM",
      venue: "KD Jadhav Indoor Hall, Delhi",
      seats: 1,
      category: "VIP",
      totalAmount: 2750,
      bookingDate: "Oct 20, 2025",
      status: "completed",
      eventCategory: "Badminton"
    },
    {
      id: "BK003",
      eventTitle: "Hockey India League",
      eventSubtitle: "Punjab Warriors vs Mumbai Magicians",
      date: "Oct 5, 2025",
      time: "4:00 PM",
      venue: "Major Dhyan Chand Stadium, Delhi",
      seats: 4,
      category: "Regular",
      totalAmount: 2200,
      bookingDate: "Sep 15, 2025",
      status: "completed",
      eventCategory: "Hockey"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Cricket: "bg-primary",
      Football: "bg-secondary",
      Badminton: "bg-tertiary",
      Hockey: "bg-accent",
      Tennis: "bg-primary",
      Kabaddi: "bg-secondary"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  const handleDownloadTicket = (booking: Booking) => {
    toast({
      title: "Downloading Ticket",
      description: `Ticket for ${booking.eventTitle} is being downloaded`,
    });
  };

  const handleViewQR = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const filterBookings = (status?: string) => {
    if (!status) return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card key={booking.id} className="hover:shadow-floating transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(booking.eventCategory)} text-white`}>
                {booking.eventCategory}
              </Badge>
              <Badge className={`${getStatusColor(booking.status)} text-white`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {booking.eventTitle}
            </CardTitle>
            {booking.eventSubtitle && (
              <p className="text-sm text-muted-foreground mt-1">{booking.eventSubtitle}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Booking ID</div>
            <div className="font-mono text-sm">{booking.id}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{booking.date} • {booking.time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{booking.venue}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>{booking.seats} {booking.seats === 1 ? 'seat' : 'seats'} • {booking.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <div className="text-lg font-bold text-primary">₹{booking.totalAmount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Booked on {booking.bookingDate}</div>
          </div>
          
          <div className="flex gap-2">
            {booking.status === "confirmed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewQR(booking)}
                className="hover:shadow-floating transition-all duration-300"
              >
                <QrCode className="w-4 h-4 mr-1" />
                QR
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadTicket(booking)}
              className="hover:shadow-floating transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-1" />
              Ticket
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
          My Bookings
        </h2>
        <Badge variant="outline" className="text-sm">
          {bookings.length} Total Bookings
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {bookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="confirmed" className="mt-6">
          <div className="grid gap-4">
            {filterBookings("confirmed").map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-4">
            {filterBookings("completed").map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No cancelled bookings</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* QR Code Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Entry QR Code</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-48 h-48 bg-white border rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                  <p className="text-xs font-mono">{selectedBooking.id}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">{selectedBooking.eventTitle}</h4>
                <p className="text-sm text-muted-foreground">{selectedBooking.date} • {selectedBooking.time}</p>
                <p className="text-xs text-muted-foreground">
                  Show this QR code at the venue entrance
                </p>
              </div>
              
              <Button onClick={() => handleDownloadTicket(selectedBooking)} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingHistory;