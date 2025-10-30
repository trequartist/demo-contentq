"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '@/components/ui';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Brain, 
  Users, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trophy,
  Eye,
  Search,
  MessageSquare,
  Globe,
  Shield,
  Activity,
  Star,
  Award,
  Clock,
  Database,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap as ZapIcon,
  BarChart,
  PieChart,
  LineChart,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface InsightsDashboardProps {
  data: any;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function InsightsDashboard({ data }: InsightsDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Enhanced AI Visibility Metrics
  const aiVisibilityMetrics = {
    // Core Authority Metrics
    authorityScore: { value: 72, change: +5, trend: 'up', target: 80 },
    aiCitations: { value: 127, change: +23, trend: 'up', target: 150 },
    visibilityRank: { value: 2, change: +1, trend: 'up', target: 1 },
    authorityClusters: { value: 6, change: +2, trend: 'up', target: 8 },
    
    // LLM-Specific Visibility
    chatgptVisibility: { value: 78, change: +8, trend: 'up', target: 85 },
    claudeVisibility: { value: 76, change: +6, trend: 'up', target: 80 },
    perplexityVisibility: { value: 71, change: +4, trend: 'up', target: 75 },
    geminiVisibility: { value: 68, change: +3, trend: 'up', target: 72 },
    
    // Content Performance
    contentCitations: { value: 89, change: +15, trend: 'up', target: 100 },
    searchVisibility: { value: 84, change: +12, trend: 'up', target: 90 },
    socialMentions: { value: 156, change: +28, trend: 'up', target: 200 },
    backlinkAuthority: { value: 67, change: +9, trend: 'up', target: 75 },
    
    // Competitive Intelligence
    marketShare: { value: 23.4, change: +2.1, trend: 'up', target: 30 },
    competitorGap: { value: 8, change: -3, trend: 'up', target: 0 },
    brandMentions: { value: 234, change: +45, trend: 'up', target: 300 },
    thoughtLeadership: { value: 71, change: +8, trend: 'up', target: 80 },
    
    // Engagement Metrics
    aiEngagement: { value: 89, change: +12, trend: 'up', target: 95 },
    contentShares: { value: 67, change: +15, trend: 'up', target: 80 },
    userQueries: { value: 1234, change: +234, trend: 'up', target: 1500 },
    responseAccuracy: { value: 87, change: +5, trend: 'up', target: 90 }
  };

  const competitiveAnalysis = {
    yourPosition: { score: 72, rank: 2, change: +1 },
    competitors: [
      { name: 'Zapier', score: 82, gap: -10, trend: 'stable', marketShare: 35.2 },
      { name: 'Make', score: 75, gap: -3, trend: 'up', marketShare: 28.1 },
      { name: 'Gumloop', score: 72, gap: 0, trend: 'up', marketShare: 23.4, isCurrent: true },
      { name: 'n8n', score: 58, gap: +14, trend: 'down', marketShare: 18.7 },
      { name: 'Integromat', score: 45, gap: +27, trend: 'down', marketShare: 12.3 }
    ]
  };

  const topicalClusters = [
    { 
      topic: 'AI Automation & Workflow', 
      rank: 1, 
      percentage: 28, 
      queries: 3200, 
      aiImpact: 'critical', 
      expectedLift: '+8-10 points',
      timeToImpact: '7 days',
      trend: 'up',
      competition: 'low'
    },
    { 
      topic: 'Zapier Alternatives & Migration', 
      rank: 2, 
      percentage: 22, 
      queries: 2800, 
      aiImpact: 'high', 
      expectedLift: '+6-8 points',
      timeToImpact: '14 days',
      trend: 'up',
      competition: 'medium'
    },
    { 
      topic: 'Enterprise Automation', 
      rank: 3, 
      percentage: 18, 
      queries: 2100, 
      aiImpact: 'high', 
      expectedLift: '+4-6 points',
      timeToImpact: '21 days',
      trend: 'stable',
      competition: 'high'
    },
    { 
      topic: 'AI-Native Development', 
      rank: 4, 
      percentage: 15, 
      queries: 1800, 
      aiImpact: 'medium', 
      expectedLift: '+3-5 points',
      timeToImpact: '28 days',
      trend: 'up',
      competition: 'medium'
    }
  ];

  const actionableInsights = {
    critical: [
      {
        title: "Create 'Zapier Migration' Content Cluster",
        description: "Build comprehensive migration guides to capture 3,200+ monthly searches and establish authority in the migration space.",
        expectedLift: "+8-10 points",
        timeline: "7 days",
        priority: "critical",
        impact: "high",
        effort: "medium",
        score: 95
      },
      {
        title: "Develop AI Automation Case Studies",
        description: "Create detailed case studies showing ROI and implementation success to build credibility in enterprise market.",
        expectedLift: "+6-8 points",
        timeline: "14 days",
        priority: "critical",
        impact: "high",
        effort: "high",
        score: 88
      }
    ],
    high: [
      {
        title: "Optimize for Claude Citations",
        description: "Enhance content structure and formatting to improve Claude's ability to cite and reference your content.",
        expectedLift: "+4-6 points",
        timeline: "21 days",
        priority: "high",
        impact: "medium",
        effort: "medium",
        score: 76
      },
      {
        title: "Build Perplexity Authority",
        description: "Create comprehensive FAQ content and knowledge base to improve Perplexity search visibility.",
        expectedLift: "+3-5 points",
        timeline: "28 days",
        priority: "high",
        impact: "medium",
        effort: "low",
        score: 72
      }
    ]
  };

  const generateSparkline = (data: number[], width = 100, height = 30, color = '#1F2937') => {
    if (!data || data.length === 0) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? 
      <ArrowUpRight className="w-4 h-4 text-green-600" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-600" />;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="px-6 py-8 xl:px-10 xl:py-10 mx-auto w-full max-w-7xl space-y-8">

        {/* Key Performance Indicators */}
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* AI Authority Score */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {getChangeIcon(aiVisibilityMetrics.authorityScore.change)}
                  <span className="text-sm font-medium">+{aiVisibilityMetrics.authorityScore.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{aiVisibilityMetrics.authorityScore.value}/100</div>
              <div className="text-sm text-gray-600">AI Authority Score</div>
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(aiVisibilityMetrics.authorityScore.value, 100)}%` }} />
              </div>
            </Card>
          </motion.div>

          {/* AI Citations */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {getChangeIcon(aiVisibilityMetrics.aiCitations.change)}
                  <span className="text-sm font-medium">+{aiVisibilityMetrics.aiCitations.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{aiVisibilityMetrics.aiCitations.value}</div>
              <div className="text-sm text-gray-600">AI Citations</div>
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min((aiVisibilityMetrics.aiCitations.value / aiVisibilityMetrics.aiCitations.target) * 100, 100)}%` }} />
              </div>
            </Card>
          </motion.div>

          {/* High-Impact Actions */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {getChangeIcon(aiVisibilityMetrics.authorityClusters.change)}
                  <span className="text-sm font-medium">+{aiVisibilityMetrics.authorityClusters.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{aiVisibilityMetrics.authorityClusters.value}</div>
              <div className="text-sm text-gray-600">Authority Clusters</div>
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min((aiVisibilityMetrics.authorityClusters.value / aiVisibilityMetrics.authorityClusters.target) * 100, 100)}%` }} />
                  </div>
            </Card>
          </motion.div>

          {/* Visibility Rank */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                <div className="flex items-center gap-1 text-green-600">
                  {getChangeIcon(aiVisibilityMetrics.visibilityRank.change)}
                  <span className="text-sm font-medium">+{aiVisibilityMetrics.visibilityRank.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">#{aiVisibilityMetrics.visibilityRank.value}</div>
              <div className="text-sm text-gray-600">Visibility Rank</div>
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(((aiVisibilityMetrics.visibilityRank.target - aiVisibilityMetrics.visibilityRank.value) / aiVisibilityMetrics.visibilityRank.target) * 100, 100)}%` }} />
              </div>
              </Card>
            </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Authority Score Breakdown */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card className="p-8 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Authority Score</h2>
                  <p className="text-sm text-gray-600">Blended visibility across all LLMs</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">{aiVisibilityMetrics.authorityScore.value}/100</div>
                  <div className="flex items-center justify-end gap-2 text-sm">
                    {getChangeIcon(aiVisibilityMetrics.authorityScore.change)}
                    <span className={getChangeColor(aiVisibilityMetrics.authorityScore.change)}>
                      +{aiVisibilityMetrics.authorityScore.change} from last week
                    </span>
                  </div>
                </div>
              </div>

              {/* LLM Breakdown */}
              <div className="space-y-4">
                {[
                  { name: 'ChatGPT (Browse: ON)', score: aiVisibilityMetrics.chatgptVisibility.value, percentage: 40, icon: MessageSquare, color: 'bg-blue-500' },
                  { name: 'ChatGPT (Browse: OFF)', score: 62, percentage: 20, icon: MessageSquare, color: 'bg-blue-400' },
                  { name: 'Claude', score: aiVisibilityMetrics.claudeVisibility.value, percentage: 25, icon: Brain, color: 'bg-purple-500' },
                  { name: 'Perplexity', score: aiVisibilityMetrics.perplexityVisibility.value, percentage: 15, icon: Search, color: 'bg-orange-500' }
                ].map((llm, idx) => (
                  <motion.div
                    key={llm.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <llm.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{llm.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${llm.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(llm.score, 100)}%` }}
                          transition={{ duration: 1, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{llm.score}</div>
                        <div className="text-xs text-gray-500">{llm.percentage}%</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Authority Trend */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-white border border-gray-200 rounded-xl h-full">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Authority Trend</h3>
                <p className="text-sm text-gray-600">6-month progression</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">{aiVisibilityMetrics.authorityScore.value}/100</div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  {getChangeIcon(aiVisibilityMetrics.authorityScore.change)}
                  <span className={`text-sm font-medium ${getChangeColor(aiVisibilityMetrics.authorityScore.change)}`}>
                    +{aiVisibilityMetrics.authorityScore.change} from last week
                  </span>
                </div>
                
                {/* Trend Chart */}
                <div className="h-32 bg-gray-50 rounded-xl flex items-end justify-center gap-2 p-4">
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
            </Card>
          </motion.div>
        </div>

        {/* Competitive Analysis & Topical Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competitive Position */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-white border border-gray-200 rounded-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Position</h3>
                <p className="text-sm text-gray-600">Your position among competitors</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">YOU: {competitiveAnalysis.yourPosition.score}/100</div>
                <div className="text-sm text-gray-600">Current AI Authority Score</div>
              </div>

              <div className="space-y-4">
                {competitiveAnalysis.competitors.map((competitor, idx) => (
                  <motion.div
                    key={competitor.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      competitor.isCurrent ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        competitor.isCurrent ? 'bg-blue-500' :
                        competitor.score > competitiveAnalysis.yourPosition.score ? 'bg-red-500' : 'bg-green-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{competitor.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${
                            competitor.isCurrent ? 'bg-blue-500' :
                            competitor.score > competitiveAnalysis.yourPosition.score ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((competitor.score / 82) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.6 + idx * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{competitor.score}</div>
                        <div className="text-xs text-gray-500">{competitor.gap > 0 ? `+${competitor.gap} ahead` : `${Math.abs(competitor.gap)} behind`}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Topical Clusters */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-white border border-gray-200 rounded-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Topical Clusters</h3>
                <p className="text-sm text-gray-600">Performance across content categories</p>
              </div>

              <div className="space-y-4">
                {topicalClusters.map((cluster, idx) => (
                  <motion.div
                    key={cluster.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-700">
                        #{cluster.rank}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{cluster.topic}</div>
                        <div className="text-xs text-gray-500">{cluster.queries.toLocaleString()} queries</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{cluster.percentage}%</div>
                        <div className="text-xs text-gray-500">of queries</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(cluster.aiImpact)}`}>
                        {cluster.expectedLift}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Actionable Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Critical Actions */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Critical Actions</h3>
                  <p className="text-sm text-gray-600">Immediate high-impact opportunities</p>
                </div>
              </div>

              <div className="space-y-4">
                {actionableInsights.critical.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
                    <div
                      draggable
                      onDragStart={(e: React.DragEvent) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({
                          type: 'insight',
                          title: insight.title,
                          description: insight.description,
                          priority: insight.priority,
                          expectedLift: insight.expectedLift
                        }));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      className="p-6 bg-red-50 border border-red-200 rounded-xl cursor-move hover:shadow-lg transition-shadow"
                    >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-bold text-gray-900">{insight.title}</h4>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                        {insight.expectedLift}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{insight.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {insight.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Score: {insight.score}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${getImpactColor(insight.impact)}`}>
                        {insight.impact.toUpperCase()}
                      </div>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* High Priority Actions */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">High Priority Actions</h3>
                  <p className="text-sm text-gray-600">Strategic growth opportunities</p>
                </div>
              </div>

              <div className="space-y-4">
                {actionableInsights.high.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                  >
                    <div
                      draggable
                      onDragStart={(e: React.DragEvent) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({
                          type: 'insight',
                          title: insight.title,
                          description: insight.description,
                          priority: insight.priority,
                          expectedLift: insight.expectedLift
                        }));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl cursor-move hover:shadow-lg transition-shadow"
                    >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-bold text-gray-900">{insight.title}</h4>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                        {insight.expectedLift}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{insight.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {insight.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Score: {insight.score}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${getImpactColor(insight.impact)}`}>
                        {insight.impact.toUpperCase()}
                      </div>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Additional Metrics Grid */}
        <motion.div variants={fadeInUp}>
          <Card className="p-8 bg-white border border-gray-200 rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI Visibility Metrics</h3>
              <p className="text-sm text-gray-600">Comprehensive performance indicators</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Content Citations', value: aiVisibilityMetrics.contentCitations.value, change: aiVisibilityMetrics.contentCitations.change, icon: FileText, color: 'text-blue-600' },
                { label: 'Search Visibility', value: aiVisibilityMetrics.searchVisibility.value, change: aiVisibilityMetrics.searchVisibility.change, icon: Search, color: 'text-green-600' },
                { label: 'Social Mentions', value: aiVisibilityMetrics.socialMentions.value, change: aiVisibilityMetrics.socialMentions.change, icon: Users, color: 'text-purple-600' },
                { label: 'Backlink Authority', value: aiVisibilityMetrics.backlinkAuthority.value, change: aiVisibilityMetrics.backlinkAuthority.change, icon: Globe, color: 'text-orange-600' }
              ].map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center justify-center mb-3">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    {getChangeIcon(metric.change)}
                    <span className={getChangeColor(metric.change)}>+{metric.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}