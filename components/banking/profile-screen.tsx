"use client";

import { motion } from "framer-motion";

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
}

const menuItems = [
  {
    id: "account",
    title: "Account Settings",
    description: "Manage your account details",
    icon: "⚙️",
    color: "bg-blue-100"
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Password, PIN, and biometrics",
    icon: "🔒",
    color: "bg-green-100"
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage your notification preferences",
    icon: "🔔",
    color: "bg-purple-100"
  },
  {
    id: "support",
    title: "Help & Support",
    description: "Get help or contact support",
    icon: "💬",
    color: "bg-orange-100"
  },
  {
    id: "about",
    title: "About",
    description: "App version and legal information",
    icon: "ℹ️",
    color: "bg-gray-100"
  }
];

export function ProfileScreen({ userName, userEmail }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="w-6"></div>
        <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white px-4 py-8 border-b border-gray-100"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
            <p className="text-gray-500">{userEmail}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">Verified Account</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
          >
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-500">Active Cards</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
          >
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="text-sm text-gray-500">Transactions</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
          >
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-500">Goals</div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="w-full mt-8 py-4 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-colors"
        >
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}