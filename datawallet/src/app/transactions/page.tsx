'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../providers';
import { TransactionDetailsModal } from '../components/TransactionDetailsModal'; // Import the new component

// Mock Transaction Data with references added
const TRANSACTIONS = [
  { id: 1, type: 'Rollover', amount: '1.2 GB', date: 'Today, 09:41 AM', status: 'Success', operator: 'ZedMobile', reference: 'ROLL-88239' },
  { id: 2, type: 'Gift Sent', amount: '500 MB', date: 'Yesterday, 04:20 PM', status: 'Success', recipient: '097...123', operator: 'ZedMobile', reference: 'GIFT-11293' },
  { id: 3, type: 'Bundle Purchase', amount: '10 GB', date: 'Nov 24, 2025', status: 'Success', operator: 'ZedMobile', reference: 'BUN-99210' },
  { id: 4, type: 'Applied to Bundle', amount: '200 MB', date: 'Nov 20, 2025', status: 'Success', operator: 'MTN', reference: 'APP-33211' },
  { id: 5, type: 'Gift Received', amount: '1 GB', date: 'Nov 18, 2025', status: 'Success', sender: '096...555', operator: 'MTN', reference: 'GIFT-00123' },
  { id: 6, type: 'Auto-Renew', amount: '5 GB', date: 'Nov 15, 2025', status: 'Failed', operator: 'Airtel', reference: 'AUTO-FAIL-1' },
];

export default function TransactionsPage() {
  const { darkModeEnabled } = useTheme();
  
  // State for selected transaction
  const [selectedTransaction, setSelectedTransaction] = useState<typeof TRANSACTIONS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTransactionClick = (transaction: typeof TRANSACTIONS[0]) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-500 ${darkModeEnabled ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
      
      {/* Transaction Details Modal */}
      <TransactionDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={selectedTransaction} 
      />

      <div className={`w-full max-w-sm overflow-hidden rounded-[2.5rem] backdrop-blur-2xl shadow-2xl ring-1 transition-all duration-500 relative min-h-[720px] flex flex-col ${darkModeEnabled ? 'bg-gray-800/90 ring-white/10 border-gray-700' : 'bg-white/90 ring-white/60 border border-white/40'}`}>
        
        {/* Header */}
        <div className={`relative flex items-center justify-between p-6 z-40 backdrop-blur-md border-b ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <Link href="/" className={`rounded-full p-2.5 transition-colors active:scale-95 group ${darkModeEnabled ? 'hover:bg-gray-700' : 'hover:bg-gray-100/80'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${darkModeEnabled ? 'text-gray-300 group-hover:text-indigo-400' : 'text-gray-600 group-hover:text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className={`text-lg font-bold tracking-tight ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>History</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 pl-1">Recent Activity</h2>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Filter</button>
            </div>

            <div className="space-y-4">
              {TRANSACTIONS.map((tx) => (
                // Added onClick and cursor-pointer for interactivity
                <div 
                  key={tx.id} 
                  onClick={() => handleTransactionClick(tx)}
                  className={`group flex items-center justify-between rounded-3xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${darkModeEnabled ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100 hover:bg-gray-50/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-105 ${
                      tx.type.includes('Gift') ? (darkModeEnabled ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600') :
                      tx.type.includes('Rollover') ? (darkModeEnabled ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600') :
                      tx.type.includes('Failed') ? (darkModeEnabled ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-500') :
                      (darkModeEnabled ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-600')
                    }`}>
                      {tx.type.includes('Gift') ? '🎁' : 
                       tx.type.includes('Rollover') ? '♻️' : 
                       tx.type.includes('Failed') ? '❌' : '💳'}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>{tx.type}</p>
                      <p className={`text-[10px] font-medium mt-0.5 ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>{tx.date}</p>
                      {tx.recipient && <p className={`text-[10px] ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>To: {tx.recipient}</p>}
                      {tx.sender && <p className={`text-[10px] ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>From: {tx.sender}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`block text-sm font-black ${
                      tx.status === 'Failed' ? 'text-gray-400 line-through' : (darkModeEnabled ? 'text-white' : 'text-gray-900')
                    }`}>
                      {tx.amount}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${
                      tx.operator === 'MTN' ? 'text-yellow-600' : 
                      tx.operator === 'Airtel' ? 'text-red-500' : 
                      'text-indigo-500'
                    }`}>
                      {tx.operator}
                    </span>
                  </div>
                </div>
              ))}
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
        </footer>
      </div>
    </main>
  );
}