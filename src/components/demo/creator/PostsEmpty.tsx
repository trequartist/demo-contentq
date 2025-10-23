"use client";

import { motion } from 'framer-motion';
import { FileText, Calendar, Target, Zap, PenTool, Sparkles } from 'lucide-react';

interface PostsEmptyProps {
  onStart: (prompt: string) => void;
  onBrowseCalendar: () => void;
  onBrowseDocuments: () => void;
}

export function PostsEmpty({ onStart, onBrowseCalendar, onBrowseDocuments }: PostsEmptyProps) {
  const contentActions = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "AI-Optimized Content",
      description: "Create content that gets cited by AI assistants",
      prompt: "Write about AI automation for small businesses",
      color: "from-blue-500 to-blue-600",
      type: "primary"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Authority Building",
      description: "Establish thought leadership in your niche",
      prompt: "Create a comprehensive guide on content marketing trends",
      color: "from-purple-500 to-purple-600",
      type: "secondary"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Wins",
      description: "High-impact content for immediate results",
      prompt: "Write a viral LinkedIn post about productivity",
      color: "from-orange-500 to-orange-600",
      type: "secondary"
    }
  ];

  const quickActions = [
    {
      icon: <Calendar className="w-4 h-4" />,
      title: "Browse Calendar",
      description: "Explore scheduled content ideas",
      action: onBrowseCalendar,
      color: "text-green-600"
    },
    {
      icon: <PenTool className="w-4 h-4" />,
      title: "Browse Documents",
      description: "Use existing content as reference",
      action: onBrowseDocuments,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create AI-Native Content
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate content that gets cited by AI assistants, dominates search results, and drives real business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contentActions.map((action, index) => (
              <motion.button
                key={action.title}
                onClick={() => onStart(action.prompt)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden w-full rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  action.type === 'primary' 
                    ? 'bg-white border-gray-100' 
                    : 'bg-white/80 border-gray-100'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" 
                     style={{ background: `linear-gradient(135deg, ${action.color})` }} />
                
                <div className="relative flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    {action.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {action.title}
                      </h3>
                      {action.type === 'primary' && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>Recommended</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 group-hover:text-gray-500 transition-colors">
                      {action.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                      <span>Start Writing</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Quick Actions Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    onClick={action.action}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">AI-Powered</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                All content is optimized for AI visibility and search engine performance.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Ready to create content that gets cited by AI</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
