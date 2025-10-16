"use client";

import { Card, CardContent, Button } from '@/components/ui';
import { Sparkles } from 'lucide-react';

export default function InsightEmptyState() {
  return (
    <Card className="border border-dashed border-black/10 bg-black/5 shadow-none">
      <CardContent className="p-10 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black/70">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-black">No insights match your filters</h3>
          <p className="text-sm text-black/60 max-w-xl mx-auto">
            Adjust categories, priority, or search terms to surface new intelligence. You can also open the Creator experience to generate tailored insights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

