'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../providers'; // Correctly importing the theme hook

// Mock FAQ Data
const FAQS = [
  { 
    id: 1, 
    question: "How does data rollover work?", 
    answer: "Unused data from your bundle is automatically moved to your DataWallet 24 hours before expiry. You can then apply it to a new bundle later." 
  },
  { 
    id: 2, 
    question: "Is there a fee for gifting data?", 
    answer: "No, gifting data to other DataWallet users is currently free of charge." 
  },
  { 
    id: 3, 
    question: "Which networks are supported?", 
    answer: "We currently support ZedMobile, MTN, and Airtel. We are working on adding Zamtel soon." 
  },
  { 
    id: 4, 
    question: "My transaction failed, what do I do?", 
    answer: "Please check your network connectivity. If the money was deducted but data not received, contact support immediately." 
  },
];

export default function HelpPage() {
  const { darkModeEnabled } = useTheme(); // Consume Theme Context
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-500 ${darkModeEnabled ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
      <div className={`w-full max-w-lg overflow-hidden rounded-4xl backdrop-blur-2xl shadow-2xl ring-1 transition-all duration-500 relative min-h-[720px] flex flex-col ${darkModeEnabled ? 'bg-gray-800/90 ring-white/10 border-gray-700' : 'bg-white/90 ring-white/60 border border-white/40'}`}>
        
        {/* Header */}
        <div className={`relative flex items-center justify-between p-6 z-40 backdrop-blur-md border-b ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <Link href="/" className={`rounded-full p-2.5 transition-colors active:scale-95 group ${darkModeEnabled ? 'hover:bg-gray-700' : 'hover:bg-gray-100/80'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${darkModeEnabled ? 'text-gray-300 group-hover:text-indigo-400' : 'text-gray-600 group-hover:text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className={`text-lg font-bold tracking-tight ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>Help & Support</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
          <div className="p-6">
            
            {/* Search Bar (Mock) */}
            <div className="relative mb-8 group">
              <input 
                type="text" 
                placeholder="Search for help..." 
                className={`w-full rounded-2xl border px-4 py-3.5 pl-11 text-sm font-medium transition-all focus:ring-4 focus:outline-none ${darkModeEnabled ? 'bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:bg-gray-700 focus:ring-indigo-500/10' : 'bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/10'}`}
              />
              <div className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors ${darkModeEnabled ? 'text-gray-500 group-focus-within:text-indigo-400' : 'text-gray-400 group-focus-within:text-indigo-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className={`flex flex-col items-center justify-center gap-2 rounded-3xl p-5 transition-colors group ${darkModeEnabled ? 'bg-indigo-900/20 text-indigo-300 hover:bg-indigo-900/40' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${darkModeEnabled ? 'bg-gray-800 text-indigo-300' : 'bg-white text-indigo-700'}`}>
                  <span className="text-xl">📞</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Call Us</span>
              </button>
              <button className={`flex flex-col items-center justify-center gap-2 rounded-3xl p-5 transition-colors group ${darkModeEnabled ? 'bg-green-900/20 text-green-300 hover:bg-green-900/40' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${darkModeEnabled ? 'bg-gray-800 text-green-300' : 'bg-white text-green-700'}`}>
                  <span className="text-xl">💬</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">WhatsApp</span>
              </button>
            </div>

            {/* FAQs */}
            <div>
              <h2 className={`text-xs font-extrabold uppercase tracking-widest pl-1 mb-4 ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {FAQS.map((faq) => (
                  <div key={faq.id} className={`rounded-3xl border overflow-hidden transition-all duration-300 ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="flex w-full items-center justify-between p-5 text-left group"
                    >
                      <span className={`text-sm font-bold transition-colors ${darkModeEnabled ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-indigo-600'}`}>{faq.question}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''} ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className={`px-5 pb-5 text-sm leading-relaxed ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
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