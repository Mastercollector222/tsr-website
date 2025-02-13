import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFlowWallet } from '../hooks/useFlowWallet';

export default function Home() {
  const { user, loading, connectWallet, isConnected } = useFlowWallet();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">
          Top Shot Rewards
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Rewarding NBA Top Shot collectors for their dedication to the community. Hold moments, earn rewards, and join the revolution.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/about"
            className="bg-gradient-to-r from-tsr-primary to-tsr-secondary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Learn More
          </Link>
          <button
            onClick={connectWallet}
            disabled={loading}
            className="bg-white text-tsr-primary border-2 border-tsr-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {loading ? 'Connecting...' : isConnected ? (
              <span className="flex items-center">
                <span className="mr-2">🟢</span>
                {user?.addr?.slice(0, 6)}...{user?.addr?.slice(-4)}
              </span>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">$TSR Flow Token</h3>
          <p className="text-gray-600">Native token on the Flow blockchain, designed to reward Top Shot collectors.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">$TSR EVM Token</h3>
          <p className="text-gray-600">Our MEME token bridging the gap between Flow and EVM ecosystems.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Community Rewards</h3>
          <p className="text-gray-600">Earn rewards for holding moments and participating in the community.</p>
        </motion.div>
      </section>

      {/* Coming Soon Section */}
      <section className="text-center space-y-6 bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white">
        <h2 className="text-3xl font-bold">Coming Soon</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Wallet Integration</h4>
            <p className="text-sm">Connect your Flow wallet</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Leaderboard</h4>
            <p className="text-sm">Compete with other collectors</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Reward Tiers</h4>
            <p className="text-sm">Earn based on your holdings</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Top Shot Integration</h4>
            <p className="text-sm">Direct challenge completion</p>
          </div>
        </div>
      </section>
    </div>
  );
}
