"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Input } from '@/components/ui';
import { 
  FileText, 
  Calendar,
  FolderOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Brain,
  Edit3
} from 'lucide-react';
import MyDocumentsViewNew from '@/components/demo/content-studio/MyDocumentsViewNew';

type ViewType = 'workflows' | 'documents';

export default function ContentStudioPage() {
  const router = useRouter();
  const contentStore = useContentStudioStore();
  const [currentView, setCurrentView] = useState<ViewType>('workflows');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(contentStudioData.getAllData());
  const [selectedChannel, setSelectedChannel] = useState<'blog' | 'linkedin'>('blog');

  useEffect(() => {
    // Refresh data when view changes
    setData(contentStudioData.getAllData());
  }, [currentView]);

  const handleStartWorkflow = (type: 'blog-create' | 'linkedin-create' | 'blog-improve') => {
    contentStore.startWorkflow(type);
    router.push('/demo/content-studio/create');
  };

  const workflows = [
    {
      id: 'blog-create',
      title: data.workflows.blogCreate.name,
      description: data.workflows.blogCreate.description,
      icon: FileText,
      color: 'text-black',
      bgColor: 'bg-black',
      estimatedTime: data.workflows.blogCreate.estimatedTime,
      stages: data.workflows.blogCreate.stages.length,
      features: ['Topic Generation', 'SEO Optimization'],
      stats: {
        used: data.workflows.blogCreate.stats.totalCreated,
        avgCompletion: `${data.workflows.blogCreate.stats.avgCompletionRate}%`,
        satisfaction: `${data.workflows.blogCreate.stats.satisfaction}/5`
      }
    },
    {
      id: 'linkedin-create',
      title: data.workflows.linkedinCreate.name,
      description: data.workflows.linkedinCreate.description,
      icon: Brain,
      color: 'text-black/70',
      bgColor: 'bg-black/10',
      estimatedTime: data.workflows.linkedinCreate.estimatedTime,
      stages: data.workflows.linkedinCreate.stages.length,
      features: ['Angle Selection', 'Hashtag Optimization'],
      stats: {
        used: data.workflows.linkedinCreate.stats.totalCreated,
        avgCompletion: `${data.workflows.linkedinCreate.stats.avgCompletionRate}%`,
        satisfaction: `${data.workflows.linkedinCreate.stats.satisfaction}/5`
      }
    },
    {
      id: 'blog-improve',
      title: data.workflows.blogImprove.name,
      description: data.workflows.blogImprove.description,
      icon: Edit3,
      color: 'text-black/60',
      bgColor: 'bg-white border border-black/20',
      estimatedTime: data.workflows.blogImprove.estimatedTime,
      stages: data.workflows.blogImprove.stages.length,
      features: ['Content Analysis', 'Gap Detection'],
      stats: {
        used: data.workflows.blogImprove.stats.totalImproved,
        avgCompletion: `${data.workflows.blogImprove.stats.avgScoreIncrease || 95}%`,
        satisfaction: `${data.workflows.blogImprove.stats.satisfaction}/5`
      }
    }
  ];

  const recentDocuments = data.documents.slice(0, 5);
  const upcomingScheduled = contentStudioData.getUpcomingEvents(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-light text-black">Content Studio</h1>
              <p className="text-sm text-black/40">Create and manage your content</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-black/50">Channel</span>
              <div className="inline-flex rounded-lg border border-black/10 overflow-hidden" role="group" aria-label="Content channel">
                <button
                  onClick={() => setSelectedChannel('blog')}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    selectedChannel === 'blog'
                      ? 'bg-black text-white'
                      : 'bg-white text-black/60 hover:text-black'
                  }`}
                  data-button-id="contentStudio.toggle.blog"
                  data-toggle="channel"
                  data-value="blog"
                  aria-pressed={selectedChannel === 'blog'}
                >
                  Blog
                </button>
                <button
                  onClick={() => setSelectedChannel('linkedin')}
                  className={`px-3 py-1.5 text-sm border-l border-black/10 transition-colors ${
                    selectedChannel === 'linkedin'
                      ? 'bg-black text-white'
                      : 'bg-white text-black/60 hover:text-black'
                  }`}
                  data-button-id="contentStudio.toggle.linkedin"
                  data-toggle="channel"
                  data-value="linkedin"
                  aria-pressed={selectedChannel === 'linkedin'}
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentView('workflows')}
              className={`py-3 border-b-2 transition-all ${
                currentView === 'workflows'
                  ? 'border-black text-black font-medium'
                  : 'border-transparent text-black/50 hover:text-black/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Workflows
              </div>
            </button>
            <button
              onClick={() => setCurrentView('documents')}
              className={`py-3 border-b-2 transition-all ${
                currentView === 'documents'
                  ? 'border-black text-black font-medium'
                  : 'border-transparent text-black/50 hover:text-black/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                My Documents
                <Badge variant="secondary" className="ml-1 bg-black/5 text-black/60 border-0 text-xs">127</Badge>
              </div>
            </button>
            <button
              onClick={() => router.push('/demo/content-studio/calendar')}
              className={`py-3 border-b-2 transition-all border-transparent text-black/50 hover:text-black/70`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar
                {upcomingScheduled.length > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-black/5 text-black/60 border-0 text-xs">{upcomingScheduled.length}</Badge>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'workflows' && (
          <div className="space-y-8">
            {/* Quick Stats
            <div className="grid grid-cols-4 gap-4">
              <Card className="border border-black/10 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/50">Content Created</p>
                      <p className="text-2xl font-light text-black">
                        {data.documents.filter(d => d.status === 'published').length}
                      </p>
                      <p className="text-xs text-black mt-1">+12% this month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-black/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/50">In Progress</p>
                      <p className="text-2xl font-light text-black">
                        {data.documents.filter(d => d.status === 'draft' || d.status === 'review').length}
                      </p>
                      <p className="text-xs text-black/40 mt-1">Across 3 workflows</p>
                    </div>
                    <Clock className="w-8 h-8 text-black/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/50">Scheduled</p>
                      <p className="text-2xl font-light text-black">
                        {data.documents.filter(d => d.status === 'scheduled').length}
                      </p>
                      <p className="text-xs text-black/40 mt-1">Next 30 days</p>
                    </div>
                    <Calendar className="w-8 h-8 text-black/20" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/50">Avg. SEO Score</p>
                      <p className="text-2xl font-light text-black">
                        {data.analytics.seoMetrics.avgSeoScore}%
                      </p>
                      <p className="text-xs text-black mt-1">Above target</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-black/20" />
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* Workflow Cards */}
            <div>
              <h2 className="text-lg font-medium text-black mb-4">Choose Your Workflow</h2>
              <div className="grid grid-cols-3 gap-6">
                {workflows
                  .filter(w => selectedChannel === 'blog' ? w.id.startsWith('blog') : w.id.startsWith('linkedin'))
                  .map((workflow) => {
                  const Icon = workflow.icon;
                  return (
                    <Card 
                      key={workflow.id} 
                      className="border border-black/10 hover:border-black/20 transition-all cursor-pointer shadow-sm"
                      onClick={() => handleStartWorkflow(workflow.id as any)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 ${workflow.bgColor} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${workflow.color === 'text-black' ? 'text-white' : workflow.color}`} />
                          </div>
                          <Badge variant="secondary" className="bg-black/5 text-black/60 border-0 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {workflow.estimatedTime}
                          </Badge>
                        </div>
                        <CardTitle className="mt-4 font-medium text-black">{workflow.title}</CardTitle>
                        <CardDescription className="text-black/50 text-sm">{workflow.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {workflow.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-white border border-black/10 text-black/60">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Stats */}
                          <div className="pt-3 border-t border-black/10">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <p className="text-black/40">Used</p>
                                <p className="font-medium text-black">{workflow.stats.used}</p>
                              </div>
                              <div>
                                <p className="text-black/40">Completion</p>
                                <p className="font-medium text-black">{workflow.stats.avgCompletion}</p>
                              </div>
                              <div>
                                <p className="text-black/40">Rating</p>
                                <p className="font-medium text-black">{workflow.stats.satisfaction}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action */}
                          <Button className="w-full bg-black text-white hover:bg-black/90">
                            Start Workflow
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-medium text-black mb-4">Recent Documents</h2>
              <Card className="border border-black/10 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-black/5">
                    {recentDocuments.length > 0 ? recentDocuments.map((doc) => (
                      <div key={doc.id} className="p-4 hover:bg-black/[0.02] transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-black/30" />
                            <div>
                              <p className="font-medium text-black line-clamp-1">{doc.title}</p>
                              <p className="text-sm text-black/40">
                                {doc.type} • Modified {new Date(doc.dates.modified).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={doc.status === 'published' ? 'default' : 'secondary'}
                              className={
                                doc.status === 'published' ? 'bg-black text-white text-xs' :
                                doc.status === 'draft' ? 'bg-white border border-black/20 text-black/60 text-xs' :
                                doc.status === 'review' ? 'bg-black/10 text-black text-xs border-0' :
                                'bg-black/5 text-black/60 text-xs border-0'
                              }
                            >
                              {doc.status}
                            </Badge>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              className="bg-white border border-black/20 text-black hover:bg-black/5 text-xs"
                              onClick={() => {
                                if (doc.status === 'draft' || doc.status === 'review') {
                                  router.push(`/demo/content-studio/edit/${doc.id}`);
                                } else {
                                  router.push(`/demo/content-studio/document/${doc.id}`);
                                }
                              }}
                            >
                              {doc.status === 'draft' || doc.status === 'review' ? 'Edit' : 'View'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-black/40">
                        <FileText className="w-12 h-12 text-black/20 mx-auto mb-3" />
                        <p>No recent documents</p>
                        <p className="text-sm mt-1">Start a workflow to create your first content</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === 'documents' && <MyDocumentsViewNew />}
      </div>
    </div>
  );
}