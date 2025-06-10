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
  const [localTokenBalance, setLocalTokenBalance] = useState(null);
  const [localTokenInfo, setLocalTokenInfo] = useState(null);

  // Load token balance when component mounts or when authentication state changes
  useEffect(() => {
    const loadTokenBalance = async () => {
      if (isAuthenticated && tokenAddress) {
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
          
          const result = await getTokenBalance(tokenAddress);
          if (result) {
            setLocalTokenBalance(result.balance);
            setLocalTokenInfo(result.info);
          }
        } catch (err) {
          console.error('Failed to load token balance:', err);
          setError('Failed to load token balance. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTokenBalance();
  }, [isAuthenticated, signer, tokenAddress, getTokenBalance]);

  // Display loading state
  if (isLoading) {
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
      
      {localTokenBalance && localTokenInfo ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Token:</span>
            <span className="font-medium">{localTokenInfo.name} ({localTokenInfo.symbol})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance:</span>
            <span className="font-medium">{parseFloat(localTokenBalance).toLocaleString()} {localTokenInfo.symbol}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No token balance available</p>
      )}
    </div>
  );
}
