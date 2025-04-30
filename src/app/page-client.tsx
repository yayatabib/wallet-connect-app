'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client wrapper component with SSR disabled
// This is allowed here because this is a client component
const ClientWrapper = dynamic(
  () => import('./client-wrapper'),
  { ssr: false }
);

/**
 * Client-side component that handles the dynamic import
 * This separates the dynamic import from the server component
 */
export default function PageClient() {
  return <ClientWrapper />;
} 