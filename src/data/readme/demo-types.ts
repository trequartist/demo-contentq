/**
 * KiwiQ Demo Type Definitions
 * Complete TypeScript types for implementing the static demo
 */

// ============================================================================
// User & Organization Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  timezone: string;
  preferences: UserPreferences;
  subscription: Subscription;
  achievements: Achievement[];
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  defaultPlatform: Platform;
  autoSave: boolean;
  aiSuggestions: boolean;
}

export interface NotificationSettings {
  email: boolean;
  inApp: boolean;
  workflow: boolean;
  weekly_digest: boolean;
}

export interface Subscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'trial';
  features: string[];
  usage: UsageMetrics;
}

export interface UsageMetrics {
  contentCreated: number;
  workflowsCompleted: number;
  diagnosticsRun: number;
  playbooksGenerated: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  icon: string;
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  domain: string;
  industry: string;
  size: string;
  founded: string;
  description: string;
  team: TeamMember[];
  settings: OrganizationSettings;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  title: string;
  avatar: string;
}

export interface OrganizationSettings {
  branding: {
    primaryColor: string;
    font: string;
  };
  workflow: {
    requireApproval: boolean;
    autoPublish: boolean;
    reviewers: string[];
  };
  integrations: Integration[];
}

export interface Integration {
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
}

// ============================================================================
// Asset Types
// ============================================================================

export type Platform = 'blog' | 'linkedin';
export type AssetType = 'blog' | 'linkedin';

export interface Asset {
  assetId: string;
  type: AssetType;
  name: string;
  isShared: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  appData: AssetAppData;
  isDocumentUpdateComplete: boolean;
  isDiagnosticsCreated: boolean;
  isPlaybookCreated: boolean;
  metrics?: AssetMetrics;
  configuration?: AssetConfiguration;
  status?: AssetStatus;
}

export interface AssetAppData {
  company_name?: string;
  blog_url?: string;
  entity_name?: string;
  profile_url?: string;
  onboarding: OnboardingData;
}

export interface OnboardingData {
  isDocumentUpdateComplete: boolean;
  diagnosticsComplete: boolean;
  playbookComplete: boolean;
  diagnosticsCompletedAt?: string;
  playbookCompletedAt?: string;
  contentCalendarCreatedAt?: string;
}

export interface AssetMetrics {
  monthlyViews?: number;
  avgEngagementRate?: number;
  contentPublished?: number;
  subscriberCount?: number;
  followers?: number;
  avgPostReach?: number;
  postsPublished?: number;
  profileViews?: number;
}

export interface AssetConfiguration {
  publishing?: PublishingConfig;
  seo?: SEOConfig;
  content?: ContentConfig;
  posting?: PostingConfig;
  goals?: GoalsConfig;
}

export interface PublishingConfig {
  schedule: string;
  timezone: string;
  autoPublish: boolean;
  reviewRequired: boolean;
}

export interface SEOConfig {
  focusKeywords: string[];
  metaDescription: string;
  defaultAuthor: string;
}

export interface ContentConfig {
  categories?: string[];
  tags?: string[];
  targetWordCount?: number;
  tone?: string;
  pillars?: string[];
  targetAudience?: string;
}

export interface PostingConfig {
  schedule: string;
  bestTimes: string[];
  hashtagStrategy: string;
}

export interface GoalsConfig {
  primary: string;
  secondary: string;
  metrics: string[];
}

export interface AssetStatus {
  nextStep: string;
  recommendation: string;
  completionPercentage: number;
}

// ============================================================================
// Content Studio Types
// ============================================================================

export type WorkflowType = 'create' | 'improve' | 'linkedinCreate';
export type WorkflowStage = 'input' | 'topics' | 'brief' | 'draft' | 'complete' | 'analysis' | 'suggestions' | 'editing';
export type WorkflowStatus = 'pending' | 'in_progress' | 'completed' | 'error';

export interface Workflow {
  id: string;
  type: WorkflowType;
  platform: Platform;
  assetId: string;
  runId: string;
  status: WorkflowStatus;
  currentStage: WorkflowStage;
  startedAt: string;
  lastUpdatedAt?: string;
  completedAt?: string;
  stages: WorkflowStages;
}

