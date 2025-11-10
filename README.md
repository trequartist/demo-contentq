# ContentQ Demo - AI-Powered Marketing Platform

A sophisticated demo showcasing an AI-powered marketing platform that orchestrates specialized agents to handle strategic planning, content creation, research intelligence, and knowledge management.

## 🎯 What is ContentQ?

ContentQ is an **AI-native marketing platform** that demonstrates how multiple AI agents can work together to handle the entire content marketing lifecycle—from strategic foundation to published content. This is a **frontend-heavy demo** designed to showcase the user experience and agent orchestration patterns.

### Key Innovation: Multi-Agent Orchestration

Unlike single-purpose AI tools, ContentQ simulates a **team of specialized AI agents** working together:
- **Research Agent** - Monitors competitors, trends, and customer conversations
- **Strategist Agent** - Builds foundations and playbooks
- **Copywriter Agent** - Generates content drafts
- **Editor Agent** - Refines and optimizes content
- **Analyst Agent** - Scores content and provides insights

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: FastAPI + Python (minimal - demo is frontend-heavy)
- **Database**: MongoDB (for basic data persistence)
- **State Management**: Zustand
- **UI**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM

### Design Philosophy
- **Demo-First Thinking**: Everything is optimized for impressive demos
- **Simulated Sophistication**: Mock data and setTimeout create believable AI behavior
- **Self-Contained**: Minimal backend dependencies, works out-of-the-box
- **Modern Aesthetic**: Black & white design with generous spacing

---

## 📦 Four Core Modules

### 1. Content Studio (`/studio`)
**Purpose**: Content creation workflows with AI assistance

**Features**:
- Multi-step workflows for different content types (Blog, LinkedIn)
- AI-powered content brief generation
- Real-time content scoring (SEO/AEO, Algorithm Optimization)
- Inline editor with AI suggestions
- "Send to Brain" - Save drafts to knowledge base

**User Flow**:
```
Select Workflow → Input Topic → AI Generates Brief → 
Approve/Edit → AI Writes Draft → Edit in Rich Editor → 
View Content Score → Publish or Save to Brain
```

**Key Capabilities**:
- Simulated multi-stage agent processing
- Context from other modules (Research findings, Playbooks, Calendar)
- Real-time content quality scoring
- Rich text editing with formatting

---

### 2. Strategy Room (`/strategy`)
**Purpose**: Strategic foundation and content playbook creation

**Features**:
- **Foundation Tab**: Define target customer, messaging hierarchy, positioning
- **Playbooks Tab**: 14+ content plays organized by category
  - Thought Leadership, Product-Led Growth, Customer Stories, etc.
  - Each play shows difficulty, time-to-value, recommendation
- **Calendar Tab**: Content calendar with scheduled items
  - View by date, click to create content
  - Visual indicators for scheduled dates
- **Campaigns Tab**: Campaign management (placeholder)

**User Flow**:
```
Quick Onboard (Optional) → Build Foundation Strategy → 
Generate Playbooks → Select Play → View Content Pillars → 
Click Topic → Navigate to Studio with Context
```

**Key Capabilities**:
- Strategic AI recommendations
- Playbook wizard with 14 pre-built plays
- Calendar integration (click item → create content)
- Foundation → Content alignment

---

### 3. Research Desk (`/research`)
**Purpose**: Always-on intelligence and commissioned research

**Features**:
- **Always-On Intelligence**: 3 continuous research streams
  - Competitor Monitoring
  - Industry Trends
  - Customer Conversations
- **Research Reports**: Commissioned deep-dive reports
  - Initial Diagnostics
  - Quarterly Deep-Dive
  - Competitive Intelligence
- **Stream Explorer**: Dive into findings, ask questions
- **Report Builder**: Commission new reports with simulated agent work

**User Flow**:
```
View Active Streams → Explore Stream → Review Findings → 
Create Content from Finding → OR Commission New Report → 
Watch Agent Progress → Download Report
```

**Key Capabilities**:
- Simulated continuous monitoring
- Finding cards with importance levels
- "Create Content" from any finding
- Multi-agent report generation simulation

---

### 4. Marketing Brain (`/brain`)
**Purpose**: Centralized knowledge base for all marketing content

**Features**:
- **Document Library**: 12+ mock documents organized by category
  - Strategic Foundation
  - Content Strategy
  - Product Knowledge
  - Market Intelligence
  - Brand Assets
