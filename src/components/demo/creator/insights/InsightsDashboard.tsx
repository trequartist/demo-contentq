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
  Trophy
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
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);

  const aiAuthority = data?.aiAuthority || {};
  const competitiveMetrics = data?.competitiveMetrics || {};
  const topicalClusters = data?.topicalClusters || [];
  const actionableInsights = data?.actionableInsights || {};
  const kpis = data?.kpis || [];
  const analytics = data?.analytics || {};

  const generateSparkline = (data: number[], width = 100, height = 30) => {
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
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactEmoji = (impact: string) => {
    switch (impact) {
      case 'high': return '🟢';
      case 'medium': return '🟡';
      case 'low': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F8]">
      <div className="px-6 py-6 xl:px-10 xl:py-8 mx-auto w-full max-w-7xl space-y-6">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data?.hero?.title || 'AI Authority Intelligence Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            {data?.hero?.subtitle || 'Real-time AI visibility metrics, competitive intelligence, and prioritized actions.'}
          </p>
        </motion.div>

        {/* Key Metrics Grid - Bento Style */}
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {kpis.map((kpi: any, index: number) => (
            <motion.div key={kpi.id} variants={fadeInUp}>
              <Card className="p-4 bg-white border-0 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {index === 0 && <Brain className="w-4 h-4 text-gray-600" />}
                    {index === 1 && <Target className="w-4 h-4 text-gray-600" />}
                    {index === 2 && <Lightbulb className="w-4 h-4 text-gray-600" />}
                    {index === 3 && <Trophy className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {kpi.delta?.startsWith('+') ? (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                    )}
                    <span className={kpi.delta?.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {kpi.delta}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* AI Authority Score - Large Card */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="lg:col-span-2">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">AI Authority Score</h2>
                  <p className="text-xs text-gray-500">Blended visibility across all LLMs</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{aiAuthority.score}/100</div>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    {aiAuthority.change > 0 ? (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                    )}
                    <span className={aiAuthority.change > 0 ? 'text-green-600' : 'text-red-600'}>
                      {aiAuthority.change} from last week
                    </span>
                  </div>
                </div>
              </div>

              {/* LLM Breakdown */}
              <div className="space-y-3">
                {Object.entries(aiAuthority.llmBreakdown || {}).map(([llm, score]) => {
                  const weight = aiAuthority.llmWeights?.[llm] || 0;
                  const llmName = llm === 'chatgptBrowse' ? 'ChatGPT (Browse: ON)' :
                                llm === 'chatgptNoBrowse' ? 'ChatGPT (Browse: OFF)' :
                                llm === 'claude' ? 'Claude' : 'Perplexity';
                  
                  return (
                    <div key={llm} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-32">{llmName}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-900 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-900 w-6">{String(score)}</span>
                        <span className="text-xs text-gray-400 w-6">{weight}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Authority Trend Chart - Small Card */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="p-6 bg-white border-0 shadow-sm h-full">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Authority Trend</h3>
              <div className="flex items-center justify-center h-24">
                {generateSparkline(analytics.authorityTrend || [55, 58, 62, 65, 67, 70], 200, 80)}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">6-month progression</p>
            </Card>
          </motion.div>
        </div>

        {/* Competitive Intelligence - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Competitive Overview */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Competitive Position</h3>
              
              {/* Your Score */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">YOU: {aiAuthority.score}/100</div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: `${aiAuthority.score}%` }} />
                </div>
              </div>

              {/* Top Competitors */}
              <div className="space-y-3">
                {competitiveMetrics.competitors?.slice(0, 3).map((competitor: any) => (
                  <div key={competitor.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        competitor.isCurrent ? 'bg-gray-900' :
                        competitor.aiScore > aiAuthority.score ? 'bg-red-500' : 'bg-green-500'
                      }`} />
                      <span className="text-xs text-gray-600">{competitor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-900">{competitor.aiScore}</span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            competitor.isCurrent ? 'bg-gray-900' :
                            competitor.aiScore > aiAuthority.score ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${competitor.aiScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Topical Clusters */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Topical Clusters</h3>
              <div className="space-y-3">
                {topicalClusters.slice(0, 4).map((cluster: any) => (
                  <div key={cluster.topic} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">#{cluster.rank}</span>
                      <span className="text-xs text-gray-900 truncate">{cluster.topic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{cluster.percentage}%</span>
                      <Badge className={`text-xs ${
                        cluster.aiImpact === 'high' ? 'bg-green-100 text-green-800' :
                        cluster.aiImpact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getImpactEmoji(cluster.aiImpact)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Actionable Insights - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Critical Actions */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Critical Actions
              </h3>
              <div className="space-y-3">
                {actionableInsights.critical?.slice(0, 3).map((insight: any, index: number) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900">{insight.title}</h4>
                      <Badge className="bg-red-100 text-red-800 text-xs">{insight.expectedLift}</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-2 line-clamp-2">{insight.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{insight.timeline}</span>
                      <span>Score: {insight.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* High Priority Actions */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="p-6 bg-white border-0 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                High Priority Actions
              </h3>
              <div className="space-y-3">
                {actionableInsights.high?.slice(0, 3).map((insight: any, index: number) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-900">{insight.title}</h4>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">{insight.expectedLift}</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-2 line-clamp-2">{insight.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{insight.timeline}</span>
                      <span>Score: {insight.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
