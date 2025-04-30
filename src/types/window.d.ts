import { Config } from 'wagmi';

interface Window {
  connectWallet?: () => Promise<void>;
  disconnectWallet?: () => void;
  _wagmiConfig: Config;
} 