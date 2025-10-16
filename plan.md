<!-- 43b03537-ac8a-4250-9f58-2f13601b1e7f c448af23-350c-4ee7-b59d-73e49d657bdb -->
# Creator Module — Modern Redesign & Implementation

## Goals

- Single `/demo/creator` route with **3 explicit tabs**: Diagnostics, Playbook, Posts (Content Studio)
- Shared left chat panel that adapts quick actions per tab
- Modern aesthetic: black/white/blue palette, curved edges, smooth animations
- Empty states → streaming → intermediate steps → final output
- All JSON-driven with clear state management

## UI/UX Design

### Layout Structure

- **Single route**: `/demo/creator` (remove separate `/diagnostics`, `/playbook`, `/content` routes)
- **Top bar**: Logo + tab switcher (Diagnostics | Playbook | Posts) + user menu
- **Left panel** (340px): Chat interface with tab-specific quick actions
- **Right panel** (flex): Preview/output area with state-based rendering

### Color Palette & Styling

- Primary: `#000000` (black), `#FFFFFF` (white), `#3B82F6` (blue-500)
- Accents: `#1E40AF` (blue-800), `#93C5FD` (blue-300)
- Borders: `rounded-2xl`, `rounded-xl` for cards
- Shadows: `shadow-lg`, `shadow-sm` for depth
- Transitions: `transition-all duration-300 ease-in-out`

### State Flow per Tab

#### Diagnostics Tab

1. **Empty State**: "No diagnostics created yet" + CTA button
2. **Creation Prompt**: User clicks "Create Diagnostics" → chat shows quick actions
3. **Streaming**: Show typewriter effect as assistant responds
4. **Processing**: "Analyzing system..." with animated progress
5. **Results**: Beautiful cards for ExecutiveSummary, Issues, Recommendations, Metrics

#### Playbook Tab

1. **Empty State**: "No playbook generated" + CTA
2. **Creation**: User selects scenario or types request
3. **Streaming**: Steps appear one by one with animation
4. **Final**: Playbook card with expandable steps, time estimates, severity badges

#### Posts Tab (Content Studio)

1. **Empty State**: "Start creating content" + workflow options
2. **Brief Generation**: Show content brief card with topic, audience, structure
3. **Intermediate Steps**: 

   - Research phase (animated)
   - Outline generation
   - Draft sections (streaming)

4. **Final Draft**: Rich editor preview with formatting, edit capabilities

## Technical Architecture

### Routes

- `/demo/creator` — unified creator page with tab state
- Remove: `/demo/creator/{diagnostics,playbook,content}`
- Redirects: legacy routes → `/demo/creator?tab={diagnostics|playbook|posts}`

### Data Structure

#### State Management

```typescript
type CreatorTab = 'diagnostics' | 'playbook' | 'posts';
type OutputState = 'empty' | 'streaming' | 'processing' | 'complete';

interface CreatorState {
  activeTab: CreatorTab;
  sessions: {
    diagnostics: SessionData;
    playbook: SessionData;
    posts: SessionData;
  };
}

interface SessionData {
  messages: ChatMessage[];
  outputState: OutputState;
  output: DiagnosticsOutput | PlaybookOutput | PostOutput | null;
  intermediateSteps: IntermediateStep[];
}
```

#### JSON Data Sources

- **Diagnostics**: `usableclientdata/data/diagnostics/diagnostics-gumloop-v2.json`
- **Playbook**: `usableclientdata/data/playbook/playbook-gumloop.json`
- **Posts**: `usableclientdata/content-studio/gumloop-content-data.json`

### Component Structure

```
src/app/demo/creator/
  └── page.tsx (unified creator)

src/components/demo/creator/
  ├── CreatorShell.tsx (main layout with tabs)
  ├── TabSwitcher.tsx (modern tab UI)
  ├── ChatPanel.tsx (adaptive left panel)
  ├── OutputPanel.tsx (right panel router)
  │
  ├── diagnostics/
  │   ├── DiagnosticsEmpty.tsx
  │   ├── DiagnosticsStreaming.tsx
  │   ├── DiagnosticsOutput.tsx (sections, cards)
  │
  ├── playbook/
  │   ├── PlaybookEmpty.tsx
  │   ├── PlaybookStreaming.tsx
  │   ├── PlaybookOutput.tsx
  │
  └── posts/
      ├── PostsEmpty.tsx
      ├── PostsStreaming.tsx (with intermediate steps)
      ├── PostsBrief.tsx
      └── PostsEditor.tsx (final draft)
```

