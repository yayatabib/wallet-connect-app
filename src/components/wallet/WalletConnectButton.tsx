'use client';

import { motion } from 'framer-motion';

interface WalletConnectButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

/**
 * Button component for connecting to a wallet
 * Features loading state and animations
 */
export default function WalletConnectButton({ onClick, isLoading }: WalletConnectButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-indigo-600 py-3 px-4 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 transition-colors duration-200 flex justify-center items-center"
      data-testid="connect-wallet-button"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <span>Connect Wallet</span>
      )}
    </motion.button>
  );
} 