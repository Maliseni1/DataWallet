'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// FIX: Import directly from the providers file where we moved the logic
import { useTheme } from '../providers';

// --- Toast Notification Component (Reused for consistency) ---
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 right-1/2 z-50 translate-x-1/2 transform rounded-2xl bg-gray-900/90 backdrop-blur-md px-6 py-3 text-sm font-medium text-white shadow-xl transition-all md:right-10 md:translate-x-0 animate-in fade-in slide-in-from-bottom-4 border border-white/10">
      {message}
    </div>
  );
}

export default function SettingsPage() {
  // Use Global Theme Context
  const { darkModeEnabled, toggleDarkMode } = useTheme();

  // Local state for other toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isChangingPin, setIsChangingPin] = useState(false);

  const showToast = (msg: string) => setToastMsg(msg);

  const handleNotificationToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setNotificationsEnabled(newState);
    showToast(`Notifications ${newState ? 'Enabled' : 'Disabled'}`);
  };

  const handleBiometricsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setBiometricsEnabled(newState);
    showToast(`Biometric Login ${newState ? 'Enabled' : 'Disabled'}`);
  };

  const handleDarkModeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleDarkMode();
    showToast(`Dark Mode ${!darkModeEnabled ? 'Enabled' : 'Disabled'}`);
  };

  const handleChangePin = async () => {
    if (isChangingPin) return;
    setIsChangingPin(true);
    
    // Simulate API call/Verification process
    showToast("Verifying identity...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success
    showToast("PIN successfully changed to default!");
    setIsChangingPin(false);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-500 ${darkModeEnabled ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
      
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <div className={`w-full max-w-sm overflow-hidden rounded-[2.5rem] backdrop-blur-2xl shadow-2xl ring-1 transition-all duration-500 relative min-h-[720px] flex flex-col ${darkModeEnabled ? 'bg-gray-800/90 ring-white/10 border-gray-700' : 'bg-white/90 ring-white/60 border border-white/40'}`}>
        
        {/* Header */}
        <div className={`relative flex items-center justify-between p-6 z-40 backdrop-blur-md border-b ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <Link href="/" className={`rounded-full p-2.5 transition-colors active:scale-95 group ${darkModeEnabled ? 'hover:bg-gray-700' : 'hover:bg-gray-100/80'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${darkModeEnabled ? 'text-gray-300 group-hover:text-indigo-400' : 'text-gray-600 group-hover:text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className={`text-lg font-bold tracking-tight ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
          <div className="p-6 space-y-8">
            
            {/* Preferences Section */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 pl-1 mb-4">Preferences</h2>
              <div className={`rounded-3xl border p-1 shadow-sm ${darkModeEnabled ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                
                {/* Notifications Toggle */}
                <div className={`flex items-center justify-between p-4 border-b last:border-0 transition-colors rounded-t-3xl ${darkModeEnabled ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkModeEnabled ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-700'}`}>Notifications</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={notificationsEnabled}
                      onChange={handleNotificationToggle} 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full peer-checked:bg-indigo-600 transition-colors duration-300"></div>
                  </label>
                </div>

                {/* Dark Mode Toggle */}
                <div className={`flex items-center justify-between p-4 transition-colors rounded-b-3xl ${darkModeEnabled ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkModeEnabled ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-700'}`}>Dark Mode</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={darkModeEnabled}
                      onChange={handleDarkModeToggle} 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 pl-1 mb-4">Security</h2>
              <div className={`rounded-3xl border p-1 shadow-sm ${darkModeEnabled ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                
                {/* Biometrics Toggle */}
                <div className={`flex items-center justify-between p-4 border-b last:border-0 transition-colors rounded-t-3xl ${darkModeEnabled ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkModeEnabled ? 'bg-green-900/50 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.567-4.171" />
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-700'}`}>Biometrics</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={biometricsEnabled}
                      onChange={handleBiometricsToggle} 
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                  </label>
                </div>

                {/* Change PIN Button */}
                <button 
                  onClick={handleChangePin}
                  disabled={isChangingPin}
                  className={`w-full flex items-center justify-between p-4 transition-colors rounded-b-3xl text-left group ${darkModeEnabled ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${darkModeEnabled ? 'bg-red-900/50 text-red-400 group-hover:bg-red-900/70' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isChangingPin ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {isChangingPin ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9H4V4m.582 5H19a8.001 8.001 0 01-14.418 5H4v5h.582m15.356-2a8.001 8.001 0 00-14.418-5H20v5h-.582" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {isChangingPin ? 'Processing...' : 'Change PIN'}
                    </span>
                  </div>
                  {!isChangingPin && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 pl-1 mb-4">Support</h2>
              <div className={`rounded-3xl border p-1 shadow-sm ${darkModeEnabled ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <button className={`w-full flex items-center justify-between p-4 border-b last:border-0 transition-colors rounded-t-3xl text-left group ${darkModeEnabled ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${darkModeEnabled ? 'bg-orange-900/50 text-orange-400 group-hover:bg-orange-900/70' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-700'}`}>About DataWallet</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button className={`w-full flex items-center justify-between p-4 transition-colors rounded-b-3xl text-left group ${darkModeEnabled ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${darkModeEnabled ? 'bg-purple-900/50 text-purple-400 group-hover:bg-purple-900/70' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-700'}`}>Contact Us</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs font-bold text-gray-400">Version 1.0.0 (Alpha)</p>
            </div>

          </div>
        </div>

        {/* Branding Footer */}
        <footer className={`mt-auto flex flex-col items-center gap-3 text-center pb-8 pt-6 backdrop-blur-md border-t ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <p className="text-sm font-medium text-gray-400">
            Powered by <span className={`font-bold tracking-tight ${darkModeEnabled ? 'text-gray-200' : 'text-gray-800'}`}>Chiza Labs</span>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">
            &copy; {new Date().getFullYear()} DataWallet Platform
          </p>
          <div className="mt-2 flex gap-3 opacity-30 grayscale transition-all hover:opacity-80 hover:grayscale-0">
             {/* Mock Logos */}
             <div className="h-5 w-14 rounded-md bg-gray-300"></div>
             <div className="h-5 w-14 rounded-md bg-gray-300"></div>
             <div className="h-5 w-14 rounded-md bg-gray-300"></div>
          </div>
        </footer>
      </div>
    </main>
  );
}