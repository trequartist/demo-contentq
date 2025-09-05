"use client";

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { InsightsHubData } from '@/lib/demo/insights/types';

interface InsightsHeaderProps {
  data: InsightsHubData;
}

export default function InsightsHeader({ data }: InsightsHeaderProps): React.ReactElement {
  const router = useRouter();
  return (
    <div className="border-b border-black/10">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-black text-white rounded">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs">AI Insights</span>
            </div>
            <h1 className="text-3xl font-light text-black mt-3">
              {data?.hero?.title ?? 'Insights Hub'}
            </h1>
            <p className="text-sm text-black/60 mt-2 max-w-2xl">
              {data?.hero?.subtitle ?? 'AI-powered recommendations to grow your content performance'}
            </p>
            {data?.hero?.highlights && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.hero.highlights.map((h, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-black/10">
                    <p className="text-[11px] text-black/50">{h.label}</p>
                    <p className="text-lg font-light text-black mt-0.5">{h.value as any}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {(data?.hero?.cta ?? []).map((c, idx) => (
              <Button
                key={idx}
                className={`${idx === 0 ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black border border-black/20 hover:bg-black/5'}`}
                onClick={() => router.push(c.href)}
              >
                {c.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ))}
          </div>
        </div>

        {data?.kpis && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {data.kpis.map(k => (
              <div key={k.id} className="p-4 rounded-lg border border-black/10">
                <p className="text-[11px] text-black/50">{k.label}</p>
                <div className="flex items-end gap-2 mt-0.5">
                  <p className="text-xl font-light text-black">{k.value as any}</p>
                  {k.delta && <span className="text-[11px] text-black/60">{k.delta}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.spotlight && (
          <div className="mt-6">
            <Card className="border border-black/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-black">{data.spotlight.headline}</h2>
                    <p className="text-sm text-black/60 mt-1 max-w-3xl">{data.spotlight.description}</p>
                    <div className="mt-4 flex items-center gap-3">
                      {data.spotlight.actions.map((a, idx) => (
                        <Button
                          key={idx}
                          className={`${idx === 0 ? 'bg-black/90 text-white hover:bg-black/90' : 'bg-black/90 text-black border border-black/20 hover:bg-black/5'}`}
                          onClick={() => router.push(a.href)}
                        >
                          {a.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}


