"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastTransaction?: string;
}

interface SendMoneyScreenProps {
  currencySymbol: string;
}

const recentContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah",
    avatar: "👩‍💼",
    lastTransaction: "£25.00"
  },
  {
    id: "2", 
    name: "Mike",
    avatar: "👨‍💻",
    lastTransaction: "£150.00"
  },
  {
    id: "3",
    name: "Emma",
    avatar: "👩‍🎨",
    lastTransaction: "£75.50"
  },
  {
    id: "4",
    name: "John",
    avatar: "👨‍🏫",
    lastTransaction: "£200.00"
  }
];

export function SendMoneyScreen({ currencySymbol }: SendMoneyScreenProps) {
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Send Money</h1>
        <div className="w-6"></div>
      </div>

      {/* Amount Input */}
      <div className="px-4 py-8 bg-white">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-2">Amount to send</p>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-light text-gray-400">{currencySymbol}</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-4xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-40"
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {["10", "25", "50", "100"].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {currencySymbol}{preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {recentContacts.map((contact, index) => (
            <motion.button
              key={contact.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedContact(contact.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-colors ${
                selectedContact === contact.id 
                  ? 'bg-orange-100 border-2 border-orange-500' 
                  : 'bg-white border-2 border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {contact.avatar}
              </div>
              <span className="text-xs font-medium text-gray-700">{contact.name}</span>
              {contact.lastTransaction && (
                <span className="text-xs text-gray-400">{contact.lastTransaction}</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Add New Contact */}
        <button className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">Add new contact</p>
            <p className="text-sm text-gray-500">Send money to someone new</p>
          </div>
        </button>
      </div>

      {/* Send Button */}
      <div className="px-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={!amount || !selectedContact}
          className={`w-full py-4 rounded-2xl font-semibold text-white transition-colors ${
            amount && selectedContact
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Send {amount ? `${currencySymbol}${amount}` : 'Money'}
        </motion.button>
      </div>
    </div>
  );
}