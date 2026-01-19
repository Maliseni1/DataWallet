'use client';

import { useEffect } from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
  operator: string;
  recipient?: string;
  sender?: string;
  reference?: string; // Added reference field
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl mb-3 ${
              transaction.type.includes('Gift') ? 'bg-purple-50 text-purple-600' :
              transaction.type.includes('Rollover') ? 'bg-green-50 text-green-600' :
              transaction.type.includes('Failed') ? 'bg-red-50 text-red-500' :
              'bg-indigo-50 text-indigo-600'
            }`}>
              {transaction.type.includes('Gift') ? '🎁' : 
               transaction.type.includes('Rollover') ? '♻️' : 
               transaction.type.includes('Failed') ? '❌' : '💳'}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{transaction.type}</h2>
            <p className="text-sm font-medium text-gray-500">{transaction.date}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-lg font-bold text-gray-900">{transaction.amount}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                transaction.status === 'Success' ? 'bg-green-100 text-green-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {transaction.status}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-sm text-gray-500">Operator</span>
              <span className="text-sm font-semibold text-gray-900">{transaction.operator}</span>
            </div>

            {transaction.reference && (
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Reference</span>
                <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{transaction.reference}</span>
              </div>
            )}

            {transaction.recipient && (
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Recipient</span>
                <span className="text-sm font-semibold text-gray-900">{transaction.recipient}</span>
              </div>
            )}

             {transaction.sender && (
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">Sender</span>
                <span className="text-sm font-semibold text-gray-900">{transaction.sender}</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button 
              onClick={onClose}
              className="w-full rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
             {transaction.status === 'Success' && (
                <button className="w-full mt-3 rounded-xl border border-gray-200 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                  Download Receipt
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}