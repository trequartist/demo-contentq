// Mock Data for ContentQ Demo
// This file contains all simulated data for the demo

export interface AgentActivity {
  agent: 'Research' | 'Strategist' | 'Copywriter' | 'Editor' | 'Analyst';
  task: string;
  status: 'working' | 'completed' | 'idle';
  reasoning?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface DocumentUsage {
  module: 'Studio' | 'Strategy' | 'Research' | 'Campaigns';
  itemName: string;
  itemId: string;
  lastUsed: Date;
}

export interface BrainDocument {
  id: string;
  name: string;
  category: 'Strategic Foundation' | 'Content Strategy' | 'Product Knowledge' | 'Market Intelligence' | 'Brand Assets';
  uploadedAt: Date;
  processed: boolean;
  active: boolean;
  summary?: string;
  fileType?: string;
  insights?: string[];
  usedIn?: DocumentUsage[];
  relevanceScore?: number;
}

export interface FoundationStrategy {
  targetCustomer: {
    who: string;
    painPoints: string[];
    goals: string[];
    decisionFactors: string[];
  };
  messaging: {
    primaryMessage: string;
    supportingPoints: string[];
    valueProposition: string;
    differentiators: string[];
  };
  positioning: {
    category: string;
    uniqueAngle: string;
    competitiveAdvantage: string;
    brandVoice: string;
  };
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  contentPillars: string[];
  goals: string[];
  channels: {
    name: string;
    frequency: string;
    focus: string;
  }[];
  recommended?: boolean;
}

export interface ResearchFinding {
  id: string;
  stream: 'competitors' | 'trends' | 'conversations';
  title: string;
  summary: string;
  source?: string;
  date: Date;
  importance: 'high' | 'medium' | 'low';
}

// Agent Messages for Realistic Simulation
export const agentMessages = {
  Research: [
    "Analyzing competitors...",
    "Gathering market insights...",
    "Found 12 relevant sources",
    "Scanning industry reports...",
    "Identifying trending topics...",
    "Cross-referencing data sources...",
  ],
  Strategist: [
    "Evaluating content angles...",
    "Aligning with brand positioning...",
    "Generated 5 topic recommendations",
    "Analyzing audience segments...",
    "Optimizing content strategy...",
    "Mapping customer journey...",
  ],
  Copywriter: [
    "Crafting outline...",
    "Writing introduction...",
    "Optimizing for SEO...",
    "Refining messaging...",
    "Adding compelling hooks...",
    "Polishing final draft...",
  ],
  Editor: [
    "Reviewing content quality...",
    "Checking brand consistency...",
    "Optimizing readability...",
    "Fact-checking claims...",
    "Enhancing clarity...",
    "Final quality check...",
  ],
  Analyst: [
    "Calculating performance metrics...",
    "Analyzing content effectiveness...",
    "Generating insights...",
    "Benchmarking against competitors...",
    "Identifying optimization opportunities...",
    "Compiling recommendations...",
  ],
};

// Mock Foundation Strategy
export const mockFoundationStrategy: FoundationStrategy = {
  targetCustomer: {
    who: "B2B SaaS marketing leaders at mid-market companies (50-500 employees)",
    painPoints: [
      "Struggling to produce consistent, high-quality content",
      "Limited resources and budget for content marketing",
      "Difficulty maintaining brand voice across channels",
      "No clear strategy or measurement framework",
    ],
    goals: [
      "Increase organic traffic and lead generation",
      "Establish thought leadership in their industry",
      "Scale content production without sacrificing quality",
      "Improve content ROI and attribution",
    ],
    decisionFactors: [
      "Proven ROI and measurable results",
      "Easy integration with existing tools",
      "Quality of AI-generated content",
      "Speed of implementation",
    ],
  },
  messaging: {
    primaryMessage: "Transform your content marketing with AI-powered intelligence that thinks like your best strategist",
    supportingPoints: [
      "Never run out of content ideas with always-on market intelligence",
      "Create content that ranks and converts with built-in optimization",
      "Scale your content operation without scaling your team",
      "Every piece of content aligned with your strategy and brand",
    ],
    valueProposition: "ContentQ combines strategic thinking, market research, and content creation into one intelligent platform - helping you produce better content, faster, with less effort.",
    differentiators: [
      "Agent-based AI that orchestrates entire content workflows",
      "Marketing Brain that learns your business and strategy",
      "Always-on research that keeps you ahead of trends",
      "Outcome-focused playbooks, not just templates",
    ],
  },
  positioning: {
    category: "AI-Powered Content Marketing Platform",
    uniqueAngle: "The only platform that combines strategic intelligence with content creation",
    competitiveAdvantage: "We don't just help you write faster - we help you think smarter about what to write",
    brandVoice: "Intelligent, strategic, empowering, professional yet approachable",
  },
};

// Mock Playbooks
export const mockPlaybooks: Playbook[] = [
  {
    id: "thought-leadership",
    name: "Thought Leadership Engine",
    description: "Position your executives as industry experts with strategic insights and perspectives",
    contentPillars: [
      "Industry Trends & Analysis",
      "Strategic Insights",
      "Future Predictions",
      "Best Practices",
    ],
    goals: [
      "Build executive brand and credibility",
      "Generate speaking opportunities",
      "Attract top-tier talent",
      "Create partnership opportunities",
    ],
    channels: [
      { name: "LinkedIn", frequency: "3x/week", focus: "Executive perspectives" },
      { name: "Blog", frequency: "2x/month", focus: "Deep-dive analysis" },
      { name: "Newsletter", frequency: "1x/week", focus: "Curated insights" },
    ],
    recommended: true,
  },
  {
    id: "product-led",
    name: "Product-Led Content",
    description: "Educate prospects on solving problems with your product as the solution",
    contentPillars: [
      "Problem-Solution Content",
      "Use Cases & Examples",
      "Product Updates",
      "How-To Guides",
    ],
    goals: [
      "Drive product-qualified leads",
      "Reduce sales cycle length",
      "Improve product adoption",
      "Support customer success",
    ],
    channels: [
      { name: "Blog", frequency: "4x/month", focus: "Educational content" },
      { name: "Video", frequency: "2x/month", focus: "Product demos" },
      { name: "Documentation", frequency: "Ongoing", focus: "How-to guides" },
    ],
    recommended: true,
  },
  {
    id: "seo-authority",
    name: "SEO Authority Builder",
    description: "Dominate search rankings with comprehensive, interconnected content",
    contentPillars: [
      "Pillar Pages",
      "Topic Clusters",
      "FAQ Content",
      "Comparison Content",
    ],
    goals: [
      "Increase organic traffic by 150%",
      "Rank for high-value keywords",
      "Build topical authority",
      "Capture bottom-funnel searches",
    ],
    channels: [
      { name: "Website", frequency: "6x/month", focus: "SEO-optimized articles" },
      { name: "Landing Pages", frequency: "2x/month", focus: "Conversion content" },
    ],
  },
];

// Mock Brain Documents
export const mockDocuments: BrainDocument[] = [
  // Strategic Foundation
  {
    id: "doc-1",
    name: "Company Profile & Mission",
    category: "Strategic Foundation",
    uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Core company information, mission, vision, and values",
    fileType: "PDF",
    insights: [
      "Primary market: B2B SaaS companies",
      "Focus on mid-market segment (50-500 employees)",
      "Mission: Democratize AI-powered content marketing"
    ],
    usedIn: [
      { module: "Strategy", itemName: "Foundation Strategy", itemId: "foundation-1", lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { module: "Studio", itemName: "Blog: Company Announcement", itemId: "content-1", lastUsed: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { module: "Research", itemName: "Competitive Analysis Report", itemId: "report-1", lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    ],
    relevanceScore: 98,
  },
  {
    id: "doc-2",
    name: "Brand Guidelines",
    category: "Strategic Foundation",
    uploadedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Brand voice, tone, visual identity, and messaging guidelines",
    fileType: "PDF",
    insights: [
      "Brand voice: Intelligent, strategic, empowering",
      "Primary colors: Purple (#8B5CF6), Blue (#3B82F6)",
      "Tone: Professional yet approachable"
    ],
    usedIn: [
      { module: "Studio", itemName: "All Content", itemId: "all-content", lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { module: "Strategy", itemName: "Foundation Strategy", itemId: "foundation-1", lastUsed: new Date(Date.now() - 3 * 60 * 60 * 1000) }
    ],
    relevanceScore: 95,
  },
  {
    id: "doc-3",
    name: "Target Audience Research",
    category: "Strategic Foundation",
    uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Detailed audience personas, pain points, and buying journey",
    fileType: "DOCX",
    insights: [
      "Primary persona: Marketing Director, 35-45 years old",
      "Key pain point: Scaling content without scaling headcount",
      "Buying journey: 3-6 months, multiple stakeholders"
    ],
    usedIn: [
      { module: "Strategy", itemName: "Thought Leadership Playbook", itemId: "playbook-1", lastUsed: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { module: "Research", itemName: "Customer Insights Stream", itemId: "stream-1", lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000) }
    ],
    relevanceScore: 92,
  },
  
  // Content Strategy
  {
    id: "doc-4",
    name: "Content Strategy 2025",
    category: "Content Strategy",
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Annual content strategy, goals, and key initiatives",
    fileType: "PDF",
    insights: [
      "Goal: 150% increase in organic traffic",
      "Focus: Thought leadership + product-led content",
      "Target: 50 pieces of content per month"
    ],
    usedIn: [
      { module: "Strategy", itemName: "All Playbooks", itemId: "playbooks", lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { module: "Studio", itemName: "Content Workflows", itemId: "workflows", lastUsed: new Date(Date.now() - 30 * 60 * 1000) }
    ],
    relevanceScore: 96,
  },
  {
    id: "doc-5",
    name: "SEO Keyword Strategy",
    category: "Content Strategy",
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Target keywords, search volumes, and ranking opportunities",
    fileType: "XLSX",
    insights: [
      "500+ target keywords identified",
      "Focus on long-tail keywords with high intent",
      "Opportunity: 'AI content marketing' cluster"
    ],
    usedIn: [
      { module: "Studio", itemName: "Blog Posts", itemId: "blog-content", lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { module: "Research", itemName: "SEO Trends Stream", itemId: "stream-2", lastUsed: new Date(Date.now() - 8 * 60 * 60 * 1000) }
    ],
    relevanceScore: 89,
  },
  
  // Product Knowledge
  {
    id: "doc-6",
    name: "Product Documentation",
    category: "Product Knowledge",
    uploadedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Complete product features, capabilities, and use cases",
    fileType: "PDF",
    insights: [
      "5 core modules: Studio, Strategy, Research, Brain, Analytics",
      "20+ specialized AI agents",
      "Integrates with 50+ marketing tools"
    ],
    usedIn: [
      { module: "Studio", itemName: "Product-Led Content", itemId: "product-content", lastUsed: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { module: "Strategy", itemName: "Product-Led Playbook", itemId: "playbook-2", lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000) }
    ],
    relevanceScore: 94,
  },
  {
    id: "doc-7",
    name: "Customer Case Studies",
    category: "Product Knowledge",
    uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    processed: true,
    active: false,
    summary: "Success stories and results from key customers",
    fileType: "PDF",
    insights: [
      "Average ROI: 3.5x in first 6 months",
      "Content production increased by 250%",
      "Time saved: 15-20 hours per week"
    ],
    usedIn: [],
    relevanceScore: 87,
  },
  {
    id: "doc-8",
    name: "Product Roadmap Q1-Q2",
    category: "Product Knowledge",
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Upcoming features and product development plans",
    fileType: "PDF",
    insights: [
      "Q1: Multi-language support",
      "Q2: Advanced collaboration features",
      "Future: Video content generation"
    ],
    usedIn: [
      { module: "Strategy", itemName: "Product Launch Campaign", itemId: "campaign-1", lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    ],
    relevanceScore: 91,
  },
  
  // Market Intelligence
  {
    id: "doc-9",
    name: "Competitive Analysis",
    category: "Market Intelligence",
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Competitor positioning, features, and market share",
    fileType: "PDF",
    insights: [
      "3 main competitors identified",
      "Our differentiation: Strategic AI vs. writing assistance",
      "Market gap: End-to-end content intelligence"
    ],
    usedIn: [
      { module: "Strategy", itemName: "Foundation Strategy", itemId: "foundation-1", lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { module: "Research", itemName: "Competitor Monitoring Stream", itemId: "stream-comp", lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000) }
    ],
    relevanceScore: 93,
  },
  {
    id: "doc-10",
    name: "Industry Trends Report 2025",
    category: "Market Intelligence",
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    processed: true,
    active: true,
    summary: "Key trends shaping the industry this year",
    fileType: "PDF",
    insights: [
      "AI adoption in marketing: 78% of companies",
      "Content quality over quantity emerging as priority",
      "Personalization at scale becoming table stakes"
    ],
    usedIn: [
      { module: "Strategy", itemName: "Thought Leadership Playbook", itemId: "playbook-1", lastUsed: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { module: "Studio", itemName: "Trend Analysis Posts", itemId: "trend-content", lastUsed: new Date(Date.now() - 10 * 60 * 60 * 1000) }
    ],
    relevanceScore: 90,
  },
  
  // Brand Assets
  {
    id: "doc-11",
    name: "Visual Brand Assets",
    category: "Brand Assets",
    uploadedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    processed: true,
    active: false,
    summary: "Logos, colors, typography, and design elements",
    fileType: "ZIP",
  },
  {
    id: "doc-12",
    name: "Brand Voice Examples",
    category: "Brand Assets",
    uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    processed: true,
    active: false,
    summary: "Examples of on-brand vs off-brand content",
    fileType: "PDF",
  },
];

// Mock Research Findings
export const mockResearchFindings: ResearchFinding[] = [
  // Competitor findings
  {
    id: "finding-1",
    stream: "competitors",
    title: "Competitor A launched AI-powered content calendar",
    summary: "Major competitor released new feature for automated content planning. Seeing strong engagement on LinkedIn announcement.",
    source: "https://competitor-a.com/blog",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    importance: "high",
  },
  {
    id: "finding-2",
    stream: "competitors",
    title: "Competitor B raised $50M Series C",
    summary: "Primary competitor secured significant funding, planning to expand into enterprise market and AI capabilities.",
    source: "https://techcrunch.com/...",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    importance: "high",
  },
  {
    id: "finding-3",
    stream: "competitors",
    title: "Competitor C published SEO strategy guide",
    summary: "Detailed guide getting strong organic traction. Ranking #1 for 'content marketing strategy 2025'.",
    source: "https://competitor-c.com/guides",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    importance: "medium",
  },
  
  // Trend findings
  {
    id: "finding-4",
    stream: "trends",
    title: "AI-generated content disclosure becoming standard",
    summary: "Major publications now requiring disclosure of AI-assisted content. Industry moving toward transparency standards.",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    importance: "high",
  },
  {
    id: "finding-5",
    stream: "trends",
    title: "Video content consumption up 45% in B2B",
    summary: "LinkedIn reports significant increase in video engagement. Short-form educational content performing best.",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    importance: "high",
  },
  {
    id: "finding-6",
    stream: "trends",
    title: "Search engines prioritizing E-E-A-T signals",
    summary: "Google's latest algorithm update emphasizes Experience, Expertise, Authoritativeness, and Trustworthiness even more.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    importance: "medium",
  },
  
  // Conversation findings
  {
    id: "finding-7",
    stream: "conversations",
    title: "Customer requesting integration with Notion",
    summary: "Multiple customers asking for Notion integration in support tickets and community forum.",
    date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    importance: "medium",
  },
  {
    id: "finding-8",
    stream: "conversations",
    title: "Pain point: Content approval workflows",
    summary: "Recurring theme in sales calls - prospects struggling with getting content approved by multiple stakeholders.",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    importance: "high",
  },
  {
    id: "finding-9",
    stream: "conversations",
    title: "Feature request: Multi-language support",
    summary: "Enterprise prospects asking about content creation in multiple languages for global teams.",
    date: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    importance: "medium",
  },
];

// Helper function to get active documents
export const getActiveDocuments = () => {
  return mockDocuments.filter(doc => doc.active);
};

// Helper function to get documents by category
export const getDocumentsByCategory = (category: BrainDocument['category']) => {
  return mockDocuments.filter(doc => doc.category === category);
};

// Helper function to get findings by stream
export const getFindingsByStream = (stream: 'competitors' | 'trends' | 'conversations') => {
  return mockResearchFindings.filter(finding => finding.stream === stream);
};

// Helper function to get random agent message
export const getRandomAgentMessage = (agent: AgentActivity['agent']): string => {
  const messages = agentMessages[agent];
  return messages[Math.floor(Math.random() * messages.length)];
};
