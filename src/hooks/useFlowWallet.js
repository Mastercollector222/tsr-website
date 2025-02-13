import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import "../config/flow";

export function useFlowWallet() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Setting up FCL user subscription');
    const unsub = fcl.currentUser.subscribe((currentUser) => {
      console.log('FCL User Update:', currentUser);
      setUser(currentUser);
    });

    return () => {
      unsub();
    };
  }, []);

  const connectWallet = async () => {
    console.log('Connecting wallet...');
    setLoading(true);
    try {
      await fcl.authenticate();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    console.log('Disconnecting wallet...');
    try {
      await fcl.unauthenticate();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return {
    user,
    loading,
    connectWallet,
    disconnectWallet,
    isConnected: Boolean(user?.loggedIn && user?.addr)
  };
}
