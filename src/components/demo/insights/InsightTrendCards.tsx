"use client";

import { Card, CardContent, Badge } from '@/components/ui';
import {
  Sparkles,
  Target,
  TrendingUp,
  Activity,
  Globe,
  Zap,
  BookOpen,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
} from 'lucide-react';

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const parseNumeric = (input: any) => {
  if (input === null || input === undefined) return 0;
  const parsed = parseFloat(String(input).replace(/[^0-9.-]/g, ''));
  return Number.isNaN(parsed) ? 0 : parsed;
};

function MetricTile({
  label,
  value,
  deltaLabel,
  deltaDirection,
  completion,
  icon: Icon,
  caption,
}: {
  label: string;
  value: string;
  deltaLabel: string;
  deltaDirection: 'up' | 'down' | 'flat';
  completion: number;
  icon: React.ComponentType<{ className?: string }>;
  caption: string;
}) {
  const progressWidth = `${clamp01(completion) * 100}%`;
  const isFlat = deltaDirection === 'flat';
  const isUp = deltaDirection === 'up';
  const TrendArrow = isFlat ? Gauge : isUp ? ArrowUpRight : ArrowDownRight;
  const tone = isFlat ? 'text-slate-400' : isUp ? 'text-emerald-600' : 'text-rose-500';
  const barTone = isFlat ? 'bg-slate-300' : isUp ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
          <span className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <Icon className="w-5 h-5" />
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <TrendArrow className={`w-4 h-4 ${tone}`} />
          <span className="font-medium text-slate-600">{deltaLabel}</span>
        </div>
        <div>
          <div className="relative h-2 rounded-full bg-slate-100 overflow-hidden">
            <span className={`absolute inset-y-0 left-0 ${barTone}`} style={{ width: progressWidth }} />
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-snug">{caption}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface InsightTrendCardsProps {
  data: any;
  showAdditionalInsights: boolean;
}

