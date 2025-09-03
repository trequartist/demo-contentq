"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Users,
  Eye,
  Clock,
  Calendar,
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';
import Link from 'next/link';

interface ChartData {
  label: string;
  value: number;
  percentage?: number;
}

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
}

export default function AnalyticsPage() {
  const { state } = useDemo();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [refreshing, setRefreshing] = useState(false);
  
  // Generate chart data
  const [contentPerformance, setContentPerformance] = useState<ChartData[]>([]);
  const [engagementData, setEngagementData] = useState<ChartData[]>([]);
  const [topContent, setTopContent] = useState<any[]>([]);

  const metrics: MetricCard[] = [
    {
      title: 'Total Views',
      value: '124.5K',
      change: 12.5,
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: -0.3,
      trend: 'down',
      icon: Activity
    },
    {
      title: 'Unique Visitors',
      value: '89.2K',
      change: 8.7,
      trend: 'up',
      icon: Users
    },
    {
      title: 'Avg. Time on Page',
      value: '3m 24s',
      change: 0,
      trend: 'stable',
      icon: Clock
    }
  ];

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      setContentPerformance([
        { label: 'Mon', value: 65, percentage: 65 },
        { label: 'Tue', value: 78, percentage: 78 },
        { label: 'Wed', value: 90, percentage: 90 },
        { label: 'Thu', value: 81, percentage: 81 },
        { label: 'Fri', value: 56, percentage: 56 },
        { label: 'Sat', value: 45, percentage: 45 },
        { label: 'Sun', value: 38, percentage: 38 }
      ]);

      setEngagementData([
        { label: 'Blog Posts', value: 68, percentage: 68 },
        { label: 'LinkedIn', value: 45, percentage: 45 },
        { label: 'Case Studies', value: 82, percentage: 82 },
        { label: 'Whitepapers', value: 73, percentage: 73 },
        { label: 'Videos', value: 59, percentage: 59 }
      ]);

      setTopContent(
        state.documents.slice(0, 5).map((doc, index) => ({
          ...doc,
          views: Math.floor(Math.random() * 10000) + 1000,
          engagement: Math.floor(Math.random() * 100),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        }))
      );
    };

    generateData();
  }, [period, state.documents]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3" />;
      case 'down':
        return <ArrowDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up':
        return 'text-black';
      case 'down':
        return 'text-gray-600';
      default:
        return 'text-gray-400';
    }
  };

  const getMaxValue = (data: ChartData[]) => {
    return Math.max(...data.map(d => d.value));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-black">Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Track your content performance and engagement metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Period Selector */}
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                {(['7d', '30d', '90d', '1y'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                      period === p ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    {p === '7d' ? '7 Days' : 
                     p === '30d' ? '30 Days' : 
                     p === '90d' ? '90 Days' : '1 Year'}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <div className="text-2xl font-bold text-black">{metric.value}</div>
                    <div className="text-xs text-gray-600 mt-1">{metric.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Content Performance Chart */}
          <div className="col-span-7">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">Content Performance</h2>
                  <button className="text-gray-400 hover:text-black transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Bar Chart */}
                <div className="h-64 flex items-end justify-between space-x-2">
                  {contentPerformance.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gray-100 rounded-t relative flex items-end justify-center" 
                           style={{ height: `${(data.value / 100) * 256}px` }}>
                        <div className="w-full bg-black rounded-t transition-all duration-500 hover:bg-gray-800"
                             style={{ height: `${(data.value / 100) * 100}%` }}>
                        </div>
                        <span className="absolute -top-6 text-xs font-medium text-gray-900">
                          {data.value}%
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 mt-2">{data.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-black rounded"></div>
                        <span className="text-gray-600">Current Period</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                        <span className="text-gray-600">Previous Period</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">Avg: 64.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement by Type */}
          <div className="col-span-5">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Engagement by Type</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {engagementData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{data.label}</span>
                      <span className="text-sm text-gray-600">{data.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-black h-2 rounded-full transition-all duration-500"
                           style={{ width: `${data.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Content */}
          <div className="col-span-12">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">Top Performing Content</h2>
                  <Link href="/demo/content-studio">
                    <button className="text-sm text-black hover:underline">
                      View All →
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-100">
                    <tr className="text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Engagement
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Trend
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topContent.map((content) => (
                      <tr key={content.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <Link href={`/demo/content-studio/document/${content.id}`}>
                            <span className="text-sm font-medium text-gray-900 hover:text-black cursor-pointer">
                              {content.title}
                            </span>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">{content.lastEdited}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 capitalize">
                            {content.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {content.views.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-1.5">
                              <div className="bg-black h-1.5 rounded-full"
                                   style={{ width: `${content.engagement}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-600">{content.engagement}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-1 text-sm ${
                            content.trend === 'up' ? 'text-black' : 'text-gray-600'
                          }`}>
                            {content.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-black transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="col-span-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4">Performance Summary</h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Best Performing Day</p>
                  <p className="text-lg font-semibold text-black">Wednesday</p>
                  <p className="text-xs text-gray-500">+23% above average</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Peak Hour</p>
                  <p className="text-lg font-semibold text-black">10:00 AM</p>
                  <p className="text-xs text-gray-500">Most active time</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Top Content Type</p>
                  <p className="text-lg font-semibold text-black">Case Studies</p>
                  <p className="text-xs text-gray-500">82% engagement rate</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Growth Rate</p>
                  <p className="text-lg font-semibold text-black">+18.5%</p>
                  <p className="text-xs text-gray-500">Month over month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
