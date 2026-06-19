import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Layers, Radio, ExternalLink } from 'lucide-react';

// Define strict TypeScript structure for the incoming Upstash queue telemetry
interface IngestedOrder {
  id: string;
  walletAddress: string;
  twitterHandle: string;
  designRequest: string;
  colorPalette: string;
  status: 'PENDING' | 'PROCESSING' | 'DONE';
  createdAt: string;
}

export default function BentoJurnal() {
  const [queueData, setQueueData] = useState<IngestedOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Poll telemetry data from the Upstash pipeline to keep the Journal live
  useEffect(() => {
    const fetchJournalMetrics = async () => {
      try {
        const response = await fetch('/api/get-journal-queue'); // Secure internal route
        const result = await response.json();
        if (result.success) {
          setQueueData(result.data);
        }
      } catch (error) {
        console.error('Journal core telemetric connection failure:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalMetrics();
    const interval = setInterval(fetchJournalMetrics, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-neutral-400 p-4 md:p-8 font-mono text-xs selection:bg-[#deff9a] selection:text-black">
      
      {/* Premium Cyberpunk Bento Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
        
        {/* =========================================================================
            BOX 01: SYSTEM CORE MANIFEST (Branding & Core Status)
           ========================================================================= */}
        <div className="md:col-span-2 bg-neutral-950 border border-neutral-900 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#deff9a] opacity-[0.02] blur-3xl pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#deff9a] font-bold tracking-widest text-sm">
                <Cpu className="w-4 h-4" /> MARIND_CORE_v0.1.0
              </div>
              <p className="text-neutral-500 max-w-md leading-relaxed">
                Autonomous open-source monolith directory archiving custom Web3 graphic assets, smart contracts, and encrypted pipeline queues.
              </p>
            </div>
            <span className="bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded uppercase tracking-widest text-[10px] font-bold">
              ● System_Online
            </span>
          </div>
          <div className="flex gap-4 border-t border-neutral-900/80 pt-4 font-mono text-neutral-500">
            <div>NODE_COUNT: <span className="text-neutral-300 font-bold">03</span></div>
            <div>LICENSE: <span className="text-neutral-300">MIT_DISTRIBUTED</span></div>
          </div>
        </div>

        {/* =========================================================================
            BOX 02: REPO TELEMETRY (Live GitHub Sync Display)
           ========================================================================= */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-800 transition">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-neutral-300 font-bold tracking-wider uppercase">Active Nodes</div>
              <p className="text-neutral-600">Public registry telemetry routing maps.</p>
            </div>
            <Layers className="text-neutral-700 w-5 h-5" />
          </div>
          <div className="space-y-2">
            <a href="https://github.com/ihsandot/marind-buidl-cores" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-neutral-900/50 rounded border border-neutral-900 hover:border-neutral-800 transition group">
              <span className="text-neutral-400 group-hover:text-[#deff9a]">📁 marind-buidl-cores</span>
              <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400" />
            </a>
            <a href="https://github.com/ihsandot/marind-collective-nft" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-neutral-900/50 rounded border border-neutral-900 hover:border-neutral-800 transition group">
              <span className="text-neutral-400 group-hover:text-[#deff9a]">📁 marind-collective-nft</span>
              <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            BOX 03: LIVE REVENUE RADAR (The Upstash Ingestion Queue Monitor)
           ========================================================================= */}
        <div className="md:col-span-3 md:row-span-2 bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Radio className="text-[#deff9a] w-4 h-4 animate-pulse" />
              <span className="text-neutral-200 font-bold tracking-wider uppercase text-sm">BOX_03 // LIVE_QUEUE_INGESTION_RADAR</span>
            </div>
            <div className="text-neutral-600 text-[10px]">REALTIME_UPSTASH_STREAM</div>
          </div>

          {/* Queue List Scroller */}
          <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-neutral-900">
            {loading ? (
              <div className="h-full flex items-center justify-center text-neutral-600 font-mono tracking-widest animate-pulse">
                INITIALIZING_RADAR_TELEMETRY...
              </div>
            ) : queueData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-600 font-mono py-12 space-y-2">
                <Terminal className="w-5 h-5 opacity-40" />
                <span>NO_ACTIVE_INGESTION_METRICS_DETECTED</span>
                <span className="text-[10px] text-neutral-700">Awaiting Web3 Mint Handshakes...</span>
              </div>
            ) : (
              queueData.map((order, idx) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-neutral-900/30 border border-neutral-900 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-900/50 transition"
                >
                  <div className="space-y-1.5 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="text-[#deff9a] font-bold">{order.twitterHandle}</span>
                      <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-500 font-mono">
                        TX: {order.id.slice(0, 8)}...{order.id.slice(-8)}
                      </span>
                    </div>
                    <div className="text-neutral-400 font-sans text-sm">{order.designRequest}</div>
                    <div className="text-[10px] text-neutral-600">
                      PALETTE: <span className="text-neutral-500 font-mono">{order.colorPalette}</span>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-neutral-900 pt-2 md:pt-0">
                    <span className="text-[10px] text-neutral-600 font-mono">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-900 border border-yellow-900/40 text-yellow-500 rounded font-bold uppercase tracking-widest text-[9px]">
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

