import { useEffect } from 'react';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { useFlowWallet } from '../contexts/FlowContext';
import { getHoldersData } from '../utils/holdersData';

export default function Leaderboard() {
  const { holders, getUserRank, initializeHolders } = useLeaderboard();
  const { user } = useFlowWallet();

  // Initialize with real holder data
  useEffect(() => {
    const holderData = getHoldersData();
    initializeHolders(holderData);
  }, [initializeHolders]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">TSR Leaderboard</h1>
        <p className="text-xl text-gray-600 mt-4">
          Top 50 TSR Token Holders
        </p>
      </div>

      {user && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Position</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Rank</p>
              <p className="text-3xl font-bold">#{getUserRank(user.addr)}</p>
            </div>
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-mono">{user.addr}</p>
            </div>
            <div>
              <p className="text-gray-600">Balance</p>
              <p className="text-2xl font-bold">
                {holders.find(h => h.address === user.addr)?.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }) || 0} TSR
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holders.map((holder, index) => (
                <tr 
                  key={holder.address}
                  className={`${holder.address === user?.addr ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm text-gray-900">{holder.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {holder.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      })} TSR
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
