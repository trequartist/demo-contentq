/**
 * KiwiQ Demo Configuration
 * Based on real diagnostic and playbook data
 */

export const DEMO_CONFIG = {
  // Real metrics from diagnostic report
  AUTHORITY_SCORE: 65.8,
  AI_VISIBILITY: 78.5,
  CONTENT_VELOCITY: 3, // posts/month vs Zapier's 32
  ZAPIER_DOMINANCE: 85, // % market share
  MISSED_SEARCHES: 8100, // "Zapier too expensive" monthly searches
  OPPORTUNITY_VALUE: 50, // $50M+ opportunity from playbook
  
  // Competitive data from diagnostic
  COMPETITORS: {
    zapier: { authority: 94.2, velocity: 32, visibility: 85 },
    make: { authority: 67.3, velocity: 18, visibility: 45 },
    n8n: { authority: 45.8, velocity: 10, visibility: 30 },
    gumloop: { authority: 65.8, velocity: 3, visibility: 78.5 }
  },

  // Strategic plays from playbook
  PLAYS: {
    migrationAccelerator: {
      effort: 60,
      opportunity: 8100, // monthly searches
      impact: "high",
      description: "Capture the 30-40% of users hitting Zapier's $299/month wall"
    },
    aiNativeAuthority: {
      effort: 40,
      opportunity: 4400, // monthly searches
      impact: "high", 
      description: "Define and own the 'AI-native automation' category"
    },
    transparencyAdvantage: {
      effort: 30,
      opportunity: 2100,
      impact: "medium",
      description: "Differentiate through radical pricing transparency"
    }
  },

  // Real content from "When Rules Break" article
  SAMPLE_CONTENT: {
    title: "When Rules Break: How AI Handles the 40% of Workflows Traditional Automation Can't",
    wordCount: 2847,
    readingTime: 11,
    seoScore: 92,
    readabilityScore: 78
  },

  // Demo user from diagnostic context
  USER: {
    name: "Max",
    role: "Founder CEO", 
    company: "Gumloop",
    avatar: "/demo/max-avatar.jpg"
  },

  // Animation timings
  ANIMATIONS: {
    PAGE_TRANSITION: 300,
    WORKFLOW_STEP: 500,
    STREAMING_TEXT: 50, // chars per second
    PROGRESS_UPDATE: 1000,
    MOCK_PROCESSING: 2000
  },

  // WebSocket events for real-time updates
  WEBSOCKET_EVENTS: {
    DIAGNOSTIC_PROGRESS: 'diagnostic:progress',
    PLAYBOOK_GENERATED: 'playbook:generated', 
    CONTENT_STREAMING: 'content:streaming',
    WORKFLOW_COMPLETE: 'workflow:complete'
  }
} as const;

export type DemoConfig = typeof DEMO_CONFIG;