- **Smart Search & Filtering**: Filter by category, active/inactive status
- **Document Details**: View insights, usage tracking, relevance scores
- **Upload Simulation**: Multi-stage AI processing of new documents
- **Cross-Module Context**: See where documents are used

**User Flow**:
```
View Documents by Category → Click Document → View Details & Insights → 
"Use in Content" → Navigate to Studio with Context → 
OR Upload New Document → Watch AI Processing
```

**Key Capabilities**:
- Document metadata with AI insights
- Usage tracking across modules
- "Used In" indicators showing cross-references
- Upload with simulated extraction/categorization

---

## 🔄 Cross-Module Flows

The demo's power comes from **seamless context passing** between modules:

### 1. Research → Studio
```
Click "Create Content" on finding → Studio opens with research context → 
Topic pre-filled → Research data available in sidebar
```

### 2. Brain → Studio
```
Click "Use in Content" on document → Studio opens with document context → 
Document summary available → References maintained
```

### 3. Calendar → Studio
```
Click calendar item → Studio opens with scheduled content context → 
Date and type pre-set → Ready to create
```

### 4. Strategy → Studio
```
Click topic in playbook → Studio opens with strategic context → 
Playbook pillars visible → Aligned content creation
```

### 5. Editor → Brain
```
Click "Send to Brain" in editor → Content saved as document → 
Auto-generates summary → Available for future reference
```

**Result**: Every module can initiate content creation with full context preservation.

