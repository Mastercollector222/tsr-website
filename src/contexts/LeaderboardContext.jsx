import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useFlowWallet } from './FlowContext';
import { useTokenBalances } from '../hooks/useTokenBalances';

const LeaderboardContext = createContext({});

export function LeaderboardProvider({ children }) {
  const [holders, setHolders] = useState([]);
  const { user } = useFlowWallet();
  const { tsr } = useTokenBalances(user?.addr);

  const updateUserBalance = useCallback((address, balance) => {
    setHolders(prevHolders => {
      const holderIndex = prevHolders.findIndex(h => h.address === address);
      
      if (holderIndex === -1) {
        // Add new holder
        return [...prevHolders, { address, balance }].sort((a, b) => b.balance - a.balance);
      }

      // Update existing holder
      const newHolders = [...prevHolders];
      newHolders[holderIndex].balance = balance;
      return newHolders.sort((a, b) => b.balance - a.balance);
    });
  }, []);

  // Update current user's balance whenever it changes
  useEffect(() => {
    if (user?.addr && tsr) {
      updateUserBalance(user.addr, tsr);
    }
  }, [user?.addr, tsr, updateUserBalance]);

  // Initialize holders list
  const initializeHolders = useCallback((initialHolders) => {
    setHolders(initialHolders.sort((a, b) => b.balance - a.balance));
  }, []);

  const getUserRank = useCallback((address) => {
    return holders.findIndex(h => h.address === address) + 1;
  }, [holders]);

  return (
    <LeaderboardContext.Provider 
      value={{ 
        holders,
        updateUserBalance,
        initializeHolders,
        getUserRank
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  return useContext(LeaderboardContext);
}
