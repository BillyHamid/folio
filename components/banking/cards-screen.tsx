"use client";

import { motion } from "framer-motion";

interface Card {
  id: string;
  type: string;
  number: string;
  balance: number;
  color: string;
  isActive: boolean;
}

interface CardsScreenProps {
  currencySymbol: string;
}

const mockCards: Card[] = [
  {
    id: "1",
    type: "VISA",
    number: "**** **** **** 1234",
    balance: 8690.25,
    color: "from-orange-400 to-orange-600",
    isActive: true
  },
  {
    id: "2", 
    type: "MASTERCARD",
    number: "**** **** **** 5678",
    balance: 2450.80,
    color: "from-blue-400 to-blue-600",
    isActive: false
  },
  {
    id: "3",
    type: "VISA",
    number: "**** **** **** 9012",
    balance: 0.00,
    color: "from-gray-400 to-gray-600",
    isActive: false
  }
];

export function CardsScreen({ currencySymbol }: CardsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">My Cards</h1>
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Cards List */}
      <div className="px-4 py-6 space-y-4">
        {mockCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-white/80 text-sm mb-1">Balance</p>
                  <h2 className="text-2xl font-bold">
                    {currencySymbol}{card.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </h2>
                </div>
                <div className={`px-3 py-1 rounded-full ${card.isActive ? 'bg-green-500' : 'bg-white/20'}`}>
                  <span className="text-xs font-medium">
                    {card.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white/80 text-sm mb-1">Card Number</p>
                <p className="text-lg font-mono tracking-wider">{card.number}</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-xs mb-1">Valid Thru</p>
                  <p className="text-sm font-medium">12/28</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{card.type}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🔒</span>
              </div>
              <span className="font-medium text-gray-700">Freeze Card</span>
            </button>
            
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">⚙️</span>
              </div>
              <span className="font-medium text-gray-700">Settings</span>
            </button>
            
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <span className="font-medium text-gray-700">Spending</span>
            </button>
            
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <span className="font-medium text-gray-700">Limits</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}