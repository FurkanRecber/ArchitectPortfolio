/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VURGU RENGİ: Elektrik Mavisi (Logolar ve Butonlar için)
        accent: {
          500: '#3b82f6',
          600: '#136dec', // Senin resimdeki o canlı mavi
        },
        // ZEMİN RENKLERİ: Dümdüz siyah değil, hafif petrol mavisi tonlu modern renkler
        zinc: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#0d1218', // Studio Bölümü (Orta Koyu)
          900: '#0a0f16', // Footer (En Koyu)
          950: '#101822', // ANA GÖVDE (Selected Works ve Hero arkası)
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}