"use client";

import React from 'react';
import { Button } from '@/components/ui';
import { Lightbulb, AlertCircle, TrendingUp, Target, Brain, BarChart3, Clock, ArrowRight } from 'lucide-react';
import { InsightItem } from '@/lib/demo/insights/types';
import { useRouter } from 'next/navigation';

interface InsightListItemProps {
  insight: InsightItem;
  dense: boolean;
  onSelect: (insight: InsightItem) => void;
}

export default function InsightListItem({ insight, dense, onSelect }: InsightListItemProps): React.ReactElement {
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

  const Icon = getCategoryIcon(insight.category);

  return (
    <li
      className="flex items-start justify-between gap-3 px-3 py-3 hover:bg-black/5 focus-within:bg-black/5 transition-colors"
      onClick={() => onSelect(insight)}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 bg-black/[0.02] rounded-lg flex items-center justify-center text-black/80">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className={`text-black ${dense ? 'text-sm' : 'text-[15px]'} font-medium truncate`}>{insight.title}</p>
          {Array.isArray(insight.tags) && insight.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {insight.tags.slice(0, dense ? 2 : 3).map((tag, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-black/60 border border-black/10">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {!dense && insight.description && (
            <p className="mt-1 text-sm text-black/60 line-clamp-1">{insight.description}</p>
          )}
          <div className="mt-1 flex items-center gap-4 text-xs text-black/80">
            <span className="inline-flex items-center gap-1"><BarChart3 className="w-3 h-3 text-black/40" />{insight.impact}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3 text-black/40" />{insight.timeframe}</span>
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <Button
          aria-label={`Open action for ${insight.title}`}
          className={`border border-black/20 hover:bg-black hover:text-white transition-colors ${dense ? 'px-2 py-1' : 'text-xs px-3 py-1.5'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (insight.action?.toLowerCase().includes('comparison')) {
              router.push('/demo/content-studio');
            } else if (insight.action?.toLowerCase().includes('schema')) {
              router.push('/demo/diagnostics');
            } else {
              router.push('/demo/playbook');
            }
          }}
        >
          {dense ? <ArrowRight className="w-4 h-4" /> : (<span className="inline-flex items-center">Take Action<ArrowRight className="w-4 h-4 ml-2" /></span>)}
        </Button>
      </div>
    </li>
  );
}


