/**
 * Centralized data loader for client-specific demo data
 * Change client by modifying CLIENT_CONFIG
 */

// Client Configuration - Change this for different demos
const CLIENT_CONFIG = {
  name: 'gumloop',
  dataPath: '/data/clients/gumloop/'
};

// Data type definitions
export interface ClientData {
  company: {
    name: string;
    domain: string;
    industry: string;
    assets: Asset[];
  };
  diagnostics: DiagnosticReport[];
  playbook: PlaybookStrategy;
  contentWorkflows: WorkflowData[];
  analytics: AnalyticsData;
  calendar: CalendarData;
  insights: InsightsData;
}

export interface Asset {
  id: string;
  name: string;
  type: 'blog' | 'linkedin';
  status: 'active' | 'setup' | 'pending';
  url?: string;
  metrics?: any;
}

export interface DiagnosticReport {
  id: string;
  assetId: string;
  assetName: string;
  overallScore: number;
  executiveSummary: any;
  marketPosition: any;
  contentPerformance: any;
  technicalSeo: any;
  aiVisibility: any;
}

export interface PlaybookStrategy {
  id: string;
  title: string;
  executiveDashboard: any;
  strategicPlays: any;
  roadmap: any;
  metrics: any;
}

export interface WorkflowData {
  id: string;
  title: string;
  type: 'blog' | 'linkedin' | 'improvement';
  stages: any;
  performance?: any;
}

export interface AnalyticsData {
  dashboard: any;
  contentPerformance: any;
  seoMetrics: any;
  aiOptimization: any;
}

export interface CalendarData {
  events: any[];
  summary: any;
}

export interface InsightsData {
  researchFeed: any;
  knowledgeHub: any;
  aiAssistant: any;
}

/**
 * Load all client data - change CLIENT_CONFIG.name for different clients
 */
export async function loadClientData(): Promise<ClientData> {
  try {
    // For Gumloop demo, load from existing JSON files
    if (CLIENT_CONFIG.name === 'gumloop') {
      const [
        dashboardData,
        diagnosticsReportData,
        diagnosticsSummaryData,
        playbookData,
        playbookSummaryData,
        analyticsData,
        calendarData,
        insightsData,
        assetsData,
        settingsData
      ] = await Promise.all([
        import('@/usableclientdata/data/dashboard/dashboard.json'),
        import('@/usableclientdata/data/diagnostics/diagnostics-report.json'),
        import('@/usableclientdata/data/diagnostics/diagnostics.json'),
        import('@/usableclientdata/data/playbook/playbook-strategy-data.json'),
        import('@/usableclientdata/data/playbook/playbook.json'),
        import('@/usableclientdata/data/analytics/analytics-performance.json'),
        import('@/usableclientdata/data/calendar-events.json'),
        import('@/usableclientdata/data/insights/insights-hub.json'),
        import('@/usableclientdata/data/assets/assets.json'),
        import('@/usableclientdata/data/settings/settings.json')
      ]);

      return {
        company: {
          name: settingsData.default.account.company.name,
          domain: settingsData.default.account.company.website,
          industry: settingsData.default.account.company.industry,
          assets: assetsData.default.assets.slice(0, 2).map(asset => ({
            id: asset.id,
            name: asset.name,
            type: asset.type as 'blog' | 'linkedin',
            status: asset.status as 'active' | 'setup' | 'pending',
            url: asset.url,
            metrics: asset.metrics
          }))
        },
        diagnostics: diagnosticsSummaryData.default.reports?.map((report: any) => ({
          ...report,
          assetId: report.id,
          overallScore: report.visibilityScore || 0,
          executiveSummary: `${report.assetName} diagnostic report`,
          marketPosition: {},
          userIntentAnalysis: {},
          aiPlatformVisibility: {},
          competitiveIntelligence: {}
        })) || [],
        playbook: {
          id: 'playbook-001',
          title: playbookSummaryData.default.playbook.title,
          executiveDashboard: playbookData.default.executiveDashboard,
          strategicPlays: playbookData.default.strategicPlays,
          roadmap: playbookData.default.executionRoadmap,
          metrics: playbookData.default.successMetrics
        },
        contentWorkflows: [],
        analytics: {
          ...analyticsData.default,
          seoMetrics: {
            organicTraffic: analyticsData.default.dashboard?.highlights?.[0]?.current || 0,
            keywords: [],
            backlinks: 0,
            domainAuthority: 0
          }
        },
        calendar: calendarData.default,
        insights: {
          ...insightsData.default,
          aiAssistant: {
            suggestions: (insightsData.default.marketIntelligence as any)?.aiAssistantSuggestions || [],
            contextualMemory: (insightsData.default.marketIntelligence as any)?.contextualMemory || []
          }
        }
      };
    }

    throw new Error(`Client configuration not found: ${CLIENT_CONFIG.name}`);
  } catch (error) {
    console.error('Error loading client data:', error);
    throw error;
  }
}

/**
 * Switch to a different client demo
 */
export function switchClient(clientName: string) {
  // In a real implementation, this would update the config and reload data
  console.log(`Switching to client: ${clientName}`);
  // CLIENT_CONFIG.name = clientName;
  // window.location.reload();
}

/**
 * Get current client configuration
 */
export function getCurrentClient() {
  return CLIENT_CONFIG;
}
