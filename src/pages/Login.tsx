import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Syringe, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

// Function to ensure doctor users exist in localStorage
const ensureDoctorUsers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // Check if we already have doctor users
  const doctorUsers = users.filter((u: { role: string }) => u.role === 'doctor');
  
  if (doctorUsers.length === 0) {
    // Add doctor users if none exist
    const defaultDoctorUsers = [
      {
        id: '1',
        email: 'arun.patel@example.com',
        firstName: 'Arun',
        lastName: 'Patel',
        role: 'doctor',
        phoneNumber: '9876543210',
        specialization: 'Pediatrician',
        licenseNumber: 'MED12345',
        hospitalName: 'City Hospital',
        yearsOfExperience: 10,
        password: 'password'
      },
      {
        id: '2',
        email: 'priya.sharma@example.com',
        firstName: 'Priya',
        lastName: 'Sharma',
        role: 'doctor',
        phoneNumber: '9876543211',
        specialization: 'Vaccination Specialist',
        licenseNumber: 'MED12346',
        hospitalName: 'City Hospital',
        yearsOfExperience: 8,
        password: 'password'
      },
      {
        id: '3',
        email: 'rajesh.kumar@example.com',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        role: 'doctor',
        phoneNumber: '9876543212',
        specialization: 'Child Specialist',
        licenseNumber: 'MED12347',
        hospitalName: 'City Hospital',
        yearsOfExperience: 12,
        password: 'password'
      },
      {
        id: '4',
        email: 'deepa.gupta@example.com',
        firstName: 'Deepa',
        lastName: 'Gupta',
        role: 'doctor',
        phoneNumber: '9876543213',
        specialization: 'Pediatrician',
        licenseNumber: 'MED12348',
        hospitalName: 'City Hospital',
        yearsOfExperience: 7,
        password: 'password'
      },
      {
        id: '5',
        email: 'suresh.verma@example.com',
        firstName: 'Suresh',
        lastName: 'Verma',
        role: 'doctor',
        phoneNumber: '9876543214',
        specialization: 'Immunologist',
        licenseNumber: 'MED12349',
        hospitalName: 'City Hospital',
        yearsOfExperience: 15,
        password: 'password'
      },
      {
        id: '6',
        email: 'anita.singh@example.com',
        firstName: 'Anita',
        lastName: 'Singh',
        role: 'doctor',
        phoneNumber: '9876543215',
        specialization: 'Pediatrician',
        licenseNumber: 'MED12350',
        hospitalName: 'City Hospital',
        yearsOfExperience: 9,
        password: 'password'
      },
      {
        id: '7',
        email: 'vikram.malhotra@example.com',
        firstName: 'Vikram',
        lastName: 'Malhotra',
        role: 'doctor',
        phoneNumber: '9876543216',
        specialization: 'Child Specialist',
        licenseNumber: 'MED12351',
        hospitalName: 'City Hospital',
        yearsOfExperience: 11,
        password: 'password'
      }
    ];
    
    // Add doctor users to existing users
    const updatedUsers = [...users, ...defaultDoctorUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Added doctor users to localStorage');
  }
};

// Function to ensure parent users exist in localStorage
const ensureParentUsers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // Check if we already have parent users
  const parentUsers = users.filter((u: { role: string }) => u.role === 'parent');
  
  if (parentUsers.length === 0) {
    // Add parent users if none exist
    const defaultParentUsers = [
      {
        id: 'parent1',
        email: 'parent@example.com',
        firstName: 'Parent',
        lastName: 'User',
        role: 'parent',
        phoneNumber: '9876543200',
        password: 'password'
      }
    ];
    
    // Add parent users to existing users
    const updatedUsers = [...users, ...defaultParentUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Added parent users to localStorage');
  }
};

// Function to get localStorage version
const getLocalStorageVersion = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const children = JSON.parse(localStorage.getItem('children') || '[]');
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const vaccines = JSON.parse(localStorage.getItem('vaccines') || '[]');
  const vaccinationRecords = JSON.parse(localStorage.getItem('vaccination_records') || '[]');
  
  return {
    users: users.length,
    children: children.length,
    appointments: appointments.length,
    vaccines: vaccines.length,
    vaccinationRecords: vaccinationRecords.length
  };
};

