import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    icon: "sun" | "cloud" | "rain" | "storm";
  };
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    icon: "sun" | "cloud" | "rain" | "storm";
  }[];
  alerts: {
    type: "warning" | "advisory" | "watch";
    message: string;
    severity: "low" | "medium" | "high";
  }[];
}

interface WeatherImpact {
  attendanceImpact: number;
  priceImpact: number;
  gameplayImpact: "excellent" | "good" | "fair" | "poor";
  recommendation: string;
}

const WeatherIntegration = ({ eventDate, venue, sport }: {
  eventDate: string;
  venue: string;
  sport: string;
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherImpact, setWeatherImpact] = useState<WeatherImpact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data based on location
      const mockWeatherData: WeatherData = {
        current: {
          temperature: 26,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          icon: "cloud"
        },
        forecast: [
          {
            date: "Dec 28",
            high: 28,
            low: 22,
            condition: "Sunny",
            precipitation: 0,
            icon: "sun"
          },
          {
            date: "Dec 29",
            high: 27,
            low: 21,
            condition: "Partly Cloudy",
            precipitation: 10,
            icon: "cloud"
          },
          {
            date: "Dec 30",
            high: 25,
            low: 20,
            condition: "Light Rain",
            precipitation: 60,
            icon: "rain"
          }
        ],
        alerts: [
          {
            type: "advisory",
            message: "Perfect outdoor sports weather expected",
            severity: "low"
          }
        ]
      };

      // Calculate weather impact
      const impact: WeatherImpact = {
        attendanceImpact: 15, // 15% increase expected
        priceImpact: 8, // 8% price increase due to good weather
        gameplayImpact: "excellent",
        recommendation: "Perfect conditions for outdoor sports! Book now before prices increase."
      };

      setWeatherData(mockWeatherData);
      setWeatherImpact(impact);
      setLoading(false);
    };

    fetchWeatherData();
  }, [eventDate, venue]);

  const getWeatherIcon = (icon: string, size: "sm" | "lg" = "sm") => {
    const iconSize = size === "lg" ? "w-8 h-8" : "w-5 h-5";
    
    switch (icon) {
      case "sun":
        return <Sun className={`${iconSize} text-yellow-500`} />;
      case "cloud":
        return <Cloud className={`${iconSize} text-gray-500`} />;
      case "rain":
        return <CloudRain className={`${iconSize} text-blue-500`} />;
      default:
        return <Sun className={`${iconSize} text-yellow-500`} />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-600";
    if (impact < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-sm text-muted-foreground ml-2">Fetching weather data...</span>
        </div>
      </Card>
    );
  }

  if (!weatherData || !weatherImpact) return null;

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            {getWeatherIcon(weatherData.current.icon, "lg")}
            Live Weather - {venue}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{weatherData.current.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weatherData.current.condition}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="font-bold">{weatherData.current.humidity}%</span>
              </div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="font-bold">{weatherData.current.windSpeed} km/h</span>
              </div>
              <div className="text-sm text-muted-foreground">Wind Speed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="font-bold">{weatherData.current.visibility} km</span>
              </div>
              <div className="text-sm text-muted-foreground">Visibility</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              3-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.icon)}
                  <div>
                    <div className="font-medium">{day.date}</div>
                    <div className="text-sm text-muted-foreground">{day.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{day.high}°/{day.low}°</div>
                  <div className="text-sm text-blue-500">{day.precipitation}% rain</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weather Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Weather Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Attendance Impact */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expected Attendance Impact</span>
                <span className={`font-bold ${getImpactColor(weatherImpact.attendanceImpact)}`}>
                  +{weatherImpact.attendanceImpact}%
                </span>
              </div>
              <Progress value={Math.abs(weatherImpact.attendanceImpact)} className="h-2" />
              <p className="text-xs text-muted-foreground">Good weather typically increases attendance</p>
            </div>

            {/* Price Impact */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Predicted Price Impact</span>
                <span className={`font-bold ${getImpactColor(weatherImpact.priceImpact)}`}>
                  +{weatherImpact.priceImpact}%
                </span>
              </div>
              <Progress value={Math.abs(weatherImpact.priceImpact)} className="h-2" />
              <p className="text-xs text-muted-foreground">Dynamic pricing adjusts with weather conditions</p>
            </div>

            {/* Gameplay Quality */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gameplay Conditions</span>
                <Badge className={`${
                  weatherImpact.gameplayImpact === "excellent" ? "bg-green-500" :
                  weatherImpact.gameplayImpact === "good" ? "bg-blue-500" :
                  weatherImpact.gameplayImpact === "fair" ? "bg-yellow-500" :
                  "bg-red-500"
                }`}>
                  {weatherImpact.gameplayImpact}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Based on wind, visibility, and precipitation</p>
            </div>

            {/* AI Recommendation */}
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-sm">AI Recommendation</div>
                  <p className="text-xs text-muted-foreground mt-1">{weatherImpact.recommendation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Weather Alerts & Advisories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === "high" ? "bg-red-50 border-red-500" :
                    alert.severity === "medium" ? "bg-yellow-50 border-yellow-500" :
                    "bg-green-50 border-green-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                      {alert.type.toUpperCase()}
                    </Badge>
                    <span className="text-sm">{alert.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weather-Based Actions */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="font-bold text-lg">Perfect Weather = Higher Demand!</h3>
            <p className="text-primary-foreground/90">
              AI predicts 23% increase in bookings due to excellent weather conditions. 
              Prices may increase by 8-12% in the next 6 hours.
            </p>
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Set Weather Price Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherIntegration;