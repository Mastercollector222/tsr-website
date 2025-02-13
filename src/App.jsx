import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FlowProvider } from './contexts/FlowContext';
import { LeaderboardProvider } from './contexts/LeaderboardContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import FlowToken from './pages/FlowToken';
import EVMToken from './pages/EVMToken';
import About from './pages/About';
import Community from './pages/Community';
import Roadmap from './pages/Roadmap';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';

function App() {
  return (
    <FlowProvider>
      <LeaderboardProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/flow-token" element={<FlowToken />} />
                <Route path="/evm-token" element={<EVMToken />} />
                <Route path="/about" element={<About />} />
                <Route path="/community" element={<Community />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/rewards" element={<Rewards />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LeaderboardProvider>
    </FlowProvider>
  );
}

export default App;
