import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      switch (role) {
        case 'admin':
          navigate("/admin");
          break;
        case 'organizer':
          navigate("/organizer");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    }
  }, [isAuthenticated, role, navigate]);

  if (isAuthenticated) {
    return null; // Will redirect above
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
            Welcome to Kicksy
          </CardTitle>
          <p className="text-muted-foreground">
            Your gateway to the best sports events
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Clerk Sign In Component */}
          <div className="space-y-4">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-muted-foreground"
                }
              }}
              fallbackRedirectUrl="/dashboard"
              signUpFallbackRedirectUrl="/dashboard"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Clerk Sign Up Component */}
          <div className="space-y-4">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-muted-foreground"
                }
              }}
              fallbackRedirectUrl="/dashboard"
              signInFallbackRedirectUrl="/dashboard"
            />
          </div>

          <div className="mt-6 text-center">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              <User className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="font-medium mb-1">Demo Information:</p>
            <p>You can sign up with any email or use social login.</p>
            <p>Role assignment is automatic based on email patterns:</p>
            <p>• admin@* → Admin role</p>
            <p>• organizer@* → Organizer role</p>
            <p>• Others → User role</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;