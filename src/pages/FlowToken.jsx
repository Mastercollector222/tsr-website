import { motion } from 'framer-motion';

export default function FlowToken() {
  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">$TSR Flow Token</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The native token of the Top Shot Rewards ecosystem, built on the Flow blockchain.
        </p>
      </motion.section>

      {/* Token Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Token Details</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Token Name</h3>
              <p className="text-gray-600">Top Shot Rewards Token ($TSR)</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Blockchain</h3>
              <p className="text-gray-600">Flow</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Total Supply</h3>
              <p className="text-gray-600">1,000,000 TSR</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Token Distribution</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Community Rewards</span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-tsr-primary to-tsr-secondary h-4 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                100% of the total supply is allocated to community rewards, ensuring fair distribution to NBA Top Shot collectors through various reward mechanisms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How to Get TSR */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">How to Get $TSR</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Hold NBA Top Shot Moments</h4>
            <p className="text-sm">Earn rewards based on your collection</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Complete Challenges</h4>
            <p className="text-sm">Participate in community challenges</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h4 className="font-semibold">Community Participation</h4>
            <p className="text-sm">Engage with the community to earn rewards</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
