"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface BottomNavigationProps {
  onTabChange?: (tabId: string) => void;
  activeTab?: string;
}

export function BottomNavigation({ onTabChange, activeTab: propActiveTab }: BottomNavigationProps) {
  const [internalActiveTab, setInternalActiveTab] = useState("home");
  const activeTab = propActiveTab || internalActiveTab;

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      id: "cards",
      label: "Cards",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zm14 5H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM2 8h16V6H2v2zm2 3a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: "send",
      label: "Send",
      icon: (
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: "more",
      label: "More",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      )
    }
  ];

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
              activeTab === item.id ? 'text-orange-500' : 'text-gray-400'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {item.id === 'send' ? (
              item.icon
            ) : (
              <div className={activeTab === item.id ? 'text-orange-500' : 'text-gray-400'}>
                {item.icon}
              </div>
            )}
            <span className="text-xs font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}