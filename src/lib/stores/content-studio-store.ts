import { create } from 'zustand';

export type WorkflowType = 'blog-create' | 'linkedin-create' | 'blog-improve' | null;
export type BlogStage = 'input' | 'topics' | 'brief' | 'draft' | 'complete';
export type LinkedInStage = 'input' | 'angles' | 'brief' | 'post' | 'complete';
export type ImproveStage = 'import' | 'analysis' | 'suggestions' | 'editing' | 'complete';

interface Topic {
  id: string;
  title: string;
  description: string;
  relevance: number;
  searchVolume: string;
  competition: string;
  opportunity: string;
  keywords: string[];
}

interface Brief {
  title: string;
  hook: string;
  targetAudience: {
    primary: string;
    secondary: string;
    painPoints: string[];
  };
  outline: Array<{
    section: string;
    points: string[];
    wordCount: number;
  }>;
  seoOptimization: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    metaDescription: string;
    structuredData: string[];
    questionsThisPostAnswers: string[];
  };
  estimatedReadTime: string;
  callToAction: string;
}

interface ContentStudioState {
  // Workflow State
  activeWorkflow: WorkflowType;
  currentStage: BlogStage | LinkedInStage | ImproveStage;
  
  // Content Data
  userInput: {
    companyName: string;
    requirements: string;
    targetAudience: string;
    keywords: string[];
    tone: string;
  };
  topicOptions: Topic[];
  selectedTopic: Topic | null;
  brief: Brief | null;
  draft: string;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  savedDocumentId: string | null;
  
  // Progress tracking
  completedStages: string[];
  currentProgress: number;
}

interface ContentStudioActions {
  // Workflow Actions
  startWorkflow: (type: WorkflowType) => void;
  setStage: (stage: BlogStage | LinkedInStage | ImproveStage) => void;
  nextStage: () => void;
  previousStage: () => void;
  
  // Data Actions
  setUserInput: (input: ContentStudioState['userInput']) => void;
  setTopicOptions: (topics: Topic[]) => void;
  selectTopic: (topic: Topic) => void;
  setBrief: (brief: Brief) => void;
  setDraft: (draft: string) => void;
  
  // UI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Persistence
  saveProgress: () => string;
  loadProgress: (documentId: string) => boolean;
  reset: () => void;
  
  // Content Data
  setContentData: (data: any) => void;
}

const WORKFLOW_STAGES = {
  'blog-create': ['input', 'topics', 'brief', 'draft', 'complete'],
  'linkedin-create': ['input', 'angles', 'brief', 'post', 'complete'],
  'blog-improve': ['import', 'analysis', 'suggestions', 'editing', 'complete']
};

export const useContentStudioStore = create<ContentStudioState & ContentStudioActions>((set, get) => ({
  // Initial State
  activeWorkflow: null,
  currentStage: 'input',
  userInput: {
    companyName: 'Gumloop',
    requirements: '',
    targetAudience: 'RevOps Managers, Operations Directors',
    keywords: [],
    tone: 'Expert but approachable'
  },
  topicOptions: [],
  selectedTopic: null,
  brief: null,
  draft: '',
  isLoading: false,
  error: null,
  savedDocumentId: null,
  completedStages: [],
  currentProgress: 0,
  
  // Workflow Actions
  startWorkflow: (type) => {
    const initialStage = type ? WORKFLOW_STAGES[type][0] : 'input';
    set({
      activeWorkflow: type,
      currentStage: initialStage as any,
      completedStages: [],
      currentProgress: 0,
      error: null
    });
  },
  
  setStage: (stage) => {
    const { activeWorkflow, completedStages } = get();
    const stages = activeWorkflow ? WORKFLOW_STAGES[activeWorkflow] : [];
    const stageIndex = stages.indexOf(stage as string);
    
    set({
      currentStage: stage,
      currentProgress: ((stageIndex + 1) / stages.length) * 100,
      completedStages: stages.slice(0, stageIndex)
    });
  },
  
  nextStage: () => {
    const { activeWorkflow, currentStage } = get();
    if (!activeWorkflow) return;
    
    const stages = WORKFLOW_STAGES[activeWorkflow];
    const currentIndex = stages.indexOf(currentStage as string);
    
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      get().setStage(nextStage as any);
    }
  },
  
  previousStage: () => {
    const { activeWorkflow, currentStage } = get();
    if (!activeWorkflow) return;
    
    const stages = WORKFLOW_STAGES[activeWorkflow];
    const currentIndex = stages.indexOf(currentStage as string);
    
    if (currentIndex > 0) {
      const prevStage = stages[currentIndex - 1];
      get().setStage(prevStage as any);
    }
  },
  
  // Data Actions
  setUserInput: (input) => set({ userInput: input }),
  setTopicOptions: (topics) => set({ topicOptions: topics }),
  selectTopic: (topic) => set({ selectedTopic: topic }),
  setBrief: (brief) => set({ brief }),
  setDraft: (draft) => set({ draft }),
  
  // UI Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  // Persistence
  saveProgress: () => {
    const state = get();
    const documentId = `doc-${Date.now()}`;
    
    const savedState = {
      documentId,
      workflow: state.activeWorkflow,
      stage: state.currentStage,
      data: {
        userInput: state.userInput,
        selectedTopic: state.selectedTopic,
        brief: state.brief,
        draft: state.draft
      },
      timestamp: new Date().toISOString()
    };
    
    // In production, this would save to API/database
    if (typeof window !== 'undefined') {
      localStorage.setItem(`workflow-${documentId}`, JSON.stringify(savedState));
    }
    
    set({ savedDocumentId: documentId });
    return documentId;
  },
  
  loadProgress: (documentId) => {
    if (typeof window === 'undefined') return false;
    
    const saved = localStorage.getItem(`workflow-${documentId}`);
    if (!saved) return false;
    
    try {
      const state = JSON.parse(saved);
      set({
        activeWorkflow: state.workflow,
        currentStage: state.stage,
        userInput: state.data.userInput,
        selectedTopic: state.data.selectedTopic,
        brief: state.data.brief,
        draft: state.data.draft,
        savedDocumentId: documentId
      });
      return true;
    } catch {
      return false;
    }
  },
  
  reset: () => {
    set({
      activeWorkflow: null,
      currentStage: 'input',
      userInput: {
        companyName: 'Gumloop',
        requirements: '',
        targetAudience: 'RevOps Managers, Operations Directors',
        keywords: [],
        tone: 'Expert but approachable'
      },
      topicOptions: [],
      selectedTopic: null,
      brief: null,
      draft: '',
      isLoading: false,
      error: null,
      savedDocumentId: null,
      completedStages: [],
      currentProgress: 0
    });
  },
  
  setContentData: (data) => {
    set({ ...data });
  }
}));
