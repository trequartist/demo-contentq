"use client";

import { useMemo, useState } from 'react';
import ExecutiveSummary from '@/components/demo/diagnostics/ExecutiveSummary';
import AIDiscoverability from '@/components/demo/diagnostics/AIDiscoverability';
import SearchIntelligence from '@/components/demo/diagnostics/SearchIntelligence';
import CompetitiveIntelligence from '@/components/demo/diagnostics/CompetitiveIntelligence';
import MarketIntelligence from '@/components/demo/diagnostics/MarketIntelligence';
import DataTransparency from '@/components/demo/diagnostics/DataTransparency';
import ActionableIntelligence from '@/components/demo/diagnostics/ActionableIntelligence';
import StrategicLeverage from '@/components/demo/diagnostics/StrategicLeverage';
import InsightsFeed from '@/components/demo/insights/InsightsFeed';
import InsightTrendCards from '@/components/demo/insights/InsightTrendCards';
import InsightSummaryPanel from '@/components/demo/insights/InsightSummaryPanel';
import InsightDetailPanel from '@/components/demo/insights/InsightDetailPanel';
import { mapResearchFeedItemsToInsights } from '@/lib/demo/insights/map-json';
import { InsightItem } from '@/lib/demo/insights/types';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';
import { BarChart3, Brain, Search, Trophy, TrendingUp, Database, Target, Zap, ArrowRight, ArrowUpRight } from 'lucide-react';

interface DiagnosticsOutputProps {
  data: any;
  variant?: 'default' | 'insights';
}

type DiagnosticsSection = 
  | 'executive'
  | 'ai-discoverability'
  | 'search'
  | 'competitive'
  | 'market'
  | 'data'
  | 'actionable'
  | 'strategic';

const sections = [
  { id: 'executive', label: 'Executive Summary', icon: BarChart3 },
  { id: 'ai-discoverability', label: 'AI Discoverability', icon: Brain },
  { id: 'search', label: 'Search Intelligence', icon: Search },
  { id: 'competitive', label: 'Competitive', icon: Trophy },
  { id: 'market', label: 'Market Intelligence', icon: TrendingUp },
  { id: 'data', label: 'Data Transparency', icon: Database },
  { id: 'actionable', label: 'Actionable Intel', icon: Target },
  { id: 'strategic', label: 'Strategic Leverage', icon: Zap },
] as const;

