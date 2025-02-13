import { Link } from 'react-router-dom';
import { useFlowWallet } from '../contexts/FlowContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const MENU_ITEMS = [
  { name: 'Flow Token', href: '/flow-token' },
  { name: 'EVM Token', href: '/evm-token' },
  { name: 'About', href: '/about' },
  { name: 'Community', href: '/community' },
  { name: 'Roadmap', href: '/roadmap' },
];

export default function Navbar() {
  const { user, loading, isConnected, connectWallet, disconnectWallet } = useFlowWallet();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-tsr-primary">TSR</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex items-center text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md">
                    More
                    <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      {MENU_ITEMS.map((item) => (
                        <Menu.Item key={item.href}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={`${
                                active ? 'bg-gray-100 text-tsr-primary' : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Link to="/leaderboard" className="text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md">
                Leaderboard
              </Link>
              <Link to="/rewards" className="text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md">
                Rewards
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/account"
                  className="text-gray-600 hover:text-tsr-primary transition-colors"
                >
                  My Account
                </Link>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  <span className="flex items-center">
                    <span className="mr-2">🟢</span>
                    {user?.addr?.slice(0, 6)}...{user?.addr?.slice(-4)}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-tsr-primary hover:bg-tsr-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
