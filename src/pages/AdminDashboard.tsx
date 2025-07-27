import { useState } from "react";
import { BarChart3, Users, Calendar, TrendingUp, DollarSign, MapPin, Settings, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  RevenueAnalyticsChart, 
  AudienceDemographicsChart, 
  TrendComparisonChart 
} from "@/components/dashboard/EnhancedChartComponents";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const platformStats = {
    totalUsers: "12,840",
    totalEvents: "284",
    totalRevenue: "₹24,58,920",
    activeBookings: "1,567",
    monthlyGrowth: "+23%",
    topSport: "Cricket"
  };

  const recentEvents = [
    {
      id: "EVT001",
      name: "India vs Australia ODI",
      date: "Dec 15, 2024",
      venue: "Wankhede Stadium",
      category: "Cricket",
      ticketsSold: 45000,
      revenue: "₹45,00,000",
      status: "Active"
    },
    {
      id: "EVT002", 
      name: "Mumbai City FC vs Kerala",
      date: "Dec 18, 2024",
      venue: "DY Patil Stadium",
      category: "Football",
      ticketsSold: 28000,
      revenue: "₹14,00,000",
      status: "Active"
    },
    {
      id: "EVT003",
      name: "Pro Kabaddi League",
      date: "Dec 20, 2024",
      venue: "NSCI Stadium",
      category: "Kabaddi",
      ticketsSold: 15000,
      revenue: "₹7,50,000",
      status: "Upcoming"
    }
  ];

  const topUsers = [
    { name: "Rajesh Kumar", bookings: 15, spent: "₹45,230", status: "VIP" },
    { name: "Priya Sharma", bookings: 12, spent: "₹38,500", status: "Premium" },
    { name: "Amit Singh", bookings: 10, spent: "₹32,100", status: "Regular" },
    { name: "Sneha Patel", bookings: 8, spent: "₹28,750", status: "Regular" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <Card className="border-0 bg-gradient-card shadow-floating">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-sports bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground">Manage platform events, users, and analytics</p>
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
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

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 bg-gradient-card shadow-floating">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold text-primary">{platformStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">{platformStats.monthlyGrowth} from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card shadow-floating">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                      <p className="text-3xl font-bold text-secondary">{platformStats.totalEvents}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Active & Upcoming</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card shadow-floating">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-3xl font-bold text-tertiary">{platformStats.totalRevenue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-tertiary" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">+18% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Events */}
            <Card className="border-0 bg-gradient-card shadow-floating">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold">{event.name}</h3>
                          <Badge className="bg-primary/10 text-primary">{event.category}</Badge>
                          <Badge variant={event.status === "Active" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} • {event.venue} • {event.ticketsSold.toLocaleString()} tickets sold
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{event.revenue}</div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Event Management</h2>
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
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.venue}</TableCell>
                        <TableCell>
                          <Badge className="bg-primary/10 text-primary">{event.category}</Badge>
                        </TableCell>
                        <TableCell>{event.ticketsSold.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">{event.revenue}</TableCell>
                        <TableCell>
                          <Badge variant={event.status === "Active" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
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

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>

            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.bookings}</TableCell>
                        <TableCell className="font-semibold">{user.spent}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "VIP" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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
            <h2 className="text-2xl font-bold">Platform Analytics</h2>

            {/* Revenue Analytics Chart */}
            <RevenueAnalyticsChart
              data={[
                { month: 'Jan', revenue: 1200000, bookings: 245 },
                { month: 'Feb', revenue: 1350000, bookings: 278 },
                { month: 'Mar', revenue: 1180000, bookings: 235 },
                { month: 'Apr', revenue: 1450000, bookings: 298 },
                { month: 'May', revenue: 1620000, bookings: 334 },
                { month: 'Jun', revenue: 1380000, bookings: 285 },
                { month: 'Jul', revenue: 1750000, bookings: 365 },
                { month: 'Aug', revenue: 1890000, bookings: 392 },
                { month: 'Sep', revenue: 2100000, bookings: 425 },
                { month: 'Oct', revenue: 2250000, bookings: 458 },
                { month: 'Nov', revenue: 2350000, bookings: 485 },
                { month: 'Dec', revenue: 2458920, bookings: 502 }
              ]}
              title="Revenue & Bookings Trend"
              subtitle="Monthly Performance"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Audience Demographics */}
              <AudienceDemographicsChart
                data={[
                  { name: 'Cricket Fans', value: 62, percentage: 62 },
                  { name: 'Football Fans', value: 25, percentage: 25 },
                  { name: 'Kabaddi Fans', value: 8, percentage: 8 },
                  { name: 'Other Sports', value: 5, percentage: 5 }
                ]}
                title="Revenue by Sport"
              />

              {/* Trend Comparison */}
              <TrendComparisonChart
                data={[
                  { period: 'Q1', currentYear: 3830000, previousYear: 3100000 },
                  { period: 'Q2', currentYear: 4450000, previousYear: 3650000 },
                  { period: 'Q3', currentYear: 5740000, previousYear: 4200000 },
                  { period: 'Q4', currentYear: 7058920, previousYear: 5450000 }
                ]}
                title="Quarterly Comparison"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;