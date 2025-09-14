import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Users,
  TrendingUp,
  MessageSquare,
  Search,
  Calendar,
  ArrowRight,
  Quote,
  AlertCircle,
  Sparkles,
  Target,
  BarChart3,
  Activity,
  ChevronRight,
  Lightbulb,
  Info,
  ExternalLink,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketIntelligenceProps {
  data: any;
}

export default function MarketIntelligence({ data }: MarketIntelligenceProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null);
  const [hoveredSentiment, setHoveredSentiment] = useState<string | null>(null);
  const { market_intelligence } = data;

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {market_intelligence.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {market_intelligence.section_subheader}
        </p>
        
        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Market Signal Analysis</h3>
                <p className="text-gray-700 leading-relaxed">
                  {market_intelligence.user_journey.journey_insight} Meanwhile, community sentiment shows 
                  567% growth in AI automation interest, suggesting a major market shift underway. Your position 
                  at the intersection of developer tools and AI-native automation is strategically valuable.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* User Journey Mapping - Enhanced Flow Visualization */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Users className="w-6 h-6 text-gray-400" />
          How Users Find You: Journey Analysis
        </h2>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8">
            <div className="max-w-5xl mx-auto">
              {/* Journey Paths Visualization */}
              <div className="relative">
                {/* Central Target */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-1" />
                      <span className="text-sm font-medium text-gray-900">Gumloop</span>
                    </div>
                  </div>
                </div>
                
                {/* Journey Paths */}
                <div className="pr-40 space-y-4">
                  {market_intelligence.user_journey.typical_paths.map((path: any, idx: number) => {
                    const colors = ['purple', 'blue', 'green', 'orange', 'pink'];
                    const color = colors[idx % colors.length];
                    const isSelected = selectedPath === path.source;
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedPath(isSelected ? null : path.source)}
                        className="cursor-pointer"
                      >
                        <div className={`
                          relative flex items-center transition-all
                          ${isSelected ? 'z-10' : 'z-0'}
                        `}>
                          {/* Source Box */}
                          <div className={`
                            flex-1 p-6 rounded-lg border-2 transition-all
                            ${isSelected 
                              ? `bg-${color}-50 border-${color}-400 shadow-lg` 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                          `}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className={`font-medium ${isSelected ? `text-${color}-900` : 'text-gray-900'}`}>
                                  {path.source}
                                </h4>
                                {isSelected && (
                                  <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-sm text-gray-600 mt-2"
                                  >
                                    {path.source.includes('Search') && 
                                      'Low organic visibility means missing high-intent traffic'
                                    }
                                    {path.source.includes('Referral') && 
                                      'Strong signal of developer community trust and word-of-mouth'
                                    }
                                    {path.source.includes('Product Hunt') && 
                                      'Launch spikes are temporary - need sustainable channels'
                                    }
                                    {path.source.includes('Direct') && 
                                      'Brand awareness exists but needs amplification'
                                    }
                                  </motion.p>
                                )}
                              </div>
                              <div className="text-right">
                                <div className={`text-3xl font-light ${
                                  isSelected ? `text-${color}-600` : 'text-gray-900'
                                }`}>
                                  {path.percentage}%
                                </div>
                                <div className="text-xs text-gray-500">of traffic</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Flow Line */}
                          <div className="relative w-32">
                            <div className={`
                              absolute inset-y-0 left-0 right-8 flex items-center
                            `}>
                              <div className={`
                                h-2 w-full rounded-full transition-all
                                ${isSelected 
                                  ? `bg-gradient-to-r from-${color}-400 to-${color}-600` 
                                  : 'bg-gray-300'
                                }
                              `}
                                style={{ 
                                  transform: `scaleY(${path.percentage / 10})`,
                                  opacity: isSelected ? 1 : 0.6
                                }}
                              />
                            </div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                              <ChevronRight className={`w-6 h-6 ${
                                isSelected ? `text-${color}-600` : 'text-gray-400'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Journey Insights */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-900">Organic Gap</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Only 10% from search - missing 90% of category searches
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Community Strength</span>
                  </div>
                  <p className="text-sm text-green-700">
                    47% dev referrals shows strong product-market fit
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Growth Path</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Convert word-of-mouth into scalable content strategy
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </section>

      {/* Community Intelligence - Enhanced Sentiment Analysis */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-gray-400" />
          Community Voice: Real-Time Market Signals
        </h2>
        
        {/* Data Sources Badge */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span className="font-medium">Data sources:</span>
          <div className="flex items-center gap-2">
            {market_intelligence.community_intelligence.data_sources.map((source: string, idx: number) => (
              <Badge key={idx} className="bg-gray-100 text-gray-700">
                {source}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Evolution Chart */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Sentiment Heatmap ({market_intelligence.community_intelligence.sentiment_evolution[0].period})
              </h3>
              
              <div className="space-y-4">
                {market_intelligence.community_intelligence.sentiment_evolution.map((sentiment: any, idx: number) => {
                  const trendValue = parseInt(sentiment.trend);
                  const isHot = trendValue > 300;
                  const isMedium = trendValue > 200;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onMouseEnter={() => setHoveredSentiment(sentiment.topic)}
                      onMouseLeave={() => setHoveredSentiment(null)}
                      className="group"
                    >
                      <div className={`
                        p-5 rounded-lg transition-all cursor-pointer
                        ${hoveredSentiment === sentiment.topic 
                          ? 'shadow-lg scale-[1.02]' 
                          : 'shadow-sm'
                        }
                        ${isHot ? 'bg-gradient-to-r from-red-50 to-orange-50' :
                          isMedium ? 'bg-gradient-to-r from-orange-50 to-yellow-50' :
                          'bg-gradient-to-r from-green-50 to-blue-50'
                        }
                      `}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{sentiment.topic}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`
                              ${isHot ? 'bg-red-100 text-red-700' :
                                isMedium ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }
                            `}>
                              {sentiment.trend}
                            </Badge>
                            <ArrowUpRight className={`w-4 h-4 ${
                              isHot ? 'text-red-600' :
                              isMedium ? 'text-orange-600' :
                              'text-green-600'
                            }`} />
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative h-4 bg-white/50 rounded-full overflow-hidden">
                          <motion.div 
                            className={`absolute h-full ${
                              isHot ? 'bg-gradient-to-r from-red-400 to-orange-500' :
                              isMedium ? 'bg-gradient-to-r from-orange-400 to-yellow-500' :
                              'bg-gradient-to-r from-green-400 to-blue-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(trendValue / 6, 100)}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                          />
                        </div>
                        
                        {/* Hover Details */}
                        <AnimatePresence>
                          {hoveredSentiment === sentiment.topic && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-gray-200"
                            >
                              <p className="text-sm text-gray-600">
                                {sentiment.topic === 'AI integration interest' && 
                                  'Massive growth opportunity - users actively seeking AI-enhanced automation'
                                }
                                {sentiment.topic === 'Frustration with pricing' && 
                                  'Price sensitivity creates opening for value-based positioning'
                                }
                                {sentiment.topic === 'Seeking alternatives' && 
                                  'Direct competitor dissatisfaction - prime conversion opportunity'
                                }
                                {sentiment.topic === 'Debugging questions' && 
                                  'Technical pain points indicate need for better error handling content'
                                }
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Sentiment Summary */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900 mb-1">Key Insight</p>
                    <p className="text-sm text-indigo-700">
                      567% growth in AI automation interest is your biggest opportunity. 
                      Position Gumloop as the AI-native alternative to legacy tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Verbatim Quotes */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                <Quote className="w-5 h-5 text-gray-400" />
                Voice of the Customer
              </h3>
              
              <div className="space-y-4">
                {market_intelligence.community_intelligence.verbatim_quotes.map((quote: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setExpandedQuote(expandedQuote === idx ? null : idx)}
                    className="cursor-pointer"
                  >
                    <div className={`
                      p-5 bg-white border-2 rounded-lg transition-all
                      ${expandedQuote === idx 
                        ? 'border-purple-400 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}>
                      <div className="flex items-start gap-3">
                        <Quote className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-gray-700 italic leading-relaxed">
                            "{quote}"
                          </p>
                          
                          {/* Expanded Analysis */}
                          <AnimatePresence>
                            {expandedQuote === idx && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-purple-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Info className="w-4 h-4 text-purple-600" />
                                  <span className="text-sm font-medium text-purple-900">Strategic Implication</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {quote.includes('expensive') && 
                                    'Price sensitivity indicates market opportunity for transparent, value-based pricing model'
                                  }
                                  {quote.includes('failed') && 
                                    'Debugging pain point - create content around error handling and troubleshooting'
                                  }
                                  {quote.includes('complex logic') && 
                                    'Need for advanced features without coding - highlight your visual workflow builder'
                                  }
                                  {quote.includes('learns') && 
                                    'AI/ML interest - position intelligent automation as key differentiator'
                                  }
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Search Query Evolution - Enhanced Timeline */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Search className="w-6 h-6 text-gray-400" />
          Search Evolution: Market Maturity Signals
        </h2>
        
        <Card className="overflow-hidden">
          <div className="p-8">
            {/* Timeline Visualization */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-20 top-20 bottom-20 w-0.5 bg-gradient-to-b from-gray-300 via-blue-300 to-green-300" />
              
              {/* Timeline Points */}
              <div className="space-y-12">
                {/* 2023 - Historical */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-start gap-8"
                >
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="font-semibold text-gray-700">2023</span>
                    </div>
                    <Calendar className="absolute -bottom-2 -right-2 w-5 h-5 text-gray-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Historical: Generic Discovery</h4>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {market_intelligence.search_query_evolution['2023_queries'].map((query: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Badge className="bg-gray-100 text-gray-700 px-4 py-2 text-sm">
                            {query}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      Basic functionality searches - users didn't know what to ask for
                    </p>
                  </div>
                </motion.div>
                
                {/* 2024 - Current */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex items-start gap-8"
                >
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-100">
                      <span className="font-semibold text-blue-700">2024</span>
                    </div>
                    <Activity className="absolute -bottom-2 -right-2 w-5 h-5 text-blue-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Current: Solution Awareness</h4>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {market_intelligence.search_query_evolution['2024_queries'].map((query: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                            {query}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      Category awareness growing - users comparing specific solutions
                    </p>
                  </div>
                </motion.div>
                
                {/* 2025 - Emerging */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative flex items-start gap-8"
                >
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-300 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="font-semibold text-green-700">2025</span>
                    </div>
                    <Sparkles className="absolute -bottom-2 -right-2 w-5 h-5 text-green-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Emerging: AI-Native Demand</h4>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {market_intelligence.search_query_evolution['2025_emerging'].map((query: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 text-sm font-medium border border-green-300">
                            {query}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      AI transformation underway - position for the future, not the past
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Predictive Intelligence Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <TrendingUp className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Predictive Market Intelligence</h4>
                      <p className="text-gray-700 mb-3">
                        {market_intelligence.search_query_evolution.predictive_insight}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">AI queries: <span className="font-semibold">+567% YoY</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Category maturity: <span className="font-semibold">Accelerating</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Card>
      </section>
      
      {/* Bottom CTA Section */}
      <Card className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3">Transform Market Intelligence into Growth</h3>
          <p className="text-purple-100 mb-6">
            Your market shows clear signals: 567% growth in AI automation interest, strong developer community trust, 
            and massive organic search opportunity. Time to convert insights into action.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              Build Content Strategy
            </button>
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
              View Growth Playbook
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}