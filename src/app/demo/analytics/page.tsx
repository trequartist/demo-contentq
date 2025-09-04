"use client";

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  MousePointer,
  Target,
  Search,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  Zap,
  Filter,
  Calendar,
  Download,
  RefreshCw,
  MoreVertical,
  ExternalLink,
  Lightbulb,
  X
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import analyticsData from '@/usableclientdata/data/analytics/analytics-performance.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AiAssistant from '@/components/demo/AiAssistant';

export default function AnalyticsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'seo' | 'ai' | 'funnel'>('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-black" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-black/60" />;
      default: return null;
    }
  };

  const MetricCard = ({ metric, current, change, trend, detail, icon: Icon }: any) => (
    <div className="bg-white border border-black/10 rounded-lg p-6 hover:border-black/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-black/[0.02] rounded-lg">
          <Icon className="w-5 h-5 text-black/70" />
        </div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-black' : trend === 'down' ? 'text-black/60' : 'text-black/40'
        }`}>
          {getTrendIcon(trend)}
          <span className="ml-1">{change > 0 ? '+' : ''}{change}%</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-black/60 mb-1">{metric}</h3>
      <div className="text-3xl font-light text-black mb-1">
        {typeof current === 'number' && current > 1000 ? current.toLocaleString() : current}
        {metric.includes('Rate') || metric.includes('Visibility') ? '%' : ''}
      </div>
      {detail && (
        <p className="text-xs text-black/40">{detail}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-light text-black">Analytics</h1>
              <p className="text-sm text-black/60 mt-1">
                Content performance tracking and optimization insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="p-2 text-black/60 hover:text-black border border-black/10 rounded-lg hover:border-black/20 transition-all">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-black/60 hover:text-black border border-black/10 rounded-lg hover:border-black/20 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.dashboard.highlights.map((highlight) => (
              <MetricCard
                key={highlight.metric}
                metric={highlight.metric}
                current={highlight.current}
                change={highlight.change}
                trend={highlight.trend}
                detail={highlight.detail}
                icon={
                  highlight.metric.includes('Traffic') ? BarChart3 :
                  highlight.metric.includes('Visibility') ? Eye :
                  highlight.metric.includes('Conversion') ? Target :
                  highlight.metric.includes('Authority') ? TrendingUp :
                  BarChart3
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-black/10">
        <div className="px-8">
          <nav className="flex space-x-8">
            {['overview', 'content', 'seo', 'ai', 'funnel'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-all ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-black/40 hover:text-black/70'
                }`}
              >
                {tab === 'ai' ? 'AI Optimization' : tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Traffic Sources */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                  {analyticsData.trafficSources.channels.map((channel) => (
                    <div key={channel.source} className="flex items-center justify-between p-3 border border-black/10 rounded-lg hover:border-black/20 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-black rounded-full" />
                        <span className="font-medium text-black">{channel.source}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-black/60">{channel.visits?.toLocaleString() || 0} visits</span>
                        <span className="text-sm text-black/40">{channel.percentage}%</span>
                        <div className={`flex items-center text-sm ${
                          channel.change > 0 ? 'text-black' : 'text-black/60'
                        }`}>
                          {channel.change > 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(channel.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Top Referrers</h3>
                <div className="space-y-3">
                  {analyticsData.trafficSources.topReferrers.map((referrer) => (
                    <div key={referrer.domain} className="flex items-center justify-between p-3 border border-black/10 rounded-lg hover:border-black/20 transition-colors">
                      <div>
                        <span className="font-medium text-black">{referrer.domain}</span>
                        <p className="text-sm text-black/60">{referrer.context}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-black">{referrer.visits} visits</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Top Performing Content */}
            <Card className="border border-black/10">
              <div className="px-6 py-4 border-b border-black/10">
                <h3 className="text-lg font-medium text-black">Top Performing Content</h3>
              </div>
              <div className="divide-y divide-black/5">
                {analyticsData.contentPerformance.topPerformers.map((content) => (
                  <div 
                    key={content.title} 
                    className="p-6 hover:bg-black/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedContent(content)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-black mb-1">{content.title}</h4>
                        <p className="text-sm text-black/60">Published {new Date(content.published).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                      </div>
                      <Badge className={`${
                        content.trend === 'up' ? 'bg-black text-white' : 'bg-black/10 text-black/60'
                      } border-0`}>
                        {content.insights.split(' - ')[0]}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                      <div>
                        <span className="text-black/40">Views</span>
                        <p className="font-medium text-black">{content.metrics.views?.toLocaleString() || 0}</p>
                      </div>
                      <div>
                        <span className="text-black/40">Avg. Time</span>
                        <p className="font-medium text-black">{content.metrics.avgTime}</p>
                      </div>
                      <div>
                        <span className="text-black/40">Conversion</span>
                        <p className="font-medium text-black">{content.metrics.conversionRate}%</p>
                      </div>
                      <div>
                        <span className="text-black/40">AI Mentions</span>
                        <p className="font-medium text-black">{content.metrics.aiMentions}</p>
                      </div>
                      <div>
                        <span className="text-black/40">Ranking</span>
                        <p className="font-medium text-black">{content.metrics.ranking}</p>
                      </div>
                      <div>
                        <span className="text-black/40">Shares</span>
                        <p className="font-medium text-black">{content.metrics.shares}</p>
                      </div>
                    </div>

                    {content.insights && (
                      <div className="mt-3 p-3 bg-black/[0.02] border border-black/10 rounded-lg">
                        <p className="text-sm text-black/80">{content.insights}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Content Health Overview */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Content Health Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.contentPerformance.contentHealth.totalPosts}
                    </div>
                    <p className="text-sm text-black/60">Total Posts</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.contentPerformance.contentHealth.avgViewsPerPost?.toLocaleString() || 0}
                    </div>
                    <p className="text-sm text-black/60">Avg. Views/Post</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-black">
                      +{analyticsData.contentPerformance.contentHealth.growthRate}%
                    </div>
                    <p className="text-sm text-black/60">Growth Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.contentPerformance.contentHealth.contentGaps.length}
                    </div>
                    <p className="text-sm text-black/60">Content Gaps</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-black mb-3">Top Categories by Conversion</h4>
                  <div className="space-y-2">
                    {analyticsData.contentPerformance.contentHealth.topCategories.map((category) => (
                      <div key={category.category} className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-black">{category.category}</span>
                          <span className="text-sm text-black/60">({category.posts} posts)</span>
                        </div>
                        <div className="text-sm font-medium text-black">
                          {category.avgConversion}% conversion
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-8">
            {/* Keyword Rankings */}
            <Card className="border border-black/10">
              <div className="px-6 py-4 border-b border-black/10">
                <h3 className="text-lg font-medium text-black">Keyword Rankings</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th className="text-left py-3 font-medium text-black">Keyword</th>
                        <th className="text-center py-3 font-medium text-black">Position</th>
                        <th className="text-center py-3 font-medium text-black">Change</th>
                        <th className="text-center py-3 font-medium text-black">Volume</th>
                        <th className="text-center py-3 font-medium text-black">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.seoPerformance.rankings.topKeywords.map((keyword) => (
                        <tr key={keyword.keyword} className="border-b border-black/5">
                          <td className="py-3 font-medium text-black">{keyword.keyword}</td>
                          <td className="text-center py-3">
                            {keyword.position ? (
                              <Badge className={`${
                                keyword.position <= 3 ? 'bg-black text-white' :
                                keyword.position <= 10 ? 'bg-black/20 text-black' :
                                'bg-black/10 text-black/60'
                              } border-0`}>
                                #{keyword.position}
                              </Badge>
                            ) : (
                              <span className="text-black/40">-</span>
                            )}
                          </td>
                          <td className="text-center py-3">
                            {keyword.change === 'NEW' ? (
                              <Badge className="bg-black text-white border-0">NEW</Badge>
                            ) : keyword.change != null ? (
                              <div className={`flex items-center justify-center ${
                                Number(keyword.change) > 0 ? 'text-black' : Number(keyword.change) < 0 ? 'text-black/60' : 'text-black/40'
                              }`}>
                                {Number(keyword.change) > 0 ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : Number(keyword.change) < 0 ? (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                ) : null}
                                {Math.abs(Number(keyword.change))}
                              </div>
                            ) : (
                              <span className="text-black/40">-</span>
                            )}
                          </td>
                          <td className="text-center py-3 text-black/70">{keyword.volume?.toLocaleString() || '-'}</td>
                          <td className="text-center py-3">
                            <div className={`w-full bg-black/10 rounded-full h-2 overflow-hidden`}>
                              <div 
                                className={`h-2 rounded-full ${
                                  keyword.difficulty < 40 ? 'bg-black/30' :
                                  keyword.difficulty < 70 ? 'bg-black/50' :
                                  'bg-black/80'
                                }`}
                                style={{ width: `${keyword.difficulty}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Technical SEO Issues */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Technical SEO Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-black/[0.02] rounded-lg">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.seoPerformance.technicalHealth.overallScore}
                    </div>
                    <p className="text-sm text-black/60">Overall Score</p>
                  </div>
                  <div className="text-center p-4 bg-black/[0.02] rounded-lg">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.seoPerformance.rankings.page1Keywords}
                    </div>
                    <p className="text-sm text-black/60">Page 1 Keywords</p>
                  </div>
                  <div className="text-center p-4 bg-black/[0.02] rounded-lg">
                    <div className="text-3xl font-light text-black">
                      {analyticsData.seoPerformance.rankings.featuredSnippets}
                    </div>
                    <p className="text-sm text-black/60">Featured Snippets</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-black">Issues to Fix</h4>
                  {analyticsData.seoPerformance.technicalHealth.issues.map((issue) => (
                    <div key={issue.type} className="flex items-center justify-between p-3 border border-black/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          issue.severity === 'error' ? 'bg-black' : 'bg-black/40'
                        }`} />
                        <span className="font-medium text-black">{issue.type}</span>
                        <span className="text-sm text-black/60">({issue.pages} pages)</span>
                      </div>
                      <Badge className={`${
                        issue.impact === 'High' ? 'bg-black text-white' : 'bg-black/20 text-black'
                      } border-0`}>
                        {issue.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            {/* AI Platform Visibility */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">AI Platform Visibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {analyticsData.aiOptimization.llmVisibility.platforms.map((platform) => (
                    <div key={platform.name} className="border border-black/10 rounded-lg p-4 text-center">
                      <h4 className="font-medium text-black mb-2">{platform.name}</h4>
                      <div className="text-3xl font-light text-black mb-1">
                        {platform.visibility}%
                      </div>
                      <div className={`text-sm flex items-center justify-center ${
                        platform.change > 0 ? 'text-black' : 'text-black/60'
                      }`}>
                        {platform.change > 0 && <TrendingUp className="w-3 h-3 mr-1" />}
                        {platform.change > 0 ? '+' : ''}{platform.change}%
                      </div>
                      <p className="text-xs text-black/40 mt-2">{platform.citations} citations</p>
                    </div>
                  ))}
                </div>

                <div className="bg-black/[0.02] border border-black/10 rounded-lg p-4">
                  <h4 className="font-medium text-black mb-3">Optimization Recommendations</h4>
                  <div className="space-y-2">
                    {analyticsData.aiOptimization.aeoOptimization.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-black/70">{rec.action || rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Wins */}
            <Card className="border border-black/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Quick Wins for AI Optimization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analyticsData.aiOptimization.aeoOptimization.quickWins.map((win: any, index: number) => (
                    <div key={index} className="bg-white border border-black/10 rounded-lg p-4">
                      <h4 className="font-medium text-black mb-2">{win.action}</h4>
                      <p className="text-sm text-black/60 mb-2">{win.impact}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-black/40">Effort: {win.effort}</span>
                        <Button className="px-2 py-1 bg-black text-white text-xs rounded hover:bg-black/90 border-0">
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="space-y-8">
            {/* Conversion Funnel */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-6">Conversion Funnel</h3>
                <div className="space-y-4">
                  {analyticsData.conversionFunnel.stages.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between p-4 border border-black/10 rounded-lg bg-black/[0.02]">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium text-black">{stage.stage}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-light text-black">
                            {stage.count?.toLocaleString() || 0}
                          </span>
                          <span className="text-sm text-black/60">
                            ({stage.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-black/10 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Funnel Insights */}
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Funnel Insights</h3>
                <div className="space-y-3">
                  {analyticsData.conversionFunnel.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-black/70">{insight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-black/[0.02] border border-black/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-black mb-4">Optimization Recommendations</h3>
                <div className="space-y-3">
                  {analyticsData.conversionFunnel.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-black/70">
                        {typeof rec === 'object' ? `${rec.stage}: ${rec.action}` : String(rec)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Content Deep-Dive Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-light text-black">Content Deep-Dive</h2>
                <button 
                  onClick={() => setSelectedContent(null)}
                  className="p-2 text-black/40 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-black mb-2">{selectedContent.title}</h3>
                <p className="text-sm text-black/60">Published {new Date(selectedContent.published).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
              </div>

              {selectedContent.hourlyTraffic && (
                <div>
                  <h4 className="font-medium text-black mb-3">Hourly Traffic Pattern</h4>
                  <div className="h-32 flex items-end space-x-1">
                    {selectedContent.hourlyTraffic.map((traffic: number, hour: number) => (
                      <div key={hour} className="flex-1 bg-black/20 rounded-t" style={{
                        height: `${(traffic / Math.max(...selectedContent.hourlyTraffic)) * 100}%`,
                        minHeight: '4px'
                      }} />
                    ))}
                  </div>
                  <p className="text-xs text-black/40 mt-2">Peak traffic at 10 AM EST - RevOps readers during work hours</p>
                </div>
              )}

              {selectedContent.sources && (
                <div>
                  <h4 className="font-medium text-black mb-3">Traffic Sources</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(selectedContent.sources).map(([source, percentage]: [string, any]) => (
                      <div key={source} className="text-center p-3 bg-black/[0.02] rounded-lg">
                        <div className="text-2xl font-light text-black">{String(percentage)}%</div>
                        <p className="text-xs text-black/60 capitalize">{source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedContent.userFlow && (
                <div>
                  <h4 className="font-medium text-black mb-3">User Behavior</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-black/[0.02] rounded-lg">
                      <div className="text-2xl font-light text-black">{selectedContent.userFlow.bounceRate}%</div>
                      <p className="text-xs text-black/60">Bounce Rate</p>
                    </div>
                    <div className="text-center p-3 bg-black/[0.02] rounded-lg">
                      <div className="text-sm font-medium text-black">{selectedContent.userFlow.nextPage}</div>
                      <p className="text-xs text-black/60">Top Next Page</p>
                    </div>
                    <div className="text-center p-3 bg-black/[0.02] rounded-lg">
                      <div className="text-sm font-medium text-black">{selectedContent.userFlow.conversion}</div>
                      <p className="text-xs text-black/60">Conversion</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant */}
      <AiAssistant 
        context="analytics" 
        onAction={(action) => {
          console.log('AI Assistant action:', action);
          // Handle specific actions
          if (action === 'export_report') {
            // Trigger export functionality
            console.log('Exporting analytics report...');
          } else if (action === 'get_optimizations') {
            router.push('/demo/insights');
          }
        }}
      />
    </div>
  );
}