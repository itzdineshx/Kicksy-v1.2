import { Star, Trophy, Target, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const PlayerProfiles = () => {
  const topPlayers = [
    {
      id: 1,
      name: "Virat Kohli",
      sport: "Cricket",
      team: "RCB",
      position: "Batsman",
      rating: 9.8,
      matches: 245,
      stats: {
        runs: "12,344",
        centuries: "43",
        average: "59.07"
      },
      achievements: ["Wisden Cricketer", "Khel Ratna", "Padma Shri"],
      recentForm: "excellent",
      gradient: "from-orange-500 to-red-500",
      initials: "VK"
    },
    {
      id: 2,
      name: "Sunil Chhetri",
      sport: "Football",
      team: "Bengaluru FC",
      position: "Forward",
      rating: 9.5,
      matches: 141,
      stats: {
        goals: "94",
        assists: "16",
        caps: "141"
      },
      achievements: ["Arjuna Award", "Padma Shri", "AIFF Player"],
      recentForm: "good",
      gradient: "from-green-500 to-blue-500",
      initials: "SC"
    },
    {
      id: 3,
      name: "Pardeep Narwal",
      sport: "Kabaddi",
      team: "Patna Pirates",
      position: "Raider",
      rating: 9.3,
      matches: 158,
      stats: {
        raidPoints: "1,890",
        successRate: "67%",
        superRaids: "45"
      },
      achievements: ["Dubki King", "Record Holder", "MVP Awards"],
      recentForm: "excellent",
      gradient: "from-purple-500 to-pink-500",
      initials: "PN"
    },
    {
      id: 4,
      name: "PV Sindhu",
      sport: "Badminton",
      team: "India",
      position: "Singles",
      rating: 9.7,
      matches: 89,
      stats: {
        titles: "23",
        winRate: "78%",
        ranking: "World #7"
      },
      achievements: ["Olympic Silver", "World Champion", "Padma Bhushan"],
      recentForm: "excellent",
      gradient: "from-yellow-500 to-orange-500",
      initials: "PS"
    }
  ];

  const getFormColor = (form: string) => {
    switch (form) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-yellow-500";
      case "average": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getFormText = (form: string) => {
    switch (form) {
      case "excellent": return "On Fire";
      case "good": return "Good Form";
      case "average": return "Average";
      default: return "Unknown";
    }
  };

  return (
    <section className="py-16 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Star Players
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the champions who make sports unforgettable with their incredible performances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPlayers.map((player, index) => (
            <Card 
              key={player.id} 
              className="group overflow-hidden hover:shadow-floating transition-all duration-500 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Header with gradient background */}
              <CardHeader className={`relative p-0 h-32 bg-gradient-to-br ${player.gradient} text-white`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {player.sport}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${getFormColor(player.recentForm)} animate-pulse`}></div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-bold text-lg group-hover:animate-pulse">{player.name}</h3>
                      <p className="text-sm opacity-90">{player.position} • {player.team}</p>
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                      <AvatarFallback className={`bg-gradient-to-br ${player.gradient} text-white font-bold`}>
                        {player.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{player.rating}</span>
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <Badge className={`${getFormColor(player.recentForm)} text-white`}>
                    {getFormText(player.recentForm)}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Key Stats</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(player.stats).map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-2 group-hover:bg-muted transition-colors duration-300">
                        <p className="text-lg font-bold text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">Top Achievements</h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {player.achievements.slice(0, 2).map((achievement, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                    {player.achievements.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{player.achievements.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-slide-in-bottom" style={{ animationDelay: "600ms" }}>
          <Button variant="hero" size="lg" className="hover:scale-105 transition-transform duration-300">
            <Users className="w-5 h-5 mr-2" />
            View All Players
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfiles;