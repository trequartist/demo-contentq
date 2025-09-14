import React from 'react';
import { Card, Badge } from '@/components/ui';
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
  ArrowDownRight
} from 'lucide-react';

interface ExecutiveSummaryProps {
  data: any;
}

export default function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { executive_summary, data_sources, analysis_period } = data;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-50 border-green-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-transparent rounded-2xl" />
        
        <div className="relative">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="text-5xl font-light text-gray-900 mb-3">
              {executive_summary.headline}
            </h1>
            <p className="text-xl text-gray-600 font-light italic">
              {executive_summary.subheadline}
            </p>
          </motion.div>

          {/* Data Sources Badge Strip */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm text-gray-500 mb-4 text-center">Analysis Scope</p>
            <div className="flex flex-wrap justify-center gap-3">
              {data_sources.map((source: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-lg">{source.icon}</span>
                  <span className="font-medium text-gray-700">{source.source}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{source.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Executive Briefing Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 mb-12"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              Executive Briefing
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light">
              {executive_summary.key_finding}
            </p>
          </motion.div>

          {/* Performance Snapshot Grid */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Object.entries(executive_summary.performance_snapshot).map(([key, metric]: [string, any], idx) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-6 border rounded-xl ${getScoreBg(metric.score)}`}>
                  {/* Icon and Score */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                      {key === 'search_visibility' && <Search className="w-6 h-6 text-purple-600" />}
                      {key === 'ai_discoverability' && <Brain className="w-6 h-6 text-blue-600" />}
                      {key === 'technical_excellence' && <BarChart3 className="w-6 h-6 text-green-600" />}
                      {key === 'market_penetration' && <Target className="w-6 h-6 text-orange-600" />}
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-light ${getScoreColor(metric.score)}`}>
                        {metric.score}
                        <span className="text-lg text-gray-500">{metric.unit || ''}</span>
                      </div>
                      {metric.max && (
                        <div className="text-sm text-gray-500">of {metric.max}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Metric Details */}
                  <h3 className="font-medium text-gray-900 mb-1">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  
                  {/* Progress Bar */}
                  {metric.max && (
                    <div className="mt-4">
                      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${
                            metric.score >= 70 ? 'bg-green-500' :
                            metric.score >= 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.score / metric.max) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Key Insights Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Critical Insights */}
        <Card className="border-red-200 bg-red-50/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-medium text-gray-900">Critical Gaps</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Purchase-Stage Content Void</p>
                  <p className="text-xs text-gray-600 mt-0.5">Only 2 posts vs. industry standard 15-20</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">AI Platform Invisibility</p>
                  <p className="text-xs text-gray-600 mt-0.5">4% mention rate vs. Zapier's 87%</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Zero Migration Content</p>
                  <p className="text-xs text-gray-600 mt-0.5">Missing 60% of switcher market</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>

        {/* Opportunities */}
        <Card className="border-green-200 bg-green-50/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Major Opportunities</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">AI-Native Category Leadership</p>
                  <p className="text-xs text-gray-600 mt-0.5">4,400 searches/mo growing 23% QoQ</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Zapier Refugee Capture</p>
                  <p className="text-xs text-gray-600 mt-0.5">8,100 searches for "Zapier too expensive"</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Problem-Space Authority</p>
                  <p className="text-xs text-gray-600 mt-0.5">3.2x higher intent, 67% lower competition</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>

        {/* Quick Wins */}
        <Card className="border-blue-200 bg-blue-50/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">30-Day Quick Wins</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Add FAQ Sections</p>
                  <p className="text-xs text-gray-600 mt-0.5">Capture 50+ featured snippets</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Fix Technical SEO</p>
                  <p className="text-xs text-gray-600 mt-0.5">+30% ranking potential</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Launch Pricing Calculator</p>
                  <p className="text-xs text-gray-600 mt-0.5">2.3x better conversion rates</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-light mb-3">Ready to Transform Your Content Strategy?</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          This report identifies <span className="font-semibold">~30% potential growth</span> opportunity
          through strategic content optimization and AI visibility enhancement.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            View Strategic Paths
          </button>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-400 transition-colors">
            Export Full Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}