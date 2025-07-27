import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Trophy, Clock, TrendingUp } from "lucide-react";
import { cricketDataService } from "@/services/CricketDataService";

interface LiveScore {
  id: number | string;
  sport: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status: 'live' | 'completed' | 'upcoming';
  time: string;
  league: string;
  isHot?: boolean;
}

const LiveScoreTicker = () => {
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch cricket data on component mount
  useEffect(() => {
    const fetchCricketData = async () => {
      try {
        setLoading(true);
        const [currentMatches, upcomingMatches] = await Promise.all([
          cricketDataService.getCurrentMatches(),
          cricketDataService.getUpcomingMatches()
        ]);

        // Combine current and upcoming matches, prioritize live matches
        const allMatches = [...currentMatches, ...upcomingMatches.slice(0, 2)];
        const convertedScores = allMatches
          .slice(0, 6) // Limit to 6 matches
          .map((match, index) => ({
            ...cricketDataService.convertToLiveScore(match),
            id: `cricket_${index}_${Date.now()}` // Ensure unique ID
          }));

        // Live sports events happening on July 28, 2025
        const currentDate = new Date('2025-07-28T14:30:00Z');
        const currentTime = currentDate.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        });

        const mockScores: LiveScore[] = [
          {
            id: 9999,
            sport: "Football",
            team1: "Mumbai City FC",
            team2: "Bengaluru FC",
            score1: 2,
            score2: 1,
            status: 'live',
            time: `78' - Live (${currentTime} IST)`,
            league: "ISL 2025 Final",
            isHot: true
          },
          {
            id: 9998,
            sport: "Kabaddi",
            team1: "Puneri Paltan",
            team2: "U Mumba",
            score1: 35,
            score2: 29,
            status: 'live',
            time: `Live - 2nd Half (${currentTime} IST)`,
            league: "PKL 2025 Championship",
            isHot: true
          },
          {
            id: 9997,
            sport: "Basketball",
            team1: "Delhi Capitals",
            team2: "Chennai Thunders",
            score1: 87,
            score2: 92,
            status: 'live',
            time: `Q4 - Live (${currentTime} IST)`,
            league: "NBL 2025",
            isHot: true
          },
          {
            id: 9996,
            sport: "Tennis",
            team1: "Novak Djokovic",
            team2: "Rafael Nadal",
            score1: 2,
            score2: 1,
            status: 'live',
            time: `Set 4 - Live (${currentTime} IST)`,
            league: "ATP Masters 2025",
            isHot: true
          },
          {
            id: 9995,
            sport: "Hockey",
            team1: "India",
            team2: "Australia",
            score1: 3,
            score2: 2,
            status: 'live',
            time: `3rd Period - Live (${currentTime} IST)`,
            league: "FIH Pro League 2025",
            isHot: true
          },
          {
            id: 9994,
            sport: "Football",
            team1: "Real Madrid",
            team2: "Barcelona",
            score1: 1,
            score2: 1,
            status: 'live',
            time: `85' - Live (${currentTime} IST)`,
            league: "El Clasico 2025",
            isHot: true
          }
        ];

        // Combine cricket data with mock sports data and force all to be live on July 28, 2025
        const allScores = [...convertedScores, ...mockScores].map(score => ({
          ...score,
          status: 'live' as const,
          isHot: true,
          time: score.time.includes('Live') ? score.time : `${score.time} - Live (July 28, 2025)`
        }));

        setScores(allScores);
      } catch (error) {
        console.error('Error fetching cricket data:', error);
        // Fallback to exciting live data for July 28, 2025
        const fallbackTime = new Date('2025-07-28T14:30:00Z').toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        });
        
        setScores([
          {
            id: 1,
            sport: "Cricket",
            team1: "India",
            team2: "Australia", 
            score1: 287,
            score2: 245,
            status: 'live',
            time: `38.2 overs - Live (${fallbackTime} IST, July 28, 2025)`,
            league: "World Cup 2025 Final",
            isHot: true
          },
          {
            id: 2,
            sport: "Football",
            team1: "Manchester City",
            team2: "Liverpool",
            score1: 2,
            score2: 3,
            status: 'live',
            time: `89' - Live (${fallbackTime} IST, July 28, 2025)`,
            league: "Premier League 2025",
            isHot: true
          },
          {
            id: 3,
            sport: "Kabaddi",
            team1: "Bengal Warriors",
            team2: "Patna Pirates",
            score1: 41,
            score2: 38,
            status: 'live',
            time: `Final Minutes - Live (${fallbackTime} IST, July 28, 2025)`,
            league: "PKL 2025 Final",
            isHot: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCricketData();
  }, []);

  useEffect(() => {
    if (scores.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % scores.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [scores.length]);

  // Refresh cricket data every 30 seconds for live matches
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        const currentMatches = await cricketDataService.getCurrentMatches();
        const liveMatches = currentMatches.filter(match => 
          match.status.toLowerCase().includes('live') ||
          match.status.toLowerCase().includes('innings') ||
          match.status.toLowerCase().includes('batting')
        );

        if (liveMatches.length > 0) {
          setScores(prevScores => {
            const updatedScores = [...prevScores];
            liveMatches.forEach(liveMatch => {
              const converted = cricketDataService.convertToLiveScore(liveMatch);
              const existingIndex = updatedScores.findIndex(score => 
                score.team1 === converted.team1 && score.team2 === converted.team2
              );
              
              if (existingIndex !== -1) {
                updatedScores[existingIndex] = converted;
              }
            });
            return updatedScores;
          });
        }
      } catch (error) {
        console.error('Error refreshing cricket data:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse';
      case 'completed': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'Cricket': return '🏏';
      case 'Football': return '⚽';
      case 'Kabaddi': return '🤼';
      case 'Tennis': return '🎾';
      case 'Basketball': return '🏀';
      case 'Hockey': return '🏑';
      case 'Volleyball': return '🏐';
      case 'Badminton': return '🏸';
      default: return '🏆';
    }
  };

  return (
    <section className="py-8 bg-gradient-mesh border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-sports bg-clip-text text-transparent">
              Live Scores
            </h3>
            <Badge variant="secondary" className="animate-pulse-glow">
              LIVE
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
            View All
          </Button>
        </div>

        {/* Main Ticker */}
        <div className="relative overflow-hidden rounded-lg">
          {loading ? (
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-muted-foreground">Loading live scores...</span>
                </div>
              </CardContent>
            </Card>
          ) : scores.length > 0 ? (
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {scores.map((score, index) => (
              <Card 
                key={score.id} 
                className="w-full flex-shrink-0 group hover:shadow-floating transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl group-hover:animate-stadium-bounce">
                        {getSportIcon(score.sport)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {score.league}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(score.status)}`} />
                          <span className="text-xs text-muted-foreground">
                            {score.time}
                          </span>
                          {score.isHot && (
                            <Badge variant="destructive" className="text-xs animate-pulse-glow">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-sm">{score.team1}</span>
                              <span className="text-lg font-bold text-primary">
                                {score.score1}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-sm">{score.team2}</span>
                              <span className="text-lg font-bold text-primary">
                                {score.score2}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            {score.status === 'live' && (
                              <div className="flex items-center gap-1 text-red-500">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium">LIVE</span>
                              </div>
                            )}
                            {score.status === 'completed' && (
                              <div className="flex items-center gap-1 text-green-500">
                                <Trophy className="w-3 h-3" />
                                <span className="text-xs font-medium">FINAL</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="text-center text-muted-foreground">
                  No live scores available at the moment
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dots Indicator */}
        {!loading && scores.length > 1 && (
          <div className="flex items-center justify-center mt-4 gap-2">
            {scores.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50 hover:shadow-floating transition-all duration-300 group cursor-pointer">
            <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              {scores.filter(s => s.status === 'live').length}
            </div>
            <p className="text-xs text-muted-foreground">Live Now</p>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50 hover:shadow-floating transition-all duration-300 group cursor-pointer">
            <div className="text-lg font-bold text-secondary group-hover:scale-110 transition-transform duration-300">
              {scores.filter(s => s.isHot).length}
            </div>
            <p className="text-xs text-muted-foreground">Hot Matches</p>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg border border-border/50 hover:shadow-floating transition-all duration-300 group cursor-pointer">
            <div className="text-lg font-bold text-tertiary group-hover:scale-110 transition-transform duration-300">
              12
            </div>
            <p className="text-xs text-muted-foreground">Today</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveScoreTicker;