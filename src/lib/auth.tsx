import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/services/api";

// Types for our authentication context
type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type Role = "parent" | "doctor" | null;

type AuthContextType = {
  user: User | null;
  role: Role;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

type RegistrationData = {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  specialization?: string;
  licenseNumber?: string;
  hospitalName?: string;
  yearsOfExperience?: number;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role") as Role;
    
    if (token && storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
    
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      console.log("All users:", users);
      
      // Find user with matching email and role
      const user = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && 
        (role === 'any' || u.role === role)
      );
      
      console.log("Found user:", user);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, you would hash and compare passwords
      // For this demo, we're just doing a simple comparison
      console.log("User password:", user.password, "Input password:", password);
      
      // Check password
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      
      // Store user in localStorage (excluding password)
      const userWithoutPassword = { ...user };
      if ('password' in userWithoutPassword) {
        delete userWithoutPassword.password;
      }
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('role', user.role);
      
      // Update state
      setUser(userWithoutPassword);
      setRole(user.role);
      setLoading(false);
      
      // Redirect based on role
      if (user.role === 'parent') {
        navigate("/parent-dashboard");
      } else if (user.role === 'doctor') {
        navigate("/doctor-dashboard");
      }
      
      return userWithoutPassword;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      throw error;
    }
  };
  
  // Register function
  const register = async (data: RegistrationData) => {
    setLoading(true);
    
    try {
      const response = await auth.register(data);
      const result = response.data;

      // Include the password in userData for localStorage
      const userData = {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: data.role,
        password: data.password // Save the password in localStorage
      };

      // Create a version without password for state
      const { password, ...userWithoutPassword } = userData;
      
      setUser(userWithoutPassword);
      setRole(data.role);
      
      // Store in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("role", data.role);
      
      // Also update the users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData); // Add the new user with password
      localStorage.setItem('users', JSON.stringify(users));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });
      
      // Redirect based on role
      if (data.role === "parent") {
        navigate("/parent-dashboard");
      } else if (data.role === "doctor") {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, role, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
