import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivyAuth } from '../contexts/PrivyContext';

export default function PrivySignIn() {
  const { login, isAuthenticated, isLoading } = usePrivyAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tsr-primary">Sign In</h1>
          <p className="text-gray-600 mt-2">Welcome back to TSR</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <button
            onClick={handleLogin}
            className="w-full bg-tsr-primary hover:bg-tsr-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In with Privy
          </button>
          <p className="text-center text-gray-600 mt-4">
            New to TSR? <a href="/sign-up" className="text-tsr-primary hover:underline">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
