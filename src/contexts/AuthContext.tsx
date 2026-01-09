import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  location?: string;
  isApproved?: boolean;
  isBlocked?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  location?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: (User & { password: string })[] = [
  {
    id: 'USR0001',
    email: 'customer@demo.com',
    password: 'demo123',
    name: 'Demo Customer',
    role: 'customer',
    phone: '+91 9876543210',
    location: 'Mumbai',
  },
  {
    id: 'PRV0001',
    email: 'provider@demo.com',
    password: 'demo123',
    name: 'Demo Provider',
    role: 'provider',
    phone: '+91 9876543211',
    location: 'Delhi',
    isApproved: true,
  },
  {
    id: 'ADM0001',
    email: 'admin@localx.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('localx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('localx_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email exists
    if (mockUsers.find(u => u.email === data.email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user
    const newUser: User = {
      id: `USR${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      location: data.location,
      isApproved: data.role === 'customer', // Customers auto-approved, providers need admin approval
    };
    
    mockUsers.push({ ...newUser, password: data.password });
    
    if (data.role === 'customer') {
      setUser(newUser);
      localStorage.setItem('localx_user', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('localx_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
