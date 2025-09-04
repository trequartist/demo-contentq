# Content Studio V2 - Workflows Documentation

## 🎯 Overview

Content Studio V2 is a production-grade AI-powered content creation system with three main workflow families:
1. **Blog Create** - AI-driven blog content creation from topic to final draft
2. **LinkedIn Create** - Professional LinkedIn post creation workflow 
3. **Blog Improve** - Enhancement workflow for existing blog content

Each workflow follows a multi-stage process with human-in-the-loop (HITL) interactions, state persistence, and seamless recovery.

## 📐 Architecture

### Core Components

```
content-studio-v2/
├── ContentStudioHome.tsx       # Main entry point with asset selection
├── components/
│   ├── WorkflowRouter.tsx      # Routes to appropriate workflow family
│   ├── DraftStageEnhanced.tsx  # Enhanced editor for content editing
│   └── Home/                   # UI components for home interface
├── families/                   # Workflow implementations
│   ├── create/                 # Blog creation workflow
│   ├── linkedinCreate/         # LinkedIn creation workflow
│   └── improve/                # Blog improvement workflow
├── store/                      # State management
│   ├── WorkflowStoreProvider   # Context provider for stores
│   ├── blog-create-store-v2.ts # Blog create state
│   └── linkedin-create-store.ts# LinkedIn create state
└── myDocuments/                # Document management system
```

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **State Management**: Zustand stores with provider pattern
- **UI Components**: Custom components with Tailwind CSS
- **API Integration**: Workflow API with polling system
- **Document Storage**: Customer data API for persistence

## 🔄 Workflow Families

### 1. Blog Create Workflow (`/families/create`)

**Purpose**: Create comprehensive blog content from scratch using AI assistance.

**Stages**:
1. **Input Stage** → User describes blog topic
2. **Processing** → AI generates topic options
3. **Topics Stage** → User selects from generated topics
4. **Brief Stage** → AI creates content brief with structure
5. **Draft Stage** → AI generates full blog content
6. **Complete** → Final content ready for publishing

**Key Features**:
- Topic suggestion with regeneration capability
- Editable content briefs
- Real-time AI feedback loop
- Auto-save and resume functionality

### 2. LinkedIn Create Workflow (`/families/linkedinCreate`)

**Purpose**: Create engaging LinkedIn posts optimized for professional networking.

**Stages**:
1. **Input Stage** → User describes post idea
2. **Processing** → AI analyzes and generates angles
3. **Topics Stage** → User selects post angle
4. **Brief Stage** → AI creates LinkedIn-specific brief
5. **Draft Stage** → AI generates LinkedIn post
6. **Complete** → Post ready for LinkedIn

**Key Features**:
- LinkedIn-specific optimization
- Professional tone adjustment
- Character limit awareness
- Engagement optimization

### 3. Blog Improve Workflow (`/families/improve`)

**Purpose**: Enhance existing blog content with AI-powered improvements.

**Stages**:
1. **Import Stage** → User pastes existing content
2. **Processing** → AI analyzes content
3. **Analysis Stage** → Review improvement suggestions
4. **Review Stage** → Apply and review improvements
5. **Result** → Enhanced content ready

**Key Features**:
- SEO optimization suggestions
- Readability improvements
- Content gap analysis
- Specific improvement tracking

## 🏗️ State Management System

### Store Architecture

Each workflow family has its own Zustand store with common patterns:

```typescript
interface WorkflowStore {
  // Workflow State
  currentStage: WorkflowStage;
  status: 'idle' | 'loading' | 'error';
  runId: string | null;
  
  // Content State
  userInputData: any;
  topicOptions: any[];
  briefContent: any;
  draftContent: any;
  
  // API Integration
  api: WorkflowAPI | null;
  
  // Actions
  submitUserInput: (data: any) => Promise<void>;
  selectTopic: (topicId: string) => Promise<void>;
  submitWorkflowAction: (stage, action, feedback) => Promise<void>;
  processWorkflowRunDetails: (details) => Promise<void>;
  resetWorkflow: () => void;
  
  // Resume System
  resumeWorkflow: {
    store: () => Promise<void>;
    load: (documentId: string) => Promise<boolean>;
    save: () => Promise<string>;
  };
}
```

### Polling System

Workflows use an intelligent polling system for async operations:

```typescript
// Smart polling with optimized intervals
useEffect(() => {
  if (store.shouldPoll() && store.api?.getWorkflowRunDetails) {
    const pollInterval = setInterval(async () => {
      const runDetails = await store.api.getWorkflowRunDetails({ 
        run_id: store.runId 
      });
      await store.processWorkflowRunDetails(runDetails);
    }, 3000); // 3-second intervals
    
    return () => clearInterval(pollInterval);
  }
}, [store.runId, store.status]);
```

## 💾 Resume & Persistence System

