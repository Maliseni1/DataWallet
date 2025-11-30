import type { Config } from 'tailwindcss'

const config: Config = {
  // THIS IS THE FIX:
  // We are replacing the old, multi-line 'content' array
  // with the single, correct path for Tailwind v4.
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // --- ZedMobile (Purple/Indigo) ---
        'zed': {
          DEFAULT: '#6366F1', // indigo-500
          light: '#A5B4FC',   // indigo-300
          dark: '#4F46E5',    // indigo-600
        },
        // --- MTN (Yellow) ---
        'mtn': {
          DEFAULT: '#FACC15', // yellow-400
          light: '#FDE047',   // yellow-300
          dark: '#EAB308',    // yellow-500
        },
        // --- Airtel (Red) ---
        'airtel': {
          DEFAULT: '#EF4444', // red-500
          light: '#FCA5A5',   // red-300
          dark: '#DC2626',    // red-600
        },
      },
    },
  },
  plugins: [],
}
export default config