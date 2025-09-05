"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Lightbulb, AlertCircle, TrendingUp, Target, Brain, BarChart3, Clock, ArrowRight } from 'lucide-react';
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
      <Card className="h-full border border-black/10 hover:border-black/20 transition-colors">
        <CardContent className={`${dense ? 'p-4 md:p-5' : 'p-6'} h-full`}> 
          <div className="h-full flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-black/[0.02] rounded-lg flex items-center justify-center ${getCategoryColor(insight.category)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`flex items-start gap-2 ${dense ? 'mb-1' : 'mb-2'}`}>
                  <h3 className={`font-medium text-black ${dense ? 'text-sm' : ''} ${dense ? 'line-clamp-2' : 'line-clamp-2'}`}>{insight.title}</h3>
                  {getPriorityBadge(insight.priority)}
                </div>
                {!dense && (
                  <p className="text-sm text-black/60 mb-3 break-words">{insight.description}</p>
                )}
                {Array.isArray(insight.tags) && insight.tags.length > 0 && (
                  <div className={`flex flex-wrap gap-1 ${dense ? 'mb-2' : 'mb-3'}`}>
                    {insight.tags.slice(0, dense ? 2 : 3).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-black/60 border border-black/10">{tag}</span>
                    ))}
                  </div>
                )}
                <div className={`flex items-center ${dense ? 'gap-3' : 'gap-6'}`}>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-black/40" />
                    <span className="text-xs md:text-sm text-black/80">{dense ? insight.impact : `Impact: ${insight.impact}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-black/40" />
                    <span className="text-xs md:text-sm text-black/80">{insight.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto flex justify-end">
              <Button
                title={insight.action}
                aria-label={`Take action: ${insight.action}`}
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
                {dense ? (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <>
                    <span className="block max-w-[120px] md:max-w-[160px] lg:max-w-[180px] truncate">Take Action</span>
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


