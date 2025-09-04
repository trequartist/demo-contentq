// Demo Configuration Settings

export const DEMO_CONFIG = {
  // Timing settings (in milliseconds)
  timing: {
    pageTransition: 300,
    cardAnimation: 200,
    streamingText: 50, // chars per second
    numberCounter: 1500,
    autoProgressDelay: 3000,
    mockWebSocketDelay: 2000,
    feedUpdateInterval: 8000,
    chartDrawDuration: 1000,
  },

  // Animation settings
  animations: {
    defaultEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    staggerDelay: 100,
    fadeInDuration: 400,
    slideInDistance: '20px',
  },

  // Demo flow
  flow: {
    totalSteps: 25,
    sections: [
      { name: 'Dashboard', steps: [1, 2, 3, 4] },
      { name: 'Insights Hub', steps: [5, 6, 7] },
      { name: 'Content Studio', steps: [8, 9, 10, 11, 12] },
      { name: 'Analytics', steps: [13, 14, 15] },
      { name: 'Calendar', steps: [16, 17] },
    ],
    optimalDuration: 13 * 60 * 1000, // 13 minutes
  },

  // Feature flags
  features: {
    enableWebSocket: true,
    enableAnimations: true,
    enableAutoSave: true,
    enableKeyboardShortcuts: true,
    enablePresenterMode: true,
  },

  // Mock data settings
  mockData: {
    refreshInterval: 30000, // 30 seconds
    historyMonths: 2,
    futureMonths: 1,
    maxContentItems: 50,
    maxInsights: 20,
  },

  // Performance thresholds
  performance: {
    targetFPS: 60,
    maxBundleSize: 500 * 1024, // 500KB
    initialLoadTarget: 500, // ms
    transitionTarget: 200, // ms
  },

  // Customization via URL params
  urlParams: {
    company: 'company',
    industry: 'industry',
    name: 'name',
    presenter: 'presenter',
    safe: 'safe', // Disable animations
    reset: 'reset',
    step: 'step',
  },
};

export const getConfig = (key: keyof typeof DEMO_CONFIG) => {
  return DEMO_CONFIG[key];
};

export const getTimingValue = (key: keyof typeof DEMO_CONFIG.timing, speedMultiplier: number = 1) => {
  return DEMO_CONFIG.timing[key] / speedMultiplier;
};

