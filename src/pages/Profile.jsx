import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useFlowWallet } from '../contexts/FlowContext';
import { useTokenBalances } from '../hooks/useTokenBalances';

export default function Profile() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { user: flowUser, isConnected, connectWallet, disconnectWallet, loading: flowLoading } = useFlowWallet();
  const { flow: flowBalance, tsr: tsrBalance, loading: balanceLoading } = useTokenBalances(flowUser?.addr);
  const [isLinking, setIsLinking] = useState(false);
  
  // This would be implemented with your backend to link Clerk user with Flow wallet
  const linkWalletToAccount = async () => {
    setIsLinking(true);
    try {
      // Here you would make an API call to your backend
      // Example: await api.post('/api/link-wallet', { userId: user.id, flowAddress: flowUser.addr });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Wallet linked successfully! (This is a simulation)');
    } catch (error) {
      console.error('Error linking wallet:', error);
      alert('Failed to link wallet. Please try again.');
    } finally {
      setIsLinking(false);
    }
  };
  
  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Information */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={user.imageUrl || 'https://via.placeholder.com/150'} 
                alt={user.fullName || 'User'} 
                className="h-24 w-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold">{user.fullName || 'User'}</h2>
              <p className="text-gray-500">{user.primaryEmailAddress?.emailAddress || 'No email'}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">User ID</p>
                <p className="font-mono text-xs break-all">{user.id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Created</p>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wallet and Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Flow Wallet Connection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Flow Wallet</h3>
            
            {isConnected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Connected Wallet</p>
                    <p className="font-mono text-sm">{flowUser.addr}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Connected
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">FLOW</p>
                        <p className="text-2xl font-bold">{balanceLoading ? '...' : flowBalance}</p>
                      </div>
                      <img src="/flow-logo.png" alt="FLOW" className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">TSR</p>
                        <p className="text-2xl font-bold">{balanceLoading ? '...' : tsrBalance}</p>
                      </div>
                      <div className="h-10 w-10 bg-tsr-primary rounded-full flex items-center justify-center text-white font-bold">
                        TSR
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={linkWalletToAccount}
                    disabled={isLinking}
                    className="flex-1 bg-tsr-primary text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {isLinking ? 'Linking...' : 'Link Wallet to Account'}
                  </button>
                  
                  <button
                    onClick={disconnectWallet}
                    disabled={flowLoading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">Connect your Flow wallet to view balances and link it to your account</p>
                <button 
                  onClick={connectWallet}
                  disabled={flowLoading}
                  className="bg-tsr-primary text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
                >
                  {flowLoading ? 'Connecting...' : 'Connect Flow Wallet'}
                </button>
              </div>
            )}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-tsr-primary pl-4 py-2">
                <p className="text-sm text-gray-500">Today</p>
                <p className="font-medium">Signed in to account</p>
              </div>
              <div className="border-l-4 border-tsr-primary pl-4 py-2">
                <p className="text-sm text-gray-500">Yesterday</p>
                <p className="font-medium">Connected Flow wallet</p>
              </div>
              <div className="border-l-4 border-tsr-primary pl-4 py-2">
                <p className="text-sm text-gray-500">3 days ago</p>
                <p className="font-medium">Created account</p>
              </div>
            </div>
          </div>
          
          {/* Rewards and Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Rewards & Achievements</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-tsr-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-tsr-primary">🏆</span>
                </div>
                <p className="font-medium">Early Adopter</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-tsr-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-tsr-primary">💰</span>
                </div>
                <p className="font-medium">Holder</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-tsr-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-tsr-primary">🔄</span>
                </div>
                <p className="font-medium">Trader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
