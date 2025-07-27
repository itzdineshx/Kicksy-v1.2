import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { BookingProvider } from "@/components/BookingProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { CartProvider } from "@/components/CartProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { SearchProvider } from "@/components/SearchProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { LocalStorageProvider } from "@/components/LocalStorageProvider";
import { MockDataProvider } from "@/components/MockDataProvider";
import { UserDataProvider } from "@/components/UserDataProvider";
import AdvancedBookingModal from "@/components/AdvancedBookingModal";
import RoleBasedRoute from "@/components/RoleBasedRoute";
import ProtectedRoute from "@/components/ProtectedRoute";
import RouteGuard from "@/components/RouteGuard";
import LazyRoute from "@/components/LazyRoute";
import { useBooking } from "@/components/BookingProvider";
import SmartNotifications from "@/components/SmartNotifications";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import DynamicSportsPage from "@/components/DynamicSportsPage";
import NavigationHandler from "@/components/NavigationHandler";


// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CricketPage = lazy(() => import("./pages/CricketPage"));
const FootballPage = lazy(() => import("./pages/FootballPage"));
const KabaddiPage = lazy(() => import("./pages/KabaddiPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const LiveScoresPage = lazy(() => import("./pages/LiveScoresPage"));
const StandingsPage = lazy(() => import("./pages/StandingsPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const OrganizerDashboard = lazy(() => import("./pages/OrganizerDashboard"));
const EventDetailsPage = lazy(() => import("./components/EventDetailsPage"));
const UserProfilePage = lazy(() => import("./components/UserProfilePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const BookingHistoryPage = lazy(() => import("./pages/BookingHistoryPage"));
const VenuesPage = lazy(() => import("./pages/VenuesPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const queryClient = new QueryClient();

const AppContent = () => {
  const { isBookingOpen, selectedEvent, closeBookingModal } = useBooking();
  
  // Remove the hook call from here - it will be called elsewhere
  // useNotificationNavigation();
  
  return (
    <>
      <BrowserRouter>
        <NavigationHandler>
          <ScrollToTop />
          <RoleBasedRoute />
          
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <LazyRoute>
              <Index />
            </LazyRoute>
          } />

          {/* Dynamic Sports Routes */}
          <Route path="/sports/:category" element={
            <LazyRoute>
              <DynamicSportsPage />
            </LazyRoute>
          } />

          {/* Legacy Sports Routes - Redirect to dynamic routes */}
          <Route path="/cricket" element={<Navigate to="/sports/cricket" replace />} />
          <Route path="/football" element={<Navigate to="/sports/football" replace />} />
          <Route path="/kabaddi" element={<Navigate to="/sports/kabaddi" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={
            <LazyRoute>
              <LoginPage />
            </LazyRoute>
          } />

          {/* News and Scores Routes */}
          <Route path="/news" element={
            <LazyRoute>
              <NewsPage />
            </LazyRoute>
          } />
          <Route path="/live-scores" element={
            <LazyRoute>
              <LiveScoresPage />
            </LazyRoute>
          } />
          <Route path="/standings" element={
            <LazyRoute>
              <StandingsPage />
            </LazyRoute>
          } />

          {/* Events Routes */}
          <Route path="/events" element={
            <LazyRoute>
              <EventsPage />
            </LazyRoute>
          } />
          <Route path="/events/:eventId" element={
            <LazyRoute>
              <EventDetailsPage />
            </LazyRoute>
          } />
          
          {/* Venues Route */}
          <Route path="/venues" element={
            <LazyRoute>
              <VenuesPage />
            </LazyRoute>
          } />
          
          {/* Booking History Route */}
          <Route path="/bookings" element={
            <RouteGuard requireAuth allowedRoles={['user', 'admin', 'organizer']}>
              <LazyRoute>
                <BookingHistoryPage />
              </LazyRoute>
            </RouteGuard>
          } />

          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <RouteGuard requireAuth allowedRoles={['user']}>
                <LazyRoute>
                  <UserDashboard />
                </LazyRoute>
              </RouteGuard>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <RouteGuard requireAuth allowedRoles={['admin']}>
                <LazyRoute>
                  <AdminDashboard />
                </LazyRoute>
              </RouteGuard>
            } 
          />

          {/* Protected Organizer Routes */}
          <Route 
            path="/organizer/*" 
            element={
              <RouteGuard requireAuth allowedRoles={['organizer']}>
                <LazyRoute>
                  <OrganizerDashboard />
                </LazyRoute>
              </RouteGuard>
            } 
          />

          {/* Profile Route - All authenticated users */}
          <Route 
            path="/profile" 
            element={
              <RouteGuard requireAuth allowedRoles={['user', 'admin', 'organizer']}>
                <LazyRoute>
                  <UserProfilePage />
                </LazyRoute>
              </RouteGuard>
            } 
          />

          {/* Settings Route */}
          <Route 
            path="/settings" 
            element={
              <RouteGuard requireAuth>
                <LazyRoute>
                  <UserProfilePage />
                </LazyRoute>
              </RouteGuard>
            } 
          />

          {/* Search Results Route */}
          <Route path="/search" element={
            <LazyRoute>
              <DynamicSportsPage />
            </LazyRoute>
          } />

          {/* Catch-all route - must be last */}
          <Route path="*" element={
            <LazyRoute>
              <NotFound />
            </LazyRoute>
          } />
        </Routes>
        </NavigationHandler>
        
        {/* Move AdvancedBookingModal inside BrowserRouter context */}
        <AdvancedBookingModal 
          isOpen={isBookingOpen} 
          onClose={closeBookingModal} 
          event={selectedEvent}
        />
        
        {/* Global Smart Notifications */}
        <SmartNotifications />
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocalStorageProvider>
        <AuthProvider>
          <LocationProvider>
            <UserDataProvider>
              <MockDataProvider>
                <NotificationProvider>
                  <SearchProvider>
                    <WishlistProvider>
                      <CartProvider>
                      <BookingProvider>
                      <Toaster />
                      <Sonner />
                      <AppContent />
                      </BookingProvider>
                    </CartProvider>
                  </WishlistProvider>
                </SearchProvider>
              </NotificationProvider>
            </MockDataProvider>
          </UserDataProvider>
        </LocationProvider>
      </AuthProvider>
      </LocalStorageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
