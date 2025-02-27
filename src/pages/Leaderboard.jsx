import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { useFlowWallet } from '../contexts/FlowContext';
import { getHoldersData } from '../utils/holdersData';

export default function Leaderboard() {
  const location = useLocation();
  const { holders, getUserRank, initializeHolders, loading: contextLoading } = useLeaderboard();
  const { user } = useFlowWallet();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with real holder data whenever the page is loaded or navigated to
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const holderData = getHoldersData();
        await initializeHolders(holderData);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [initializeHolders, location.pathname]); // Re-run when location changes

  if (isLoading || contextLoading) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">TSR Leaderboard</h1>
          <p className="text-xl text-gray-600 mt-4">Top 150 TSR Token Holders</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsr-primary"></div>
        </div>
      </div>
    );
  }

  const userRank = user ? getUserRank(user.addr) : null;
  console.log("User Rank:", userRank);

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">TSR Leaderboard</h1>
        <p className="text-xl text-gray-600 mt-4">Top 150 TSR Token Holders</p>
      </div>

      {userRank && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Position</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{userRank.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {userRank.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {userRank.balance} TSR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holders.map((holder, index) => (
                  <tr 
                    key={holder.address} 
                    className={holder.address === user?.addr ? "bg-blue-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {holder.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {holder.balance} TSR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
