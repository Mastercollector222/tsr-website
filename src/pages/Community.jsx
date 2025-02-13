import { motion } from 'framer-motion';

export default function Community() {
  const socialLinks = [
    {
      name: 'X',
      description: 'Follow us for the latest updates',
      url: 'https://x.com/TopShotRewards',
      color: 'bg-black'
    },
    {
      name: 'Discord',
      description: 'Join our community',
      url: 'https://discord.gg/4YvsrE5eP4',
      color: 'bg-[#5865F2]'
    },
    {
      name: 'DAO',
      description: 'Participate in governance',
      url: 'https://toucans.ecdao.org/p/TopShotRewardsCommunity',
      color: 'bg-[#2563eb]'
    }
  ];

  const activities = [
    {
      title: 'Community Challenges',
      description: 'Participate in weekly challenges and earn rewards',
      icon: '🏆'
    },
    {
      title: 'Trading Discussions',
      description: 'Share insights and strategies with fellow collectors',
      icon: '📈'
    },
    {
      title: 'Governance',
      description: 'Vote on important community decisions',
      icon: '🗳️'
    },
    {
      title: 'Events',
      description: 'Join virtual and physical community meetups',
      icon: '🎉'
    }
  ];

  const stats = [
    { label: 'X Followers', value: '5,000+' },
    { label: 'Discord Members', value: '700' },
    { label: 'Token Holders', value: '200+' },
    { label: 'Challenges Completed', value: '200+' },
    { label: 'Moments Given Away', value: '1,000+' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">Join Our Community</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Be part of the Top Shot Rewards community and help shape the future of NBA Top Shot collecting.
        </p>
      </motion.section>

      {/* Social Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} p-6 rounded-xl text-white hover:opacity-90 transition-opacity`}
          >
            <h3 className="text-xl font-semibold mb-2">{link.name}</h3>
            <p>{link.description}</p>
          </a>
        ))}
      </motion.section>

      {/* Community Activities */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Activities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div key={activity.title} className="text-center">
              <div className="text-4xl mb-2">{activity.icon}</div>
              <h3 className="font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 text-sm">{activity.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Community Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Community Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
