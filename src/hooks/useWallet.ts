'use client';

import { useWalletDetection } from './useWalletDetection';
import { useWalletConnection } from './useWalletConnection';

/**
 * Main wallet hook that combines wallet detection and connection
 * This provides a unified API for components to interact with
 * @returns Combined wallet state and methods
 */
export function useWallet() {
  // Get wallet detection state
  const { hasWallet } = useWalletDetection();
  
  // Get wallet connection state and methods
  const {
    isConnected,
    isLoading,
    address,
    balance,
    chainName,
    error,
    connectWallet,
    disconnectWallet
  } = useWalletConnection();

  // Return combined state and methods
  return {
    // Wallet detection
    hasWallet,
    
    // Wallet connection
    isConnected,
    isLoading,
    address,
    balance,
    chainName,
    error,
    
    // Methods
    connectWallet,
    disconnectWallet
  };
} 