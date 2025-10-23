"use client";

import { useState } from "react";
import { BalanceCard } from "./balance-card";
import { GoalCard } from "./goal-card";
import { TransactionList } from "./transaction-list";
import { BottomNavigation } from "./bottom-navigation";
import { CardsScreen } from "./cards-screen";
import { SendMoneyScreen } from "./send-money-screen";
import { ProfileScreen } from "./profile-screen";
import { ProfileScreen } from "./profile-screen";

// Mock data - in a real app this would come from an API
const mockTransactions = [
  {
    id: "1",
    title: "217 Linda Dr. ATM",
    description: "Cash withdrawal",
    amount: -50.00,
    date: "15 March",
    type: "debit" as const,
    icon: "🏧",
    category: "atm" as const
  },
  {
    id: "2", 
    title: "To your GBP balance",
    description: "Transfer received",
    amount: 100.00,
    date: "12 March",
    type: "credit" as const,
    icon: "💸",
    category: "transfer" as const
  },
  {
    id: "3",
    title: "Grocery store",
    description: "Food & beverages",
    amount: -15.00,
    date: "11 March", 
    type: "debit" as const,
    icon: "🛒",
    category: "grocery" as const
  }
];

export function BankingDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render different screens based on active tab
  if (activeTab === "cards") {
    return (
      <div>
        <CardsScreen currencySymbol="£" />
        <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
      </div>
    );
  }

  if (activeTab === "send") {
    return (
      <div>
        <SendMoneyScreen currencySymbol="£" />
        <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
      </div>
    );
  }

  if (activeTab === "profile") {
    return (
      <div>
        <ProfileScreen userName="Christian" userEmail="christian@example.com" />
        <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
      </div>
    );
  }

  if (activeTab === "profile") {
    return (
      <div>
        <ProfileScreen userName="Christian" />
        <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
      </div>
    );
  }

  // Default home screen
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="w-6"></div>
        <h1 className="text-lg font-semibold text-gray-900">Banking</h1>
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Balance Card */}
        <BalanceCard
          balance={8690.25}
          currency="GBP"
          currencySymbol="£"
          userName="Christian"
        />

        {/* Goal Card */}
        <GoalCard
          title="Vacation Goal"
          currentAmount={925.50}
          targetAmount={3500.00}
          currencySymbol="£"
          icon="🌴"
        />

        {/* Transaction List */}
        <TransactionList
          transactions={mockTransactions}
          currencySymbol="£"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💸</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Send</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📥</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Receive</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💳</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Cards</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Analytics</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onTabChange={handleTabChange} activeTab={activeTab} />
    </div>
  );
}