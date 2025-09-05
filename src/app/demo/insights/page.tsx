"use client";

import React, { useState } from 'react';
import AiAssistant from '@/components/demo/AiAssistant';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';
import InsightsHeader from '@/components/demo/insights/InsightsHeader';
import FiltersBar from '@/components/demo/insights/FiltersBar';
import InsightsFeed from '@/components/demo/insights/InsightsFeed';
import InsightsSidebar from '@/components/demo/insights/InsightsSidebar';
import AiSummary from '@/components/demo/insights/AiSummary';
import InsightModal from '@/components/demo/insights/InsightModal';
import { mapResearchFeedItemsToInsights } from '@/lib/demo/insights/map-json';
import { InsightItem } from '@/lib/demo/insights/types';

export default function InsightsPage(): React.ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showAdditionalInsights, setShowAdditionalInsights] = useState<boolean>(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(null);
  const [dense, setDense] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allInsights: InsightItem[] = mapResearchFeedItemsToInsights(insightsHubData as any);

  const filteredInsights = allInsights.filter((insight) => {
    const categoryMatch = selectedCategory === 'all' || insight.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || insight.priority === selectedPriority;
    const search = searchQuery.trim().toLowerCase();
    const searchMatch =
      !search ||
      insight.title.toLowerCase().includes(search) ||
      insight.description.toLowerCase().includes(search);
    return categoryMatch && priorityMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <InsightsHeader data={insightsHubData as any} />

      <FiltersBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dense={dense}
        setDense={setDense}
        showAdditionalInsights={showAdditionalInsights}
        setShowAdditionalInsights={setShowAdditionalInsights}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InsightsFeed insights={filteredInsights} dense={dense} onSelect={setSelectedInsight} />
          <InsightsSidebar data={insightsHubData as any} showAdditionalInsights={showAdditionalInsights} />
        </div>
        <AiSummary />
      </div>

      <InsightModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />

      <AiAssistant
        context="insights"
        onAction={(action) => {
          if (action === 'generate_action_plan') {
            window.location.href = '/demo/playbook';
          } else if (action === 'view_metrics') {
            window.location.href = '/demo/analytics';
          }
        }}
      />
    </div>
  );
}

 
