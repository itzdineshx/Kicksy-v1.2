import { useState } from "react";
import { User, Settings, Heart, Calendar, CreditCard, Bell, Shield, MapPin, Star, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const UserProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data - in real app this would come from API
  const userProfile = {
    name: user?.email?.split('@')[0] || "User",
    email: user?.email || "user@email.com",
    avatar: "/placeholder.svg",
    joinDate: "March 2023",
    location: "Mumbai, India",
    preferences: ["Cricket", "Football", "Tennis"],
    tier: "Gold Member",
    totalSpent: "₹45,600",
    eventsAttended: 23,
    upcomingEvents: 3,
    favoriteVenue: "Wankhede Stadium",
    stats: {
      totalBookings: 31,
      cancelledBookings: 2,
      attendanceRate: 94,
      avgRating: 4.8,
      loyaltyPoints: 2340
    }
  };

  const recentBookings = [
    {
      id: 1,
      event: "IPL Final 2024",
      date: "2024-05-26",
      venue: "Wankhede Stadium",
      amount: "₹8,500",
      status: "confirmed",
      seats: "Block A, Row 12, Seat 15-16"
    },
    {
      id: 2,
      event: "Manchester United vs Barcelona",
      date: "2024-04-15",
      venue: "Mumbai Football Arena",
      amount: "₹3,200",
      status: "attended",
      seats: "North Stand, Row 8, Seat 42"
    },
    {
      id: 3,
      event: "Indian Tennis Open",
      date: "2024-03-10",
      venue: "Delhi Tennis Complex",
      amount: "₹1,800",
      status: "attended",
      seats: "Court 1, Premium Section"
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      event: "Cricket World Cup Final",
      date: "2024-07-15",
      venue: "Narendra Modi Stadium",
      amount: "₹12,000",
      status: "confirmed"
    },
    {
      id: 5,
      event: "Kabaddi League Semi-Final",
      date: "2024-08-02",
      venue: "Thyagaraj Stadium",
      amount: "₹2,500",
      status: "confirmed"
    }
  ];

  const achievements = [
    { name: "Sports Enthusiast", description: "Attended 20+ events", icon: "🏆", earned: true },
    { name: "Loyal Fan", description: "Member for over 1 year", icon: "⭐", earned: true },
    { name: "Big Spender", description: "Spent over ₹40,000", icon: "💎", earned: true },
    { name: "Review Master", description: "Left 50+ reviews", icon: "📝", earned: false },
    { name: "Early Bird", description: "Booked 10+ events in advance", icon: "🐦", earned: false },
    { name: "Stadium Explorer", description: "Visited 15+ different venues", icon: "🗺️", earned: false }
  ];

  const loyaltyBenefits = [
    { title: "Early Access", description: "Get tickets 24 hours before general sale", active: true },
    { title: "Price Alerts", description: "AI-powered notifications for price drops", active: true },
    { title: "Premium Support", description: "Dedicated customer service line", active: true },
    { title: "Venue Upgrades", description: "Complimentary seat upgrades when available", active: false },
    { title: "VIP Events", description: "Exclusive access to meet & greets", active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-sports bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and track your sports journey
            </p>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Overview */}
        <Card className="hover:shadow-floating transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-xl bg-gradient-primary text-primary-foreground">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    {userProfile.tier}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userProfile.eventsAttended}</div>
                    <div className="text-sm text-muted-foreground">Events Attended</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{userProfile.totalSpent}</div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-tertiary">{userProfile.stats.loyaltyPoints}</div>
                    <div className="text-sm text-muted-foreground">Loyalty Points</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{userProfile.stats.attendanceRate}%</div>
                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.event}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.venue}</p>
                      </div>
                      <Badge variant="outline">{event.amount}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Sports Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfile.preferences.map((sport, index) => (
                      <div key={sport} className="flex items-center justify-between">
                        <span>{sport}</span>
                        <Progress value={90 - (index * 15)} className="w-24" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">Favorite Venue</span>
                    </div>
                    <p className="text-sm mt-1">{userProfile.favoriteVenue}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{booking.event}</h4>
                          <p className="text-sm text-muted-foreground">{booking.date}</p>
                          <p className="text-sm text-muted-foreground">{booking.venue}</p>
                          <p className="text-xs text-muted-foreground mt-1">{booking.seats}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Bookings</span>
                    <span className="font-bold">{userProfile.stats.totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cancelled</span>
                    <span className="font-bold text-destructive">{userProfile.stats.cancelledBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Attendance Rate</span>
                    <span className="font-bold text-green-500">{userProfile.stats.attendanceRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{userProfile.stats.avgRating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        achievement.earned 
                          ? 'border-primary/50 bg-primary/10 hover:shadow-glow' 
                          : 'border-muted bg-muted/20 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-4xl mb-2 ${achievement.earned ? 'animate-bounce-gentle' : ''}`}>
                          {achievement.icon}
                        </div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && (
                          <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                            Earned!
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Loyalty Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {userProfile.stats.loyaltyPoints}
                    </div>
                    <p className="text-muted-foreground">Points Balance</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Platinum</span>
                      <span>2,340 / 5,000</span>
                    </div>
                    <Progress value={47} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      2,660 points to unlock Platinum benefits
                    </p>
                  </div>

                  <Button className="w-full">
                    Redeem Points
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Membership Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loyaltyBenefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        benefit.active ? 'bg-primary/10' : 'bg-muted/30'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        benefit.active ? 'bg-primary' : 'bg-muted'
                      }`} />
                      <div>
                        <h4 className={`font-medium ${benefit.active ? 'text-primary' : 'text-muted-foreground'}`}>
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                      {benefit.active && (
                        <Badge variant="outline" className="ml-auto">Active</Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Price drop alerts",
                    "Event recommendations",
                    "Booking confirmations",
                    "Event reminders",
                    "Promotional offers"
                  ].map((pref, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{pref}</span>
                      <Button variant="outline" size="sm">
                        {index < 3 ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Account Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;