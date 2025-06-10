import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivyAuth } from '../contexts/PrivyContext';

export default function PrivySignUp() {
  const { login, isAuthenticated, isLoading } = usePrivyAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSignUp = () => {
    // Privy handles both sign-in and sign-up through the same login modal
    login();
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tsr-primary">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join the TSR community</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <button
            onClick={handleSignUp}
            className="w-full bg-tsr-primary hover:bg-tsr-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up with Privy
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a href="/sign-in" className="text-tsr-primary hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
