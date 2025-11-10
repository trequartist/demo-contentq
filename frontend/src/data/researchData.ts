// Mock Data for Research Desk

export interface SavedReport {
  id: string;
  title: string;
  type: 'diagnostics' | 'deepdive' | 'competitive';
  createdAt: Date;
  summary: string;
  sections: {
    title: string;
    content: string;
  }[];
}

// Mock Diagnostics Report
export const mockDiagnosticsReport: SavedReport = {
  id: 'report-diagnostics-1',
  title: 'Initial Content Diagnostics Report',
  type: 'diagnostics',
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  summary: 'Comprehensive analysis of current content performance, SEO visibility, and competitive positioning across 6 key areas.',
  sections: [
    {
      title: 'Executive Summary',
      content: `This diagnostic reveals significant opportunities in content marketing maturity. While foundational elements are in place, there are clear gaps in SEO optimization, competitive positioning, and measurement frameworks.

**Key Findings:**
• Content output is consistent but lacks strategic alignment (62% alignment score)
• SEO visibility is below industry average (Domain Authority: 34 vs industry avg: 48)
• Competitive positioning shows gaps in 3 major content categories
• Measurement frameworks are incomplete (tracking 4 of 12 recommended metrics)

**Priority Recommendations:**
1. Implement comprehensive keyword strategy (Est. 6-month impact: +120% organic traffic)
2. Develop competitive content in underserved categories
3. Establish full measurement framework with attribution
4. Increase content velocity in high-performing topics`,
    },
    {
      title: 'Blog Content Analysis',
      content: `**Current State:**
• Publishing frequency: 2.3 posts/week (industry avg: 3.5/week)
• Average word count: 1,247 words (recommended: 1,500-2,000)
• Topics covered: 8 primary themes
• Engagement rate: 3.2% (industry avg: 4.1%)

**Performance Insights:**
Top performing content types:
1. How-to guides (4.8% engagement)
2. Case studies (4.2% engagement)
3. Industry analysis (3.9% engagement)

Underperforming:
1. Product updates (1.8% engagement)
2. News roundups (1.4% engagement)

**SEO Performance:**
• 23 keywords ranking in top 10 (target: 50+)
• 147 keywords ranking in top 100
• Average position: 34.2
• Monthly organic traffic: 8,400 visits (potential: 18,000+)

**Recommendations:**
• Increase publishing to 4 posts/week
• Focus on how-to and case study formats
• Target 15 high-volume keywords identified in gap analysis
• Optimize existing content (estimated lift: 40%)`,
    },
    {
      title: 'AI Visibility Assessment',
      content: `**Answer Engine Optimization (AEO):**
Current visibility in AI-powered search results: 12% of target queries

**Performance by AI Engine:**
• ChatGPT: Cited in 8% of relevant queries
• Perplexity: Cited in 14% of relevant queries
• Google SGE: Featured in 15% of AI snapshots
• Bing Chat: Mentioned in 10% of conversations

**Citation Analysis:**
• Total citations: 34 across all platforms
• Citation quality score: 6.2/10
• Competitor average: 8.1/10

**Gap Analysis:**
Missing in 88% of target AI queries. Primary gaps:
1. Lack of structured data (schema.org implementation: 23%)
2. Insufficient entity establishment
3. Limited Q&A content formats
4. No FAQ schema markup

**Recommendations:**
• Implement comprehensive schema markup
• Create 50+ FAQ-format articles
• Establish thought leadership through consistent expert content
• Build entity relationships through strategic linking
• Estimated timeline: 4-6 months for significant AEO improvement`,
    },
    {
      title: 'Competitive Position',
      content: `**Competitive Landscape:**
Analyzed 8 primary competitors across content dimensions.

**Content Volume:**
• Your output: 9.2 posts/month
• Competitor average: 14.6 posts/month
• Market leader: 23 posts/month

**Content Quality Scores:**
• Your score: 7.2/10
• Competitor average: 7.8/10
• Market leader: 8.9/10

**Topic Coverage:**
Competitive gaps identified in:
• Advanced use cases (competitor coverage: 89%, yours: 34%)
• Integration tutorials (competitor: 76%, yours: 22%)
• ROI/business case content (competitor: 81%, yours: 41%)

**Strengths:**
• Product education (your coverage: 92% vs competitor avg: 74%)
• Getting started content (87% vs 69%)

**Share of Voice:**
• Estimated: 8.4% in target keywords
• Target: 15% (achievable in 12 months)

**Recommendations:**
• Close gaps in advanced use cases (priority)
• Develop comprehensive integration content
• Create ROI-focused business case library
• Maintain advantage in education content`,
    },
    {
      title: 'Content Distribution',
      content: `**Channel Performance:**

**Blog (owned):**
• Monthly visitors: 8,400
• Avg. time on page: 3:24
• Bounce rate: 58%
• Goal completions: 2.1%

**LinkedIn:**
• Follower growth: +12% QoQ
• Engagement rate: 3.8%
• Post frequency: 5x/week
• Top performing: Industry insights (6.2% engagement)

**Email Newsletter:**
• Subscribers: 12,400 (+8% QoQ)
• Open rate: 24.3% (industry avg: 21.5%)
• Click rate: 3.8% (industry avg: 2.9%)
• Conversion rate: 1.2%

**Distribution Gaps:**
• No YouTube presence (competitor avg: 34 videos)
• Limited podcast participation
• Underutilizing Twitter/X
• No medium.com syndication

**Recommendations:**
• Launch video content program (5 videos/month)
• Guest on 2 relevant podcasts/month
• Activate Twitter with daily tips
• Syndicate top content to Medium
• Implement content repurposing workflow`,
    },
    {
      title: 'Measurement Framework',
      content: `**Current Tracking:**
Measuring 4 of 12 recommended metrics:
✓ Page views
✓ Time on page
✓ Bounce rate
✓ Email subscribers

**Missing Critical Metrics:**
✗ Content attribution to revenue
✗ Topic-level performance
✗ Competitive share of voice
✗ Content ROI
✗ SEO keyword movements
✗ Engagement depth scores
✗ Content lifecycle metrics
✗ Cross-channel performance

**Data Infrastructure:**
• GA4 implementation: Partial (68% complete)
• Conversion tracking: Basic
• Attribution model: Last-click only
• Dashboard availability: None

**Recommendations:**
Priority 1 - Implement immediately:
• Complete GA4 setup with custom events
• Build executive dashboard (key metrics)
• Set up weekly automated reports
• Implement topic-level tracking

Priority 2 - Next 30 days:
• Build content attribution model
• Track keyword rankings weekly
• Measure content ROI per piece
• Set up competitive monitoring

Priority 3 - Next 90 days:
• Multi-touch attribution
• Predictive performance models
• Automated optimization recommendations`,
    },
  ],
};