### Document-Based Resume

Workflows can be resumed from any stage using document metadata:

```typescript
// Store resume metadata
const resumeMetadata = {
  workflowKey: 'blog_topic_ideation_workflow',
  runId: 'run_abc123',
  currentStage: 'brief',
  assetId: 'asset_123',
  userInputData: {...},
  briefContent: {...},
  draftContent: {...},
  lastActivity: new Date().toISOString()
};

// Resume workflow from URL
?documentUuid=doc_123&stage=brief&runId=run_abc123
```

### Auto-Save Points

Auto-save triggers at critical stages:
- After topic selection
- After brief approval
- After draft generation
- On user-initiated saves

## 🎨 UI Components

### Stage Components

#### SimpleInputStage
Initial input collection with asset context:
```tsx
<SimpleInputStage
  asset={asset}
  placeholder="Describe the blog content..."
  title="What topic should we tackle?"
  onSubmit={handleSubmitUserInput}
  isLoading={isLoading}
/>
```

#### ProcessingStage
Loading state with contextual messaging:
```tsx
<ProcessingStage
  title="Generating Post Angles"
  message="Finding relevant post angles aligned to your strategy"
/>
```

#### DraftStageEnhanced
Full-featured editor with side panel:
- Document editor (left panel)
- AI chat interface (right panel)
- Feedback system
- Save/approve actions

### Navigation Components

#### WorkflowHeader
Progress tracking and navigation:
```tsx
<WorkflowHeader
  title="Create Blog Content"
  subtitle="Creating content for Your Blog"
  currentStep={3}
  totalSteps={5}
  onCancel={handleCancel}
/>
```

## 🚀 Demo Implementation Guide

### Step 1: Set Up Core Structure

Create the following structure in your demo project:

```
demo-kiwiq/
├── src/
│   ├── app/demo/content-studio/
│   │   ├── page.tsx           # Main studio page
│   │   ├── create/page.tsx    # Blog create workflow
│   │   └── improve/page.tsx   # Blog improve workflow
│   ├── components/
│   │   ├── ContentStudio/
│   │   │   ├── WorkflowHeader.tsx
│   │   │   ├── SimpleInputStage.tsx
│   │   │   ├── ProcessingStage.tsx
│   │   │   ├── TopicSelection.tsx
│   │   │   ├── BriefDisplay.tsx
│   │   │   └── DraftEditor.tsx
│   │   └── ui/               # Shared UI components
│   └── lib/
│       ├── stores/
│       │   └── workflow-store.ts
│       └── api/
│           └── workflow-api.ts
```

### Step 2: Create Simplified Store

```typescript
// lib/stores/workflow-store.ts
import { create } from 'zustand';

interface WorkflowState {
  currentStage: 'input' | 'topics' | 'brief' | 'draft' | 'complete';
  userInput: string;
  selectedTopic: string | null;
  briefContent: any;
  draftContent: string;
  isLoading: boolean;
  error: string | null;
}

interface WorkflowActions {
  setStage: (stage: WorkflowState['currentStage']) => void;
  setUserInput: (input: string) => void;
  selectTopic: (topic: string) => void;
  setBrief: (brief: any) => void;
  setDraft: (draft: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState & WorkflowActions>((set) => ({
  // Initial state
  currentStage: 'input',
  userInput: '',
  selectedTopic: null,
  briefContent: null,
  draftContent: '',
  isLoading: false,
  error: null,
  
  // Actions
  setStage: (stage) => set({ currentStage: stage }),
  setUserInput: (input) => set({ userInput: input }),
  selectTopic: (topic) => set({ selectedTopic: topic }),
  setBrief: (brief) => set({ briefContent: brief }),
  setDraft: (draft) => set({ draftContent: draft }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    currentStage: 'input',
    userInput: '',
    selectedTopic: null,
    briefContent: null,
    draftContent: '',
    isLoading: false,
    error: null,
  }),
}));
```

### Step 3: Implement Blog Create Workflow

