"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  ExternalLink, 
  Edit2, 
  Copy, 
  CheckCircle,
  Circle,
  ArrowRight,
  MoreVertical,
  Globe,
  Briefcase,
  FileText,
  BarChart3,
  BookOpen,
  Settings,
  Trash2,
  RefreshCw,
  AlertCircle,
  Info
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

interface AssetStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
}

export default function AssetsPage() {
  const { state, actions } = useDemo();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [newAsset, setNewAsset] = useState({
    name: '',
    company: '',
    type: 'blog' as 'blog' | 'linkedin'
  });

  const assetSteps: AssetStep[] = [
    {
      id: 'document',
      label: 'Document',
      description: 'Set up content documentation',
      icon: FileText,
      completed: true
    },
    {
      id: 'diagnostics',
      label: 'Diagnostics',
      description: 'Configure performance tracking',
      icon: BarChart3,
      completed: true
    },
    {
      id: 'playbook',
      label: 'Playbook',
      description: 'Define content strategy',
      icon: BookOpen,
      completed: true
    }
  ];

  const getAssetIcon = (type: string) => {
    return type === 'blog' ? Globe : Briefcase;
  };

  const handleCreateAsset = () => {
    if (newAsset.name && newAsset.company) {
      actions.createAsset({
        name: newAsset.name,
        company: newAsset.company,
        type: newAsset.type,
        status: 'active'
      });
      setShowCreateModal(false);
      setNewAsset({ name: '', company: '', type: 'blog' });
    }
  };

  const handleDeleteAsset = (assetId: string) => {
    if (window.confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      // In a real app, this would call actions.deleteAsset(assetId)
      console.log('Deleting asset:', assetId);
    }
  };

  const allAssetsConfigured = state.assets.every(a => a.progress.completed === a.progress.total);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-6 border-b border-gray-200">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black">Content Assets</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your content assets and unlock powerful features through our guided onboarding process.
          </p>
        </div>

        {/* Status Banner */}
        {allAssetsConfigured ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-black" />
              <div>
                <p className="font-medium text-black">All Set!</p>
                <p className="text-sm text-gray-600">Your assets are fully configured</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Complete</span>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-black">Setup Required</p>
                <p className="text-sm text-gray-600">Complete asset configuration to unlock all features</p>
              </div>
            </div>
            <button className="text-sm text-black hover:underline">
              Get Started →
            </button>
          </div>
        )}
      </div>

      <div className="px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Total Assets</span>
              <Globe className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-black">{state.assets.length}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Active</span>
              <CheckCircle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-black">
              {state.assets.filter(a => a.status === 'active').length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Blog Assets</span>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-black">
              {state.assets.filter(a => a.type === 'blog').length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">LinkedIn Assets</span>
              <Briefcase className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-black">
              {state.assets.filter(a => a.type === 'linkedin').length}
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black">Your Assets</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Asset</span>
            </button>
          </div>

          {/* Asset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.assets.map((asset) => {
              const Icon = getAssetIcon(asset.type);
              const progressPercentage = (asset.progress.completed / asset.progress.total) * 100;
              
              return (
                <div key={asset.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{asset.name}</h3>
                          <p className="text-sm text-gray-500">{asset.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          asset.status === 'active' 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {asset.status}
                        </span>
                        <button 
                          onClick={() => setSelectedAsset(asset)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Configuration</span>
                        <span>{asset.progress.completed}/{asset.progress.total} Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-black h-1.5 rounded-full transition-all" 
                          style={{width: `${progressPercentage}%`}}
                        />
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="flex items-center space-x-2 mb-6">
                      {assetSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <button className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            asset.progress[step.id as keyof typeof asset.progress] 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {asset.progress[step.id as keyof typeof asset.progress] ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Circle className="w-3 h-3" />
                            )}
                            <span>{step.label}</span>
                          </button>
                          {index < assetSteps.length - 1 && (
                            <div className={`w-4 h-0.5 ${
                              asset.progress[step.id as keyof typeof asset.progress]
                                ? 'bg-black'
                                : 'bg-gray-300'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Link 
                        href="/demo/content-studio"
                        onClick={() => actions.setSelectedAsset(asset.id)}
                        className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 text-center block text-sm font-medium transition-colors"
                      >
                        Open Content Studio
                      </Link>

                      {/* Secondary Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/demo/diagnostics?asset=${asset.id}`}
                          className="flex items-center justify-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Diagnostics</span>
                        </Link>
                        <Link
                          href={`/demo/playbook?asset=${asset.id}`}
                          className="flex items-center justify-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Playbook</span>
                        </Link>
                      </div>
                    </div>

                    {/* Status Footer */}
                    {progressPercentage === 100 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-black" />
                          <span className="text-xs font-medium text-black">All tasks completed</span>
                        </div>
                        <span className="text-xs text-gray-500">{asset.lastUpdated}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {state.assets.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets yet</h3>
              <p className="text-sm text-gray-600 mb-4">Create your first asset to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors"
              >
                Create Asset
              </button>
            </div>
          )}
        </div>

        {/* Getting Started Guide */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-4 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Getting Started
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {assetSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="bg-white rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <StepIcon className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-black">
                        {index + 1}. {step.label}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Asset Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-black">Create New Asset</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter asset name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newAsset.company}
                    onChange={(e) => setNewAsset({ ...newAsset, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter company name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNewAsset({ ...newAsset, type: 'blog' })}
                      className={`px-4 py-2 rounded-lg border transition-colors flex items-center justify-center space-x-2 ${
                        newAsset.type === 'blog'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>Blog</span>
                    </button>
                    <button
                      onClick={() => setNewAsset({ ...newAsset, type: 'linkedin' })}
                      className={`px-4 py-2 rounded-lg border transition-colors flex items-center justify-center space-x-2 ${
                        newAsset.type === 'linkedin'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewAsset({ name: '', company: '', type: 'blog' });
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAsset}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Create Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Settings Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">Asset Settings</h2>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Configuration</p>
                    <p className="text-xs text-gray-500">Manage asset settings</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Refresh Data</p>
                    <p className="text-xs text-gray-500">Sync latest information</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Copy className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Duplicate Asset</p>
                    <p className="text-xs text-gray-500">Create a copy</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                
                <button
                  onClick={() => {
                    handleDeleteAsset(selectedAsset.id);
                    setSelectedAsset(null);
                  }}
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-red-900">Delete Asset</p>
                    <p className="text-xs text-red-700">This action cannot be undone</p>
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setSelectedAsset(null)}
                className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}