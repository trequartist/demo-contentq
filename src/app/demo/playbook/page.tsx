"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical,
  ChevronRight,
  Target,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  ArrowRight,
  Edit,
  Trash2
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';
import Link from 'next/link';

interface Strategy {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  tasks: number;
  completedTasks: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export default function PlaybookPage() {
  const { state } = useDemo();
  const [activeTab, setActiveTab] = useState<'strategy' | 'chat' | 'home'>('strategy');
  const [selectedAsset, setSelectedAsset] = useState('blog');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const strategies: Strategy[] = [
    {
      id: '1',
      title: 'Voice AI Authority Building',
      description: 'Establish market-leading authority in Voice AI through technical content excellence',
      status: 'active',
      progress: 35,
      tasks: 24,
      completedTasks: 8,
      dueDate: '2025-12-31',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Migration Content Strategy',
      description: 'Create comprehensive migration guides for competitive advantage',
      status: 'active',
      progress: 60,
      tasks: 15,
      completedTasks: 9,
      dueDate: '2025-10-15',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Technical Implementation Guides',
      description: 'Develop detailed technical documentation for developers',
      status: 'active',
      progress: 20,
      tasks: 30,
      completedTasks: 6,
      dueDate: '2025-11-30',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Compliance & Security Content',
      description: 'Address regulatory requirements and security best practices',
      status: 'paused',
      progress: 10,
      tasks: 20,
      completedTasks: 2,
      dueDate: '2026-01-15',
      priority: 'low'
    },
    {
      id: '5',
      title: 'Use Case Expansion',
      description: 'Diversify content for different buyer personas and industries',
      status: 'active',
      progress: 45,
      tasks: 18,
      completedTasks: 8,
      dueDate: '2025-09-30',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-black text-white';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'paused':
        return 'bg-gray-50 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-black">Content Playbook</h1>
              <p className="text-sm text-gray-600 mt-1">Build your content strategy through systematic execution</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    activeTab === 'home' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    activeTab === 'chat' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('strategy')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    activeTab === 'strategy' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Strategy
                </button>
              </div>
              <select 
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="blog">Blog</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Strategy View */}
        {activeTab === 'strategy' && (
          <>
            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
              {selectedStrategy ? (
                <div className="max-w-4xl">
                  <button 
                    onClick={() => setSelectedStrategy(null)}
                    className="text-sm text-gray-500 hover:text-black mb-4"
                  >
                    ← Back to strategies
                  </button>
                  
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-black mb-4">
                      {selectedStrategy.title}
                    </h2>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {selectedStrategy.description}
                    </p>

                    <div className="flex items-center space-x-4 mb-6">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedStrategy.status)}`}>
                        {selectedStrategy.status}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        {getPriorityIcon(selectedStrategy.priority)}
                        <span className="ml-1 capitalize">{selectedStrategy.priority} priority</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Due {selectedStrategy.dueDate}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">
                          {selectedStrategy.completedTasks} of {selectedStrategy.tasks} tasks
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedStrategy.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{selectedStrategy.progress}% complete</span>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <Target className="w-8 h-8 text-black mb-2" />
                        <div className="text-2xl font-bold text-black">24</div>
                        <div className="text-sm text-gray-600">Total Tasks</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <CheckCircle className="w-8 h-8 text-black mb-2" />
                        <div className="text-2xl font-bold text-black">8</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <Clock className="w-8 h-8 text-black mb-2" />
                        <div className="text-2xl font-bold text-black">16</div>
                        <div className="text-sm text-gray-600">Remaining</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <TrendingUp className="w-8 h-8 text-black mb-2" />
                        <div className="text-2xl font-bold text-black">+12%</div>
                        <div className="text-sm text-gray-600">This Week</div>
                      </div>
                    </div>

                    {/* Task List */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="font-semibold text-black">Active Tasks</h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4].map((task) => (
                          <div key={task} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <input 
                                type="checkbox" 
                                className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  Task {task}: Create technical implementation guide
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Due in {task * 3} days • Assigned to team
                                </p>
                              </div>
                              <button className="text-gray-400 hover:text-black">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">Active Strategies</h2>
                  <p className="text-gray-600 mb-8">
                    Execute your content strategy with systematic playbooks designed for maximum impact.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {strategies.map((strategy) => (
                      <div 
                        key={strategy.id}
                        onClick={() => setSelectedStrategy(strategy)}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-black mb-2 group-hover:underline">
                              {strategy.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {strategy.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(strategy.status)}`}>
                            {strategy.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {strategy.completedTasks}/{strategy.tasks} tasks
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-black h-1.5 rounded-full transition-all"
                            style={{ width: `${strategy.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Strategy</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">{strategies.length}</h3>
                <button>
                  <MoreVertical className="w-4 h-4 text-gray-400 hover:text-black" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-8">Strategic Plays</p>

              {/* Stats Overview */}
              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Active</span>
                    <span className="text-lg font-bold text-black">
                      {strategies.filter(s => s.status === 'active').length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-black h-1 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Timeline</span>
                    <span className="text-lg font-bold text-black">3-6</span>
                  </div>
                  <span className="text-xs text-gray-600">months implementation</span>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-lg font-bold text-black">34%</span>
                  </div>
                  <span className="text-xs text-gray-600">overall completion</span>
                </div>
              </div>

              {/* Play Items */}
              <div className="space-y-3">
                {strategies.map((strategy) => (
                  <div 
                    key={strategy.id} 
                    onClick={() => setSelectedStrategy(strategy)}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">
                          Play {strategy.id}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {strategy.title}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="text-gray-400 hover:text-black"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-black h-1 rounded-full"
                          style={{ width: `${strategy.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Play</span>
              </button>
            </div>
          </>
        )}

        {/* Home View */}
        {activeTab === 'home' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-8">Playbook Overview</h2>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <BookOpen className="w-12 h-12 text-black mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">Documentation</h3>
                  <p className="text-sm text-gray-600">Access strategy guides and best practices</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Target className="w-12 h-12 text-black mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">Goals</h3>
                  <p className="text-sm text-gray-600">Track progress toward strategic objectives</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-black mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">Measure strategy performance and ROI</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-black mb-4">Getting Started</h3>
                <p className="text-gray-700 mb-6">
                  Your content playbook is a strategic framework for executing high-impact content initiatives. 
                  Each play is designed to address specific market opportunities and competitive gaps.
                </p>
                <Link href="/demo/content-studio/create">
                  <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                    Start Creating Content →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Chat View */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-8">
              <div className="max-w-3xl mx-auto h-full flex flex-col">
                <div className="flex-1 bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy Assistant</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get AI-powered recommendations for your content strategy
                    </p>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                      Start Conversation
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask about your content strategy..."
                      className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Strategy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-black">Create New Strategy</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strategy Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter strategy name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    placeholder="Describe your strategy..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                  Create Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}