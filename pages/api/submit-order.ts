import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

// Initialize low-latency connection matrix to Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enforce strict routing - strictly reject any non-POST telemetry payloads
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { txHash, walletAddress, twitterHandle, designRequest, colorPalette } = req.body;

    // 1. Structural parameter validation guard
    if (!txHash || !walletAddress || !twitterHandle || !designRequest) {
      return res.status(400).json({ success: false, message: 'Missing required validation parameters' });
    }

    // 2. Construct standardized JSON payload object for ecosystem alignment
    const orderPayload = {
      id: txHash,
      walletAddress: walletAddress,
      twitterHandle: twitterHandle.startsWith('@') ? twitterHandle : `@${twitterHandle}`,
      designRequest: designRequest,
      colorPalette: colorPalette || 'Default Cyberpunk / Chrome',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // 3. Ingest and append state payload directly into the Upstash Redis queue matrix
    await redis.rpush('marind:nft:queue', JSON.stringify(orderPayload));

    // 4. Return success telemetry signature to the client interface
    return res.status(200).json({ 
      success: true, 
      message: 'Telemetry ingestion success. Order queued securely.',
      data: orderPayload 
    });

  } catch (error) {
    // Log unexpected exceptions without exposing internal server metadata to public clients
    console.error('Upstash Ingestion Failure Exception:', error);
    return res.status(500).json({ success: false, message: 'Internal server error on database routing pipeline' });
  }
}

