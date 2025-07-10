'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: address }),
      });

      if (!res.ok) throw new Error('Something went wrong');

      const data = await res.json();
      console.log("Result:", data);
      setResult(data);
    } catch (err) {
      setError('Error connecting to backend. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black bg-opacity-90 text-white flex items-center justify-center p-4">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-center text-white">🔐 FHE Wallet Risk Checker</h1>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter EVM Wallet Address"
          className="w-full p-3 rounded-xl bg-black bg-opacity-30 border border-white border-opacity-20 text-white placeholder:text-gray-300"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition font-semibold text-white"
        >
          {loading ? 'Checking...' : 'Check Risk Score'}
        </button>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {result && (
          <motion.div
            className="bg-black bg-opacity-30 p-4 rounded-xl border border-white border-opacity-20 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {result.encrypted_score && (
              <>
                <p><span className="font-bold">Encrypted Score:</span></p>
                <p className="break-all text-sm text-pink-300">{result.encrypted_score}</p>
              </>
            )}
            <p className="text-lg mt-2 font-bold text-white">{result.comment}</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