```tsx
// app/demo/content-studio/create/page.tsx
'use client';

import { useWorkflowStore } from '@/lib/stores/workflow-store';
import { WorkflowHeader } from '@/components/ContentStudio/WorkflowHeader';
import { SimpleInputStage } from '@/components/ContentStudio/SimpleInputStage';
import { ProcessingStage } from '@/components/ContentStudio/ProcessingStage';
import { TopicSelection } from '@/components/ContentStudio/TopicSelection';
import { BriefDisplay } from '@/components/ContentStudio/BriefDisplay';
import { DraftEditor } from '@/components/ContentStudio/DraftEditor';

export default function BlogCreateWorkflow() {
  const store = useWorkflowStore();
  
  const handleSubmitInput = async (input: string) => {
    store.setUserInput(input);
    store.setLoading(true);
    store.setStage('topics');
    
    // Simulate API call
    setTimeout(() => {
      store.setLoading(false);
    }, 2000);
  };
  
  const handleSelectTopic = (topic: string) => {
    store.selectTopic(topic);
    store.setStage('brief');
    
    // Generate brief
    setTimeout(() => {
      store.setBrief({
        title: `Blog Post: ${topic}`,
        outline: ['Introduction', 'Main Points', 'Conclusion'],
        keywords: ['AI', 'Technology', 'Innovation']
      });
    }, 1500);
  };
  
  const handleApproveBrief = () => {
    store.setStage('draft');
    
    // Generate draft
    setTimeout(() => {
      store.setDraft('# Your Blog Post\\n\\nContent here...');
    }, 2000);
  };
  
  const handleApproveDraft = () => {
    store.setStage('complete');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <WorkflowHeader
        title="Create Blog Content"
        currentStep={getStepNumber(store.currentStage)}
        totalSteps={5}
      />
      
      {store.currentStage === 'input' && (
        <SimpleInputStage
          onSubmit={handleSubmitInput}
          isLoading={store.isLoading}
        />
      )}
      
      {store.currentStage === 'topics' && !store.selectedTopic && (
        store.isLoading ? (
          <ProcessingStage title="Generating Topics" />
        ) : (
          <TopicSelection
            topics={MOCK_TOPICS}
            onSelect={handleSelectTopic}
          />
        )
      )}
      
      {store.currentStage === 'brief' && store.briefContent && (
        <BriefDisplay
          brief={store.briefContent}
          onApprove={handleApproveBrief}
          onRevise={(feedback) => console.log(feedback)}
        />
      )}
      
      {store.currentStage === 'draft' && store.draftContent && (
        <DraftEditor
          content={store.draftContent}
          onApprove={handleApproveDraft}
          onFeedback={(feedback) => console.log(feedback)}
        />
      )}
      
      {store.currentStage === 'complete' && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Content Created!</h2>
          <p>Your blog post is ready for publishing.</p>
        </div>
      )}
    </div>
  );
}

function getStepNumber(stage: string): number {
  const steps = { input: 1, topics: 2, brief: 3, draft: 4, complete: 5 };
  return steps[stage as keyof typeof steps] || 1;
}

const MOCK_TOPICS = [
  { id: '1', title: 'AI in Healthcare', description: 'Explore AI applications...' },
  { id: '2', title: 'Future of Work', description: 'How AI is changing...' },
  { id: '3', title: 'AI Ethics', description: 'Important considerations...' },
];
```

### Step 4: Add Mock Data

```typescript
// lib/mock-data/workflow-mocks.ts
export const mockTopics = {
  blog: [
    {
      id: 'topic-1',
      title: 'The Future of AI in Healthcare',
      description: 'Explore how artificial intelligence is revolutionizing patient care and medical research.',
      keywords: ['AI', 'Healthcare', 'Innovation', 'Medical Technology']
    },
    {
      id: 'topic-2',
      title: 'Building Sustainable Tech Solutions',
      description: 'Learn about eco-friendly approaches to software development and green computing.',
      keywords: ['Sustainability', 'Green Tech', 'Environment', 'Software']
    },
    {
      id: 'topic-3',
      title: 'Remote Work Best Practices',
      description: 'Master the art of productive remote work with proven strategies and tools.',
      keywords: ['Remote Work', 'Productivity', 'Collaboration', 'Work-Life Balance']
    }
  ]
};

export const mockBrief = {
  title: 'The Future of AI in Healthcare',
  status: 'draft',
  core_perspective: 'AI is transforming healthcare delivery and patient outcomes',
  target_audience: 'Healthcare professionals and technology enthusiasts',
  key_points: [
    'Current AI applications in diagnostics',
    'Machine learning in drug discovery',
    'Ethical considerations and patient privacy',
    'Future trends and possibilities'
  ],
  outline: {
    introduction: 'Hook readers with compelling statistics about AI in healthcare',
    body: [
      { section: 'Current State', points: ['Diagnostic tools', 'Treatment planning'] },
      { section: 'Benefits', points: ['Accuracy', 'Efficiency', 'Cost reduction'] },
      { section: 'Challenges', points: ['Data privacy', 'Regulatory compliance'] },
      { section: 'Future Outlook', points: ['Emerging technologies', 'Predictions'] }
    ],
    conclusion: 'Call to action for healthcare innovation'
  },
  seo_keywords: ['AI healthcare', 'medical AI', 'healthcare technology', 'digital health'],
  estimated_reading_time: '8 minutes',
  word_count_target: 1500
};

export const mockDraft = `# The Future of AI in Healthcare: Transforming Patient Care in 2024

## Introduction

Artificial Intelligence is no longer a futuristic concept in healthcare—it's a present reality that's saving lives every day. From early cancer detection to personalized treatment plans, AI is revolutionizing how we approach medicine.

