import { TrendingUp, DollarSign, Users, Target, Clock, AlertTriangle, Lightbulb, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DashboardSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      type: "pricing",
      priority: "high",
      title: "Dynamic Pricing Opportunity",
      message: "Cricket Championship demand is 95% higher than expected. Consider raising VIP ticket prices by ₹500.",
      action: "Increase Prices",
      impact: "+₹2,50,000 potential revenue",
      confidence: 92,
      urgent: true
    },
    {
      id: 2,
      type: "marketing",
      priority: "medium",
      title: "Promotional Boost Needed",
      message: "Basketball Tournament has low engagement. A 15% discount could increase sales by 40%.",
      action: "Create Offer",
      impact: "+180 ticket sales",
      confidence: 78,
      urgent: false
    },
    {
      id: 3,
      type: "capacity",
      priority: "low",
      title: "Venue Optimization",
      message: "Football Finals showing consistent sellouts. Consider moving to larger venue for 25% more revenue.",
      action: "Upgrade Venue",
      impact: "+₹3,75,000 revenue",
      confidence: 85,
      urgent: false
    }
  ];

  const salesTrends = [
    {
      event: "Cricket Championship",
      trend: "surge",
      prediction: "Sell out in 18 hours",
      confidence: 94,
      color: "text-green-500"
    },
    {
      event: "Football Finals",
      trend: "steady",
      prediction: "80% sold by event date",
      confidence: 87,
      color: "text-blue-500"
    },
    {
      event: "Basketball Tournament",
      trend: "slow",
      prediction: "45% capacity at current rate",
      confidence: 76,
      color: "text-orange-500"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pricing":
        return <DollarSign className="w-4 h-4" />;
      case "marketing":
        return <Target className="w-4 h-4" />;
      case "capacity":
        return <Users className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations Header */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
          AI Recommendations
        </h2>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <TrendingUp className="w-3 h-3 mr-1" />
          Smart Insights
        </Badge>
      </div>

      {/* Action Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Suggested Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className={`p-4 rounded-lg border-2 ${suggestion.urgent ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(suggestion.type)}
                    <Badge className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority.toUpperCase()}
                    </Badge>
                    {suggestion.urgent && (
                      <Badge variant="destructive" className="animate-pulse">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        URGENT
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Confidence</div>
                    <div className="font-bold text-primary">{suggestion.confidence}%</div>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.message}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Expected Impact</div>
                    <div className="font-medium text-green-600">{suggestion.impact}</div>
                  </div>
                  <Button size="sm" variant={suggestion.urgent ? "default" : "outline"}>
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sales Predictions */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Sales Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesTrends.map((trend, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/20 border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{trend.event}</h4>
                  <Badge className={`${trend.color} bg-transparent border-current`}>
                    {trend.trend}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Prediction Accuracy</span>
                    <span className="font-medium">{trend.confidence}%</span>
                  </div>
                  <Progress value={trend.confidence} className="h-2" />
                </div>
                
                <div className="mt-3 p-2 bg-background/50 rounded text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{trend.prediction}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-bold">Today's AI Insight</h3>
          </div>
          <p className="text-primary-foreground/90 leading-relaxed">
            Your events are performing 23% better than similar organizers this month. 
            Cricket shows the highest engagement (4.8/5 rating) while Basketball needs attention. 
            Consider cross-promoting Basketball to your Cricket audience for a 35% boost in sales.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSuggestions;