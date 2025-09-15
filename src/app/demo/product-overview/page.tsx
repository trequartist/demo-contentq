"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Search,
  FileText,
  BarChart3,
  Edit3,
  Target,
  Check,
  RefreshCw,
  Brain,
  Activity,
  Database,
  ArrowRight,
  Sparkles,
  User,
  Zap,
  GitBranch,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentData {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  capabilities: string[];
  color: string;
}

export default function ProductOverviewPage() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<number>(0);

  const agents: AgentData[] = [
    {
      id: 'research',
      icon: <Search className="w-5 h-5" />,
      title: 'Research',
      subtitle: 'Market Intelligence',
      capabilities: ['Competitor Analysis', 'Trend Detection', 'Gap Identification'],
      color: 'purple'
    },
    {
      id: 'strategy',
      icon: <FileText className="w-5 h-5" />,
      title: 'Strategy',
      subtitle: 'Content Planning',
      capabilities: ['Dynamic Playbooks', 'Calendar Planning', 'Success Metrics'],
      color: 'blue'
    },
    {
      id: 'creation',
      icon: <Edit3 className="w-5 h-5" />,
      title: 'Creation',
      subtitle: 'Content Generation',
      capabilities: ['Brand Voice Match', 'Multi-Platform', 'SEO Optimization'],
      color: 'green'
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Analytics',
      subtitle: 'Performance Tracking',
      capabilities: ['Authority Growth', 'ROI Calculation', 'Pattern Recognition'],
      color: 'orange'
    }
  ];

  const humanTouchpoints = [
    { icon: <Target className="w-4 h-4" />, label: 'Set Goals' },
    { icon: <Check className="w-4 h-4" />, label: 'Approve' },
    { icon: <Edit3 className="w-4 h-4" />, label: 'Refine' },
    { icon: <RefreshCw className="w-4 h-4" />, label: 'Iterate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* Compact Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  ContentQ Intelligence System
                </h1>
                <p className="text-sm text-gray-600 mt-1">Multi-agent orchestration for B2B authority</p>
              </div>
              
              {/* Live Status */}
              <div className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">System Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - No Scroll */}
        <div className="flex-1 px-8 py-6">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-12 gap-6 h-full">
              
              {/* Left Column - Orchestrator & Flow */}
              <div className="col-span-4 space-y-6">
                {/* Orchestrator Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-40"
                >
                  <Card className="h-full bg-black text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
                    <div className="relative p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">AI Orchestrator</h3>
                            <p className="text-xs text-gray-300">Coordinating agents in real-time</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mini Flow Visualization */}
                      <div className="flex items-center justify-between">
                        {agents.map((agent, idx) => (
                          <motion.div
                            key={agent.id}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              selectedFlow === idx ? 'bg-white text-black scale-110' : 'bg-white/20'
                            }`}
                            animate={{
                              scale: selectedFlow === idx ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 2, repeat: selectedFlow === idx ? Infinity : 0 }}
                          >
                            <div className="w-4 h-4">
                              {React.cloneElement(agent.icon as React.ReactElement, { className: 'w-4 h-4' })}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Human Integration */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-amber-50 border-amber-200">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-amber-600" />
                        <h3 className="text-sm font-medium text-amber-900">Human-in-the-Loop</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {humanTouchpoints.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                            <div className="text-amber-600">{point.icon}</div>
                            <span className="text-xs text-gray-700">{point.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* System Architecture */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <div className="p-4 h-full">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Core Infrastructure</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <Activity className="w-4 h-4 text-gray-600" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">Diagnostics Engine</p>
                            <p className="text-xs text-gray-500">Real-time performance analysis</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <Database className="w-4 h-4 text-gray-600" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">Knowledge Base</p>
                            <p className="text-xs text-gray-500">Self-learning repository</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column - Agent Grid */}
              <div className="col-span-8">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {agents.map((agent, idx) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onMouseEnter={() => {
                        setHoveredAgent(agent.id);
                        setSelectedFlow(idx);
                      }}
                      onMouseLeave={() => {
                        setHoveredAgent(null);
                        setSelectedFlow(-1);
                      }}
                      className="relative"
                    >
                      <Card className={`h-full border-2 transition-all duration-300 cursor-pointer ${
                        hoveredAgent === agent.id 
                          ? 'border-gray-900 shadow-xl transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        {/* Agent Header */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                hoveredAgent === agent.id
                                  ? 'bg-gray-900 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {agent.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{agent.title}</h3>
                                <p className="text-xs text-gray-500">{agent.subtitle}</p>
                              </div>
                            </div>
                            
                            {/* Status Indicator */}
                            <div className={`w-2 h-2 rounded-full ${
                              hoveredAgent === agent.id ? 'bg-green-500' : 'bg-gray-300'
                            } transition-colors`} />
                          </div>

                          {/* Capabilities */}
                          <div className="space-y-2">
                            {agent.capabilities.map((cap, capIdx) => (
                              <motion.div
                                key={capIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: hoveredAgent === agent.id ? 1 : 0.7,
                                  x: hoveredAgent === agent.id ? 0 : -10
                                }}
                                transition={{ delay: capIdx * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <div className={`w-1 h-1 rounded-full transition-all ${
                                  hoveredAgent === agent.id ? 'bg-gray-900' : 'bg-gray-400'
                                }`} />
                                <span className="text-sm text-gray-600">{cap}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Action Indicator */}
                          <AnimatePresence>
                            {hoveredAgent === agent.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-4 pt-4 border-t border-gray-100"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">Active processes</span>
                                  <div className="flex items-center gap-1">
                                    {[...Array(3)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5 bg-gray-900 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Workflow Pipeline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {agents.map((agent, idx) => (
                          <React.Fragment key={agent.id}>
                            <span className={`text-sm transition-all ${
                              selectedFlow === idx ? 'text-white font-medium' : 'text-gray-400'
                            }`}>
                              {agent.title}
                            </span>
                            {idx < agents.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-gray-600" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">v2.4.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">High Performance Mode</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}