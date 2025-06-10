import "../config/flow";  // Import config first
import { createContext, useContext, useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";

const FlowContext = createContext(null);

export function FlowProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flowBalance, setFlowBalance] = useState(null);

  useEffect(() => {
    console.log('FlowProvider: Initializing...');
    let unsub;
    try {
      unsub = fcl.currentUser.subscribe((currentUser) => {
        console.log('FlowProvider: User update received:', currentUser);
        setUser(currentUser);
        setLoading(false);
        
        // If user is connected, get their FLOW balance
        if (currentUser.loggedIn && currentUser.addr) {
          getFlowBalance(currentUser.addr);
        } else {
          setFlowBalance(null);
        }
      });
    } catch (err) {
      console.error('FlowProvider: Error in FCL subscription:', err);
      setError(err);
      setLoading(false);
    }

    return () => {
      if (unsub) {
        console.log('FlowProvider: Cleaning up subscription');
        unsub();
      }
    };
  }, []);
  
  // Function to get FLOW token balance
  const getFlowBalance = async (address) => {
    if (!address) return;
    
    try {
      const balance = await fcl.query({
        cadence: `
          import FungibleToken from 0xf233dcee88fe0abe
          import FlowToken from 0x1654653399040a61

          pub fun main(address: Address): UFix64 {
            let vaultRef = getAccount(address)
              .getCapability(/public/flowTokenBalance)
              .borrow<&FlowToken.Vault{FungibleToken.Balance}>() 
              ?? panic("Could not borrow Balance reference to the Vault")

            return vaultRef.balance
          }
        `,
        args: (arg, t) => [arg(address, t.Address)]
      });
      
      console.log(`Flow balance for ${address}: ${balance}`);
      setFlowBalance(balance);
      return balance;
    } catch (err) {
      console.error('Error getting FLOW balance:', err);
      return null;
    }
  };

  const connectWallet = async () => {
    console.log('FlowProvider: Connecting wallet...');
    setLoading(true);
    try {
      await fcl.authenticate();
    } catch (err) {
      console.error('FlowProvider: Failed to connect wallet:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    console.log('FlowProvider: Disconnecting wallet...');
    setLoading(true);
    try {
      await fcl.unauthenticate();
    } catch (err) {
      console.error('FlowProvider: Failed to disconnect wallet:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const isConnected = user?.loggedIn === true;

  // If there's an error, render it
  if (error) {
    return (
      <div className="text-center p-4">
        <h2 className="text-red-600 text-xl">Error initializing Flow wallet</h2>
        <pre className="mt-2 text-sm text-red-500">{error.message}</pre>
      </div>
    );
  }

  return (
    <FlowContext.Provider 
      value={{
        user,
        loading,
        error,
        connectWallet,
        disconnectWallet,
        isConnected,
        flowBalance,
        getFlowBalance
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlowWallet() {
  return useContext(FlowContext);
}
