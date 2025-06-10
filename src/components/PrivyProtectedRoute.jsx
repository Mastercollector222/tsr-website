import { Navigate } from 'react-router-dom';
import { usePrivyAuth } from '../contexts/PrivyContext';

export default function PrivyProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = usePrivyAuth();
  
  // Check if Privy is properly initialized
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;
  const isPrivyConfigured = !!privyAppId;
  
  // If Privy is not configured, just render the children without protection
  if (!isPrivyConfigured) {
    console.warn("⚠️ Privy is not properly configured. Protected routes are accessible without authentication.");
    return children;
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
}
