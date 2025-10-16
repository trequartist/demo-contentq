"use client";

import React from 'react';
import { Button, Badge } from '@/components/ui';
import {
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  Clock,
  ArrowRight,
  BarChart2,
  Radar,
  Eye,
  Activity,
} from 'lucide-react';
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
      case 'competitive':
        return Radar;
      case 'market':
        return BarChart2;
      case 'ai':
        return Eye;
      case 'social':
        return Activity;
      default:
        return Brain;
    }
  };

  const Icon = getCategoryIcon(insight.category);

  return (
    <li
      className="flex items-start justify-between gap-4 px-5 py-5 hover:bg-slate-50 focus-within:bg-slate-50 transition-colors cursor-pointer"
      onClick={() => onSelect(insight)}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-slate-900 ${dense ? 'text-sm' : 'text-[15px]'} font-semibold`}>{insight.title}</p>
            <Badge className="bg-slate-900 text-white border-0 text-[11px]">{insight.priority}</Badge>
            {insight.relevance && (
              <span className="text-[11px] font-medium text-slate-500">Relevance {insight.relevance}%</span>
            )}
          </div>
          {Array.isArray(insight.tags) && insight.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {insight.tags.slice(0, dense ? 2 : 3).map((tag, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {!dense && insight.description && (
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{insight.description}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 font-medium"><BarChart3 className="w-3 h-3 text-slate-400" />{insight.impact}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{insight.timeframe}</span>
            {insight.metrics?.current && insight.metrics?.potential && (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                {insight.metrics.potential}
              </span>
            )}
          </div>

          {insight.evidence && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
                {insight.evidence.type === 'contentVelocity' && 'Competitor velocity'}
                {insight.evidence.type === 'aiVisibility' && 'AI visibility share'}
                {insight.evidence.type === 'socialShare' && 'Social share of voice'}
                {insight.evidence.type === 'market' && 'Market intelligence'}
                {insight.evidence.type === 'technical' && 'Technical signal'}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                {Object.entries(insight.evidence.stats).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium text-slate-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <Button
          aria-label={`Open action for ${insight.title}`}
          className={`border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors rounded-full ${dense ? 'px-2 py-1' : 'text-xs px-3 py-1.5'}`}
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
          {dense ? <ArrowRight className="w-4 h-4" /> : (<span className="inline-flex items-center font-semibold">Take Action<ArrowRight className="w-4 h-4 ml-2" /></span>)}
        </Button>
      </div>
    </li>
  );
}


