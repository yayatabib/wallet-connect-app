'use client';

import { SUPPORTED_WALLETS } from '../../constants/supportedWallets';

/**
 * Component to display a grid of supported wallets
 * Used to show users which wallets are compatible with the application
 */
export default function SupportedWalletList() {
  return (
    <div className="mt-16 max-w-lg mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Supported Wallets</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUPPORTED_WALLETS.map((wallet) => (
          <div 
            key={wallet.name}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center"
          >
            <div className={`w-12 h-12 ${wallet.bgColor} rounded-full mb-2 flex items-center justify-center`}>
              <span className={`${wallet.textColor} text-xl`}>{wallet.icon}</span>
            </div>
            <span className="text-sm font-medium">{wallet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 