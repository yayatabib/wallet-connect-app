/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // This is to handle the "HTMLElement is not defined" error
    // by telling webpack that certain packages should only be loaded client-side
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      '@walletconnect/ethereum-provider': 'commonjs @walletconnect/ethereum-provider',
    });
    
    return config;
  },
};

export default nextConfig;
