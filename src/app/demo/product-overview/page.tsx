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
    <div className="min-h-screen bg-white">
      <div className="h-screen flex flex-col">
        {/* Ultra-Compact Linear-style Header */}
        <div className="border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-base font-medium text-gray-900">ContentQ Intelligence</h1>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'architecture' 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('workflow')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'workflow' 
                      ? 'bg-gray-100 text-gray-900 font-medium' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Workflow
                </button>
              </div>
            </div>
            
            {/* Status Pills */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-xs font-medium">Active</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md">
                <Layers className="w-3 h-3" />
                <span className="text-xs">4 Agents</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md">
                <GitBranch className="w-3 h-3" />
                <span className="text-xs">v2.4.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Dense Layout */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-12 gap-4 h-full">
              
              {/* Left Column - System Overview */}
              <div className="col-span-3 space-y-3">
                {/* Orchestrator Card - Improved Contrast */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-32"
                >
                  <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">AI Orchestrator</h3>
                            <p className="text-xs text-gray-500">Real-time coordination</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Compact Flow Dots */}
                      <div className="flex items-center gap-1.5">
                        {agents.map((agent, idx) => (
                          <motion.div
                            key={agent.id}
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                              selectedFlow === idx 
                                ? 'bg-gray-900 text-white scale-110' 
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            animate={{
                              scale: selectedFlow === idx ? [1, 1.15, 1] : 1,
                            }}
                            transition={{ duration: 2, repeat: selectedFlow === idx ? Infinity : 0 }}
                          >
                            <div className="w-3 h-3">
                              {React.cloneElement(agent.icon as React.ReactElement, { className: 'w-3 h-3' })}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Human Integration - Compact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border border-gray-200">
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2.5">
                        <User className="w-3.5 h-3.5 text-gray-600" />
                        <h3 className="text-xs font-medium text-gray-700">Human Touch</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {humanTouchpoints.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded">
                            <div className="text-gray-500">{point.icon}</div>
                            <span className="text-xs text-gray-600">{point.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Core Systems - Ultra Compact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <Card className="h-full border border-gray-200">
                    <div className="p-3 h-full">
                      <h3 className="text-xs font-medium text-gray-700 mb-2.5">Infrastructure</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Activity className="w-3.5 h-3.5 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">Diagnostics</p>
                            <p className="text-xs text-gray-500">Performance tracking</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Database className="w-3.5 h-3.5 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">Knowledge</p>
                            <p className="text-xs text-gray-500">Learning system</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Zap className="w-3.5 h-3.5 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">Processing</p>
                            <p className="text-xs text-gray-500">High performance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column - Dense Agent Grid */}
              <div className="col-span-9">
                <div className="grid grid-cols-2 gap-3 h-full">
                  {agents.map((agent, idx) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
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
                      <Card className={`h-full border transition-all duration-200 cursor-pointer ${
                        hoveredAgent === agent.id 
                          ? 'border-gray-400 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="p-4 h-full flex flex-col">
                          {/* Compact Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-2.5">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                hoveredAgent === agent.id
                                  ? 'bg-gray-900 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {React.cloneElement(agent.icon as React.ReactElement, { className: 'w-4 h-4' })}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-sm font-medium text-gray-900">{agent.title}</h3>
                                <p className="text-xs text-gray-500">{agent.subtitle}</p>
                              </div>
                            </div>
                            
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${
                              hoveredAgent === agent.id ? 'bg-green-500' : 'bg-gray-300'
                            } transition-colors`} />
                          </div>

                          {/* Capabilities List */}
                          <div className="flex-1 space-y-1.5">
                            {agent.capabilities.map((cap, capIdx) => (
                              <div
                                key={capIdx}
                                className="flex items-center gap-2"
                              >
                                <div className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                                  hoveredAgent === agent.id ? 'bg-gray-700' : 'bg-gray-300'
                                }`} />
                                <span className="text-xs text-gray-600 leading-tight">{cap}</span>
                              </div>
                            ))}
                          </div>

                          {/* Footer Metrics */}
                          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Activity className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">Active</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">99.9%</span>
                              </div>
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
                                    className="w-1 h-1 bg-gray-600 rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                  />
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Architecture Tab */}
            {activeTab === 'architecture' && (
              <div className="h-full">
                <Card className="h-full border border-gray-200 p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">System Architecture</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Core Components</h3>
                      <div className="space-y-2">
                        {['Orchestration Engine', 'Agent Framework', 'Knowledge Graph', 'Analytics Pipeline'].map((item) => (
                          <div key={item} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <Database className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Integration Points</h3>
                      <div className="space-y-2">
                        {['API Gateway', 'Webhook System', 'Event Bus', 'Data Sync'].map((item) => (
                          <div key={item} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <GitBranch className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Security & Compliance</h3>
                      <div className="space-y-2">
                        {['SOC 2 Type II', 'GDPR Compliant', 'End-to-End Encryption', 'Role-Based Access'].map((item) => (
                          <div key={item} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Workflow Tab */}
            {activeTab === 'workflow' && (
              <div className="h-full">
                <Card className="h-full border border-gray-200 p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Content Workflow</h2>
                  <div className="space-y-6">
                    {/* Workflow Steps */}
                    <div className="flex items-center justify-between">
                      {agents.map((agent, idx) => (
                        <React.Fragment key={agent.id}>
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedFlow === idx ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {React.cloneElement(agent.icon as React.ReactElement, { className: 'w-5 h-5' })}
                            </div>
                            <span className="text-xs font-medium text-gray-700 mt-2">{agent.title}</span>
                            <span className="text-xs text-gray-500">{agent.subtitle}</span>
                          </div>
                          {idx < agents.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400 mb-6" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-2xl font-light text-gray-900">94%</p>
                        <p className="text-xs text-gray-500">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-light text-gray-900">2.4h</p>
                        <p className="text-xs text-gray-500">Avg. Completion</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-light text-gray-900">12k</p>
                        <p className="text-xs text-gray-500">Content Pieces</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-light text-gray-900">3.2x</p>
                        <p className="text-xs text-gray-500">ROI Average</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}