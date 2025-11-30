'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../providers';

export default function ProfilePage() {
  // Use Global Theme Context
  const { darkModeEnabled } = useTheme();

  // State to track linked status
  const [isAirtelLinked, setIsAirtelLinked] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkAirtel = async () => {
    setIsLinking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAirtelLinked(true);
    setIsLinking(false);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 font-sans transition-colors duration-500 ${darkModeEnabled ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-sm overflow-hidden rounded-[2.5rem] shadow-xl relative min-h-[700px] flex flex-col transition-all duration-500 ${darkModeEnabled ? 'bg-gray-800 ring-1 ring-white/10' : 'bg-white'}`}>
        
        {/* Header with Back Button */}
        <div className={`flex items-center justify-between p-6 border-b ${darkModeEnabled ? 'border-gray-700' : 'border-gray-100'}`}>
          <Link href="/" className={`rounded-full p-2 transition-colors ${darkModeEnabled ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className={`text-lg font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>My Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
              JD
            </div>
            <h2 className={`text-xl font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>John Doe</h2>
            <p className={`text-sm font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>+260 98 123 4567</p>
            <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${darkModeEnabled ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-700'}`}>
              Verified User
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-5 border ${darkModeEnabled ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Information</h3>
              
              <div className="space-y-4">
                <div className={`flex justify-between items-center border-b pb-3 last:border-0 last:pb-0 ${darkModeEnabled ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={`text-sm font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</span>
                  <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-900'}`}>John Doe</span>
                </div>
                <div className={`flex justify-between items-center border-b pb-3 last:border-0 last:pb-0 ${darkModeEnabled ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={`text-sm font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-600'}`}>Phone Number</span>
                  <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-900'}`}>+260 98 123 4567</span>
                </div>
                <div className={`flex justify-between items-center border-b pb-3 last:border-0 last:pb-0 ${darkModeEnabled ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={`text-sm font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-600'}`}>Email</span>
                  <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-900'}`}>john.doe@example.com</span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-5 border ${darkModeEnabled ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Linked Accounts</h3>
              
              <div className="space-y-3">
                {/* ZedMobile */}
                <div className={`flex items-center justify-between p-3 rounded-xl border shadow-sm ${darkModeEnabled ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${darkModeEnabled ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>ZM</div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-800'}`}>ZedMobile</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${darkModeEnabled ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>Active</span>
                </div>

                {/* MTN */}
                <div className={`flex items-center justify-between p-3 rounded-xl border shadow-sm ${darkModeEnabled ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${darkModeEnabled ? 'bg-yellow-900/50 text-yellow-500' : 'bg-yellow-100 text-yellow-700'}`}>MTN</div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-800'}`}>MTN</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${darkModeEnabled ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>Active</span>
                </div>

                {/* Airtel */}
                <div className={`flex items-center justify-between p-3 rounded-xl border shadow-sm transition-all ${darkModeEnabled ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} ${isAirtelLinked ? '' : 'opacity-80'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${darkModeEnabled ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-600'}`}>AT</div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-200' : 'text-gray-800'}`}>Airtel</span>
                  </div>
                  
                  {isAirtelLinked ? (
                    <span className={`text-xs font-medium px-2 py-1 rounded-md animate-in fade-in zoom-in ${darkModeEnabled ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>Active</span>
                  ) : (
                    <button 
                      onClick={handleLinkAirtel}
                      disabled={isLinking}
                      className={`text-xs font-bold hover:underline disabled:opacity-50 disabled:no-underline ${darkModeEnabled ? 'text-indigo-400' : 'text-indigo-600'}`}
                    >
                      {isLinking ? 'Linking...' : 'Link'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className={`mt-auto flex flex-col items-center gap-3 text-center pb-8 pt-6 backdrop-blur-md border-t ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <p className="text-sm font-medium text-gray-400">
            Powered by <span className={`font-bold tracking-tight ${darkModeEnabled ? 'text-gray-200' : 'text-gray-800'}`}>Chiza Labs</span>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">
            &copy; {new Date().getFullYear()} DataWallet Platform
          </p>
        </footer>
      </div>
    </main>
  );
}