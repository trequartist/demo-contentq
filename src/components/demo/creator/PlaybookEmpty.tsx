"use client";

import { motion } from 'framer-motion';
import { BookOpen, Calendar, Target, Zap, Users, TrendingUp } from 'lucide-react';

interface PlaybookEmptyProps {
  onStart: (prompt: string) => void;
}

export function PlaybookEmpty({ onStart }: PlaybookEmptyProps) {
  const playbookActions = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Strategic Playbook",
      description: "Comprehensive content strategy blueprint",
      prompt: "I want to create a playbook for product launch",
      color: "from-blue-500 to-blue-600",
      features: ["AI-Native Strategy", "Content Calendar", "Authority Building"]
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Campaign Calendar",
      description: "4-week content campaign timeline",
      prompt: "Build a four-week campaign calendar for this launch",
      color: "from-green-500 to-green-600",
      features: ["Weekly Themes", "Content Types", "Distribution Plan"]
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Authority Focus",
      description: "AI visibility optimization strategy",
      prompt: "Create an AI authority building playbook",
      color: "from-purple-500 to-purple-600",
      features: ["SEO Optimization", "AI Citations", "Search Domination"]
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Launch",
      description: "Rapid deployment strategy",
      prompt: "Generate a quick launch playbook",
      color: "from-orange-500 to-orange-600",
      features: ["Fast Setup", "Quick Wins", "Immediate Impact"]
    }
  ];

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Strategic Content Playbooks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create comprehensive content strategies that accelerate your market authority and drive real business results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {playbookActions.map((action, index) => (
            <motion.button
              key={action.title}
              onClick={() => onStart(action.prompt)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" 
                   style={{ background: `linear-gradient(135deg, ${action.color})` }} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {action.title}
                </h3>
                
                <p className="text-gray-600 mb-6 group-hover:text-gray-500 transition-colors leading-relaxed">
                  {action.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {action.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                    <span>Create Playbook</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-400">
                    ~3-5 min
                  </div>
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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ creators</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Ready to build your strategy</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
