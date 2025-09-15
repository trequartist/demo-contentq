import React from 'react';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Brain, 
  Target,
  BarChart3,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';

interface ExecutiveSummaryProps {
  data: any;
}

export default function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  // Version: Executive Aesthetic Update v2
  const { executive_summary, data_sources, analysis_period } = data;

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const getScoreStatus = (score: number) => {
    if (score >= 70) return { label: 'Strong', color: 'text-gray-900' };
    if (score >= 40) return { label: 'Moderate', color: 'text-gray-700' };
    return { label: 'Needs Attention', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-lg p-8"
      >
        <div className="max-w-4xl">
          <motion.div {...fadeInUp}>
            <h1 className="text-2xl font-light text-gray-900 mb-2">
              {executive_summary.headline}
            </h1>
            <p className="text-gray-600 mb-6">
              {executive_summary.subheadline}
            </p>
          </motion.div>

          {/* Analysis Scope - Minimal */}
          <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <span className="font-medium">Analysis Period: {analysis_period.start} to {analysis_period.end}</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-3">
              {data_sources.map((source: any, idx: number) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className="text-xs">{source.icon}</span>
                  <span>{source.source}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Executive Briefing */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-50 border border-gray-200 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-1 h-12 bg-gray-900 rounded-full flex-shrink-0" />
          <div>
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Executive Briefing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {executive_summary.key_finding}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics - Clean Grid */}
      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.entries(executive_summary.performance_snapshot).map(([key, metric]: [string, any]) => {
          const status = getScoreStatus(metric.score);
          return (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
            >
              {/* Metric Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                  {key === 'search_visibility' && <Search className="w-4 h-4 text-gray-600" />}
                  {key === 'ai_discoverability' && <Brain className="w-4 h-4 text-gray-600" />}
                  {key === 'technical_excellence' && <BarChart3 className="w-4 h-4 text-gray-600" />}
                  {key === 'market_penetration' && <Target className="w-4 h-4 text-gray-600" />}
                </div>
                <span className={`text-xs font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>
              
              {/* Score */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light text-gray-900">{metric.score}</span>
                  {metric.max && <span className="text-sm text-gray-500">/{metric.max}</span>}
                  {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
              
              {/* Progress Indicator - Subtle */}
              {metric.max && (
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gray-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.score / metric.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              )}
              
              {/* Trend - Minimal */}
              {metric.trend && (
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : metric.trend === 'down' ? (
                    <ArrowDownRight className="w-3 h-3" />
                  ) : null}
                  <span>{metric.trend_label}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Strategic Insights - Executive Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Critical Gaps */}
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Critical Gaps</h3>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-sm font-medium text-gray-800">Purchase-Stage Content</p>
                <p className="text-xs text-gray-600 mt-0.5">2 posts vs. 15-20 industry standard</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-sm font-medium text-gray-800">AI Platform Visibility</p>
                <p className="text-xs text-gray-600 mt-0.5">4% mention rate vs. 87% benchmark</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-sm font-medium text-gray-800">Migration Content</p>
                <p className="text-xs text-gray-600 mt-0.5">Missing 60% of switcher market</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Opportunities */}
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Major Opportunities</h3>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-gray-900 pl-4">
                <p className="text-sm font-medium text-gray-800">AI-Native Leadership</p>
                <p className="text-xs text-gray-600 mt-0.5">4,400 searches/mo (+23% QoQ)</p>
              </div>
              <div className="border-l-2 border-gray-900 pl-4">
                <p className="text-sm font-medium text-gray-800">Competitor Migration</p>
                <p className="text-xs text-gray-600 mt-0.5">8,100 high-intent searches</p>
              </div>
              <div className="border-l-2 border-gray-900 pl-4">
                <p className="text-sm font-medium text-gray-800">Problem-Space Authority</p>
                <p className="text-xs text-gray-600 mt-0.5">3.2x intent, 67% less competition</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Wins */}
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Target className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">30-Day Actions</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Add FAQ Sections</p>
                  <p className="text-xs text-gray-600">50+ featured snippets</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Technical SEO Fixes</p>
                  <p className="text-xs text-gray-600">+30% ranking potential</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Pricing Calculator</p>
                  <p className="text-xs text-gray-600">2.3x conversion uplift</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Bottom Section - Refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 text-white rounded-lg p-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-light mb-2">Strategic Impact Assessment</h3>
          <p className="text-gray-300 mb-6">
            This analysis identifies <span className="font-medium text-white">~30% growth potential</span> through 
            strategic content optimization and enhanced AI visibility.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-white text-gray-900 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
              View Strategic Paths
            </button>
            <button className="bg-gray-800 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
              Export Full Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}