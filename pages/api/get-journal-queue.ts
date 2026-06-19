import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

// Initialize connection matrix to the shared Upstash Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enforce strict routing - only allow secure GET operations for data retrieval
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Fetch all telemetry payloads currently stored in the matrix queue
    const rawQueueData = await redis.lrange('marind:nft:queue', 0, -1);

    // Parse stringified JSON matrices back into standardized structural objects
    const parsedQueue = rawQueueData.map((item) => {
      return typeof item === 'string' ? JSON.parse(item) : item;
    });

    // Sort payloads to ensure the latest ingestion metrics appear first (Descending Order)
    const formattedQueue = parsedQueue.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Return the sanitized telemetric stream data to the Jurnal interface
    return res.status(200).json({
      success: true,
      data: formattedQueue,
    });

  } catch (error) {
    // Log exception metrics securely without leaking infrastructure details
    console.error('Upstash Telemetry Extraction Failure:', error);
    return res.status(500).json({ success: false, message: 'Internal server error on database retrieval pipeline' });
  }
}

