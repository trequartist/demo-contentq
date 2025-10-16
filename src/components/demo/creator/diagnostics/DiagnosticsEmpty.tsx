"use client";

import { Activity, AlertCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { useMemo } from 'react';

interface DiagnosticsEmptyProps {
  onStart: () => void;
}

export function DiagnosticsEmpty({ onStart }: DiagnosticsEmptyProps) {
  const mode = useCreatorStore((state) => state.modes.diagnostics);

  const copy = useMemo(() => {
    if (mode === 'insights') {
      return {
        title: 'Insights Awaiting Discovery',
        description: 'Reveal narrative-ready insights and storylines grounded in your diagnostics data.',
        cta: 'Reveal Insights',
        highlights: [
          { icon: Sparkles, label: 'Narrative Ready', desc: 'Instant storytelling angles' },
          { icon: Activity, label: 'Signals & Patterns', desc: 'Trend analysis surfaced automatically' },
          { icon: AlertCircle, label: 'Action Triggers', desc: 'Next moves distilled for teams' },
        ],
      };
    }

    return {
      title: 'No Diagnostics Yet',
      description: 'Get comprehensive insights into your system\'s health, performance, and visibility metrics.',
      cta: 'Create Diagnostics',
      highlights: [
        { icon: Activity, label: 'System Health', desc: 'Real-time monitoring' },
        { icon: AlertCircle, label: 'Issues', desc: 'Detect problems early' },
        { icon: Sparkles, label: 'AI Insights', desc: 'Actionable recommendations' },
      ],
    };
  }, [mode]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100 opacity-20"></div>
        <div className="relative rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-8">
          <Activity className="h-16 w-16 text-blue-600" />
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-900">
        {copy.title}
      </h2>
      <p className="mb-8 max-w-md text-center text-gray-500">
        {copy.description}
      </p>

      <Button
        onClick={onStart}
        variant="primary"
        className="rounded-xl bg-black px-8 py-4 text-base font-semibold hover:bg-gray-800"
      >
        <Activity className="mr-2 h-5 w-5" />
        {copy.cta}
      </Button>

      <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
        {copy.highlights.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
              <feature.icon className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{feature.label}</p>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

