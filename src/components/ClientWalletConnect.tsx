'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatEther } from 'viem';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

export default function ClientWalletConnect() {
  // Directly use hooks at the top level of component
  const { open } = useWeb3Modal();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Connection handling
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await open();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return 'Loading...';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Web3 Wallet</h2>
        <p className="text-gray-600">Connect your wallet to view your balance</p>
      </div>

      {isConnected ? (
        <div className="space-y-6">
          {/* Connected State */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Connected to</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {chain?.name || 'Unknown Network'}
              </span>
            </div>
            <div className="font-mono text-sm text-gray-700 break-all mb-4">
              {address ? formatAddress(address) : 'Loading...'}
            </div>
            
            {/* Balance Display */}
            <div className="mt-4 text-center">
              <span className="text-sm font-medium text-gray-500 block mb-1">Your Balance</span>
              {isBalanceLoading ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-full"></div>
              ) : (
                <div className="text-3xl font-bold text-indigo-600">
                  {balance ? 
                    `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : 
                    '0.0000 ETH'}
                </div>
              )}
            </div>
          </div>

          {/* Disconnect Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => disconnect()}
            className="w-full bg-red-50 py-3 px-4 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors duration-200"
          >
            Disconnect Wallet
          </motion.button>
        </div>
      ) : (
        /* Connect Button */
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full bg-indigo-600 py-3 px-4 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 transition-colors duration-200 flex justify-center items-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span>Connect Wallet</span>
          )}
        </motion.button>
      )}
    </div>
  );
} 