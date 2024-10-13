import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from './axios'; // Custom axios instance for requests

// Define the shape of the AuthContext value
interface AuthContextType {
  accessToken: string | null; // Public access to the accessToken
  setAccessToken: (token: string | null) => void; // Public setter function for accessToken
  loading: boolean; // Loading state
}

// Create the context with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On component mount, try to refresh token
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post('/api/auth/refresh'); // Refresh endpoint
        setAccessToken(response.data.accessToken); // Set the new access token
      } catch (error) {
        console.log('Error refreshing token:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    refreshAccessToken();
  }, []);

  // Provide the context value including accessToken, its setter, and loading
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
