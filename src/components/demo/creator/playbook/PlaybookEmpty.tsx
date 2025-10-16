"use client";

import { BookOpen, CheckCircle, Clock, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { useMemo } from 'react';

interface PlaybookEmptyProps {
  onStart: () => void;
}

export function PlaybookEmpty({ onStart }: PlaybookEmptyProps) {
  const mode = useCreatorStore((state) => state.modes.playbook);

  const copy = useMemo(() => {
    if (mode === 'calendar') {
      return {
        title: 'No Campaign Cadence Built',
        description: 'Design rhythmic, multi-channel calendars aligned to your launch journey.',
        cta: 'Create Campaign Cadence',
        features: [
          { icon: Clock, label: 'Weekly Flow', desc: 'Sequenced events and activations' },
          { icon: Target, label: 'Channel Mix', desc: 'Balanced coverage across channels' },
          { icon: CheckCircle, label: 'Aligned Moments', desc: 'Milestones anchored to your goals' },
        ],
      };
    }

    return {
      title: 'No Playbook Created',
      description: 'Generate strategic playbooks with step-by-step guidance for any scenario or challenge.',
      cta: 'Create Playbook',
      features: [
        { icon: Target, label: 'Strategic', desc: 'Clear objectives' },
        { icon: CheckCircle, label: 'Actionable', desc: 'Step-by-step guides' },
        { icon: Clock, label: 'Time-Boxed', desc: 'Realistic estimates' },
      ],
    };
  }, [mode]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100 opacity-20"></div>
        <div className="relative rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-8">
          <BookOpen className="h-16 w-16 text-blue-600" />
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
        <BookOpen className="mr-2 h-5 w-5" />
        {copy.cta}
      </Button>

      <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
        {copy.features.map((feature, index) => (
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

