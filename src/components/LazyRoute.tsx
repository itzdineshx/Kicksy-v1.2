import { Suspense, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import SportsLoader from './SportsLoader';
import { PageLoadingSkeleton, EventLoadingSkeleton, DashboardLoadingSkeleton } from './LoadingSkeleton';

interface LazyRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const LazyRoute = ({ children, fallback }: LazyRouteProps) => {
  const location = useLocation();

  // Smart loading skeleton based on current route
  const getSmartFallback = () => {
    if (fallback) return fallback;

    const path = location.pathname;
    
    if (path.includes('/dashboard') || path.includes('/admin') || path.includes('/organizer')) {
      return <DashboardLoadingSkeleton />;
    }
    
    if (path.includes('/events') || path.includes('/sports/')) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <EventLoadingSkeleton />
          </div>
        </div>
      );
    }
    
    // Default fallback for other routes
    return <PageLoadingSkeleton />;
  };

  return (
    <Suspense fallback={getSmartFallback()}>
      {children}
    </Suspense>
  );
};

export default LazyRoute;