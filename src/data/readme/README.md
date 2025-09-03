# KiwiQ Demo Standards & Implementation Guide

## 📚 Overview

This directory contains comprehensive standards, design systems, and demo data for KiwiQ - an enterprise content creation and management platform. Use these resources to build a complete static demo that showcases all product features.

## 🗂️ Directory Structure

```
demo-standards/
├── PRODUCT_FEATURE_STANDARDS.md   # Complete feature specifications
├── UI_DESIGN_STANDARDS.md         # UI/UX design system and guidelines
├── demo-config.json               # Demo configuration and settings
├── demo-data/                     # Static JSON data for demo
│   ├── user-profile.json         # User and organization data
│   ├── assets.json                # Blog and LinkedIn assets
│   ├── content-studio-workflows.json  # Active and historical workflows
│   ├── diagnostics-reports.json  # Performance analysis reports
│   ├── playbooks.json            # Strategic playbooks and plays
│   └── dashboard-analytics.json  # Analytics and metrics
└── README.md                      # This file
```

## 🚀 Quick Start

### 1. Setting Up the Demo Environment

```javascript
// Load demo configuration
import demoConfig from './demo-standards/demo-config.json';

// Load all demo data
import userProfile from './demo-standards/demo-data/user-profile.json';
import assets from './demo-standards/demo-data/assets.json';
import workflows from './demo-standards/demo-data/content-studio-workflows.json';
import diagnostics from './demo-standards/demo-data/diagnostics-reports.json';
import playbooks from './demo-standards/demo-data/playbooks.json';
import analytics from './demo-standards/demo-data/dashboard-analytics.json';

// Initialize demo state
const demoState = {
  config: demoConfig.demo,
  data: {
    user: userProfile.user,
    organization: userProfile.organization,
    assets: assets.assets,
    workflows: workflows.activeWorkflows,
    diagnostics: diagnostics.reports,
    playbooks: playbooks.playbooks,
    analytics: analytics.dashboard
  }
};
```

### 2. Implementing Mock API Endpoints

```javascript
// Example: Mock API handler
class MockAPIHandler {
  constructor(demoData) {
    this.data = demoData;
  }

  // Get user profile
  async getUser() {
    return this.simulateDelay(this.data.user);
  }

  // Get assets
  async getAssets() {
    return this.simulateDelay(this.data.assets);
  }

  // Get active workflows
  async getWorkflows(platform) {
    const filtered = platform 
      ? this.data.workflows.filter(w => w.platform === platform)
      : this.data.workflows;
    return this.simulateDelay(filtered);
  }

  // Simulate network latency
  simulateDelay(data, min = 200, max = 800) {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => 
      setTimeout(() => resolve(data), delay)
    );
  }
}
```

## 📋 Feature Implementation Guide

### Content Studio V2

The Content Studio provides AI-powered content creation workflows:

```javascript
// Workflow stages
const BLOG_WORKFLOW_STAGES = ['input', 'topics', 'brief', 'draft', 'complete'];
const LINKEDIN_WORKFLOW_STAGES = ['input', 'topics', 'brief', 'draft', 'complete'];

// Example: Navigate through workflow
function progressWorkflow(currentStage) {
  const stageIndex = BLOG_WORKFLOW_STAGES.indexOf(currentStage);
  if (stageIndex < BLOG_WORKFLOW_STAGES.length - 1) {
    return BLOG_WORKFLOW_STAGES[stageIndex + 1];
  }
  return currentStage;
}
```

### Diagnostics Module

Diagnostics provide comprehensive performance analysis:

```javascript
// Diagnostic report structure
const diagnosticReport = {
  metrics: {
    overallScore: 78,
    contentQuality: 82,
    seoScore: 75,
    engagement: 71
  },
  recommendations: [
    'Increase content freshness',
    'Optimize for featured snippets',
    'Improve mobile page speed'
  ]
};
```

### Playbook Module

Strategic content planning and execution:

```javascript
// Playbook structure
const playbook = {
  plays: [
    {
      name: 'Thought Leadership Series',
      status: 'active',
      progress: 33,
      metrics: {
        target: { posts: 12, reach: 100000 },
        current: { posts: 4, reach: 42000 }
      }
    }
  ]
};
```

## 🎨 UI Components

### Using the Design System

