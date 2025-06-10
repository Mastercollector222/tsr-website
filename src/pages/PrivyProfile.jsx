import { usePrivyAuth } from '../contexts/PrivyContext';

export default function PrivyProfile() {
  const { user, logout, isLoading } = usePrivyAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsr-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-tsr-primary">Your Profile</h1>
        </div>

        <div className="space-y-6">
          {user && (
            <>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">User ID:</span>
                    <p className="text-gray-600">{user.id}</p>
                  </div>
                  
                  {user.email && (
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-600">{user.email.address}</p>
                    </div>
                  )}
                  
                  {user.wallet && (
                    <div>
                      <span className="font-medium text-gray-700">Wallet Address:</span>
                      <p className="text-gray-600">{user.wallet.address}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Linked Accounts</h2>
                <div className="space-y-2">
                  {user.linkedAccounts && user.linkedAccounts.length > 0 ? (
                    user.linkedAccounts.map((account, index) => (
                      <div key={index} className="p-3 bg-white rounded border border-gray-200">
                        <p className="font-medium">{account.type}</p>
                        {account.address && <p className="text-sm text-gray-600">{account.address}</p>}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No linked accounts</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
