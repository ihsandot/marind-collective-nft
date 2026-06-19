/**
 * Marind Collective Ecosystem - Network RPC Configuration Matrix
 * Provides secure, isolated endpoints for multi-chain ledger communication.
 */

export const NETWORK_CONFIG = {
  solana: {
    cluster: 'mainnet-beta',
    // Fallback to public endpoint if custom RPC is not provided in environment variables
    endpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  },
  base: {
    chainId: 8453,
    endpoint: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
  },
  // Ingestion cache settings for Upstash telemetry routing
  cache: {
    ttl: 300, // 5 minutes state persistence guard
  }
};

