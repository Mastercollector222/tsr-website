import { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
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

  // Track if balance fetch is in progress
  const fetchingBalanceRef = useRef(false);
  // Track token addresses we've already fetched
  const fetchedTokensRef = useRef(new Set());
  
  // Set up Ethereum provider and signer when wallet is connected
  useEffect(() => {
    const setupEthereumProvider = async () => {
      if (!privy.authenticated || !privy.ready) {
        // Reset provider and signer when not authenticated
        setProvider(null);
        setSigner(null);
        setTokenBalance(null);
        // Clear fetched tokens set when disconnected
        fetchedTokensRef.current.clear();
        return;
      }
      
      try {
        // Use the standard Ethereum provider
        if (window.ethereum) {
          console.log('Using window.ethereum provider');
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(ethersProvider);
          
          // Get signer for transactions
          const ethersSigner = await ethersProvider.getSigner();
          setSigner(ethersSigner);
          
          // Clear fetched tokens set on reconnect
          fetchedTokensRef.current.clear();
        } else {
          console.log('No ethereum provider available');
        }
      } catch (error) {
        console.error('Failed to setup Ethereum provider:', error);
      }
    };
    
    if (privy.ready) {
      setupEthereumProvider();
    }
  }, [privy.authenticated, privy.ready]);

  // Get token balance for a given token address - memoized to prevent infinite loops
  const getTokenBalance = useCallback(async (tokenAddress) => {
    // Skip if no provider or signer
    if (!provider || !signer) {
      console.log('No provider or signer available, skipping balance fetch');
      return null;
    }
    
    // Skip if already fetching
    if (fetchingBalanceRef.current) {
      console.log('Balance fetch already in progress, skipping');
      return { balance: tokenBalance, info: tokenInfo };
    }
    
    // Skip if we've already fetched this token and have a balance
    if (fetchedTokensRef.current.has(tokenAddress) && tokenBalance && tokenInfo) {
      console.log('Already fetched balance for this token, using cached value');
      return { balance: tokenBalance, info: tokenInfo };
    }

    try {
      // Set fetching flag to prevent concurrent calls
      fetchingBalanceRef.current = true;
      
      // Verify we can get the address
      const address = await signer.getAddress();
      console.log('Getting balance for address:', address);
      
      // Create token contract instance
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      
      // Get token info first to handle potential contract errors
      let decimals, symbol, name;
      try {
        decimals = await tokenContract.decimals();
        symbol = await tokenContract.symbol();
        name = await tokenContract.name();
      } catch (infoError) {
        console.error('Error fetching token info:', infoError);
        fetchingBalanceRef.current = false;
        return null;
      }
      
      // Get token balance
      const balance = await tokenContract.balanceOf(address);
      
      // Format balance with proper decimals
      const formattedBalance = ethers.formatUnits(balance, decimals);
      
      console.log(`Token balance for ${address}: ${formattedBalance} ${symbol}`);
      
      // Update state
      setTokenBalance(formattedBalance);
      setTokenInfo({ symbol, name, decimals });
      
      // Mark this token as fetched
      fetchedTokensRef.current.add(tokenAddress);
      
      // Reset fetching flag
      fetchingBalanceRef.current = false;
      
      return { 
        balance: formattedBalance,
        info: { symbol, name, decimals }
      };
    } catch (error) {
      console.error('Error fetching token balance:', error);
      fetchingBalanceRef.current = false;
      return null;
    }
  }, [provider, signer, tokenBalance, tokenInfo]);

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

  // Login function - uses Privy's login with wallet connection
  const login = async () => {
    try {
      // First authenticate with Privy
      await privy.login();
      
      // After login, check if wallet is connected
      if (privy.authenticated && !privy.user?.wallet) {
        console.log('User authenticated, now connecting wallet...');
        try {
          // Request wallet connection after login
          await privy.connectWallet();
        } catch (walletError) {
          console.error('Failed to connect wallet:', walletError);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
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
  }), [privy, isLoading, provider, signer, tokenBalance, tokenInfo, getTokenBalance, purchaseWithToken]);

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
