import { useFlowWallet } from '../contexts/FlowContext';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { Link } from 'react-router-dom';

export default function Account() {
  const { user } = useFlowWallet();
  const { flow, tsr, loading: balancesLoading, error } = useTokenBalances(user?.addr);

  if (balancesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
          <p className="text-gray-600 mb-8">
            You need to connect your wallet to view your account details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Wallet Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Wallet Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-mono text-sm break-all">{user.addr}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Connected Provider</p>
              <p>{user.provider}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Account Status</p>
              <p className="text-green-600 font-semibold">Active</p>
            </div>
          </div>
        </div>

        {/* Token Balances */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Token Balances</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">FLOW</p>
                <p className="text-2xl font-bold">{flow}</p>
              </div>
              <img src="/flow-logo.png" alt="FLOW" className="h-10 w-10" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">TSR</p>
                <p className="text-2xl font-bold">{tsr}</p>
              </div>
              <div className="h-10 w-10 bg-tsr-primary rounded-full flex items-center justify-center text-white font-bold">
                TSR
              </div>
            </div>
          </div>
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
