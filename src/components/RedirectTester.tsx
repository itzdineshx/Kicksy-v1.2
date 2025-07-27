import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Home, Calendar, MapPin, Settings, User } from "lucide-react";

const RedirectTester = () => {
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRedirect = async (path: string, label: string) => {
    setIsRedirecting(path);
    
    toast({
      title: `🚀 Redirecting to ${label}`,
      description: "Navigation in progress...",
    });

    // Add visual delay to show redirect is working
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate(path);
    setIsRedirecting(null);
  };

  const redirectTests = [
    { path: '/events', label: 'Events Page', icon: Calendar },
    { path: '/venues', label: 'Venues Page', icon: MapPin },
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/login', label: 'Login Page', icon: Settings },
    { path: '/', label: 'Home Page', icon: Home },
  ];

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          Redirect Functionality Test
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click any button below to test navigation redirects
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {redirectTests.map((test) => {
          const Icon = test.icon;
          const isLoading = isRedirecting === test.path;
          
          return (
            <Button
              key={test.path}
              onClick={() => handleRedirect(test.path, test.label)}
              disabled={isRedirecting !== null}
              variant={isLoading ? "default" : "outline"}
              className="w-full justify-start"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Icon className="w-4 h-4 mr-2" />
                  Navigate to {test.label}
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </Button>
          );
        })}
        
        <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
          <div className="flex items-center gap-2 text-green-600 font-medium mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Redirect System Active
          </div>
          <p className="text-muted-foreground text-xs">
            Click any button above to test React Router navigation. 
            You'll see visual feedback before the redirect happens.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedirectTester;