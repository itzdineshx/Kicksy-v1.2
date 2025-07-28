import { useState } from "react";
import { Calendar, MapPin, Ticket, Star, Clock, CreditCard, User, Settings, LogOut, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/components/WishlistProvider";
import { 
  AudienceDemographicsChart, 
  TrendComparisonChart 
} from "@/components/dashboard/EnhancedChartComponents";

const UserDashboard = () => {
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("bookings");

  const userInfo = {
    name: "DINESH S",
    email: "personalaccdinesh@gmail.com",
    phone: "+91 98765 43210",
    joinDate: "January 2024",
    totalBookings: 15,
    totalSpent: "₹45,230"
  };

  const upcomingBookings = [
    {
      id: "TKT001",
      event: "India vs Australia ODI",
      date: "Dec 15, 2024",
      time: "2:30 PM",
      venue: "Wankhede Stadium, Mumbai",
      category: "Cricket",
      seats: "Block A, Row 5, Seats 12-13",
      seatCount: 2,
      amount: "₹3,000",
      status: "Confirmed",
      qrCode: "data:image/svg+xml;base64,..."
    },
    {
      id: "TKT002",
      event: "Mumbai City FC vs Kerala Blasters",
      date: "Dec 18, 2024",
      time: "7:30 PM",
      venue: "DY Patil Stadium, Mumbai",
      category: "Football",
      seats: "East Stand, Row 10, Seats 25-26",
      seatCount: 2,
      amount: "₹1,600",
      status: "Confirmed",
      qrCode: "data:image/svg+xml;base64,..."
    }
  ];

  const pastBookings = [
    {
      id: "TKT000",
      event: "RCB vs CSK",
      date: "Nov 28, 2024",
      time: "7:30 PM",
      venue: "Chinnaswamy Stadium, Bengaluru",
      category: "Cricket",
      seats: "Premium Box 2, Seats 5-6",
      seatCount: 2,
      amount: "₹4,000",
      status: "Attended",
      rating: 5
    }
  ];

  const favoriteEvents = [
    { name: "IPL Matches", count: 8 },
    { name: "ISL Football", count: 4 },
    { name: "Pro Kabaddi", count: 3 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-sports bg-clip-text text-transparent">
                    {userInfo.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">{userInfo.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userInfo.totalBookings}</div>
                      <div className="text-sm text-muted-foreground">Total Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{userInfo.totalSpent}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-tertiary">VIP</div>
                      <div className="text-sm text-muted-foreground">Member Status</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/50">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Upcoming Events
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary">{booking.category}</Badge>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          {booking.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{booking.event}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.venue}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Seats:</span>
                          <span className="text-sm font-medium">{booking.seats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <span className="text-lg font-bold text-primary">{booking.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Booking ID:</span>
                          <span className="text-sm font-mono">{booking.id}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Ticket
                        </Button>
                        <Button variant="outline" size="sm">
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-muted-foreground" />
                Past Events
              </h2>
              
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 bg-card/60">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{booking.event}</h3>
                            <Badge variant="secondary">{booking.category}</Badge>
                            <Badge variant="outline" className="border-gray-500 text-gray-600">
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {booking.date} • {booking.venue} • {booking.amount}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= (booking.rating || 0) 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userInfo.name} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={userInfo.email} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userInfo.phone} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" className="mt-2" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sports Preferences Chart */}
              <AudienceDemographicsChart
                data={[
                  { name: 'IPL Cricket', value: 8, percentage: 53 },
                  { name: 'ISL Football', value: 4, percentage: 27 },
                  { name: 'Pro Kabaddi', value: 3, percentage: 20 }
                ]}
                title="My Sport Preferences"
              />

              {/* Booking Trends */}
              <TrendComparisonChart
                data={[
                  { period: 'Jan', currentYear: 2, previousYear: 1 },
                  { period: 'Feb', currentYear: 3, previousYear: 2 },
                  { period: 'Mar', currentYear: 1, previousYear: 3 },
                  { period: 'Apr', currentYear: 4, previousYear: 2 },
                  { period: 'May', currentYear: 2, previousYear: 1 },
                  { period: 'Jun', currentYear: 3, previousYear: 4 }
                ]}
                title="My Booking Activity"
              />
            </div>

            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Favorite Sports & Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {favoriteEvents.map((favorite, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{favorite.count}</div>
                      <div className="text-sm font-medium">{favorite.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-medium">**** **** **** 1234</div>
                        <div className="text-sm text-muted-foreground">Visa • Expires 12/26</div>
                      </div>
                    </div>
                    <Badge>Primary</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;