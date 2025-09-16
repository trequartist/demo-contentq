import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Search,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Target,
  Info,
  CheckCircle,
  XCircle,
  Zap,
  Activity,
  ArrowRight,
  Globe,
  Database,
  FileText,
  Clock,
  Filter,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchIntelligenceProps {
  data: any;
}

export default function SearchIntelligence({ data }: SearchIntelligenceProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedQueryType, setSelectedQueryType] = useState<string>('problem-aware');
  const [hoveredQuery, setHoveredQuery] = useState<string | null>(null);
  const { search_intelligence = {} } = data || {};

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Query intent classification data
  const queryIntentData = {
    'problem-aware': {
      percentage: '47%',
      queries: [
        { term: 'workflow breaking', volume: '8,900/mo', competition: 'Low' },
        { term: 'automation failed', volume: '6,200/mo', competition: 'Low' },
        { term: 'fix zapier errors', volume: '4,100/mo', competition: 'Low' },
        { term: 'api rate limit', volume: '3,800/mo', competition: 'Low' }
      ]
    },
    'solution-aware': {
      percentage: '31%',
      queries: [
        { term: 'workflow automation tools', volume: '14,500/mo', competition: 'High' },
        { term: 'zapier alternatives', volume: '9,200/mo', competition: 'High' },
        { term: 'automation software', volume: '7,300/mo', competition: 'High' },
        { term: 'no-code automation', volume: '5,100/mo', competition: 'Medium' }
      ]
    },
    'comparison': {
      percentage: '22%',
      queries: [
        { term: 'zapier vs make', volume: '3,200/mo', competition: 'Medium' },
        { term: 'make vs n8n', volume: '2,100/mo', competition: 'Low' },
        { term: 'automation tool comparison', volume: '1,800/mo', competition: 'Medium' },
        { term: 'best workflow automation', volume: '1,500/mo', competition: 'High' }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Premium Design */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-200 rounded-xl p-10"
      >
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-extralight text-gray-900 mb-2 tracking-tight">
            SEARCH INTELLIGENCE & SEO DEEP DIVE
          </h1>
          <p className="text-lg text-gray-600 font-light">
            How 34,000+ users search for solutions in your space
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Based on 12 months of search data across 1,247 queries</span>
          <span className="text-gray-300">•</span>
          <span>Data sources: Google Search Console, Ahrefs, SEMrush, Google Trends</span>
          <span className="text-gray-300">•</span>
          <span>Last updated: January 27, 2025</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700 font-medium">Confidence: High (92%)</span>
        </div>
      </motion.div>

      {/* Executive Briefing with Context */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-8"
      >
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            Understanding how users search reveals not just what they want, but when they're ready to buy. 
            We've categorized 1,247 relevant queries by intent, volume, and competition to identify where you can win.
          </p>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-1 h-16 bg-gray-900 rounded-full flex-shrink-0" />
          <div>
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Key Finding
            </h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              47% of searches are problem-focused with 3.2x higher conversion intent but 67% less competition than solution searches.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Query Intent Classification - Interactive Treemap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h3 className="text-lg font-light text-gray-900 mb-6">The Search Landscape</h3>
            
            {/* Query Type Selector */}
            <div className="flex items-center gap-4 mb-6">
              {Object.entries(queryIntentData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedQueryType(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedQueryType === key 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ({data.percentage})
                </button>
              ))}
            </div>

            {/* Query Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {queryIntentData[selectedQueryType as keyof typeof queryIntentData].queries.map((query, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredQuery(query.term)}
                  onMouseLeave={() => setHoveredQuery(null)}
                  className="relative group"
                >
                  <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    hoveredQuery === query.term 
                      ? 'border-gray-400 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">{query.term}</h4>
                    <p className="text-xs text-gray-600 mb-2">{query.volume}</p>
                    <div className={`text-xs px-2 py-1 rounded inline-block ${
                      query.competition === 'Low' 
                        ? 'bg-gray-100 text-gray-700' 
                        : query.competition === 'Medium'
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-gray-300 text-gray-800'
                    }`}>
                      {query.competition} Competition
                    </div>
                  </div>
                  
                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoveredQuery === query.term && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-10 top-full mt-2 left-0 right-0 bg-gray-900 text-white p-3 rounded-lg text-xs"
                      >
                        <p>Click to see detailed analysis</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Detailed Query Analysis */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">Query Analysis Deep Dive</h3>
          
          <div className="space-y-4">
            {[
              {
                query: '"workflow breaking" Query Analysis',
                volume: '8,900/month',
                trend: '↑23% YoY',
                difficulty: '0.23',
                ranking: 'Not ranking',
                intent: ['Experiencing acute pain point', 'Ready for immediate solution', 'High likelihood of conversion', 'Often followed by branded searches'],
                related: [
                  { query: 'why does my automation keep failing', volume: '3,200/mo' },
                  { query: 'workflow error handling best practices', volume: '2,100/mo' },
                  { query: 'automation debugging tools', volume: '1,800/mo' }
                ],
                opportunity: 'Create comprehensive troubleshooting guide addressing root causes, not just symptoms. Include interactive diagnostic tool for higher engagement.',
                competition: {
                  zapier: 'Generic help docs only',
                  make: 'No dedicated content',
                  n8n: 'Technical documentation only',
                  opportunity: 'Own this problem space'
                }
              }
            ].map((analysis, idx) => (
              <motion.div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(`analysis-${idx}`)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-900">{analysis.query}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === `analysis-${idx}` ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedSection === `analysis-${idx}` && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Search Volume</p>
                            <p className="text-sm font-medium text-gray-900">{analysis.volume}</p>
                            <p className="text-xs text-gray-600">{analysis.trend}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Competition</p>
                            <p className="text-sm font-medium text-gray-900">Low</p>
                            <p className="text-xs text-gray-600">{analysis.difficulty} difficulty</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Current Ranking</p>
                            <p className="text-sm font-medium text-gray-900">{analysis.ranking}</p>
                            <p className="text-xs text-gray-600">(opportunity)</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Intent Type</p>
                            <p className="text-sm font-medium text-gray-900">Problem-aware</p>
                            <p className="text-xs text-gray-600">High conversion</p>
                          </div>
                        </div>

                        {/* User Intent Signals */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-3">User Intent Signals:</h5>
                          <div className="space-y-2">
                            {analysis.intent.map((signal, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span className="text-sm text-gray-700">{signal}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Related Queries */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-3">Related Queries Users Also Search:</h5>
                          <div className="space-y-2">
                            {analysis.related.map((related, rIdx) => (
                              <div key={rIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">{related.query}</span>
                                <span className="text-xs text-gray-500">{related.volume}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Content Opportunity */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Content Opportunity:</h5>
                          <p className="text-sm text-gray-700">{analysis.opportunity}</p>
                        </div>

                        {/* Competitive Landscape */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-3">Competitive Landscape:</h5>
                          <div className="space-y-2">
                            {Object.entries(analysis.competition).map(([comp, status]) => (
                              <div key={comp} className="flex items-center gap-2">
                                {comp === 'opportunity' ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-900">Opportunity: {status}</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-700 capitalize">{comp}: {status}</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Technical SEO Health Assessment */}
      <div className="space-y-6">
        <Card className="bg-white border border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-lg font-light text-gray-900 mb-2">Your Technical Foundation</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extralight text-gray-900">71</span>
                  <span className="text-lg font-extralight text-gray-500">/100</span>
                </div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-gray-700 to-gray-900"
                    initial={{ width: 0 }}
                    animate={{ width: '71%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                While your technical foundation is solid, several optimization opportunities could significantly improve your search visibility. 
                Most issues are quick fixes that could yield immediate results.
              </p>
            </div>

            {/* Core Web Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { metric: 'Largest Contentful Paint (LCP)', value: '2.8s', target: '<2.5s', status: 'Needs Improvement', score: 65 },
                { metric: 'First Input Delay (FID)', value: '95ms', target: '<100ms', status: 'Good', score: 90 },
                { metric: 'Cumulative Layout Shift (CLS)', value: '0.08', target: '<0.1', status: 'Good', score: 85 }
              ].map((vital, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{vital.metric}</h4>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-light text-gray-900">{vital.value}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      vital.status === 'Good' 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {vital.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Target: {vital.target}</p>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-700"
                      style={{ width: `${vital.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Technical Issues & Opportunities */}
        <Card className="bg-white border border-gray-200">
          <div className="p-8">
            <h3 className="text-lg font-light text-gray-900 mb-6">Technical Issues & Opportunities</h3>
            
            <div className="space-y-4">
              {[
                {
                  severity: 'Critical',
                  icon: AlertCircle,
                  title: '12 Soft 404 Errors Detected',
                  description: 'These pages return 200 status but have thin content',
                  impact: 'Crawl budget waste, quality signals',
                  fix: '301 redirect or add substantial content',
                  effort: '2 hours',
                  impactLevel: 'High'
                },
                {
                  severity: 'Critical',
                  icon: AlertCircle,
                  title: 'Missing Meta Descriptions (23 pages)',
                  description: 'Search engines are generating snippets automatically',
                  impact: '-15% CTR from search results',
                  fix: 'Write compelling 155-character descriptions',
                  effort: '4 hours',
                  impactLevel: 'Immediate'
                }
              ].map((issue, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <issue.icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-gray-900 mb-1">{issue.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Impact:</span>
                          <p className="text-gray-700">{issue.impact}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Fix:</span>
                          <p className="text-gray-700">{issue.fix}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Effort:</span>
                          <p className="text-gray-700">{issue.effort} | Impact: {issue.impactLevel}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Search Behavior Intelligence */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">How Users Refine Their Searches</h3>
          
          <div className="relative">
            {/* Search Journey Flow */}
            <div className="space-y-4">
              {[
                { query: '"automation"', volume: '165,000/mo', note: 'Too broad, refines...' },
                { query: '"workflow automation"', volume: '22,000/mo', note: 'Still generic, adds context...' },
                { query: '"workflow automation tools"', volume: '14,500/mo', note: 'Comparing options...' },
                { query: '"zapier alternatives"', volume: '9,200/mo', note: 'Price sensitivity emerges...' },
                { query: '"free workflow automation"', volume: '6,100/mo', note: 'Specific pain point...' },
                { query: '"fix workflow automation errors"', volume: '2,300/mo', note: 'Acute problem, ready to buy...' },
                { query: '"gumloop"', volume: '450/mo', note: 'Your brand searches', highlight: true }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div className={`flex-shrink-0 w-32 text-right ${step.highlight ? 'font-medium' : ''}`}>
                    <span className="text-sm text-gray-700">{step.query}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`h-12 border-l-2 ${step.highlight ? 'border-gray-900' : 'border-gray-300'}`} />
                    <div className={`px-4 py-2 rounded-lg ${
                      step.highlight 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className="text-xs font-medium">{step.volume}</span>
                    </div>
                    <span className="text-sm text-gray-500 italic">{step.note}</span>
                  </div>
                  {idx < 6 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 transform rotate-90" />
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Insight:</span> Users need 5-7 searches before finding you.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Opportunity:</span> Intercept earlier in the journey.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Strategic Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Quick Wins</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Add FAQ sections to top 10 pages',
                'Fix 12 soft 404 errors immediately',
                'Optimize meta descriptions for CTR',
                'Implement schema markup'
              ].map((win, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{win}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Strategic Priorities</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Own problem-aware queries',
                'Build topical authority clusters',
                'Create comparison content',
                'Develop use-case pages'
              ].map((priority, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Critical Fixes</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Improve page load speed',
                'Fix mobile responsiveness',
                'Add internal linking',
                'Update thin content pages'
              ].map((fix, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}