'use client';

import Link from 'next/link';

// Mock Transaction Data
const TRANSACTIONS = [
  { id: 1, type: 'Rollover', amount: '1.2 GB', date: 'Today, 09:41 AM', status: 'Success', operator: 'ZedMobile' },
  { id: 2, type: 'Gift Sent', amount: '500 MB', date: 'Yesterday, 04:20 PM', status: 'Success', recipient: '097...123', operator: 'ZedMobile' },
  { id: 3, type: 'Bundle Purchase', amount: '10 GB', date: 'Nov 24, 2025', status: 'Success', operator: 'ZedMobile' },
  { id: 4, type: 'Applied to Bundle', amount: '200 MB', date: 'Nov 20, 2025', status: 'Success', operator: 'MTN' },
  { id: 5, type: 'Gift Received', amount: '1 GB', date: 'Nov 18, 2025', status: 'Success', sender: '096...555', operator: 'MTN' },
  { id: 6, type: 'Auto-Renew', amount: '5 GB', date: 'Nov 15, 2025', status: 'Failed', operator: 'Airtel' },
];

export default function TransactionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans bg-gray-50/50">
      <div className="w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white/90 backdrop-blur-2xl shadow-2xl ring-1 ring-white/60 transition-all duration-500 relative min-h-[720px] flex flex-col border border-white/40">
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 z-40 bg-white/50 backdrop-blur-md border-b border-gray-100/50">
          <Link href="/" className="rounded-full p-2.5 hover:bg-gray-100/80 transition-colors active:scale-95 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">History</h1>
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
                <div key={tx.id} className="group flex items-center justify-between rounded-3xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                      tx.type.includes('Gift') ? 'bg-purple-50 text-purple-600' :
                      tx.type.includes('Rollover') ? 'bg-green-50 text-green-600' :
                      tx.type.includes('Failed') ? 'bg-red-50 text-red-500' :
                      'bg-indigo-50 text-indigo-600'
                    }`}>
                      {tx.type.includes('Gift') ? '🎁' : 
                       tx.type.includes('Rollover') ? '♻️' : 
                       tx.type.includes('Failed') ? '❌' : '💳'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{tx.type}</p>
                      <p className="text-[10px] font-medium text-gray-400 mt-0.5">{tx.date}</p>
                      {tx.recipient && <p className="text-[10px] text-gray-400">To: {tx.recipient}</p>}
                      {tx.sender && <p className="text-[10px] text-gray-400">From: {tx.sender}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`block text-sm font-black ${
                      tx.status === 'Failed' ? 'text-gray-400 line-through' : 'text-gray-900'
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
        <footer className="mt-auto flex flex-col items-center gap-3 text-center pb-8 pt-6 bg-white/50 backdrop-blur-md border-t border-gray-100/50">
          <p className="text-sm font-medium text-gray-400">
            Powered by <span className="font-bold text-gray-800 tracking-tight">Chiza Labs</span>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">
            &copy; {new Date().getFullYear()} DataWallet Platform
          </p>
        </footer>
      </div>
    </main>
  );
}