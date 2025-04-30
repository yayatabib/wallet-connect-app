'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { State, WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import React, { ReactNode, useEffect, useState } from 'react';

// Set up wagmi metadata
const metadata = {
  name: 'Web3 Wallet App',
  description: 'Web3 Wallet Connection Demo',
  url: 'https://web3-wallet-app.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export function ClientProviders({ children, initialState }: { children: ReactNode; initialState?: State }) {
  const [initialized, setInitialized] = useState(false);
  
  // Initialize web3modal only on the client side and only once
  useEffect(() => {
    try {
      const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';
      
      // Define chains - only used client-side
      const chains = [mainnet, polygon, arbitrum];
      
      // Create wagmi config - only used client-side
      const config = createConfig({
        chains,
        transports: {
          [mainnet.id]: http(),
          [polygon.id]: http(),
          [arbitrum.id]: http(),
        },
        metadata,
      });
      
      // Initialize Web3Modal
      createWeb3Modal({
        wagmiConfig: config,
        projectId,
        chains,
        themeMode: 'light',
        themeVariables: {
          '--w3m-accent': '#4f46e5', // Indigo-600
        },
      });
      
      setInitialized(true);
      
      // Save config to window for components to use
      window._wagmiConfig = config;
    } catch (e) {
      console.error('Failed to initialize Web3Modal:', e);
    }
  }, []);
  
  if (!initialized) {
    // Return a minimal provider until initialized
    return <>{children}</>;
  }
  
  // Use the saved config from window
  return (
    <WagmiProvider config={window._wagmiConfig}>
      {children}
    </WagmiProvider>
  );
} 