import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Users,
  TrendingUp,
  Eye,
  Link2,
  Target,
  Clock,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Activity,
  DollarSign,
  Zap,
  Info,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompetitiveIntelligenceProps {
  data: any;
}

export default function CompetitiveIntelligence({ data }: CompetitiveIntelligenceProps) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('zapier');
  const [expandedGap, setExpandedGap] = useState<string | null>(null);
  const { competitive_intelligence } = data;

  const competitors = [
    {
      id: 'zapier',
      name: 'Zapier',
      score: 85,
      traffic: '2.3M',
      strength: 'Market leader, massive traffic',
      weakness: 'Generic content, high pricing',
      opportunity: 'Technical depth, cost transparency',
      color: 'red'
    },
    {
      id: 'make',
      name: 'Make (Integromat)',
      score: 72,
      traffic: '450K',
      strength: 'Visual automation, good UX',
      weakness: 'Limited integrations, complex pricing',
      opportunity: 'Simplified pricing, better docs',
      color: 'blue'
    },
    {
      id: 'n8n',
      name: 'n8n',
      score: 68,
      traffic: '180K',
      strength: 'Open source, developer-friendly',
      weakness: 'Technical barrier, limited marketing',
      opportunity: 'Business user content, use cases',
      color: 'green'
    },
    {
      id: 'microsoft',
      name: 'Power Automate',
      score: 78,
      traffic: '1.2M',
      strength: 'Enterprise integration, Microsoft ecosystem',
      weakness: 'Complex setup, enterprise focus',
      opportunity: 'SMB content, simplified guides',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">Competitive Intelligence</h1>
        <p className="text-lg text-gray-600">Competitor analysis and positioning opportunities</p>
      </div>

      {/* Competitive Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {competitors.map((competitor) => (
          <Card 
            key={competitor.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCompetitor === competitor.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCompetitor(competitor.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{competitor.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  competitor.color === 'red' ? 'bg-red-500' :
                  competitor.color === 'blue' ? 'bg-blue-500' :
                  competitor.color === 'green' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{competitor.score}/100</div>
                  <div className="text-sm text-gray-600">AI Visibility Score</div>
                </div>
                
              <div>
                  <div className="text-lg font-semibold text-gray-900">{competitor.traffic}</div>
                  <div className="text-sm text-gray-600">Monthly Traffic</div>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      competitor.color === 'red' ? 'bg-red-500' :
                      competitor.color === 'blue' ? 'bg-blue-500' :
                      competitor.color === 'green' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${competitor.score}%` }}
                  />
              </div>
            </div>
          </div>
        </Card>
        ))}
      </div>

      {/* Selected Competitor Analysis */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-gray-600" />
          {competitors.find(c => c.id === selectedCompetitor)?.name} Analysis
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strengths & Weaknesses</h3>
            <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-1">Strengths</h4>
                  <p className="text-sm text-gray-600">{competitors.find(c => c.id === selectedCompetitor)?.strength}</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-1">Weaknesses</h4>
                  <p className="text-sm text-gray-600">{competitors.find(c => c.id === selectedCompetitor)?.weakness}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-1">Your Opportunity</h4>
                  <p className="text-sm text-gray-600">{competitors.find(c => c.id === selectedCompetitor)?.opportunity}</p>
              </div>
            </div>
          </div>
        </Card>

          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Positioning</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Market Share</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedCompetitor === 'zapier' ? '45%' : 
                     selectedCompetitor === 'make' ? '12%' :
                     selectedCompetitor === 'n8n' ? '8%' : '18%'}
                        </span>
                      </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Content Velocity</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedCompetitor === 'zapier' ? '3 posts/week' : 
                     selectedCompetitor === 'make' ? '2 posts/week' :
                     selectedCompetitor === 'n8n' ? '1 post/week' : '2 posts/week'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pricing Strategy</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedCompetitor === 'zapier' ? 'High-end' : 
                     selectedCompetitor === 'make' ? 'Mid-range' :
                     selectedCompetitor === 'n8n' ? 'Open source' : 'Enterprise'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target Audience</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedCompetitor === 'zapier' ? 'SMBs' : 
                     selectedCompetitor === 'make' ? 'Creators' :
                     selectedCompetitor === 'n8n' ? 'Developers' : 'Enterprises'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          </div>
      </section>

      {/* Opportunity Matrix */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-gray-600" />
          Competitive Opportunities
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Gaps</h3>
              <div className="space-y-3">
                {[
                  {
                    gap: 'Technical Implementation Guides',
                    opportunity: 'High',
                    effort: 'Medium',
                    description: 'Detailed technical guides for complex automations'
                  },
                  {
                    gap: 'Cost Comparison Content',
                    opportunity: 'Very High',
                    effort: 'Low',
                    description: 'Transparent pricing comparisons and ROI calculators'
                  },
                  {
                    gap: 'Industry-Specific Use Cases',
                    opportunity: 'High',
                    effort: 'High',
                    description: 'Vertical automation guides for specific industries'
                  },
                  {
                    gap: 'Migration Guides',
                    opportunity: 'Medium',
                    effort: 'Medium',
                    description: 'Step-by-step migration from competitors'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.gap}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.opportunity === 'Very High' ? 'bg-red-100 text-red-700' :
                          item.opportunity === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.opportunity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">Effort: {item.effort}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-white border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Positioning Strategies</h3>
              <div className="space-y-3">
                {[
                  {
                    strategy: 'Cost Transparency Leader',
                    impact: 'High',
                    timeline: '3 months',
                    description: 'Become the go-to source for honest pricing comparisons'
                  },
                  {
                    strategy: 'Technical Authority',
                    impact: 'Very High',
                    timeline: '6 months',
                    description: 'Establish technical expertise in complex automation scenarios'
                  },
                  {
                    strategy: 'Developer-First Approach',
                    impact: 'Medium',
                    timeline: '4 months',
                    description: 'Focus on developer tools and API-first automation'
                  },
                  {
                    strategy: 'Industry Specialist',
                    impact: 'High',
                    timeline: '8 months',
                    description: 'Become the automation expert for specific verticals'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.strategy}</h4>
                                <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.impact === 'Very High' ? 'bg-red-100 text-red-700' :
                          item.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.impact}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">Timeline: {item.timeline}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Competitive Benchmarking */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gray-600" />
          Competitive Benchmarking
        </h2>
        
        <Card className="bg-white border border-gray-200">
            <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">67/100</div>
                <div className="text-sm text-gray-600 mb-4">Your AI Visibility Score</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '67%' }} />
                      </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">85/100</div>
                <div className="text-sm text-gray-600 mb-4">Zapier (Leader)</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">72/100</div>
                <div className="text-sm text-gray-600 mb-4">Industry Average</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                Competitive Advantage
                </h4>
              <p className="text-sm text-gray-700">
                You're 18 points behind Zapier but only 5 points behind industry average. 
                Focus on technical content and cost transparency to close the gap quickly.
              </p>
              </div>
            </div>
          </Card>
      </section>
    </div>
  );
}