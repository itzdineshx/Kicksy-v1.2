import { Trophy, TrendingUp, Calendar, Award, Medal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamStandings from "@/components/TeamStandings";

const StandingsPage = () => {
  const cricketStandings = [
    { 
      rank: 1, team: "Mumbai Indians", played: 14, won: 10, lost: 4, points: 20, 
      netRR: "+0.456", form: ["W", "W", "L", "W", "W"], logo: "🏏" 
    },
    { 
      rank: 2, team: "Chennai Super Kings", played: 14, won: 9, lost: 5, points: 18, 
      netRR: "+0.321", form: ["W", "L", "W", "W", "L"], logo: "🏏" 
    },
    { 
      rank: 3, team: "Royal Challengers Bangalore", played: 14, won: 8, lost: 6, points: 16, 
      netRR: "+0.144", form: ["L", "W", "W", "L", "W"], logo: "🏏" 
    },
    { 
      rank: 4, team: "Delhi Capitals", played: 14, won: 7, lost: 7, points: 14, 
      netRR: "-0.089", form: ["W", "L", "L", "W", "W"], logo: "🏏" 
    }
  ];

  const footballStandings = [
    { 
      rank: 1, team: "Mumbai City FC", played: 20, won: 14, drawn: 4, lost: 2, points: 46, 
      gf: 42, ga: 18, gd: "+24", form: ["W", "W", "D", "W", "W"], logo: "⚽" 
    },
    { 
      rank: 2, team: "ATK Mohun Bagan", played: 20, won: 12, drawn: 6, lost: 2, points: 42, 
      gf: 38, ga: 16, gd: "+22", form: ["W", "D", "W", "W", "L"], logo: "⚽" 
    },
    { 
      rank: 3, team: "Bengaluru FC", played: 20, won: 11, drawn: 5, lost: 4, points: 38, 
      gf: 35, ga: 22, gd: "+13", form: ["L", "W", "W", "D", "W"], logo: "⚽" 
    },
    { 
      rank: 4, team: "FC Goa", played: 20, won: 10, drawn: 4, lost: 6, points: 34, 
      gf: 32, ga: 26, gd: "+6", form: ["W", "L", "D", "W", "W"], logo: "⚽" 
    }
  ];

  const kabaddiStandings = [
    { 
      rank: 1, team: "Patna Pirates", played: 22, won: 16, lost: 6, points: 88, 
      raidPoints: 412, tacklePoints: 298, form: ["W", "W", "L", "W", "W"], logo: "🤸" 
    },
    { 
      rank: 2, team: "Dabang Delhi K.C.", played: 22, won: 15, lost: 7, points: 84, 
      raidPoints: 398, tacklePoints: 312, form: ["W", "L", "W", "W", "L"], logo: "🤸" 
    },
    { 
      rank: 3, team: "U Mumba", played: 22, won: 14, lost: 8, points: 78, 
      raidPoints: 376, tacklePoints: 289, form: ["L", "W", "W", "L", "W"], logo: "🤸" 
    },
    { 
      rank: 4, team: "Bengaluru Bulls", played: 22, won: 12, lost: 10, points: 72, 
      raidPoints: 358, tacklePoints: 276, form: ["W", "L", "L", "W", "W"], logo: "🤸" 
    }
  ];

  const topPerformers = [
    {
      name: "Virat Kohli",
      sport: "Cricket",
      stats: "782 runs",
      team: "RCB",
      performance: "Leading run scorer"
    },
    {
      name: "Sunil Chhetri",
      sport: "Football", 
      stats: "18 goals",
      team: "Bengaluru FC",
      performance: "Top goalscorer"
    },
    {
      name: "Pardeep Narwal",
      sport: "Kabaddi",
      stats: "298 raid points",
      team: "Patna Pirates", 
      performance: "Raid master"
    }
  ];

  const StandingsTable = ({ data, sport }: { data: any[], sport: string }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 font-semibold">Pos</th>
            <th className="text-left p-3 font-semibold">Team</th>
            <th className="text-center p-3 font-semibold">P</th>
            {sport === "football" ? (
              <>
                <th className="text-center p-3 font-semibold">W</th>
                <th className="text-center p-3 font-semibold">D</th>
                <th className="text-center p-3 font-semibold">L</th>
                <th className="text-center p-3 font-semibold">GF</th>
                <th className="text-center p-3 font-semibold">GA</th>
                <th className="text-center p-3 font-semibold">GD</th>
              </>
            ) : sport === "cricket" ? (
              <>
                <th className="text-center p-3 font-semibold">W</th>
                <th className="text-center p-3 font-semibold">L</th>
                <th className="text-center p-3 font-semibold">NRR</th>
              </>
            ) : (
              <>
                <th className="text-center p-3 font-semibold">W</th>
                <th className="text-center p-3 font-semibold">L</th>
                <th className="text-center p-3 font-semibold">RP</th>
                <th className="text-center p-3 font-semibold">TP</th>
              </>
            )}
            <th className="text-center p-3 font-semibold">Pts</th>
            <th className="text-center p-3 font-semibold">Form</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr 
              key={index} 
              className={`border-b border-border/50 hover:bg-muted/30 transition-colors
                ${index < 4 ? 'bg-green-50/30 dark:bg-green-950/10' : ''}
                ${index >= data.length - 2 ? 'bg-red-50/30 dark:bg-red-950/10' : ''}
              `}
            >
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${index < 4 ? 'bg-green-500 text-white' : index >= data.length - 2 ? 'bg-red-500 text-white' : 'bg-muted text-foreground'}
                  `}>
                    {team.rank}
                  </span>
                  {index < 3 && (
                    <Medal className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                  )}
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{team.logo}</span>
                  <span className="font-medium">{team.team}</span>
                </div>
              </td>
              <td className="text-center p-3">{team.played}</td>
              <td className="text-center p-3">{team.won}</td>
              {sport === "football" && (
                <>
                  <td className="text-center p-3">{team.drawn}</td>
                  <td className="text-center p-3">{team.lost}</td>
                  <td className="text-center p-3">{team.gf}</td>
                  <td className="text-center p-3">{team.ga}</td>
                  <td className="text-center p-3">
                    <span className={team.gd.startsWith('+') ? 'text-green-600' : team.gd.startsWith('-') ? 'text-red-600' : ''}>
                      {team.gd}
                    </span>
                  </td>
                </>
              )}
              {sport === "cricket" && (
                <>
                  <td className="text-center p-3">{team.lost}</td>
                  <td className="text-center p-3">
                    <span className={team.netRR.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {team.netRR}
                    </span>
                  </td>
                </>
              )}
              {sport === "kabaddi" && (
                <>
                  <td className="text-center p-3">{team.lost}</td>
                  <td className="text-center p-3">{team.raidPoints}</td>
                  <td className="text-center p-3">{team.tacklePoints}</td>
                </>
              )}
              <td className="text-center p-3">
                <span className="font-bold text-primary">{team.points}</span>
              </td>
              <td className="text-center p-3">
                <div className="flex gap-1 justify-center">
                  {team.form.map((result: string, i: number) => (
                    <span key={i} className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center
                      ${result === 'W' ? 'bg-green-500 text-white' : 
                        result === 'L' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'}
                    `}>
                      {result}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            League Standings
          </h1>
          <p className="text-lg text-muted-foreground">
            Current league positions and team performances across all tournaments
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-floating transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-muted-foreground">Active Tournaments</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-floating transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold">2,340</h3>
              <p className="text-muted-foreground">Total Teams</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-floating transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-tertiary" />
              <h3 className="text-2xl font-bold">15.6M</h3>
              <p className="text-muted-foreground">Total Fans</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Standings */}
        <Tabs defaultValue="cricket" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cricket" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Cricket
            </TabsTrigger>
            <TabsTrigger value="football" className="flex items-center gap-2">
              <Medal className="w-4 h-4" />
              Football
            </TabsTrigger>
            <TabsTrigger value="kabaddi" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Kabaddi
            </TabsTrigger>
          </TabsList>

          {/* Cricket Standings */}
          <TabsContent value="cricket" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  IPL 2024 Points Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StandingsTable data={cricketStandings} sport="cricket" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Football Standings */}
          <TabsContent value="football" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-6 h-6 text-secondary" />
                  ISL 2024 League Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StandingsTable data={footballStandings} sport="football" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kabaddi Standings */}
          <TabsContent value="kabaddi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-tertiary" />
                  PKL Season 10 Points Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StandingsTable data={kabaddiStandings} sport="kabaddi" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Performers */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Performers</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {topPerformers.map((performer, index) => (
              <Card key={index} className="hover:shadow-floating transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    #{index + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{performer.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {performer.sport} • {performer.team}
                  </Badge>
                  <p className="text-2xl font-bold text-primary mb-2">{performer.stats}</p>
                  <p className="text-sm text-muted-foreground">{performer.performance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Component */}
        <div className="mt-12">
          <TeamStandings />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StandingsPage;