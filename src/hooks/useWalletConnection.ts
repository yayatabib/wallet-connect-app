'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import { getChainName } from '../utils/chains';

/**
 * Interface for wallet connection state
 */
export interface WalletConnectionState {
  isConnected: boolean;
  isLoading: boolean;
  address: string | null;
  balance: string | null;
  chainName: string | null;
  error: string | null;
}

/**
 * Interface for wallet connection errors
 */
interface WalletError {
  message: string;
  code?: number;
  reason?: string;
}

/**
 * Custom hook that manages wallet connection and related state
 * @returns Wallet connection state and methods
 */
export function useWalletConnection() {
  // State for wallet connection
  const [state, setState] = useState<WalletConnectionState>({
    isConnected: false,
    isLoading: false,
    address: null,
    balance: null,
    chainName: null,
    error: null,
  });

  // References for event handlers to maintain stable identity
  const accountsChangedRef = useRef<((accounts: string[]) => void) | null>(null);
  const chainChangedRef = useRef<((chainId: string) => void) | null>(null);

  /**
   * Disconnect the wallet and clean up listeners
   */
  const disconnectWallet = useCallback(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    // Remove event listeners if they exist
    if (accountsChangedRef.current) {
      window.ethereum.removeListener('accountsChanged', accountsChangedRef.current);
    }
    if (chainChangedRef.current) {
      window.ethereum.removeListener('chainChanged', chainChangedRef.current);
    }
    
    // Reset state
    setState({
      isConnected: false,
      isLoading: false,
      address: null,
      balance: null,
      chainName: null,
      error: null,
    });
  }, []);

  /**
   * Handle account changes from the wallet
   */
  const handleAccountsChanged = useCallback(async (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      disconnectWallet();
      return;
    }
    
    // Account changed - update state
    const address = accounts[0];
    setState(prev => ({ ...prev, address }));
    
    // Update balance for new account
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const etherBalance = ethers.utils.formatEther(balance);
        setState(prev => ({ 
          ...prev, 
          balance: parseFloat(etherBalance).toFixed(4) 
        }));
      }
    } catch (error) {
      console.error('Error fetching balance after account change:', error);
      // Don't update error state here to avoid disrupting the UI
    }
  }, [disconnectWallet]);

  /**
   * Handle chain changes from the wallet
   */
  const handleChainChanged = useCallback(() => {
    // Recommended approach by MetaMask for chain changes
    window.location.reload();
  }, []);

  // Store the handlers in refs to maintain stable identity for event listeners
  useEffect(() => {
    accountsChangedRef.current = handleAccountsChanged;
  }, [handleAccountsChanged]);

  useEffect(() => {
    chainChangedRef.current = handleChainChanged;
  }, [handleChainChanged]);

  /**
   * Connect to the wallet
   */
  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Check for wallet
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No wallet detected. Please install a Web3 wallet like MetaMask.');
      }

      // Request accounts
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please allow access in your wallet.');
      }
      
      // Get account and network info
      const address = accounts[0];
      const network = await provider.getNetwork();
      
      // Get balance
      const balance = await provider.getBalance(address);
      const etherBalance = ethers.utils.formatEther(balance);
      
      // Update state with all wallet info
      setState({
        isConnected: true,
        isLoading: false,
        address,
        chainName: getChainName(network.chainId),
        balance: parseFloat(etherBalance).toFixed(4),
        error: null
      });
      
      // Set up event listeners
      if (accountsChangedRef.current) {
        window.ethereum.on('accountsChanged', accountsChangedRef.current);
      }
      
      if (chainChangedRef.current) {
        window.ethereum.on('chainChanged', chainChangedRef.current);
      }
      
    } catch (error: unknown) {
      console.error('Error connecting wallet:', error);
      
      // Format error message based on type
      let errorMessage = 'Failed to connect wallet';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const walletError = error as WalletError;
        errorMessage = walletError.message || walletError.reason || errorMessage;
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: errorMessage 
      }));
    }
  }, []);

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        if (accountsChangedRef.current) {
          window.ethereum.removeListener('accountsChanged', accountsChangedRef.current);
        }
        if (chainChangedRef.current) {
          window.ethereum.removeListener('chainChanged', chainChangedRef.current);
        }
      }
    };
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
  };
} 