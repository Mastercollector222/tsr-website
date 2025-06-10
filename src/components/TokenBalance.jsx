import { useState, useEffect } from 'react';
import { usePrivyAuth } from '../contexts/PrivyContext';

export default function TokenBalance({ tokenAddress, recipientAddress }) {
  const { 
    isAuthenticated, 
    login, 
    provider, 
    signer, 
    getTokenBalance, 
    tokenBalance,
    tokenInfo
  } = usePrivyAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load token balance only once when component mounts or when critical dependencies change
  useEffect(() => {
    // Only attempt to load balance if we're authenticated and have a token address
    const loadTokenBalance = async () => {
      if (!isAuthenticated || !tokenAddress || !signer) {
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Call getTokenBalance once - it's now designed to prevent duplicate fetches
        await getTokenBalance(tokenAddress);
      } catch (err) {
        console.error('Failed to load token balance:', err);
        setError('Failed to load token balance. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTokenBalance();
    
    // Important: Only include dependencies that should trigger a balance refresh
    // Specifically excluding tokenBalance and tokenInfo to prevent loops
  }, [isAuthenticated, signer, tokenAddress, getTokenBalance]);


  // Display loading state only if we're loading AND don't have a balance yet
  if (isLoading && !tokenBalance) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tsr-primary"></div>
        </div>
        <p className="text-center mt-2 text-gray-600">Loading token balance...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => getTokenBalance(tokenAddress)}
          className="mt-2 bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  // If not authenticated, prompt to connect
  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-gray-700">Connect your wallet to view your token balance</p>
        <button 
          onClick={login}
          className="bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  // Display token balance
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Token Balance</h2>
      
      {tokenBalance && tokenInfo ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Token:</span>
            <span className="font-medium">{tokenInfo.name} ({tokenInfo.symbol})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance:</span>
            <span className="font-medium">{parseFloat(tokenBalance).toLocaleString()} {tokenInfo.symbol}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No token balance available</p>
      )}
    </div>
  );
}
