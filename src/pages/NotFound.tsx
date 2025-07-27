import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🏟️</div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-4">Game Over!</h2>
            <p className="text-muted-foreground mb-6">
              Looks like this page has been benched. The URL you're looking for doesn't exist.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="/cricket">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Sports
                </a>
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Attempted URL: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
