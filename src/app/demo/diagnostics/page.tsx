"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  RefreshCw, 
  TrendingUp,
  TrendingDown,
  Activity,
  FileText,
  BarChart3,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Zap,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';
import Link from 'next/link';

interface Metric {
  label: string;
  value: number;
  change: number;
  status: 'up' | 'down' | 'stable';
}

export default function DiagnosticsPage() {
  const { state, actions } = useDemo();
  const [liveUpdates, setLiveUpdates] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [runningDiagnostics, setRunningDiagnostics] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    // Generate metrics
    const generateMetrics = () => {
      setMetrics([
        {
          label: 'Content Score',
          value: 73,
          change: 5.2,
          status: 'up'
        },
        {
          label: 'Engagement Rate',
          value: 61,
          change: -2.1,
          status: 'down'
        },
        {
          label: 'SEO Performance',
          value: 89,
          change: 0,
          status: 'stable'
        },
        {
          label: 'Readability',
          value: 92,
          change: 3.8,
          status: 'up'
        }
      ]);
    };

    generateMetrics();
    
    if (liveUpdates) {
      const interval = setInterval(generateMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [liveUpdates]);

  const runDiagnostics = async (assetId: string) => {
    setRunningDiagnostics(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    actions.runDiagnostics(assetId);
    setRunningDiagnostics(false);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'good':
        return <CheckCircle className="w-4 h-4" />;
      case 'needs-work':
        return <AlertCircle className="w-4 h-4" />;
      case 'poor':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getChangeIcon = (status: string) => {
    switch(status) {
      case 'up':
        return <ArrowUp className="w-3 h-3" />;
      case 'down':
        return <ArrowDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-black">Diagnostics Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Analyze content performance and get AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setLiveUpdates(!liveUpdates)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  liveUpdates 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${liveUpdates ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                <span>Live Updates</span>
              </button>
              <button 
                onClick={() => state.assets[0] && runDiagnostics(state.assets[0].id)}
                disabled={runningDiagnostics}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {runningDiagnostics ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>New Diagnostics</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    metric.status === 'up' ? 'text-black' : 
                    metric.status === 'down' ? 'text-gray-600' : 
                    'text-gray-400'
                  }`}>
                    {getChangeIcon(metric.status)}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-black">{metric.value}</span>
                  <span className="text-sm text-gray-500 ml-1">/ 100</span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-black h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">Diagnostics Reports</h2>
                  <span className="text-sm text-gray-500">{state.diagnostics.length} Available</span>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {state.diagnostics.map((report) => (
                  <div 
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          report.status === 'good' ? 'bg-black text-white' :
                          report.status === 'needs-work' ? 'bg-gray-200 text-gray-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {getStatusIcon(report.status)}
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{report.assetName}</h3>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                            <span>{report.date}</span>
                            <span>•</span>
                            <span className="capitalize">{report.assetType} Analysis</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Overall</p>
                        <p className="text-2xl font-bold text-black">{report.visibilityScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Visibility</p>
                        <p className="text-xl font-semibold text-gray-900">{report.metrics.visibility}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Content</p>
                        <p className="text-xl font-semibold text-gray-900">{report.metrics.content}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Position</p>
                        <p className="text-xl font-semibold text-gray-900">{report.metrics.position}%</p>
                      </div>
                    </div>

                    {report.completed && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                            <span className="text-gray-600">Strong: {report.analysis?.strong || 2}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span className="text-gray-600">Improving: {report.analysis?.improving || 1}</span>
                          </span>
                        </div>
                        <button className="text-sm font-medium text-black hover:underline">
                          View Report
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {state.diagnostics.length === 0 && (
                <div className="p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No diagnostic reports yet</p>
                  <button 
                    onClick={() => state.assets[0] && runDiagnostics(state.assets[0].id)}
                    className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Run First Diagnostic
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4">Quick Actions</h3>
              {state.assets.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Ready to analyze: {state.assets.map(a => a.name).join(', ')}
                  </p>
                  
                  <div className="space-y-2">
                    {state.assets.map(asset => (
                      <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-black rounded-full"></span>
                          <span className="text-sm text-gray-900">{asset.name}</span>
                        </div>
                        <button 
                          onClick={() => runDiagnostics(asset.id)}
                          className="text-xs text-black hover:underline"
                        >
                          Analyze
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => state.assets[0] && runDiagnostics(state.assets[0].id)}
                    className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Run All Diagnostics</span>
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-3">No assets configured</p>
                  <Link href="/demo/assets">
                    <button className="text-sm text-black hover:underline">
                      Configure Assets →
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                {state.diagnostics.slice(0, 3).map(report => (
                  <div key={report.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{report.assetName}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        report.completed ? 'bg-black' : 'bg-gray-300 animate-pulse'
                      }`} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                  </div>
                ))}
              </div>

              {state.diagnostics.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No recent activity
                </p>
              )}
            </div>

            {/* How It Works */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-2 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                How It Works
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our AI analyzes your content for quality, SEO, and engagement. Processing takes 10-15 minutes per workflow.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-900">1.</span>
                  <span className="text-xs text-gray-600">Select asset to analyze</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-900">2.</span>
                  <span className="text-xs text-gray-600">AI scans content quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-900">3.</span>
                  <span className="text-xs text-gray-600">Get actionable insights</span>
                </div>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4">Performance Trends</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">+28%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">All Time</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-black" />
                    <span className="text-sm font-medium text-black">+67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    Diagnostic Report: {selectedReport.assetName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedReport.date}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Overall Score */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 mb-4">
                  <span className="text-4xl font-bold text-black">{selectedReport.visibilityScore}%</span>
                </div>
                <p className="text-lg font-medium text-black mb-1">Overall Performance</p>
                <p className="text-sm text-gray-600">
                  {selectedReport.status === 'good' ? 'Excellent performance' :
                   selectedReport.status === 'needs-work' ? 'Room for improvement' :
                   'Needs attention'}
                </p>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">{selectedReport.metrics.visibility}%</div>
                  <p className="text-sm text-gray-600">Visibility Score</p>
                  <p className="text-xs text-gray-500 mt-1">Search performance</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">{selectedReport.metrics.content}%</div>
                  <p className="text-sm text-gray-600">Content Quality</p>
                  <p className="text-xs text-gray-500 mt-1">Writing & structure</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">{selectedReport.metrics.position}%</div>
                  <p className="text-sm text-gray-600">Market Position</p>
                  <p className="text-xs text-gray-500 mt-1">Competitive ranking</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-black mb-4">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Strong keyword optimization</p>
                      <p className="text-xs text-gray-600 mt-1">Your content ranks well for target keywords</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Improve meta descriptions</p>
                      <p className="text-xs text-gray-600 mt-1">Add more compelling meta descriptions for better CTR</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Increase content frequency</p>
                      <p className="text-xs text-gray-600 mt-1">Publishing more frequently can improve engagement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View Full Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}