"use client";

import React from 'react';
import { Badge } from '@/components/ui';
import { Lightbulb, AlertCircle, TrendingUp, Target, Brain, ChevronRight, BarChart3, Clock, ArrowRight, TrendingDown } from 'lucide-react';
import { InsightItem } from '@/lib/demo/insights/types';
import { useRouter } from 'next/navigation';
import InsightCard from './InsightCard';
import InsightListItem from './InsightListItem';

interface InsightsFeedProps {
  insights: InsightItem[];
  dense: boolean;
  onSelect: (insight: InsightItem) => void;
}

export default function InsightsFeed({ insights, dense, onSelect }: InsightsFeedProps): React.ReactElement {
  const router = useRouter();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opportunity':
        return Lightbulb;
      case 'issue':
        return AlertCircle;
      case 'trend':
        return TrendingUp;
      case 'recommendation':
        return Target;
      default:
        return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opportunity':
        return 'text-black';
      case 'issue':
        return 'text-black/80';
      case 'trend':
        return 'text-black/60';
      case 'recommendation':
        return 'text-black/70';
      default:
        return 'text-black/50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-black text-white border-0">Critical</Badge>;
      case 'high':
        return <Badge className="bg-black/80 text-white border-0">High</Badge>;
      case 'medium':
        return <Badge className="bg-black/20 text-black border-0">Medium</Badge>;
      case 'low':
        return <Badge className="bg-black/10 text-black/60 border-0">Low</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (change?: number) => {
    if (!change) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-black" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-black/60" />;
    return null;
  };

  const priorityRank: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...insights].sort((a, b) => {
    const pa = priorityRank[a.priority] ?? 9;
    const pb = priorityRank[b.priority] ?? 9;
    if (pa !== pb) return pa - pb;
    const ra = typeof a.relevance === 'number' ? a.relevance : 0;
    const rb = typeof b.relevance === 'number' ? b.relevance : 0;
    return rb - ra;
  });

  if (sorted.length === 0) {
    return (
      <div className="lg:col-span-2">
        <div className="p-6 border border-black/10 rounded-lg text-center text-black/60">
          No insights match your filters.
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <ul className="divide-y divide-black/10 bg-white rounded-lg border border-black/10">
        {sorted.map((insight) => (
          <InsightListItem key={insight.id} insight={insight} dense={dense} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
}