```jsx
// Import design tokens
import { colors, spacing, typography } from './design-tokens';

// Button component following standards
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const styles = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-white text-gray-700 border border-gray-200',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    xs: 'h-7 px-2.5 text-xs',
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-10 px-5 text-sm',
    lg: 'h-11 px-6 text-base'
  };

  return (
    <button 
      className={`${styles[variant]} ${sizes[size]} rounded-lg font-medium transition-all`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Layout Components

```jsx
// Page layout following standards
const PageLayout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <nav className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Navigation */}
    </nav>
    <div className="flex">
      <aside className="w-280 fixed h-full bg-gray-50 border-r">
        {/* Sidebar */}
      </aside>
      <main className="ml-280 flex-1 p-8 max-w-7xl">
        {children}
      </main>
    </div>
  </div>
);
```

## 🔄 Demo Scenarios

### 1. New User Onboarding
```javascript
const onboardingFlow = [
  { step: 1, action: 'Create organization', data: userProfile.organization },
  { step: 2, action: 'Add first blog asset', data: assets.assets[0] },
  { step: 3, action: 'Complete document update', status: 'complete' },
  { step: 4, action: 'Run diagnostics', data: diagnostics.reports[0] },
  { step: 5, action: 'Generate playbook', data: playbooks.playbooks[0] },
  { step: 6, action: 'Create first content', data: workflows.activeWorkflows[0] }
];
```

### 2. Content Creation Workflow
```javascript
const contentCreationFlow = {
  input: {
    companyName: 'TechCorp Solutions',
    requirements: 'Guide on implementing OKRs in remote teams'
  },
  topics: [
    'The Complete Guide to OKRs for Remote Engineering Teams',
    '5 Common OKR Mistakes Remote Teams Make'
  ],
  brief: {
    outline: ['Introduction', 'Understanding OKRs', 'Best Practices'],
    wordCount: 2000,
    keywords: ['remote OKRs', 'distributed teams']
  },
  draft: {
    content: '# The Complete Guide...',
    aiSuggestions: ['Add examples', 'Include metrics']
  }
};
```

## 📊 Analytics Dashboard

```javascript
// Dashboard metrics structure
const dashboardMetrics = {
  highlights: [
    { metric: 'Content Published', value: 47, change: 23.5 },
    { metric: 'Total Reach', value: 285420, change: 18.2 },
    { metric: 'Engagement Rate', value: 5.8, change: 0.9 }
  ],
  charts: {
    traffic: { type: 'line', data: [...] },
    engagement: { type: 'bar', data: [...] },
    conversion: { type: 'funnel', data: [...] }
  }
};
```

## 🔌 Integrations (Mocked)

```javascript
// Mock integration responses
const mockIntegrations = {
  googleAnalytics: {
    status: 'connected',
    lastSync: '2024-03-10T08:00:00Z',
    data: { sessions: 45320, users: 28900 }
  },
  linkedin: {
    status: 'connected',
    lastSync: '2024-03-10T09:30:00Z',
    data: { followers: 8420, engagement: 5.8 }
  },
  wordpress: {
    status: 'connected',
    lastSync: '2024-03-10T07:45:00Z',
    data: { published: 47, scheduled: 12 }
  }
};
```

## 🎯 Key Features to Demonstrate

### Must-Have Features
- ✅ Content creation workflows (Blog & LinkedIn)
- ✅ AI-powered topic suggestions
- ✅ Brief and draft generation
- ✅ Diagnostic reports with insights
- ✅ Strategic playbook generation
- ✅ Analytics dashboard
- ✅ Asset management
- ✅ Content calendar

### Nice-to-Have Features
- 📅 Real-time collaboration (simulated)
- 📊 Advanced analytics with custom reports
- 🔄 Workflow automation
- 📱 Mobile responsive design
- 🌐 Multi-language support (future)

## 🛠️ Development Tips

### 1. State Management
```javascript
// Use React Context or Redux for demo state
const DemoContext = createContext({
  user: null,
  assets: [],
  workflows: [],
  diagnostics: [],
  playbooks: [],
  analytics: {}
});

// Provider component
const DemoProvider = ({ children }) => {
  const [state, setState] = useState(demoState);
  
  return (
    <DemoContext.Provider value={state}>
      {children}
    </DemoContext.Provider>
  );
};
```

### 2. Routing
```javascript
// Demo routes
const demoRoutes = [
  { path: '/', component: Dashboard },
  { path: '/content-studio', component: ContentStudio },
  { path: '/content-studio/:workflow', component: WorkflowPage },
  { path: '/diagnostics', component: Diagnostics },
  { path: '/playbook', component: Playbook },
  { path: '/assets', component: Assets },
  { path: '/analytics', component: Analytics }
];
```

### 3. Mock WebSocket for Real-time Updates
```javascript
// Simulate real-time updates
class MockWebSocket {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  simulateUpdate(event, data) {
    setTimeout(() => {
      if (this.listeners[event]) {
        this.listeners[event](data);
      }
    }, Math.random() * 3000);
  }
}

// Usage
const ws = new MockWebSocket();
ws.on('workflow:progress', (data) => {
  console.log('Workflow progress:', data);
});
ws.simulateUpdate('workflow:progress', { stage: 'draft', progress: 60 });
```

## 🧪 Testing the Demo

### Checklist
- [ ] User can log in with demo credentials
- [ ] Dashboard shows all metrics and charts
- [ ] Content creation workflow completes all stages
- [ ] Diagnostics reports display correctly
- [ ] Playbooks show strategic recommendations
- [ ] Assets can be viewed and managed
- [ ] Navigation between features works smoothly
- [ ] Loading states and animations work
- [ ] Error states are handled gracefully
- [ ] Responsive design works on all screen sizes

## 📝 Notes

### Demo Limitations
- This is a static demo with pre-generated data
- AI responses are mocked, not generated in real-time
- External integrations show sample data only
- File uploads are simulated
- Real-time collaboration is simulated

### Best Practices
1. Always show loading states for async operations
2. Include helpful tooltips and guided tours
3. Provide sample data that tells a story
4. Make the demo interactive, not just viewable
5. Include both success and error scenarios
6. Show progressive disclosure of features
7. Maintain consistent design patterns

## 🤝 Support

For questions about implementing the demo:
- Review the Product Feature Standards document
- Check the UI Design Standards for component guidelines
- Refer to the demo data files for data structure
- Contact the development team for clarifications

## 📄 License

This demo and its associated standards are proprietary to KiwiQ.
© 2024 KiwiQ. All rights reserved.