## The Current Landscape

Healthcare AI has grown exponentially, with the market expected to reach $45.2 billion by 2026. Major hospitals worldwide are implementing AI systems that can:

- Detect diseases earlier than traditional methods
- Predict patient outcomes with remarkable accuracy
- Streamline administrative tasks to reduce costs
- Personalize treatment plans based on genetic data

## Key Applications

### 1. Diagnostic Excellence
AI-powered imaging tools can now detect cancers, eye diseases, and cardiac conditions with accuracy matching or exceeding human specialists. Google's AI system for diabetic retinopathy screening achieved 90% accuracy in clinical trials.

### 2. Drug Discovery Revolution
What once took decades now takes years. AI algorithms analyze millions of compounds, predicting their effectiveness and potential side effects before expensive clinical trials begin.

### 3. Personalized Medicine
By analyzing genetic markers, lifestyle factors, and medical history, AI creates treatment plans tailored to individual patients, improving outcomes and reducing adverse reactions.

## Challenges and Considerations

Despite the promise, healthcare AI faces significant hurdles:

**Data Privacy**: Patient information requires the highest security standards. HIPAA compliance and data anonymization are crucial.

**Algorithm Bias**: AI systems must be trained on diverse datasets to ensure equitable care for all populations.

**Regulatory Framework**: FDA approval processes are adapting to accommodate AI-based medical devices and software.

## The Road Ahead

The next decade will see AI becoming an indispensable healthcare partner. We can expect:

- Virtual health assistants providing 24/7 patient support
- Predictive analytics preventing diseases before symptoms appear
- Robotic surgery with unprecedented precision
- Mental health AI providing accessible therapy options

## Conclusion

AI in healthcare isn't replacing doctors—it's empowering them with tools to provide better, faster, and more personalized care. As we navigate this transformation, the focus must remain on improving patient outcomes while maintaining the human touch that defines compassionate healthcare.

The future of medicine is here, and it's powered by artificial intelligence.`;
```

### Step 5: Create Component Library

```tsx
// components/ContentStudio/SimpleInputStage.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface SimpleInputStageProps {
  placeholder?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit: (input: string) => void;
  isLoading?: boolean;
}

export function SimpleInputStage({
  placeholder = "Describe the content you'd like to create...",
  title = "What would you like to create?",
  description = "Tell us about your content idea",
  buttonText = "Continue",
  onSubmit,
  isLoading = false
}: SimpleInputStageProps) {
  const [input, setInput] = useState('');
  
  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px]"
          disabled={isLoading}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : buttonText}
        </Button>
      </div>
    </div>
  );
}
```

## 🧪 Testing Your Implementation

### Test Workflow Flow
1. Navigate to `/demo/content-studio/create`
2. Enter a blog topic idea
3. Select from generated topics
4. Review and approve brief
5. Edit and finalize draft
6. Verify completion state

### Test Resume Functionality
1. Start a workflow and reach brief stage
2. Save as draft
3. Navigate away and return with document ID
4. Verify state restoration

### Test Error Handling
1. Simulate API failures
2. Test network interruptions
3. Verify graceful error states

## 📋 Checklist for Demo Implementation

- [ ] Core workflow structure set up
- [ ] Zustand store implemented
- [ ] Stage components created
- [ ] Navigation flow working
- [ ] Mock data integrated
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Resume system (optional)
- [ ] UI polish applied
- [ ] Responsive design verified

## 🔧 Advanced Features (Optional)

### Real AI Integration
Replace mock data with actual AI API calls:
```typescript
const generateTopics = async (input: string) => {
  const response = await fetch('/api/ai/topics', {
    method: 'POST',
    body: JSON.stringify({ prompt: input })
  });
  return response.json();
};
```

### Workflow Persistence
Store workflow state in localStorage or database:
```typescript
const saveWorkflowState = (state: WorkflowState) => {
  localStorage.setItem('workflow_state', JSON.stringify(state));
};

const loadWorkflowState = (): WorkflowState | null => {
  const saved = localStorage.getItem('workflow_state');
  return saved ? JSON.parse(saved) : null;
};
```

### Analytics Integration
Track workflow completion and drop-off points:
```typescript
const trackWorkflowEvent = (event: string, data: any) => {
  analytics.track('workflow_event', {
    event,
    stage: store.currentStage,
    timestamp: Date.now(),
    ...data
  });
};
```

## 📚 Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Support

For questions about implementing these workflows in your demo:
1. Review this documentation thoroughly
2. Check the original source code for reference
3. Start with a simple implementation and iterate
4. Focus on core functionality before advanced features

---

*This documentation provides everything needed to implement a functional demo of the Content Studio V2 workflows. Start with the basics and progressively add features as needed.*
