import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { User, Mail, Lock, Shield, Users, UserCheck } from "lucide-react";

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
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="flex justify-center">
                <SignIn 
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                      card: "shadow-none border-0 bg-transparent p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border-border hover:bg-accent",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground",
                      formFieldInput: "border-border bg-background",
                      formFieldLabel: "text-foreground",
                      footerActionLink: "text-primary hover:text-primary/80"
                    }
                  }}
                  fallbackRedirectUrl="/dashboard"
                  signUpFallbackRedirectUrl="/dashboard"
                />
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="flex justify-center">
                <SignUp 
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                      card: "shadow-none border-0 bg-transparent p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border-border hover:bg-accent",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground",
                      formFieldInput: "border-border bg-background",
                      formFieldLabel: "text-foreground",
                      footerActionLink: "text-primary hover:text-primary/80"
                    }
                  }}
                  fallbackRedirectUrl="/dashboard"
                  signInFallbackRedirectUrl="/dashboard"
                />
              </div>
            </TabsContent>
          </Tabs>

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

          {/* Demo Credentials Section */}
          <div className="mt-6 space-y-4">
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <p className="font-medium mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Demo Credentials Available:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 mt-0.5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Admin Access</p>
                    <p className="text-xs">Email: admin@kicksy.com</p>
                    <p className="text-xs">Password: admin123</p>
                    <p className="text-xs text-muted-foreground">Full system access</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Organizer Access</p>
                    <p className="text-xs">Email: organizer@kicksy.com</p>
                    <p className="text-xs">Password: organizer123</p>
                    <p className="text-xs text-muted-foreground">Event management access</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 mt-0.5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-emerald-500">User Access</p>
                    <p className="text-xs">Email: user@kicksy.com</p>
                    <p className="text-xs">Password: user123</p>
                    <p className="text-xs text-muted-foreground">Standard user features</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-accent/50 rounded border-l-4 border-primary">
                <p className="text-xs font-medium">💡 Auto Role Assignment</p>
                <p className="text-xs mt-1">
                  • Emails with "admin" → Admin role<br/>
                  • Emails with "organizer" → Organizer role<br/>
                  • All other emails → User role
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;