'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('http://161.97.103.11:7070/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: wallet })
      });

      if (!res.ok) throw new Error('Backend error');

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Error connecting to backend. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-80 backdrop-blur-xl text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-6 backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">🔍 FHE Wallet Risk Checker</h1>

        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter EVM wallet address"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 text-white mb-4"
        />

        <button
          onClick={handleCheck}
          disabled={loading || !wallet}
          className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition disabled:bg-gray-600"
        >
          {loading ? 'Checking...' : 'Check Risk Score'}
        </button>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/5 border border-white/10 p-4 rounded-xl text-center"
          >
            <h2 className="text-lg font-semibold">🧠 Encrypted Score:</h2>
            <p className="break-all text-xs text-pink-300 mt-2">{result.encrypted_score}</p>

            <h2 className="mt-4 text-xl font-bold text-yellow-300">{result.comment}</h2>
          </motion.div>
        )}
      </motion.div>

      <p className="mt-10 text-xs text-white/30">Powered by Melek • FHE x Web3</p>
    </div>
  );
}
