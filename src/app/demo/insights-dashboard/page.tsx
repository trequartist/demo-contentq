"use client";

import React from 'react';
import InsightsDashboard from '@/components/demo/insights/InsightsDashboard';
import insightsData from '@/usableclientdata/data/insights/insights-hub-v2.json';

export default function InsightsDashboardPage() {
  const data = insightsData;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <InsightsDashboard data={data} />
      </div>
    </div>
  );
}
