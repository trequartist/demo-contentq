"use client";

import React from 'react';
import { Button, Badge } from '@/components/ui';
import { X } from 'lucide-react';
import { InsightItem } from '@/lib/demo/insights/types';
import { useRouter } from 'next/navigation';

interface InsightModalProps {
  insight: InsightItem | null;
  onClose: () => void;
}

export default function InsightModal({ insight, onClose }: InsightModalProps): React.ReactElement | null {
  const router = useRouter();
  if (!insight) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-black/10">
          <div className="flex items-center justify-between">
            <div>
              <Badge
                className={`text-xs mb-2 ${
                  insight.priority === 'critical'
                    ? 'bg-black text-white'
                    : insight.priority === 'high'
                    ? 'bg-black/80 text-white'
                    : 'bg-black/20 text-black'
                }`}
              >
                {insight.priority}
              </Badge>
              <h2 className="text-lg font-medium text-black">{insight.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-black/50" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-black/70 mb-4">{insight.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-black/[0.02] rounded-lg">
              <p className="text-xs text-black/40 mb-1">Impact</p>
              <p className="text-sm font-medium text-black">{insight.impact}</p>
            </div>
            <div className="p-3 bg-black/[0.02] rounded-lg">
              <p className="text-xs text-black/40 mb-1">Timeframe</p>
              <p className="text-sm font-medium text-black">{insight.timeframe}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-black text-white hover:bg-black/90"
              onClick={() => {
                onClose();
                router.push('/demo/content-studio/create');
              }}
            >
              Take Action Now
            </Button>
            <Button
              variant="secondary"
              className="flex-1 bg-white text-black border border-black/20 hover:bg-black/5"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


