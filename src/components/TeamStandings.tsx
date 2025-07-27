import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamStandings = () => {
  const [sortBy, setSortBy] = useState<"points" | "wins" | "nrr">("points");

  const cricketStandings = [
    {
      position: 1,
      team: "Mumbai Indians",
      logo: "🏆",
      matches: 12,
      wins: 9,
      losses: 3,
      points: 18,
      nrr: "+1.25",
      trend: "up",
      form: ["W", "W", "L", "W", "W"]
    },
    {
      position: 2,
      team: "Chennai Super Kings",
      logo: "💛",
      matches: 12,
      wins: 8,
      losses: 4,
      points: 16,
      nrr: "+0.95",
      trend: "up",
      form: ["W", "W", "W", "L", "W"]
    },
    {
      position: 3,
      team: "Royal Challengers",
      logo: "🔴",
      matches: 12,
      wins: 7,
      losses: 5,
      points: 14,
      nrr: "+0.45",
      trend: "down",
      form: ["L", "W", "W", "L", "L"]
    },
    {
      position: 4,
      team: "Delhi Capitals",
      logo: "🔵",
      matches: 12,
      wins: 6,
      losses: 6,
      points: 12,
      nrr: "-0.15",
      trend: "same",
      form: ["W", "L", "W", "W", "L"]
    }
  ];

  const footballStandings = [
    {
      position: 1,
      team: "Mumbai City FC",
      logo: "⚽",
      matches: 16,
      wins: 11,
      losses: 3,
      draws: 2,
      points: 35,
      gd: "+15",
      trend: "up",
      form: ["W", "W", "D", "W", "W"]
    },
    {
      position: 2,
      team: "Bengaluru FC",
      logo: "🔵",
      matches: 16,
      wins: 10,
      losses: 4,
      draws: 2,
      points: 32,
      gd: "+12",
      trend: "up",
      form: ["W", "L", "W", "W", "D"]
    },
    {
      position: 3,
      team: "ATK Mohun Bagan",
      logo: "💚",
      matches: 16,
      wins: 9,
      losses: 5,
      draws: 2,
      points: 29,
      gd: "+8",
      trend: "down",
      form: ["L", "W", "W", "L", "D"]
    },
    {
      position: 4,
      team: "FC Goa",
      logo: "🟠",
      matches: 16,
      wins: 8,
      losses: 6,
      draws: 2,
      points: 26,
      gd: "+3",
      trend: "same",
      form: ["W", "L", "D", "W", "L"]
    }
  ];

  const kabaddiStandings = [
    {
      position: 1,
      team: "Tamil Thalaivas",
      logo: "🤼",
      matches: 18,
      wins: 14,
      losses: 4,
      points: 74,
      average: "41.1",
      trend: "up",
      form: ["W", "W", "W", "L", "W"]
    },
    {
      position: 2,
      team: "Puneri Paltan",
      logo: "🟡",
      matches: 18,
      wins: 13,
      losses: 5,
      points: 71,
      average: "39.4",
      trend: "up",
      form: ["W", "W", "L", "W", "W"]
    },
    {
      position: 3,
      team: "Bengal Warriors",
      logo: "🐅",
      matches: 18,
      wins: 11,
      losses: 7,
      points: 65,
      average: "36.1",
      trend: "down",
      form: ["L", "W", "W", "L", "L"]
    },
    {
      position: 4,
      team: "U Mumba",
      logo: "🔵",
      matches: 18,
      wins: 9,
      losses: 9,
      points: 58,
      average: "32.2",
      trend: "same",
      form: ["W", "L", "D", "W", "L"]
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-primary" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getFormBadge = (result: string) => {
    const colors = {
      W: "bg-primary text-primary-foreground",
      L: "bg-destructive text-destructive-foreground", 
      D: "bg-muted text-muted-foreground"
    };
    return colors[result as keyof typeof colors] || colors.D;
  };

  const renderStandingsTable = (data: any[], type: "cricket" | "football" | "kabaddi") => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Pos</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-center">MP</TableHead>
          <TableHead className="text-center">W</TableHead>
          <TableHead className="text-center">L</TableHead>
          {type === "football" && <TableHead className="text-center">D</TableHead>}
          <TableHead className="text-center">Pts</TableHead>
          <TableHead className="text-center">
            {type === "cricket" && "NRR"}
            {type === "football" && "GD"}
            {type === "kabaddi" && "Avg"}
          </TableHead>
          <TableHead className="text-center">Form</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((team) => (
          <TableRow key={team.position} className="hover:bg-muted/50">
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-bold">{team.position}</span>
                {team.position <= 4 && (
                  <Trophy className="w-4 h-4 text-primary" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="text-xl">{team.logo}</span>
                <span className="font-medium">{team.team}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">{team.matches}</TableCell>
            <TableCell className="text-center">{team.wins}</TableCell>
            <TableCell className="text-center">{team.losses}</TableCell>
            {type === "football" && (
              <TableCell className="text-center">{team.draws}</TableCell>
            )}
            <TableCell className="text-center font-bold">{team.points}</TableCell>
            <TableCell className="text-center">
              {type === "cricket" && team.nrr}
              {type === "football" && team.gd}
              {type === "kabaddi" && team.average}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-1 justify-center">
                {team.form.map((result: string, index: number) => (
                  <Badge
                    key={index}
                    className={`w-6 h-6 text-xs rounded-full p-0 flex items-center justify-center ${getFormBadge(result)}`}
                  >
                    {result}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {getTrendIcon(team.trend)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            League Standings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live tournament standings and team performance across all sports
          </p>
        </div>

        <div className="max-w-6xl mx-auto animate-scale-in [animation-delay:200ms]">
          <Tabs defaultValue="cricket" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 h-14">
              <TabsTrigger value="cricket" className="text-base">
                🏏 Cricket
              </TabsTrigger>
              <TabsTrigger value="football" className="text-base">
                ⚽ Football  
              </TabsTrigger>
              <TabsTrigger value="kabaddi" className="text-base">
                🤼 Kabaddi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cricket">
              <Card className="border-0 shadow-floating">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">IPL 2024 Standings</CardTitle>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Sort by Points
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {renderStandingsTable(cricketStandings, "cricket")}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="football">
              <Card className="border-0 shadow-floating">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">ISL 2024 Standings</CardTitle>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Sort by Points
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {renderStandingsTable(footballStandings, "football")}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kabaddi">
              <Card className="border-0 shadow-floating">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">PKL 2024 Standings</CardTitle>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Sort by Points
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {renderStandingsTable(kabaddiStandings, "kabaddi")}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TeamStandings;