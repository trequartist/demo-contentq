"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Globe, 
  Users, 
  CheckCircle, 
  Edit, 
  FileText, 
  MoreVertical, 
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import assetsData from '@/usableclientdata/data/assets/assets.json';

export default function AssetsPage() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const getAssetIcon = (type: string) => {
    switch(type) {
      case 'blog': return Globe;
      case 'linkedin-company': 
      case 'linkedin-personal': return Users;
      case 'community': return MessageSquare;
      default: return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': 
        return <Badge className="bg-black text-white border-0">Active</Badge>;
      case 'not_configured': 
        return <Badge className="bg-white text-black border border-black/20">Setup Required</Badge>;
      case 'completed':
        return <Badge className="bg-black/10 text-black border-0">Completed</Badge>;
      default:
        return <Badge className="bg-black/5 text-black/60 border-0">Pending</Badge>;
    }
  };

  const formatMetricValue = (value: any) => {
    if (typeof value === 'number') {
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toString();
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-black">Content Assets</h1>
            <p className="text-black/60 mt-2">
              Manage your content channels and unlock growth opportunities
            </p>
          </div>
          <Button 
            className="bg-black text-white hover:bg-black/90 border-0"
            onClick={() => router.push('/demo/content-studio')}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Asset
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 border border-black/10 rounded-lg">
            <p className="text-2xl font-light text-black">{assetsData.summary.totalAssets}</p>
            <p className="text-sm text-black/60">Total Assets</p>
          </div>
          <div className="p-4 border border-black/10 rounded-lg">
            <p className="text-2xl font-light text-black">{assetsData.summary.activeAssets}</p>
            <p className="text-sm text-black/60">Active</p>
          </div>
          <div className="p-4 border border-black/10 rounded-lg">
            <p className="text-2xl font-light text-black">{assetsData.summary.monthlyReach}</p>
            <p className="text-sm text-black/60">Monthly Reach</p>
          </div>
          <div className="p-4 border border-black/10 rounded-lg">
            <p className="text-2xl font-light text-black">{assetsData.summary.conversionValue}</p>
            <p className="text-sm text-black/60">Conversion from Content</p>
          </div>
        </div>

        {/* Active Assets */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Active Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assetsData.assets.filter(asset => asset.status === 'active' && (asset.type === 'blog' || asset.type === 'linkedin-company')).slice(0, 2).map((asset) => {
              const Icon = getAssetIcon(asset.type);
              
              return (
                <Card key={asset.id} className="border border-black/10 hover:border-black/20 transition-colors">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black/[0.02] rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-black/60" />
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{asset.name}</h3>
                          <p className="text-sm text-black/40">{asset.platform}</p>
                        </div>
                      </div>
                      {getStatusBadge(asset.status)}
                    </div>

                    {/* Metrics */}
                    {asset.metrics && (
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-black/60">Monthly Views</span>
                          <span className="font-medium text-black">{formatMetricValue(asset.metrics.monthlyViews)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-black/60">Engagement</span>
                          <span className="font-medium text-black">{asset.metrics.avgEngagement || asset.metrics.engagementRate + '%'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-black/60">Conversion</span>
                          <span className="font-medium text-black">{asset.metrics.conversionRate}%</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-black text-white hover:bg-black/90 border-0"
                        onClick={() => router.push('/demo/content-studio')}
                      >
                        Open Studio
                      </Button>
                      <Button 
                        variant="secondary"
                        className="flex-1 bg-white text-black border border-black/20 hover:bg-black/5"
                        onClick={() => router.push('/demo/diagnostics')}
                      >
                        View Diagnostics
                      </Button>
                    </div>

                    {/* Performance Bar */}
                    {asset.diagnostics?.overallScore && (
                      <div className="mt-4 pt-4 border-t border-black/10">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-black/60">Health Score</span>
                          <span className="font-medium text-black">{asset.diagnostics.overallScore}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-black rounded-full transition-all duration-500"
                            style={{ width: `${asset.diagnostics.overallScore}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Setup Required Assets - Hidden for now */}
        {false && (
        <div>
          <h2 className="text-lg font-medium text-black mb-4">Unlock Growth Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assetsData.assets.filter(asset => asset.status === 'not_configured').map((asset) => {
              const Icon = getAssetIcon(asset.type);
              
              return (
                <Card key={asset.id} className="border border-black/10 hover:border-black/20 transition-colors">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black/[0.02] rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-black/30" />
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{asset.name}</h3>
                          <p className="text-sm text-black/40">{asset.platform}</p>
                        </div>
                      </div>
                      {getStatusBadge(asset.status)}
                    </div>

                    {/* Preview Content */}
                    {asset.preview && (
                      <>
                        <div className="mb-4">
                          <p className="text-sm text-black mb-2">{asset.preview.title}</p>
                          <p className="text-sm text-black/60 mb-3">{asset.preview.description}</p>
                          
                          {/* Why It Matters */}
                          <div className="space-y-2">
                            {asset.preview.whyItMatters?.slice(0, 3).map((reason, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-black/60 rounded-full mt-1.5" />
                                <p className="text-xs text-black/80">{reason}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expected Results */}
                        {asset.preview.expectedResults && (
                          <div className="mb-4 p-3 bg-black/[0.02] rounded-lg border border-black/10">
                            <p className="text-xs font-medium text-black mb-2">Expected Results</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-black/60">Reach</p>
                                <p className="text-sm font-medium text-black">{asset.preview.expectedResults.reach}</p>
                              </div>
                              <div>
                                <p className="text-xs text-black/60">Engagement</p>
                                <p className="text-sm font-medium text-black">{asset.preview.expectedResults.engagement}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Competitor Activity */}
                        {asset.preview.competitorActivity && (
                          <div className="mb-4 p-3 bg-white border border-black/10 rounded-lg">
                            <p className="text-xs font-medium text-black mb-2">Competitor Activity</p>
                            {Object.entries(asset.preview.competitorActivity).slice(0, 2).map(([competitor, activity]) => (
                              <div key={competitor} className="flex justify-between text-xs mb-1">
                                <span className="text-black/60 capitalize">{competitor}</span>
                                <span className="text-black">{activity as string}</span>
                              </div>
                            ))}
                            {(asset.preview as any).competitorPresence?.gumloop && (
                              <div className="flex justify-between text-xs mt-2 pt-2 border-t border-black/10">
                                <span className="text-black/60">Gumloop</span>
                                <span className="font-medium text-black">{(asset.preview as any).competitorPresence.gumloop}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Setup Time */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs text-black/60">Setup time</span>
                          <span className="text-xs font-medium text-black">{asset.preview.setupTime}</span>
                        </div>
                      </>
                    )}

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-white text-black border border-black/20 hover:bg-black hover:text-white transition-colors"
                      onClick={() => setSelectedAsset(asset.id)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Connect {asset.preview?.setupTime || 'Quick setup'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        )}

        {/* Recommendations */}
        {assetsData.recommendations && (
          <div className="mt-12 p-6 bg-black/[0.02] rounded-lg border border-black/10">
            <h3 className="text-sm font-medium text-black mb-4">Recommended Actions</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-black/60 mb-2">Immediate</p>
                {assetsData.recommendations.immediate.slice(0, 2).map((rec, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-black">{rec.action}</p>
                    <p className="text-xs text-black/60">{rec.impact} • {rec.effort}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-black/60 mb-2">This Week</p>
                {assetsData.recommendations.thisWeek.slice(0, 2).map((rec, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-black">{rec.action}</p>
                    <p className="text-xs text-black/60">{rec.impact}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-black/60 mb-2">This Month</p>
                {assetsData.recommendations.thisMonth.slice(0, 2).map((rec, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-black">{rec.action}</p>
                    <p className="text-xs text-black/60">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}