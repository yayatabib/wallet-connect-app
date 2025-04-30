/**
 * Type definitions for Ethereum provider and related browser extensions
 */

/**
 * Interface for the Ethereum provider typically injected by wallet extensions
 * Based on EIP-1193 and common provider implementations
 */
interface Ethereum {
  /** Flag indicating whether the provider is MetaMask */
  isMetaMask?: boolean;
  
  /** Request method for JSON-RPC API calls */
  request: (request: { method: string; params?: any[] }) => Promise<any>;
  
  /** Register an event listener */
  on: (eventName: string, callback: Function) => void;
  
  /** Remove an event listener */
  removeListener: (eventName: string, callback: Function) => void;
  
  /** Legacy method to enable access to accounts */
  enable: () => Promise<string[]>;
  
  /** Check if the provider is connected */
  isConnected: () => boolean;
  
  /** Currently selected chain ID as a hex string with 0x prefix */
  chainId?: string;
  
  /** Currently selected Ethereum address */
  selectedAddress?: string;
  
  /** Network version (similar to chainId but may be formatted differently) */
  networkVersion?: string;
  
  /** Whether the provider can switch chains programmatically */
  _metamask?: {
    isUnlocked: () => Promise<boolean>;
  };
}

/**
 * Extend the Window interface to include Ethereum provider
 */
interface Window {
  /** Ethereum provider injected by browser wallet extensions */
  ethereum?: Ethereum;
} 