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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">My Account</h1>
        <p className="text-xl text-gray-600 mt-4">
          View your account details and token balances
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-xl">
          Error loading balances: {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Account Info */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Address</label>
              <p className="font-mono bg-gray-50 p-3 rounded">{user?.addr}</p>
            </div>
          </div>
        </div>

        {/* Token Balances */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Token Balances</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">FLOW Balance</label>
              <p className="text-2xl font-bold">{flow} FLOW</p>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">TSR Balance</label>
              <p className="text-2xl font-bold">{tsr} TSR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
