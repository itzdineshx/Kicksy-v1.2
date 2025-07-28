import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { firebaseAuthService } from '@/services/FirebaseAuthService';
import { User as FirebaseUser } from 'firebase/auth';

export type UserRole = 'admin' | 'organizer' | 'user' | 'guest';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  firebaseUser: FirebaseUser | null;
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  firebaseSignOut: () => Promise<void>;
  isAuthenticated: boolean;
  isFirebaseAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');

  useEffect(() => {
    // Set up Supabase auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        // For now, default to 'user' role for authenticated users
        setRole(session?.user || firebaseUser ? 'user' : 'guest');
      }
    );

    // Set up Firebase auth state listener
    const unsubscribeFirebase = firebaseAuthService.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setRole(user || session?.user ? 'user' : 'guest');
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setRole(session?.user || firebaseUser ? 'user' : 'guest');
    });

    return () => {
      subscription.unsubscribe();
      unsubscribeFirebase();
    };
  }, [firebaseUser]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole('guest');
  };

  const firebaseSignOut = async () => {
    await firebaseAuthService.signOut();
    setFirebaseUser(null);
    setRole(user ? 'user' : 'guest');
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      firebaseUser,
      role,
      login,
      signUp,
      logout,
      firebaseSignOut,
      isAuthenticated: !!user,
      isFirebaseAuthenticated: !!firebaseUser
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