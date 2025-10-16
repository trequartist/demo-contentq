"use client";

import { useMemo } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { InsightItem, InsightsHubData } from '@/lib/demo/insights/types';
import { Sparkles, ArrowRight, Lightbulb, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface InsightDetailPanelProps {
  data: InsightsHubData;
  selectedInsight: InsightItem | null;
  onSelect: (insight: InsightItem | null) => void;
  showAdditionalInsights: boolean;
}

const iconMap: Record<string, any> = {
  opportunity: Lightbulb,
  trend: TrendingUp,
  recommendation: Target,
  issue: AlertTriangle,
};

export default function InsightDetailPanel({
  data,
  selectedInsight,
  onSelect,
  showAdditionalInsights,
}: InsightDetailPanelProps) {
  const heroCTA = data?.hero?.cta || [];
  const opportunity = useMemo(() => data?.spotlight, [data]);

  if (!selectedInsight) {
    return (
      <div className="hidden xl:block xl:col-span-1">
        <div className="sticky top-4 space-y-4">
          {showAdditionalInsights && data?.knowledgeHub?.actionItems && (
            <Card className="border border-slate-200 shadow-sm bg-white">
              <CardContent className="p-5 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Priority Actions</p>
                  <p className="text-base font-semibold text-slate-900">High-velocity moves</p>
                </div>
                <div className="space-y-2">
                  {data.knowledgeHub.actionItems
                    .filter((item) => item.priority === 'critical' || item.priority === 'high')
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 p-3 bg-white">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={`${item.priority === 'critical' ? 'bg-rose-500' : 'bg-slate-900'} text-white border-0 text-[10px]`}>
                            {item.priority}
                          </Badge>
                          {item.effort && <span className="text-xs text-slate-400">{item.effort}</span>}
                        </div>
                        <p className="text-sm font-medium text-slate-900 mt-1">{item.title}</p>
                        {item.impact && <p className="text-xs text-slate-600 mt-1">Impact: {item.impact}</p>}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  const Icon = iconMap[selectedInsight.category] || Sparkles;

  return (
    <div className="hidden xl:block xl:col-span-1">
      <div className="sticky top-4">
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                  <Badge className="bg-slate-100 text-slate-600 border-slate-200 capitalize">{selectedInsight.category}</Badge>
                  <Badge className={`${selectedInsight.priority === 'critical' ? 'bg-rose-500' : 'bg-slate-900'} text-white border-0`}>
                    {selectedInsight.priority}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedInsight.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedInsight.description}</p>
              </div>
            </div>

            {selectedInsight.metrics && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Current</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">{selectedInsight.metrics.current}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-emerald-500">Potential</p>
                    <p className="text-lg font-semibold text-emerald-700 mt-1">{selectedInsight.metrics.potential}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Timeframe</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{selectedInsight.timeframe}</p>
                </div>
              </div>
            )}

            {Array.isArray(selectedInsight.tags) && selectedInsight.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedInsight.tags.slice(0, 5).map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Take Action</Button>
              <Button variant="ghost" size="sm" onClick={() => onSelect(null)}>Clear</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

