import { motion } from 'framer-motion';

export default function EvmToken() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">$TSR EVM Token</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The MEME token bridging Top Shot Rewards across multiple blockchains.
        </p>
      </motion.section>

      {/* Trading Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Trade $TSR Now</h2>
        <p className="mb-6">Get your $TSR tokens on KittyPunch DEX</p>
        <a 
          href="https://swap.kittypunch.xyz/?tokens=0x0000000000000000000000000000000000000000-0x169bb04590fbf18b09739f951274aa5650dfccde"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-tsr-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Trade on KittyPunch
        </a>
      </motion.section>

      {/* Token Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Token Details</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Token Name</h3>
              <p className="text-gray-600">Top Shot Rewards EVM ($TSR)</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Networks</h3>
              <p className="text-gray-600">FLOW & EVM Compatible Networks</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Contract Types</h3>
              <p className="text-gray-600">Flow & ERC-20</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Multi-Chain Compatibility</h3>
              <p className="text-gray-600">Available on both Flow and EVM ecosystems</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Cross-Chain Integration</h3>
              <p className="text-gray-600">Seamless bridging between Flow and EVM networks</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Trading</h3>
              <p className="text-gray-600">Available on Flow and EVM-based DEXes</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Use Cases */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Multi-Chain Access</h4>
            <p className="text-sm">Access your tokens on both Flow and EVM chains</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Cross-Chain Trading</h4>
            <p className="text-sm">Trade across different blockchain ecosystems</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Ecosystem Integration</h4>
            <p className="text-sm">Participate in both Flow and EVM DeFi ecosystems</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
