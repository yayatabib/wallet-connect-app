'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// Dynamically import the client providers with no SSR
const ClientProviders = dynamic(
  () => import('./client-providers').then(mod => ({ default: mod.ClientProviders })),
  { ssr: false }
);

// Create a react-query client
const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  // This will only be rendered in the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Provide a minimal provider structure during server rendering or before hydration
  return (
    <QueryClientProvider client={queryClient}>
      {mounted ? (
        <ClientProviders>
          {children}
        </ClientProviders>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
} 