import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { FlowProvider } from './contexts/FlowContext';
import { LeaderboardProvider } from './contexts/LeaderboardContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import FlowToken from './pages/FlowToken';
import EvmToken from './pages/EvmToken';
import About from './pages/About';
import Community from './pages/Community';
import Roadmap from './pages/Roadmap';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Get Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// If no Clerk key is provided, use a dummy key for development
const publishableKey = clerkPubKey || "pk_test_dummy-key-for-development";

function App() {
  // Display a warning if the Clerk key is missing
  if (!clerkPubKey) {
    console.warn("⚠️ Missing Clerk Publishable Key. Please add it to your .env file. Using a dummy key for now, but authentication won't work properly.");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <FlowProvider>
        <LeaderboardProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              {/* Container with max width and centered */}
              <main className="w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/flow-token" element={<FlowToken />} />
                  <Route path="/evm-token" element={<EvmToken />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/rewards" element={
                    <ProtectedRoute>
                      <Rewards />
                    </ProtectedRoute>
                  } />
                  <Route path="/sign-in/*" element={<SignIn />} />
                  <Route path="/sign-up/*" element={<SignUp />} />
                </Routes>
              </main>
            </div>
          </Router>
        </LeaderboardProvider>
      </FlowProvider>
    </ClerkProvider>
  );
}

export default App;
