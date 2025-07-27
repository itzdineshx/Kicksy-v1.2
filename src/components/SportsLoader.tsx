import { Card } from '@/components/ui/card';

const SportsLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="p-8 text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Football/Soccer Ball Animation */}
          <div className="absolute inset-0 animate-bounce">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow relative overflow-hidden">
              {/* Football pattern */}
              <div className="absolute top-2 left-2 w-3 h-3 border-2 border-primary-foreground rounded-full"></div>
              <div className="absolute top-6 right-3 w-2 h-2 border-2 border-primary-foreground rounded-full"></div>
              <div className="absolute bottom-3 left-5 w-2 h-2 border-2 border-primary-foreground rounded-full"></div>
              {/* Curved lines for football pattern */}
              <div className="absolute top-4 left-1 w-8 h-1 border-t-2 border-primary-foreground transform rotate-45"></div>
              <div className="absolute top-8 right-1 w-6 h-1 border-t-2 border-primary-foreground transform -rotate-45"></div>
            </div>
          </div>
          
          {/* Stadium/Field Glow Effect */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-20 h-20 -ml-2 -mt-2 rounded-full border-2 border-primary/30"></div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 kicksy-gradient-text">
          Loading Game
        </h3>
        <p className="text-muted-foreground">
          Getting the field ready...
        </p>
        
        {/* Stadium Loading Bar */}
        <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
        </div>
      </Card>
    </div>
  );
};

export default SportsLoader;