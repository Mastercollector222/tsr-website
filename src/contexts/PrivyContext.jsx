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
      if (privy.authenticated && privy.user) {
        try {
          // Check if user has a wallet linked
          const hasWallet = privy.user.linkedAccounts?.some(account => 
            account.type === 'wallet' || account.type === 'email'
          );
          
          if (hasWallet) {
            // Get the wallet provider from Privy
            // Use the correct method to get Ethereum provider
            const ethereumProvider = await privy.getWalletClient();
            
            if (ethereumProvider) {
              // Create ethers provider from Privy's provider
              const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
              setProvider(ethersProvider);
              
              // Get signer for transactions
              const ethersSigner = await ethersProvider.getSigner();
              setSigner(ethersSigner);
            }
          } else {
            console.log('User authenticated but no wallet linked');
          }
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

  // Get token balance for a given token address
  const getTokenBalance = async (tokenAddress) => {
    if (!provider || !signer) {
      console.log('No provider or signer available, skipping balance fetch');
      return null;
    }

    try {
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
        return null;
      }
      
      // Get token balance
      const balance = await tokenContract.balanceOf(address);
      
      // Format balance with proper decimals
      const formattedBalance = ethers.formatUnits(balance, decimals);
      
      console.log(`Token balance for ${address}: ${formattedBalance} ${symbol}`);
      
      // Set token balance in state
      setTokenBalance(formattedBalance);
      setTokenInfo({ symbol, name, decimals });
      
      return { 
        balance: formattedBalance,
        info: { symbol, name, decimals }
      };
    } catch (error) {
      console.error('Error fetching token balance:', error);
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
