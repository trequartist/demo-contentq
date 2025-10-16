"use client";

import { Card, CardContent, Button, Badge } from '@/components/ui';
import { BookOpen, Target, ArrowRight, Activity, Gauge, Sparkles } from 'lucide-react';
import { InsightsHubData } from '@/lib/demo/insights/types';

interface InsightSummaryPanelProps {
  data: InsightsHubData;
}

export default function InsightSummaryPanel({ data }: InsightSummaryPanelProps) {
  const recentWins = data?.knowledgeHub?.recentWins || [];
  const actionItems = data?.knowledgeHub?.actionItems || [];
  const stats = data?.knowledgeHub?.stats;

  return (
    <Card className="border border-slate-200 shadow-sm bg-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Summary</p>
            <h3 className="text-lg font-semibold text-slate-900">What the data is saying</h3>
            <p className="text-sm text-slate-600">Each insight is grounded in the latest diagnostics run. Explore wins, gaps, and recommended actions without switching tools.</p>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Total insights</p>
              <p className="text-2xl font-semibold text-slate-900">{stats.totalInsights}</p>
              <div className="relative h-1 rounded-full bg-slate-200 overflow-hidden">
                <span className="absolute inset-y-0 left-0 bg-slate-600" style={{ width: '74%' }} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Critical actions</p>
              <p className="text-2xl font-semibold text-rose-600">{stats.criticalActions}</p>
              <p className="text-[11px] text-slate-500">{stats.completedActions} of {stats.criticalActions} completed</p>
              <div className="relative h-1 rounded-full bg-slate-200 overflow-hidden">
                <span className="absolute inset-y-0 left-0 bg-rose-500" style={{ width: `${(stats.completedActions / stats.criticalActions) * 100}%` }} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Health score</p>
              <p className="text-2xl font-semibold text-emerald-600">{stats.healthScore}</p>
              <p className="text-[11px] text-emerald-500">↑ {stats.improvementRate}</p>
              <div className="relative h-1 rounded-full bg-slate-200 overflow-hidden">
                <span className="absolute inset-y-0 left-0 bg-emerald-500" style={{ width: `${stats.healthScore}%` }} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Weekly growth</p>
              <p className="text-2xl font-semibold text-slate-900">{stats.weeklyGrowth}</p>
              <p className="text-[11px] text-slate-500">New insights added</p>
              <div className="relative h-1 rounded-full bg-slate-200 overflow-hidden">
                <span className="absolute inset-y-0 left-0 bg-indigo-500" style={{ width: '46%' }} />
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-3">
          {recentWins.slice(0, 2).map((win) => (
            <div key={win.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                <Badge className="bg-slate-900 text-white border-0">Win</Badge>
                {win.metric && <span>{win.metric}</span>}
              </div>
              <p className="text-sm font-medium text-slate-900 mt-1">{win.title}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {actionItems.slice(0, 2).map((action) => (
            <div key={action.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                <Target className="w-3 h-3" />
                <span>{action.priority} priority</span>
              </div>
              <p className="text-sm font-medium text-slate-900">{action.title}</p>
              {action.impact && <p className="text-xs text-slate-500">Impact: {action.impact}</p>}
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <Activity className="w-4 h-4" />
              <span>Execution focus</span>
            </div>
            <p className="text-sm text-slate-600">Move the top plays into structured workflows and get cross-team visibility.</p>
            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" onClick={() => window.location.assign('/demo/creator?tab=playbook')}>
              Send to Playbook
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <Sparkles className="w-4 h-4" />
              <span>Storytelling</span>
            </div>
            <p className="text-sm text-slate-600">Turn the strongest signals into briefs or campaign material directly in Posts.</p>
            <Button variant="secondary" className="w-full" onClick={() => window.location.assign('/demo/creator?tab=posts')}>
              Open Content Studio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

