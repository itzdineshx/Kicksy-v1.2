import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    icon?: React.ReactNode;
  };
}

const breadcrumbConfig: BreadcrumbConfig = {
  '': { label: 'Home', icon: <Home className="w-4 h-4" /> },
  'events': { label: 'Events' },
  'venues': { label: 'Venues' },
  'news': { label: 'News' },
  'live-scores': { label: 'Live Scores' },
  'standings': { label: 'Standings' },
  'sports': { label: 'Sports' },
  'cricket': { label: 'Cricket' },
  'football': { label: 'Football' },
  'kabaddi': { label: 'Kabaddi' },
  'dashboard': { label: 'Dashboard' },
  'admin': { label: 'Admin Dashboard' },
  'organizer': { label: 'Organizer Dashboard' },
  'profile': { label: 'Profile' },
  'settings': { label: 'Settings' },
  'bookings': { label: 'My Bookings' },
  'search': { label: 'Search Results' }
};

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  const generateBreadcrumbs = () => {
    const breadcrumbs: Array<{
      label: string;
      path: string;
      icon?: React.ReactNode;
    }> = [
      {
        label: 'Home',
        path: '/',
        icon: <Home className="w-4 h-4" />
      }
    ];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const config = breadcrumbConfig[segment];
      
      if (config) {
        breadcrumbs.push({
          label: config.label,
          path: currentPath,
          icon: config.icon
        });
      } else {
        // Handle dynamic segments (like event IDs)
        const formattedLabel = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          label: formattedLabel,
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="container mx-auto px-4 py-2 border-b border-border/20">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="flex items-center gap-2 text-foreground font-medium">
                    {crumb.icon}
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={crumb.path}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {crumb.icon}
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DynamicBreadcrumbs;