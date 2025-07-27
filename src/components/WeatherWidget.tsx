import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLocation } from "@/contexts/LocationContext";

interface WeatherData {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCity } = useLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the selected city from context
        const apiKey = "aa64c49b8fab482d83d182058252707";
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=no`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedCity]); // Re-fetch when city changes

  const getWeatherIcon = () => {
    if (!weatherData) return <Cloud className="w-5 h-5" />;
    
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes('sun') || condition.includes('clear')) {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className="w-5 h-5 text-blue-500" />;
    } else {
      return <Cloud className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="relative animate-pulse">
        <Thermometer className="w-5 h-5" />
      </Button>
    );
  }

  if (error) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Thermometer className="w-5 h-5 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover-glow">
          {getWeatherIcon()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                {weatherData?.location.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {weatherData?.location.region}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {weatherData?.current.temp_c}°C
              </div>
              <p className="text-sm text-muted-foreground">
                {weatherData?.current.condition.text}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weatherData?.current.humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">{weatherData?.current.wind_kph} km/h</p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Updated every 30 minutes
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WeatherWidget;