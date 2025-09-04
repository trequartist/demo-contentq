"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp } from 'lucide-react';

interface CreateContentViewProps {
  assetName: string;
  onStartWorkflow?: (workflowType: string) => void;
}

export default function CreateContentView({ assetName, onStartWorkflow }: CreateContentViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Create Amazing Content</h1>
        <p className="text-lg text-gray-600">
          Choose your content creation approach for <span className="font-medium">{assetName}</span>
        </p>
      </div>

      {/* Workflow Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Content */}
        <Link href="/demo/content-studio/create">
          <div className="bg-black text-white rounded-2xl p-8 hover:scale-105 transition-all cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-6 mx-auto group-hover:bg-white/20 transition-colors">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">Create Content</h2>
            <p className="text-gray-300 text-center mb-6">
              AI-powered blog content creation with guided workflow
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-sm text-gray-300">Topic Selection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-sm text-gray-300">Brief & Draft</span>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => onStartWorkflow?.('create')}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get started →
              </button>
            </div>
          </div>
        </Link>

        {/* Improve Content */}
        <Link href="/demo/content-studio/improve">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6 mx-auto group-hover:bg-gray-200 transition-colors">
              <TrendingUp className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Improve Content</h2>
            <p className="text-gray-600 text-center mb-6">
              Enhance existing blog content with AI analysis
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-sm text-gray-600">Content Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-sm text-gray-600">Improvements</span>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => onStartWorkflow?.('improve')}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
              >
                Improve Content →
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
            View all →
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div>
              <h4 className="font-medium text-gray-900">LinkedIn Post Draft</h4>
              <p className="text-sm text-gray-600">Post • LinkedIn • 2h ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
            <div>
              <h4 className="font-medium text-gray-900">Using Data-Driven Inclusion Strategies to Build Inclusive Leadership</h4>
              <p className="text-sm text-gray-600">Brief • LinkedIn • 2h ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
            <div>
              <h4 className="font-medium text-gray-900">LinkedIn Post Draft</h4>
              <p className="text-sm text-gray-600">draft • LinkedIn • 2h ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link href="/demo/content-studio/create">
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer">
              <span className="font-medium text-gray-900">Blog Post</span>
              <span className="text-gray-400">→</span>
            </div>
          </Link>
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer">
            <span className="font-medium text-gray-900">LinkedIn Post</span>
            <span className="text-gray-400">→</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer">
            <span className="font-medium text-gray-900">Improve Content</span>
            <span className="text-gray-400">→</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
              💡
            </div>
            <span className="font-medium">Tip</span>
          </div>
          <p className="text-sm text-gray-300">
            Complete your 30 drafts before starting new content.
          </p>
        </div>
      </div>
    </div>
  );
}
