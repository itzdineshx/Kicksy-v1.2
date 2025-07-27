import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'organizer' | 'user' | 'guest';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration - replace with real authentication
const mockUsers: Record<string, User> = {
  'admin@sportshub.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@sportshub.com',
    role: 'admin'
  },
  'organizer@sportshub.com': {
    id: '2', 
    name: 'Event Organizer',
    email: 'organizer@sportshub.com',
    role: 'organizer'
  },
  'user@sportshub.com': {
    id: '3',
    name: 'Regular User',
    email: 'user@sportshub.com', 
    role: 'user'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('guest');

  useEffect(() => {
    // Check if user is already logged in (localStorage for demo)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setRole(userData.role);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with real auth
    const foundUser = mockUsers[email];
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setRole(foundUser.role);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setRole('guest');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      login,
      logout,
      isAuthenticated: !!user
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