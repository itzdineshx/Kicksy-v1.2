import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/components/LocalStorageProvider";
import { useMockData } from "@/components/MockDataProvider";
import { useUserData } from "@/components/UserDataProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { 
  User, 
  Calendar, 
  Heart, 
  Search, 
  Eye, 
  BarChart3, 
  Trophy,
  MapPin,
  Clock
} from "lucide-react";

export const DataDashboard = () => {
  const { 
    userProfile, 
    bookingHistory, 
    searchHistory, 
    recentlyViewed, 
    cachedEvents,
    clearAllData 
  } = useLocalStorage();
  
  const { 
    events, 
    featuredEvents, 
    trendingEvents,
    news,
    scores 
  } = useMockData();
  
  const { 
    isLoggedIn, 
    userStats, 
    getUpcomingBookings,
    getRecentBookings 
  } = useUserData();
  
  const { wishlist } = useWishlist();

  const upcomingBookings = getUpcomingBookings();
  const recentBookings = getRecentBookings();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-sports bg-clip-text text-transparent mb-4">
          Local Data Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything is cached locally - no backend required!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>
              {isLoggedIn ? "Logged in and cached locally" : "Not logged in"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userProfile ? (
              <div className="space-y-2">
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Location:</strong> {userProfile.preferences.location}</p>
                <p><strong>Subscription:</strong> {userProfile.subscription.type}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {userProfile.preferences.favoriteSports.map(sport => (
                    <Badge key={sport} variant="secondary">{sport}</Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No profile data stored</p>
            )}
          </CardContent>
        </Card>

        {/* Booking Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Stats
            </CardTitle>
            <CardDescription>Your booking history & statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Total Bookings:</strong> {userStats.totalBookings}</p>
              <p><strong>Total Spent:</strong> ₹{userStats.totalSpent.toLocaleString()}</p>
              <p><strong>Upcoming:</strong> {userStats.upcomingEvents}</p>
              <p><strong>Attended:</strong> {userStats.eventsAttended}</p>
              <p><strong>Loyalty Points:</strong> {userStats.loyaltyPoints}</p>
              <p><strong>Favorite Sport:</strong> {userStats.favoriteSport || 'None'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Wishlist
            </CardTitle>
            <CardDescription>Saved events you love</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3"><strong>Items:</strong> {wishlist.length}</p>
            {wishlist.slice(0, 3).map(item => (
              <div key={item.id} className="text-sm border-l-2 border-primary pl-2 mb-2">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground">{item.date} • {item.venue}</p>
              </div>
            ))}
            {wishlist.length > 3 && (
              <p className="text-sm text-muted-foreground">+{wishlist.length - 3} more items</p>
            )}
          </CardContent>
        </Card>

        {/* Search History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search History
            </CardTitle>
            <CardDescription>Recent searches cached locally</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3"><strong>Searches:</strong> {searchHistory.length}</p>
            <div className="flex flex-wrap gap-1">
              {searchHistory.slice(0, 5).map((term, index) => (
                <Badge key={index} variant="outline">{term}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Viewed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recently Viewed
            </CardTitle>
            <CardDescription>Events you've browsed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3"><strong>Viewed:</strong> {recentlyViewed.length} events</p>
            {recentlyViewed.slice(0, 3).map(eventId => {
              const event = cachedEvents.find(e => e.id === eventId);
              return event ? (
                <div key={eventId} className="text-sm border-l-2 border-secondary pl-2 mb-2">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-muted-foreground">{event.date}</p>
                </div>
              ) : null;
            })}
          </CardContent>
        </Card>

        {/* Mock Data Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Cached Data
            </CardTitle>
            <CardDescription>Mock data loaded locally</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Events:</strong> {events.length}</p>
              <p><strong>Featured:</strong> {featuredEvents.length}</p>
              <p><strong>Trending:</strong> {trendingEvents.length}</p>
              <p><strong>News Articles:</strong> {news.length}</p>
              <p><strong>Live Scores:</strong> {scores.length}</p>
              <p><strong>Cached Events:</strong> {cachedEvents.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Your latest ticket purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentBookings.slice(0, 4).map(booking => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{booking.eventTitle}</h4>
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' : 
                      booking.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {booking.eventDate}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.venue}
                    </p>
                    <p><strong>Amount:</strong> ₹{booking.totalAmount.toLocaleString()}</p>
                    <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      {upcomingBookings.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Events you're attending soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingBookings.slice(0, 3).map(booking => (
                <div key={booking.id} className="border rounded-lg p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h4 className="font-semibold mb-2">{booking.eventTitle}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {booking.eventDate}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booking.venue}
                    </p>
                    <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            All data is stored locally in your browser. No server required!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Data
            </Button>
            <Button variant="destructive" onClick={clearAllData}>
              Clear All Data
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Features Enabled:</h4>
            <ul className="text-sm space-y-1">
              <li>✅ Local data storage & caching</li>
              <li>✅ User profiles & preferences</li>
              <li>✅ Booking history & tracking</li>
              <li>✅ Search & browsing history</li>
              <li>✅ Wishlist management</li>
              <li>✅ Mock event data</li>
              <li>✅ Real-time statistics</li>
              <li>✅ Offline functionality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};