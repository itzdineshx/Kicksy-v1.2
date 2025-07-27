import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useBooking } from "@/components/BookingProvider";

interface SearchEvent {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: string;
  image: string;
}

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState<SearchEvent[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { openBookingModal } = useBooking();

  const allEvents: SearchEvent[] = [
    { id: 1, title: "India vs Australia ODI", category: "Cricket", date: "Dec 15, 2024", time: "2:30 PM", venue: "Wankhede Stadium", city: "Mumbai", price: "₹1,500", image: "🏏" },
    { id: 2, title: "Mumbai City FC vs Kerala Blasters", category: "Football", date: "Dec 18, 2024", time: "7:30 PM", venue: "DY Patil Stadium", city: "Mumbai", price: "₹800", image: "⚽" },
    { id: 3, title: "Pro Kabaddi League Finals", category: "Kabaddi", date: "Dec 20, 2024", time: "8:00 PM", venue: "Nehru Stadium", city: "Chennai", price: "₹600", image: "🤼" },
    { id: 4, title: "Tennis Masters Cup", category: "Tennis", date: "Jan 5, 2025", time: "3:30 PM", venue: "R.K. Khanna Complex", city: "Delhi", price: "₹1,200", image: "🎾" },
    { id: 5, title: "RCB vs CSK", category: "Cricket", date: "Dec 17, 2024", time: "7:30 PM", venue: "Chinnaswamy Stadium", city: "Bengaluru", price: "₹2,000", image: "🏏" },
    { id: 6, title: "Bengaluru FC vs ATK Mohun Bagan", category: "Football", date: "Dec 22, 2024", time: "7:00 PM", venue: "Kanteerava Stadium", city: "Bengaluru", price: "₹700", image: "⚽" },
    { id: 7, title: "Tamil Thalaivas vs Bengaluru Bulls", category: "Kabaddi", date: "Dec 25, 2024", time: "8:30 PM", venue: "Jawaharlal Nehru Stadium", city: "Chennai", price: "₹650", image: "🤼" },
    { id: 8, title: "KKR vs MI", category: "Cricket", date: "Dec 23, 2024", time: "7:30 PM", venue: "Eden Gardens", city: "Kolkata", price: "₹1,600", image: "🏏" },
    { id: 9, title: "Badminton Premier League", category: "Badminton", date: "Dec 28, 2024", time: "6:00 PM", venue: "KD Jadhav Hall", city: "Delhi", price: "₹900", image: "🏸" },
    { id: 10, title: "Hockey India League", category: "Hockey", date: "Jan 2, 2025", time: "4:00 PM", venue: "Major Dhyan Chand Stadium", city: "Delhi", price: "₹500", image: "🏑" }
  ];

  useEffect(() => {
    let filtered = allEvents;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by city
    if (selectedCity !== "all") {
      filtered = filtered.filter(event => event.city === selectedCity);
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      filtered = filtered.filter(event => {
        const price = parseInt(event.price.replace(/[^\d]/g, ''));
        switch (selectedPriceRange) {
          case "under-500": return price < 500;
          case "500-1000": return price >= 500 && price <= 1000;
          case "1000-1500": return price > 1000 && price <= 1500;
          case "above-1500": return price > 1500;
          default: return true;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, selectedCity, selectedPriceRange]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedCity("all");
    setSelectedPriceRange("all");
    setSearchQuery("");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            Find Your Perfect Event
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Search through thousands of sports events across India
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search events, venues, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg border-border/60 focus:border-primary/50 transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="whitespace-nowrap">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(selectedCategory !== "all" || selectedCity !== "all" || selectedPriceRange !== "all") && (
                    <Badge className="ml-2 h-5 w-5 p-0 text-xs">!</Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Events</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Cricket">Cricket</SelectItem>
                        <SelectItem value="Football">Football</SelectItem>
                        <SelectItem value="Kabaddi">Kabaddi</SelectItem>
                        <SelectItem value="Tennis">Tennis</SelectItem>
                        <SelectItem value="Badminton">Badminton</SelectItem>
                        <SelectItem value="Hockey">Hockey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-500">Under ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                        <SelectItem value="1000-1500">₹1,000 - ₹1,500</SelectItem>
                        <SelectItem value="above-1500">Above ₹1,500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">
                      Reset Filters
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || selectedCity !== "all" || selectedPriceRange !== "all") && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              {selectedCity !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCity}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCity("all")}
                  />
                </Badge>
              )}
              {selectedPriceRange !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: {selectedPriceRange}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedPriceRange("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredEvents.length} events
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
            <Card 
              key={event.id}
              className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-0">
                {/* Event Image/Icon */}
                <div className="h-32 bg-gradient-card flex items-center justify-center relative overflow-hidden">
                  <div className="text-5xl group-hover:animate-stadium-bounce">{event.image}</div>
                  <Badge className="absolute top-3 left-3 bg-primary/10 text-primary">
                    {event.category}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="line-clamp-1">{event.venue}, {event.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary">{event.price}</span>
                  </div>

                  <Button 
                    className="w-full hover:scale-105 transition-transform duration-300"
                    onClick={() => openBookingModal({
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      time: event.time,
                      venue: `${event.venue}, ${event.city}`,
                      price: event.price,
                      category: event.category
                    })}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all events
            </p>
            <Button onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;