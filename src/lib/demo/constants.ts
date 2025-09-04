// Demo Constants and Static Values

export const DEMO_ROUTES = {
  DASHBOARD: '/demo/dashboard',
  INSIGHTS: '/demo/insights',
  CONTENT_STUDIO: '/demo/content-studio',
  CONTENT_CREATE: '/demo/content-studio/create',
  CONTENT_IMPROVE: '/demo/content-studio/improve',
  ANALYTICS: '/demo/analytics',
  CALENDAR: '/demo/calendar',
} as const;

export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#8b5cf6',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  gradient: {
    blue: 'from-blue-500 to-purple-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-pink-600',
  },
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.1 } },
    },
    item: {
      initial: { y: 10, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
  },
} as const;

export const METRIC_FORMATS = {
  number: (value: number) => new Intl.NumberFormat('en-US').format(value),
  currency: (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value),
  percentage: (value: number) => `${value}%`,
  decimal: (value: number, decimals: number = 1) => value.toFixed(decimals),
  compact: (value: number) => new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value),
} as const;

export const CONTENT_STAGES = {
  CREATE: ['Input', 'Angles', 'Brief', 'Draft', 'Refine'],
  IMPROVE: ['Import', 'Analysis', 'Enhancement', 'Regeneration', 'Polish'],
} as const;

export const INSIGHT_TYPES = {
  COMPETITOR_CONTENT: 'competitor_content',
  TRENDING_TOPICS: 'trending_topics',
  PERFORMANCE: 'performance',
  CONTENT_PATTERN: 'content_pattern',
  KEYWORD_OPPORTUNITY: 'keyword_opportunity',
} as const;

export const PRIORITY_LEVELS = {
  HIGH: { label: 'High', color: 'red', icon: '🔴' },
  MEDIUM: { label: 'Medium', color: 'yellow', icon: '🟡' },
  LOW: { label: 'Low', color: 'green', icon: '🟢' },
} as const;

export const DEMO_MESSAGES = {
  loading: {
    dashboard: 'Loading your content intelligence dashboard...',
    insights: 'Gathering market intelligence...',
    contentStudio: 'Preparing content creation tools...',
    analytics: 'Analyzing performance data...',
    calendar: 'Loading content calendar...',
  },
  success: {
    saved: 'Changes saved successfully',
    published: 'Content published successfully',
    scheduled: 'Content scheduled for optimal impact',
    uploaded: 'Document uploaded successfully',
  },
  error: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    validation: 'Please check your input and try again.',
  },
  empty: {
    noData: 'No data available',
    noContent: 'No content to display',
    noResults: 'No results found',
  },
} as const;

export const KEYBOARD_SHORTCUTS = {
  RESET: 'cmd+shift+r',
  PAUSE: 'space',
  NEXT_SECTION: 'cmd+right',
  PREV_SECTION: 'cmd+left',
  JUMP_TO_DASHBOARD: '1',
  JUMP_TO_INSIGHTS: '2',
  JUMP_TO_CONTENT: '3',
  JUMP_TO_ANALYTICS: '4',
  JUMP_TO_CALENDAR: '5',
} as const;

