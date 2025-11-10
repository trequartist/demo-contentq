// Mock Data for Strategy Room Components

export interface ContentPlay {
  id: string;
  title: string;
  description: string;
  category: 'Awareness' | 'Consideration' | 'Decision' | 'Retention';
  recommended: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToValue: string;
  bestFor: string[];
}

export interface GeneratedPlaybook {
  id: string;
  name: string;
  selectedPlays: string[];
  contentPillars: {
    name: string;
    description: string;
    topics: string[];
  }[];
  goals: {
    outcome: string;
    metric: string;
    target: string;
  }[];
  channelStrategy: {
    channel: string;
    frequency: string;
    contentTypes: string[];
    focus: string;
  }[];
  createdAt: Date;
}

export interface FoundationStrategyData {
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

// 14 Content Plays
export const contentPlays: ContentPlay[] = [
  // AWARENESS (4 plays)
  {
    id: 'thought-leadership',
    title: 'Thought Leadership Engine',
    description: 'Position executives as industry experts with strategic insights and future-focused perspectives',
    category: 'Awareness',
    recommended: true,
    difficulty: 'Advanced',
    timeToValue: '3-6 months',
    bestFor: ['Building brand authority', 'Attracting top talent', 'Creating speaking opportunities'],
  },
  {
    id: 'seo-authority',
    title: 'SEO Authority Builder',
    description: 'Dominate search rankings with comprehensive pillar content and topic clusters',
    category: 'Awareness',
    recommended: true,
    difficulty: 'Intermediate',
    timeToValue: '4-8 months',
    bestFor: ['Organic traffic growth', 'Long-term visibility', 'Establishing topical authority'],
  },
  {
    id: 'social-engagement',
    title: 'Social Engagement Multiplier',
    description: 'Build community and engagement through consistent, value-driven social content',
    category: 'Awareness',
    recommended: false,
    difficulty: 'Beginner',
    timeToValue: '1-3 months',
    bestFor: ['Brand awareness', 'Community building', 'Direct audience connection'],
  },
  {
    id: 'podcast-series',
    title: 'Podcast Content Series',
    description: 'Create episodic audio content featuring industry experts and customer stories',
    category: 'Awareness',
    recommended: false,
    difficulty: 'Advanced',
    timeToValue: '6-12 months',
    bestFor: ['Deep audience connection', 'Repurposable content', 'Expert positioning'],
  },

  // CONSIDERATION (4 plays)
  {
    id: 'problem-solution',
    title: 'Problem-Solution Framework',
    description: 'Address specific pain points with detailed solution-oriented content',
    category: 'Consideration',
    recommended: true,
    difficulty: 'Intermediate',
    timeToValue: '2-4 months',
    bestFor: ['Capturing high-intent traffic', 'Demonstrating expertise', 'Solution awareness'],
  },
  {
    id: 'comparison-content',
    title: 'Competitive Comparison Hub',
    description: 'Create transparent comparisons showing your differentiation and unique value',
    category: 'Consideration',
    recommended: true,
    difficulty: 'Intermediate',
    timeToValue: '2-3 months',
    bestFor: ['Evaluation stage buyers', 'Competitive differentiation', 'Trust building'],
  },
  {
    id: 'educational-hub',
    title: 'Educational Content Hub',
    description: 'Comprehensive guides and resources that educate prospects on your solution category',
    category: 'Consideration',
    recommended: false,
    difficulty: 'Intermediate',
    timeToValue: '3-5 months',
    bestFor: ['Category education', 'Lead nurturing', 'Sales enablement'],
  },
  {
    id: 'webinar-series',
    title: 'Expert Webinar Series',
    description: 'Live educational sessions showcasing expertise and product capabilities',
    category: 'Consideration',
    recommended: false,
    difficulty: 'Advanced',
    timeToValue: '1-2 months',
    bestFor: ['Lead generation', 'Product demonstrations', 'Expert positioning'],
  },

  // DECISION (3 plays)
  {
    id: 'case-studies',
    title: 'Customer Success Stories',
    description: 'Detailed case studies with metrics, quotes, and tangible results',
    category: 'Decision',
    recommended: true,
    difficulty: 'Intermediate',
    timeToValue: '2-4 months',
    bestFor: ['Proof of value', 'Sales enablement', 'Closing deals'],
  },
  {
    id: 'roi-calculators',
    title: 'ROI & Value Calculators',
    description: 'Interactive tools helping prospects quantify value and build business cases',
    category: 'Decision',
    recommended: false,
    difficulty: 'Advanced',
    timeToValue: '3-4 months',
    bestFor: ['Enterprise sales', 'Value demonstration', 'Shortening sales cycles'],
  },
  {
    id: 'product-comparison',
    title: 'Product Comparison Matrix',
    description: 'Detailed feature comparisons and use case mapping to help decision-making',
    category: 'Decision',
    recommended: false,
    difficulty: 'Beginner',
    timeToValue: '1-2 months',
    bestFor: ['Final stage evaluation', 'Feature transparency', 'Self-service buyers'],
  },

  // RETENTION (3 plays)
  {
    id: 'customer-education',
    title: 'Customer Education Program',
    description: 'Onboarding content and ongoing training to drive product adoption',
    category: 'Retention',
    recommended: true,
    difficulty: 'Intermediate',
    timeToValue: '2-3 months',
    bestFor: ['Reducing churn', 'Increasing adoption', 'Customer success'],
  },
  {
    id: 'community-building',
    title: 'Customer Community Hub',
    description: 'Foster peer-to-peer learning and engagement among your customer base',
    category: 'Retention',
    recommended: false,
    difficulty: 'Advanced',
    timeToValue: '6-12 months',
    bestFor: ['Customer retention', 'Advocacy programs', 'Peer support'],
  },
  {
    id: 'feature-announcements',
    title: 'Product Update Engine',
    description: 'Regular updates on new features, improvements, and roadmap progress',
    category: 'Retention',
    recommended: false,
    difficulty: 'Beginner',
    timeToValue: '1 month',
    bestFor: ['Product adoption', 'Engagement', 'Reducing support tickets'],
  },
];

// Empty Foundation Strategy Template
export const emptyFoundationStrategy: FoundationStrategyData = {
  targetCustomer: {
    who: '',
    painPoints: [''],
    goals: [''],
    decisionFactors: [''],
  },
  messaging: {
    primaryMessage: '',
    supportingPoints: [''],
    valueProposition: '',
    differentiators: [''],
  },
  positioning: {
    category: '',
    uniqueAngle: '',
    competitiveAdvantage: '',
    brandVoice: '',
  },
};

// Mock Generated Playbook
export const mockGeneratedPlaybook: GeneratedPlaybook = {
  id: 'playbook-1',
  name: 'B2B SaaS Growth Playbook',
  selectedPlays: ['thought-leadership', 'seo-authority', 'problem-solution', 'case-studies', 'customer-education'],
  contentPillars: [
    {
      name: 'Product Innovation',
      description: 'Showcase how we\'re pushing the boundaries of what\'s possible',
      topics: [
        'AI-powered content intelligence',
        'Agent-based workflow automation',
        'Real-time market insights',
        'Predictive content performance',
      ],
    },
    {
      name: 'Industry Leadership',
      description: 'Position as thought leaders in content marketing evolution',
      topics: [
        'Future of content marketing',
        'AI\'s role in marketing teams',
        'Measuring content ROI',
        'Building efficient content operations',
      ],
    },
    {
      name: 'Customer Success',
      description: 'Prove value through real customer outcomes',
      topics: [
        'Customer transformation stories',
        'Time saved and efficiency gains',
        'Content quality improvements',
        'Team productivity metrics',
      ],
    },
    {
      name: 'Practical Education',
      description: 'Help marketers get better at their craft',
      topics: [
        'Content strategy frameworks',
        'SEO best practices',
        'Writing compelling copy',
        'Building content calendars',
      ],
    },
  ],
  goals: [
    {
      outcome: 'Generate 500 qualified leads per month',
      metric: 'MQLs from organic + content',
      target: '500/month by Q4',
    },
    {
      outcome: 'Establish thought leadership in AI marketing',
      metric: 'Speaking invitations + media mentions',
      target: '10 opportunities/quarter',
    },
    {
      outcome: 'Reduce sales cycle length',
      metric: 'Days from lead to close',
      target: 'From 60 to 45 days',
    },
    {
      outcome: 'Improve customer retention',
      metric: 'Net revenue retention',
      target: '110% NRR',
    },
  ],
  channelStrategy: [
    {
      channel: 'Blog',
      frequency: '4x per week',
      contentTypes: ['SEO articles', 'Thought leadership', 'How-to guides'],
      focus: 'Organic traffic and education',
    },
    {
      channel: 'LinkedIn',
      frequency: 'Daily',
      contentTypes: ['Executive posts', 'Company updates', 'Industry insights'],
      focus: 'Brand awareness and engagement',
    },
    {
      channel: 'Email Newsletter',
      frequency: 'Weekly',
      contentTypes: ['Curated content', 'Original insights', 'Product updates'],
      focus: 'Nurturing and retention',
    },
    {
      channel: 'Case Studies',
      frequency: '2x per month',
      contentTypes: ['Customer stories', 'Video testimonials', 'Data-driven results'],
      focus: 'Sales enablement and proof',
    },
  ],
  createdAt: new Date(),
};

// AI Suggestions for Foundation Strategy
export const strategySuggestions = {
  targetCustomer: {
    who: [
      'B2B SaaS marketing leaders at mid-market companies (50-500 employees)',
      'Content marketing managers at growth-stage startups',
      'Marketing operations professionals seeking efficiency gains',
    ],
    painPoints: [
      'Struggling to produce consistent, high-quality content',
      'Limited resources and budget for content marketing',
      'Difficulty maintaining brand voice across channels',
      'No clear strategy or measurement framework',
    ],
    goals: [
      'Increase organic traffic and lead generation',
      'Establish thought leadership in their industry',
      'Scale content production without sacrificing quality',
      'Improve content ROI and attribution',
    ],
  },
  messaging: {
    primaryMessage: [
      'Transform your content marketing with AI-powered intelligence that thinks like your best strategist',
      'Create better content, faster, with less effort - powered by AI agents',
      'Never run out of content ideas with always-on market intelligence',
    ],
    valueProposition: [
      'ContentQ combines strategic thinking, market research, and content creation into one intelligent platform',
      'The only platform that helps you think smarter about what to write, not just write faster',
      'AI-powered content operations that scale with your business',
    ],
  },
  positioning: {
    category: [
      'AI-Powered Content Marketing Platform',
      'Intelligent Content Operations Suite',
      'Agent-Based Marketing Intelligence',
    ],
    uniqueAngle: [
      'The only platform that combines strategic intelligence with content creation',
      'Agent-orchestrated workflows that replace entire content teams',
      'Always-on research that keeps you ahead of market trends',
    ],
  },
};

// Mock Profile Data (from onboarding)
export const mockPersonalProfile = {
  id: 'profile-personal',
  name: 'Sarah Chen',
  title: 'VP of Marketing',
  company: 'ContentQ',
  linkedin: 'https://linkedin.com/in/sarahchen',
  bio: 'Marketing leader with 10+ years building content strategies for B2B SaaS companies. Passionate about leveraging AI to scale content operations.',
  expertise: ['Content Strategy', 'B2B Marketing', 'AI Marketing', 'Growth Marketing'],
  contentFocus: ['Thought Leadership', 'Industry Insights', 'Best Practices'],
  tone: 'Professional yet approachable, data-driven with storytelling',
};

export const mockCompanyProfile = {
  id: 'profile-company',
  name: 'ContentQ',
  website: 'https://contentq.io',
  industry: 'Marketing Technology',
  size: '50-100 employees',
  description: 'ContentQ is an AI-powered content marketing platform that helps B2B companies create better content faster through intelligent agent orchestration.',
  targetMarket: 'B2B SaaS companies with 50-500 employees',
  differentiators: [
    'Agent-based AI architecture',
    'Always-on market intelligence',
    'Strategic content planning',
    'Built-in AEO/SEO optimization',
  ],
  products: [
    {
      name: 'Content Studio',
      description: 'AI-powered content creation with multi-agent workflows',
    },
    {
      name: 'Strategy Room',
      description: 'Foundation strategy and playbook builder',
    },
    {
      name: 'Research Desk',
      description: 'Always-on competitive and market intelligence',
    },
  ],
};
