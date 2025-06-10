import { useFlowWallet } from '../contexts/FlowContext';
import { usePrivyAuth } from '../contexts/PrivyContext';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Account() {
  // Flow wallet connection
  const { user: flowUser, isConnected: isFlowConnected, flowBalance, connectWallet: connectFlowWallet } = useFlowWallet();
  
  // Privy/EVM wallet connection
  const { isAuthenticated: isPrivyConnected, user: privyUser, signer, provider, login: connectPrivyWallet, tokenBalance } = usePrivyAuth();
  
  // State for EVM address
  const [evmAddress, setEvmAddress] = useState(null);
  
  // Get EVM address when signer is available
  useEffect(() => {
    const getAddress = async () => {
      if (signer) {
        try {
          const address = await signer.getAddress();
          setEvmAddress(address);
        } catch (error) {
          console.error('Error getting EVM address:', error);
        }
      }
    };
    
    getAddress();
  }, [signer]);
  
  // Legacy token balances from hooks
  const { flow: flowTokens, tsr: tsrTokens, loading: balancesLoading, error } = useTokenBalances(flowUser?.addr);

  // Loading state
  if (balancesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }
  
  // No wallets connected
  if (!isFlowConnected && !isPrivyConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please connect your wallets</h2>
          <p className="text-gray-600 mb-8">
            You need to connect at least one wallet to view your account details.
          </p>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={connectFlowWallet}
              className="bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90 transition-colors"
            >
              Connect Flow Wallet
            </button>
            <button 
              onClick={connectPrivyWallet}
              className="bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90 transition-colors"
            >
              Connect EVM Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Flow Wallet Info */}
        {isFlowConnected && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Flow Wallet</h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Connected</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-mono text-sm break-all">{flowUser.addr}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Connected Provider</p>
                <p>{flowUser.provider || 'Flow FCL'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">FLOW Balance</p>
                <p className="font-semibold">{flowBalance ? parseFloat(flowBalance).toFixed(4) : '0'} FLOW</p>
              </div>
            </div>
          </div>
        )}
        
        {/* EVM Wallet Info */}
        {isPrivyConnected && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">EVM Wallet</h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Connected</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-mono text-sm break-all">{evmAddress || 'Not connected'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Connected Via</p>
                <p>{privyUser?.wallet?.walletClientType || 'Privy'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">TSR Token Balance</p>
                <p className="font-semibold">{tokenBalance || '0'} TSR</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token Balances */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Token Balances</h2>
        <div className="space-y-4">
          {/* Flow Tokens */}
          {isFlowConnected && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-500 text-sm">FLOW</p>
                <p className="text-2xl font-bold">{flowBalance ? parseFloat(flowBalance).toFixed(4) : '0'}</p>
              </div>
              <img src="/flow-logo.png" alt="FLOW" className="h-10 w-10" />
            </div>
          )}
          
          {/* Flow TSR Tokens (from legacy hook) */}
          {isFlowConnected && tsrTokens && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-500 text-sm">Flow TSR</p>
                <p className="text-2xl font-bold">{tsrTokens || '0'}</p>
              </div>
              <div className="h-10 w-10 bg-tsr-primary rounded-full flex items-center justify-center text-white font-bold">
                TSR
              </div>
            </div>
          )}
          
          {/* EVM TSR Tokens */}
          {isPrivyConnected && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-500 text-sm">EVM TSR</p>
                <p className="text-2xl font-bold">{tokenBalance || '0'}</p>
              </div>
              <div className="h-10 w-10 bg-tsr-primary rounded-full flex items-center justify-center text-white font-bold">
                TSR
              </div>
            </div>
          )}
          
          {/* No connected wallets message */}
          {!isFlowConnected && !isPrivyConnected && (
            <div className="text-center py-4 text-gray-500">
              Connect a wallet to view your token balances
            </div>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2023-04-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Deposit
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  100 TSR
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2023-04-10
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Withdrawal
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  50 TSR
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/flow-token"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Buy $TSR</h3>
          <p className="text-gray-600">Purchase TSR tokens to participate in the ecosystem</p>
        </Link>
        <Link
          to="/rewards"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Claim Rewards</h3>
          <p className="text-gray-600">Check and claim your available rewards</p>
        </Link>
        <Link
          to="/leaderboard"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">View Leaderboard</h3>
          <p className="text-gray-600">See your position among other TSR holders</p>
        </Link>
      </div>
    </div>
  );
}
