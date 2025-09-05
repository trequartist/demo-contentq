"use client";

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Activity,
  Cpu,
  Trophy,
  Zap,
  X,
  Filter,
  Search,
  Code,
  Edit3
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useRouter } from 'next/navigation';
import AiAssistant from '@/components/demo/AiAssistant';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';

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

// Static insights removed - using data from insights-hub.json instead
const STATIC_INSIGHTS: Insight[] = [
  {
    id: '1',
    category: 'opportunity',
    priority: 'critical',
    title: 'Zero visibility for "Zapier too expensive"',
    description: '8,100 monthly searches with no presence. Competitors capture this high-intent traffic.',
    impact: '30% potential growth',
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
]; // Kept for reference but not used

export default function InsightsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showAdditionalInsights, setShowAdditionalInsights] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);

  // Use insights from JSON data
  const allInsights = [];
  
  // Get insights from JSON data
  if (insightsHubData?.researchFeed?.items) {
    const jsonInsights = insightsHubData.researchFeed.items.map((item: any) => ({
      id: item.id,
      category: (item.type === 'trend' ? 'trend' : item.type === 'competitor' ? 'issue' : 'opportunity') as Insight['category'],
      priority: (item.priority || 'high') as Insight['priority'],
      title: item.title,
      description: item.summary,
      impact: item.impact || 'High impact',
      action: item.action,
      metrics: item.metrics ? {
        current: item.metrics.currentPosition || 0,
        potential: item.metrics.potentialTraffic || item.metrics.searchVolume,
        change: 0
      } : undefined,
      timeframe: item.time || 'This week'
    }));
    allInsights.push(...jsonInsights);
  }

  const filteredInsights = allInsights.filter(insight => {
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
              <h1 className="text-2xl font-light text-black">Insights Hub</h1>
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

          {/* Summary Stats - Enhanced with JSON data */}
          <div className="grid grid-cols-6 gap-4">
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Opportunities</span>
              </div>
              <p className="text-2xl font-light text-black">
                {filteredInsights.filter(i => i.category === 'opportunity').length}
              </p>
              <p className="text-xs text-black/40 mt-1">30% potential growth</p>
            </div>
            < div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-black/60">Issues</span>
              </div>
              <p className="text-2xl font-light text-black">
                {filteredInsights.filter(i => i.category === 'issue').length}
              </p>
              <p className="text-xs text-black/40 mt-1">Impacting growth</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Positive Trends</span>
              </div>
              <p className="text-2xl font-light text-black">
                {filteredInsights.filter(i => i.category === 'trend').length}
              </p>
              <p className="text-xs text-black/40 mt-1">To leverage</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Actions</span>
              </div>
              <p className="text-2xl font-light text-black">
                {filteredInsights.filter(i => i.priority === 'critical' || i.priority === 'high').length}
              </p>
              <p className="text-xs text-black/40 mt-1">High priority</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">Health Score</span>
              </div>
              <p className="text-2xl font-light text-black">
                {insightsHubData?.knowledgeHub?.stats?.healthScore || 65.8}
              </p>
              <p className="text-xs text-black/40 mt-1">{insightsHubData?.knowledgeHub?.stats?.improvementRate || '+8.2%'}</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-black/60" />
                <span className="text-xs text-black/60">AI Visibility</span>
              </div>
              <p className="text-2xl font-light text-black">78.5%</p>
              <p className="text-xs text-black/40 mt-1">+12.3% vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-black/10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
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
            <Button
              variant="secondary"
              className="bg-white text-black border border-black/20 hover:bg-black/5"
              onClick={() => setShowAdditionalInsights(!showAdditionalInsights)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showAdditionalInsights ? 'Hide' : 'Show'} Market Intelligence
            </Button>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Insights Feed */}
          <div className="col-span-2 space-y-4">
            {filteredInsights.map(insight => {
              const Icon = getCategoryIcon(insight.category);
              
              return (
                <Card 
                  key={insight.id} 
                  className="border border-black/10 hover:border-black/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedInsight(insight)}
                >
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
                        className=" border border-black/20 hover:bg-black hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
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

          {/* Sidebar with additional data from JSON */}
          <div className="space-y-4">
            {/* Strategic Alerts */}
            {insightsHubData?.strategicAlerts && (
              <Card className="border border-black/10">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-black/60" />
                    Strategic Alerts
                  </h3>
                  <div className="space-y-3">
                    {insightsHubData.strategicAlerts.slice(0, 2).map((alert: any) => (
                      <div key={alert.id} className="pb-3 border-b border-black/5 last:border-0">
                        <Badge className={`text-xs mb-2 ${
                          alert.severity === 'critical' ? 'bg-black text-white' : 'bg-black/10 text-black'
                        }`}>
                          {alert.type}
                        </Badge>
                        <h4 className="text-xs font-medium text-black mb-1">{alert.title}</h4>
                        <p className="text-xs text-black/60 line-clamp-2">{alert.description}</p>
                        {alert.estimatedImpact && (
                          <p className="text-xs font-medium text-black mt-2">
                            Impact: {alert.estimatedImpact}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Priority Actions from JSON */}
            {insightsHubData?.knowledgeHub?.actionItems && (
              <Card className="border border-black/10">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-black/60" />
                    Priority Actions
                  </h3>
                  <div className="space-y-2">
                    {insightsHubData.knowledgeHub.actionItems
                      .filter((item: any) => item.priority === 'critical' || item.priority === 'high')
                      .slice(0, 3)
                      .map((action: any) => (
                      <div key={action.id} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-black/40 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-black">{action.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-black/40">{action.effort}</span>
                            <span className="text-xs text-black/60">{action.impact}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-3 bg-black text-white hover:bg-black/90"
                    size="sm"
                    onClick={() => router.push('/demo/playbook')}
                  >
                    View All Actions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Recent Wins */}
            {insightsHubData?.knowledgeHub?.recentWins && (
              <Card className="border border-black/10">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-black/60" />
                    Recent Wins
                  </h3>
                  <div className="space-y-2">
                    {insightsHubData.knowledgeHub.recentWins.map((win: any) => (
                      <div key={win.id} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-black">{win.title}</p>
                          <p className="text-xs text-black/60">{win.metric}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Market Intelligence */}
            {showAdditionalInsights && insightsHubData?.marketIntelligence && (
              <Card className="border border-black/10">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-black/60" />
                    Market Trends
                  </h3>
                  <div className="space-y-2">
                    {insightsHubData.marketIntelligence.trends.slice(0, 3).map((trend: any, idx: number) => (
                      <div key={idx} className="pb-2 border-b border-black/5 last:border-0">
                        <p className="text-xs font-medium text-black">{trend.trend}</p>
                        <p className="text-xs text-black/60">{trend.growth}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* AI Insights Summary */}
        <div className="mt-8 p-6 bg-black/[0.02] rounded-lg border border-black/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black mb-2">AI Analysis Summary</h3>
              <p className="text-sm text-black/60 mb-3">
                Your content strategy is showing strong AI visibility (78.5%) but missing critical high-intent traffic. 
                Focus on migration content (12.3% conversion) and capture the "Zapier too expensive" searches to unlock 30% potential growth.
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

      {/* Selected Insight Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={`${
                    selectedInsight.priority === 'critical' ? 'bg-black text-white' : 
                    selectedInsight.priority === 'high' ? 'bg-black/80 text-white' :
                    'bg-black/20 text-black'
                  } text-xs mb-2`}>
                    {selectedInsight.priority}
                  </Badge>
                  <h2 className="text-lg font-medium text-black">{selectedInsight.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedInsight(null)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-black/70 mb-4">{selectedInsight.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-black/[0.02] rounded-lg">
                  <p className="text-xs text-black/40 mb-1">Impact</p>
                  <p className="text-sm font-medium text-black">{selectedInsight.impact}</p>
                </div>
                <div className="p-3 bg-black/[0.02] rounded-lg">
                  <p className="text-xs text-black/40 mb-1">Timeframe</p>
                  <p className="text-sm font-medium text-black">{selectedInsight.timeframe}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-black text-white hover:bg-black/90"
                  onClick={() => {
                    setSelectedInsight(null);
                    router.push('/demo/content-studio/create');
                  }}
                >
                  Take Action Now
                </Button>
                <Button 
                  variant="secondary"
                  className="flex-1 bg-white text-black border border-black/20 hover:bg-black/5"
                  onClick={() => setSelectedInsight(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant */}
      <AiAssistant 
        context="insights" 
        onAction={(action) => {
          console.log('AI Assistant action:', action);
          if (action === 'generate_action_plan') {
            router.push('/demo/playbook');
          } else if (action === 'view_metrics') {
            router.push('/demo/analytics');
          }
        }}
      />
    </div>
  );
}