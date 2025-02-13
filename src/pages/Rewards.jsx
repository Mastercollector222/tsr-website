import { motion } from 'framer-motion';
import { useFlowWallet } from '../contexts/FlowContext';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { useState, useEffect } from 'react';
import { setupCollection, mintNFT } from '../utils/knightNFT';
import * as fcl from "@onflow/fcl";

const TIERS = [
  {
    name: 'Peasant',
    minTokens: 100,
    maxTokens: 499,
    benefits: [
      'Access to exclusive Discord channels',
      'Basic voting rights in DAO',
      'Monthly community newsletter'
    ],
    color: 'from-stone-700 to-stone-600'
  },
  {
    name: 'Squire',
    minTokens: 500,
    maxTokens: 999,
    benefits: [
      'All Peasant benefits',
      'Early access to community events',
      'Squire role in Discord',
      'Quarterly community calls'
    ],
    color: 'from-zinc-500 to-zinc-400'
  },
  {
    name: 'Knight',
    minTokens: 1000,
    maxTokens: 2499,
    benefits: [
      'All Squire benefits',
      'Priority support in Discord',
      'Monthly NFT drops',
      'Enhanced voting power'
    ],
    color: 'from-slate-400 to-slate-300'
  },
  {
    name: 'Baron',
    minTokens: 2500,
    maxTokens: 4999,
    benefits: [
      'All Knight benefits',
      'Exclusive Baron merchandise',
      'Quarterly strategy meetings',
      'Custom profile badge'
    ],
    color: 'from-amber-600 to-amber-500'
  },
  {
    name: 'Count',
    minTokens: 5000,
    maxTokens: 9999,
    benefits: [
      'All Baron benefits',
      'Early access to new features',
      'Monthly private Q&A sessions',
      'Governance proposal rights'
    ],
    color: 'from-emerald-600 to-emerald-500'
  },
  {
    name: 'Duke',
    minTokens: 10000,
    maxTokens: 24999,
    benefits: [
      'All Count benefits',
      'Premium Discord role',
      'Exclusive Duke events',
      'Direct team communication channel'
    ],
    color: 'from-violet-600 to-violet-500'
  },
  {
    name: 'Prince',
    minTokens: 25000,
    maxTokens: 49999,
    benefits: [
      'All Duke benefits',
      'Monthly strategic advisory calls',
      'Early investment opportunities',
      'Custom NFT collections'
    ],
    color: 'from-indigo-600 to-indigo-500'
  },
  {
    name: 'King',
    minTokens: 50000,
    maxTokens: 99999,
    benefits: [
      'All Prince benefits',
      'Quarterly in-person events',
      'Priority feature requests',
      'Executive Discord access'
    ],
    color: 'from-purple-600 to-purple-500'
  },
  {
    name: 'Emperor',
    minTokens: 100000,
    maxTokens: 249999,
    benefits: [
      'All King benefits',
      'Personal concierge service',
      'Custom development requests',
      'VIP event hosting rights'
    ],
    color: 'from-red-700 to-red-600'
  },
  {
    name: 'High Emperor',
    minTokens: 250000,
    maxTokens: Infinity,
    benefits: [
      'All Emperor benefits',
      'Founding member status',
      'Direct influence on roadmap',
      'Lifetime VIP status',
      'Private council membership'
    ],
    color: 'from-yellow-500 to-yellow-400'
  }
];

export default function Rewards() {
  const { user, loading: walletLoading, isConnected } = useFlowWallet();
  const { tsr: userTSRBalance, loading: balancesLoading, error } = useTokenBalances(user?.addr);
  const [currentTier, setCurrentTier] = useState(null);
  const [minting, setMinting] = useState(false);
  const [mintingError, setMintingError] = useState(null);

  useEffect(() => {
    if (userTSRBalance) {
      const tier = TIERS.find(
        tier => parseFloat(userTSRBalance) >= tier.minTokens && parseFloat(userTSRBalance) <= tier.maxTokens
      );
      setCurrentTier(tier);
    }
  }, [userTSRBalance]);

  const handleMintKnightNFT = async () => {
    if (!user?.addr || currentTier?.name !== 'Knight') return;
    
    setMinting(true);
    setMintingError(null);
    
    try {
      // First, set up the collection if it doesn't exist
      await setupCollection();
      
      // Then mint the NFT
      const metadata = {
        name: "TSR Knight NFT",
        description: "A special NFT for TSR Knight tier members",
        image: "https://your-nft-image-url.com/knight.png", // Replace with your image URL
        tier: "Knight",
        mintDate: new Date().toISOString(),
        tsrBalance: userTSRBalance.toString()
      };
      
      await mintNFT(user.addr, metadata);
      
      // Show success message
      alert("Successfully minted your Knight NFT!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMintingError(error.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">TSR Rewards Tiers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock exclusive benefits based on your $TSR holdings
        </p>
      </motion.section>

      {/* Wallet Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        {!user ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <p className="text-gray-600 mb-4">Connect your wallet to view your rewards tier</p>
          </div>
        ) : balancesLoading ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tsr-primary"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <p className="text-red-600">Error loading balance: {error}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <p className="text-gray-600">Your $TSR Balance</p>
            <p className="text-3xl font-bold text-tsr-primary">{parseFloat(userTSRBalance).toLocaleString()}</p>
            {currentTier && (
              <>
                <p className="mt-2 text-lg font-semibold">
                  Current Tier: <span className="text-tsr-secondary">{currentTier.name}</span>
                </p>
                {currentTier.name === 'Knight' && (
                  <div className="mt-4">
                    <button
                      onClick={handleMintKnightNFT}
                      disabled={minting}
                      className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
                        minting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-tsr-primary hover:bg-tsr-primary-dark'
                      }`}
                    >
                      {minting ? 'Minting...' : 'Mint Knight NFT'}
                    </button>
                    {mintingError && (
                      <p className="mt-2 text-red-600 text-sm">{mintingError}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>

      {/* Tiers Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {TIERS.map((tier, index) => (
          <div
            key={tier.name}
            className={`relative ${
              currentTier?.name === tier.name ? 'ring-4 ring-tsr-primary ring-offset-4' : ''
            }`}
          >
            <div
              className={`bg-gradient-to-br ${tier.color} p-6 rounded-xl shadow-lg h-full`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
              <div className="text-white mb-4">
                <p className="text-sm">Required $TSR</p>
                <p className="text-xl font-semibold">
                  {tier.minTokens.toLocaleString()} - {tier.maxTokens === Infinity ? '∞' : tier.maxTokens.toLocaleString()}
                </p>
              </div>
              <ul className="space-y-2 text-white">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
