import ClientEntry from './client-entry';

/**
 * Main page component that serves as the app entry point
 * Delegates to a client component for browser-specific functionality
 */
export default function Home() {
  return <ClientEntry />;
}
