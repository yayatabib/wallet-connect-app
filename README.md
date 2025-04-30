# Web3 Wallet App

A simple yet elegant Web3 React application that connects seamlessly to crypto wallets and displays the user's balance.

## Features

- Connect to MetaMask and other Ethereum-compatible wallets
- Display wallet address and current ETH balance
- Automatic balance updates on wallet state changes
- Modern and responsive UI with animations
- TypeScript for type safety

## Tech Stack

- Next.js
- React with TypeScript
- TailwindCSS for styling
- Ethers.js for Ethereum interactions
- Framer Motion for animations

## Project Structure

The project follows a clean, modular architecture:

```
src/
├── app/                  # Next.js App Router files
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout with metadata
│   └── client-wrapper.tsx # Client-side wrapper for wallet functionality
├── components/            # React components
│   ├── index.ts          # Barrel exports for all components
│   ├── wallet/           # Wallet-specific components
│   │   ├── WalletConnect.tsx        # Main wallet component
│   │   ├── WalletStatus.tsx         # Displays wallet details
│   │   ├── WalletConnectButton.tsx  # Button to connect wallet
│   │   ├── WalletDisconnectButton.tsx # Button to disconnect wallet
│   │   └── NoWalletMessage.tsx      # Message when no wallet is found
│   └── ui/               # Reusable UI components
│       ├── WalletCard.tsx            # Card container component
│       ├── LoadingSkeleton.tsx       # Loading state component
│       └── ErrorMessage.tsx          # Error display component
├── hooks/                # Custom React hooks
│   └── useWallet.ts      # Hook for wallet interaction logic
├── types/                # TypeScript type definitions
│   └── ethereum.d.ts     # Types for Ethereum window object
└── utils/                # Utility functions
    └── chains.ts         # Chain name and address utilities
```

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web3-wallet-app.git
   cd web3-wallet-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connecting Your Wallet

1. Install MetaMask or another Ethereum wallet browser extension
2. Click the "Connect Wallet" button in the app
3. Approve the connection in your wallet
4. Your wallet address and balance will be displayed

## Deployment to Vercel

The easiest way to deploy your Web3 Wallet App is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Deploy

## Architecture Decisions

### Component Design
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable UI Components**: Common UI elements are abstracted into reusable components
- **Custom Hooks**: Business logic is separated into custom hooks

### State Management
- Uses React's built-in hooks for state management
- Custom `useWallet` hook centralizes all wallet interaction logic

### Client-Side Only Execution
- Web3 code only runs on the client side
- Next.js dynamic imports with `ssr: false` ensure browser-only code doesn't run during server rendering

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Ethers.js](https://docs.ethers.io/) for their Ethereum library
- [MetaMask](https://metamask.io/) for wallet integration
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
