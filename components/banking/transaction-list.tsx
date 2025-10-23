"use client";

import { motion } from "framer-motion";

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  icon: string;
  category: 'atm' | 'transfer' | 'grocery' | 'other';
}

interface TransactionListProps {
  transactions: Transaction[];
  currencySymbol: string;
}

const categoryIcons = {
  atm: "🏧",
  transfer: "💸",
  grocery: "🛒",
  other: "💳"
};

const categoryColors = {
  atm: "bg-blue-100 text-blue-600",
  transfer: "bg-green-100 text-green-600", 
  grocery: "bg-purple-100 text-purple-600",
  other: "bg-gray-100 text-gray-600"
};

export function TransactionList({ transactions, currencySymbol }: TransactionListProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
        <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
          See all
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[transaction.category]}`}>
                <span className="text-lg">{categoryIcons[transaction.category]}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{transaction.title}</h4>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                {transaction.type === 'credit' ? '+' : ''}{currencySymbol}{Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}