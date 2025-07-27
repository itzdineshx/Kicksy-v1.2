import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/components/LocalStorageProvider";
import { 
  Trophy, 
  Star, 
  Gift, 
  Zap, 
  Target, 
  Award, 
  Crown,
  TrendingUp,
  Calendar,
  Eye,
  Heart,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LoyaltyAction {
  id: string;
  type: "booking" | "viewing" | "sharing" | "review" | "referral" | "daily";
  description: string;
  points: number;
  icon: React.ReactNode;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  currentProgress: number;
  completed: boolean;
  points: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
  icon: React.ReactNode;
}

export const LoyaltyPointsSystem: React.FC = () => {
  const { userProfile } = useLocalStorage();
  const [points, setPoints] = useState(1250);
  const [recentActions, setRecentActions] = useState<LoyaltyAction[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const loyaltyTiers: LoyaltyTier[] = [
    {
      id: "bronze",
      name: "Bronze Fan",
      minPoints: 0,
      maxPoints: 999,
      color: "text-amber-600",
      benefits: ["5% booking discount", "Early event notifications"],
      icon: <Trophy className="w-5 h-5" />
    },
    {
      id: "silver",
      name: "Silver Supporter",
      minPoints: 1000,
      maxPoints: 2999,
      color: "text-gray-500",
      benefits: ["10% booking discount", "Priority support", "Free seat upgrades"],
      icon: <Star className="w-5 h-5" />
    },
    {
      id: "gold",
      name: "Gold Champion",
      minPoints: 3000,
      maxPoints: 7499,
      color: "text-yellow-500",
      benefits: ["15% booking discount", "VIP lounge access", "Free merchandise"],
      icon: <Award className="w-5 h-5" />
    },
    {
      id: "platinum",
      name: "Platinum Legend",
      minPoints: 7500,
      maxPoints: Infinity,
      color: "text-purple-500",
      benefits: ["20% booking discount", "Meet & greet access", "Premium experiences"],
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const currentTier = loyaltyTiers.find(tier => 
    points >= tier.minPoints && points <= tier.maxPoints
  ) || loyaltyTiers[0];

  const nextTier = loyaltyTiers.find(tier => tier.minPoints > points);
  const progressToNext = nextTier ? 
    ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  // Initialize achievements
  useEffect(() => {
    const initialAchievements: Achievement[] = [
      {
        id: "first-booking",
        title: "First Steps",
        description: "Make your first ticket booking",
        icon: <Calendar className="w-6 h-6" />,
        requirement: 1,
        currentProgress: 1,
        completed: true,
        points: 100,
        rarity: "common"
      },
      {
        id: "event-explorer",
        title: "Event Explorer",
        description: "View 10 different events",
        icon: <Eye className="w-6 h-6" />,
        requirement: 10,
        currentProgress: 7,
        completed: false,
        points: 200,
        rarity: "common"
      },
      {
        id: "sports-fan",
        title: "Sports Enthusiast",
        description: "Book tickets for 3 different sports",
        icon: <Heart className="w-6 h-6" />,
        requirement: 3,
        currentProgress: 2,
        completed: false,
        points: 300,
        rarity: "rare"
      },
      {
        id: "social-butterfly",
        title: "Social Butterfly",
        description: "Share 5 events with friends",
        icon: <Users className="w-6 h-6" />,
        requirement: 5,
        currentProgress: 1,
        completed: false,
        points: 250,
        rarity: "rare"
      },
      {
        id: "mega-fan",
        title: "Mega Fan",
        description: "Spend ₹50,000 on tickets",
        icon: <Crown className="w-6 h-6" />,
        requirement: 50000,
        currentProgress: 28500,
        completed: false,
        points: 1000,
        rarity: "legendary"
      }
    ];

    setAchievements(initialAchievements);
  }, []);

  // Recent point-earning actions
  useEffect(() => {
    const actions: LoyaltyAction[] = [
      {
        id: "1",
        type: "booking",
        description: "Booked Cricket Championship Final",
        points: 250,
        icon: <Calendar className="w-4 h-4" />,
        color: "text-green-600"
      },
      {
        id: "2",
        type: "review",
        description: "Reviewed Football Finals",
        points: 50,
        icon: <Star className="w-4 h-4" />,
        color: "text-yellow-600"
      },
      {
        id: "3",
        type: "sharing",
        description: "Shared Kabaddi League with friends",
        points: 25,
        icon: <Users className="w-4 h-4" />,
        color: "text-blue-600"
      },
      {
        id: "4",
        type: "daily",
        description: "Daily login bonus",
        points: 10,
        icon: <Gift className="w-4 h-4" />,
        color: "text-purple-600"
      }
    ];

    setRecentActions(actions);
  }, []);

  const earnPoints = (action: LoyaltyAction) => {
    setPoints(prev => prev + action.points);
    // In a real app, this would be stored in localStorage/backend
  };

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common": return "text-gray-600 bg-gray-100";
      case "rare": return "text-blue-600 bg-blue-100";
      case "epic": return "text-purple-600 bg-purple-100";
      case "legendary": return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Loyalty Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-2xl font-bold", currentTier.color)}>
                  {currentTier.name}
                </span>
                {currentTier.icon}
              </div>
              <div className="text-3xl font-bold text-primary">{points.toLocaleString()} Points</div>
            </div>
            <div className="text-right">
              {nextTier && (
                <>
                  <div className="text-sm text-muted-foreground">Next: {nextTier.name}</div>
                  <div className="text-lg font-semibold">
                    {(nextTier.minPoints - points).toLocaleString()} points to go
                  </div>
                </>
              )}
            </div>
          </div>

          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentTier.name}</span>
                <span>{nextTier.name}</span>
              </div>
              <Progress value={progressToNext} className="h-3" />
              <div className="text-center text-sm text-muted-foreground">
                {progressToNext.toFixed(1)}% to next tier
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActions.map(action => (
              <div key={action.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-full bg-background", action.color)}>
                    {action.icon}
                  </div>
                  <div>
                    <div className="font-medium">{action.description}</div>
                    <div className="text-sm text-muted-foreground capitalize">{action.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+{action.points}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Tier Benefits */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Your Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTier.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            {nextTier && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <div className="font-semibold mb-2">Unlock at {nextTier.name}:</div>
                <div className="space-y-1">
                  {nextTier.benefits.slice(currentTier.benefits.length).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-3 h-3" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-200",
                  achievement.completed 
                    ? "bg-green-50 border-green-200" 
                    : "bg-muted/20 border-muted/40"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      achievement.completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                    )}>
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    <div className="text-sm font-medium text-green-600">
                      +{achievement.points} pts
                    </div>
                  </div>
                </div>
                
                {!achievement.completed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.currentProgress} / {achievement.requirement}</span>
                    </div>
                    <Progress 
                      value={(achievement.currentProgress / achievement.requirement) * 100} 
                      className="h-2" 
                    />
                  </div>
                )}
                
                {achievement.completed && (
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Zap className="w-4 h-4" />
                    Completed!
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-bold">Earn More Points</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">
              Refer Friends (+100)
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">
              Write Review (+50)
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">
              Share Event (+25)
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">
              Daily Check-in (+10)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};