"use client";

import React, { useState } from 'react';
import AiAssistant from '@/components/demo/AiAssistant';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';
import InsightsHeader from '@/components/demo/insights/InsightsHeader';
import FiltersBar from '@/components/demo/insights/FiltersBar';
import InsightsFeed from '@/components/demo/insights/InsightsFeed';
import { mapResearchFeedItemsToInsights } from '@/lib/demo/insights/map-json';
import { InsightItem } from '@/lib/demo/insights/types';
import InsightModal from '@/components/demo/insights/InsightModal';
import InsightDetailPanel from '@/components/demo/insights/InsightDetailPanel';
import InsightTrendCards from '@/components/demo/insights/InsightTrendCards';
import InsightSummaryPanel from '@/components/demo/insights/InsightSummaryPanel';
import InsightEmptyState from '@/components/demo/insights/InsightEmptyState';

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

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <InsightTrendCards data={insightsHubData as any} showAdditionalInsights={showAdditionalInsights} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <InsightsFeed insights={filteredInsights} dense={dense} onSelect={setSelectedInsight} />
          <InsightDetailPanel
            data={insightsHubData as any}
            selectedInsight={selectedInsight}
            onSelect={setSelectedInsight}
            showAdditionalInsights={showAdditionalInsights}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <InsightSummaryPanel data={insightsHubData as any} />
          <div className="xl:col-span-2">
            {filteredInsights.length === 0 && <InsightEmptyState />}
          </div>
        </div>
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

 
