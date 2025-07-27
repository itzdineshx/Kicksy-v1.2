import { useState } from "react";
import { Calendar, Clock, MapPin, Filter, Search, Star, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchSchedule = () => {
  const [selectedSport, setSelectedSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingMatches = [
    {
      id: 1,
      sport: "Cricket",
      tournament: "IPL 2024",
      team1: "Mumbai Indians",
      team2: "Chennai Super Kings",
      team1Logo: "🔵",
      team2Logo: "🟡",
      date: "2024-12-28",
      time: "19:30",
      venue: "Wankhede Stadium, Mumbai",
      status: "upcoming",
      priority: "high",
      ticketPrice: "₹1,500",
      capacity: "33,000",
      weather: "Clear",
      temperature: "28°C",
      prediction: "Mumbai Indians favored",
      headToHead: "MI: 16 wins, CSK: 14 wins"
    },
    {
      id: 2,
      sport: "Football",
      tournament: "ISL 2024",
      team1: "Bengaluru FC",
      team2: "Mumbai City FC",
      team1Logo: "🔴",
      team2Logo: "🔵",
      date: "2024-12-29",
      time: "17:30",
      venue: "Sree Kanteerava Stadium, Bengaluru",
      status: "upcoming",
      priority: "medium",
      ticketPrice: "₹800",
      capacity: "24,000",
      weather: "Partly Cloudy",
      temperature: "26°C",
      prediction: "Evenly matched",
      headToHead: "BFC: 8 wins, MCFC: 7 wins"
    },
    {
      id: 3,
      sport: "Kabaddi",
      tournament: "PKL 2024",
      team1: "Patna Pirates",
      team2: "Bengaluru Bulls",
      team1Logo: "🏴‍☠️",
      team2Logo: "🐂",
      date: "2024-12-30",
      time: "20:00",
      venue: "Gachibowli Stadium, Hyderabad",
      status: "upcoming",
      priority: "high",
      ticketPrice: "₹600",
      capacity: "5,000",
      weather: "Indoor",
      temperature: "22°C",
      prediction: "Patna Pirates slight edge",
      headToHead: "PP: 12 wins, BB: 10 wins"
    },
    {
      id: 4,
      sport: "Tennis",
      tournament: "ATP Chennai Open",
      team1: "Sumit Nagal",
      team2: "Ramkumar Ramanathan",
      team1Logo: "🎾",
      team2Logo: "🎾",
      date: "2025-12-31",
      time: "14:00",
      venue: "SDAT Tennis Stadium, Chennai",
      status: "upcoming",
      priority: "medium",
      ticketPrice: "₹1,200",
      capacity: "5,000",
      weather: "Sunny",
      temperature: "30°C",
      prediction: "Nagal in better form",
      headToHead: "SN: 3 wins, RR: 2 wins"
    },
    {
      id: 5,
      sport: "Cricket",
      tournament: "Ranji Trophy",
      team1: "Karnataka",
      team2: "Tamil Nadu",
      team1Logo: "🟣",
      team2Logo: "🔴",
      date: "2025-01-02",
      time: "09:30",
      venue: "M. Chinnaswamy Stadium, Bengaluru",
      status: "upcoming",
      priority: "low",
      ticketPrice: "₹200",
      capacity: "40,000",
      weather: "Overcast",
      temperature: "24°C",
      prediction: "Close contest expected",
      headToHead: "KAR: 25 wins, TN: 22 wins"
    },
    {
      id: 6,
      sport: "Football",
      tournament: "I-League",
      team1: "East Bengal",
      team2: "Mohun Bagan",
      team1Logo: "🔴",
      team2Logo: "🟢",
      date: "2025-01-05",
      time: "17:00",
      venue: "Salt Lake Stadium, Kolkata",
      status: "upcoming",
      priority: "high",
      ticketPrice: "₹500",
      capacity: "85,000",
      weather: "Cool",
      temperature: "18°C",
      prediction: "Derby - anything can happen",
      headToHead: "EB: 45 wins, MB: 47 wins"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSportIcon = (sport: string) => {
    const icons = {
      Cricket: "🏏",
      Football: "⚽",
      Kabaddi: "🤼",
      Tennis: "🎾",
      Badminton: "🏸",
      Hockey: "🏑"
    };
    return icons[sport as keyof typeof icons] || "🏟️";
  };

  const filteredMatches = upcomingMatches.filter(match => {
    const matchesSport = selectedSport === "all" || match.sport.toLowerCase() === selectedSport;
    const matchesSearch = searchQuery === "" || 
      match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.tournament.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const todayMatches = filteredMatches.filter(match => {
    const matchDate = new Date(match.date);
    const today = new Date();
    return matchDate.toDateString() === today.toDateString();
  });

  const upcomingFiltered = filteredMatches.filter(match => {
    const matchDate = new Date(match.date);
    const today = new Date();
    return matchDate > today;
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Match Schedule
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with all upcoming sports events and never miss your favorite matches
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search teams, tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="cricket">Cricket</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="kabaddi">Kabaddi</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="badminton">Badminton</SelectItem>
              <SelectItem value="hockey">Hockey</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Match Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Today ({todayMatches.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming ({upcomingFiltered.length})
            </TabsTrigger>
          </TabsList>

          {/* Today's Matches */}
          <TabsContent value="today" className="space-y-6">
            {todayMatches.length === 0 ? (
              <Card className="text-center p-8">
                <CardContent className="pt-6">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No matches today</h3>
                  <p className="text-muted-foreground">Check the upcoming matches for the next exciting games!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {todayMatches.map((match, index) => (
                  <MatchCard key={match.id} match={match} index={index} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="space-y-4">
              {upcomingFiltered.map((match, index) => (
                <MatchCard key={match.id} match={match} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const MatchCard = ({ match, index }: { match: any; index: number }) => {
  const getSportIcon = (sport: string) => {
    const icons = {
      Cricket: "🏏",
      Football: "⚽",
      Kabaddi: "🤼",
      Tennis: "🎾",
      Badminton: "🏸",
      Hockey: "🏑"
    };
    return icons[sport as keyof typeof icons] || "🏟️";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card 
      className="group hover:shadow-floating transition-all duration-300 hover:-translate-y-1 animate-scale-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Match Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">{getSportIcon(match.sport)}</div>
              <div>
                <Badge variant="secondary" className="mb-1">
                  {match.tournament}
                </Badge>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(match.priority)}`}></div>
                  <span className="text-sm text-muted-foreground capitalize">{match.priority} priority</span>
                </div>
              </div>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{match.team1Logo}</div>
                <div>
                  <h3 className="font-bold text-lg">{match.team1}</h3>
                </div>
              </div>
              
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-muted-foreground">VS</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-lg text-right">{match.team2}</h3>
                </div>
                <div className="text-3xl">{match.team2Logo}</div>
              </div>
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(match.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{match.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Venue</p>
                  <p className="font-medium text-xs">{match.venue.split(',')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{match.capacity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="lg:w-64 space-y-4">
            <div className="text-center lg:text-right">
              <p className="text-2xl font-bold text-primary">{match.ticketPrice}</p>
              <p className="text-sm text-muted-foreground">Starting price</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weather:</span>
                <span>{match.weather}, {match.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">H2H:</span>
                <span className="text-xs">{match.headToHead}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full group-hover:shadow-glow transition-all">
                Book Tickets
              </Button>
              <Button variant="outline" className="w-full">
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchSchedule;