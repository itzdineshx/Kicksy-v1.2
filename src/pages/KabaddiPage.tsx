import { Calendar, MapPin, Users, Trophy, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KabaddiPage = () => {
  const upcomingMatches = [
    {
      id: 1,
      team1: "Patna Pirates",
      team2: "U Mumba",
      date: "2024-08-17",
      time: "20:00",
      venue: "Netaji Subhash Chandra Bose Indoor Stadium",
      tournament: "PKL Season 10",
      status: "upcoming",
      price: "₹200 - ₹1500"
    },
    {
      id: 2,
      team1: "Bengaluru Bulls",
      team2: "Tamil Thalaivas",
      date: "2024-08-21",
      time: "19:30",
      venue: "Sree Kanteerava Stadium, Bengaluru",
      tournament: "PKL Season 10",
      status: "upcoming",
      price: "₹300 - ₹2000"
    },
    {
      id: 3,
      team1: "Jaipur Pink Panthers",
      team2: "Haryana Steelers",
      date: "2024-08-20",
      time: "21:00",
      venue: "Sawai Mansingh Stadium, Jaipur",
      tournament: "PKL Season 10",
      status: "upcoming",
      price: "₹250 - ₹1800"
    }
  ];

  const liveMatches = [
    {
      id: 1,
      team1: "Dabang Delhi K.C.",
      team2: "Gujarat Giants",
      score1: "28",
      score2: "24",
      time: "32:45",
      status: "live",
      venue: "Thyagaraj Sports Complex"
    }
  ];

  const recentResults = [
    {
      id: 1,
      team1: "Puneri Paltan",
      team2: "UP Yoddhas",
      score1: "42",
      score2: "38",
      result: "Puneri Paltan won by 4 points",
      date: "2024-07-30"
    },
    {
      id: 2,
      team1: "Telugu Titans",
      team2: "Bengal Warriors",
      score1: "31",
      score2: "35",
      result: "Bengal Warriors won by 4 points",
      date: "2024-07-27"
    }
  ];

  const tournaments = [
    {
      name: "PKL Season 10",
      status: "Ongoing",
      teams: 12,
      matches: 137,
      description: "Pro Kabaddi League - India's premier kabaddi tournament"
    },
    {
      name: "Kabaddi World Cup",
      status: "Upcoming",
      teams: 16,
      matches: 32,
      description: "International kabaddi championship"
    },
    {
      name: "Asian Kabaddi Championship",
      status: "Upcoming",
      teams: 8,
      matches: 20,
      description: "Asian kabaddi tournament"
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
              backgroundImage: "url('/hero-kabaddi.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Kabaddi</h1>
                <p className="text-xl md:text-2xl mb-6 opacity-90">Experience the ancient sport in its modern avatar</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="shadow-glow hover:scale-105 transition-transform">
                    Book Tickets
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Watch Highlights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Match Banner */}
        {liveMatches.length > 0 && (
          <Card className="mb-8 border-orange-500/50 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <CardTitle className="text-orange-600 dark:text-orange-400">Live Match</CardTitle>
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
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
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
                      Get Tickets
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
                        <Badge variant="default" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
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
                      View Details
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
                <h3 className="text-2xl font-bold">137</h3>
                <p className="text-muted-foreground">Matches This Season</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">950K</h3>
                <p className="text-muted-foreground">Kabaddi Fans</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-muted-foreground">Teams in PKL</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">2,850</h3>
                <p className="text-muted-foreground">Total Raid Points</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default KabaddiPage;