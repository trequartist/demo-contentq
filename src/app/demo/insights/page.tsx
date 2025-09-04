"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Target,
  Sparkles,
  FileText,
  BarChart3,
  Search,
  RefreshCw,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
  Users,
  MessageSquare,
  TrendingDown,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import insightsData from '@/usableclientdata/data/insights/insights-hub.json';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const data = insightsData;

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-gray-900 bg-gray-200 border-gray-400';
      case 'high': return 'text-gray-800 bg-gray-100 border-gray-300';
      case 'medium': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-white border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      case 'competitor': return <Users className="w-4 h-4" />;
      case 'insight': return <Lightbulb className="w-4 h-4" />;
      case 'market': return <BarChart3 className="w-4 h-4" />;
      case 'opportunity': return <Target className="w-4 h-4" />;
      case 'technical': return <Zap className="w-4 h-4" />;
      case 'user': return <MessageSquare className="w-4 h-4" />;
      case 'ai': return <Brain className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? data.researchFeed.items 
    : data.researchFeed.items.filter(item => item.type === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Insights Hub</h1>
              <p className="text-sm text-gray-600 mt-1">AI-powered intelligence for content strategy</p>
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Insights
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Insights</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.knowledgeHub.stats.totalInsights}
                  </p>
                </div>
                <Brain className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Actions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.knowledgeHub.stats.criticalActions}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Actions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.knowledgeHub.stats.completedActions}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.knowledgeHub.stats.healthScore}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.knowledgeHub.stats.improvementRate}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {data.strategicAlerts && data.strategicAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Strategic Alerts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {data.strategicAlerts.map(alert => (
                <Card key={alert.id} className={`border ${alert.severity === 'critical' ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-gray-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-gray-900' : 'text-gray-600'} mt-1`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <p className="text-sm font-medium text-gray-900 mb-1">Action: {alert.recommendation}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{alert.timeframe}</span>
                          {alert.estimatedImpact && (
                            <Badge variant="secondary" className="text-xs">
                              {alert.estimatedImpact}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Research Feed */}
          <div className="col-span-2">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Critical Insights Feed</CardTitle>
                <CardDescription>High-priority market intelligence and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInsights.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedInsight(item)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded ${getPriorityColor(item.priority)}`}>
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getPriorityColor(item.priority)}`}
                          >
                            {item.priority?.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{item.time}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.relevance}% relevant</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Source: {item.source}</span>
                          {item.impact && (
                            <span className="font-medium text-gray-700">Impact: {item.impact}</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                      {item.metrics && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {Object.entries(item.metrics).slice(0, 3).map(([key, value]: [string, any]) => (
                              <div key={key}>
                                <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span className="font-medium text-gray-900 ml-1">
                                  {value != null ? (typeof value === 'number' ? value.toLocaleString() : String(value)) : 'N/A'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <div>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Action Items</CardTitle>
                <CardDescription>Priority tasks to execute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.knowledgeHub.actionItems.slice(0, 5).map((action: any) => (
                    <div key={action.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                          action.priority === 'critical' ? 'bg-gray-900' :
                          action.priority === 'high' ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          <Zap className={`w-4 h-4 ${
                            action.priority === 'critical' ? 'text-white' :
                            action.priority === 'high' ? 'text-white' : 'text-gray-700'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {action.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span>{action.effort}</span>
                            {action.impact && (
                              <span className="font-medium text-gray-900">{action.impact}</span>
                            )}
                          </div>
                          {action.status === 'in-progress' && action.progress && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-black h-1.5 rounded-full" 
                                  style={{ width: `${action.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                action.status === 'in-progress' ? 'bg-gray-900 text-white' :
                                action.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                                'bg-gray-600 text-white'
                              }`}
                            >
                              {action.status}
                            </Badge>
                            {action.dueDate && (
                              <span className="text-xs text-gray-500">
                                Due: {new Date(action.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Categories */}
            <Card className="border-gray-200 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Knowledge Categories</CardTitle>
                <CardDescription>Insight distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.knowledgeHub.categories.map((category: any) => (
                    <div 
                      key={category.id}
                      className={`p-3 rounded-lg border ${
                        category.priority === 'critical' ? 'border-gray-400 bg-gray-100' :
                        category.priority === 'high' ? 'border-gray-300 bg-gray-50' :
                        'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <p className="text-sm font-medium text-gray-900">
                            {category.name}
                          </p>
                        </div>
                        {category.trending && (
                          <TrendingUp className="w-3 h-3 text-gray-900" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {category.count} insights • {category.actionItems || 0} actions
                      </p>
                      {category.topInsight && (
                        <p className="text-xs font-medium text-gray-700">
                          Top: {category.topInsight}
                        </p>
                      )}
                      {category.estimatedValue && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {category.estimatedValue}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Market Intelligence */}
        <Card className="border-gray-200 mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Market Intelligence</CardTitle>
            <CardDescription>Competitive landscape and market trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Competitor Moves</h4>
                <div className="space-y-3">
                  {data.marketIntelligence.competitorMoves.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.competitor}</p>
                        <p className="text-xs text-gray-600">{item.move}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Weakness:</p>
                        <p className="text-xs font-medium text-gray-700">{item.weakness}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Market Trends</h4>
                <div className="space-y-3">
                  {data.marketIntelligence.trends.map((trend, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{trend.trend}</span>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-900">
                          {trend.growth}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{trend.opportunity}</p>
                      <p className="text-xs font-medium text-gray-700">→ {trend.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}