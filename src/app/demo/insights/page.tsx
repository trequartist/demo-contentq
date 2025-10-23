"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Brain,
  Search,
  Globe,
  MessageSquare,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Shield,
  Star,
  Award,
  Activity,
  Database,
  FileText,
  Calendar,
  Settings,
  Eye,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub-v2.json';

export default function InsightsPage(): React.ReactElement {
  const data = insightsHubData;
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getChangeIcon = (change: string) => {
    return change.startsWith('+') ? 
      <ArrowUpRight className="w-4 h-4 text-green-600" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-600" />;
  };

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 2) return 'text-green-600 bg-green-50';
    if (rank <= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'critical') return 'text-red-600 bg-red-50';
    if (impact === 'high') return 'text-orange-600 bg-orange-50';
    if (impact === 'medium') return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* Key Performance Indicators */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* AI Authority Score */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric('authority')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+12 points</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">67/100</div>
            <div className="text-sm text-gray-600">AI Authority Score</div>
          </motion.div>

          {/* AI Citations */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric('citations')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+23</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">127</div>
            <div className="text-sm text-gray-600">AI Citations</div>
          </motion.div>

          {/* High-Impact Actions */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric('actions')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+3</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">High-Impact Actions</div>
          </motion.div>

          {/* Authority Clusters */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric('clusters')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+2</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-sm text-gray-600">Authority Clusters</div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Authority Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Authority Score</h2>
              <p className="text-sm text-gray-600">Blended visibility across all LLMs</p>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">67/100</div>
              <div className="flex items-center gap-2 mb-4">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12 from last week</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'ChatGPT (Browse: ON)', score: 72, percentage: 40, icon: MessageSquare },
                { name: 'ChatGPT (Browse: OFF)', score: 58, percentage: 20, icon: MessageSquare },
                { name: 'Claude', score: 71, percentage: 25, icon: Brain },
                { name: 'Perplexity', score: 65, percentage: 15, icon: Search }
              ].map((llm, idx) => (
                <motion.div
                  key={llm.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <llm.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{llm.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gray-800 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${llm.score}%` }}
                        transition={{ duration: 1, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{llm.score}</div>
                      <div className="text-xs text-gray-500">{llm.percentage}%</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Authority Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Authority Trend</h2>
              <p className="text-sm text-gray-600">6-month progression</p>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">67/100</div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12 from last week</span>
              </div>
              
              {/* Trend Chart */}
              <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-center gap-2 p-4">
                {[45, 52, 58, 63, 67, 72].map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 72) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Grid - Competitive Analysis & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competitive Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Competitive Position</h2>
            </div>

            <div className="mb-6">
              <div className="text-2xl font-bold text-gray-900 mb-2">YOU: 67/100</div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Zapier', score: 82, color: 'bg-red-500' },
                { name: 'Make', score: 75, color: 'bg-red-500' },
                { name: 'Gumloop', score: 67, color: 'bg-gray-800', isCurrent: true }
              ].map((competitor, idx) => (
                <motion.div
                  key={competitor.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    competitor.isCurrent ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${competitor.color}`} />
                    <span className="text-sm font-medium text-gray-900">{competitor.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${competitor.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(competitor.score / 82) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + idx * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="text-sm font-bold text-gray-900 w-8 text-right">{competitor.score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Topical Clusters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Topical Clusters</h2>
            </div>

            <div className="space-y-4">
              {[
                { rank: 3, topic: 'AI Automation & Workflow', percentage: 28, color: 'bg-green-500' },
                { rank: 1, topic: 'Zapier Alternatives & Migration', percentage: 22, color: 'bg-green-500' },
                { rank: 4, topic: 'Enterprise Automation', percentage: 18, color: 'bg-yellow-500' },
                { rank: 2, topic: 'AI-Native Development', percentage: 15, color: 'bg-green-500' }
              ].map((cluster, idx) => (
                <motion.div
                  key={cluster.topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-700">
                      #{cluster.rank}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{cluster.topic}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-gray-900">{cluster.percentage}%</div>
                    <div className={`w-2 h-2 rounded-full ${cluster.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Critical Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Critical Actions</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900">Create 'Zapier Migration' Content Cluster</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                    +5-7 points
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  Build comprehensive migration guides to capture 3,200+ monthly searches and establish authority in the migration space.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* High Priority Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">High Priority Actions</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900">Create Enterprise Automation Case Studies</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                    +3-4 points
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  Develop detailed case studies showing ROI and implementation success to build credibility in enterprise market.
                </p>
              </motion.div>
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}