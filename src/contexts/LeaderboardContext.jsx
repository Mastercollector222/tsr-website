import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useFlowWallet } from './FlowContext';
import { useTokenBalances } from '../hooks/useTokenBalances';

const LeaderboardContext = createContext({});

export function LeaderboardProvider({ children }) {
  const [holders, setHolders] = useState([]);
  const { user } = useFlowWallet();
  const { tsr: tsrBalance, loading: balanceLoading } = useTokenBalances(user?.addr);

  const updateUserBalance = useCallback((address, balance) => {
    if (!address || balance === undefined) return;
    
    setHolders(prevHolders => {
      const holderIndex = prevHolders.findIndex(h => h.address === address);
      const numBalance = Number(balance);
      
      if (holderIndex === -1) {
        // Add new holder
        return [...prevHolders, { address, balance: numBalance }].sort((a, b) => b.balance - a.balance);
      }

      // Update existing holder
      const newHolders = [...prevHolders];
      newHolders[holderIndex].balance = numBalance;
      return newHolders.sort((a, b) => b.balance - a.balance);
    });
  }, []);

  // Update current user's balance whenever it changes
  useEffect(() => {
    if (user?.addr && tsrBalance && !balanceLoading) {
      console.log('Updating user balance:', user.addr, tsrBalance);
      updateUserBalance(user.addr, tsrBalance);
    }
  }, [user?.addr, tsrBalance, balanceLoading, updateUserBalance]);

  // Initialize holders list
  const initializeHolders = useCallback(async (initialHolders) => {
    return new Promise((resolve) => {
      const sortedHolders = initialHolders.sort((a, b) => b.balance - a.balance);
      setHolders(sortedHolders);
      
      // If we have a user and their balance, make sure it's updated
      if (user?.addr && tsrBalance && !balanceLoading) {
        updateUserBalance(user.addr, tsrBalance);
      }
      
      resolve();
    });
  }, [user?.addr, tsrBalance, balanceLoading, updateUserBalance]);

  const getUserRank = useCallback((address) => {
    if (!address || !holders.length) return null;
    const holderIndex = holders.findIndex(h => h.address === address);
    
    if (holderIndex === -1) {
      // If user not found in holders list but we have their balance
      if (user?.addr === address && tsrBalance) {
        return {
          rank: 'N/A',
          balance: tsrBalance,
          address: address
        };
      }
      return null;
    }
    
    return {
      rank: holderIndex + 1,
      balance: holders[holderIndex].balance,
      address: address
    };
  }, [holders, user?.addr, tsrBalance]);

  return (
    <LeaderboardContext.Provider 
      value={{ 
        holders,
        updateUserBalance,
        initializeHolders,
        getUserRank,
        loading: balanceLoading
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  return useContext(LeaderboardContext);
}
