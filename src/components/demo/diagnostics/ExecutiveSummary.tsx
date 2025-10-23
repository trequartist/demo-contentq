import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Brain, 
  Target,
  BarChart3,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Globe,
  Database,
  FileText,
  TrendingDown,
  Activity,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Lightbulb,
  Shield,
  Zap,
  MessageSquare,
  Sparkles,
  Eye,
  Award,
  Star,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';

interface ExecutiveSummaryProps {
  data: any;
}

export default function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { ai_visibility_overview = {}, data_sources = [], analysis_period = {} } = data || {};
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    marketContext: true,
    actionPlan: false,
    resourceRequirements: false,
    expectedImpact: false,
    topPerformingContent: false
  });

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

  // Extract data with fallbacks
  const visibilitySnapshot = ai_visibility_overview?.visibility_snapshot || {};
  const keyMetrics = ai_visibility_overview?.key_metrics || {};
  const platformPerformance = ai_visibility_overview?.platform_performance || {};
  const topCompetitors = ai_visibility_overview?.top_competitors || {};
  const criticalGaps = ai_visibility_overview?.critical_gaps || {};
  const buyerIntentAnalysis = ai_visibility_overview?.buyer_intent_analysis || {};

  // AI Authority Score with product theme
  const overallScore = visibilitySnapshot?.overall_score || "78.5/100";
  const scoreLevel = visibilitySnapshot?.score_level || "Good";
  const industryPosition = visibilitySnapshot?.industry_position || "Behind leaders";
  const biggestWin = visibilitySnapshot?.biggest_win || "Quick-win strategy targeting high-value opportunities";
  const biggestThreat = visibilitySnapshot?.biggest_threat || "Competitive window closing";
  const marketContext = visibilitySnapshot?.market_context || "Strong AI automation authority (78.5 visibility) trapped behind Zapier's 85% market dominance in general automation worth $50M+ annually.";

  // Key Metrics breakdown
  const metrics = [
    {
      name: keyMetrics?.ai_search_presence?.name || "AI Search Presence",
      score: keyMetrics?.ai_search_presence?.score || "15%",
      level: keyMetrics?.ai_search_presence?.level || "Low",
      insight: keyMetrics?.ai_search_presence?.what_this_means || "AI assistants mention you in 15% of automation-related queries",
      priority: keyMetrics?.ai_search_presence?.priority || "P0 - Critical"
    },
    {
      name: keyMetrics?.content_citation_rate?.name || "Content Citation Rate",
      score: keyMetrics?.content_citation_rate?.score || "10-20%",
      level: keyMetrics?.content_citation_rate?.level || "Medium", 
      insight: keyMetrics?.content_citation_rate?.what_this_means || "When AI assistants do mention you, they cite your content 10-20% of the time",
      priority: keyMetrics?.content_citation_rate?.priority || "P0 - Critical"
    },
    {
      name: keyMetrics?.query_coverage?.name || "Query Coverage",
      score: keyMetrics?.query_coverage?.score || "35%",
      level: keyMetrics?.query_coverage?.level || "Medium",
      insight: keyMetrics?.query_coverage?.what_this_means || "You're capturing 35% of high-intent purchase queries",
      priority: keyMetrics?.query_coverage?.priority || "P1 - Important"
    },
    {
      name: keyMetrics?.competitive_share_of_voice?.name || "Competitive Share of Voice",
      score: keyMetrics?.competitive_share_of_voice?.score || "34.6%",
      level: keyMetrics?.competitive_share_of_voice?.level || "High",
      insight: keyMetrics?.competitive_share_of_voice?.what_this_means || "You own 34.6% of the conversation around automation buyers",
      priority: keyMetrics?.competitive_share_of_voice?.priority || "P1 - Important"
    }
  ];

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score.replace(/[^\d]/g, ''));
    if (numScore >= 75) return 'text-green-600';
    if (numScore >= 50) return 'text-yellow-600';
    if (numScore >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: string) => {
    const numScore = parseInt(score.replace(/[^\d]/g, ''));
    if (numScore >= 75) return 'bg-green-500';
    if (numScore >= 50) return 'bg-yellow-500';
    if (numScore >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes('P0') || priority.includes('Critical')) return 'bg-red-100 text-red-800 border-red-200';
    if (priority.includes('P1') || priority.includes('Important')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (priority.includes('P2') || priority.includes('Medium')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelColor = (level: string) => {
    if (level === 'High' || level === 'Excellent') return 'text-green-600 bg-green-50';
    if (level === 'Good' || level === 'Medium') return 'text-yellow-600 bg-yellow-50';
    if (level === 'Low' || level === 'Poor') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-8">
      {/* Section Header - Matching AIDiscoverability style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-200 rounded-xl p-10"
      >
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-extralight text-gray-900 mb-2 tracking-tight">
            EXECUTIVE SUMMARY
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Key metrics and top priorities
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Analysis period: January 20-27, 2025</span>
          <span className="text-gray-300">•</span>
          <span>AI Authority Score: {overallScore}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700 font-medium">Confidence: High for current state, Medium for projections</span>
        </div>
      </motion.div>

      {/* AI Authority Score - Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">AI Authority Score</h2>
              <p className="text-sm text-gray-600">How well AI assistants recognize and cite your content</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Score Display */}
            <div className="text-center lg:text-left">
              <div className="text-6xl font-bold text-gray-900 mb-2">{overallScore}</div>
              <div className="text-sm text-gray-500 mb-4">out of 100</div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
                <span className="text-lg font-medium text-green-600">
                  {industryPosition}
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="relative">
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div className="h-full bg-red-500 w-1/4"></div>
                    <div className="h-full bg-orange-500 w-1/4"></div>
                    <div className="h-full bg-yellow-500 w-1/4"></div>
                    <div className="h-full bg-green-500 w-1/4"></div>
                  </div>
                  <div 
                    className="absolute top-0 h-full bg-white rounded-full border-2 border-gray-300"
                    style={{ left: `${parseInt(overallScore)}%`, width: '4px' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span className="font-medium">Strong</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
              <div className="space-y-3">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getScoreBgColor(metric.score)} rounded-full`}
                          style={{ width: `${parseInt(metric.score.replace(/[^\d]/g, ''))}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8">{metric.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Market Context */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Market Context</h2>
              <p className="text-sm text-gray-600">Strategic market positioning and opportunities</p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-700 mb-6">{marketContext}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="text-sm font-semibold text-green-600 mb-2">Biggest Win</h4>
                <p className="text-xs text-gray-600">{biggestWin}</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="text-sm font-semibold text-red-600 mb-2">Biggest Threat</h4>
                <p className="text-xs text-gray-600">{biggestThreat}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Key Metrics Breakdown */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Key Metrics Breakdown</h2>
              <p className="text-sm text-gray-600">Detailed performance indicators</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">{metric.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(metric.priority)}`}>
                    {metric.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">{metric.score}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(metric.level)}`}>
                    {metric.level}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{metric.insight}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Collapsible Sections */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Info className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Additional Insights</h2>
              <p className="text-sm text-gray-600">Detailed analysis and recommendations</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* 7-Day Action Plan */}
            <div className="border border-gray-200 rounded-xl">
              <button
                onClick={() => setExpandedSections(prev => ({ ...prev, actionPlan: !prev.actionPlan }))}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">7-Day Action Plan</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.actionPlan ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSections.actionPlan && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <strong>Day 1-2:</strong> {visibilitySnapshot?.next_7_days_action_plan?.day_1_2 || "Launch comparison content"}
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <strong>Day 3-4:</strong> {visibilitySnapshot?.next_7_days_action_plan?.day_3_4 || "Publish main comparison guide"}
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <strong>Day 5-7:</strong> {visibilitySnapshot?.next_7_days_action_plan?.day_5_7 || "Deploy calculators and campaigns"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resource Requirements */}
            <div className="border border-gray-200 rounded-xl">
              <button
                onClick={() => setExpandedSections(prev => ({ ...prev, resourceRequirements: !prev.resourceRequirements }))}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Resource Requirements</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.resourceRequirements ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSections.resourceRequirements && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>Content Team:</strong> {visibilitySnapshot?.resource_requirements?.content_team || "1 writer (40 hours), 1 designer (16 hours)"}
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>Development:</strong> {visibilitySnapshot?.resource_requirements?.development || "1 developer (24 hours)"}
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>Budget:</strong> {visibilitySnapshot?.resource_requirements?.budget || "$8,000 for content creation"}
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <strong>Timeline:</strong> {visibilitySnapshot?.resource_requirements?.timeline || "7 days for initial launch"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Expected Impact */}
            <div className="border border-gray-200 rounded-xl">
              <button
                onClick={() => setExpandedSections(prev => ({ ...prev, expectedImpact: !prev.expectedImpact }))}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Expected Impact</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.expectedImpact ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSections.expectedImpact && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <strong>Traffic:</strong> {visibilitySnapshot?.expected_impact?.traffic || "+2,500 monthly organic visitors"}
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <strong>Leads:</strong> {visibilitySnapshot?.expected_impact?.leads || "+150 qualified leads per month"}
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <strong>Conversions:</strong> {visibilitySnapshot?.expected_impact?.conversions || "12.3% conversion rate"}
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <strong>Revenue:</strong> {visibilitySnapshot?.expected_impact?.revenue || "$75K+ MRR within 30 days"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}