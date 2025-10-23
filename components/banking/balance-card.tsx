"use client";

import { motion } from "framer-motion";

interface BalanceCardProps {
  balance: number;
  currency: string;
  currencySymbol: string;
  userName: string;
}

export function BalanceCard({ balance, currency, currencySymbol, userName }: BalanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 text-white shadow-xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-orange-100 text-sm mb-1">Hello,</p>
          <h2 className="text-xl font-semibold">{userName} 👋</h2>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
          <div className="w-6 h-4 rounded-sm bg-white flex items-center justify-center">
            <span className="text-xs font-bold text-orange-600">🇬🇧</span>
          </div>
          <span className="text-sm font-medium">{currency}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-orange-100 text-sm mb-1">Available balance</p>
        <h1 className="text-4xl font-bold">
          {currencySymbol}{balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-12 h-8 bg-orange-500 rounded-md flex items-center justify-center">
          <span className="text-xs font-bold">VISA</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}