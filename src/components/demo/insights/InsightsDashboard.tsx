import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
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
  Lightbulb
} from 'lucide-react';

interface InsightsDashboardProps {
  data: any;
}

export default function InsightsDashboard({ data }: InsightsDashboardProps) {
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

  // Mock data for insights dashboard
  const keyMetrics = [
    {
      id: 'ai-visibility',
      title: 'AI Visibility Score',
      value: 78,
      previousValue: 66,
      change: 12,
      changeType: 'positive',
      description: 'How well AI assistants recognize and cite your content',
      icon: Brain,
      color: 'blue',
      gauge: {
        current: 78,
        max: 100,
        segments: [
          { label: '0-25', color: 'red', range: [0, 25] },
          { label: '25-50', color: 'yellow', range: [25, 50] },
          { label: '50-75', color: 'blue', range: [50, 75] },
          { label: '75-100', color: 'green', range: [75, 100] }
        ]
      }
    },
    {
      id: 'competitive-rank',
      title: 'Competitive Rank',
      value: 3,
      previousValue: 5,
      change: 2,
      changeType: 'positive',
      description: 'Your position among competitors in AI citations',
      icon: Target,
      color: 'green',
      subtitle: 'out of 15 competitors'
    },
    {
      id: 'query-coverage',
      title: 'Query Coverage',
      value: 67,
      previousValue: 45,
      change: 22,
      changeType: 'positive',
      description: 'Percentage of relevant queries where you appear',
      icon: Search,
      color: 'purple',
      subtitle: '% of total queries'
    }
  ];

  const competitiveData = [
    { name: 'ParentSquare', percentage: 15.2, citations: 24 },
    { name: 'ClassDojo', percentage: 12.8, citations: 20 },
    { name: 'Your Brand', percentage: 10.4, citations: 16 },
    { name: 'Remind', percentage: 8.1, citations: 13 },
    { name: 'Edsby', percentage: 5.3, citations: 8 }
  ];

  const topicalClusters = [
    { name: 'Family & School Communication', percentage: 36, rank: 6, queries: 1240 },
    { name: 'Professional Development & Teacher Training', percentage: 18, rank: 4, queries: 620 },
    { name: 'Data Analytics & Reporting', percentage: 14, rank: 6, queries: 480 },
    { name: 'Payments, Forms & Compliance', percentage: 13, rank: 1, queries: 450 },
    { name: 'Attendance & Engagement Tracking', percentage: 10, rank: 1, queries: 340 }
  ];

  const getChangeIcon = (changeType: string) => {
    return changeType === 'positive' ? 
      <ArrowUpRight className="w-4 h-4 text-green-600" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-600" />;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'text-green-600 bg-green-50';
    if (rank <= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Key Metrics and Trends</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis of your AI visibility performance across all platforms and competitive landscape.
        </p>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {keyMetrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${metric.color}-50 rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </div>
              <Info className="w-5 h-5 text-gray-400" />
            </div>

            {/* Large Value Display */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">{metric.value}</div>
              {metric.subtitle && (
                <div className="text-lg text-gray-500">{metric.subtitle}</div>
              )}
              <div className="flex items-center gap-2 mt-2">
                {getChangeIcon(metric.changeType)}
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  +{metric.change} vs previous
                </span>
              </div>
            </div>

            {/* Visual Gauge for AI Visibility Score */}
            {metric.id === 'ai-visibility' && (
              <div className="mb-6">
                <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-semibold text-white">
                      {metric.value >= 75 ? "Strong" : 
                       metric.value >= 50 ? "Moderate" : "Critical"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            )}

            {/* Progress Bar for other metrics */}
            {metric.id !== 'ai-visibility' && (
              <div className="mb-6">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      metric.value >= 70 ? 'bg-green-500' : 
                      metric.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(metric.value, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Competitive Mentions & Citations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Competitive Mentions & Citations</h2>
              <p className="text-sm text-gray-600">Your position among competitors in AI citations</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">3rd place</div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +2 vs previous
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {competitiveData.map((competitor, idx) => (
            <motion.div
              key={competitor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-700">
                  {idx + 1}
                </div>
                <span className="text-sm font-medium text-gray-900">{competitor.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${competitor.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{competitor.percentage}%</div>
                  <div className="text-xs text-gray-500">{competitor.citations} citations</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Topical Cluster Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Topical Cluster Ranking</h2>
            <p className="text-sm text-gray-600">Performance across different content categories</p>
          </div>
        </div>

        <div className="space-y-4">
          {topicalClusters.map((cluster, idx) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-700">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{cluster.name}</div>
                  <div className="text-xs text-gray-500">{cluster.queries} queries</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{cluster.percentage}%</div>
                  <div className="text-xs text-gray-500">of total queries</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getRankColor(cluster.rank)}`}>
                  {cluster.rank}th
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended Actions</h2>
            <p className="text-sm text-gray-600">Priority actions to improve your AI visibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Create Comparison Content',
              description: 'Develop content comparing your solution to competitors',
              priority: 'High',
              impact: 'Expected 40% increase in citations'
            },
            {
              title: 'Optimize for AI Crawlers',
              description: 'Implement structured data and AI-friendly content formats',
              priority: 'Critical',
              impact: 'Improve AI understanding by 60%'
            },
            {
              title: 'Build Industry Authority',
              description: 'Create thought leadership content and industry reports',
              priority: 'Medium',
              impact: 'Establish expertise in key topics'
            },
            {
              title: 'Expand Content Coverage',
              description: 'Fill gaps in your content portfolio',
              priority: 'High',
              impact: 'Capture 25% more query types'
            }
          ].map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{action.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  action.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                  action.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {action.priority}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{action.description}</p>
              <div className="text-xs text-gray-600">{action.impact}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
