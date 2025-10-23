"use client";

import { motion } from 'framer-motion';
import { BarChart3, Brain, Target, Zap, CheckCircle } from 'lucide-react';

interface DiagnosticsStreamingProps {
  message: string;
}

export function DiagnosticsStreaming({ message }: DiagnosticsStreamingProps) {
  const steps = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Analyzing System",
      description: "Scanning your AI visibility metrics",
      status: "active"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Processing Data",
      description: "Evaluating performance indicators",
      status: "pending"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Identifying Gaps",
      description: "Finding optimization opportunities",
      status: "pending"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Generating Insights",
      description: "Creating actionable recommendations",
      status: "pending"
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
            Running Diagnostics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {message}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  step.status === 'active' 
                    ? 'bg-blue-50 border border-blue-200' 
                    : step.status === 'completed'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  step.status === 'active' 
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : step.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : step.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    step.status === 'active' 
                      ? 'text-blue-900' 
                      : step.status === 'completed'
                      ? 'text-green-900'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    step.status === 'active' 
                      ? 'text-blue-600' 
                      : step.status === 'completed'
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {step.status === 'active' && (
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">This may take a few moments...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
