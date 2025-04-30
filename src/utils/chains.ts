/**
 * Utilities for working with blockchain networks and chain IDs
 * Provides functions for displaying chain information and formatting addresses
 */

/**
 * Map of chain IDs to human-readable chain names
 * Based on the most common EVM-compatible networks
 */
export const CHAIN_NAMES: Record<number, string> = {
  // Mainnets
  1: 'Ethereum Mainnet',
  10: 'Optimism',
  56: 'BNB Smart Chain',
  137: 'Polygon Mainnet',
  42161: 'Arbitrum One',
  43114: 'Avalanche C-Chain',
  
  // Testnets
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  80001: 'Polygon Mumbai',
  421613: 'Arbitrum Goerli',
  421614: 'Arbitrum Sepolia',
  84531: 'Base Goerli',
  84532: 'Base Sepolia',
};

/**
 * Get a human-readable chain name from chain ID
 * @param chainId The numeric chain ID
 * @returns The chain name or a fallback with the chain ID
 */
export function getChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] || `Chain ID: ${chainId}`;
}

/**
 * Format an Ethereum address for display by shortening it
 * Creates a human-readable representation showing the start and end portions
 * @param address The full Ethereum address
 * @returns Shortened address in the format 0x1234...5678
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  
  // Check if it's a valid address format
  if (!address.startsWith('0x') || address.length !== 42) {
    return address; // Return unchanged if it's not a standard Ethereum address
  }
  
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
} 