"use client";

import React, { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  AlertCircle,
  Clock,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  BarChart3,
  Eye,
  Users,
  MousePointer,
  Brain,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useRouter } from 'next/navigation';

interface Insight {
  id: string;
  category: 'opportunity' | 'issue' | 'trend' | 'recommendation';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  action: string;
  metrics?: {
    current: number | string;
    potential: number | string;
    change?: number;
  };
  timeframe: string;
}

const INSIGHTS: Insight[] = [
  {
    id: '1',
    category: 'opportunity',
    priority: 'critical',
    title: 'Zero visibility for "Zapier too expensive"',
    description: '8,100 monthly searches with no presence. Competitors capture this high-intent traffic.',
    impact: '$50K MRR potential',
    action: 'Create comparison page',
    metrics: {
      current: 0,
      potential: 8100,
      change: 0
    },
    timeframe: 'This week'
  },
  {
    id: '2',
    category: 'trend',
    priority: 'high',
    title: 'Migration content converts at 12.3%',
    description: 'Your migration guides convert 6x better than industry average. Double down on this content type.',
    impact: '6x conversion rate',
    action: 'Create 5 more migration guides',
    metrics: {
      current: '12.3%',
      potential: '15%',
      change: 520
    },
    timeframe: 'This month'
  },
  {
    id: '3',
    category: 'issue',
    priority: 'high',
    title: '80% of pages missing schema markup',
    description: 'Missing structured data hurts AI visibility and rich snippets.',
    impact: '+40% CTR potential',
    action: 'Add schema markup',
    metrics: {
      current: '20%',
      potential: '100%',
      change: -80
    },
    timeframe: 'This week'
  },
  {
    id: '4',
    category: 'opportunity',
    priority: 'medium',
    title: 'AI visibility at 78.5% but general automation <1%',
    description: 'Strong in AI-specific searches but missing broader automation market.',
    impact: '10x market opportunity',
    action: 'Expand content focus',
    metrics: {
      current: '78.5%',
      potential: '45%',
      change: 12.3
    },
    timeframe: 'Next 30 days'
  },
  {
    id: '5',
    category: 'recommendation',
    priority: 'high',
    title: 'LinkedIn personal account drives 10x reach',
    description: 'Founder-led content gets 561% more engagement than company pages.',
    impact: '15K+ reach per post',
    action: 'Connect founder account',
    metrics: {
      current: '1.2K',
      potential: '15K',
      change: 1150
    },
    timeframe: '5 minutes'
  },
  {
    id: '6',
    category: 'issue',
    priority: 'critical',
    title: 'Publishing 3 posts/month vs competitors\' 32',
    description: 'Content velocity 10x behind Zapier, limiting market share growth.',
    impact: 'Losing 270 leads/day',
    action: 'Scale to 15 posts/month',
    metrics: {
      current: 3,
      potential: 15,
      change: -90
    },
    timeframe: 'Next 60 days'
  }
];

