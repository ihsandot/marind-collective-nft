import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export default function MarindMintNode() {
  // Frontend state management for Web3 pipeline workflows
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [mintStatus, setMintStatus] = useState<'IDLE' | 'MINTING' | 'PIPELINE_SUCCESS' | 'ERROR'>('IDLE');
  const [txHash, setTxHash] = useState<string>('');

  // Form states bound to the Upstash ingestion payload architecture
  const [twitterHandle, setTwitterHandle] = useState<string>('');
  const [designRequest, setDesignRequest] = useState<string>('');
  const [colorPalette, setColorPalette] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Mock function simulating decentralized ledger transaction execution
  const executeWeb3Mint = async () => {
    if (!walletConnected) return;
    setMintStatus('MINTING');
    
    setTimeout(() => {
      // Simulating a successful on-chain transaction hash receipt
      const mockTx = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setTxHash(mockTx);
      setMintStatus('PIPELINE_SUCCESS'); // Unlocks the dynamic data entry form gate
    }, 2500);
  };

  // Pushes sanitized client parameter data directly to the Next.js Upstash API route
  const handleDataIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash,
          walletAddress,
          twitterHandle,
          designRequest,
          colorPalette,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error('Fatal client-side telemetry routing failure:', error);
    }
  };

  return (
    <div className="min-height-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      {/* Box 03 Architecture Framework Interface */}
      <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Element Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#deff9a] opacity-5 blur-3xl pointer-events-none" />

        {/* Header Block */}
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-[#deff9a] w-6 h-6" />
          <h2 className="text-xl font-bold tracking-wider text-neutral-200">MARIND_UTILITY_NODE // BOX_03</h2>
        </div>

        {/* Dynamic Step 1: Wallet Authentication */}
        {!walletConnected ? (
          <div className="text-center py-8">
            <p className="text-neutral-400 mb-6 text-sm">Establish decentralized handshake to initialize the minting pipeline.</p>
            <button 
              onClick={() => { setWalletConnected(true); setWalletAddress('0x71C...3a9f'); }}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
            >
              <Wallet className="w-4 h-4 text-[#deff9a]" /> Connect Web3 Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wallet Info Badge */}
            <div className="bg-neutral-900/50 border border-neutral-800/80 px-4 py-2 rounded-xl flex justify-between items-center text-xs">
              <span className="text-neutral-500">CONNECTED_IDENTITY:</span>
              <span className="font-mono text-[#deff9a]">{walletAddress}</span>
            </div>

            {/* Dynamic Step 2: Blockchain Mint Core */}
            {mintStatus === 'IDLE' && (
              <div className="text-center py-4">
                <button 
                  onClick={executeWeb3Mint}
                  className="w-full bg-[#deff9a] hover:bg-[#cbe68b] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  Execute Collection Mint <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {mintStatus === 'MINTING' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-6 h-6 border-2 border-[#deff9a] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400 font-mono tracking-widest">AWAITING_LEDGER_CONFIRMATION...</p>
              </div>
            )}

            {/* Dynamic Step 3: Upstash Form Gate (Unlocked via PIPELINE_SUCCESS) */}
            {mintStatus === 'PIPELINE_SUCCESS' && !formSubmitted && (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleDataIngestion}
                className="space-y-4 pt-4 border-t border-neutral-900"
              >
                <div className="bg-emerald-950/20 border border-emerald-800/30 p-3 rounded-xl text-center">
                  <p className="text-xs text-emerald-400 font-mono">⚡ TRANSACTION_VERIFIED // UTILITY_GATE_OPENED</p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 font-mono mb-1">TWITTER_HANDLE *</label>
                  <input 
                    type="text" required placeholder="@username" 
                    value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#deff9a] text-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 font-mono mb-1">DESIGN_ARCHITECTURE_REQUEST *</label>
                  <textarea 
                    required placeholder="Describe your custom banner or graphic asset criteria..." 
                    value={designRequest} onChange={(e) => setDesignRequest(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#deff9a] text-white h-24 resize-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 font-mono mb-1">COLOR_PALETTE_SPECIFICATION</label>
                  <input 
                    type="text" placeholder="e.g., Brushed Chrome, Cyberpunk Neon Red, Minimal Stark White" 
                    value={colorPalette} onChange={(e) => setColorPalette(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#deff9a] text-white transition"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-neutral-100 hover:bg-white text-black font-bold py-3 rounded-xl transition text-sm"
                >
                  Submit Graphics Parameter Data
                </button>
              </motion.form>
            )}

            {/* Ingestion Complete Screen */}
            {formSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 space-y-3"
              >
                <ShieldCheck className="w-12 h-12 text-[#deff9a] mx-auto" />
                <h3 className="font-bold text-neutral-200">DATA METRICS INGESTED</h3>
                <p className="text-xs text-neutral-400 max-width-xs mx-auto">Your design request pipeline is fully queued into the Marind Monolith. Check your X timeline for pipeline telemetry sync updates.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

