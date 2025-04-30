'use client';

import { ReactNode } from 'react';

interface WalletCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Card component that provides consistent styling for wallet UI elements
 * Used as a container for wallet-related UI components
 */
export default function WalletCard({ children, title, subtitle }: WalletCardProps) {
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
} 