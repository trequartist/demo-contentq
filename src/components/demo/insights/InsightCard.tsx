"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
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

interface InsightCardProps {
  insight: InsightItem;
  dense: boolean;
  onSelect: (insight: InsightItem) => void;
}

export default function InsightCard({ insight, dense, onSelect }: InsightCardProps): React.ReactElement {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opportunity':
        return 'text-slate-900';
      case 'issue':
        return 'text-rose-600';
      case 'trend':
        return 'text-indigo-600';
      case 'recommendation':
        return 'text-emerald-600';
      case 'competitive':
        return 'text-orange-600';
      case 'market':
        return 'text-blue-600';
      case 'ai':
        return 'text-purple-600';
      case 'social':
        return 'text-cyan-600';
      default:
        return 'text-slate-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-rose-600 text-white border-0">Critical</Badge>;
      case 'high':
        return <Badge className="bg-slate-900 text-white border-0">High</Badge>;
      case 'medium':
        return <Badge className="bg-slate-200 text-slate-900 border-0">Medium</Badge>;
      case 'low':
        return <Badge className="bg-slate-100 text-slate-500 border-0">Low</Badge>;
      default:
        return null;
    }
  };

  const Icon = getCategoryIcon(insight.category);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={insight.title}
      className="h-full focus:outline-none focus:ring-2 focus:ring-black/20 rounded-lg"
      onClick={() => onSelect(insight)}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(insight);
        }
      }}
    >
      <Card className="h-full border border-slate-200 hover:border-slate-300 transition-colors shadow-sm">
        <CardContent className={`${dense ? 'p-4 md:p-5' : 'p-6'} h-full`}> 
          <div className="h-full flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center ${getCategoryColor(insight.category)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`flex flex-wrap items-center gap-2 ${dense ? 'mb-1' : 'mb-2'}`}>
                  <h3 className={`font-semibold text-slate-900 ${dense ? 'text-sm' : 'text-base'} leading-snug`}>{insight.title}</h3>
                  {getPriorityBadge(insight.priority)}
                  {insight.relevance && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0">
                      {insight.relevance}% relevance
                    </Badge>
                  )}
                </div>
                {!dense && (
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed line-clamp-3">{insight.description}</p>
                )}
                {Array.isArray(insight.tags) && insight.tags.length > 0 && (
                  <div className={`flex flex-wrap gap-1 ${dense ? 'mb-2' : 'mb-3'}`}>
                    {insight.tags.slice(0, dense ? 2 : 3).map((tag, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{tag}</span>
                    ))}
                  </div>
                )}
                <div className={`flex flex-wrap ${dense ? 'gap-3' : 'gap-5'} text-xs text-slate-600`}
                >
                  <span className="inline-flex items-center gap-1 font-medium"><BarChart3 className="w-4 h-4 text-slate-400" />{insight.impact}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400" />{insight.timeframe}</span>
                  {insight.metrics?.potential && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                      <TrendingUp className="w-4 h-4" />{insight.metrics.potential}
                    </span>
                  )}
                </div>

                {insight.evidence && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {insight.evidence.type === 'contentVelocity' && 'Competitor velocity'}
                      {insight.evidence.type === 'aiVisibility' && 'AI visibility share'}
                      {insight.evidence.type === 'socialShare' && 'Social share of voice'}
                      {insight.evidence.type === 'market' && 'Market signals'}
                      {insight.evidence.type === 'technical' && 'Technical signal'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      {Object.entries(insight.evidence.stats).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-semibold text-slate-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-auto flex justify-end">
              <Button
                title={insight.action}
                aria-label={`Take action: ${insight.action}`}
                className={`border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors rounded-full ${dense ? 'px-2 py-1' : 'text-xs px-4 py-2'}`}
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
                {dense ? (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <>
                    <span className="block max-w-[160px] md:max-w-[200px] lg:max-w-[220px] truncate font-semibold">Take Action</span>
                    <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


