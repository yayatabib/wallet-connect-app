'use client';

import { WalletConnect, SupportedWalletList } from '../components';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children?: ReactNode;
}

/**
 * Client-side layout component that handles the main application structure
 * Used as the root client component in the application
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Web3 Wallet App</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple yet elegant Web3 React application that connects seamlessly 
            to any crypto wallet and displays your balance.
          </p>
        </header>
        
        <main className="flex flex-col items-center justify-center py-8">
          <WalletConnect />
          <SupportedWalletList />
          {children}
        </main>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Web3 Wallet App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 