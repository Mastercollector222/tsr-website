import { useState, useEffect, useRef } from 'react';
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
  const hasLoadedRef = useRef(false);

  // Load token balance when component mounts or when authentication state changes
  useEffect(() => {
    // Only load balance if we haven't already or if critical dependencies change
    const shouldLoadBalance = 
      !hasLoadedRef.current || 
      (isAuthenticated && signer && tokenAddress);
    
    const loadTokenBalance = async () => {
      if (isAuthenticated && tokenAddress && shouldLoadBalance) {
        setIsLoading(true);
        setError(null);
        
        // Check if signer is available
        if (!signer) {
          console.log('No wallet address available, skipping balance fetch');
          setError('Please connect your wallet to view your token balance');
          setIsLoading(false);
          return;
        }
        
        try {
          // Get the wallet address to verify we have it
          const address = await signer.getAddress();
          console.log('Fetching balance for address:', address);
          
          // Use the getTokenBalance function from PrivyContext
          await getTokenBalance(tokenAddress);
          
          // Mark as loaded to prevent infinite loops
          hasLoadedRef.current = true;
          
        } catch (err) {
          console.error('Failed to load token balance:', err);
          setError('Failed to load token balance. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else if (tokenBalance) {
        // If we already have a balance, don't show loading
        setIsLoading(false);
      }
    };

    loadTokenBalance();
    
    // Clean up function
    return () => {
      // Reset the ref when component unmounts
      hasLoadedRef.current = false;
    };
  }, [isAuthenticated, signer, tokenAddress]);

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
