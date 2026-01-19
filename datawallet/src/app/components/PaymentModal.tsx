'use client';

import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  amount: string;
  type: 'money' | 'data';
}

export function PaymentModal({ isOpen, onClose, onConfirm, title, amount, type }: PaymentModalProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // FIX: Removed the useEffect that was causing the linter error.
  // Instead, we reset the state in the handleClose function.

  const handleClose = () => {
    onClose();
    // Reset after a short delay to allow close animation (if any), or immediately.
    // Resetting here ensures next time it opens, it starts fresh.
    setTimeout(() => setStatus('idle'), 300);
  };

  const handleConfirm = async () => {
    setStatus('processing');
    await onConfirm();
    setStatus('success');
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          {status === 'idle' && (
            <>
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${type === 'money' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {type === 'money' ? (
                  <span className="text-2xl font-bold">K</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                )}
              </div>
              <p className="text-gray-500 mb-1">Confirm transaction of</p>
              <p className="text-3xl font-black text-gray-900 mb-8">{amount}</p>
              
              <button 
                onClick={handleConfirm}
                className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Confirm Payment
              </button>
            </>
          )}

          {status === 'processing' && (
            <div className="py-8">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-indigo-600 mb-4"></div>
              <p className="font-bold text-gray-900">Processing...</p>
              <p className="text-xs text-gray-400 mt-1">Please wait a moment</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-8 animate-in zoom-in duration-300">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 text-lg">Success!</p>
              <p className="text-xs text-gray-400 mt-1">Transaction completed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}