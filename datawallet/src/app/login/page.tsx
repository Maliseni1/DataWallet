'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication logic
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (phoneNumber === '0971234567' && pin === '1234') {
      // Success (In a real app, you'd set a cookie/token here)
      router.push('/');
    } else {
      setError('Invalid phone number or PIN');
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 font-sans relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-3xl"></div>
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-3xl"></div>

      <div className="z-10 w-full max-w-md rounded-[2.5rem] bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-white/50 p-8 md:p-10 border border-white/60 relative">
        
        {/* Logo/Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage your data wallet</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                placeholder="097 123 4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 pl-11 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="pin" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
              PIN Code
            </label>
            <div className="relative">
              <input
                id="pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 pl-11 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all tracking-widest"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-medium text-red-600 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Don't have an account? <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Register via USSD *123#</a>
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-60">Powered by Chiza Labs</p>
      </div>
    </main>
  );
}