'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';

export default function WalletConnect() {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainName, setChainName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if a wallet is available when component mounts
  useEffect(() => {
    setHasWallet(typeof window !== 'undefined' && !!window.ethereum);
  }, []);
  
  // Get chain name based on chain ID
  const getChainName = (chainId: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai',
      42161: 'Arbitrum One',
      421613: 'Arbitrum Goerli',
    };
    return chains[chainId] || `Chain ID: ${chainId}`;
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Function to connect wallet
  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to connect.');
      }

      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please allow access in your wallet.');
      }
      
      // Get connected account address
      const address = accounts[0];
      setAddress(address);
      
      // Get network information
      const network = await provider.getNetwork();
      setChainName(getChainName(network.chainId));
      
      // Get account balance
      const balance = await provider.getBalance(address);
      const etherBalance = ethers.utils.formatEther(balance);
      setBalance(parseFloat(etherBalance).toFixed(4));
      
      // Set connected state
      setIsConnected(true);
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', handleChainChanged);
      
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account changes
  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet();
    } else {
      // Account changed
      setAddress(accounts[0]);
      
      // Update balance for new account
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const etherBalance = ethers.utils.formatEther(balance);
        setBalance(parseFloat(etherBalance).toFixed(4));
      }
    }
  };

  // Handle chain changes
  const handleChainChanged = async (chainId: string) => {
    // Need to reload page on chain change as recommended by MetaMask
    window.location.reload();
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setChainName(null);
    
    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Show a message if no wallet is available
  if (hasWallet === false) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Web3 Wallet</h2>
          <p className="text-gray-600">No wallet detected</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800">
          <h3 className="font-medium mb-2">Wallet not found</h3>
          <p className="text-sm mb-4">
            To use this app, you need a Web3 wallet like MetaMask.
          </p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  // If we're still checking for wallet, show loading state
  if (hasWallet === null) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Web3 Wallet</h2>
        <p className="text-gray-600">Connect your wallet to view your balance</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isConnected ? (
        <div className="space-y-6">
          {/* Connected State */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Connected to</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {chainName || 'Unknown Network'}
              </span>
            </div>
            <div className="font-mono text-sm text-gray-700 break-all mb-4">
              {address ? formatAddress(address) : 'Loading...'}
            </div>
            
            {/* Balance Display */}
            <div className="mt-4 text-center">
              <span className="text-sm font-medium text-gray-500 block mb-1">Your Balance</span>
              {balance === null ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-full"></div>
              ) : (
                <div className="text-3xl font-bold text-indigo-600">
                  {balance} ETH
                </div>
              )}
            </div>
          </div>

          {/* Disconnect Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={disconnectWallet}
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
          onClick={connectWallet}
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