const Login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storageVersion, setStorageVersion] = useState(getLocalStorageVersion());
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize users when component mounts
  useEffect(() => {
    // Don't clear localStorage on every page load
    // Only ensure default users exist
    ensureDoctorUsers();
    ensureParentUsers();
    setStorageVersion(getLocalStorageVersion());
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Try to login with 'any' role to match either parent or doctor
      await login(email, password, "any");
    } catch (error) {
      // Login failed, show error
      console.error("Login error details:", error);
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
      });
    }
  };

  const handleClearLocalStorage = () => {
    if (confirm("Are you sure you want to clear localStorage? This will remove all data.")) {
      localStorage.clear();
      // Reinitialize with correct data
      ensureDoctorUsers();
      ensureParentUsers();
      setStorageVersion(getLocalStorageVersion());
      toast({
        title: "localStorage cleared",
        description: "Default users have been re-added with correct passwords.",
      });
    }
  };

  const handleAutoFill = () => {
    // Ask user which credentials to use
    const userType = window.confirm(
      "Click OK to use parent credentials, or Cancel to use doctor credentials."
    );
    
    if (userType) {
      // Parent credentials
      setEmail("parent@example.com");
      setPassword("password");
      toast({
        title: "Parent credentials auto-filled",
        description: "You can now click Sign In to log in as a parent.",
      });
    } else {
      // Doctor credentials
      setEmail("arun.patel@example.com");
      setPassword("password");
      toast({
        title: "Doctor credentials auto-filled",
        description: "You can now click Sign In to log in as a doctor.",
      });
    }
  };

  // Direct login function that bypasses the auth context
  const directLogin = (userType: 'parent' | 'doctor') => {
    // Clear any existing user data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find the default user based on type
    let user;
    if (userType === 'parent') {
      user = users.find((u: { email: string }) => u.email === 'parent@example.com');
    } else {
      user = users.find((u: { email: string }) => u.email === 'arun.patel@example.com');
    }
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: `Default ${userType} user not found. Try resetting the data.`,
      });
      return;
    }
    
    // Create a copy without password
    const userWithoutPassword = { ...user };
    if ('password' in userWithoutPassword) {
      const userWithPassword = userWithoutPassword as { password: string };
      delete userWithPassword.password;
    }
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', 'mock-token-' + Date.now());
    localStorage.setItem('role', userType);
    
    // Redirect
    if (userType === 'parent') {
      window.location.href = '/parent-dashboard';
    } else {
      window.location.href = '/doctor-dashboard';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-vaccine-light w-16 h-16 rounded-full flex items-center justify-center">
              <Syringe className="h-8 w-8 text-vaccine-blue" />
            </div>
          </div>
          
          <Card className="border-t-4 border-t-vaccine-blue animate-in fade-in-50 duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-vaccine-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full mb-4" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mb-4"
                  onClick={handleAutoFill}
                >
                  Auto-fill Credentials
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mb-4 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleClearLocalStorage}
                >
                  Reset All Data
                </Button>
                
                <div className="flex gap-2 mb-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-green-200 text-green-600 hover:bg-green-50"
                    onClick={() => directLogin('parent')}
                  >
                    Login as Parent
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => directLogin('doctor')}
                  >
                    Login as Doctor
                  </Button>
                </div>
                
                <p className="text-sm text-center text-gray-500 mb-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-vaccine-blue hover:underline">
                    Sign up as Parent
                  </Link>
                </p>
                
                <p className="text-xs text-center text-gray-400">
                  For testing: parent@example.com / password (Parent)<br />
                  For doctors: arun.patel@example.com / password (Doctor)
                </p>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">localStorage Version</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleClearLocalStorage}
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear</span>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Users: {storageVersion.users}</div>
              <div>Children: {storageVersion.children}</div>
              <div>Appointments: {storageVersion.appointments}</div>
              <div>Vaccines: {storageVersion.vaccines}</div>
              <div>Vaccination Records: {storageVersion.vaccinationRecords}</div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
