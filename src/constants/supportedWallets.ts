/**
 * Constants file for supported wallet display information
 * Used to populate the UI with wallet options
 */

/**
 * Interface for wallet display data
 */
export interface SupportedWallet {
  /** Name of the wallet */
  name: string;
  /** Background color class for the wallet icon */
  bgColor: string;
  /** Text color class for the wallet icon */
  textColor: string;
  /** Text or symbol to use as an icon */
  icon: string;
}

/**
 * Array of supported wallets for display in the UI
 */
export const SUPPORTED_WALLETS: SupportedWallet[] = [
  {
    name: 'MetaMask',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-500',
    icon: 'M',
  },
  {
    name: 'Coinbase',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    icon: 'C',
  },
  {
    name: 'Trust Wallet',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-500',
    icon: 'T',
  },
  {
    name: 'More',
    bgColor: 'bg-green-100',
    textColor: 'text-green-500',
    icon: '+',
  },
]; 