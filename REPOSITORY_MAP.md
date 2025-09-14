# Repository Map - KiwiQ Demo (entelligence_ai branch)

## 🏗️ Repository Overview

This is a **Next.js 15.5.2** demo application showcasing KiwiQ's enterprise content creation and management platform. The project features an ultra-advanced AI assistant system with comprehensive UI automation capabilities.

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.2 (with Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide icons
- **State Management**: Zustand
- **AI Features**: Custom-built AI assistant with advanced NLP algorithms
- **Markdown Editor**: @uiw/react-md-editor
- **Build Tool**: Turbopack (for faster builds)

## 📁 Repository Structure

```
demo-contentq/
├── 📄 Configuration Files
│   ├── package.json              # Node.js dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration (ES2017 target)
│   ├── next.config.ts           # Next.js configuration
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── postcss.config.mjs       # PostCSS configuration
│   └── eslint.config.mjs        # ESLint configuration
│
├── 📚 Documentation
│   ├── README.md                         # Main project documentation
│   ├── AI_ASSISTANT_DOCUMENTATION.md     # AI system documentation
│   ├── AI_ASSISTANT_100K_DEMO.md        # AI capabilities demo
│   ├── ULTRA_ADVANCED_AI_SYSTEM.md      # Advanced AI algorithms (1M+ actions)
│   ├── AMAZING_AI_FRONTEND_INTEGRATION.md # Frontend AI integration
│   ├── UI_AUTOMATION_COMPLETE.md         # UI automation documentation
│   ├── TEST_AI_COMMANDS.md              # AI command testing guide
│   ├── REFACTORING_SUMMARY.md           # Code refactoring notes
│   └── DEMO_CREDENTIALS.md              # Demo login credentials
│
├── 🎨 public/                   # Static assets
│   └── SVG icons (file, globe, next, vercel, window)
│
└── 💻 src/                      # Source code
    ├── app/                     # Next.js App Router pages
    │   ├── demo/               # Main demo application
    │   │   ├── dashboard/      # Dashboard page
    │   │   ├── content-studio/ # Content creation module
    │   │   │   ├── calendar/   # Content calendar
    │   │   │   ├── create/     # Content creation workflows
    │   │   │   ├── document/   # Document viewer
    │   │   │   ├── edit/       # Document editor
    │   │   │   └── improve/    # Content improvement
    │   │   ├── analytics/      # Analytics dashboard
    │   │   ├── assets/         # Asset management
    │   │   ├── diagnostics/    # Performance diagnostics
    │   │   ├── insights/       # AI-powered insights
    │   │   ├── playbook/       # Strategic planning
    │   │   ├── settings/       # User settings
    │   │   ├── login/          # Authentication
    │   │   ├── layout.tsx      # Demo layout wrapper
    │   │   └── providers.tsx   # Context providers
    │   ├── globals.css         # Global styles
    │   └── layout.tsx          # Root layout
    │
    ├── components/             # React components
    │   ├── auth/              # Authentication components
    │   ├── demo/              # Demo-specific components
    │   │   ├── AiAssistant.tsx
    │   │   ├── GlobalAiAssistant.tsx
    │   │   ├── content-studio/
    │   │   └── insights/
    │   ├── layout/            # Layout components
    │   └── ui/                # Reusable UI components
    │
    ├── hooks/                 # Custom React hooks
    │   ├── useKeyboardShortcuts.tsx
    │   └── useRegisterUIState.tsx
    │
    ├── lib/                   # Core libraries and utilities
    │   ├── ai-assistant/      # AI Assistant system
    │   │   ├── action-executor.ts      # Action execution engine
    │   │   ├── advanced-matcher.ts     # NLP matching algorithms
    │   │   ├── command-generator.ts    # Command generation
    │   │   ├── ui-context.tsx          # UI state context
    │   │   ├── ui-controller.ts        # UI control logic
    │   │   └── ultra-advanced-algorithms.ts # Advanced AI algorithms
    │   ├── auth/              # Authentication logic
    │   ├── demo/              # Demo utilities
    │   └── stores/            # Zustand stores
    │
    └── usableclientdata/      # Static data and configurations
        ├── navigation.json     # Navigation structure
        ├── ai-assistant/      # AI action definitions
        ├── auth/              # Demo credentials
        ├── content-studio/    # Content templates
        └── data/              # Module-specific mock data
```

## 🌟 Key Features & Modules

### 1. AI Assistant System (Global Feature)
- **1,000,000+ possible UI actions**
- **12+ advanced algorithms** including:
  - BERT-like embeddings
  - Transformer architecture
  - Fuzzy matching
  - Context-aware command execution
- **Natural language processing** for intuitive commands
- **Keyboard shortcut**: `Cmd/Ctrl + K`
- **File location**: `src/lib/ai-assistant/`

### 2. Content Studio
- **5-stage AI-powered content creation workflow**
  1. Ideation
  2. Research
  3. Creation
  4. Optimization
  5. Publishing
- **Content calendar** with drag-and-drop scheduling
- **Document management** with grid/list views
- **Multi-platform support**: Blog and LinkedIn content
- **File location**: `src/app/demo/content-studio/`

### 3. Dashboard
- **Real-time metrics overview**
- **Content performance statistics**
- **Quick action buttons**
- **Recent activity tracking**
- **AI-powered tips & recommendations**
- **File location**: `src/app/demo/dashboard/`

### 4. Analytics & Insights
- **Performance tracking dashboards**
- **AI-powered insights feed**
- **Data visualization components**
- **Trend analysis**
- **File locations**: 
  - Analytics: `src/app/demo/analytics/`
  - Insights: `src/app/demo/insights/`

### 5. Additional Modules
- **Diagnostics**: Performance analysis and optimization recommendations
- **Playbook**: Strategic content planning and templates
- **Assets**: Multi-asset management (blogs, LinkedIn profiles, etc.)
- **Settings**: Comprehensive configuration options

## 🔐 Architecture Patterns

### Provider Pattern
- Multiple context providers for state management
- Global AI assistant context
- Authentication context
- UI state management

### Protected Routes
- Authentication wrapper for secure pages
- Role-based access control (simulated)
- Redirect logic for unauthorized access

### Modular Structure
- Feature-based organization
- Shared components library
- Reusable hooks
- Centralized utilities

### Static Data Architecture
- JSON-based mock data for demo purposes
- Type-safe data structures
- Easy-to-modify content templates

### Component Library
- Reusable UI components
- Consistent styling with Tailwind CSS
- Accessibility considerations
- Responsive design patterns

## 📝 Demo Limitations

- **Data**: All data is static/mocked (no real API calls)
- **AI Responses**: Pre-generated responses for demo purposes
- **File Uploads**: Simulated file handling
- **Real-time Features**: Use timers instead of websockets
- **External Integrations**: Show sample data only
- **Authentication**: Simple demo login (no real auth)

## 🚀 Development Commands

```bash
# Development
npm run dev      # Start development server with Turbopack

# Production
npm run build    # Build for production with Turbopack
npm run start    # Start production server

# Code Quality
npm run lint     # Run ESLint
```

## 🔑 Key Files to Review

1. **AI System Core**: `src/lib/ai-assistant/ultra-advanced-algorithms.ts`
2. **Global AI Assistant**: `src/components/demo/GlobalAiAssistant.tsx`
3. **Main Layout**: `src/app/demo/layout.tsx`
4. **Navigation Config**: `src/usableclientdata/navigation.json`
5. **Demo Providers**: `src/app/demo/providers.tsx`

## 📈 Performance Optimizations

- Turbopack for faster builds and HMR
- Lazy loading for heavy components
- Optimized bundle splitting
- Static generation where possible
- Efficient state management with Zustand

## 🎯 Future Considerations

This demo showcases the potential of an AI-powered content management system. In a production environment, the following would be implemented:
- Real API integrations
- Database persistence
- Advanced security measures
- Scalable infrastructure
- Real-time collaboration features
- Extended AI capabilities with ML models

---

The repository demonstrates a sophisticated enterprise content management platform with an emphasis on AI-powered features and a clean, modular architecture built on modern Next.js patterns.