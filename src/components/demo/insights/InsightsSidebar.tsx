"use client";

import React from 'react';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { Clock, AlertCircle, Target, Trophy, BarChart3 } from 'lucide-react';
import { InsightsHubData } from '@/lib/demo/insights/types';
import { useRouter } from 'next/navigation';

interface InsightsSidebarProps {
  data: InsightsHubData;
  showAdditionalInsights: boolean;
}

export default function InsightsSidebar({ data, showAdditionalInsights }: InsightsSidebarProps): JSX.Element {
  const router = useRouter();
  return (
    <div className="space-y-4 lg:sticky lg:top-4">
      {data?.timeline?.quarters && (
        <Card className="border border-black/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-black/60" />
              Roadmap
            </h3>
            <div className="space-y-3">
              {data.timeline.quarters.map((q, qIdx) => (
                <div key={qIdx} className="pb-3 border-b border-black/5 last:border-0">
                  <p className="text-xs font-medium text-black mb-2">{q.title}</p>
                  <div className="space-y-2">
                    {q.items.map((it, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-black">{it.title}</p>
                          {it.impact && <p className="text-xs text-black/60">{it.impact}</p>}
                          {it.link && (
                            <button className="text-xs text-black hover:underline mt-1" onClick={() => router.push(it.link!)}>
                              Open
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data?.strategicAlerts && (
        <Card className="border border-black/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-black/60" />
              Strategic Alerts
            </h3>
            <div className="space-y-3">
              {data.strategicAlerts.slice(0, 2).map(alert => (
                <div key={alert.id} className="pb-3 border-b border-black/5 last:border-0">
                  <Badge className={`text-xs mb-2 ${alert.severity === 'critical' ? 'bg-black text-white' : 'bg-black/10 text-black'}`}>
                    {alert.type}
                  </Badge>
                  <h4 className="text-xs font-medium text-black mb-1">{alert.title}</h4>
                  <p className="text-xs text-black/60 line-clamp-2">{alert.description}</p>
                  {alert.estimatedImpact && (
                    <p className="text-xs font-medium text-black mt-2">Impact: {alert.estimatedImpact}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data?.knowledgeHub?.actionItems && (
        <Card className="border border-black/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-black/60" />
              Priority Actions
            </h3>
            <div className="space-y-2">
              {data.knowledgeHub.actionItems
                .filter(item => item.priority === 'critical' || item.priority === 'high')
                .slice(0, 3)
                .map(action => (
                  <div key={action.id} className="flex items-start gap-2">
                    <div className="w-3 h-3 rounded-full bg-black/40 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-black">{action.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {action.effort && <span className="text-xs text-black/40">{action.effort}</span>}
                        {action.impact && <span className="text-xs text-black/60">{action.impact}</span>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Button className="w-full mt-3 bg-black text-white hover:bg-black/90" size="sm" onClick={() => router.push('/demo/playbook')}>
              View All Actions
            </Button>
          </CardContent>
        </Card>
      )}

      {data?.knowledgeHub?.recentWins && (
        <Card className="border border-black/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-black/60" />
              Recent Wins
            </h3>
            <div className="space-y-2">
              {data.knowledgeHub.recentWins.map(win => (
                <div key={win.id} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-black rounded-full mt-1.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-black">{win.title}</p>
                    {win.metric && <p className="text-xs text-black/60">{win.metric}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showAdditionalInsights && data?.marketIntelligence && (
        <Card className="border border-black/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-black mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-black/60" />
              Market Trends
            </h3>
            <div className="space-y-2">
              {data.marketIntelligence.trends.slice(0, 3).map((trend, idx) => (
                <div key={idx} className="pb-2 border-b border-black/5 last:border-0">
                  <p className="text-xs font-medium text-black">{trend.trend}</p>
                  {trend.growth && <p className="text-xs text-black/60">{trend.growth}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


