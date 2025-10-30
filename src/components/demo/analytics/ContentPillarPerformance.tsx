"use client";

import { TrendingUp, TrendingDown, FileText, Target, Users, Zap, BarChart3, Eye } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

interface ContentPillarPerformanceProps {
  pillars: Array<{
    pillarName: string;
    totalPosts: number;
    traffic: number;
    trafficTrend: string;
    trafficChange: number;
    conversions: number;
    conversionRate: number;
    aiCitations: number;
    aiCitationsTrend: string;
    engagement: number;
    engagementTrend: string;
    topContent: string[];
    status: 'high-performing' | 'moderate' | 'needs-attention';
  }>;
}

export default function ContentPillarPerformance({ pillars }: ContentPillarPerformanceProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high-performing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs-attention':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'high-performing':
        return 'High Performing';
      case 'moderate':
        return 'Moderate';
      case 'needs-attention':
        return 'Needs Attention';
      default:
        return status;
    }
  };

  const maxTraffic = Math.max(...pillars.map(p => p.traffic));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Content Pillar Performance</h2>
          <p className="text-sm text-black/60 mt-1">Track metrics across your strategic content pillars</p>
        </div>
        <select className="px-4 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black bg-white">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => (
          <Card key={idx} className="p-6 border border-black/10 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black mb-2">{pillar.pillarName}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(pillar.status)} text-xs font-medium border`}>
                    {getStatusLabel(pillar.status)}
                  </Badge>
                  <span className="text-xs text-black/60">{pillar.totalPosts} posts</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-black/60" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Traffic */}
              <div className="p-3 bg-black/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-black/60" />
                  <span className="text-xs text-black/60">Traffic</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-black">{pillar.traffic.toLocaleString()}</span>
                  <span className={`text-xs font-medium ${pillar.trafficChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pillar.trafficTrend}
                  </span>
                </div>
              </div>

              {/* Conversions */}
              <div className="p-3 bg-black/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-black/60" />
                  <span className="text-xs text-black/60">Conversions</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-black">{pillar.conversions}</span>
                  <span className="text-xs text-black/60">{pillar.conversionRate}%</span>
                </div>
              </div>

              {/* AI Citations */}
              <div className="p-3 bg-black/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-black/60" />
                  <span className="text-xs text-black/60">AI Citations</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-black">{pillar.aiCitations}</span>
                  <span className="text-xs font-medium text-green-600">{pillar.aiCitationsTrend}</span>
                </div>
              </div>

              {/* Engagement */}
              <div className="p-3 bg-black/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-black/60" />
                  <span className="text-xs text-black/60">Engagement</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-black">{pillar.engagement}</span>
                  <span className={`text-xs font-medium ${pillar.engagement >= 4 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {pillar.engagementTrend}
                  </span>
                </div>
              </div>
            </div>

            {/* Traffic Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-black/60 mb-2">
                <span>Traffic Performance</span>
                <span>{Math.round((pillar.traffic / maxTraffic) * 100)}% of top pillar</span>
              </div>
              <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${(pillar.traffic / maxTraffic) * 100}%` }}
                />
              </div>
            </div>

            {/* Top Content */}
            <div>
              <h4 className="text-xs font-medium text-black/60 mb-2">Top Performing Content:</h4>
              <div className="space-y-1">
                {pillar.topContent.slice(0, 2).map((content, contentIdx) => (
                  <div key={contentIdx} className="flex items-center gap-2 text-xs text-black/80">
                    <div className="w-1 h-1 bg-black/40 rounded-full" />
                    <span className="truncate">{content}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <Card className="p-6 border border-black/10 bg-gradient-to-br from-black/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black mb-2">Pillar Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-black/60">Highest Traffic:</span>
                <p className="font-semibold text-black mt-1">{pillars[0]?.pillarName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-black/60">Best Conversion Rate:</span>
                <p className="font-semibold text-black mt-1">
                  {pillars.reduce((prev, current) => 
                    (prev.conversionRate > current.conversionRate) ? prev : current
                  ).pillarName}
                </p>
              </div>
              <div>
                <span className="text-black/60">Needs Focus:</span>
                <p className="font-semibold text-black mt-1">
                  {pillars.find(p => p.status === 'needs-attention')?.pillarName || 'All performing well'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}


