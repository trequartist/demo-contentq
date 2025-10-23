"use client";

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface DiagnosticsEmptyProps {
  onStart: (prompt: string) => void;
}

export function DiagnosticsEmpty({ onStart }: DiagnosticsEmptyProps) {
  const quickActions = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Full System Audit",
      description: "Comprehensive AI visibility analysis",
      prompt: "Run comprehensive diagnostics for my system",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Performance Check",
      description: "Quick health assessment",
      prompt: "Run a quick system health check",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Gap Analysis",
      description: "SEO & AI optimization opportunities",
      prompt: "Analyze performance metrics",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Insights",
      description: "Key findings and recommendations",
      prompt: "Reveal key insights from my diagnostics",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Visibility Diagnostics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get comprehensive insights into your AI authority score, search performance, and optimization opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              onClick={() => onStart(action.prompt)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" 
                   style={{ background: `linear-gradient(135deg, ${action.color})` }} />
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {action.title}
                </h3>
                
                <p className="text-gray-600 mb-4 group-hover:text-gray-500 transition-colors">
                  {action.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                  <span>Start Analysis</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Ready to analyze your AI visibility</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
