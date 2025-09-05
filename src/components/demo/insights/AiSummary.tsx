"use client";

import React from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AiSummary(): React.ReactElement {
  const router = useRouter();
  return (
    <div className="mt-8 p-6 bg-black/[0.02] rounded-lg border border-black/10">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-black mb-2">AI Analysis Summary</h3>
          <p className="text-sm text-black/60 mb-3">
            Your content strategy shows strong AI visibility but misses critical high-intent traffic. Prioritize
            migration content and capture "Zapier too expensive" demand to unlock significant growth.
          </p>
          <div className="flex items-center gap-4">
            <Button
              className="bg-black text-white hover:bg-black/90 border-0"
              onClick={() => router.push('/demo/playbook')}
            >
              View Full Strategy
            </Button>
            <Button
              variant="secondary"
              className="bg-black text-black border border-black/20 hover:bg-black/5"
              onClick={() => router.push('/demo/diagnostics')}
            >
              Run Diagnostics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


