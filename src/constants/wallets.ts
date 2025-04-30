/**
 * Constants file for wallet-related data
 * Contains wallet options for display and links
 */

/**
 * Interface defining a wallet option for display
 */
export interface WalletOption {
  /** Name of the wallet */
  name: string;
  /** URL to download/install the wallet */
  url: string;
  /** TailwindCSS background color class */
  bgColor: string;
  /** TailwindCSS text color class */
  textColor: string;
  /** TailwindCSS hover border color class */
  hoverColor: string;
  /** Text or symbol to use as an icon */
  icon: string;
}

/**
 * Common wallet options for users to install
 */
export const WALLET_OPTIONS: WalletOption[] = [
  {
    name: 'MetaMask',
    url: 'https://metamask.io/download/',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-500',
    hoverColor: 'hover:border-orange-400',
    icon: 'M',
  },
  {
    name: 'Coinbase Wallet',
    url: 'https://www.coinbase.com/wallet',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    hoverColor: 'hover:border-blue-400',
    icon: 'C',
  },
  {
    name: 'Trust Wallet',
    url: 'https://trustwallet.com/download',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-500',
    hoverColor: 'hover:border-purple-400',
    icon: 'T',
  },
]; 