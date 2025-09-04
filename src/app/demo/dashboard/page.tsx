"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  TrendingUp,
  Sparkles,
  BarChart3,
  AlertCircle,
  ArrowRight,
  Target,
  Brain,
  CheckCircle,
  RefreshCw,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  Zap
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import dashboardData from '@/usableclientdata/data/dashboard/dashboard.json';

export default function DashboardPage() {
  const router = useRouter();
  const data = dashboardData;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return data.overview.greeting.morning;
    if (hour < 17) return data.overview.greeting.afternoon;
    return data.overview.greeting.evening;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}
              </h1>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Authority Score:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {data.overview.highlights.primaryMetric.value}/100
                  </span>
                  <span className={`text-sm font-medium ${data.overview.highlights.primaryMetric.trend === 'up' ? 'text-gray-900' : 'text-gray-600'}`}>
                    {data.overview.highlights.primaryMetric.trend === 'up' ? '↑' : '↓'} {data.overview.highlights.primaryMetric.change}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {data.overview.highlights.urgentOpportunity.value} MRR Gap
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                Gumloop Demo
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-gray-400" />
                <span className={`text-sm font-medium ${data.metrics.performance.traffic.trend === 'up' ? 'text-gray-900' : 'text-gray-600'}`}>
                  {data.metrics.performance.traffic.trend === 'up' ? '+' : ''}{data.metrics.performance.traffic.change}%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.metrics.performance.traffic.value}</p>
              <p className="text-sm text-gray-600 mt-1">{data.metrics.performance.traffic.label}</p>
              <p className="text-xs text-gray-500 mt-2">{data.metrics.performance.traffic.source}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
                <span className={`text-sm font-medium ${data.metrics.performance.conversion.trend === 'up' ? 'text-gray-900' : 'text-gray-600'}`}>
                  {data.metrics.performance.conversion.trend === 'up' ? '+' : ''}{data.metrics.performance.conversion.change}%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.metrics.performance.conversion.value}</p>
              <p className="text-sm text-gray-600 mt-1">{data.metrics.performance.conversion.label}</p>
              <p className="text-xs text-gray-500 mt-2">{data.metrics.performance.conversion.benchmark}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-gray-400" />
                <span className={`text-sm font-medium ${data.metrics.performance.authority.trend === 'up' ? 'text-gray-900' : 'text-gray-600'}`}>
                  {data.metrics.performance.authority.trend === 'up' ? '+' : ''}{data.metrics.performance.authority.change}%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.metrics.performance.authority.value}</p>
              <p className="text-sm text-gray-600 mt-1">{data.metrics.performance.authority.label}</p>
              <p className="text-xs text-gray-500 mt-2">{data.metrics.performance.authority.context}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-gray-400" />
                <span className={`text-sm font-medium ${data.metrics.performance.revenue.trend === 'up' ? 'text-gray-900' : 'text-gray-600'}`}>
                  {data.metrics.performance.revenue.trend === 'up' ? '+' : ''}{data.metrics.performance.revenue.change}%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.metrics.performance.revenue.value}</p>
              <p className="text-sm text-gray-600 mt-1">{data.metrics.performance.revenue.label}</p>
              <p className="text-xs text-gray-500 mt-2">{data.metrics.performance.revenue.attribution}</p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {data.criticalAlerts && data.criticalAlerts.length > 0 && (
          <div className="mb-8">
            {data.criticalAlerts.slice(0, 1).map(alert => (
              <Card key={alert.id} className="border-red-200 bg-red-50 mb-4">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={() => router.push('/demo/diagnostics')}
                          className="bg-red-900 text-white hover:bg-red-800"
                        >
                          {alert.action}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <span className="text-sm text-gray-600">
                          {alert.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.quickActions.map((action) => (
              <Card 
                key={action.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  action.primary ? 'border-black' : 'border-gray-200'
                }`}
                onClick={() => router.push(action.action)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                      action.primary ? 'bg-black text-white' : 'bg-gray-100'
                    }`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      {action.urgency && (
                        <Badge variant="error" className="mt-2">
                          {action.urgency}
                        </Badge>
                      )}
                      {action.impact && (
                        <p className="text-xs text-gray-500 mt-2">{action.impact}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Focus */}
        {data.weeklyFocus && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Focus</h2>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => router.push('/demo/playbook')}
              >
                View Full Playbook
              </Button>
            </div>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">{data.weeklyFocus.current}</Badge>
                    <h3 className="font-semibold text-gray-900 mb-2">{data.weeklyFocus.theme}</h3>
                    <div className="space-y-2 mb-4">
                      {data.weeklyFocus.priorities.map((priority, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.weeklyFocus.progress.completed}/{data.weeklyFocus.progress.total}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {data.weeklyFocus.progress.onTrack ? 'On track' : 'Behind schedule'}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Next week: <span className="font-medium text-gray-900">{data.weeklyFocus.nextWeek}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {data.recentActivity.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.platform} • {item.time}</p>
                        {item.metrics && (
                          <p className="text-xs text-gray-400 mt-1">
                            {item.metrics.views && `${item.metrics.views} views`}
                            {item.metrics.conversions && ` • ${item.metrics.conversions} conversions`}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        item.status === 'published' ? 'bg-gray-900 text-white' :
                        item.status === 'scheduled' ? 'bg-gray-200 text-gray-900' :
                        item.status === 'insight' ? 'bg-gray-100 text-gray-700' :
                        ''
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Overview */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Content Assets</h2>
            <Button 
              variant="secondary"
              size="sm"
              onClick={() => router.push('/demo/assets')}
            >
              Manage Assets
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.assets.slice(0, 2).map((asset) => (
              <Card key={asset.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{asset.icon}</span>
                      <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`${
                        asset.status === 'active' ? 'bg-gray-900 text-white' :
                        asset.status === 'underutilized' ? 'bg-gray-200 text-gray-900' :
                        asset.status === 'not_configured' ? 'bg-gray-100 text-gray-600' :
                        ''
                      }`}
                    >
                      {asset.status === 'not_configured' ? 'Not setup' : asset.status}
                    </Badge>
                  </div>
                  {asset.metrics ? (
                    <div className="space-y-2">
                      {Object.entries(asset.metrics).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">{asset.preview?.description}</p>
                      <Button 
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push('/demo/assets')}
                      >
                        Setup Now • {asset.preview?.setupTime}
                      </Button>
                    </div>
                  )}
                  {asset.url && (
                    <a 
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-900 hover:text-gray-700 font-medium mt-4 inline-block"
                    >
                      View Asset →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}