import { Calendar, Clock, Trophy, TrendingUp, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LiveScoresPage = () => {
  const liveMatches = [
    {
      id: 1,
      sport: "Cricket",
      tournament: "IPL 2024",
      team1: {
        name: "Mumbai Indians",
        short: "MI",
        score: "185/6",
        overs: "20.0"
      },
      team2: {
        name: "Chennai Super Kings",
        short: "CSK",
        score: "142/8",
        overs: "17.3"
      },
      status: "live",
      time: "17.3 overs",
      venue: "Wankhede Stadium",
      target: "MI need 44 runs from 15 balls"
    },
    {
      id: 2,
      sport: "Football",
      tournament: "ISL 2024",
      team1: {
        name: "ATK Mohun Bagan",
        short: "ATKMB",
        score: "2"
      },
      team2: {
        name: "Bengaluru FC",
        short: "BFC",
        score: "1"
      },
      status: "live",
      time: "78'",
      venue: "Salt Lake Stadium"
    },
    {
      id: 3,
      sport: "Kabaddi",
      tournament: "PKL Season 10",
      team1: {
        name: "Patna Pirates",
        short: "PAT",
        score: "28"
      },
      team2: {
        name: "U Mumba",
        short: "MUM",
        score: "24"
      },
      status: "live",
      time: "32:45",
      venue: "Patliputra Sports Complex"
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      sport: "Cricket",
      tournament: "Test Series",
      team1: "India",
      team2: "England",
      date: "2024-08-15",
      time: "14:30",
      venue: "Lord's Cricket Ground"
    },
    {
      id: 2,
      sport: "Football",
      tournament: "World Cup Qualifier",
      team1: "India",
      team2: "Qatar",
      date: "2024-08-16",
      time: "19:30",
      venue: "Salt Lake Stadium"
    },
    {
      id: 3,
      sport: "Kabaddi",
      tournament: "PKL Season 10",
      team1: "Jaipur Pink Panthers",
      team2: "Telugu Titans",
      date: "2024-08-17",
      time: "20:00",
      venue: "Sawai Mansingh Stadium"
    }
  ];

  const recentResults = [
    {
      id: 1,
      sport: "Cricket",
      tournament: "IPL 2024",
      team1: "Royal Challengers Bangalore",
      team2: "Delhi Capitals",
      score1: "178/6",
      score2: "165/8",
      result: "RCB won by 13 runs",
      date: "2024-07-30"
    },
    {
      id: 2,
      sport: "Football",
      tournament: "ISL 2024",
      team1: "Mumbai City FC",
      team2: "FC Goa",
      score1: "3",
      score2: "1",
      result: "Mumbai City FC won 3-1",
      date: "2024-07-29"
    },
    {
      id: 3,
      sport: "Kabaddi",
      tournament: "PKL Season 10",
      team1: "Puneri Paltan",
      team2: "Haryana Steelers",
      score1: "42",
      score2: "38",
      result: "Puneri Paltan won by 4 points",
      date: "2024-07-28"
    }
  ];

  const topPerformers = [
    {
      name: "Virat Kohli",
      sport: "Cricket",
      stat: "89* runs",
      match: "RCB vs DC",
      performance: "Match Winner"
    },
    {
      name: "Sunil Chhetri",
      sport: "Football",
      stat: "2 goals",
      match: "BFC vs MCFC",
      performance: "Player of the Match"
    },
    {
      name: "Pardeep Narwal",
      sport: "Kabaddi",
      stat: "15 raid points",
      match: "PAT vs MUM",
      performance: "Super Raider"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Live Scores
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time updates from all major sporting events
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="destructive" className="animate-pulse">
              3 Live Matches
            </Badge>
            <Badge variant="secondary">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Live Matches Section */}
        {liveMatches.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Live Now</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {liveMatches.map((match) => (
                <Card key={match.id} className="border-red-500/50 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 hover:shadow-floating transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="destructive" className="mb-2 animate-pulse">
                          LIVE
                        </Badge>
                        <p className="text-sm font-medium">{match.tournament}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {match.sport}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{match.team1.short}</span>
                          <span className="text-sm text-muted-foreground">{match.team1.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">{match.team1.score}</span>
                          {match.team1.overs && (
                            <span className="text-sm text-muted-foreground ml-1">({match.team1.overs})</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{match.team2.short}</span>
                          <span className="text-sm text-muted-foreground">{match.team2.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">{match.team2.score}</span>
                          {match.team2.overs && (
                            <span className="text-sm text-muted-foreground ml-1">({match.team2.overs})</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium animate-pulse">{match.time}</span>
                        </div>
                        <Button size="sm" variant="outline" className="hover:shadow-glow">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                      {match.target && (
                        <p className="text-xs text-muted-foreground mt-2">{match.target}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Recent Results
            </TabsTrigger>
            <TabsTrigger value="performers" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Top Performers
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="text-xs">
                          {match.sport}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {new Date(match.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">{match.team1} vs {match.team2}</h3>
                        <p className="text-sm text-muted-foreground">{match.tournament}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4" />
                          {match.time}
                        </div>
                        <p className="text-center">{match.venue}</p>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        Set Reminder
                      </Button>
                    </div>
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
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {result.sport}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{result.tournament}</span>
                        </div>
                        <h3 className="font-semibold text-lg">{result.team1} vs {result.team2}</h3>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xl font-bold">{result.score1}</p>
                            <p className="text-sm text-muted-foreground">{result.team1}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">-</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold">{result.score2}</p>
                            <p className="text-sm text-muted-foreground">{result.team2}</p>
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

          {/* Top Performers */}
          <TabsContent value="performers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topPerformers.map((performer, index) => (
                <Card key={index} className="hover:shadow-floating transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{performer.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {performer.sport}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-primary">{performer.stat}</p>
                        <p className="text-sm text-muted-foreground">{performer.match}</p>
                        <Badge variant="secondary">
                          {performer.performance}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Auto Refresh Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
            <RotateCcw className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Live scores update automatically every 30 seconds
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveScoresPage;