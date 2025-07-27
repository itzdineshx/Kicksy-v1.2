import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, User } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  fallbackPath?: string;
}

const RouteGuard = ({ 
  children, 
  requireAuth = false, 
  allowedRoles = [], 
  fallbackPath = '/' 
}: RouteGuardProps) => {
  const { isAuthenticated, role, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isChecking) {
      // Check authentication requirement
      if (requireAuth && !isAuthenticated) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        return;
      }

      // Check role permissions
      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        navigate(fallbackPath);
        return;
      }
    }
  }, [isChecking, requireAuth, isAuthenticated, allowedRoles, role, navigate, location.pathname, fallbackPath]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Verifying Access</h2>
          <p className="text-muted-foreground">Checking your permissions...</p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to access this page.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            className="w-full"
          >
            <User className="w-4 h-4 mr-2" />
            Login to Continue
          </Button>
        </Card>
      </div>
    );
  }

  // If role-based access is required but user doesn't have permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto">
          <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this page.
          </p>
          <div className="bg-muted/50 rounded-lg p-3 mb-6">
            <p className="text-sm">
              <strong>Your role:</strong> {role || 'Guest'}
            </p>
            <p className="text-sm">
              <strong>Required roles:</strong> {allowedRoles.join(', ')}
            </p>
          </div>
          <Button 
            onClick={() => navigate(fallbackPath)}
            variant="outline"
            className="w-full"
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;