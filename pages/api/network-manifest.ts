// pages/api/network-manifest.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Semua data siber Web3 dikumpulkan di sini secara terbuka untuk diaudit komunitas
  return res.status(200).json({
    success: true,
    chainId: "0xaa36a7", // Ethereum Sepolia Hex
    contractAddress: "0x9b72CcF4d56d6790CE77852074229b12FF6b6c30",
    mintSelector: "0x75bb8d1a", // mintTo(address) selector function
    rpcUrl: "https://rpc.sepolia.org",
    maxSupply: 1000
  });
}

