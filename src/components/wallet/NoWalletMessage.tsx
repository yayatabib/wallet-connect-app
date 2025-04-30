'use client';

import WalletCard from '../ui/WalletCard';
import { WALLET_OPTIONS } from '../../constants/wallets';

/**
 * Component to display when no Web3 wallet is detected
 * Provides information and links to install popular wallets
 */
export default function NoWalletMessage() {
  return (
    <WalletCard
      title="Web3 Wallet"
      subtitle="No wallet detected"
    >
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800">
        <h3 className="font-medium mb-2">Wallet not found</h3>
        <p className="text-sm mb-4">
          To use this app, you need a Web3 wallet. Choose from the options below:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {WALLET_OPTIONS.map(wallet => (
            <a 
              key={wallet.name}
              href={wallet.url}
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 p-2 rounded bg-white border border-gray-200 ${wallet.hoverColor} transition-colors`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${wallet.bgColor} ${wallet.textColor}`}>
                {wallet.icon}
              </div>
              <span className="text-sm font-medium">{wallet.name}</span>
            </a>
          ))}
        </div>
        
        <p className="text-xs text-amber-700 mt-2">
          After installing a wallet, please refresh this page.
        </p>
      </div>
    </WalletCard>
  );
} 