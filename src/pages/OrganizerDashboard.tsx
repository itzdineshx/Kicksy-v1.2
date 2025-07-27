import { useState } from "react";
import { Calendar, Users, BarChart3, Settings, Plus, Eye, Edit, Trash2, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardSuggestions from "@/components/DashboardSuggestions";
import SmartPriceTags from "@/components/SmartPriceTags";
import DemandIndicator from "@/components/DemandIndicator";
import UrgencyProgress from "@/components/UrgencyProgress";
import { 
  RevenueAnalyticsChart, 
  EventTimelineChart, 
  PerformanceScatterChart 
} from "@/components/dashboard/EnhancedChartComponents";

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  const getAIRecommendation = (demand: "high" | "medium" | "low") => {
    switch (demand) {
      case "high":
        return "Consider increasing prices by 10-15% for maximum revenue.";
      case "medium":
        return "Current pricing optimal. Monitor for demand changes.";
      case "low":
        return "Reduce prices by 20% or add promotional offers to boost sales.";
      default:
        return "Monitor demand patterns for pricing optimization.";
    }
  };

  const organizerStats = {
    totalEvents: "12",
    upcomingEvents: "4", 
    totalTicketsSold: "8,450",
    totalRevenue: "₹4,25,000",
    avgAttendance: "85%"
  };

  const myEvents = [
    {
      id: "ORG001",
      name: "Mumbai Football League Finals",
      date: "Dec 20, 2024",
      time: "7:30 PM",
      venue: "DY Patil Stadium",
      category: "Football",
      capacity: 35000,
      ticketsSold: 28500,
      revenue: "₹14,25,000",
      status: "Active",
      price: "₹850",
      originalPrice: "₹1,000",
      priceChange: "up" as const,
      deal: "last-chance" as const,
      demand: "high" as const,
      seatsLeft: 6500,
      prediction: "Will sell out"
    },
    {
      id: "ORG002",
      name: "Cricket Championship",
      date: "Dec 25, 2024", 
      time: "2:30 PM",
      venue: "Wankhede Stadium",
      category: "Cricket",
      capacity: 45000,
      ticketsSold: 42000,
      revenue: "₹21,00,000",
      status: "Upcoming",
      price: "₹1,200",
      originalPrice: "₹1,500",
      priceChange: "down" as const,
      deal: "flash" as const,
      demand: "high" as const,
      seatsLeft: 3000,
      prediction: "Selling fast"
    },
    {
      id: "ORG003",
      name: "Basketball Tournament",
      date: "Jan 5, 2025",
      time: "6:00 PM", 
      venue: "NSCI Indoor Arena",
      category: "Basketball",
      capacity: 8000,
      ticketsSold: 0,
      revenue: "₹0",
      status: "Draft",
      price: "₹350",
      originalPrice: "₹500",
      priceChange: "stable" as const,
      deal: "early-bird" as const,
      demand: "low" as const,
      seatsLeft: 8000,
      prediction: "Needs promotion"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Organizer Header */}
        <div className="mb-8">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-sports bg-clip-text text-transparent">
                    Event Organizer Dashboard
                  </h1>
                  <p className="text-muted-foreground">Manage your events and track performance</p>
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                  <p className="text-3xl font-bold text-primary">{organizerStats.totalEvents}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-3xl font-bold text-secondary">{organizerStats.upcomingEvents}</p>
                </div>
                <Clock className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tickets Sold</p>
                  <p className="text-3xl font-bold text-tertiary">{organizerStats.totalTicketsSold}</p>
                </div>
                <Users className="w-8 h-8 text-tertiary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold text-primary">{organizerStats.totalRevenue}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                  <p className="text-3xl font-bold text-secondary">{organizerStats.avgAttendance}</p>
                </div>
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Dashboard Suggestions */}
        <DashboardSuggestions />

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              My Events
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              AI Pricing
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* My Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Events</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </Button>
            </div>

            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Smart Pricing</TableHead>
                      <TableHead>Demand & Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <Badge className="bg-primary/10 text-primary text-xs mt-1">
                              {event.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{event.date}</div>
                            <div className="text-muted-foreground">{event.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-3 h-3" />
                            {event.venue}
                          </div>
                        </TableCell>
                        <TableCell>
                          <SmartPriceTags
                            price={event.price}
                            originalPrice={event.originalPrice}
                            priceChange={event.priceChange}
                            deal={event.deal}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <DemandIndicator
                              demand={event.demand}
                              seatsLeft={event.seatsLeft}
                              totalSeats={event.capacity}
                              prediction={event.prediction}
                            />
                            <UrgencyProgress
                              seatsLeft={event.seatsLeft}
                              totalSeats={event.capacity}
                              title="Sales Progress"
                              showCountdown={false}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{event.revenue}</TableCell>
                        <TableCell>
                          <Badge variant={
                            event.status === "Active" ? "default" : 
                            event.status === "Upcoming" ? "secondary" : "outline"
                          }>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Event Analytics</h2>

            {/* Revenue Analytics Chart */}
            <RevenueAnalyticsChart
              data={[
                { month: 'Jul', revenue: 725000, bookings: 145 },
                { month: 'Aug', revenue: 850000, bookings: 170 },
                { month: 'Sep', revenue: 920000, bookings: 184 },
                { month: 'Oct', revenue: 1150000, bookings: 230 },
                { month: 'Nov', revenue: 1280000, bookings: 256 },
                { month: 'Dec', revenue: 1425000, bookings: 285 }
              ]}
              title="My Events Revenue Trend"
              subtitle="Last 6 Months"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Timeline */}
              <EventTimelineChart
                data={[
                  { date: 'Dec 20', events: 1, attendance: 28500 },
                  { date: 'Dec 25', events: 1, attendance: 42000 },
                  { date: 'Jan 5', events: 1, attendance: 0 },
                  { date: 'Jan 15', events: 2, attendance: 15000 },
                  { date: 'Jan 25', events: 1, attendance: 25000 },
                  { date: 'Feb 5', events: 3, attendance: 35000 }
                ]}
                title="Upcoming Events Timeline"
              />

              {/* Performance Scatter */}
              <PerformanceScatterChart
                data={[
                  { satisfaction: 92, revenue: 2100, attendance: 42000, name: 'Cricket Championship' },
                  { satisfaction: 88, revenue: 1425, attendance: 28500, name: 'Football Finals' },
                  { satisfaction: 75, revenue: 450, attendance: 8000, name: 'Basketball Tournament' },
                  { satisfaction: 85, revenue: 950, attendance: 15000, name: 'Kabaddi League' }
                ]}
                title="Event Performance Analysis"
              />
            </div>
          </TabsContent>

          {/* AI Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <h2 className="text-2xl font-bold">AI-Powered Pricing Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <Card key={event.id} className="border-0 bg-gradient-card shadow-floating">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{event.name}</span>
                      <Badge className="bg-primary/10 text-primary">
                        {event.category}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Current Pricing */}
                    <div>
                      <h4 className="font-medium mb-2">Current Pricing</h4>
                      <SmartPriceTags
                        price={event.price}
                        originalPrice={event.originalPrice}
                        priceChange={event.priceChange}
                        deal={event.deal}
                      />
                    </div>

                    {/* Demand Analysis */}
                    <div>
                      <h4 className="font-medium mb-2">Demand Analysis</h4>
                      <DemandIndicator
                        demand={event.demand}
                        seatsLeft={event.seatsLeft}
                        totalSeats={event.capacity}
                        prediction={event.prediction}
                      />
                    </div>

                    {/* Sales Progress */}
                    <div>
                      <UrgencyProgress
                        seatsLeft={event.seatsLeft}
                        totalSeats={event.capacity}
                        title="Sales Velocity"
                        showCountdown={true}
                      />
                    </div>

                    {/* AI Recommendations */}
                    <div className="p-3 bg-primary/5 rounded-lg border">
                      <h5 className="font-medium text-sm mb-2">AI Recommendation</h5>
                      <p className="text-xs text-muted-foreground">
                        {getAIRecommendation(event.demand)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Adjust Price
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Create Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Organizer Settings</h2>

            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Organization Name</label>
                    <input 
                      className="w-full mt-1 p-2 border rounded-md bg-background" 
                      defaultValue="Mumbai Sports Events Pvt Ltd" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Email</label>
                    <input 
                      className="w-full mt-1 p-2 border rounded-md bg-background" 
                      defaultValue="organizer@sportshub.com" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <input 
                      className="w-full mt-1 p-2 border rounded-md bg-background" 
                      defaultValue="+91 98765 43210" 
                    />
                  </div>
                  <Button>Update Details</Button>
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

export default OrganizerDashboard;