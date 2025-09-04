"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar,
  FileText, 
  Plus,
  ArrowRight,
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import dashboardData from '@/usableclientdata/data/dashboard/dashboard.json';

export default function DashboardPage() {
  const router = useRouter();
  const contentStore = useContentStudioStore();
  const data = dashboardData;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return data.overview.greeting.morning;
    if (hour < 17) return data.overview.greeting.afternoon;
    return data.overview.greeting.evening;
  };

  // Format date
  const formatDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-light text-black mb-1">
                {getGreeting()}, {data.overview.userName}
              </h1>
              <p className="text-sm text-black/40">
                {formatDate()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-black/60">Available Assets</p>
              <Badge className="bg-black/[0.02] text-black border border-black/10">Blog</Badge>
              <Badge className="bg-black/[0.02] text-black border border-black/10">LinkedIn</Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-5xl font-light text-black">{data.overview.stats.totalContent.value}</p>
              <p className="text-sm text-black/60 mt-1">{data.overview.stats.totalContent.label}</p>
              <p className="text-xs text-black/40 mt-1">{data.overview.stats.totalContent.breakdown}</p>
            </div>
            <div>
              <p className="text-5xl font-light text-black">{data.overview.stats.published.value}</p>
              <p className="text-sm text-black/60 mt-1">{data.overview.stats.published.label}</p>
            </div>
            <div>
              <p className="text-5xl font-light text-black">{data.overview.stats.inProgress.value}</p>
              <p className="text-sm text-black/60 mt-1">{data.overview.stats.inProgress.label}</p>
            </div>
          </div>

          {/* Main Cards */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {/* Create New Content */}
            <Card className="text-black border-0 cursor-pointer hover:opacity-90 transition-opacity"  onClick={() => router.push('/demo/content-studio')}>
              <CardContent className="p-6 h-48 flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Create New Content</h3>
                  <p className="text-sm text-white/60 mb-4">Start with AI assistance</p>
                  <button className="flex items-center gap-2 text-sm">
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="bg-white border border-black/10 cursor-pointer hover:border-black/20 transition-colors"
                  onClick={() => router.push('/demo/content-studio/calendar')}>
              <CardContent className="p-6 h-48 flex flex-col justify-between">
                <div className="w-12 h-12 bg-black/[0.02] rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-black/60" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Calendar</h3>
                  <p className="text-sm text-black/60 mb-4">Plan your content</p>
                  <button className="flex items-center gap-2 text-sm text-black/80 hover:text-black">
                    View calendar
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-white border border-black/10 cursor-pointer hover:border-black/20 transition-colors"
                  onClick={() => router.push('/demo/content-studio?view=documents')}>
              <CardContent className="p-6 h-48 flex flex-col justify-between">
                <div className="w-12 h-12 bg-black/[0.02] rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-black/60" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Documents</h3>
                  <p className="text-sm text-black/60 mb-4">Browse all content</p>
                  <button className="flex items-center gap-2 text-sm text-black/80 hover:text-black">
                    View documents
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-black">Recent Activity</h2>
                <button 
                  onClick={() => router.push('/demo/content-studio?view=documents')}
                  className="text-xs text-black/60 hover:text-black"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {data.recentActivity.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-black line-clamp-1">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            item.status === 'published' ? 'bg-black text-white' :
                            item.status === 'draft' ? 'bg-black/5 text-black/60' :
                            item.status === 'post' ? 'bg-black/10 text-black/70' :
                            item.status === 'brief' ? 'bg-black/10 text-black/70' :
                            item.status === 'scheduled' ? 'bg-black/20 text-black' :
                            item.status === 'review' ? 'bg-black/10 text-black/60' :
                            'bg-black/5 text-black/60'
                          } border-0`}
                        >
                          {item.status === 'post' ? 'Post' : 
                           item.status === 'brief' ? 'Brief' :
                           item.status === 'published' ? 'Published' :
                           item.status === 'scheduled' ? 'Scheduled' :
                           item.status === 'review' ? 'In Review' :
                           'Draft'}
                        </Badge>
                        <span className="text-xs text-black/40">
                          {item.platform}
                        </span>
                        <span className="text-xs text-black/40">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-sm font-medium text-black mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    contentStore.startWorkflow('blog-create');
                    router.push('/demo/content-studio/create');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-black/[0.02] hover:bg-black/[0.04] rounded-lg transition-colors group"
                >
                  <span className="text-sm text-black">Blog Post</span>
                  <ChevronRight className="w-4 h-4 text-black/40 group-hover:text-black/60" />
                </button>
                <button
                  onClick={() => {
                    contentStore.startWorkflow('linkedin-create');
                    router.push('/demo/content-studio/create');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-black/[0.02] hover:bg-black/[0.04] rounded-lg transition-colors group"
                >
                  <span className="text-sm text-black">LinkedIn Post</span>
                  <ChevronRight className="w-4 h-4 text-black/40 group-hover:text-black/60" />
                </button>
                <button
                  onClick={() => {
                    contentStore.startWorkflow('blog-improve');
                    router.push('/demo/content-studio/create');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-black/[0.02] hover:bg-black/[0.04] rounded-lg transition-colors group"
                >
                  <span className="text-sm text-black">Improve Content</span>
                  <ChevronRight className="w-4 h-4 text-black/40 group-hover:text-black/60" />
                </button>
              </div>
            </div>
          </div>

          {/* Playbook Progress */}
          {data.playbook && (
            <div className="mt-8 p-6 border border-black/10 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-black mb-1">{data.playbook.current}</h3>
                  <p className="text-xs text-black/60">{data.playbook.focus}</p>
                </div>
                <Badge className="bg-black text-white border-0 text-xs">
                  {data.playbook.postsPerWeek} posts/week
                </Badge>
              </div>
              <div className="space-y-2">
                {data.playbook.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-black/20 rounded" />
                    <span className="text-sm text-black/80">{priority}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-xs text-black/60">
                  Next week: <span className="text-black font-medium">{data.playbook.nextWeek}</span>
                </p>
              </div>
            </div>
          )}

          {/* Competitor Watch */}
          {data.competitors && (
            <div className="mt-8">
              <h2 className="text-sm font-medium text-black mb-4">Competitor Watch</h2>
              <div className="grid grid-cols-3 gap-4">
                {data.competitors.map((competitor) => (
                  <div key={competitor.name} className="p-4 border border-black/10 rounded-lg">
                    <h3 className="text-sm font-medium text-black mb-2">{competitor.name}</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-black/60">Content/month</span>
                        <span className="text-black">{competitor.contentVelocity}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-black/60">Market share</span>
                        <span className="text-black">{competitor.marketShare}</span>
                      </div>
                      <p className="text-xs text-black/40 mt-2 pt-2 border-t border-black/5">
                        {competitor.weakness}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tip Section */}
          <div className="mt-8 p-4 bg-black/[0.02] rounded-lg flex items-start gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Tip</p>
              <p className="text-sm text-black/60 mt-1">
                {data.tips && data.tips[1] ? data.tips[1].description : 
                 `Complete your ${data.overview.stats.inProgress.value} drafts before starting new content.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}