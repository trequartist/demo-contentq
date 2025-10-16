import { InsightItem, InsightPriority, InsightCategory, InsightsHubData } from './types';

export function mapResearchFeedItemsToInsights(data: InsightsHubData): InsightItem[] {
  const items = data?.researchFeed?.items ?? [];

  return items.map((item: any): InsightItem => {
    const mappedCategory: InsightCategory = (() => {
      const type = item?.type;
      if (type === 'competitor') return 'competitive';
      if (type === 'market') return 'market';
      if (type === 'technical') return 'issue';
      if (type === 'ai') return 'ai';
      if (type === 'social') return 'social';
      if (type === 'trend') return 'trend';
      if (type === 'user') return 'opportunity';
      if (type === 'insight') return 'recommendation';
      return 'opportunity';
    })();

    const mappedPriority: InsightPriority = (item?.priority ?? 'high') as InsightPriority;

    const metrics = item?.metrics
      ? {
          current: item.metrics.currentPosition ?? item.metrics.chatGPT ?? 0,
          potential:
            item.metrics.potentialTraffic ??
            item.metrics.searchVolume ??
            item.metrics.claude ??
            item.metrics.perplexity ??
            0,
          change: 0,
        }
      : undefined;

    const competitorStats = item?.competitorData
      ? {
          type: 'contentVelocity' as const,
          stats: item.competitorData,
        }
      : item?.aiVisibility
      ? {
          type: 'aiVisibility' as const,
          stats: item.aiVisibility,
        }
      : item?.socialData
      ? {
          type: 'socialShare' as const,
          stats: item.socialData,
        }
      : item?.marketData
      ? {
          type: 'market' as const,
          stats: item.marketData,
        }
      : undefined;

    return {
      id: String(item?.id ?? cryptoRandomId()),
      category: mappedCategory,
      priority: mappedPriority,
      title: String(item?.title ?? 'Untitled insight'),
      description: String(item?.summary ?? ''),
      impact: String(item?.impact ?? 'High impact'),
      action: String(item?.action ?? 'View details'),
      metrics,
      timeframe: String(item?.time ?? 'This week'),
      tags: Array.isArray(item?.tags) ? (item.tags as string[]) : undefined,
      relevance: typeof item?.relevance === 'number' ? item.relevance : undefined,
      evidence: competitorStats,
    };
  });
}

function cryptoRandomId(): string {
  // Fallback small unique id if source lacks id
  return 'insight-' + Math.random().toString(36).slice(2, 10);
}


