'use client';

import { formatAddress } from '../../utils/chains';

interface WalletStatusProps {
  address: string | null;
  chainName: string | null;
  balance: string | null;
}

/**
 * Component to display wallet status information including:
 * - Connected chain
 * - Wallet address (formatted)
 * - Wallet balance
 */
export default function WalletStatus({ address, chainName, balance }: WalletStatusProps) {
  return (
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
  );
} 