import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, currentUser } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGithub: () => Promise<void>;
  updateProfile: (updates: { username?: string; bio?: string; avatar?: string }) => Promise<void>;
  isLoading: boolean;
  needsOnboarding: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Mock checking for existing session
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Check if user needs onboarding (no username set)
      setNeedsOnboarding(!userData.username || userData.username === userData.email?.split('@')[0]);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication - in real app this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === currentUser.email) {
      setUser(currentUser);
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
      // Check if returning user needs onboarding
      setNeedsOnboarding(!currentUser.username || currentUser.username === currentUser.email?.split('@')[0]);
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      username: email.split('@')[0],
      email,
      bio: '',
      totalPrompts: 0,
      totalStars: 0,
      badges: ['New Member'],
      joinDate: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    setNeedsOnboarding(true); // New users always need onboarding
    setIsLoading(false);
  };

  const updateProfile = async (updates: { username?: string; bio?: string; avatar?: string }) => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    
    // Mock profile update
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = {
      ...user,
      ...updates,
    };
    
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    setNeedsOnboarding(false); // Onboarding complete
    setIsLoading(false);
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    
    // Mock GitHub authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const githubUser: User = {
      id: Date.now().toString(),
      name: 'GitHub User',
      username: 'githubuser',
      email: 'github@example.com',
      bio: '',
      totalPrompts: 0,
      totalStars: 0,
      badges: ['New Member'],
      joinDate: new Date().toISOString()
    };
    
    setUser(githubUser);
    localStorage.setItem('mockUser', JSON.stringify(githubUser));
    setNeedsOnboarding(true);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setNeedsOnboarding(false);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      signup,
      loginWithGithub,
      updateProfile,
      isLoading,
      needsOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};