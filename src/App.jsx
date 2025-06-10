import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import { FlowProvider } from './contexts/FlowContext';
import { LeaderboardProvider } from './contexts/LeaderboardContext';
import { PrivyAuthProvider } from './contexts/PrivyContext';
import PrivyNavbar from './components/PrivyNavbar';
import Home from './pages/Home';
import Account from './pages/Account';
import FlowToken from './pages/FlowToken';
import EvmToken from './pages/EvmToken';
import About from './pages/About';
import Community from './pages/Community';
import Roadmap from './pages/Roadmap';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import PrivySignIn from './pages/PrivySignIn';
import PrivySignUp from './pages/PrivySignUp';
import PrivyProfile from './pages/PrivyProfile';
import PrivyProtectedRoute from './components/PrivyProtectedRoute';

// Get Privy app ID from environment variables
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

// If no Privy app ID is provided, use a dummy ID for development
const appId = privyAppId || "clpzdr5ht00lfmf0fclpzdr5h";

function App() {
  // Display a warning if the Privy app ID is missing
  if (!privyAppId) {
    console.warn("⚠️ Missing Privy App ID. Please add it to your .env file. Using a dummy ID for now, but authentication won't work properly.");
  }

  // Get the current window location for proper WalletConnect configuration
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://topshotcommunityrewards.com';

  return (
    <PrivyProvider 
      appId={appId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#4F46E5' // Indigo color to match your design
        },
        walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '',
        embeddedWallets: {
          noPromptOnSignature: true
        },
        defaultChain: 'flow-testnet',
        supportedChains: ['flow-testnet', 'flow-mainnet', 'ethereum'],
        loginMethods: ['email', 'wallet'],
        appOrigin: appUrl
      }}
    >
      <PrivyAuthProvider>
        <FlowProvider>
          <LeaderboardProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <PrivyNavbar />
                {/* Container with max width and centered */}
                <main className="w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={
                      <PrivyProtectedRoute>
                        <Account />
                      </PrivyProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <PrivyProtectedRoute>
                        <PrivyProfile />
                      </PrivyProtectedRoute>
                    } />
                    <Route path="/flow-token" element={<FlowToken />} />
                    <Route path="/evm-token" element={<EvmToken />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/rewards" element={
                      <PrivyProtectedRoute>
                        <Rewards />
                      </PrivyProtectedRoute>
                    } />
                    <Route path="/sign-in/*" element={<PrivySignIn />} />
                    <Route path="/sign-up/*" element={<PrivySignUp />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </LeaderboardProvider>
        </FlowProvider>
      </PrivyAuthProvider>
    </PrivyProvider>
  );
}

export default App;
