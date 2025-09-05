import { InsightItem, InsightPriority, InsightCategory, InsightsHubData } from './types';

export function mapResearchFeedItemsToInsights(data: InsightsHubData): InsightItem[] {
  const items = data?.researchFeed?.items ?? [];

  return items.map((item: any): InsightItem => {
    const mappedCategory: InsightCategory =
      item?.type === 'trend' ? 'trend' : item?.type === 'competitor' ? 'issue' : 'opportunity';

    const mappedPriority: InsightPriority = (item?.priority ?? 'high') as InsightPriority;

    return {
      id: String(item?.id ?? cryptoRandomId()),
      category: mappedCategory,
      priority: mappedPriority,
      title: String(item?.title ?? 'Untitled insight'),
      description: String(item?.summary ?? ''),
      impact: String(item?.impact ?? 'High impact'),
      action: String(item?.action ?? 'View details'),
      metrics: item?.metrics
        ? {
            current: item.metrics.currentPosition ?? 0,
            potential: item.metrics.potentialTraffic ?? item.metrics.searchVolume ?? 0,
            change: 0,
          }
        : undefined,
      timeframe: String(item?.time ?? 'This week'),
      tags: Array.isArray(item?.tags) ? (item.tags as string[]) : undefined,
      relevance: typeof item?.relevance === 'number' ? item.relevance : undefined,
    };
  });
}

function cryptoRandomId(): string {
  // Fallback small unique id if source lacks id
  return 'insight-' + Math.random().toString(36).slice(2, 10);
}


