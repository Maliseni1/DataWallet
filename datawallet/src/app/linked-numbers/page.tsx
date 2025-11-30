'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../providers';

// Mock data for linked numbers
const INITIAL_NUMBERS = [
  { id: 1, name: 'My Primary', number: '+260 97 123 4567', operator: 'ZedMobile', isPrimary: true },
  { id: 2, name: 'Mom\'s Phone', number: '+260 96 555 0123', operator: 'MTN', isPrimary: false },
  { id: 3, name: 'Work WiFi', number: '+260 95 987 6543', operator: 'Airtel', isPrimary: false },
];

export default function LinkedNumbersPage() {
  const { darkModeEnabled } = useTheme();
  const [numbers, setNumbers] = useState(INITIAL_NUMBERS);
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [newOperator, setNewOperator] = useState('ZedMobile');
  const [newName, setNewName] = useState('');

  const handleDelete = (id: number) => {
    setNumbers(numbers.filter(num => num.id !== id));
  };

  const handleAddNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNumber || !newName) return;

    const newEntry = {
      id: Date.now(), // Simple unique ID
      name: newName,
      number: newNumber,
      operator: newOperator,
      isPrimary: false
    };

    setNumbers([...numbers, newEntry]);
    
    // Reset form
    setIsAdding(false);
    setNewNumber('');
    setNewName('');
    setNewOperator('ZedMobile');
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-500 ${darkModeEnabled ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
      <div className={`w-full max-w-sm overflow-hidden rounded-[2.5rem] backdrop-blur-2xl shadow-2xl ring-1 transition-all duration-500 relative min-h-[720px] flex flex-col ${darkModeEnabled ? 'bg-gray-800/90 ring-white/10 border-gray-700' : 'bg-white/90 ring-white/60 border border-white/40'}`}>
        
        {/* Header */}
        <div className={`relative flex items-center justify-between p-6 z-40 backdrop-blur-md border-b ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100/50'}`}>
          <Link href="/" className={`rounded-full p-2.5 transition-colors active:scale-95 group ${darkModeEnabled ? 'hover:bg-gray-700' : 'hover:bg-gray-100/80'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${darkModeEnabled ? 'text-gray-300 group-hover:text-indigo-400' : 'text-gray-600 group-hover:text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className={`text-lg font-bold tracking-tight ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>Linked Numbers</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
          <div className="p-6">
            
            {/* Add New Button / Form */}
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className={`w-full mb-8 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 transition-all hover:shadow-sm active:scale-95 group ${darkModeEnabled ? 'border-gray-600 bg-gray-700/30 text-indigo-400 hover:bg-gray-700 hover:border-indigo-400' : 'border-indigo-200 bg-indigo-50/50 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${darkModeEnabled ? 'bg-gray-700 text-indigo-400' : 'bg-white text-indigo-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-bold">Link New Number</span>
              </button>
            ) : (
              <form onSubmit={handleAddNumber} className={`mb-8 p-5 rounded-3xl border shadow-lg animate-in fade-in slide-in-from-top-4 ${darkModeEnabled ? 'bg-gray-800 border-gray-700' : 'bg-white border-indigo-100'}`}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">New Connection</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>Name / Label</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dad's Phone"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm font-medium focus:ring-2 focus:outline-none ${darkModeEnabled ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+260..."
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm font-medium focus:ring-2 focus:outline-none ${darkModeEnabled ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500/20 placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>Operator</label>
                    <select 
                      value={newOperator}
                      onChange={(e) => setNewOperator(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm font-medium focus:ring-2 focus:outline-none ${darkModeEnabled ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500/20' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
                    >
                      <option value="ZedMobile">ZedMobile</option>
                      <option value="MTN">MTN</option>
                      <option value="Airtel">Airtel</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsAdding(false)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors ${darkModeEnabled ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-indigo-200 shadow-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* List */}
            <div className="space-y-4">
              {numbers.map((num) => (
                <div key={num.id} className={`group relative overflow-hidden rounded-3xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 ${darkModeEnabled ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/50' : 'bg-white border-gray-100'}`}>
                  <div className={`absolute left-0 top-0 h-full w-1.5 ${
                    num.operator === 'ZedMobile' ? 'bg-indigo-500' : 
                    num.operator === 'MTN' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  
                  <div className="flex justify-between items-start mb-2 pl-3">
                    <div>
                      <h3 className={`font-bold text-base ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>{num.name}</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{num.operator}</p>
                    </div>
                    {num.isPrimary && (
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${darkModeEnabled ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                        PRIMARY
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pl-3 mt-3">
                    <p className={`text-sm font-bold tracking-wide font-mono px-2 py-1 rounded-lg ${darkModeEnabled ? 'text-gray-300 bg-gray-700/50' : 'text-gray-600 bg-gray-50'}`}>{num.number}</p>
                    
                    {!num.isPrimary && (
                      <button 
                        onClick={() => handleDelete(num.id)}
                        className={`p-2 rounded-full transition-colors ${darkModeEnabled ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-red-50'}`}
                        title="Remove number"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
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