export interface WorkflowStages {
  input?: StageData<InputData>;
  topics?: StageData<TopicsData>;
  brief?: StageData<BriefData>;
  draft?: StageData<DraftData>;
  complete?: StageData<CompleteData>;
  analysis?: StageData<AnalysisData>;
  suggestions?: StageData<SuggestionsData>;
  editing?: StageData<EditingData>;
}

export interface StageData<T> {
  status: WorkflowStatus;
  startedAt?: string;
  completedAt?: string;
  data?: T;
  estimatedCompletionTime?: string;
}

export interface InputData {
  companyName?: string;
  requirements?: string;
  targetAudience?: string;
  keywords?: string[];
  username?: string;
  tone?: string;
}

export interface TopicsData {
  selectedTopic: string;
  suggestions: TopicSuggestion[];
}

export interface TopicSuggestion {
  title: string;
  score: number;
  reasoning: string;
}

export interface BriefData {
  title: string;
  outline: OutlineSection[];
  targetWordCount: number;
  seoKeywords: string[];
  tone: string;
  hook?: string;
  mainPoints?: string[];
  cta?: string;
}

export interface OutlineSection {
  section: string;
  points: string[];
}

export interface DraftData {
  content: string;
  wordCount?: number;
  lastSavedAt: string;
  aiSuggestions?: string[];
  seoScore?: number;
  readabilityScore?: number;
  characterCount?: number;
  hashtagCount?: number;
  estimatedReach?: number;
  bestTimeToPost?: string;
}

export interface CompleteData {
  finalContent: string;
  published: boolean;
  scheduledFor?: string;
}

export interface AnalysisData {
  currentScore: number;
  issues: string[];
  opportunities: string[];
}

export interface SuggestionsData {
  improvements: Improvement[];
  prioritizedActions: string[];
}

