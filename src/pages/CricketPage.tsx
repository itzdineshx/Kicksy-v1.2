import { Calendar, MapPin, Users, Trophy, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartPriceTags from "@/components/SmartPriceTags";
import DemandIndicator from "@/components/DemandIndicator";
import CountdownTimer from "@/components/CountdownTimer";

const CricketPage = () => {
  const upcomingMatches = [
    {
      id: 1,
      team1: "Mumbai Indians",
      team2: "Chennai Super Kings",
      date: "2024-08-15",
      time: "19:30",
      venue: "Wankhede Stadium, Mumbai",
      tournament: "IPL 2024",
      status: "upcoming",
      price: "₹1,200",
      originalPrice: "₹1,500",
      priceChange: "up" as const,
      deal: "flash" as const,
      demand: "high" as const,
      seatsLeft: 850,
      totalSeats: 33000,
      prediction: "Selling fast"
    },
    {
      id: 2,
      team1: "India",
      team2: "England",
      date: "2024-08-20",
      time: "14:30",
      venue: "Lord's Cricket Ground, London",
      tournament: "Test Series",
      status: "upcoming",
      price: "₹3,500",
      originalPrice: "₹4,200",
      priceChange: "down" as const,
      deal: "special" as const,
      demand: "medium" as const,
      seatsLeft: 5600,
      totalSeats: 28000,
      prediction: "Good availability"
    },
    {
      id: 3,
      team1: "Royal Challengers Bangalore",
      team2: "Delhi Capitals",
      date: "2024-08-18",
      time: "15:30",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      tournament: "IPL 2024",
      status: "upcoming",
      price: "₹950",
      originalPrice: "₹1,100",
      priceChange: "stable" as const,
      deal: "last-chance" as const,
      demand: "high" as const,
      seatsLeft: 120,
      totalSeats: 40000,
      prediction: "Almost sold out"
    }
  ];

  const liveMatches = [
    {
      id: 1,
      team1: "Australia",
      team2: "Pakistan",
      score1: "267/8",
      score2: "189/6",
      overs1: "50",
      overs2: "38.2",
      status: "live",
      venue: "MCG, Melbourne"
    }
  ];

  const recentResults = [
    {
      id: 1,
      team1: "India",
      team2: "Sri Lanka",
      score1: "356/8",
      score2: "298/9",
      result: "India won by 58 runs",
      date: "2024-07-28"
    },
    {
      id: 2,
      team1: "Rajasthan Royals",
      team2: "Punjab Kings",
      score1: "178/6",
      score2: "165/8",
      result: "RR won by 13 runs",
      date: "2024-07-25"
    }
  ];

  const tournaments = [
    {
      name: "IPL 2024",
      status: "Ongoing",
      teams: 10,
      matches: 74,
      description: "The biggest cricket carnival in India"
    },
    {
      name: "T20 World Cup",
      status: "Upcoming",
      teams: 16,
      matches: 55,
      description: "Global T20 championship"
    },
    {
      name: "Asia Cup",
      status: "Upcoming",
      teams: 6,
      matches: 13,
      description: "Asian cricket championship"
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
              backgroundImage: "url('/hero-cricket.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Cricket</h1>
                <p className="text-xl md:text-2xl mb-6 opacity-90">Experience the thrill of cricket like never before</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="shadow-glow hover:scale-105 transition-transform">
                    Book Tickets
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    View Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Match Banner */}
        {liveMatches.length > 0 && (
          <Card className="mb-8 border-red-500/50 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <CardTitle className="text-red-600 dark:text-red-400">Live Match</CardTitle>
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
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4">
                      <p className="font-medium">{match.team1}</p>
                      <p className="text-2xl font-bold text-primary">{match.score1}</p>
                      <p className="text-sm text-muted-foreground">({match.overs1} overs)</p>
                    </div>
                    <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4">
                      <p className="font-medium">{match.team2}</p>
                      <p className="text-2xl font-bold text-primary">{match.score2}</p>
                      <p className="text-sm text-muted-foreground">({match.overs2} overs)</p>
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
                      <Badge variant="outline" className="text-green-600 border-green-600">
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
                    </div>

                    {/* Smart Pricing */}
                    <SmartPriceTags
                      price={match.price}
                      originalPrice={match.originalPrice}
                      priceChange={match.priceChange}
                      deal={match.deal}
                      className="mb-3"
                    />

                    {/* Demand Indicator */}
                    <DemandIndicator
                      demand={match.demand}
                      seatsLeft={match.seatsLeft}
                      totalSeats={match.totalSeats}
                      prediction={match.prediction}
                    />

                    {/* Countdown for high-demand matches */}
                    {match.demand === "high" && match.seatsLeft < 1000 && (
                      <CountdownTimer
                        targetDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} // 24 hours from now
                        title="Flash Sale Ends In"
                        variant="deal"
                        className="mt-3"
                      />
                    )}

                    <Button className="w-full group-hover:shadow-glow transition-all">
                      Book Tickets
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
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">{result.team1}:</span> {result.score1}
                          </div>
                          <div>
                            <span className="font-medium">{result.team2}:</span> {result.score2}
                          </div>
                        </div>
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
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
                <p className="text-muted-foreground">Hours of Cricket</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CricketPage;