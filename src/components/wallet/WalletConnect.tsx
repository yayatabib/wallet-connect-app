'use client';

import { useWallet } from '../../hooks/useWallet';
import WalletStatus from './WalletStatus';
import WalletConnectButton from './WalletConnectButton';
import WalletDisconnectButton from './WalletDisconnectButton';
import NoWalletMessage from './NoWalletMessage';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import ErrorMessage from '../ui/ErrorMessage';
import WalletCard from '../ui/WalletCard';

/**
 * Main wallet connection component that:
 * - Detects if a wallet is available
 * - Handles wallet connection and disconnection
 * - Shows wallet status when connected
 * - Displays appropriate UI based on connection state
 */
export default function WalletConnect() {
  const {
    hasWallet,
    isConnected,
    address,
    balance,
    chainName,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  } = useWallet();

  // If we're still checking for wallet availability, show loading state
  if (hasWallet === null) {
    return <LoadingSkeleton />;
  }

  // If no wallet is available, show install message
  if (hasWallet === false) {
    return <NoWalletMessage />;
  }

  return (
    <WalletCard 
      title="Web3 Wallet" 
      subtitle="Connect your wallet to view your balance"
    >
      <ErrorMessage message={error || ''} />

      {isConnected ? (
        <div className="space-y-6">
          {/* Connected wallet status */}
          <WalletStatus
            address={address}
            chainName={chainName}
            balance={balance}
          />

          {/* Disconnect button */}
          <WalletDisconnectButton onClick={disconnectWallet} />
        </div>
      ) : (
        /* Connect button */
        <WalletConnectButton 
          onClick={connectWallet} 
          isLoading={isLoading}
        />
      )}
    </WalletCard>
  );
} 