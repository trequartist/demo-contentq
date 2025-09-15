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
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'workflow'>('overview');

  const agents: AgentData[] = [
    {
      id: 'research',
      icon: <Search className="w-4 h-4" />,
      title: 'Research',
      subtitle: 'Market Intelligence',
      capabilities: ['Competitor Analysis', 'Trend Detection', 'Gap Identification'],
      color: 'purple'
    },
    {
      id: 'strategy',
      icon: <FileText className="w-4 h-4" />,
      title: 'Strategy',
      subtitle: 'Content Planning',
      capabilities: ['Dynamic Playbooks', 'Calendar Planning', 'Success Metrics'],
      color: 'blue'
    },
    {
      id: 'creation',
      icon: <Edit3 className="w-4 h-4" />,
      title: 'Creation',
      subtitle: 'Content Generation',
      capabilities: ['Brand Voice Match', 'Multi-Platform', 'SEO Optimization'],
      color: 'green'
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Analytics',
      subtitle: 'Performance Tracking',
      capabilities: ['Authority Growth', 'ROI Calculation', 'Pattern Recognition'],
      color: 'orange'
    }
  ];

  const humanTouchpoints = [
    { icon: <Target className="w-3 h-3" />, label: 'Set Goals' },
    { icon: <Check className="w-3 h-3" />, label: 'Approve' },
    { icon: <Edit3 className="w-3 h-3" />, label: 'Refine' },
    { icon: <RefreshCw className="w-3 h-3" />, label: 'Iterate' }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="h-screen flex flex-col">
        {/* Linear-style Dark Header */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <h1 className="text-sm font-medium text-gray-100">ContentQ</h1>
              </div>
              <div className="h-4 w-px bg-gray-800" />
              <div className="flex items-center">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-gray-800 text-gray-100' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    activeTab === 'architecture' 
                      ? 'bg-gray-800 text-gray-100' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('workflow')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    activeTab === 'workflow' 
                      ? 'bg-gray-800 text-gray-100' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Workflow
                </button>
              </div>
            </div>
            
            {/* Compact Status */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">4 agents</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">v2.4.0</span>
            </div>
          </div>
        </div>

        {/* Main Content - Zero Padding Dark Layout */}
        <div className="flex-1 overflow-hidden bg-gray-950">
          <div className="h-full p-3">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-12 gap-2 h-full">
              
              {/* Left Column - Compact Dark Cards */}
              <div className="col-span-3 space-y-2">
                {/* Orchestrator Card - Dark Linear Style */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-28"
                >
                  <div className="h-full bg-gray-900 border border-gray-800 rounded-lg p-3">
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-md flex items-center justify-center">
                          <Brain className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-100">Orchestrator</h3>
                          <p className="text-xs text-gray-500">Coordinating</p>
                        </div>
                      </div>
                      
                      {/* Mini Agent Indicators */}
                      <div className="flex items-center gap-1">
                        {agents.map((agent, idx) => (
                          <motion.div
                            key={agent.id}
                            className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                              selectedFlow === idx 
                                ? 'bg-purple-500/20 ring-1 ring-purple-500' 
                                : 'bg-gray-800'
                            }`}
                            animate={{
                              scale: selectedFlow === idx ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 2, repeat: selectedFlow === idx ? Infinity : 0 }}
                          >
                            {React.cloneElement(agent.icon as React.ReactElement, { 
                              className: `w-2.5 h-2.5 ${
                                selectedFlow === idx ? 'text-purple-400' : 'text-gray-600'
                              }` 
                            })}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Human Integration - Ultra Compact Dark */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-2.5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <User className="w-3 h-3 text-amber-500" />
                      <h3 className="text-xs font-medium text-gray-300">Human</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {humanTouchpoints.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-1 p-1 bg-gray-800 rounded text-gray-400">
                          {point.icon}
                          <span className="text-xs">{point.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Core Systems - Minimal Dark */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <div className="h-full bg-gray-900 border border-gray-800 rounded-lg p-2.5">
                    <h3 className="text-xs font-medium text-gray-300 mb-2">Core</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                        <Activity className="w-3 h-3 text-blue-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-300">Diagnostics</p>
                          <p className="text-xs text-gray-600 leading-tight">Real-time</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                        <Database className="w-3 h-3 text-green-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-300">Knowledge</p>
                          <p className="text-xs text-gray-600 leading-tight">Learning</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-300">Processing</p>
                          <p className="text-xs text-gray-600 leading-tight">99.9% SLA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Ultra Dense Dark Agent Grid */}
              <div className="col-span-9">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 h-full">
                  {agents.map((agent, idx) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      onMouseEnter={() => {
                        setHoveredAgent(agent.id);
                        setSelectedFlow(idx);
                      }}
                      onMouseLeave={() => {
                        setHoveredAgent(null);
                        setSelectedFlow(-1);
                      }}
                      className="h-full"
                    >
                      <div className={`h-full bg-gray-900 border rounded-lg transition-all duration-200 cursor-pointer ${
                        hoveredAgent === agent.id 
                          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
                          : 'border-gray-800 hover:border-gray-700'
                      }`}>
                        <div className="p-3 h-full flex flex-col">
                          {/* Ultra Compact Header */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-2">
                              <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                                hoveredAgent === agent.id
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-gray-800 text-gray-500'
                              }`}>
                                {React.cloneElement(agent.icon as React.ReactElement, { className: 'w-3.5 h-3.5' })}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-xs font-medium text-gray-200">{agent.title}</h3>
                                <p className="text-xs text-gray-500 truncate">{agent.subtitle}</p>
                              </div>
                            </div>
                            
                            <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${
                              hoveredAgent === agent.id ? 'bg-green-400' : 'bg-gray-700'
                            } transition-colors`} />
                          </div>

                          {/* Minimal Capabilities */}
                          <div className="flex-1 space-y-1">
                            {agent.capabilities.slice(0, 3).map((cap, capIdx) => (
                              <div
                                key={capIdx}
                                className="flex items-start gap-1.5"
                              >
                                <div className={`w-0.5 h-0.5 rounded-full mt-1.5 flex-shrink-0 transition-all ${
                                  hoveredAgent === agent.id ? 'bg-purple-400' : 'bg-gray-700'
                                }`} />
                                <span className="text-xs text-gray-400 leading-tight">{cap}</span>
                              </div>
                            ))}
                          </div>

                          {/* Minimal Footer */}
                          <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-600">Active</span>
                              <span className="text-gray-700">•</span>
                              <span className="text-gray-600">99.9%</span>
                            </div>
                            {hoveredAgent === agent.id && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-0.5"
                              >
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-0.5 h-0.5 bg-purple-400 rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                  />
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Architecture Tab - Dark */}
            {activeTab === 'architecture' && (
              <div className="h-full">
                <div className="h-full bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-100 mb-3">System Architecture</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 mb-2">Core Components</h3>
                      <div className="space-y-1">
                        {['Orchestration Engine', 'Agent Framework', 'Knowledge Graph', 'Analytics Pipeline'].map((item) => (
                          <div key={item} className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                            <Database className="w-3 h-3 text-blue-400" />
                            <span className="text-xs text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 mb-2">Integration Points</h3>
                      <div className="space-y-1">
                        {['API Gateway', 'Webhook System', 'Event Bus', 'Data Sync'].map((item) => (
                          <div key={item} className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                            <GitBranch className="w-3 h-3 text-purple-400" />
                            <span className="text-xs text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 mb-2">Security & Compliance</h3>
                      <div className="space-y-1">
                        {['SOC 2 Type II', 'GDPR Compliant', 'End-to-End Encryption', 'Role-Based Access'].map((item) => (
                          <div key={item} className="flex items-center gap-1.5 p-1.5 bg-gray-800 rounded">
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workflow Tab - Dark */}
            {activeTab === 'workflow' && (
              <div className="h-full">
                <div className="h-full bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-100 mb-3">Content Workflow</h2>
                  <div className="space-y-4">
                    {/* Workflow Steps */}
                    <div className="flex items-center justify-between">
                      {agents.map((agent, idx) => (
                        <React.Fragment key={agent.id}>
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedFlow === idx ? 'bg-purple-500/20 ring-1 ring-purple-500' : 'bg-gray-800'
                            }`}>
                              {React.cloneElement(agent.icon as React.ReactElement, { 
                                className: `w-4 h-4 ${
                                  selectedFlow === idx ? 'text-purple-400' : 'text-gray-500'
                                }` 
                              })}
                            </div>
                            <span className="text-xs font-medium text-gray-300 mt-1.5">{agent.title}</span>
                            <span className="text-xs text-gray-600">{agent.subtitle}</span>
                          </div>
                          {idx < agents.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-700 mb-5" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Metrics Grid - Compact Dark */}
                    <div className="grid grid-cols-4 gap-3 pt-3 border-t border-gray-800">
                      <div className="text-center">
                        <p className="text-xl font-light text-gray-100">94%</p>
                        <p className="text-xs text-gray-500">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-light text-gray-100">2.4h</p>
                        <p className="text-xs text-gray-500">Avg Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-light text-gray-100">12k</p>
                        <p className="text-xs text-gray-500">Content</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-light text-gray-100">3.2x</p>
                        <p className="text-xs text-gray-500">ROI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}