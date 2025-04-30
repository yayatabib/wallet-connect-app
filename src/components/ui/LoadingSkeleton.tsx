'use client';

import WalletCard from './WalletCard';

/**
 * Loading skeleton component for wallet connection
 * Shows animated placeholder content while loading
 */
export default function LoadingSkeleton() {
  return (
    <WalletCard>
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
      </div>
    </WalletCard>
  );
} 