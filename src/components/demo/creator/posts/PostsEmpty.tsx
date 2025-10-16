"use client";

import { FileText, Sparkles, Zap, Target, Calendar, FolderOpen, RefreshCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { useMemo } from 'react';

interface PostsEmptyProps {
  onStart: () => void;
  onBrowseCalendar?: () => void;
  onBrowseDocuments?: () => void;
}

export function PostsEmpty({ onStart, onBrowseCalendar, onBrowseDocuments }: PostsEmptyProps) {
  const mode = useCreatorStore((state) => state.modes.posts);

  const copy = useMemo(() => {
    if (mode === 'optimize') {
      return {
        title: 'Ready to Elevate',
        description: 'Upgrade existing posts with optimization plans, new hooks, and SEO improvements.',
        cta: 'Improve Content',
        features: [
          { icon: RefreshCcw, label: 'Optimize', desc: 'Boost performance signals' },
          { icon: Sparkles, label: 'Polish', desc: 'Sharpen narrative and tone' },
          { icon: Target, label: 'Retarget', desc: 'Align with new goals' },
        ],
      };
    }

    return {
      title: 'Start Creating Content',
      description: 'Generate high-quality blog posts, articles, and social media content with AI assistance.',
      cta: 'Create Content',
      features: [
        { icon: Target, label: 'Strategic', desc: 'Audience-focused' },
        { icon: Zap, label: 'Fast', desc: 'Generate in minutes' },
        { icon: Sparkles, label: 'Polished', desc: 'Ready to publish' },
      ],
    };
  }, [mode]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100 opacity-20"></div>
        <div className="relative rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-8">
          <FileText className="h-16 w-16 text-blue-600" />
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-900">
        {copy.title}
      </h2>
      <p className="mb-8 max-w-md text-center text-gray-500">
        {copy.description}
      </p>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={onStart}
          variant="primary"
          className="rounded-xl bg-black px-8 py-4 text-base font-semibold hover:bg-gray-800"
        >
          {(mode === 'optimize' ? <RefreshCcw className="mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />)}
          {copy.cta}
        </Button>

        <div className="flex items-center gap-3">
          {onBrowseCalendar && (
            <Button
              onClick={onBrowseCalendar}
              variant="secondary"
              className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold hover:border-gray-300"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Browse Calendar
            </Button>
          )}

          {onBrowseDocuments && (
            <Button
              onClick={onBrowseDocuments}
              variant="secondary"
              className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold hover:border-gray-300"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Browse Documents
            </Button>
          )}
        </div>
      </div>

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