export default function InsightTrendCards({ data, showAdditionalInsights }: InsightTrendCardsProps) {
  const highlights = data?.hero?.highlights || [];
  const timeline = data?.timeline?.quarters || [];
  const strategicAlerts = data?.strategicAlerts || [];
  const kpis = data?.kpis || [];
  const competitorMoves = data?.marketIntelligence?.competitorMoves || [];
  const trends = data?.marketIntelligence?.trends || [];

  const aiKpi = kpis.find((k: any) => k.id === 'kpi-visibility');
  const issuesKpi = kpis.find((k: any) => k.id === 'kpi-issues');
  const opportunitiesKpi = kpis.find((k: any) => k.id === 'kpi-opportunities');
  const velocityKpi = kpis.find((k: any) => k.id === 'kpi-velocity');

  const nowBucket = timeline?.[0];
  const nextBucket = timeline?.[1];

  const metricTiles: Array<{
    label: string;
    value: string;
    deltaLabel: string;
    deltaDirection: 'up' | 'down' | 'flat';
    completion: number;
    icon: React.ComponentType<{ className?: string }>;
    caption: string;
  }> = [
    {
      label: highlights?.[0]?.label ?? 'Total Insights',
      value: String(highlights?.[0]?.value ?? 147),
      deltaLabel: `${aiKpi?.delta ?? '+12.3%'} uplift`,
      deltaDirection: (parseNumeric(aiKpi?.delta ?? '0') > 0 ? 'up' : parseNumeric(aiKpi?.delta ?? '0') < 0 ? 'down' : 'flat') as 'up' | 'down' | 'flat',
      completion: clamp01(parseNumeric(highlights?.[0]?.value ?? 147) / 200),
      icon: Sparkles,
      caption: 'Signals generated compared to the 200-insight target.',
    },
    {
      label: highlights?.[1]?.label ?? 'Critical Actions',
      value: String(highlights?.[1]?.value ?? issuesKpi?.value ?? 7),
      deltaLabel: `${issuesKpi?.delta ?? '-2'} vs previous period`,
      deltaDirection: (parseNumeric(issuesKpi?.delta ?? '0') > 0 ? 'up' : parseNumeric(issuesKpi?.delta ?? '0') < 0 ? 'down' : 'flat') as 'up' | 'down' | 'flat',
      completion: clamp01(parseNumeric(issuesKpi?.value ?? 7) / 12),
      icon: Target,
      caption: 'High-urgency recommendations surfaced by diagnostics.',
    },
    {
      label: highlights?.[2]?.label ?? 'Win Rate',
      value: String(highlights?.[2]?.value ?? '+8.2%'),
      deltaLabel: 'Momentum vs last period',
      deltaDirection: (parseNumeric(highlights?.[2]?.value ?? '0') > 0 ? 'up' : parseNumeric(highlights?.[2]?.value ?? '0') < 0 ? 'down' : 'flat') as 'up' | 'down' | 'flat',
      completion: clamp01(parseNumeric(highlights?.[2]?.value ?? 8.2) / 15),
      icon: TrendingUp,
      caption: 'Conversion change attributed to executed plays.',
    },
  ];

  const opportunityCount = parseNumeric(opportunitiesKpi?.value ?? 34);
  const opportunityDelta = parseNumeric(opportunitiesKpi?.delta ?? 6);
  const criticalCount = parseNumeric(issuesKpi?.value ?? 7);
  const criticalDelta = parseNumeric(issuesKpi?.delta ?? -2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {metricTiles.map((tile, index) => (
          <MetricTile key={index} {...tile} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">AI Visibility Index</p>
                <div className="flex items-baseline gap-3 mt-2">
                  <p className="text-4xl font-bold text-slate-900">{aiKpi?.value ?? '78.5%'}</p>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {aiKpi?.delta ?? '+12.3%'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Share of voice across AI assistants</p>
              </div>
            </div>

            <div className="relative h-32">
              <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="aiVisGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="#E2E8F0" strokeWidth="0.5" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#E2E8F0" strokeWidth="0.5" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="#E2E8F0" strokeWidth="0.5" />
                
                {/* Trend line and area */}
                <path
                  d="M0,60 L40,52 L80,48 L120,40 L160,30 L200,20"
                  fill="url(#aiVisGradient)"
                  stroke="none"
                />
                <path
                  d="M0,60 L40,52 L80,48 L120,40 L160,30 L200,20 L200,80 L0,80 Z"
                  fill="url(#aiVisGradient)"
                />
                <path
                  d="M0,60 L40,52 L80,48 L120,40 L160,30 L200,20"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {[
                  { x: 0, y: 60 },
                  { x: 40, y: 52 },
                  { x: 80, y: 48 },
                  { x: 120, y: 40 },
                  { x: 160, y: 30 },
                  { x: 200, y: 20 },
                ].map((point, i) => (
                  <circle key={i} cx={point.x} cy={point.y} r="3" fill="#6366F1" />
                ))}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-slate-400">2 mo ago</p>
                <p className="font-semibold text-slate-900">64%</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400">1 mo ago</p>
                <p className="font-semibold text-slate-900">72%</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400">Now</p>
                <p className="font-semibold text-indigo-600">78.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Now</p>
                <p className="text-lg font-semibold text-slate-900">{nowBucket?.title ?? 'Immediate focus'}</p>
              </div>
            </div>
            <div className="space-y-3">
              {nowBucket?.items?.slice(0, 2).map((item: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <Badge className="bg-slate-900 text-white border-0 text-[10px]">{item.status ?? 'urgent'}</Badge>
                  </div>
                  {item.impact && <p className="text-xs text-slate-500 mt-1">Impact: {item.impact}</p>}
                </div>
              ))}
            </div>
            {nextBucket && (
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Next</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{nextBucket.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {nextBucket.items?.[0]?.title ?? 'Prioritize upcoming plays to stay ahead'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Strategic Alerts</p>
                <p className="text-lg font-semibold text-slate-900">Critical Signals</p>
              </div>
            </div>
            <div className="space-y-3">
              {strategicAlerts.slice(0, 3).map((alert: any) => (
                <div key={alert.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wide text-slate-400">{alert.type}</span>
                    <Badge className="bg-rose-500 text-white border-0 text-[10px]">{alert.severity}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mt-2">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{alert.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showAdditionalInsights && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2 border border-emerald-100 bg-emerald-50/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-500">Market Trends</p>
                  <p className="text-lg font-semibold text-emerald-900">Signals worth acting on</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {trends.slice(0, 6).map((trend: any, idx: number) => (
                  <div key={idx} className="rounded-xl bg-white border border-emerald-100 p-4 h-full flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      <p className="text-sm font-semibold text-emerald-900">{trend.trend}</p>
                    </div>
                    {trend.growth && <p className="text-xs text-emerald-600">Growth: {trend.growth}</p>}
                    {trend.opportunity && <p className="text-xs text-emerald-600">Opportunity: {trend.opportunity}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Competitor watch</p>
                  <p className="text-lg font-semibold text-slate-900">Latest moves</p>
                </div>
              </div>
              <div className="space-y-2">
                {competitorMoves.slice(0, 3).map((move: any, idx: number) => (
                  <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{move.competitor}</p>
                    <p className="text-sm text-slate-800 mt-1">{move.move}</p>
                    <p className="text-xs text-slate-500 mt-1">Weakness: {move.weakness}</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Counter: {move.counter}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

