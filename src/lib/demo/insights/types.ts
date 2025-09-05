export type InsightCategory = 'opportunity' | 'issue' | 'trend' | 'recommendation';

export type InsightPriority = 'critical' | 'high' | 'medium' | 'low';

export interface InsightMetrics {
  current: number | string | null;
  potential: number | string | null;
  change?: number;
}

export interface InsightItem {
  id: string;
  category: InsightCategory;
  priority: InsightPriority;
  title: string;
  description: string;
  impact: string;
  action: string;
  metrics?: InsightMetrics;
  timeframe: string;
  tags?: string[];
  relevance?: number;
}

// Minimal JSON data shape we consume from insights-hub.json
export interface InsightsHubData {
  hero?: {
    title?: string;
    subtitle?: string;
    highlights?: Array<{ label: string; value: string | number }>;
    cta?: Array<{ label: string; href: string }>;
  };
  kpis?: Array<{ id: string; label: string; value: string | number; delta?: string }>;
  spotlight?: {
    headline: string;
    description: string;
    actions: Array<{ label: string; href: string }>;
  };
  timeline?: {
    quarters: Array<{
      title: string;
      items: Array<{ title: string; impact?: string; status?: string; link?: string }>;
    }>;
  };
  strategicAlerts?: Array<{
    id: string;
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    estimatedImpact?: string;
    timeframe?: string;
  }>;
  knowledgeHub?: {
    actionItems?: Array<{
      id: string;
      title: string;
      priority: InsightPriority;
      effort?: string;
      impact?: string;
      status?: string;
    }>;
    recentWins?: Array<{ id: string; title: string; metric?: string }>;
  };
  marketIntelligence?: {
    trends: Array<{ trend: string; growth?: string }>;
  };
  researchFeed?: {
    items: Array<any>;
  };
}