---

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000) - Authority and premium
- **Background**: #F7F7F8 - Subtle gray for depth
- **Cards**: Pure white (#FFFFFF)
- **Borders**: Gray-200 (#E5E7EB)
- **Text**: Gray-900 (primary), Gray-600 (secondary)

### Typography
- **Headings**: text-3xl (30px), text-2xl (24px), text-xl (20px)
- **Body**: text-sm (14px)
- **Labels**: text-xs (12px) uppercase
- **Font**: System fonts (Inter fallback)

### Spacing Scale
- **Page padding**: px-8 py-12
- **Grid gaps**: gap-8
- **Section spacing**: space-y-12
- **Card padding**: p-8
- **Philosophy**: Generous white space = premium feel

### Components
- **Buttons**: Black primary, outline secondary
- **Cards**: White with gray-200 border, rounded-xl
- **Tabs**: Pill-style with black active state
- **Inputs**: Gray-300 border with black focus ring

---

## 🎭 Agent Status Indicator

**Location**: Floating card, bottom-right corner

**Behavior**:
- Only visible when agents are active
- Shows colored dots for each agent type:
  - 🔵 Research - Blue
  - 🟣 Strategist - Purple  
  - ⚫ Copywriter - Black
  - 🟠 Editor - Orange
  - 🌸 Analyst - Pink
- Minimal, non-intrusive design
- Click to expand for more details

---

## ⌨️ Keyboard Shortcuts

- **Ctrl+K** (or Cmd+K): Open command palette
  - Quick navigation to any page
  - Start workflows instantly
  - Access recent documents
- **Esc**: Close modals/dialogs

---

## 🎬 Demo Scenarios

### Scenario 1: New Company Onboarding
```
1. Visit Strategy Room
2. Click "Quick Onboard"
3. Answer 3 questions
4. AI generates foundation strategy
5. Generate playbooks
6. Navigate to Calendar
7. Schedule content
8. Create first piece from calendar
```

### Scenario 2: Research-Driven Content
```
1. Visit Research Desk
2. Review Competitor Monitoring stream
3. Click "Explore Stream"
4. Find interesting insight
5. Click "Create Content"
6. Studio opens with research context
7. Complete workflow
8. View content score
```

### Scenario 3: Strategic Content Creation
```
1. Visit Strategy Room
2. Review Thought Leadership playbook
3. Click on a content pillar topic
4. Studio opens with strategic context
5. AI generates brief aligned with strategy
6. Create content
7. Send to Brain for future reference
```

---

## 📊 Mock Data

The demo includes rich mock data to show active usage:

### Documents (12 total)
- Company Profile & Mission
- Brand Guidelines
- Target Audience Research
- Content Strategy 2025
- SEO Keyword Strategy
- Product Documentation
- Customer Case Studies
- Competitive Analysis
- Industry Trends Report 2025

### Research Findings (15+ across 3 streams)
- Competitor pricing changes
- Industry trend shifts
- Customer feedback patterns

### Calendar Items (18 scheduled)
- Blog posts, LinkedIn posts, emails
- Spread across current month
- Various campaigns and topics

### Playbooks (14 content plays)
- Organized by category
- Includes difficulty, time-to-value
- Each with 3-5 content pillars

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)
- Yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd contentq-demo
```

2. **Install frontend dependencies**
```bash
cd frontend
yarn install
```

3. **Install backend dependencies**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **Set up environment variables**

Frontend `.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8001/api
```

Backend `.env`:
```env
MONGO_URL=mongodb://localhost:27017/contentq
```

5. **Start the application**

Using supervisor (recommended):
```bash
sudo supervisorctl restart all
```

Or manually:
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8001

# Terminal 2 - Frontend
cd frontend
yarn dev
```

6. **Access the demo**
```
http://localhost:3000
```

---

## 🎯 Key Demo Talking Points

### For Technical Audiences
- Multi-agent orchestration patterns
- Simulated async processing with setTimeout
- Context preservation across modules
- Zustand for lightweight state management
- Component composition patterns

### For Business Audiences
- AI agents handle entire content lifecycle
- Strategic foundation drives all content
- Always-on research intelligence
- Centralized knowledge base
- Seamless cross-module workflows

### For Investors
- Demonstrates sophisticated AI orchestration
- Shows clear product vision and UX
- Highlights differentiation from single-purpose tools
- Reveals scalability potential
- Modern, premium design

---

## 🔧 Customization

### Adding New Workflows
1. Define workflow in `/frontend/src/data/workflows.ts`
2. Add stages with types: input, selection, processing, approval
3. Add mock outputs
4. Test in Studio

### Adding New Documents
1. Update `/frontend/src/data/mockData.ts`
2. Add document with category, insights, usage tracking
3. Appears automatically in Brain

### Adding New Research Streams
1. Update `/frontend/src/data/mockData.ts`
2. Add findings with importance levels
3. Configure in Research Desk

### Modifying Agent Behavior
1. Update `/frontend/src/stores/demoStore.ts`
2. Adjust agent activity simulation
3. Modify timing and messages

---

## 📝 Development Notes

### State Management
- **demoStore**: Global demo state (agents, documents, context)
- **workflowStore**: Workflow progression and stages
- Browser session storage for persistence

### Routing
- React Router DOM with nested routes
- Context preservation via state
- Back/forward navigation supported

### Styling
- Tailwind CSS utility-first approach
- Custom components in `/components/ui`
- Design tokens in `index.css`

### Mock Data Philosophy
- Realistic but simplified
- Demonstrates capability without complexity
- Easy to understand and modify

---

## 🎁 What Makes This Demo Special

1. **Believable AI Simulation**: Timing, progress bars, and messaging create real feeling
2. **Context Everywhere**: Every action considers what came before
3. **Cross-Module Intelligence**: Modules work together, not in silos
4. **Premium Design**: Black & white with generous spacing feels expensive
5. **Demo-Ready**: Works immediately, no complex setup
6. **Extensible**: Easy to add workflows, documents, research streams

---

## 📚 Learn More

### Key Files to Understand
- `/frontend/src/pages/Studio.tsx` - Content creation flow
- `/frontend/src/stores/workflowStore.ts` - Workflow logic
- `/frontend/src/stores/demoStore.ts` - Global demo state
- `/frontend/src/data/mockData.ts` - All mock data
- `/frontend/src/components/workflow/WorkflowContainer.tsx` - Workflow UI

### Design Patterns
- Component composition over inheritance
- Hooks for logic reuse
- Context for cross-cutting concerns
- Controlled components for forms

---

## 🙋 FAQ

**Q: Is the AI real?**  
A: No, this is a demo with simulated AI behavior using mock data and setTimeout. Real integration would connect to LLMs.

**Q: Can I use this in production?**  
A: This is a demo/prototype. You'd need to add real AI integrations, authentication, database persistence, and error handling.

**Q: How do I add my own data?**  
A: Modify the mock data files in `/frontend/src/data/`. They're designed to be easily customizable.

**Q: Can I customize the design?**  
A: Yes! Update the design tokens in `index.css` and component styles in `/components/ui/`.

**Q: Why is it mostly frontend?**  
A: Demo-first approach. The UX and agent orchestration are the key differentiators to demonstrate.

---

**Built to demonstrate the future of AI-powered marketing platforms.**
