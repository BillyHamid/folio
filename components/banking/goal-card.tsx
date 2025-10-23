"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GoalCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  currencySymbol: string;
  icon: string;
}

export function GoalCard({ title, currentAmount, targetAmount, currencySymbol, icon }: GoalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = (currentAmount / targetAmount) * 100;
  const remainingAmount = targetAmount - currentAmount;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-lg">{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              {currencySymbol}{currentAmount.toFixed(2)} from {currencySymbol}{targetAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <motion.svg 
          className="w-5 h-5 text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </motion.svg>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{progress.toFixed(1)}% complete</span>
          <span>{currencySymbol}{remainingAmount.toFixed(2)} to go</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-green-500 h-2 rounded-full"
          />
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monthly target</span>
            <span className="font-medium">{currencySymbol}{(targetAmount / 12).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated completion</span>
            <span className="font-medium">8 months</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              Add Money
            </button>
            <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Edit Goal
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}