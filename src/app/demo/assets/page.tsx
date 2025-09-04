"use client";

import React from 'react';
import { Plus, Globe, Users, CheckCircle, Edit, FileText, MoreVertical, ArrowRight } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import Link from 'next/link';

interface Asset {
  id: string;
  name: string;
  type: 'blog' | 'linkedin';
  status: 'active' | 'setup' | 'pending';
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  completedTasks: string[];
  actions: string[];
  lastUpdated: string;
}

// Sample assets matching your product
const ASSETS: Asset[] = [
  {
    id: 'deepgram-blog',
    name: 'Deepgram',
    type: 'blog',
    status: 'active',
    progress: { current: 3, total: 3, percentage: 100 },
    completedTasks: ['Document', 'Diagnostics', 'Playbook'],
    actions: ['Open Content Studio', 'Update Document', 'Update Playbook'],
    lastUpdated: '25/08/2025'
  },
  {
    id: 'bhavya-linkedin',
    name: 'bhavya-misra-70979351',
    type: 'linkedin', 
    status: 'active',
    progress: { current: 3, total: 3, percentage: 100 },
    completedTasks: ['Document', 'Diagnostics', 'Playbook'],
    actions: ['Open Content Studio', 'Update Document', 'Update Playbook'],
    lastUpdated: '25/08/2025'
  }
];

export default function AssetsPage() {
  const getAssetIcon = (type: string) => {
    return type === 'blog' ? Globe : Users;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success';
      case 'setup': return 'warning';
      case 'pending': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Assets</h1>
            <p className="text-gray-600 mt-2">
              Manage your content assets and unlock powerful features through our guided onboarding process.
            </p>
          </div>
          <Button variant="primary" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            New Asset
          </Button>
        </div>

        {/* Status Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-medium text-green-900">All Set!</h3>
              <p className="text-sm text-green-700">Your assets are fully configured</p>
            </div>
            <div className="ml-auto">
              <Badge variant="success">Complete</Badge>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Assets</h2>
            <span className="text-sm text-gray-500">2 assets</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSETS.map((asset) => {
              const Icon = getAssetIcon(asset.type);
              
              return (
                <Card key={asset.id} variant="default" padding="lg" hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        asset.type === 'blog' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          asset.type === 'blog' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600">{asset.name}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {asset.progress.current}/{asset.progress.total} Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-black h-2 rounded-full transition-all duration-500"
                        style={{ width: `${asset.progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {asset.completedTasks.map((task) => (
                      <Badge key={task} variant="default" size="sm">
                        {task}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    {asset.actions.map((action, index) => (
                      <Link key={action} href={index === 0 ? "/demo/content-studio" : "#"}>
                        <button className={`w-full px-4 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2 ${
                          index === 0 
                            ? 'bg-black text-white hover:bg-gray-900'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}>
                          {index === 0 ? (
                            <FileText className="w-4 h-4" />
                          ) : (
                            <Edit className="w-4 h-4" />
                          )}
                          <span>{action}</span>
                        </button>
                      </Link>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">All tasks completed</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>📅</span>
                      <span>{asset.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}