export default function InsightsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredInsights = INSIGHTS.filter(insight => {
    const categoryMatch = selectedCategory === 'all' || insight.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || insight.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'opportunity': return Lightbulb;
      case 'issue': return AlertCircle;
      case 'trend': return TrendingUp;
      case 'recommendation': return Target;
      default: return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'opportunity': return 'text-black';
      case 'issue': return 'text-black/80';
      case 'trend': return 'text-black/60';
      case 'recommendation': return 'text-black/70';
      default: return 'text-black/50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical':
        return <Badge className="bg-black text-white border-0">Critical</Badge>;
      case 'high':
        return <Badge className="bg-black/80 text-white border-0">High</Badge>;
      case 'medium':
        return <Badge className="bg-black/20 text-black border-0">Medium</Badge>;
      case 'low':
        return <Badge className="bg-black/10 text-black/60 border-0">Low</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (change?: number) => {
    if (!change) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-black" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-black/60" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-light text-black">Insights</h1>
              <p className="text-sm text-black/60 mt-1">
                AI-powered recommendations to grow your content performance
              </p>
            </div>
            <Button 
              className="bg-black text-white hover:bg-black/90 border-0"
              onClick={() => router.push('/demo/playbook')}
            >
              View Playbook
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Opportunities</span>
              </div>
              <p className="text-2xl font-light text-black">
                {INSIGHTS.filter(i => i.category === 'opportunity').length}
              </p>
              <p className="text-xs text-black/40 mt-1">$125K MRR potential</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Issues</span>
              </div>
              <p className="text-2xl font-light text-black">
                {INSIGHTS.filter(i => i.category === 'issue').length}
              </p>
              <p className="text-xs text-black/40 mt-1">Impacting growth</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Positive Trends</span>
              </div>
              <p className="text-2xl font-light text-black">
                {INSIGHTS.filter(i => i.category === 'trend').length}
              </p>
              <p className="text-xs text-black/40 mt-1">To leverage</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Actions</span>
              </div>
              <p className="text-2xl font-light text-black">
                {INSIGHTS.filter(i => i.priority === 'critical' || i.priority === 'high').length}
              </p>
              <p className="text-xs text-black/40 mt-1">High priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-black/10">
        <div className="px-8 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Category:</span>
              <div className="flex gap-2">
                {['all', 'opportunity', 'issue', 'trend', 'recommendation'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-white text-black/60 hover:text-black border border-black/10'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Priority:</span>
              <div className="flex gap-2">
                {['all', 'critical', 'high', 'medium', 'low'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => setSelectedPriority(priority)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      selectedPriority === priority
                        ? 'bg-black text-white'
                        : 'bg-white text-black/60 hover:text-black border border-black/10'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="px-8 py-6">
        <div className="space-y-4">
          {filteredInsights.map(insight => {
            const Icon = getCategoryIcon(insight.category);
            
            return (
              <Card key={insight.id} className="border border-black/10 hover:border-black/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-black/[0.02] rounded-lg flex items-center justify-center ${getCategoryColor(insight.category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-black">{insight.title}</h3>
                          {getPriorityBadge(insight.priority)}
                        </div>
                        <p className="text-sm text-black/60 mb-3">{insight.description}</p>
                        
                        {/* Metrics */}
                        {insight.metrics && (
                          <div className="flex items-center gap-6 mb-3">
                            <div>
                              <p className="text-xs text-black/40">Current</p>
                              <p className="text-lg font-light text-black">{insight.metrics.current}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-black/20" />
                            <div>
                              <p className="text-xs text-black/40">Potential</p>
                              <p className="text-lg font-light text-black">{insight.metrics.potential}</p>
                            </div>
                            {insight.metrics.change && (
                              <div className="flex items-center gap-1">
                                {getTrendIcon(insight.metrics.change)}
                                <span className={`text-sm ${insight.metrics.change > 0 ? 'text-black' : 'text-black/60'}`}>
                                  {Math.abs(insight.metrics.change)}%
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Impact and Action */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-black/40" />
                            <span className="text-sm text-black/80">Impact: {insight.impact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-black/40" />
                            <span className="text-sm text-black/80">{insight.timeframe}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      className="bg-white text-black border border-black/20 hover:bg-black hover:text-white transition-colors"
                      onClick={() => {
                        if (insight.action.includes('comparison')) {
                          router.push('/demo/content-studio');
                        } else if (insight.action.includes('schema')) {
                          router.push('/demo/diagnostics');
                        } else {
                          router.push('/demo/playbook');
                        }
                      }}
                    >
                      {insight.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Insights Summary */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-black/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black mb-2">AI Analysis Summary</h3>
              <p className="text-sm text-black/60 mb-3">
                Your content strategy is showing strong AI visibility (78.5%) but missing critical high-intent traffic. 
                Focus on migration content (12.3% conversion) and capture the "Zapier too expensive" searches to unlock $125K MRR potential.
              </p>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-black text-white hover:bg-black/90 border-0"
                  onClick={() => router.push('/demo/playbook')}
                >
                  View Full Strategy
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-white text-black border border-black/20 hover:bg-black/5"
                  onClick={() => router.push('/demo/diagnostics')}
                >
                  Run Diagnostics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}