"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Calendar, 
  FileText, 
  ArrowRight,
  Info,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

export default function DashboardPage() {
  const { state, actions } = useDemo();
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const name = state.user.name;
    
    if (hour < 12) {
      setGreeting(`Good morning, ${name}`);
    } else if (hour < 18) {
      setGreeting(`Good afternoon, ${name}`);
    } else {
      setGreeting(`Good evening, ${name}`);
    }

    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));

    // Update metrics
    actions.updateMetrics();
  }, [state.user.name]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Post':
      case 'published':
        return 'text-green-600 bg-green-50';
      case 'Draft':
      case 'draft':
        return 'text-blue-600 bg-blue-50';
      case 'Brief':
      case 'brief':
        return 'text-purple-600 bg-purple-50';
      case 'idea':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const recentDocuments = state.documents.slice(0, 5);

  const quickActions = [
    {
      id: 'blog-post',
      title: 'Blog Post',
      description: 'Create a new blog article',
      icon: FileText,
      href: '/demo/content-studio/create?type=blog',
      color: 'text-blue-600'
    },
    {
      id: 'linkedin-post',
      title: 'LinkedIn Post',
      description: 'Create social content',
      icon: Activity,
      href: '/demo/content-studio/create?type=linkedin',
      color: 'text-purple-600'
    },
    {
      id: 'improve-content',
      title: 'Improve Content',
      description: 'Enhance existing content',
      icon: TrendingUp,
      href: '/demo/content-studio/improve',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {greeting}
          </h1>
          <p className="text-sm text-gray-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {currentDate}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{state.metrics.totalContent}</div>
                <div className="text-sm text-gray-600">Total content</div>
                <div className="text-xs text-gray-400 mt-1">
                  {state.documents.filter(d => d.type === 'blog').length} blog • {state.documents.filter(d => d.type === 'linkedin').length} linkedin
                </div>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{state.metrics.published}</div>
                <div className="text-sm text-gray-600">Published</div>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">All live</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{state.metrics.inProgress}</div>
                <div className="text-sm text-gray-600">In progress</div>
                <div className="flex items-center mt-2">
                  <AlertCircle className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-xs text-yellow-600">Action needed</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Create New Content Card */}
          <Link href="/demo/content-studio/create">
            <div 
              className="bg-gray-900 text-white rounded-xl p-8 h-full flex flex-col justify-center items-center cursor-pointer hover:bg-gray-800 transition-all transform hover:scale-105"
              onMouseEnter={() => setHoveredCard('create')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create New Content</h3>
              <p className="text-sm text-gray-300 text-center">Start with AI assistance</p>
              <div className={`mt-4 text-sm flex items-center space-x-1 text-white/80 hover:text-white transition-all ${hoveredCard === 'create' ? 'translate-x-2' : ''}`}>
                <span>Get started</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Calendar Card */}
          <Link href="/demo/content-studio/calendar">
            <div 
              className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
              onMouseEnter={() => setHoveredCard('calendar')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Calendar className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar</h3>
              <p className="text-sm text-gray-500 text-center">Plan your content</p>
              <div className={`mt-4 text-sm text-blue-600 hover:text-blue-700 transition-all ${hoveredCard === 'calendar' ? 'translate-x-2' : ''}`}>
                View calendar
              </div>
            </div>
          </Link>

          {/* Documents Card */}
          <Link href="/demo/content-studio">
            <div 
              className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
              onMouseEnter={() => setHoveredCard('documents')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <FileText className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documents</h3>
              <p className="text-sm text-gray-500 text-center">Browse all content</p>
              <div className={`mt-4 text-sm text-purple-600 hover:text-purple-700 transition-all ${hoveredCard === 'documents' ? 'translate-x-2' : ''}`}>
                View documents
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/demo/content-studio" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                View all
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <Link key={doc.id} href={`/demo/content-studio/document/${doc.id}`}>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium line-clamp-1">
                        {doc.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <span>{doc.type === 'blog' ? 'Blog' : 'LinkedIn'}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{doc.lastEdited}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{action.title}</span>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            
            {/* Tip Section */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Tip</p>
                  <p className="text-xs text-gray-600">
                    Complete your drafts to maintain consistent content velocity. You have {state.documents.filter(d => d.status === 'draft').length} drafts pending.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Assets Footer */}
        <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-500">Available Assets</span>
          <div className="flex items-center space-x-4">
            <Link href="/demo/assets?type=blog" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Blog ({state.assets.filter(a => a.type === 'blog').length})
            </Link>
            <Link href="/demo/assets?type=linkedin" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              LinkedIn ({state.assets.filter(a => a.type === 'linkedin').length})
            </Link>
            <Link href="/demo/assets" className="text-sm text-gray-900 bg-white px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50">
              Manage Assets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}