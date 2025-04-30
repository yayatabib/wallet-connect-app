'use client';

import dynamic from 'next/dynamic';

/**
 * Client component that safely handles the dynamic import with ssr: false
 * This resolves the "ssr: false is not allowed in Server Components" error
 */
const ClientLayout = dynamic(
  () => import('./ClientLayout'),
  { ssr: false }
);

export default function ClientEntry() {
  return <ClientLayout />;
} 