export interface Improvement {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

export interface EditingData {
  updatedContent: string;
  changesApplied: string[];
  finalScore: number;
}

export interface Document {
  id: string;
  type: 'brief' | 'draft' | 'idea';
  title: string;
  status: 'draft' | 'complete';
  createdAt: string;
  updatedAt: string;
  platform: Platform;
  assetId: string;
  wordCount?: number;
  targetWordCount?: number;
  notes?: string;
}

export interface CalendarEntry {
  date: string;
  platform: Platform;
  title: string;
  status: 'idea' | 'draft' | 'scheduled' | 'published';
  type: 'post' | 'article';
}

// ============================================================================
// Diagnostics Types
// ============================================================================

export type DiagnosticsStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface DiagnosticsReport {
  id: string;
  assetId: string;
  assetType: AssetType;
  assetName: string;
  status: DiagnosticsStatus;
  createdAt: string;
  completedAt?: string;
  runId?: string;
  metrics?: DiagnosticsMetrics;
  
  // Blog-specific sections
  ai_visibility_overview?: AIVisibilityOverview;
  blog_performance_health?: BlogPerformanceHealth;
  technical_seo_foundation?: TechnicalSEOFoundation;
  competitive_intelligence?: CompetitiveIntelligence;
  content_gap_analysis?: ContentGapAnalysis;
  
  // LinkedIn-specific sections
  linkedin_visibility_assessment?: LinkedInVisibilityAssessment;
  content_performance_analysis?: ContentPerformanceAnalysis;
  competitive_linkedin_intelligence?: CompetitiveLinkedInIntelligence;
  content_strategy_gaps?: ContentStrategyGap[];
  strategic_linkedin_recommendations?: StrategicRecommendation[];
  
  // Common sections
  strategic_opportunities?: StrategicOpportunity[];
  executive_summary?: ExecutiveSummary;
}

export interface DiagnosticsMetrics {
  overallScore: number;
  contentQuality?: number;
  seoScore?: number;
  engagement?: number;
  performance?: number;
  healthScore?: number;
  technicalScore?: number;
}

export interface AIVisibilityOverview {
  current_score: number;
  trend: 'up' | 'down' | 'stable';
  monthly_change: number;
  ranking_keywords: number;
  top_performing_content: TopContent[];
  improvement_areas: string[];
}

export interface TopContent {
  title: string;
  url: string;
  ai_visibility_score: number;
  monthly_views: number;
}

export interface BlogPerformanceHealth {
  traffic_metrics: TrafficMetrics;
  engagement_metrics: EngagementMetrics;
  conversion_metrics: ConversionMetrics;
}

export interface TrafficMetrics {
  monthly_visitors: number;
  unique_visitors: number;
  page_views: number;
  avg_session_duration: string;
  bounce_rate: number;
  trend: 'up' | 'down' | 'stable';
}

export interface EngagementMetrics {
  avg_time_on_page: string;
  pages_per_session: number;
  comment_rate: number;
  share_rate: number;
  subscriber_growth_rate: number;
}

export interface ConversionMetrics {
  visitor_to_lead: number;
  lead_to_customer: number;
  content_roi: number;
}

export interface TechnicalSEOFoundation {
  overall_score: number;
  issues: SEOIssue[];
  opportunities: string[];
  mobile_score: number;
  desktop_score: number;
  indexability: number;
}

export interface SEOIssue {
  severity: 'low' | 'medium' | 'high';
  type: string;
  affected_pages: number;
  impact: string;
}

export interface CompetitiveIntelligence {
  market_position: number;
  total_competitors_analyzed: number;
  competitors: Competitor[];
  competitive_gaps: string[];
  competitive_advantages: string[];
}

export interface Competitor {
  name: string;
  domain_authority?: number;
  content_velocity?: number;
  ai_visibility?: number;
  strengths?: string[];
  weaknesses?: string[];
  followers?: number;
  engagement_rate?: number;
  posting_frequency?: string;
  content_themes?: string[];
}

export interface ContentGapAnalysis {
  missing_topics: MissingTopic[];
  underperforming_categories: string[];
  content_opportunities: ContentOpportunity[];
}

export interface MissingTopic {
  topic: string;
  search_volume: number;
  competition: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
}

export interface ContentOpportunity {
  type: string;
  title: string;
  estimated_impact: string;
  effort: 'low' | 'medium' | 'high';
}

export interface LinkedInVisibilityAssessment {
  profile_metrics: ProfileMetrics;
  content_reach: ContentReach;
  audience_quality: AudienceQuality;
}

export interface ProfileMetrics {
  followers: number;
  connections: number;
  profile_views_monthly: number;
  search_appearances_monthly: number;
  post_impressions_avg: number;
  engagement_rate: number;
}

export interface ContentReach {
  avg_post_reach: number;
  viral_posts_count: number;
  max_post_reach: number;
  reach_growth_rate: number;
}

export interface AudienceQuality {
  relevant_followers_percentage: number;
  decision_makers_percentage: number;
  target_industry_percentage: number;
}

export interface ContentPerformanceAnalysis {
  top_performing_posts: PerformingPost[];
  content_type_performance: ContentTypePerformance;
  posting_analysis: PostingAnalysis;
}

export interface PerformingPost {
  content: string;
  date: string;
  impressions: number;
  engagement_rate: number;
  comments: number;
  shares: number;
}

export interface ContentTypePerformance {
  [key: string]: {
    avg_engagement: number;
    avg_reach: number;
  };
}

export interface PostingAnalysis {
  optimal_times: string[];
  optimal_frequency: string;
  hashtag_performance: {
    top_hashtags: string[];
    optimal_count: string;
  };
}

export interface CompetitiveLinkedInIntelligence {
  competitor_profiles: Competitor[];
  industry_benchmarks: IndustryBenchmarks;
  competitive_advantages: string[];
  improvement_areas: string[];
}

export interface IndustryBenchmarks {
  avg_engagement_rate: number;
  avg_follower_growth: number;
  avg_post_reach: number;
}

export interface ContentStrategyGap {
  gap: string;
  impact: string;
  recommendation: string;
}

export interface StrategicRecommendation {
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
  expected_impact: string;
  timeline: string;
}

export interface StrategicOpportunity {
  opportunity: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  expected_outcome: string;
}

export interface ExecutiveSummary {
  key_findings?: string[];
  immediate_actions?: string[];
  quarterly_goals?: string[];
  strengths?: string[];
  opportunities?: string[];
  '30_day_plan'?: string[];
}

// ============================================================================
// Playbook Types
// ============================================================================

export interface Playbook {
  id: string;
  assetId: string;
  assetName: string;
  platform: Platform;
  status: 'draft' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
  version: number;
  plays: Play[];
  playbook: PlaybookStrategy;
}

export interface Play {
  id: string;
  name: string;
  category: PlayCategory;
  status: 'planned' | 'active' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  objectives: string[];
  tactics?: string[];
  metrics?: PlayMetrics;
  timeline: string;
  owner: string;
  progress?: any;
  tools?: Tool[];
  channels?: Channel[];
  clusters?: ContentCluster[];
  content_pillars?: ContentPillar[];
  format?: EventFormat;
  upcoming_events?: UpcomingEvent[];
  program_details?: ProgramDetails;
}

export type PlayCategory = 'content' | 'seo' | 'social_proof' | 'engagement' | 'community' | 'personal_brand' | 'video' | 'amplification';

export interface PlayMetrics {
  target: { [key: string]: number };
  current: { [key: string]: number };
}

export interface Tool {
  name: string;
  status: 'planned' | 'in_development' | 'live';
  launch_date?: string;
  performance?: string;
}

export interface Channel {
  platform: string;
  members?: number;
  engagement_rate?: number;
  avg_attendance?: number;
  satisfaction_score?: number;
}

export interface ContentCluster {
  topic: string;
  pillar: string;
  supporting_content: string[];
}

export interface ContentPillar {
  pillar: string;
  topics: string[];
  frequency: string;
}

export interface EventFormat {
  duration: string;
  structure: string;
  frequency: string;
}

export interface UpcomingEvent {
  title: string;
  guest: string;
  date: string;
}

export interface ProgramDetails {
  participants: number;
  avg_shares_per_post: number;
  reach_multiplier: number;
}

export interface PlaybookStrategy {
  vision?: string;
  mission?: string;
  strategy?: {
    content_mix?: { [key: string]: number };
    channel_focus?: { [key: string]: number };
    audience_segments?: AudienceSegment[];
  };
  personal_brand?: {
    positioning: string;
    key_messages: string[];
    voice_tone: string;
  };
  content_strategy?: {
    post_types?: { [key: string]: number };
    engagement_tactics?: string[];
  };
  growth_targets?: { [key: string]: GrowthTarget };
  kpis?: KPI[];
  resources?: Resources;
}

export interface AudienceSegment {
  segment: string;
  percentage: number;
  content_focus: string;
}

export interface GrowthTarget {
  followers?: number;
  engagement_rate?: number;
  profile_views?: number;
}

export interface KPI {
  metric: string;
  current: number;
  target: number;
  timeline: string;
}

export interface Resources {
  team: string[];
  budget?: {
    monthly: number;
    allocation: { [key: string]: number };
  };
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface DashboardData {
  overview: DashboardOverview;
  contentPerformance: ContentPerformance;
  audienceAnalytics: AudienceAnalytics;
  conversionMetrics: ConversionMetricsData;
  seoMetrics: SEOMetrics;
  socialMetrics: SocialMetrics;
  goals: Goals;
  recommendations: Recommendations;
  alerts: Alert[];
  recentActivity: Activity[];
}

export interface DashboardOverview {
  dateRange: string;
  comparedTo: string;
  highlights: Highlight[];
}

export interface Highlight {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface ContentPerformance {
  summary: ContentSummary;
  topContent: TopPerformingContent[];
  contentByType: { [key: string]: ContentTypeMetrics };
  publishingTrends: PublishingTrend[];
}

export interface ContentSummary {
  totalContent: number;
  published: number;
  drafts: number;
  scheduled: number;
  avgPerformanceScore: number;
}

export interface TopPerformingContent {
  title: string;
  platform: Platform;
  publishedDate: string;
  views: number;
  engagement: number;
  shares: number;
  leadGenerated: number;
}

export interface ContentTypeMetrics {
  published: number;
  avgViews: number;
  avgEngagement: number;
  topCategory?: string;
  topFormat?: string;
}

export interface PublishingTrend {
  date: string;
  blog?: number;
  linkedin?: number;
}

export interface AudienceAnalytics {
  growth: GrowthMetrics;
  demographics: Demographics;
  engagement: EngagementData;
  geographics: Geographics;
}

export interface GrowthMetrics {
  total: number;
  new: number;
  returning: number;
  growthRate: number;
}

export interface Demographics {
  roles: DemographicItem[];
  industries: DemographicItem[];
  companies: {
    enterprise: number;
    midMarket: number;
    smb: number;
  };
}

export interface DemographicItem {
  [key: string]: string | number;
}

export interface EngagementData {
  avgSessionDuration: string;
  pagesPerSession: number;
  bounceRate: number;
  returnVisitorRate: number;
  socialShares: number;
  comments: number;
}

export interface Geographics {
  topCountries: CountryData[];
  topCities: string[];
}

export interface CountryData {
  country: string;
  percentage: number;
}

export interface ConversionMetricsData {
  funnel: ConversionFunnel;
  conversionRates: ConversionRates;
  leadSources: LeadSource[];
  contentAttribution: ContentAttribution;
}

export interface ConversionFunnel {
  visitors: number;
  engaged: number;
  leads: number;
  opportunities: number;
  customers: number;
}

export interface ConversionRates {
  visitorToLead: number;
  leadToOpportunity: number;
  opportunityToCustomer: number;
  overallConversion: number;
}

export interface LeadSource {
  source: string;
  leads: number;
  percentage: number;
}

export interface ContentAttribution {
  firstTouch: Attribution[];
  lastTouch: Attribution[];
}

export interface Attribution {
  content: string;
  attribution: number;
}

export interface SEOMetrics {
  organic: OrganicMetrics;
  keywords: KeywordMetrics;
  backlinks: BacklinkMetrics;
  technicalHealth: TechnicalHealth;
}

export interface OrganicMetrics {
  traffic: number;
  growthRate: number;
  avgPosition: number;
  clickThroughRate: number;
}

export interface KeywordMetrics {
  ranking: number;
  topTen: number;
  featured: number;
  trending: TrendingKeyword[];
}

export interface TrendingKeyword {
  keyword: string;
  position: number;
  volume: number;
}

export interface BacklinkMetrics {
  total: number;
  newThisMonth: number;
  domainAuthority: number;
  referringDomains: number;
}

export interface TechnicalHealth {
  score: number;
  issues: {
    critical: number;
    warning: number;
    notice: number;
  };
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

export interface SocialMetrics {
  platforms: { [key: string]: PlatformMetrics };
  topPosts: SocialPost[];
  sentiment: Sentiment;
}

export interface PlatformMetrics {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
}

export interface SocialPost {
  platform: string;
  content: string;
  engagement: number;
  shares?: number;
  comments?: number;
  retweets?: number;
  likes?: number;
}

export interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Goals {
  quarterly: Goal[];
  annual: AnnualGoals;
}

export interface Goal {
  goal: string;
  target: number;
  current: number;
  progress: number;
  status: 'on_track' | 'at_risk' | 'behind' | 'achieved';
  dueDate: string;
}

export interface AnnualGoals {
  [key: string]: {
    target: number;
    current: number;
    progress: number;
  };
}

export interface Recommendations {
  immediate: Recommendation[];
  strategic: Recommendation[];
}

export interface Recommendation {
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

export interface Alert {
  type: 'opportunity' | 'warning' | 'info' | 'error';
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Activity {
  action: string;
  details: string;
  platform?: Platform;
  timestamp: string;
  user: string;
  result?: string;
  impact?: string;
  achievement?: string;
}

// ============================================================================
// Demo Configuration Types
// ============================================================================

export interface DemoConfig {
  name: string;
  version: string;
  environment: string;
  created: string;
  features: FeatureConfig;
  users: { [key: string]: DemoUser };
  data: DataConfig;
  ui: UIConfig;
  api: APIConfig;
  scenarios: ScenariosConfig;
  limitations: Limitations;
  support: SupportConfig;
}

export interface FeatureConfig {
  [feature: string]: {
    enabled: boolean;
    [key: string]: any;
  };
}

export interface DemoUser {
  email: string;
  password: string;
  role: string;
  organization: string;
}

export interface DataConfig {
  sources: string[];
  refreshInterval: number | null;
  cacheEnabled: boolean;
}

export interface UIConfig {
  theme: 'light' | 'dark';
  animations: boolean;
  tooltips: boolean;
  guidedTours: boolean;
  mockLatency?: {
    enabled: boolean;
    min: number;
    max: number;
  };
}

export interface APIConfig {
  mockResponses: boolean;
  baseUrl: string;
  headers: { [key: string]: string };
  endpoints: { [category: string]: { [endpoint: string]: string } };
}

export interface ScenariosConfig {
  available: Scenario[];
  default: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  steps: string[];
}

export interface Limitations {
  note: string;
  features: string[];
}

export interface SupportConfig {
  documentation: string;
  helpCenter: string;
  contact: string;
  chat?: {
    enabled: boolean;
    botOnly: boolean;
  };
}
