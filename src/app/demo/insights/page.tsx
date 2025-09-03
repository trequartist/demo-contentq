"use client";

import React, { useState, useEffect } from 'react';
import ResearchFeed from '@/components/demo/insights/ResearchFeed';
import KnowledgeHub from '@/components/demo/insights/KnowledgeHub';
import AIAssistant from '@/components/demo/insights/AIAssistant';
import insightsData from '@/data/insights-hub-data.json';

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Gathering market intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-black">
            Insights Hub
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Real-time market intelligence and content opportunities
          </p>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Research Feed (35%) */}
            <div className="lg:col-span-4 h-full overflow-hidden">
              <ResearchFeed data={insightsData.researchFeed} />
            </div>

            {/* Center Column - Knowledge Hub (30%) */}
            <div className="lg:col-span-4 h-full overflow-hidden">
              <KnowledgeHub data={insightsData.knowledgeHub} />
            </div>

            {/* Right Column - AI Assistant (35%) */}
            <div className="lg:col-span-4 h-full overflow-hidden">
              <AIAssistant data={insightsData.aiAssistant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
