import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  Lightbulb,
  Shield,
  Zap,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ActionableIntelligenceProps {
  data: any;
}

export default function ActionableIntelligence({ data }: ActionableIntelligenceProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

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

  // Mock data for actionable insights - similar to the screenshots
  const criticalInsights = [
    {
      id: 'reviews',
      title: 'Get More Third-Party Reviews on Trusted Sites',
      score: 9.5,
      priority: 'Critical',
      description: 'Your brand is only cited twice, and one of those is from Clutch.co. Competitors like ScienceSoft and BairesDev appear in third-party reviews 6-10 times more often.',
      impact: 'Increase third-party review citations from 1 to at least 4 within 6 months, matching competitor visibility.',
      actions: [
        'Ask recent clients to leave honest reviews on Clutch.co and DesignRush.com',
        'Feature a link to Clutch and other review sites on your website and in email signatures',
        'Respond to all reviews, positive or negative, to show engagement',
        'Update your Clutch profile with new case studies and testimonials'
      ],
      timeline: '6 months',
      effort: 'Low',
      icon: Shield
    },
    {
      id: 'wikipedia',
      title: 'Get a Wikipedia Page for Your Brand',
      score: 8.9,
      priority: 'Critical',
      description: 'Competitors like Netguru, Endava, and Eleks are cited 3-6 times via Wikipedia, but your brand has none. A Wikipedia page can increase trust and citations by 30%.',
      impact: 'Gain 1-2 Wikipedia citations in AI search results within 6 months, improving credibility.',
      actions: [
        'Gather third-party sources and news about your brand',
        'Draft a neutral, fact-based Wikipedia page',
        'Submit the page for review and monitor for updates',
        'Encourage media coverage to support Wikipedia notability'
      ],
      timeline: '6 months',
      effort: 'Medium',
      icon: FileText
    },
    {
      id: 'content',
      title: 'Create More Content on Key Authentication Topics',
      score: 8.8,
      priority: 'Critical',
      description: 'Your brand is missing from key authentication discussions. Competitors dominate this space with 3x more content coverage.',
      impact: 'Capture 40% of authentication-related queries within 4 months.',
      actions: [
        'Create comprehensive guides on authentication best practices',
        'Publish case studies showing successful implementations',
        'Develop technical tutorials with code examples',
        'Partner with industry experts for co-created content'
      ],
      timeline: '4 months',
      effort: 'High',
      icon: FileText
    },
    {
      id: 'communities',
      title: 'Increase Presence in Developer Communities',
      score: 8.0,
      priority: 'Critical',
      description: 'Developer communities are a key source of AI citations. Your brand has minimal presence compared to competitors.',
      impact: 'Achieve 25% increase in developer community mentions within 3 months.',
      actions: [
        'Actively participate in Stack Overflow discussions',
        'Contribute to GitHub repositories and open source projects',
        'Engage in Reddit developer communities',
        'Host webinars and technical talks'
      ],
      timeline: '3 months',
      effort: 'Medium',
      icon: Users
    }
  ];

  const highPriorityInsights = [
    {
      id: 'seo',
      title: 'Optimize Technical SEO for AI Crawlers',
      score: 7.5,
      priority: 'High',
      description: 'AI crawlers need structured data to understand your content better.',
      impact: 'Improve AI understanding by 60% within 2 months.',
      actions: [
        'Implement JSON-LD structured data',
        'Add FAQ schema markup',
        'Optimize meta descriptions for AI context',
        'Create clear content hierarchies'
      ],
      timeline: '2 months',
      effort: 'Medium',
      icon: Zap
    },
    {
      id: 'partnerships',
      title: 'Build Strategic Content Partnerships',
      score: 7.0,
      priority: 'High',
      description: 'Partner with industry leaders to increase your content reach and authority.',
      impact: 'Gain 50% more content citations through partnerships.',
      actions: [
        'Identify key industry influencers',
        'Propose co-created content opportunities',
        'Guest post on high-authority sites',
        'Create joint research reports'
      ],
      timeline: '4 months',
      effort: 'High',
      icon: Users
    },
    {
      id: 'thought-leadership',
      title: 'Establish Thought Leadership Content',
      score: 6.5,
      priority: 'High',
      description: 'Position your brand as an industry expert through original research and insights.',
      impact: 'Become a go-to source for industry insights within 6 months.',
      actions: [
        'Conduct original industry research',
        'Publish quarterly trend reports',
        'Host industry roundtables',
        'Create executive-level content'
      ],
      timeline: '6 months',
      effort: 'High',
      icon: Lightbulb
    },
    {
      id: 'local-presence',
      title: 'Strengthen Local Market Presence',
      score: 6.0,
      priority: 'High',
      description: 'Improve local market visibility and community engagement.',
      impact: 'Increase local market share by 30% within 5 months.',
      actions: [
        'Optimize for local search queries',
        'Engage with local business communities',
        'Create location-specific content',
        'Build local media relationships'
      ],
      timeline: '5 months',
      effort: 'Medium',
      icon: Target
    }
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === 'Critical') return 'bg-red-100 text-red-800 border-red-200';
    if (priority === 'High') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-red-600';
    if (score >= 8) return 'text-orange-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getEffortColor = (effort: string) => {
    if (effort === 'Low') return 'bg-green-100 text-green-800';
    if (effort === 'Medium') return 'bg-yellow-100 text-yellow-800';
    if (effort === 'High') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Section Header - Matching other diagnostics components */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-200 rounded-xl p-10"
      >
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-extralight text-gray-900 mb-2 tracking-tight">
            ACTIONABLE INTELLIGENCE
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Prioritized recommendations for AI authority optimization
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Analysis period: January 20-27, 2025</span>
          <span className="text-gray-300">•</span>
          <span>4 Critical actions identified</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700 font-medium">Confidence: High for current state, Medium for projections</span>
        </div>
      </motion.div>

      {/* Critical Priority Section */}
      <motion.div {...fadeInUp}>
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Critical Priority Actions</h2>
              <p className="text-sm text-gray-600">Immediate high-impact opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {criticalInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <insight.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(insight.effort)}`}>
                          {insight.effort} Effort
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(insight.score)}`}>
                      {insight.score}
                    </div>
                    <div className="text-xs text-gray-500">out of 10</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {insight.description}
                </p>

                {/* Impact */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-600" />
                    Goal
                  </h4>
                  <p className="text-xs text-gray-700">{insight.impact}</p>
                </div>

                {/* Timeline and Effort */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{insight.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{insight.effort} effort</span>
                  </div>
                </div>

                {/* Expand Button */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-medium text-gray-700">View detailed action steps</span>
                  <ArrowRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedInsight === insight.id ? 'rotate-90' : ''}`} />
                </div>

                {/* Expandable Actions */}
                <AnimatePresence>
                  {expandedInsight === insight.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Action Steps
                        </h4>
                        <div className="space-y-2">
                          {insight.actions.map((action, actionIdx) => (
                            <motion.div 
                              key={actionIdx} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: actionIdx * 0.1 }}
                              className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded-lg"
                            >
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-green-700">{actionIdx + 1}</span>
                              </div>
                              <span className="text-xs font-medium text-gray-800">{action}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* High Priority Section */}
      <motion.div {...fadeInUp}>
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">High Priority Actions</h2>
              <p className="text-sm text-gray-600">Strategic growth opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highPriorityInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <insight.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(insight.effort)}`}>
                          {insight.effort} Effort
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(insight.score)}`}>
                      {insight.score}
                    </div>
                    <div className="text-xs text-gray-500">out of 10</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {insight.description}
                </p>

                {/* Impact */}
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="text-xs font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-orange-600" />
                    Goal
                  </h4>
                  <p className="text-xs text-gray-700">{insight.impact}</p>
                </div>

                {/* Timeline and Effort */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{insight.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{insight.effort} effort</span>
                  </div>
                </div>

                {/* Expand Button */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-medium text-gray-700">View detailed action steps</span>
                  <ArrowRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedInsight === insight.id ? 'rotate-90' : ''}`} />
                </div>

                {/* Expandable Actions */}
                <AnimatePresence>
                  {expandedInsight === insight.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Action Steps
                        </h4>
                        <div className="space-y-2">
                          {insight.actions.map((action, actionIdx) => (
                            <motion.div 
                              key={actionIdx} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: actionIdx * 0.1 }}
                              className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded-lg"
                            >
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-green-700">{actionIdx + 1}</span>
                              </div>
                              <span className="text-xs font-medium text-gray-800">{action}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}