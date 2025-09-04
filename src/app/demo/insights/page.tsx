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
  Filter,
  Search,
  Activity,
  Code,
  Cpu,
  Trophy,
  Zap,
  X
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useRouter } from 'next/navigation';
import AiAssistant from '@/components/demo/AiAssistant';

export default function InsightsPage() {
  const router = useRouter();
  const [insightsData, setInsightsData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('@/usableclientdata/data/insights/insights-hub.json');
        setInsightsData(data.default);
      } catch (error) {
        console.error('Failed to load insights data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'trend': return TrendingUp;
      case 'opportunity': return Lightbulb;
      case 'issue': 
      case 'technical': return AlertCircle;
      case 'competitor': return Target;
      case 'market': return BarChart3;
      case 'ai': return Cpu;
      case 'user': return Users;
      case 'insight': return Brain;
      default: return Activity;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-black text-white';
      case 'high': return 'bg-black/80 text-white';
      case 'medium': return 'bg-black/20 text-black';
      case 'low': return 'bg-black/10 text-black/60';
      default: return 'bg-black/5 text-black/40';
    }
  };

  const getFilteredInsights = () => {
    if (!insightsData?.researchFeed?.items) return [];
    
    return insightsData.researchFeed.items.filter((item: any) => {
      const categoryMatch = selectedCategory === 'all' || item.type === selectedCategory;
      const priorityMatch = selectedPriority === 'all' || item.priority === selectedPriority;
      const searchMatch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priorityMatch && searchMatch;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-black/20 border-t-black mx-auto"></div>
          <p className="mt-4 text-black/50 text-sm">Loading insights...</p>
        </div>
      </div>
    );
  }

  const stats = insightsData?.knowledgeHub?.stats || {};
  const categories = insightsData?.knowledgeHub?.categories || [];
  const actionItems = insightsData?.knowledgeHub?.actionItems || [];
  const alerts = insightsData?.strategicAlerts || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-light text-black">Research & Insights Hub</h1>
              <p className="text-sm text-black/60 mt-1">
                AI-powered intelligence for strategic growth
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="secondary"
                className="bg-white text-black border border-black/20 hover:bg-black/5"
                onClick={() => router.push('/demo/playbook')}
              >
                View Playbook
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                className="bg-black text-white hover:bg-black/90"
                onClick={() => router.push('/demo/content-studio/create')}
              >
                Take Action
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-6 gap-4">
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Total Insights</p>
              <p className="text-2xl font-light text-black">{stats.totalInsights || 0}</p>
              <p className="text-xs text-black/60 mt-1">+{stats.weeklyGrowth || 0} this week</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Critical Actions</p>
              <p className="text-2xl font-light text-black">{stats.criticalActions || 0}</p>
              <Badge className="bg-black text-white text-xs mt-1">Urgent</Badge>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Health Score</p>
              <p className="text-2xl font-light text-black">{stats.healthScore || 0}</p>
              <p className="text-xs text-black/60 mt-1">{stats.improvementRate || '0%'}</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Opportunities</p>
              <p className="text-2xl font-light text-black">$125K</p>
              <p className="text-xs text-black/60 mt-1">MRR potential</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Threats</p>
              <p className="text-2xl font-light text-black">5</p>
              <p className="text-xs text-black/60 mt-1">Active</p>
            </div>
            <div className="p-4 border border-black/10 rounded-lg">
              <p className="text-xs text-black/40 mb-1">Quick Wins</p>
              <p className="text-2xl font-light text-black">8</p>
              <p className="text-xs text-black/60 mt-1">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="border-b border-black/10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                  selectedCategory === cat.name.toLowerCase()
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black/60 border-black/10 hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{cat.name}</span>
                  <Badge className="bg-white/20 text-inherit border-0 text-xs">
                    {cat.count}
                  </Badge>
                </div>
                {cat.trending && (
                  <TrendingUp className="w-3 h-3 ml-1 inline" />
                )}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/20"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Research Feed */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-black">Latest Intelligence</h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-1 text-sm border border-black/10 rounded-lg focus:outline-none focus:border-black/20"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {getFilteredInsights().map((insight: any) => {
              const Icon = getCategoryIcon(insight.type);
              
              return (
                <Card 
                  key={insight.id} 
                  className="border border-black/10 hover:border-black/20 transition-all cursor-pointer"
                  onClick={() => setSelectedInsight(insight)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-black/[0.02] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-black/60" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`${getPriorityColor(insight.priority)} text-xs`}>
                                {insight.priority}
                              </Badge>
                              <span className="text-xs text-black/40">{insight.time}</span>
                            </div>
                            <h3 className="font-medium text-black text-sm">{insight.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-black/5 text-black/60 text-xs border-0">
                              {insight.relevance}% match
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-black/60 mb-3">{insight.summary}</p>
                        
                        {insight.metrics && (
                          <div className="flex items-center gap-4 mb-3">
                            {insight.metrics.searchVolume && (
                              <div>
                                <p className="text-xs text-black/40">Volume</p>
                                <p className="text-sm font-medium text-black">
                                  {insight.metrics.searchVolume.toLocaleString()}
                                </p>
                              </div>
                            )}
                            {insight.metrics.estimatedValue && (
                              <div>
                                <p className="text-xs text-black/40">Value</p>
                                <p className="text-sm font-medium text-black">
                                  {insight.metrics.estimatedValue}
                                </p>
                              </div>
                            )}
                            {insight.metrics.difficulty && (
                              <div>
                                <p className="text-xs text-black/40">Difficulty</p>
                                <p className="text-sm font-medium text-black">
                                  {insight.metrics.difficulty}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            {insight.tags?.map((tag: string) => (
                              <Badge key={tag} className="bg-black/5 text-black/60 border-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm"
                            className="bg-white text-black border border-black/20 hover:bg-black hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (insight.action.includes('Create')) {
                                router.push('/demo/content-studio/create');
                              } else if (insight.action.includes('Implement')) {
                                router.push('/demo/diagnostics');
                              }
                            }}
                          >
                            {insight.action}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Strategic Alerts */}
            <Card className="border border-black/10">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-black/60" />
                  Strategic Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.slice(0, 3).map((alert: any) => (
                    <div key={alert.id} className="pb-3 border-b border-black/5 last:border-0">
                      <Badge className={`text-xs mb-2 ${
                        alert.severity === 'critical' ? 'bg-black text-white' : 'bg-black/10 text-black'
                      }`}>
                        {alert.type}
                      </Badge>
                      <h4 className="text-xs font-medium text-black mb-1">{alert.title}</h4>
                      <p className="text-xs text-black/60">{alert.description}</p>
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

            {/* Action Items */}
            <Card className="border border-black/10">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-black/60" />
                  Priority Actions
                </h3>
                <div className="space-y-2">
                  {actionItems.filter((item: any) => item.priority === 'critical').slice(0, 5).map((action: any) => (
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

            {/* Recent Wins */}
            <Card className="border border-black/10">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-black/60" />
                  Recent Wins
                </h3>
                <div className="space-y-2">
                  {insightsData?.knowledgeHub?.recentWins?.map((win: any) => (
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
                  <Badge className={`${getPriorityColor(selectedInsight.priority)} text-xs mb-2`}>
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
              <p className="text-sm text-black/70 mb-4">{selectedInsight.summary}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-black/[0.02] rounded-lg">
                  <p className="text-xs text-black/40 mb-1">Impact</p>
                  <p className="text-sm font-medium text-black">{selectedInsight.impact}</p>
                </div>
                <div className="p-3 bg-black/[0.02] rounded-lg">
                  <p className="text-xs text-black/40 mb-1">Timeframe</p>
                  <p className="text-sm font-medium text-black">Immediate action required</p>
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