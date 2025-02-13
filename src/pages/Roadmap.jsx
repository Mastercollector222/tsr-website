import { motion } from 'framer-motion';

export default function Roadmap() {
  const phases = [
    {
      title: 'Phase 1: Foundation',
      timeline: 'Q1 2025',
      items: [
        'Launch of $TSR Flow Token',
        'Launch of $TSR EVM Token',
        'Community Platform Launch',
        'Flow Wallet Integration',
        'Basic Rewards System',
        'Community Governance Implementation',
        'Trading Platform Beta'
      ]
    },
    {
      title: 'Phase 2: Expansion',
      timeline: 'Q2 2025',
      items: [
        'NBA Top Shot API Integration',
        'Advanced Rewards System',
        'Cross-Chain Bridge Development',
        'Enhanced Community Features'
      ]
    },
    {
      title: 'Phase 3: Evolution',
      timeline: 'Q3 2025',
      items: [
        'Direct Challenge Completion',
        'Mobile App Development',
        'Strategic Partnerships',
        'Platform Optimization'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">Our Roadmap</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Building the future of NBA Top Shot rewards and community engagement.
        </p>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-blue-600"></div>
        <div className="space-y-20">
          {phases.map((phase, index) => (
            <div key={phase.title} className="relative">
              <div className="flex items-center mb-4">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-blue-600">{phase.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">{phase.timeline}</div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2"></div>
              </div>
              
              <div className="flex">
                <div className="w-1/2 pr-8">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-600 text-right">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p className="max-w-3xl mx-auto">
          We're committed to building a comprehensive platform that enhances the NBA Top Shot collecting
          experience through innovative features, community engagement, and rewarding opportunities.
        </p>
      </motion.section>
    </div>
  );
}
