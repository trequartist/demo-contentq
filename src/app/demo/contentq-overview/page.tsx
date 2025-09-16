"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  User,
  Target,
  CheckCircle,
  Edit3,
  RefreshCcw,
  Activity,
  Circle,
  Info
} from 'lucide-react';
import { Card } from '@/components/ui';

interface AgentCardProps {
  icon: string;
  title: string;
  description: string;
  touchpoint: string;
  details: string[];
}

export default function ContentQOverviewPage() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardTitle: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardTitle)) {
        newSet.delete(cardTitle);
      } else {
        newSet.add(cardTitle);
      }
      return newSet;
    });
  };

  const agents: AgentCardProps[] = [
    {
      icon: "📊",
      title: "Research Agent",
      description: "Market intelligence & opportunity detection",
      touchpoint: "Validate findings",
      details: [
        "Monitors competitor content daily",
        "Tracks trending topics in your industry",
        "Identifies content gaps to fill",
        "Alerts on time-sensitive opportunities"
      ]
    },
    {
      icon: "📋",
      title: "Strategy Agent",
      description: "Dynamic playbooks & content planning",
      touchpoint: "Approve strategy",
      details: [
        "Generates targeted content plays",
        "Plans optimal publishing calendar",
        "Adapts based on performance data",
        "Defines measurable success metrics"
      ]
    },
    {
      icon: "✍️",
      title: "Creation Agent",
      description: "Content generation & optimization",
      touchpoint: "Edit & approve",
      details: [
        "Writes authority-building content",
        "Matches your unique brand voice",
        "Optimizes for each platform",
        "Improves existing content"
      ]
    },
    {
      icon: "📈",
      title: "Analytics Agent",
      description: "Performance tracking & insights",
      touchpoint: "Review insights",
      details: [
        "Measures authority growth",
        "Tracks AI system citations",
        "Calculates content ROI",
        "Identifies winning patterns"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-100 px-3 py-1.5 rounded-full"
          >
            <Info className="w-3 h-3" />
            <span>Educational Overview</span>
          </motion.div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">ContentQ</h1>
          <p className="text-gray-600">Multi-Agent System for B2B Authority Building</p>
        </div>

        {/* Orchestrator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 text-white rounded-2xl p-7 mx-auto max-w-xl mb-10 shadow-lg"
        >
          <h2 className="text-xl font-medium text-center mb-3">
            🎯 Intelligent Content System
          </h2>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            ContentQ coordinates specialized AI agents<br />
            to build your market authority systematically
          </p>
        </motion.div>

        {/* Human Interaction Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-10"
        >
          <h3 className="text-base font-medium text-gray-800 text-center mb-4">
            👤 Human Guidance Throughout
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Target className="w-5 h-5" />, label: "Strategic Input", desc: "Set goals & priorities" },
              { icon: <CheckCircle className="w-5 h-5" />, label: "Quality Gates", desc: "Approve at key stages" },
              { icon: <Edit3 className="w-5 h-5" />, label: "Expert Editing", desc: "Add unique insights" },
              { icon: <RefreshCcw className="w-5 h-5" />, label: "Feedback Loops", desc: "Train the system" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-gray-600">
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {agents.map((agent, idx) => {
            const isExpanded = expandedCards.has(agent.title);
            
            return (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <Card 
                  className="bg-white border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => toggleCard(agent.title)}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute top-0 right-0 text-gray-400"
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.div>
                    
                    <div className="text-2xl mb-3">{agent.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                    
                    <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">
                      <User className="w-3 h-3" />
                      <span>{agent.touchpoint}</span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <ul className="space-y-2">
                              {agent.details.map((detail, detailIdx) => (
                                <li key={detailIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="text-gray-400 mt-0.5">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            {
              title: "🔍 Diagnostics Engine",
              description: "Comprehensive audits establish your baseline and track progress toward authority goals"
            },
            {
              title: "🧠 Knowledge Base",
              description: "Living repository that learns from every piece of content and interaction"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
            >
              <Card className="bg-gray-100 border-0 p-5">
                <h3 className="text-base font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Workflow Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="bg-gray-50 border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Continuous Improvement Cycle</p>
            <p className="text-base text-gray-900 font-medium tracking-wide">
              Research → Strategy → Creation → Analytics → Learn
            </p>
          </Card>
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed top-6 right-6 bg-white rounded-full shadow-md px-4 py-2 hidden md:flex items-center gap-4"
        >
          {[
            { status: "Active", color: "bg-gray-800" },
            { status: "Processing", color: "bg-gray-500" },
            { status: "Waiting", color: "bg-gray-300" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
              <span className="text-xs text-gray-600">{item.status}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}