'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if a web3 wallet is available in the browser
 * @returns Object containing hasWallet status
 */
export function useWalletDetection() {
  // State to track if wallet is available
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  // Check for wallet on component mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      setHasWallet(!!window.ethereum);
    } else {
      setHasWallet(false);
    }
  }, []);

  return { hasWallet };
} 