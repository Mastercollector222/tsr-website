import { Link } from 'react-router-dom';
import { useFlowWallet } from '../contexts/FlowContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePrivyAuth } from '../contexts/PrivyContext';

const MENU_ITEMS = [
  { name: 'Flow Token', href: '/flow-token' },
  { name: 'EVM Token', href: '/evm-token' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Account', href: '/account' },
  { name: 'About', href: '/about' },
  { name: 'Community', href: '/community' },
  { name: 'Roadmap', href: '/roadmap' },
];

// Add profile menu item that only shows when signed in
const PROFILE_MENU_ITEM = { name: 'Profile', href: '/profile' };

export default function PrivyNavbar() {
  const { user: flowUser, loading, isConnected, connectWallet, disconnectWallet } = useFlowWallet();
  const { isAuthenticated, isLoading, login, logout, user } = usePrivyAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if Privy is properly initialized
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;
  const isPrivyConfigured = !!privyAppId;

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
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      {MENU_ITEMS.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={`${
                                active ? 'bg-tsr-primary text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      
                      {/* Show Profile link only when signed in */}
                      {isPrivyConfigured && !isLoading && isAuthenticated && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={PROFILE_MENU_ITEM.href}
                              className={`${
                                active ? 'bg-tsr-primary text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {PROFILE_MENU_ITEM.name}
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
            {/* Authentication UI */}
            {isPrivyConfigured && !isLoading ? (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/profile"
                      className="text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md"
                    >
                      Sign Out
                    </button>
                    {user?.email && (
                      <div className="text-sm font-medium text-gray-700 px-3 py-2">
                        {user.email.address}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={login}
                      className="text-gray-600 hover:text-tsr-primary px-3 py-2 rounded-md"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={login}
                      className="bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90 transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </>
            ) : null}
            
            {/* Flow Wallet Connection */}
            {!loading && (
              <button
                onClick={isConnected ? disconnectWallet : connectWallet}
                className="bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90 transition-colors"
              >
                {isConnected ? `${flowUser?.addr?.substring(0, 6)}...${flowUser?.addr?.slice(-4)}` : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-tsr-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Show Profile link in mobile menu only when signed in */}
            {isPrivyConfigured && !isLoading && isAuthenticated && (
              <Link
                to={PROFILE_MENU_ITEM.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-tsr-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {PROFILE_MENU_ITEM.name}
              </Link>
            )}
            
            {/* Authentication UI for mobile */}
            {isPrivyConfigured && !isLoading ? (
              <div className="border-t border-gray-200 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-gray-700">Account</span>
                      {user?.email && (
                        <span className="text-sm font-medium text-gray-700">
                          {user.email.address}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-tsr-primary hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        login();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-tsr-primary hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        login();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-tsr-primary hover:bg-gray-50"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            ) : null}
            
            {/* Flow Wallet Connection for mobile */}
            {!loading && (
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    isConnected ? disconnectWallet() : connectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-tsr-primary text-white px-4 py-2 rounded-md hover:bg-tsr-primary/90 transition-colors"
                >
                  {isConnected ? `${flowUser?.addr?.substring(0, 6)}...${flowUser?.addr?.slice(-4)}` : 'Connect Wallet'}
                </button>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
}
