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
  const [selectedSegment, setSelectedSegment] = useState<string>('overview');
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const { market_intelligence = {} } = data;

  const marketSegments = [
    { id: 'overview', label: 'Market Overview', icon: BarChart3 },
    { id: 'buyers', label: 'Buyer Personas', icon: Users },
    { id: 'trends', label: 'Trends & Signals', icon: TrendingUp },
    { id: 'opportunities', label: 'Opportunities', icon: Target }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Market Intelligence</h1>
        <p className="text-lg text-gray-600">Market dynamics, buyer insights, and strategic opportunities</p>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Market Growth</h3>
                <p className="text-sm text-gray-600">AI Automation</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">+567%</div>
            <p className="text-sm text-gray-600">Year-over-year growth in search interest</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Search Volume</h3>
                <p className="text-sm text-gray-600">AI Automation Queries</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">2.4M</div>
            <p className="text-sm text-gray-600">Monthly searches for automation-related queries</p>
            </div>
          </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
                      </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Market Share</h3>
                <p className="text-sm text-gray-600">Current Position</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">2.3%</div>
            <p className="text-sm text-gray-600">Share of voice in automation discussions</p>
            </div>
          </Card>
        </div>

      {/* Buyer Personas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <Users className="w-6 h-6 text-gray-600" />
          Key Buyer Personas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Technical Decision Makers',
              percentage: '35%',
              description: 'CTOs, Engineering Directors, DevOps Leads',
              painPoints: ['Integration complexity', 'Scalability concerns', 'Technical implementation'],
              aiImpact: 'High',
              influence: 'High',
              color: 'blue'
            },
            {
              name: 'Business Process Owners',
              percentage: '28%',
              description: 'Operations Managers, Business Analysts',
              painPoints: ['Manual processes', 'Data silos', 'Compliance requirements'],
              aiImpact: 'Medium',
              influence: 'Medium',
              color: 'green'
            },
            {
              name: 'Startup Founders',
              percentage: '22%',
              description: 'Early-stage entrepreneurs, Technical Co-founders',
              painPoints: ['Limited resources', 'Rapid scaling needs', 'Quick implementation'],
              aiImpact: 'High',
              influence: 'High',
              color: 'purple'
            },
            {
              name: 'Enterprise Architects',
              percentage: '15%',
              description: 'Solution Architects, Integration Specialists',
              painPoints: ['Legacy system integration', 'Security requirements', 'Governance'],
              aiImpact: 'Very High',
              influence: 'Very High',
              color: 'red'
            }
          ].map((persona, idx) => (
            <Card key={idx} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    persona.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    persona.color === 'green' ? 'bg-green-100 text-green-700' :
                    persona.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {persona.percentage}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{persona.description}</p>
                
                <div className="space-y-3">
                              <div>
                    <div className="text-xs text-gray-500 mb-1">AI Impact Potential</div>
                    <div className={`text-sm font-medium ${
                      persona.aiImpact === 'Very High' ? 'text-red-600' :
                      persona.aiImpact === 'High' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`}>{persona.aiImpact}</div>
                </div>
                
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Influence Level</div>
                    <div className="text-sm font-medium text-gray-900">{persona.influence}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Key Pain Points</div>
                    <div className="space-y-1">
                      {persona.painPoints.map((point, pointIdx) => (
                        <div key={pointIdx} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {point}
                        </div>
                      ))}
                </div>
                  </div>
            </div>
          </div>
        </Card>
          ))}
        </div>
      </section>

      {/* Market Opportunities */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-gray-600" />
          Strategic Opportunities
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">High-Value Opportunities</h3>
              <div className="space-y-4">
                {[
                  {
                    opportunity: 'Technical Implementation Guides',
                    searchVolume: '1.2M',
                    growth: '+45%',
                    competition: 'Low',
                    description: 'Detailed technical guides for complex automation scenarios that AI assistants frequently cite'
                  },
                  {
                    opportunity: 'Cost Comparison Content',
                    searchVolume: '800K',
                    growth: '+67%',
                    competition: 'Medium',
                    description: 'Transparent pricing comparisons and ROI calculators that rank high in AI search results'
                  },
                  {
                    opportunity: 'Industry-Specific Use Cases',
                    searchVolume: '600K',
                    growth: '+89%',
                    competition: 'Low',
                    description: 'Vertical automation guides for healthcare, finance, and retail that build authority in specific domains'
                  }
                ].map((opp, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{opp.opportunity}</h4>
                          <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Volume: {opp.searchVolume}</span>
                        <span className="text-xs text-green-600 font-medium">{opp.growth}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-gray-500">Competition: <span className={`font-medium ${
                        opp.competition === 'Low' ? 'text-green-600' : 
                        opp.competition === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{opp.competition}</span></span>
              </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
              <div className="space-y-4">
                {[
                  {
                    trend: 'AI-First Automation',
                    aiImpact: 'High',
                    timeline: '6-12 months',
                    description: 'Shift from rule-based to AI-powered automation - high citation potential in AI search results'
                  },
                  {
                    trend: 'No-Code/Low-Code Adoption',
                    aiImpact: 'Very High',
                    timeline: '3-6 months',
                    description: 'Business users want to build automations without coding - excellent for AI authority building'
                  },
                  {
                    trend: 'Industry-Specific Solutions',
                    aiImpact: 'Medium',
                    timeline: '12-18 months',
                    description: 'Vertical automation solutions gaining traction - niche authority opportunities'
                  },
                  {
                    trend: 'Real-Time Processing',
                    aiImpact: 'High',
                    timeline: '6-9 months',
                    description: 'Demand for instant automation responses - technical content that AI assistants frequently cite'
                  }
                ].map((trend, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{trend.trend}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          trend.aiImpact === 'Very High' ? 'bg-red-100 text-red-700' :
                          trend.aiImpact === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trend.aiImpact} AI Impact
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                    <div className="text-xs text-gray-500">Timeline: {trend.timeline}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}