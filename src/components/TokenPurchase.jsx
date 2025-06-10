import { useState } from 'react';
import { usePrivyAuth } from '../contexts/PrivyContext';

export default function TokenPurchase({ 
  tokenAddress, 
  recipientAddress, 
  itemId, 
  itemName, 
  itemPrice,
  onPurchaseComplete 
}) {
  const { 
    isAuthenticated, 
    login, 
    purchaseWithToken,
    tokenBalance,
    tokenInfo
  } = usePrivyAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await purchaseWithToken(
        tokenAddress,
        recipientAddress,
        itemPrice,
        itemId
      );
      
      setTxHash(result.txHash);
      setPurchaseComplete(true);
      
      if (onPurchaseComplete) {
        onPurchaseComplete(result);
      }
    } catch (err) {
      console.error('Purchase failed:', err);
      setError(err.message || 'Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has sufficient balance
  const hasInsufficientBalance = tokenBalance && tokenInfo && 
    parseFloat(tokenBalance) < parseFloat(itemPrice);

  // If purchase is complete, show success message
  if (purchaseComplete) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-semibold mt-2">Purchase Complete!</h3>
          <p className="text-gray-600 mt-1">Your transaction was successful.</p>
          {txHash && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Transaction Hash:</p>
              <p className="text-xs text-gray-600 break-all mt-1">{txHash}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Purchase Item</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Item:</span>
          <span className="font-medium">{itemName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">{itemPrice} {tokenInfo?.symbol || 'tokens'}</span>
        </div>
        {tokenBalance && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Your Balance:</span>
            <span className={`font-medium ${hasInsufficientBalance ? 'text-red-500' : 'text-green-500'}`}>
              {parseFloat(tokenBalance).toLocaleString()} {tokenInfo?.symbol || 'tokens'}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <button 
        onClick={handlePurchase}
        disabled={isLoading || hasInsufficientBalance}
        className={`w-full py-2 px-4 rounded-md ${
          isLoading || hasInsufficientBalance
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-tsr-primary hover:bg-tsr-primary/90 text-white'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : !isAuthenticated ? (
          'Connect Wallet to Purchase'
        ) : hasInsufficientBalance ? (
          'Insufficient Balance'
        ) : (
          `Purchase for ${itemPrice} ${tokenInfo?.symbol || 'tokens'}`
        )}
      </button>
    </div>
  );
}
