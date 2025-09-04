"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing session
    const checkSession = () => {
      const storedSession = localStorage.getItem('demo-session');
      if (storedSession) {
        try {
          const session = JSON.parse(storedSession);
          const sessionAge = Date.now() - session.timestamp;
          
          // Check if session is still valid (1 hour)
          if (sessionAge < 3600000) {
            setUser(session.user);
          } else {
            localStorage.removeItem('demo-session');
            if (pathname?.startsWith('/demo') && pathname !== '/demo/login') {
              router.push('/demo/login');
            }
          }
        } catch (error) {
          console.error('Invalid session data');
          localStorage.removeItem('demo-session');
        }
      } else if (pathname?.startsWith('/demo') && pathname !== '/demo/login') {
        router.push('/demo/login');
      }
      setIsLoading(false);
    };

    checkSession();
  }, [pathname, router]);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Import credentials from JSON
      const credentialsData = await import('@/usableclientdata/auth/demo-credentials.json');
      const validCredential = credentialsData.credentials.find(
        cred => cred.username === username && cred.password === password && cred.active
      );

      if (validCredential) {
        const userData = {
          username: validCredential.username,
          name: validCredential.name,
          role: validCredential.role
        };

        // Store session
        const session = {
          user: userData,
          timestamp: Date.now()
        };
        localStorage.setItem('demo-session', JSON.stringify(session));
        setUser(userData);

        return { success: true };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = () => {
    localStorage.removeItem('demo-session');
    setUser(null);
    router.push('/demo/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
