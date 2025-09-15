"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Target,
  Search,
  FileText,
  BarChart3,
  Brain,
  Users,
  Plus,
  Check,
  Edit3,
  RefreshCw,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  Activity,
  Zap,
  BookOpen,
  Database,
  ChevronRight,
  Sparkles,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  touchpoint: string;
  details: string[];
  expanded: boolean;
  onToggle: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  icon, 
  title, 
  description, 
  touchpoint, 
  details, 
  expanded, 
  onToggle 
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="relative overflow-hidden cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
        onClick={onToggle}
      >
        <div className="p-6">
          {/* Expand Indicator */}
          <div className="absolute top-6 right-6">
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400"
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-4">
            <div className="text-purple-600">
              {icon}
            </div>
          </div>
          
          {/* Title & Description */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          {/* Human Touchpoint Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <User className="w-3 h-3 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">{touchpoint}</span>
          </div>
          
          {/* Expanded Details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-100"
              >
                <ul className="space-y-3">
                  {details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

export default function ProductOverviewPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<'active' | 'processing' | 'waiting'>('active');

  const agents = [
    {
      id: 'research',
      icon: <Search className="w-6 h-6" />,
      title: 'Research Agent',
      description: 'Market intelligence & opportunity detection',
      touchpoint: 'Validate findings',
      details: [
        'Monitors competitor content daily',
        'Tracks trending topics in your industry',
        'Identifies content gaps to fill',
        'Alerts on time-sensitive opportunities'
      ]
    },
    {
      id: 'strategy',
      icon: <FileText className="w-6 h-6" />,
      title: 'Strategy Agent',
      description: 'Dynamic playbooks & content planning',
      touchpoint: 'Approve strategy',
      details: [
        'Generates targeted content plays',
        'Plans optimal publishing calendar',
        'Adapts based on performance data',
        'Defines measurable success metrics'
      ]
    },
    {
      id: 'creation',
      icon: <Edit3 className="w-6 h-6" />,
      title: 'Creation Agent',
      description: 'Content generation & optimization',
      touchpoint: 'Edit & approve',
      details: [
        'Writes authority-building content',
        'Matches your unique brand voice',
        'Optimizes for each platform',
        'Improves existing content'
      ]
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Agent',
      description: 'Performance tracking & insights',
      touchpoint: 'Review insights',
      details: [
        'Measures authority growth',
        'Tracks AI system citations',
        'Calculates content ROI',
        'Identifies winning patterns'
      ]
    }
  ];

  const humanInteractions = [
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Strategic Input',
      description: 'Set goals & priorities'
    },
    {
      icon: <Check className="w-5 h-5" />,
      label: 'Quality Gates',
      description: 'Approve at key stages'
    },
    {
      icon: <Edit3 className="w-5 h-5" />,
      label: 'Expert Editing',
      description: 'Add unique insights'
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      label: 'Feedback Loops',
      description: 'Train the system'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              ContentQ
            </h1>
            <p className="text-xl text-gray-600">
              Multi-Agent System for B2B Authority Building
            </p>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-4">
          {[
            { status: 'active', label: 'Active', color: 'bg-green-500' },
            { status: 'processing', label: 'Processing', color: 'bg-yellow-500' },
            { status: 'waiting', label: 'Waiting', color: 'bg-gray-400' }
          ].map((item) => (
            <button
              key={item.status}
              onClick={() => setActiveStatus(item.status as any)}
              className={`flex items-center gap-2 text-xs font-medium transition-opacity ${
                activeStatus === item.status ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Orchestrator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white max-w-2xl mx-auto">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-medium mb-3">
                Intelligent Content System
              </h2>
              <p className="text-gray-300 leading-relaxed">
                ContentQ coordinates specialized AI agents<br />
                to build your market authority systematically
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Human Interaction Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
            <div className="p-8">
              <h3 className="text-xl font-medium text-amber-900 text-center mb-8 flex items-center justify-center gap-2">
                <User className="w-6 h-6" />
                Human Guidance Throughout
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {humanInteractions.map((interaction, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <div className="text-amber-600">{interaction.icon}</div>
                    </div>
                    <h4 className="font-medium text-amber-900 mb-1">{interaction.label}</h4>
                    <p className="text-xs text-amber-700">{interaction.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <AgentCard
                  {...agent}
                  expanded={expandedCard === agent.id}
                  onToggle={() => setExpandedCard(expandedCard === agent.id ? null : agent.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Activity className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Diagnostics Engine</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive audits establish your baseline and track progress toward authority goals
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Database className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base</h3>
                  <p className="text-sm text-gray-600">
                    Living repository that learns from every piece of content and interaction
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Workflow Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
            <div className="p-8 text-center">
              <h3 className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-4">
                Continuous Improvement Cycle
              </h3>
              <div className="flex items-center justify-center gap-3 text-lg text-gray-700">
                <span>Research</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <span>Strategy</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <span>Creation</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <span>Analytics</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <span>Learn</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}