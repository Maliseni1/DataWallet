// This file acts as our mock database

// --- Types ---
export interface Bundle {
  name: string;
  remainingMB: number;
  expiryDays: number;
}

export interface AccountData {
  walletBalanceMB: number;
  autoRenew: boolean;
  bundle: Bundle | null;
  theme: 'zed' | 'mtn' | 'airtel'; // For theming
}

export interface UserAccounts {
  zedmobile: AccountData;
  mtn: AccountData;
  airtel: AccountData;
}

// --- Database ---
export const db: { accounts: UserAccounts } = {
  accounts: {
    'zedmobile': {
      walletBalanceMB: 1250,
      autoRenew: false,
      bundle: {
        name: "10GB Monthly (Zed)",
        remainingMB: 6700,
        expiryDays: 3
      },
      theme: 'zed'
    },
    'mtn': {
      walletBalanceMB: 500,
      autoRenew: true,
      bundle: {
        name: "5GB Weekly (MTN)",
        remainingMB: 1200,
        expiryDays: 1
      },
      theme: 'mtn'
    },
    'airtel': {
      walletBalanceMB: 0,
      autoRenew: false,
      bundle: null, // No active bundle
      theme: 'airtel'
    }
  }
};