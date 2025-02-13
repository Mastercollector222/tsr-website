import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-tsr-primary">About TSR</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Building the future of NBA Top Shot rewards and community engagement.
        </p>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          Top Shot Rewards (TSR) was created with a singular vision: to enhance and reward the NBA Top Shot 
          collecting experience. We believe in building a strong community of collectors and providing them 
          with tangible benefits for their participation and dedication to the NBA Top Shot ecosystem.
        </p>
      </motion.section>

      {/* Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Community First</h3>
          <p className="text-gray-600">
            Everything we do is driven by our commitment to building and supporting the NBA Top Shot community.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Innovation</h3>
          <p className="text-gray-600">
            We're constantly exploring new ways to enhance the collecting experience through technology.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Transparency</h3>
          <p className="text-gray-600">
            We believe in open communication and maintaining trust with our community.
          </p>
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-tsr-primary to-tsr-secondary p-8 rounded-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Our Journey</h2>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-32 flex-shrink-0 text-sm">December 3, 2021</div>
            <div className="flex-1 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold">TSR Twitter Launch</h4>
              <p className="text-sm">Official TSR Twitter account created, marking the beginning of our community</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-32 flex-shrink-0 text-sm">December 30, 2021</div>
            <div className="flex-1 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold">Discord Community Launch</h4>
              <p className="text-sm">TSR Discord server established, creating a hub for our growing community</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-32 flex-shrink-0 text-sm">January 31, 2024</div>
            <div className="flex-1 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold">$TSR Token & DAO Launch</h4>
              <p className="text-sm">Creation of the $TSR token and establishment of the Top Shot Rewards DAO (Decentralized Autonomous Organization)</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-32 flex-shrink-0 text-sm">December 18, 2024</div>
            <div className="flex-1 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold">$TSR EVM Token Launch</h4>
              <p className="text-sm">Launch of the $TSR EVM token, expanding our ecosystem to EVM-compatible networks</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
