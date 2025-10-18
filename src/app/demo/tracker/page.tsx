"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  Activity,
  Brain,
  Search,
  Globe
} from 'lucide-react';

export default function TrackerPage() {
  const [selectedPost, setSelectedPost] = useState('post-1');

  const publishedPosts = [
    {
      id: 'post-1',
      title: 'Ultimate Migration Guide from Traditional Automation',
      publishedDate: '2025-01-15',
      status: 'published',
      aiScoreBefore: 67,
      aiScoreAfter: 71,
      scoreChange: 4,
      isPositive: true
    },
    {
      id: 'post-2', 
      title: 'Zapier vs Make vs n8n: The No-BS Comparison',
      publishedDate: '2025-01-10',
      status: 'published',
      aiScoreBefore: 71,
      aiScoreAfter: 68,
      scoreChange: -3,
      isPositive: false
    },
    {
      id: 'post-3',
      title: 'Building Bulletproof Error Handling with AI',
      publishedDate: '2025-01-05',
      status: 'published',
      aiScoreBefore: 68,
      aiScoreAfter: 70,
      scoreChange: 2,
      isPositive: true
    }
  ];

  const currentPost = publishedPosts.find(p => p.id === selectedPost);

  const llmPerformance = [
    {
      name: 'ChatGPT (Browse)',
      citations: 12,
      queries: ['automation migration', 'Zapier alternative', 'workflow tools'],
      trend: 'up'
    },
    {
      name: 'Claude',
      citations: 8,
      queries: ['technical automation guide', 'error handling patterns'],
      trend: 'up'
    },
    {
      name: 'Perplexity',
      citations: 5,
      queries: ['automation platform comparison'],
      trend: 'stable'
    }
  ];

  const attribution = {
    newCitations: 25,
    pointLift: 4,
    strongestCluster: 'automation migration',
    competitorGap: 'Reduced gap with Zapier by 15%'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Tracker</h1>
          <p className="text-lg text-gray-600">Monitor AI visibility impact of your published content</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post Selection */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Published Posts</h2>
              <div className="space-y-3">
                {publishedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPost === post.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{post.title}</h3>
                      <span className="text-xs text-gray-500">{post.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">AI Score:</span>
                      <span className="text-sm font-medium text-gray-900">{post.aiScoreBefore}/100</span>
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-sm font-medium text-gray-900">{post.aiScoreAfter}/100</span>
                      <div className={`flex items-center gap-1 text-xs ${
                        post.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {post.isPositive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {post.isPositive ? '+' : ''}{post.scoreChange}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Impact Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {currentPost && (
              <>
                {/* Post Header */}
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">PUBLISHED: "{currentPost.title}"</h2>
                      <p className="text-gray-600">Published: {new Date(currentPost.publishedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {currentPost.aiScoreBefore} → {currentPost.aiScoreAfter}
                      </div>
                      <div className={`flex items-center gap-1 text-lg ${
                        currentPost.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {currentPost.isPositive ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" />
                        )}
                        {currentPost.isPositive ? '+' : ''}{currentPost.scoreChange} points
                        <span className="text-2xl">🎉</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI Visibility Impact Tracking */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">═══ AI VISIBILITY IMPACT TRACKING ═══</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Week 1 Results</h4>
                      <div className="text-2xl font-bold text-green-900 mb-1">
                        Your AI Score: {currentPost.aiScoreBefore} → {currentPost.aiScoreAfter}
                      </div>
                      <div className="flex items-center gap-1 text-green-700">
                        <span className="text-lg">({currentPost.isPositive ? '+' : ''}{currentPost.scoreChange} points)</span>
                        <span className="text-2xl">🎉</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Attribution</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <div>• {attribution.newCitations} new query citations</div>
                        <div>• +{attribution.pointLift} point lift in overall AI score</div>
                        <div>• Strongest performer in "{attribution.strongestCluster}" cluster</div>
                      </div>
                    </div>
                  </div>

                  {/* LLM-Specific Performance */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">LLM-Specific Performance:</h4>
                    <div className="space-y-3">
                      {llmPerformance.map((llm, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Brain className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-900">{llm.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Now cited in {llm.citations} new queries</span>
                              <div className={`w-2 h-2 rounded-full ${
                                llm.trend === 'up' ? 'bg-green-500' : 
                                llm.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                              }`} />
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div className="mb-1">Appearing for:</div>
                            <div className="flex flex-wrap gap-1">
                              {llm.queries.map((query, qIdx) => (
                                <span key={qIdx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                  "{query}"
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attribution Details */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      📊 ATTRIBUTION
                    </h4>
                    <p className="text-sm text-purple-700 mb-3">This post is responsible for:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-900">{attribution.newCitations}</div>
                        <div className="text-purple-700">new query citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-900">+{attribution.pointLift}</div>
                        <div className="text-purple-700">point lift in overall AI score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-900">#1</div>
                        <div className="text-purple-700">performer in "{attribution.strongestCluster}" cluster</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-purple-600">
                      💡 {attribution.competitorGap}
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
