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
  Activity
} from 'lucide-react';
import LLMDetailView from './LLMDetailView';

interface ExecutiveSummaryProps {
  data: any;
}

export default function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { ai_visibility_overview = {}, data_sources = [], analysis_period = {} } = data || {};
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const getScoreAnalysis = (score: number) => {
    if (score >= 70) return { label: 'Strong', description: 'Above industry standard' };
    if (score >= 40) return { label: 'Moderate', description: 'Room for improvement' };
    return { label: 'Critical', description: 'Immediate attention needed' };
  };

  const dataSourceIcons: { [key: string]: any } = {
    'Google Search Console': <Search className="w-3 h-3" />,
    'SEMrush': <Globe className="w-3 h-3" />,
    'LLM Testing Suite': <Brain className="w-3 h-3" />,
    'Google Trends': <TrendingUp className="w-3 h-3" />,
    'Reddit Analysis': <FileText className="w-3 h-3" />,
    'Ahrefs': <Database className="w-3 h-3" />
  };

  const llmData = {
    'ChatGPT (Browse: ON)': {
      name: 'ChatGPT (Browse: ON)',
      score: 72,
      previousScore: 68,
      change: 4,
      weight: 40,
      citationAnalysis: {
        mentionedIn: 8,
        totalQueries: 10,
        averagePosition: 3,
        citationContext: 'automation/technical authority'
      },
      whatsWorking: [
        'Migration guide cited 5x in automation queries',
        'Strong technical depth in step-by-step content',
        'Clear structure with numbered lists preferred'
      ],
      gapsAndOpportunities: [
        'Not appearing for "workflow comparison" queries',
        'Zapier cited 3x more for integration topics',
        'Missing structured data markup for better discovery'
      ],
      recommendedActions: [
        'Add more comparison tables to migration content',
        'Include specific integration examples with code',
        'Implement Article schema markup on all guides'
      ]
    },
    'ChatGPT (Browse: OFF)': {
      name: 'ChatGPT (Browse: OFF)',
      score: 58,
      previousScore: 55,
      change: 3,
      weight: 20,
      citationAnalysis: {
        mentionedIn: 5,
        totalQueries: 10,
        averagePosition: 5,
        citationContext: 'general automation knowledge'
      },
      whatsWorking: [
        'Basic automation concepts well covered',
        'Simple explanations get cited for beginner queries'
      ],
      gapsAndOpportunities: [
        'Not appearing for advanced technical queries',
        'Missing recent updates and trends',
        'Competitors have more current examples'
      ],
      recommendedActions: [
        'Update content with 2024 automation trends',
        'Add more recent case studies and examples',
        'Focus on practical implementation details'
      ]
    },
    'Claude': {
      name: 'Claude',
      score: 71,
      previousScore: 69,
      change: 2,
      weight: 25,
      citationAnalysis: {
        mentionedIn: 7,
        totalQueries: 10,
        averagePosition: 2,
        citationContext: 'technical depth/analysis'
      },
      whatsWorking: [
        'Technical deep-dives highly cited',
        'Code examples and implementation details preferred',
        'Analytical approach resonates well'
      ],
      gapsAndOpportunities: [
        'Not appearing for business strategy queries',
        'Missing industry-specific use cases',
        'Could use more data-driven insights'
      ],
      recommendedActions: [
        'Add more technical implementation guides',
        'Include industry-specific automation examples',
        'Provide more quantitative analysis and metrics'
      ]
    },
    'Perplexity': {
      name: 'Perplexity',
      score: 65,
      previousScore: 63,
      change: 2,
      weight: 15,
      citationAnalysis: {
        mentionedIn: 6,
        totalQueries: 10,
        averagePosition: 4,
        citationContext: 'research/analysis authority'
      },
      whatsWorking: [
        'Research-backed content gets cited',
        'Multiple source references preferred',
        'Comprehensive coverage of topics'
      ],
      gapsAndOpportunities: [
        'Not appearing for real-time queries',
        'Missing recent news and updates',
        'Could use more primary research'
      ],
      recommendedActions: [
        'Add more recent research and studies',
        'Include primary data and surveys',
        'Focus on comprehensive topic coverage'
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Subtle Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Subtle gradient mesh background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        </div>
        
        <div className="relative bg-white border border-gray-200 rounded-xl p-12">
          <div className="max-w-5xl">
            <motion.div {...fadeInUp}>
              <h1 className="text-5xl font-extralight text-gray-900 mb-4 leading-tight">
                Your Content Intelligence Report
              </h1>
              <div className="w-full h-px bg-gray-200 mb-6" />
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                Comprehensive analysis from {analysis_period.start || 'January 20'} to {analysis_period.end || 'January 27, 2025'}
              </p>
              
              {/* AI Authority Score Section - Simplified */}
              <div className="mb-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI Authority Score</h2>
                    <p className="text-sm text-gray-600">How well AI assistants recognize and cite your content</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-gray-900 mb-1">{ai_visibility_overview?.visibility_snapshot?.overall_score || "67/100"}</div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <ArrowUpRight className="w-4 h-4" />
                      +12 from last week
                    </div>
                  </div>
                </div>
                
                {/* Top 3 Priorities Callout */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Top 3 Priorities</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Create comparison content for "Zapier alternatives" (14,500 monthly searches)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700">Add pricing transparency content to capture cost-conscious buyers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Implement schema markup for +40% CTR boost</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Platform Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(ai_visibility_overview?.platform_performance || {}).map(([key, platform]: [string, any]) => (
                      <button 
                        key={key}
                        onClick={() => setSelectedLLM(platform.platform)}
                        className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                      >
                        <span className="text-sm font-medium text-gray-700">{platform.platform}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${parseInt(platform.score) || 0}%` }} />
                          </div>
                          <span className="text-sm font-bold text-gray-900">{platform.score}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-500 leading-relaxed max-w-3xl">
                We've analyzed your entire content ecosystem across 6 dimensions, examining 1,247 search queries, 
                testing 127 AI prompts, and reviewing 4,340 pieces of competitive content. This report synthesizes 
                those insights into actionable intelligence.
              </p>
            </motion.div>

            {/* Data Source Badges - Horizontal scroll */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-3 overflow-x-auto scrollbar-hide"
            >
              {data_sources.map((source: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap">
                  {dataSourceIcons[source.source] || <Database className="w-3 h-3" />}
                  <span>{source.source}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics - Simplified Cards */}
      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Object.entries(ai_visibility_overview.key_metrics || {
          ai_search_presence: { name: 'AI Search Presence', score: 15, level: 'Moderate' },
          content_citation_rate: { name: 'Content Citation Rate', score: 10, level: 'Low' },
          query_coverage: { name: 'Query Coverage', score: 35, level: 'Critical Gap' },
          competitive_share_of_voice: { name: 'Competitive Share of Voice', score: 34.6, level: 'Low' }
        }).map(([key, metric]: [string, any], idx) => {
          const score = typeof metric.score === 'string' ? parseFloat(metric.score.replace('%', '')) : metric.score;
          const analysis = getScoreAnalysis(score);
          const isExpanded = expandedCard === key;
          
          // Color coding based on score
          const getScoreColor = (score: number) => {
            if (score >= 70) return 'text-green-600 bg-green-50';
            if (score >= 40) return 'text-yellow-600 bg-yellow-50';
            return 'text-red-600 bg-red-50';
          };
          
          return (
            <motion.div
              key={key}
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedCard(isExpanded ? null : key)}
              className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              {/* Header with Icon and Score */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {key === 'ai_search_presence' && <Brain className="w-4 h-4 text-gray-600" />}
                    {key === 'content_citation_rate' && <Target className="w-4 h-4 text-gray-600" />}
                    {key === 'query_coverage' && <Search className="w-4 h-4 text-gray-600" />}
                    {key === 'competitive_share_of_voice' && <BarChart3 className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{metric.name}</h3>
                    <p className="text-xs text-gray-500">{analysis.label}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      score >= 70 ? 'bg-green-500' : 
                      score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Action Required */}
              <div className="text-xs text-gray-600 mb-3">
                {metric.action_required || metric.insight || 'No specific action required'}
              </div>
              
              {/* Expand Button */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{metric.priority || 'P2 - Monitor'}</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                      <p className="mb-2">View detailed analysis →</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Key Finding - Executive Brief */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-1 h-16 bg-gray-900 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Key Finding
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {ai_visibility_overview.visibility_snapshot.biggest_win || "47% of searches are problem-focused with 3.2x higher conversion intent but 67% less competition than solution searches. This represents an immediate opportunity to capture high-intent traffic by addressing user pain points directly."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Strategic Insights Grid - Premium Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Critical Gaps */}
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Critical Gaps</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "Purchase-Stage Content", detail: "2 posts vs. 15-20 industry standard", severity: "high" },
                { title: "AI Platform Visibility", detail: "4% mention rate vs. 87% benchmark", severity: "critical" },
                { title: "Migration Content", detail: "Missing 60% of switcher market", severity: "medium" }
              ].map((gap, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="border-l-2 border-gray-300 pl-4 py-1"
                >
                  <p className="text-sm font-medium text-gray-800">{gap.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{gap.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Major Opportunities */}
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Major Opportunities</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "AI-Native Leadership", detail: "4,400 searches/mo (+23% QoQ)" },
                { title: "Competitor Migration", detail: "8,100 high-intent searches" },
                { title: "Problem-Space Authority", detail: "3.2x intent, 67% less competition" }
              ].map((opp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="border-l-2 border-gray-900 pl-4 py-1"
                >
                  <p className="text-sm font-medium text-gray-800">{opp.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{opp.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Wins */}
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">30-Day Actions</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "Add FAQ Sections", impact: "50+ featured snippets" },
                { title: "Technical SEO Fixes", impact: "+30% ranking potential" },
                { title: "Pricing Calculator", impact: "2.3x conversion uplift" }
              ].map((action, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Strategic Impact Assessment - Dark Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900 text-white rounded-xl p-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-extralight mb-4">Strategic Impact Assessment</h3>
          <p className="text-gray-400 mb-8 text-lg font-light leading-relaxed">
            This analysis identifies <span className="font-normal text-white">~30% growth potential</span> through 
            strategic content optimization and enhanced AI visibility.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              View Strategic Paths
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Export Full Report
            </motion.button>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* LLM Detail View Modal */}
      {selectedLLM && llmData[selectedLLM as keyof typeof llmData] && (
        <LLMDetailView
          llmData={llmData[selectedLLM as keyof typeof llmData]}
          onClose={() => setSelectedLLM(null)}
        />
      )}
    </div>
  );
}