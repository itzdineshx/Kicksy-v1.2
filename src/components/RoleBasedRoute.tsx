import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RoleBasedRoute = () => {
  const { role, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if user just logged in and is on the home page or login page
    if (isAuthenticated && !hasRedirected.current && (location.pathname === '/' || location.pathname === '/login')) {
      hasRedirected.current = true;
      
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'organizer':
          navigate('/organizer');
          break;
        case 'user':
          navigate('/dashboard');
          break;
        default:
          // Guest users stay on home page
          break;
      }
    }
  }, [role, isAuthenticated, navigate, location.pathname]);

  // Reset the redirect flag when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      hasRedirected.current = false;
    }
  }, [isAuthenticated]);

  return null;
};

export default RoleBasedRoute;