import "../config/flow";  // Import config first
import { createContext, useContext, useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";

const FlowContext = createContext(null);

export function FlowProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('FlowProvider: Initializing...');
    let unsub;
    try {
      unsub = fcl.currentUser.subscribe((currentUser) => {
        console.log('FlowProvider: User update received:', currentUser);
        setUser(currentUser);
        setLoading(false);
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
    try {
      await fcl.unauthenticate();
    } catch (err) {
      console.error('FlowProvider: Failed to disconnect wallet:', err);
      setError(err);
    }
  };

  // If there's an error, render it
  if (error) {
    return (
      <div className="text-center p-4">
        <h2 className="text-red-600 text-xl">Error initializing Flow wallet</h2>
        <pre className="mt-2 text-sm text-red-500">{error.message}</pre>
      </div>
    );
  }

  const value = {
    user,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    isConnected: Boolean(user?.loggedIn && user?.addr)
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlowWallet() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlowWallet must be used within a FlowProvider');
  }
  return context;
}
