"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
  primary?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Link
          key={action.id}
          href={action.action}
          className={`
            group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]
            ${action.primary 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl' 
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
            }
          `}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Background decoration */}
          <div className={`
            absolute inset-0 opacity-10
            ${action.primary ? 'bg-white' : 'bg-gradient-to-br from-blue-500 to-purple-500'}
          `}>
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-current opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-current opacity-20 blur-2xl"></div>
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className={`
              mb-4 text-3xl
              ${action.primary ? 'animate-pulse' : ''}
            `}>
              {action.icon}
            </div>

            {/* Title */}
            <h3 className={`
              text-lg font-semibold mb-2
              ${action.primary ? 'text-white' : 'text-gray-900 dark:text-white'}
            `}>
              {action.title}
            </h3>

            {/* Description */}
            <p className={`
              text-sm mb-4
              ${action.primary ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}
            `}>
              {action.description}
            </p>

            {/* Arrow */}
            <div className={`
              inline-flex items-center text-sm font-medium transition-transform group-hover:translate-x-1
              ${action.primary ? 'text-white' : 'text-blue-600 dark:text-blue-400'}
            `}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>

          {/* Hover effect */}
          {action.primary && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
