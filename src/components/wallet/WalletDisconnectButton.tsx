'use client';

import { motion } from 'framer-motion';

interface WalletDisconnectButtonProps {
  onClick: () => void;
}

/**
 * Button component for disconnecting from a wallet
 * Features animations
 */
export default function WalletDisconnectButton({ onClick }: WalletDisconnectButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-red-50 py-3 px-4 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors duration-200"
      data-testid="disconnect-wallet-button"
    >
      Disconnect Wallet
    </motion.button>
  );
} 