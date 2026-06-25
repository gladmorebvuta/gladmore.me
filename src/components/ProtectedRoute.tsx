import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="font-mono text-cyan-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-8">
            <div className="mb-8">
              <p className="font-mono text-cyan-400/80 mb-2 tracking-widest text-xs">
                {'>'} ADMIN.ACCESS
              </p>
              <h1 className="font-sans font-extrabold text-white tracking-tight uppercase" style={{ fontSize: '2rem' }}>
                AUTHENTICATION
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="Enter admin password"
                  required
                />
                {error && (
                  <p className="mt-2 font-mono text-red-400 text-xs">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400/50 rounded font-sans font-semibold text-cyan-400 uppercase tracking-wider transition-all"
              >
                ACCESS ADMIN
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded font-sans text-white/70 hover:text-white uppercase tracking-wider transition-all text-sm"
              >
                Back to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