export function DiagnosticsOutput({ data, variant = 'default' }: DiagnosticsOutputProps) {
  const [activeSection, setActiveSection] = useState<DiagnosticsSection>('executive');
  const [showAdditionalInsights, setShowAdditionalInsights] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(null);

  const diagnosticsPayload = data?.diagnostics ?? data;

  // Only load insights data when in insights mode
  const insightsData = useMemo(() => {
    if (variant !== 'insights') return null;
    return data?.insightsData ?? insightsHubData;
  }, [variant, data]);

  const insights = useMemo(() => {
    if (!insightsData) return [];
    return mapResearchFeedItemsToInsights(insightsData as any);
  }, [insightsData]);

  const kpis = insightsData ? ((insightsData as any)?.kpis ?? []) : [];
  const aiVisibilityKpi = kpis.find((k: any) => k.id === 'kpi-visibility');
  const contentVelocityKpi = kpis.find((k: any) => k.id === 'kpi-velocity');

  const aiVisibilityInsight = insights.find((insight) => insight.evidence?.type === 'aiVisibility');
  const aiVisibilityStats = (aiVisibilityInsight?.evidence?.stats ?? {}) as Record<string, number | string>;

  const competitorInsight = insights.find((insight) => insight.evidence?.type === 'contentVelocity');
  const competitorStats = (competitorInsight?.evidence?.stats ?? {}) as Record<string, number | string>;
  const aiShare = insightsData ? ((insightsData as any)?.analytics?.aiShare ?? {}) : {};

  const competitorMoves = insightsData ? ((insightsData as any)?.marketIntelligence?.competitorMoves ?? []) : [];
  const userSignals = insightsData ? ((insightsData as any)?.marketIntelligence?.userSignals ?? []) : [];

  const renderSection = () => {
    switch (activeSection) {
      case 'executive':
        return <ExecutiveSummary data={diagnosticsPayload} />;
      case 'ai-discoverability':
        return <AIDiscoverability data={diagnosticsPayload} />;
      case 'search':
        return <SearchIntelligence data={diagnosticsPayload} />;
      case 'competitive':
        return <CompetitiveIntelligence data={diagnosticsPayload} />;
      case 'market':
        return <MarketIntelligence data={diagnosticsPayload} />;
      case 'data':
        return <DataTransparency data={diagnosticsPayload} />;
      case 'actionable':
        return <ActionableIntelligence data={diagnosticsPayload} />;
      case 'strategic':
        return <StrategicLeverage data={diagnosticsPayload} />;
      default:
        return <ExecutiveSummary data={diagnosticsPayload} />;
    }
  };

  if (variant === 'insights') {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="px-6 py-6 xl:px-10 xl:py-8 mx-auto w-full max-w-7xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Intelligence Dashboard</p>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">Diagnostics Insights</h1>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
                Action-ready narratives connecting AI visibility, competitive positioning, and market signals from your latest diagnostic baseline.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  checked={showAdditionalInsights}
                  onChange={() => setShowAdditionalInsights((prev) => !prev)}
                />
                Show market trends
              </label>
              {!!selectedInsight && (
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Clear selection
                </button>
              )}
            </div>
          </div>

          <InsightTrendCards
            data={insightsData as any}
            showAdditionalInsights={showAdditionalInsights}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 px-6 py-5 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Intelligence Signals</h2>
                      <p className="text-sm text-slate-500 mt-1">Prioritized insights with evidence and recommended actions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Live feed</p>
                      <p className="text-sm font-semibold text-slate-900">{insights.length} signals</p>
                    </div>
                  </div>
                </div>
                <div className="max-h-[520px] overflow-auto">
                  <InsightsFeed insights={insights} dense={false} onSelect={setSelectedInsight} />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">AI Visibility Live</p>
                      <div className="flex items-baseline gap-3 mt-2">
                        <p className="text-4xl font-bold text-slate-900">{aiVisibilityKpi?.value ?? '78.5%'}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                          <ArrowUpRight className="w-3 h-3" />
                          {aiVisibilityKpi?.delta ?? '+12.3%'}
                        </span>
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
                      
                      <line x1="0" y1="20" x2="200" y2="20" stroke="#E2E8F0" strokeWidth="0.5" />
                      <line x1="0" y1="40" x2="200" y2="40" stroke="#E2E8F0" strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="200" y2="60" stroke="#E2E8F0" strokeWidth="0.5" />
                      
                      <path d="M0,60 L40,52 L80,48 L120,40 L160,30 L200,20 L200,80 L0,80 Z" fill="url(#aiVisGradient)" />
                      <path d="M0,60 L40,52 L80,48 L120,40 L160,30 L200,20" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      
                      {[
                        { x: 0, y: 60 }, { x: 40, y: 52 }, { x: 80, y: 48 },
                        { x: 120, y: 40 }, { x: 160, y: 30 }, { x: 200, y: 20 },
                      ].map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="3" fill="#6366F1" />
                      ))}
                    </svg>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(aiShare)
                      .sort(([, a], [, b]) => Number(b) - Number(a))
                      .slice(0, 4)
                      .map(([platform, value]) => (
                        <div key={platform} className="text-center">
                          <p className="text-xs text-slate-400 capitalize">{platform}</p>
                          <p className="text-sm font-semibold text-slate-900">{String(value)}%</p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Content Velocity Benchmark</p>
                    <p className="text-sm text-slate-500 mt-1">Posts per month vs competitors</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Zapier', value: Number(competitorStats?.zapier ?? 32), color: 'bg-rose-500' },
                      { name: 'Make', value: Number(competitorStats?.make ?? 18), color: 'bg-orange-500' },
                      { name: 'n8n', value: Number(competitorStats?.n8n ?? 10), color: 'bg-amber-500' },
                      { name: 'Gumloop', value: Number(competitorStats?.gumloop ?? 3), color: 'bg-indigo-500' },
                    ].map((item) => {
                      const maxValue = 40;
                      const width = `${(item.value / maxValue) * 100}%`;
                      return (
                        <div key={item.name}>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium text-slate-600">{item.name}</p>
                            <p className="text-sm font-bold text-slate-900">{item.value}/mo</p>
                          </div>
                          <div className="relative h-2 rounded-full bg-slate-100 overflow-hidden">
                            <span className={`absolute inset-y-0 left-0 ${item.color}`} style={{ width }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Our target</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">15 posts/month</p>
                    <p className="text-xs text-slate-500 mt-1">{contentVelocityKpi?.delta ?? '+5x increase'} needed for competitive parity</p>
                  </div>
                </div>
              </div>
            </div>

            <InsightDetailPanel
              data={insightsData as any}
              selectedInsight={selectedInsight}
              onSelect={setSelectedInsight}
              showAdditionalInsights={showAdditionalInsights}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Market Voice Signals</p>
                <p className="text-sm text-slate-500 mt-1">User sentiment and demand trends</p>
              </div>
              <div className="space-y-3">
                {userSignals.slice(0, 3).map((signal: any, idx: number) => {
                  const volumeMatch = signal.volume?.match(/[+-]?\d+/);
                  const volumeNumber = volumeMatch ? Math.abs(parseInt(volumeMatch[0])) : 50 + idx * 30;
                  const isPositive = signal.volume?.includes('+') ?? true;
                  
                  return (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-900">{signal.signal}</p>
                        <span className={`text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {signal.volume}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{signal.opportunity ?? signal.source}</p>
                      <div className="relative h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <span 
                          className={isPositive ? 'bg-emerald-500' : 'bg-rose-500'} 
                          style={{ 
                            position: 'absolute',
                            insetBlock: 0,
                            left: 0,
                            width: `${Math.min(volumeNumber, 100)}%` 
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <InsightSummaryPanel data={insightsData as any} />

              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">AI Guidance</p>
                    <h3 className="text-lg font-semibold text-slate-900">Recommended next moves</h3>
                  </div>
                  <span className="text-xs text-slate-400">Curated by Creator AI</span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: 'Increase mention share across AI assistants',
                      description: 'Ship a citation-rich explainer and structured data targeting automation searches.',
                      action: 'Launch assistant briefing',
                    },
                    {
                      title: 'Accelerate migration story cadence',
                      description: 'Spin up persona-specific migration narratives for ops, finance, and support teams.',
                      action: 'Generate migration stories',
                    },
                    {
                      title: 'Close schema coverage gap fast',
                      description: 'Run the structured data playbook to deploy Article and FAQ markup automatically.',
                      action: 'Deploy schema workflow',
                    },
                    {
                      title: 'Activate Reddit switcher pipeline',
                      description: 'Seed value-driven comparisons in r/automation with proof points and CTAs.',
                      action: 'Create community plan',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                      <button
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-slate-700"
                        onClick={() => {
                          window.location.assign(`/demo/creator?tab=playbook`);
                        }}
                      >
                        {item.action}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Copilot Prompt</p>
                  <p className="text-sm text-slate-600 mt-1">
                    “Using today’s diagnostics, draft a week-by-week plan to push AI visibility above 85%, resolve schema gaps,
                    and hit our 15 posts/month cadence. Include owner, impact, and fastest next step.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F7F7F8]">
      <div className="flex-shrink-0 sticky top-0 z-20 bg-[#F7F7F8]/95 backdrop-blur border-b border-white/40">
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as DiagnosticsSection)}
                  className={`group flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-[0_14px_28px_-20px_rgba(0,0,0,0.75)]'
                      : 'bg-white text-gray-600 border border-white/60 shadow-sm hover:text-black hover:border-gray-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-black'}`} />
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