## Implementation Steps

### Phase 1: Unified Route & Layout

1. Create `/demo/creator/page.tsx` with tab state management
2. Build `CreatorShell` with modern top bar + tab switcher
3. Implement `ChatPanel` with tab-aware quick actions
4. Create `OutputPanel` that routes to tab-specific components

### Phase 2: Empty & Streaming States

5. Build empty state components for each tab (beautiful illustrations/icons)
6. Implement streaming message simulation with typewriter effect
7. Add loading/processing states with animated spinners

### Phase 3: Tab-Specific Outputs

#### Diagnostics

8. Parse `diagnostics-gumloop-v2.json` structure
9. Build card-based output with sections:

   - Executive Summary (score, key findings)
   - Issues List (severity badges, descriptions)
   - Recommendations (actionable items)
   - Charts/metrics (if data available)

#### Playbook

10. Parse `playbook-gumloop.json`
11. Build step-by-step playbook cards
12. Add collapsible details, time estimates, priority labels

#### Posts (Content Studio)

13. Parse `gumloop-content-data.json`
14. Create intermediate step visualization:

    - Brief card
    - Research notes
    - Outline
    - Section drafts (streaming)

15. Integrate rich text editor for final draft

### Phase 4: Interactions & Animations

16. Add smooth tab transitions (fade + slide)
17. Implement scroll-linked animations for cards
18. Add hover states and micro-interactions
19. Polish loading states and progress indicators

### Phase 5: Polish & QA

20. Refine color palette and spacing
21. Add dark mode support (optional)
22. Test all JSON data mappings
23. Verify streaming and state transitions
24. Accessibility audit (keyboard nav, ARIA labels)

## Acceptance Criteria

### Functional

- [x] Single `/demo/creator` route with 3 tabs
- [x] Tab switching preserves session state
- [x] Empty states show clear CTAs
- [x] Streaming messages animate smoothly
- [x] All JSON data renders correctly
- [x] Intermediate steps visible for Posts
- [x] Editor integrated for final drafts
- [x] Diagnostics has 8 tabbed sections (not stacked)
- [x] Playbook has dynamic tabbed sections
- [x] Scrolling works in all preview panels
- [x] Rich markdown editor with formatting toolbar
- [x] AI Assistant and SEO panels integrated
- [x] Calendar and Documents integration

### Design

- [x] Black/white/blue color scheme applied
- [x] All borders rounded (2xl/xl)
- [x] Smooth transitions (300ms)
- [x] Consistent spacing (Tailwind scale)
- [x] Modern typography (readable, hierarchical)
- [x] Micro-interactions on hover/click

### Technical

- [x] TypeScript strict mode, no `any`
- [x] Clean component structure
- [x] JSON-dependent rendering
- [x] No hardcoded content
- [x] Build succeeds without errors
- [x] Performance: <100ms tab switch

## Deliverables

1. [x] Unified creator page with tab navigation
2. [x] Modern UI components (black/white/blue theme)
3. [x] Empty, streaming, and output states for all tabs
4. [x] JSON data integration for Diagnostics, Playbook, Posts
5. [x] Intermediate step visualization for Posts
6. [x] Rich editor integration for final drafts
7. [x] Navigation updates (sidebar links to `/demo/creator`)
8. [x] Tabbed section navigation for Diagnostics (8 sections)
9. [x] Tabbed section navigation for Playbook (dynamic)
10. [x] Fixed scrolling across all panels
11. [x] Calendar modal integration with curated topics
12. [x] Documents panel for browsing existing content
13. [x] Complete rich markdown editor with AI assistant
14. [x] SEO scoring and optimization tools

### To-dos

- [x] Create assistant/ChatPanel.tsx (collapsible, composer, history)
- [x] Add Play/Preview UI to content-studio/create/workflow-page.tsx
- [x] Implement WorkflowPreviewPanel.tsx slide-over/modal
- [ ] Build template→graph transform in src/lib/demo/workflow-graph.ts
- [ ] Create summarized change mapper in src/lib/demo/workflow-summary.ts
- [x] Implement ContentBrief.tsx component
- [x] Insert Content Brief into create flows and Module Panel