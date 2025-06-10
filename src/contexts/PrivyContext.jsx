import { createContext, useContext, useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';

// Create a context for Privy authentication and Ethereum operations
const PrivyAuthContext = createContext(null);

// ABI for ERC20 token interface - minimal version for balance checking and transfers
const ERC20_ABI = [
  // Read-only functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  // Authenticated functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)'
];

export function PrivyAuthProvider({ children }) {
  const privy = usePrivy();
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  
  // Set up initial loading state
  useEffect(() => {
    if (privy.ready) {
      setIsLoading(false);
    }
  }, [privy.ready]);

  // Set up Ethereum provider and signer when wallet is connected
  useEffect(() => {
    const setupEthereumProvider = async () => {
      if (privy.authenticated && privy.user?.wallet) {
        try {
          // Get the wallet provider from Privy
          const ethereumProvider = await privy.getEthereumProvider();
          
          // Create ethers provider from Privy's provider
          const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
          setProvider(ethersProvider);
          
          // Get signer for transactions
          const ethersSigner = await ethersProvider.getSigner();
          setSigner(ethersSigner);
        } catch (error) {
          console.error('Failed to setup Ethereum provider:', error);
        }
      } else {
        // Reset provider and signer when not authenticated
        setProvider(null);
        setSigner(null);
        setTokenBalance(null);
      }
    };
    
    setupEthereumProvider();
  }, [privy.authenticated, privy.user]);

  // Function to get token balance
  const getTokenBalance = async (tokenAddress) => {
    if (!signer || !provider) return null;
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const address = await signer.getAddress();
      
      // Get token information
      const [balance, decimals, symbol, name] = await Promise.all([
        tokenContract.balanceOf(address),
        tokenContract.decimals(),
        tokenContract.symbol(),
        tokenContract.name()
      ]);
      
      // Format balance with proper decimals
      const formattedBalance = ethers.formatUnits(balance, decimals);
      
      // Store token info
      const info = { address: tokenAddress, decimals, symbol, name };
      setTokenInfo(info);
      setTokenBalance(formattedBalance);
      
      return { balance: formattedBalance, info };
    } catch (error) {
      console.error('Error getting token balance:', error);
      return null;
    }
  };

  // Function to purchase with tokens
  const purchaseWithToken = async (tokenAddress, recipientAddress, amount, itemId) => {
    if (!signer || !provider) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await tokenContract.decimals();
      
      // Convert amount to token units
      const amountInWei = ethers.parseUnits(amount.toString(), decimals);
      
      // Send transaction
      const tx = await tokenContract.transfer(recipientAddress, amountInWei);
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      // Refresh balance after purchase
      await getTokenBalance(tokenAddress);
      
      return {
        success: true,
        txHash: receipt.hash,
        itemId
      };
    } catch (error) {
      console.error('Error making purchase with token:', error);
      throw error;
    }
  };

  const value = {
    ...privy,
    isLoading,
    isAuthenticated: privy.authenticated,
    userId: privy.user?.id || null,
    provider,
    signer,
    tokenBalance,
    tokenInfo,
    getTokenBalance,
    purchaseWithToken
  };

  return (
    <PrivyAuthContext.Provider value={value}>
      {children}
    </PrivyAuthContext.Provider>
  );
}

// Custom hook to use the Privy auth context
export function usePrivyAuth() {
  const context = useContext(PrivyAuthContext);
  if (context === null) {
    throw new Error('usePrivyAuth must be used within a PrivyAuthProvider');
  }
  return context;
}
