import { Calendar, MapPin, Users, Trophy, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FootballPage = () => {
  const upcomingMatches = [
    {
      id: 1,
      team1: "Mumbai City FC",
      team2: "Bengaluru FC",
      date: "2024-08-16",
      time: "20:00",
      venue: "Mumbai Football Arena",
      tournament: "ISL 2024",
      status: "upcoming",
      price: "₹300 - ₹2500"
    },
    {
      id: 2,
      team1: "India",
      team2: "Qatar",
      date: "2024-08-22",
      time: "19:30",
      venue: "Salt Lake Stadium, Kolkata",
      tournament: "FIFA World Cup Qualifier",
      status: "upcoming",
      price: "₹500 - ₹3000"
    },
    {
      id: 3,
      team1: "Kerala Blasters",
      team2: "FC Goa",
      date: "2024-08-19",
      time: "17:30",
      venue: "Jawaharlal Nehru Stadium, Kochi",
      tournament: "ISL 2024",
      status: "upcoming",
      price: "₹400 - ₹2000"
    }
  ];

  const liveMatches = [
    {
      id: 1,
      team1: "ATK Mohun Bagan",
      team2: "Hyderabad FC",
      score1: "2",
      score2: "1",
      time: "78'",
      status: "live",
      venue: "Vivekananda Yuba Bharati Krirangan"
    }
  ];

  const recentResults = [
    {
      id: 1,
      team1: "India U-23",
      team2: "Japan U-23",
      score1: "1",
      score2: "2",
      result: "Japan won 2-1",
      date: "2024-07-29"
    },
    {
      id: 2,
      team1: "Chennaiyin FC",
      team2: "NorthEast United",
      score1: "3",
      score2: "0",
      result: "Chennaiyin FC won 3-0",
      date: "2024-07-26"
    }
  ];

  const tournaments = [
    {
      name: "ISL 2024",
      status: "Ongoing",
      teams: 11,
      matches: 115,
      description: "India's premier football league"
    },
    {
      name: "I-League",
      status: "Upcoming",
      teams: 13,
      matches: 132,
      description: "India's traditional football league"
    },
    {
      name: "Durand Cup",
      status: "Upcoming",
      teams: 24,
      matches: 47,
      description: "Asia's oldest football tournament"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-xl overflow-hidden">
          <div 
            className="h-80 bg-cover bg-center relative"
            style={{
              backgroundImage: "url('/hero-football.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Football</h1>
                <p className="text-xl md:text-2xl mb-6 opacity-90">Feel the passion of the beautiful game</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="shadow-glow hover:scale-105 transition-transform">
                    Book Tickets
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    View Fixtures
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Match Banner */}
        {liveMatches.length > 0 && (
          <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <CardTitle className="text-green-600 dark:text-green-400">Live Match</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {liveMatches.map((match) => (
                <div key={match.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{match.team1} vs {match.team2}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </p>
                    </div>
                    <Button size="sm" className="animate-pulse-glow">
                      Watch Live
                    </Button>
                  </div>
                  <div className="flex justify-center items-center gap-8">
                    <div className="text-center">
                      <p className="font-medium">{match.team1}</p>
                      <p className="text-4xl font-bold text-primary">{match.score1}</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="animate-pulse">
                        {match.time}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{match.team2}</p>
                      <p className="text-4xl font-bold text-primary">{match.score2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fixtures
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Leagues
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="group hover:shadow-floating transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="mb-2">
                        {match.tournament}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {match.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{match.team1} vs {match.team2}</CardTitle>
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
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {match.price}
                      </div>
                    </div>
                    <Button className="w-full group-hover:shadow-glow transition-all">
                      Buy Tickets
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Results */}
          <TabsContent value="results" className="space-y-6">
            <div className="space-y-4">
              {recentResults.map((result) => (
                <Card key={result.id} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{result.team1} vs {result.team2}</h3>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{result.score1}</p>
                            <p className="text-sm text-muted-foreground">{result.team1}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">-</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{result.score2}</p>
                            <p className="text-sm text-muted-foreground">{result.team2}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {result.result}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tournaments */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tournaments.map((tournament, index) => (
                <Card key={index} className="hover:shadow-floating transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{tournament.name}</CardTitle>
                      <Badge variant={tournament.status === "Ongoing" ? "default" : "secondary"}>
                        {tournament.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{tournament.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-2xl font-bold text-primary">{tournament.teams}</p>
                        <p className="text-sm text-muted-foreground">Teams</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-2xl font-bold text-primary">{tournament.matches}</p>
                        <p className="text-sm text-muted-foreground">Matches</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      View League Table
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stats */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center p-6">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-muted-foreground">Matches This Season</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">1.8M</h3>
                <p className="text-muted-foreground">Football Fans</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">11</h3>
                <p className="text-muted-foreground">Active Leagues</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">2,340</h3>
                <p className="text-muted-foreground">Goals Scored</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default FootballPage;