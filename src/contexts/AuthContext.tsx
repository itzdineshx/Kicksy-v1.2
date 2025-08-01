import { createContext, useContext, ReactNode } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';

export type UserRole = 'admin' | 'organizer' | 'user' | 'guest';

interface AuthContextType {
  user: any;
  role: UserRole;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useClerkAuth();
  const { user } = useUser();
  
  // Determine role based on user metadata or email
  const getRole = (): UserRole => {
    if (!user) return 'guest';
    
    // Check user metadata first
    if (user.publicMetadata?.role) {
      return user.publicMetadata.role as UserRole;
    }
    
    // Fallback to email-based role detection for demo
    const email = user.primaryEmailAddress?.emailAddress;
    if (email?.includes('admin')) return 'admin';
    if (email?.includes('organizer')) return 'organizer';
    return 'user';
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: getRole(),
      isAuthenticated: !!isSignedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};