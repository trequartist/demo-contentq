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
import { InsightsDashboard } from '@/components/demo/creator/insights/InsightsDashboard';
import insightsHubData from '@/usableclientdata/data/insights/insights-hub.json';
import { BarChart3, Brain, Search, Trophy, TrendingUp, Database, Target, Zap } from 'lucide-react';

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

  const diagnosticsPayload = data?.diagnostics ?? data;

  // Only load insights data when in insights mode
  const insightsData = useMemo(() => {
    if (variant !== 'insights') return null;
    return data?.insightsData ?? insightsHubData;
  }, [variant, data]);

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
    return <InsightsDashboard data={insightsData} />;
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