// Mock Deep-Dive Report
export const mockDeepDiveReport: SavedReport = {
  id: 'report-deepdive-1',
  title: 'Q4 2024 Content Deep-Dive',
  type: 'deepdive',
  createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  summary: 'Quarterly analysis of content performance, emerging trends, and strategic recommendations for Q1 2025.',
  sections: [
    {
      title: 'Executive Summary',
      content: 'Q4 showed 34% growth in organic traffic YoY with strong performance in thought leadership content. Key opportunity: expanding into video content.',
    },
    {
      title: 'Content Performance Trends',
      content: 'Top performing content categories: Case studies (+45% engagement), How-to guides (+38%), Industry analysis (+29%). Declining: Product announcements (-12%).',
    },
    {
      title: 'Competitive Intelligence',
      content: 'Competitors increased content output by 23% on average. Notable: Competitor A launched comprehensive video series. Competitor B focusing on AI-generated content at scale.',
    },
    {
      title: 'Recommendations',
      content: 'Priority actions for Q1: 1) Launch video content program, 2) Increase case study production, 3) Optimize underperforming product content, 4) Expand AI/ML topic coverage.',
    },
  ],
};

// Mock Saved Reports
export const mockSavedReports: SavedReport[] = [
  mockDiagnosticsReport,
  mockDeepDiveReport,
  {
    id: 'report-competitive-1',
    title: 'Competitive Intelligence Report - Nov 2024',
    type: 'competitive',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    summary: 'Monthly competitive analysis covering content strategies, SEO movements, and market positioning of 5 primary competitors.',
    sections: [
      {
        title: 'Competitor Activity Summary',
        content: 'Competitor A published 18 pieces, Competitor B launched new content hub, Competitor C increased LinkedIn presence by 40%.',
      },
      {
        title: 'SEO Movement Analysis',
        content: 'Significant ranking changes: Competitor A gained 12 top-10 positions in target keywords. Competitor B lost 8 positions due to algorithm update.',
      },
      {
        title: 'Content Strategy Shifts',
        content: 'Industry trend: Moving toward AI-powered content at scale. 3 of 5 competitors now using AI tools publicly. Video content increasing across all competitors.',
      },
    ],
  },
];

// Report Types for Builder
export const reportTypes = [
  {
    id: 'diagnostics',
    name: 'Initial Diagnostics',
    description: 'Comprehensive analysis of your current content performance, SEO visibility, and competitive positioning',
    duration: '~30 seconds',
    agents: 6,
    sections: ['Blog Analysis', 'AI Visibility', 'Competitive Position', 'Distribution', 'Measurement', 'Recommendations'],
    bestFor: 'New users, quarterly reviews, or when strategy changes',
  },
  {
    id: 'deepdive',
    name: 'Quarterly Deep-Dive',
    description: 'In-depth quarterly analysis with trend identification, performance benchmarks, and strategic planning',
    duration: '~45 seconds',
    agents: 4,
    sections: ['Performance Trends', 'Audience Insights', 'Competitive Moves', 'Market Analysis', 'Strategic Plan'],
    bestFor: 'Quarterly business reviews and strategic planning sessions',
  },
  {
    id: 'competitive',
    name: 'Competitive Intelligence',
    description: 'Monthly monitoring of competitor content strategies, SEO movements, and market positioning',
    duration: '~20 seconds',
    agents: 3,
    sections: ['Competitor Activity', 'SEO Changes', 'Content Strategies', 'Market Signals'],
    bestFor: 'Monthly competitive monitoring and tactical adjustments',
  },
];
