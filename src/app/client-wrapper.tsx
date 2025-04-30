'use client';

import { WalletConnect } from '../components';

/**
 * Client-side wrapper for the wallet connection functionality
 * This component is imported dynamically with SSR disabled
 */
export default function ClientWrapper() {
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
          
          <div className="mt-16 max-w-lg mx-auto text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supported Wallets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-orange-500 text-xl">M</span>
                </div>
                <span className="text-sm font-medium">MetaMask</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-blue-500 text-xl">C</span>
                </div>
                <span className="text-sm font-medium">Coinbase</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-purple-500 text-xl">W</span>
                </div>
                <span className="text-sm font-medium">Trust Wallet</span>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-green-500 text-xl">+</span>
                </div>
                <span className="text-sm font-medium">And more...</span>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2024 Web3 Wallet App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 