import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Calendar, MapPin, Users, Trophy, Clock, Star, TrendingUp, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartPriceTags from "@/components/SmartPriceTags";
import DemandIndicator from "@/components/DemandIndicator";
import CountdownTimer from "@/components/CountdownTimer";

import { useBooking } from "@/components/BookingProvider";

interface Match {
  id: number;
  team1: string;
  team2: string;
  date: string;
  time: string;
  venue: string;
  tournament: string;
  status: string;
  price: string;
  originalPrice?: string;
  priceChange: "up" | "down" | "stable";
  deal?: "flash" | "early-bird" | "last-chance" | "special";
  demand: "high" | "medium" | "low";
  seatsLeft: number;
  totalSeats: number;
  prediction: string;
  category: string;
  city: string;
  popularity: number;
}

const DynamicSportsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  
  // URL state management
  const searchQuery = searchParams.get('search') || '';
  const dateFilter = searchParams.get('date') || '';
  const cityFilter = searchParams.get('city') || '';
  const sortBy = searchParams.get('sort') || 'date';
  const priceRange = searchParams.get('price') || '';
  const activeTab = searchParams.get('tab') || 'upcoming';

  // Update URL params
  const updateSearchParams = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  // Mock data for all sports
  const mockData: Record<string, Match[]> = {
    cricket: [
      {
        id: 1, team1: "Mumbai Indians", team2: "Chennai Super Kings", date: "2025-08-15", time: "19:30",
        venue: "Wankhede Stadium", tournament: "IPL 2025", status: "upcoming", price: "₹1,200", originalPrice: "₹1,500",
        priceChange: "up", deal: "flash", demand: "high", seatsLeft: 850, totalSeats: 33000, prediction: "Selling fast",
        category: "cricket", city: "mumbai", popularity: 95
      },
      {
        id: 2, team1: "India", team2: "England", date: "2025-08-20", time: "14:30",
        venue: "Lord's Cricket Ground", tournament: "Test Series", status: "upcoming", price: "₹3,500", originalPrice: "₹4,200",
        priceChange: "down", deal: "special", demand: "medium", seatsLeft: 5600, totalSeats: 28000, prediction: "Good availability",
        category: "cricket", city: "london", popularity: 88
      }
    ],
    football: [
      {
        id: 3, team1: "Mumbai City FC", team2: "Bengaluru FC", date: "2025-08-16", time: "20:00",
        venue: "Mumbai Football Arena", tournament: "ISL 2025", status: "upcoming", price: "₹800", originalPrice: "₹1000",
        priceChange: "stable", deal: "early-bird", demand: "medium", seatsLeft: 2400, totalSeats: 8000, prediction: "Available",
        category: "football", city: "mumbai", popularity: 75
      }
    ],
    kabaddi: [
      {
        id: 4, team1: "Patna Pirates", team2: "Bengal Warriors", date: "2025-08-17", time: "18:00",
        venue: "Thyagaraj Stadium", tournament: "PKL 2025", status: "upcoming", price: "₹600", originalPrice: "₹750",
        priceChange: "down", deal: "last-chance", demand: "high", seatsLeft: 450, totalSeats: 2000, prediction: "Almost sold out",
        category: "kabaddi", city: "delhi", popularity: 82
      }
    ],
    badminton: [
      {
        id: 5, team1: "P.V. Sindhu", team2: "Carolina Marin", date: "2025-08-18", time: "16:00",
        venue: "Siri Fort Sports Complex", tournament: "India Open 2025", status: "upcoming", price: "₹400", originalPrice: "₹500",
        priceChange: "stable", deal: "early-bird", demand: "medium", seatsLeft: 1200, totalSeats: 3000, prediction: "Good availability",
        category: "badminton", city: "delhi", popularity: 70
      },
      {
        id: 6, team1: "Kidambi Srikanth", team2: "Lee Zii Jia", date: "2025-08-19", time: "14:30",
        venue: "K.D. Jadhav Hall", tournament: "BWF World Championships", status: "upcoming", price: "₹350", originalPrice: "₹400",
        priceChange: "down", deal: "flash", demand: "low", seatsLeft: 800, totalSeats: 2500, prediction: "Available",
        category: "badminton", city: "mumbai", popularity: 65
      }
    ],
    tennis: [
      {
        id: 7, team1: "Novak Djokovic", team2: "Carlos Alcaraz", date: "2025-08-20", time: "15:00",
        venue: "Delhi Lawn Tennis Association", tournament: "ATP Masters Delhi", status: "upcoming", price: "₹2,500", originalPrice: "₹3,000",
        priceChange: "up", deal: "special", demand: "high", seatsLeft: 1500, totalSeats: 8000, prediction: "High demand",
        category: "tennis", city: "delhi", popularity: 92
      },
      {
        id: 8, team1: "Iga Swiatek", team2: "Aryna Sabalenka", date: "2025-08-21", time: "17:30",
        venue: "Balewadi Stadium", tournament: "WTA Pune Open", status: "upcoming", price: "₹1,800", originalPrice: "₹2,200",
        priceChange: "stable", deal: "early-bird", demand: "medium", seatsLeft: 2200, totalSeats: 6000, prediction: "Available",
        category: "tennis", city: "pune", popularity: 78
      }
    ],
    hockey: [
      {
        id: 9, team1: "India", team2: "Australia", date: "2025-08-22", time: "19:00",
        venue: "Major Dhyan Chand Stadium", tournament: "Hockey India League", status: "upcoming", price: "₹800", originalPrice: "₹1,000",
        priceChange: "down", deal: "last-chance", demand: "high", seatsLeft: 600, totalSeats: 4000, prediction: "Selling fast",
        category: "hockey", city: "delhi", popularity: 85
      },
      {
        id: 10, team1: "Odisha Warriors", team2: "Mumbai Magicians", date: "2025-08-23", time: "20:30",
        venue: "Kalinga Stadium", tournament: "HIL Championship", status: "upcoming", price: "₹650", originalPrice: "₹800",
        priceChange: "stable", deal: "early-bird", demand: "medium", seatsLeft: 1800, totalSeats: 5000, prediction: "Good availability",
        category: "hockey", city: "bhubaneswar", popularity: 72
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const categoryData = mockData[category?.toLowerCase() || 'cricket'] || [];
      setMatches(categoryData);
      setLoading(false);
    }, 800);
  }, [category]);

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let filtered = matches.filter(match => {
      const matchesSearch = !searchQuery || 
        match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.tournament.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = !cityFilter || match.city === cityFilter;
      const matchesDate = !dateFilter || match.date === dateFilter;
      
      return matchesSearch && matchesCity && matchesDate;
    });

    // Sort matches
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'popularity':
          return b.popularity - a.popularity;
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [matches, searchQuery, cityFilter, dateFilter, sortBy]);

  const handleTabChange = (tab: string) => {
    updateSearchParams('tab', tab);
  };

  const getSportConfig = (sport: string) => {
    const configs = {
      cricket: {
        title: "Cricket",
        emoji: "🏏",
        heroImage: "/hero-cricket.jpg",
        color: "text-orange-600",
        bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
      },
      football: {
        title: "Football", 
        emoji: "⚽",
        heroImage: "/hero-football.jpg",
        color: "text-green-600",
        bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
      },
      kabaddi: {
        title: "Kabaddi",
        emoji: "🤼",
        heroImage: "/hero-kabaddi.jpg", 
        color: "text-purple-600",
        bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
      },
      badminton: {
        title: "Badminton",
        emoji: "🏸",
        heroImage: "/hero-cricket.jpg", 
        color: "text-blue-600",
        bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
      },
      tennis: {
        title: "Tennis",
        emoji: "🎾",
        heroImage: "/hero-football.jpg", 
        color: "text-yellow-600",
        bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
      },
      hockey: {
        title: "Hockey",
        emoji: "🏑",
        heroImage: "/hero-kabaddi.jpg", 
        color: "text-indigo-600",
        bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20"
      }
    };
    return configs[sport as keyof typeof configs] || configs.cricket;
  };

  const config = getSportConfig(category || 'cricket');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading {config.title} events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">

        {/* Dynamic Hero Section */}
        <div className="relative mb-12 rounded-xl overflow-hidden">
          <div 
            className="h-80 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('${config.heroImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="animate-slide-up">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl">{config.emoji}</span>
                  <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">{config.title}</h1>
                </div>
                <p className="text-xl md:text-2xl mb-6 opacity-90">
                  Experience the thrill of {config.title.toLowerCase()} like never before
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder={`Search ${config.title.toLowerCase()} events...`}
                value={searchQuery}
                onChange={(e) => updateSearchParams('search', e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={cityFilter} onValueChange={(value) => updateSearchParams('city', value)}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="bhubaneswar">Bhubaneswar</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => updateSearchParams('sort', value)}>
              <SelectTrigger>
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchParams({});
              }}
              className="w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Dynamic Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {filteredMatches.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">No matches found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchParams({})}
                >
                  Clear all filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMatches.map((match) => (
                  <Card 
                    key={match.id} 
                    className="group hover:shadow-floating transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/events/${match.id}?sport=${category}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="mb-2">
                          {match.tournament}
                        </Badge>
                        <Badge variant="outline" className={`${config.color} border-current`}>
                          {match.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {match.team1} vs {match.team2}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(match.date).toLocaleDateString()} at {match.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {match.venue}
                        </div>
                      </div>

                      <SmartPriceTags
                        price={match.price}
                        originalPrice={match.originalPrice}
                        priceChange={match.priceChange}
                        deal={match.deal}
                        className="mb-3"
                      />

                      <DemandIndicator
                        demand={match.demand}
                        seatsLeft={match.seatsLeft}
                        totalSeats={match.totalSeats}
                        prediction={match.prediction}
                      />

                      {match.demand === "high" && match.seatsLeft < 1000 && (
                        <CountdownTimer
                          targetDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                          title="Flash Sale Ends In"
                          variant="deal"
                          className="mt-3"
                        />
                      )}

                      <Button 
                        className="w-full group-hover:shadow-glow transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingModal({
                            id: match.id,
                            title: `${match.team1} vs ${match.team2}`,
                            date: match.date,
                            time: match.time,
                            venue: match.venue,
                            price: match.price,
                            category: match.category,
                            attendance: `${match.seatsLeft} tickets left`
                          });
                        }}
                      >
                        Book Tickets
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="p-12 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">Recent results will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-6">
            <Card className="p-12 text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">{config.title} tournaments coming soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center p-6">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">245</h3>
                <p className="text-muted-foreground">Matches This Season</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">2.3M</h3>
                <p className="text-muted-foreground">Fans Engaged</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">16</h3>
                <p className="text-muted-foreground">Active Tournaments</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">1,250</h3>
                <p className="text-muted-foreground">Hours of Sports</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicSportsPage;