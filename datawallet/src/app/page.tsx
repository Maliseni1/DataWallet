'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import type { AccountData } from '@/app/lib/data';
import { useTheme } from './providers'; 
import { PaymentModal } from './components/PaymentModal';

// --- Toast Notification Component ---
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

// --- Menu Dropdown Component ---
function MenuDropdown({ isOpen, onClose, darkModeEnabled }: { isOpen: boolean; onClose: () => void; darkModeEnabled: boolean }) {
  const router = useRouter(); 

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Profile', icon: '👤', action: () => router.push('/profile') },
    { label: 'Transaction History', icon: '🕒', action: () => router.push('/transactions') },
    { label: 'Linked Numbers', icon: '📱', action: () => router.push('/linked-numbers') },
    { label: 'Settings', icon: '⚙️', action: () => router.push('/settings') },
    { label: 'Help & Support', icon: '❓', action: () => router.push('/help') },
    { label: 'Logout', icon: '🚪', className: 'text-red-600', action: () => router.push('/login') },
  ];

  return (
    <div className={`absolute left-4 top-16 z-50 w-64 origin-top-left rounded-2xl backdrop-blur-xl shadow-2xl ring-1 focus:outline-none animate-in fade-in zoom-in-95 duration-200 ${darkModeEnabled ? 'bg-gray-800/95 ring-white/10 border border-gray-700' : 'bg-white/95 ring-black/5 border border-white/20'}`}>
      <div className={`border-b px-5 py-5 rounded-t-2xl ${darkModeEnabled ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100/50 bg-gray-50/50'}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg text-sm">JD</div>
          <div>
            <p className={`text-sm font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
            <p className={`text-xs font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-500'}`}>+260 98 123 4567</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${item.className || (darkModeEnabled ? 'text-gray-200' : 'text-gray-700')} ${darkModeEnabled ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/80'}`}
            onClick={() => { if (item.action) item.action(); onClose(); }}
          >
            <span className="text-lg opacity-80">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Notifications Dropdown Component ---
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'success' | 'info';
  operator: 'zedmobile' | 'mtn' | 'airtel';
}

function NotificationsDropdown({ isOpen, onClose, notifications, darkModeEnabled }: { isOpen: boolean; onClose: () => void; notifications: Notification[]; darkModeEnabled: boolean }) {
  if (!isOpen) return null;

  return (
    <div className={`absolute right-4 top-16 z-50 w-80 origin-top-right rounded-2xl backdrop-blur-xl shadow-2xl ring-1 focus:outline-none animate-in fade-in zoom-in-95 duration-200 ${darkModeEnabled ? 'bg-gray-800/95 ring-white/10 border border-gray-700' : 'bg-white/95 ring-black/5 border border-white/20'}`}>
      <div className={`flex items-center justify-between border-b px-5 py-4 rounded-t-2xl ${darkModeEnabled ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100/50 bg-gray-50/50'}`}>
        <h3 className={`text-sm font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
        <button onClick={onClose} className={`text-xs font-semibold transition-colors px-2 py-1 rounded-md ${darkModeEnabled ? 'text-gray-400 hover:text-white bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100'}`}>Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note.id} className={`cursor-pointer px-5 py-3.5 transition-colors border-b last:border-0 group ${darkModeEnabled ? 'hover:bg-gray-700/30 border-gray-700/50' : 'hover:bg-gray-50/50 border-gray-50/50'}`}>
              <div className="flex justify-between items-start mb-1">
                <p className={`text-sm font-semibold transition-colors ${darkModeEnabled ? 'text-gray-200 group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'}`}>{note.title}</p>
                <p className={`text-[10px] font-bold whitespace-nowrap ml-2 px-2 py-0.5 rounded-full ${darkModeEnabled ? 'text-gray-400 bg-gray-700' : 'text-gray-400 bg-gray-100'}`}>{note.time}</p>
              </div>
              <p className={`text-xs leading-relaxed font-medium ${darkModeEnabled ? 'text-gray-400' : 'text-gray-600'}`}>{note.message}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-12 text-center">
            <p className="text-3xl mb-3 opacity-30">📭</p>
            <p className={`text-sm font-bold ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>All caught up!</p>
            <p className="text-xs text-gray-500 mt-1">No new notifications for now.</p>
          </div>
        )}
      </div>
      <div className={`border-t px-4 py-3 text-center rounded-b-2xl ${darkModeEnabled ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100/50 bg-gray-50/30'}`}>
        <button className={`text-xs font-bold uppercase tracking-wide transition-colors ${darkModeEnabled ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`} onClick={onClose}>View all history</button>
      </div>
    </div>
  );
}

// --- Header Component ---
function MobileHeader({ theme, onMenuClick, onBellClick, showDot }: { theme: 'zed' | 'mtn' | 'airtel', onMenuClick: () => void, onBellClick: () => void, showDot: boolean }) {
  const themeClasses = {
    zed: 'from-indigo-600 via-purple-600 to-violet-600 shadow-indigo-500/20',
    mtn: 'from-yellow-400 via-orange-400 to-amber-500 shadow-yellow-500/20 text-gray-900',
    airtel: 'from-red-500 via-rose-500 to-pink-600 shadow-red-500/20',
  };
  const themeClass = themeClasses[theme] || 'from-indigo-600 to-violet-600';
  const textColor = theme === 'mtn' ? 'text-gray-900' : 'text-white';
  const iconBg = theme === 'mtn' ? 'bg-black/10 hover:bg-black/20' : 'bg-white/10 hover:bg-white/20';

  return (
    <div className={`relative flex items-center justify-between px-6 py-5 bg-linear-to-r ${themeClass} shadow-lg transition-all duration-500 z-40`}>
      <button onClick={onMenuClick} className={`rounded-full p-2.5 transition-all active:scale-95 ${iconBg} ${textColor} backdrop-blur-sm`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <h1 className={`text-lg font-bold tracking-tight select-none ${textColor}`}>DataWallet</h1>
      
      <button onClick={onBellClick} className={`relative rounded-full p-2.5 transition-all active:scale-95 ${iconBg} ${textColor} backdrop-blur-sm`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {showDot && (
          <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 ring-2 ring-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}

// --- MOCK NOTIFICATIONS ---
const ALL_NOTIFICATIONS: Notification[] = [
  { id: 1, operator: 'zedmobile', title: 'Bundle Expiring', message: 'Your 10GB bundle expires in 3 days.', time: '2h ago', type: 'warning' },
  { id: 2, operator: 'zedmobile', title: 'Data Gift Received', message: 'You received 500MB from 097...123', time: '5h ago', type: 'success' },
  { id: 3, operator: 'mtn', title: 'Weekly Report', message: 'You saved 1.2GB on MTN this week!', time: '1d ago', type: 'info' },
  { id: 4, operator: 'airtel', title: 'Rollover Success', message: '300MB rolled over from last week.', time: '2d ago', type: 'success' },
  { id: 5, operator: 'zedmobile', title: 'Auto-Renew Active', message: 'Your bundle will renew on Friday.', time: '3d ago', type: 'info' },
  { id: 6, operator: 'mtn', title: 'New Offer', message: 'Get 5GB extra on your next recharge.', time: '4h ago', type: 'info' },
];

export default function Home() {
  const { darkModeEnabled } = useTheme();
  const [operator, setOperator] = useState<'zedmobile' | 'mtn' | 'airtel'>('zedmobile');
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({ title: '', amount: '', type: 'data' as 'data' | 'money', action: () => {} });
  
  const currentNotifications = ALL_NOTIFICATIONS.filter(n => n.operator === operator);
  const hasUnread = currentNotifications.length > 0;
  const showToast = (msg: string) => setToastMsg(msg);

  const handleBellClick = () => { setIsNotificationsOpen(!isNotificationsOpen); setIsMenuOpen(false); };
  const handleMenuClick = () => { setIsMenuOpen(!isMenuOpen); setIsNotificationsOpen(false); };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('main') && !target.closest('button')) {
        setIsNotificationsOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setIsNotificationsOpen(false);
      setIsMenuOpen(false);
      try {
        const res = await fetch(`/api/user/${operator}`);
        if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
        const accountData = await res.json();
        if ('error' in accountData) throw new Error(accountData.error);
        setData(accountData);
      } catch (err) {
        let message = 'An unknown error occurred.';
        if (err instanceof Error) message = err.message;
        console.error(err);
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [operator]);

  // Logic to execute AFTER modal confirmation
  const executeGift = () => {
    if (!data) return;
    setData({ ...data, walletBalanceMB: data.walletBalanceMB - 500 });
    showToast(`Successfully gifted 500 MB!`);
  };

  const executeApply = () => {
    if (!data || !data.bundle) return;
    setData({
      ...data,
      walletBalanceMB: data.walletBalanceMB - 250,
      bundle: { ...data.bundle, remainingMB: data.bundle.remainingMB + 250 }
    });
    showToast(`Applied 250 MB to your bundle!`);
  };

  // Button Click Handlers -> Open Modal
  const handleGiftClick = () => {
    if (!data) return;
    if (data.walletBalanceMB < 500) { showToast("Insufficient balance!"); return; }
    
    setPaymentConfig({
      title: 'Gift Data',
      amount: '500 MB',
      type: 'data',
      action: executeGift
    });
    setIsPaymentModalOpen(true);
  };

  const handleApplyClick = () => {
    if (!data || !data.bundle) return;
    if (data.walletBalanceMB < 250) { showToast("Insufficient balance!"); return; }

    setPaymentConfig({
      title: 'Apply to Bundle',
      amount: '250 MB',
      type: 'data',
      action: executeApply
    });
    setIsPaymentModalOpen(true);
  };

  // Handle "Purchase Bundle" click (Empty State)
  const handlePurchaseClick = () => {
    setPaymentConfig({
      title: 'Purchase Bundle',
      amount: 'K50.00',
      type: 'money',
      action: () => {
        // Optimistic update for purchase: add a fake bundle
        setData(prev => prev ? ({
          ...prev,
          bundle: { name: "New 5GB Bundle", remainingMB: 5000, expiryDays: 30 }
        }) : null);
        showToast("Bundle purchased successfully!");
      }
    });
    setIsPaymentModalOpen(true);
  };

  const themeConfig = {
    zed: { 
      bg: 'bg-indigo-50/50', 
      text: 'text-indigo-950', 
      accent: 'bg-indigo-600', 
      button: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30', 
      toggle: 'peer-checked:bg-indigo-600' 
    },
    mtn: { 
      bg: 'bg-yellow-50/50', 
      text: 'text-yellow-950', 
      accent: 'bg-yellow-500', 
      button: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-yellow-500/30', 
      toggle: 'peer-checked:bg-yellow-500' 
    },
    airtel: { 
      bg: 'bg-red-50/50', 
      text: 'text-red-950', 
      accent: 'bg-red-600', 
      button: 'bg-red-600 hover:bg-red-700 shadow-red-500/30', 
      toggle: 'peer-checked:bg-red-600' 
    },
  };
  const currentTheme = themeConfig[data?.theme || 'zed'];
  const formatMBtoGB = (mb: number) => (mb / 1000).toFixed(2);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-700 ${darkModeEnabled ? 'bg-gray-900' : currentTheme.bg}`}>
      
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={async () => { await new Promise(r => setTimeout(r, 1500)); paymentConfig.action(); }}
        title={paymentConfig.title}
        amount={paymentConfig.amount}
        type={paymentConfig.type}
      />

      <div className={`w-full max-w-lg overflow-hidden rounded-4xl backdrop-blur-2xl shadow-2xl ring-1 transition-all duration-500 relative min-h-[720px] flex flex-col ${darkModeEnabled ? 'bg-gray-800/90 ring-white/10 border-gray-700' : 'bg-white/90 ring-white/60 border border-white/40'}`}>
        
        <MobileHeader theme={data?.theme || 'zed'} onMenuClick={handleMenuClick} onBellClick={handleBellClick} showDot={hasUnread} />
        <MenuDropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} darkModeEnabled={darkModeEnabled} />
        <NotificationsDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={currentNotifications} darkModeEnabled={darkModeEnabled} />

        <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
          <div className="p-6 pb-2">
            <label htmlFor="operatorSelector" className={`mb-2 block text-[10px] font-extrabold uppercase tracking-widest pl-1 ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>Active Operator</label>
            <div className="relative group">
              <select
                id="operatorSelector"
                value={operator}
                onChange={(e) => setOperator(e.target.value as 'zedmobile' | 'mtn' | 'airtel')}
                className={`block w-full appearance-none rounded-2xl border px-5 py-4 pr-10 text-sm font-bold transition-all focus:ring-4 focus:outline-none cursor-pointer ${darkModeEnabled ? 'bg-gray-700/50 border-gray-600 text-gray-200 focus:border-indigo-500 focus:bg-gray-700 hover:bg-gray-700 hover:border-gray-500' : 'bg-gray-50/50 border-gray-200/80 text-gray-700 focus:border-indigo-500 focus:bg-white hover:bg-gray-50 hover:border-gray-300'}`}
              >
                <option value="zedmobile">ZedMobile</option>
                <option value="mtn">MTN</option>
                <option value="airtel">Airtel</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400 group-hover:text-indigo-600 transition-colors">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex h-80 items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className={`h-12 w-12 animate-spin rounded-full border-[3px] border-t-current ${darkModeEnabled ? 'border-gray-700 text-gray-300' : `border-gray-100 ${currentTheme.text}`}`}></div>
                <div className={`text-xs font-bold uppercase tracking-widest animate-pulse ${darkModeEnabled ? 'text-gray-500' : 'text-gray-300'}`}>Loading wallet...</div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex h-80 items-center justify-center p-8">
              <div className={`rounded-3xl border p-8 text-center w-full backdrop-blur-sm ${darkModeEnabled ? 'bg-red-900/10 border-red-900/30' : 'bg-red-50/50 border-red-100'}`}>
                <div className="mb-4 text-4xl">⚠️</div>
                <h3 className={`mb-2 font-bold ${darkModeEnabled ? 'text-red-400' : 'text-red-900'}`}>Connection Error</h3>
                <p className={`text-sm mb-6 font-medium ${darkModeEnabled ? 'text-red-300/80' : 'text-red-600/80'}`}>{error}</p>
                <button onClick={() => window.location.reload()} className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold shadow-sm transition-colors border ${darkModeEnabled ? 'bg-red-900/20 border-red-800 text-red-300 hover:bg-red-900/40' : 'bg-white border-red-100 text-red-600 hover:bg-red-50'}`}>Try Again</button>
              </div>
            </div>
          )}

          {!loading && !error && data && (
            <div className="flex flex-col gap-6 p-6 pt-2">
              {/* Wallet Balance Card */}
              <div className={`relative overflow-hidden rounded-4xl p-8 text-center shadow-xl group cursor-default border ${darkModeEnabled ? 'bg-gray-700/30 border-gray-600/50 shadow-black/20' : 'bg-white border-gray-100 shadow-gray-200/40'}`}>
                <div className={`absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-700 ${currentTheme.accent} ${darkModeEnabled ? 'opacity-10' : 'opacity-5'}`}></div>
                <div className={`absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-700 ${currentTheme.accent} ${darkModeEnabled ? 'opacity-10' : 'opacity-5'}`}></div>
                
                <span className={`relative z-10 block text-[10px] font-bold uppercase tracking-widest ${darkModeEnabled ? 'text-gray-400' : 'text-gray-400'}`}>Wallet Balance</span>
                <div className="relative z-10 mt-3 flex items-baseline justify-center">
                  <span className={`text-7xl font-black tracking-tighter transition-colors duration-300 drop-shadow-sm ${darkModeEnabled ? 'text-white' : currentTheme.text}`}>
                    {formatMBtoGB(data.walletBalanceMB)}
                  </span>
                  <span className={`ml-2 text-2xl font-bold ${darkModeEnabled ? 'text-gray-500' : 'text-gray-300'}`}>GB</span>
                </div>
                <div className="relative z-10 mt-5 flex justify-center">
                   <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide border backdrop-blur-sm ${darkModeEnabled ? 'bg-gray-800/80 text-gray-400 border-gray-600' : 'bg-gray-50 text-gray-500 border-gray-100/80'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${currentTheme.accent}`}></span>
                      Available
                   </span>
                </div>
              </div>

              {/* Insights Chart (NEW) */}
              <div className={`rounded-4xl p-6 border ${darkModeEnabled ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkModeEnabled ? 'text-gray-400' : 'text-gray-400'}`}>Usage Trends (Last 7 Days)</h3>
                <div className="flex items-end justify-between gap-2 h-24">
                  {[40, 60, 20, 80, 50, 70, 90].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex items-end h-full">
                        <div 
                          className={`w-full rounded-t-sm transition-all duration-500 ${darkModeEnabled ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-indigo-100'}`} 
                          style={{ height: `${height}%` }}
                        >
                           <div className={`w-full rounded-t-sm transition-all duration-1000 delay-100 ${currentTheme.accent} opacity-80`} style={{ height: '100%' }}></div>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                          {height * 10} MB
                        </div>
                      </div>
                      <span className={`text-[8px] font-bold uppercase ${darkModeEnabled ? 'text-gray-600' : 'text-gray-400'}`}>
                        {['M','T','W','T','F','S','S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Bundle Section */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                   <h2 className={`text-[10px] font-extrabold uppercase tracking-widest ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>Active Bundle</h2>
                </div>
                
                {data.bundle ? (
                  <div className={`group relative overflow-hidden rounded-4xl border p-6 shadow-sm transition-all duration-300 ${darkModeEnabled ? 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50' : 'bg-white border-gray-100 hover:shadow-lg hover:shadow-gray-200/40'}`}>
                    <div className={`absolute left-0 top-0 h-full w-1.5 ${currentTheme.accent} transition-colors duration-300`}></div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`font-bold text-lg ${darkModeEnabled ? 'text-white' : 'text-gray-900'}`}>{data.bundle.name}</div>
                      <span className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide border ${darkModeEnabled ? 'bg-red-900/20 text-red-400 border-red-900/30' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {data.bundle.expiryDays} days left
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className={`flex justify-between text-xs font-bold uppercase tracking-wide ${darkModeEnabled ? 'text-gray-400' : 'text-gray-400'}`}>
                         <span>Usage</span>
                         <span>{Math.round((data.bundle.remainingMB / 10000) * 100)}%</span>
                      </div>
                      <div className={`h-3 w-full rounded-full overflow-hidden ring-1 ${darkModeEnabled ? 'bg-gray-600 ring-gray-600' : 'bg-gray-100 ring-gray-100'}`}>
                        <div className={`h-full rounded-full ${currentTheme.accent} transition-all duration-1000 ease-out`} style={{ width: `${(data.bundle.remainingMB / 10000) * 100}%` }}></div>
                      </div>
                      <div className={`text-right text-xs font-bold ${darkModeEnabled ? 'text-gray-300' : 'text-gray-900'}`}>
                         {formatMBtoGB(data.bundle.remainingMB)} GB <span className="text-gray-500 font-medium">/ 10.00 GB</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center rounded-4xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer group ${darkModeEnabled ? 'border-gray-600 bg-gray-700/20 hover:bg-gray-700/40' : 'border-gray-200/80 bg-white/50 hover:bg-white hover:border-gray-300'}`} onClick={handlePurchaseClick}>
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-all ${darkModeEnabled ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300' : 'bg-gray-100 text-gray-400 group-hover:scale-110 group-hover:bg-gray-200 group-hover:text-gray-600'}`}>
                       <span className="text-3xl pb-1 font-light">+</span>
                    </div>
                    <span className={`text-sm font-bold ${darkModeEnabled ? 'text-gray-400' : 'text-gray-600'}`}>No Active Bundle</span>
                    <span className={`text-xs font-bold mt-1 uppercase tracking-wide ${darkModeEnabled ? 'text-indigo-400' : currentTheme.text.replace('950', '600')}`}>Tap to purchase</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleGiftClick}
                  className={`group relative overflow-hidden flex flex-col items-center justify-center rounded-4xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none ${currentTheme.button}`}
                  disabled={data.walletBalanceMB <= 0}
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="mb-3 rounded-2xl bg-white/20 p-3.5 transition-transform group-hover:scale-110 group-active:scale-95 backdrop-blur-sm shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold tracking-wide">Gift Data</span>
                </button>

                <button
                  onClick={handleApplyClick}
                  className={`group flex flex-col items-center justify-center rounded-4xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${darkModeEnabled ? 'bg-gray-700/30 border-gray-600 text-gray-300 hover:border-gray-500 hover:shadow-black/20' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:shadow-gray-200/50'}`}
                  disabled={!data.bundle}
                >
                  <div className={`mb-3 rounded-2xl p-3.5 transition-transform group-hover:scale-110 group-active:scale-95 ${darkModeEnabled ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-gray-300' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9H4V4m.582 5H19a8.001 8.001 0 01-14.418 5H4v5h.582m15.356-2a8.001 8.001 0 00-14.418-5H20v5h-.582" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold tracking-wide">Apply Data</span>
                </button>
              </div>

              {/* Auto-Renewal Toggle */}
              <div className="pb-2">
                <div className={`flex items-center justify-between rounded-4xl border p-6 shadow-sm transition-colors group ${darkModeEnabled ? 'bg-gray-700/30 border-gray-600 hover:border-indigo-500/50' : 'bg-white border-gray-100 hover:border-indigo-50'}`}>
                  <div className="flex flex-col gap-1.5">
                    <span className={`font-bold transition-colors ${darkModeEnabled ? 'text-gray-200 group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-900'}`}>Auto-Renew</span>
                    <span className={`text-xs font-medium ${darkModeEnabled ? 'text-gray-500' : 'text-gray-400'}`}>Save unused data automatically</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={data.autoRenew}
                      onChange={(e) => {
                        setData({...data, autoRenew: e.target.checked});
                        showToast(`Auto-renew ${e.target.checked ? 'Enabled' : 'Disabled'}`);
                      }} 
                    />
                    <div className={`peer h-9 w-16 rounded-full after:absolute after:left-1 after:top-1 after:h-7 after:w-7 after:rounded-full after:shadow-md after:transition-all peer-checked:after:translate-x-7 ${currentTheme.toggle} transition-colors duration-300 ${darkModeEnabled ? 'bg-gray-800 after:bg-gray-300' : 'bg-gray-200 after:bg-white'}`}></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Footer / Branding --- */}
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