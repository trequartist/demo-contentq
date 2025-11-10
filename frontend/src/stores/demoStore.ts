import { create } from "zustand";
import { AgentActivity, BrainDocument, mockDocuments } from "@/data/mockData";

interface WorkflowProgress {
  id: string;
  type: 'blog' | 'linkedin' | 'report';
  title: string;
  stage: string;
  progress: number;
}

export interface CrossModuleContext {
  source: 'research' | 'calendar' | 'brain' | 'strategy';
  sourceId: string;
  title: string;
  description?: string;
  data?: any;
}

interface DemoState {
  // Agent Activity
  activeAgents: AgentActivity[];
  agentHistory: AgentActivity[];
  
  // Marketing Brain
  brainDocuments: BrainDocument[];
  activeBrainDocuments: string[]; // IDs of active documents
  
  // Workflows
  workflowsInProgress: WorkflowProgress[];
  
  // Cross-Module Context
  crossModuleContext: CrossModuleContext | null;
  
  // Demo Settings
  showAgentDetails: boolean;
  simulationSpeed: number; // 1 = normal, 2 = 2x speed, 0.5 = half speed
  
  // Actions
  startAgentWork: (agent: AgentActivity['agent'], task: string, reasoning?: string) => void;
  completeAgentWork: (agent: AgentActivity['agent']) => void;
  setAgentIdle: (agent: AgentActivity['agent']) => void;
  clearAgentActivity: () => void;
  
  // Marketing Brain Actions
  addDocument: (doc: BrainDocument) => void;
  removeDocument: (docId: string) => void;
  toggleDocumentActive: (docId: string) => void;
  setDocuments: (docs: BrainDocument[]) => void;
  
  // Workflow Actions
  addWorkflow: (workflow: WorkflowProgress) => void;
  updateWorkflowProgress: (id: string, progress: number, stage?: string) => void;
  removeWorkflow: (id: string) => void;
  
  // Cross-Module Context Actions
  setContext: (context: CrossModuleContext | null) => void;
  clearContext: () => void;
  
  // Demo Control Actions
  toggleAgentDetails: () => void;
  setSimulationSpeed: (speed: number) => void;
  resetDemo: () => void;
  
  // Persistence
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

const STORAGE_KEY = 'contentq-demo-state';

// Helper to calculate delay based on simulation speed
const getDelay = (baseDelay: number, speed: number): number => {
  return baseDelay / speed;
};

export const useDemoStore = create<DemoState>((set, get) => ({
  // Initial State
  activeAgents: [],
  agentHistory: [],
  brainDocuments: mockDocuments,
  activeBrainDocuments: mockDocuments.filter(doc => doc.active).map(doc => doc.id),
  workflowsInProgress: [],
  crossModuleContext: null,
  showAgentDetails: false,
  simulationSpeed: 1,
  
  // Agent Activity Actions
  startAgentWork: (agent, task, reasoning) => {
    const activity: AgentActivity = {
      agent,
      task,
      status: 'working',
      reasoning: reasoning || `Working on: ${task}`,
      startedAt: new Date(),
    };
    
    set(state => {
      // Remove any existing activity for this agent
      const filtered = state.activeAgents.filter(a => a.agent !== agent);
      return {
        activeAgents: [...filtered, activity],
      };
    });
    
    get().saveToStorage();
  },
  
  completeAgentWork: (agent) => {
    set(state => {
      const agentActivity = state.activeAgents.find(a => a.agent === agent);
      if (!agentActivity) return state;
      
      const completed: AgentActivity = {
        ...agentActivity,
        status: 'completed',
        completedAt: new Date(),
      };
      
      return {
        activeAgents: state.activeAgents.filter(a => a.agent !== agent),
        agentHistory: [completed, ...state.agentHistory].slice(0, 50), // Keep last 50
      };
    });
    
    get().saveToStorage();
  },
  
  setAgentIdle: (agent) => {
    set(state => ({
      activeAgents: state.activeAgents.filter(a => a.agent !== agent),
    }));
    
    get().saveToStorage();
  },
  
  clearAgentActivity: () => {
    set({
      activeAgents: [],
    });
    
    get().saveToStorage();
  },
  
  // Marketing Brain Actions
  addDocument: (doc) => {
    set(state => ({
      brainDocuments: [...state.brainDocuments, doc],
      activeBrainDocuments: doc.active 
        ? [...state.activeBrainDocuments, doc.id]
        : state.activeBrainDocuments,
    }));
    
    get().saveToStorage();
  },
  
  removeDocument: (docId) => {
    set(state => ({
      brainDocuments: state.brainDocuments.filter(doc => doc.id !== docId),
      activeBrainDocuments: state.activeBrainDocuments.filter(id => id !== docId),
    }));
    
    get().saveToStorage();
  },
  
  toggleDocumentActive: (docId) => {
    set(state => {
      const doc = state.brainDocuments.find(d => d.id === docId);
      if (!doc) return state;
      
      const updatedDocs = state.brainDocuments.map(d =>
        d.id === docId ? { ...d, active: !d.active } : d
      );
      
      const isNowActive = !doc.active;
      const updatedActive = isNowActive
        ? [...state.activeBrainDocuments, docId]
        : state.activeBrainDocuments.filter(id => id !== docId);
      
      return {
        brainDocuments: updatedDocs,
        activeBrainDocuments: updatedActive,
      };
    });
    
    get().saveToStorage();
  },
  
  setDocuments: (docs) => {
    set({
      brainDocuments: docs,
      activeBrainDocuments: docs.filter(doc => doc.active).map(doc => doc.id),
    });
    
    get().saveToStorage();
  },
  
  // Workflow Actions
  addWorkflow: (workflow) => {
    set(state => ({
      workflowsInProgress: [...state.workflowsInProgress, workflow],
    }));
    
    get().saveToStorage();
  },
  
  updateWorkflowProgress: (id, progress, stage) => {
    set(state => ({
      workflowsInProgress: state.workflowsInProgress.map(w =>
        w.id === id 
          ? { ...w, progress, ...(stage && { stage }) }
          : w
      ),
    }));
    
    get().saveToStorage();
  },
  
  removeWorkflow: (id) => {
    set(state => ({
      workflowsInProgress: state.workflowsInProgress.filter(w => w.id !== id),
    }));
    
    get().saveToStorage();
  },
  
  // Cross-Module Context Actions
  setContext: (context) => {
    set({ crossModuleContext: context });
    get().saveToStorage();
  },
  
  clearContext: () => {
    set({ crossModuleContext: null });
    get().saveToStorage();
  },
  
  // Demo Control Actions
  toggleAgentDetails: () => {
    set(state => ({
      showAgentDetails: !state.showAgentDetails,
    }));
    
    get().saveToStorage();
  },
  
  setSimulationSpeed: (speed) => {
    set({ simulationSpeed: speed });
    get().saveToStorage();
  },
  
  resetDemo: () => {
    set({
      activeAgents: [],
      agentHistory: [],
      brainDocuments: mockDocuments,
      activeBrainDocuments: mockDocuments.filter(doc => doc.active).map(doc => doc.id),
      workflowsInProgress: [],
      showAgentDetails: false,
      simulationSpeed: 1,
    });
    
    // Clear storage
    sessionStorage.removeItem(STORAGE_KEY);
  },
  
  // Persistence Actions
  saveToStorage: () => {
    const state = get();
    const toSave = {
      activeAgents: state.activeAgents,
      agentHistory: state.agentHistory,
      brainDocuments: state.brainDocuments,
      activeBrainDocuments: state.activeBrainDocuments,
      workflowsInProgress: state.workflowsInProgress,
      showAgentDetails: state.showAgentDetails,
      simulationSpeed: state.simulationSpeed,
    };
    
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save demo state:', error);
    }
  },
  
  loadFromStorage: () => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        set({
          activeAgents: parsed.activeAgents || [],
          agentHistory: parsed.agentHistory || [],
          brainDocuments: parsed.brainDocuments || mockDocuments,
          activeBrainDocuments: parsed.activeBrainDocuments || [],
          workflowsInProgress: parsed.workflowsInProgress || [],
          showAgentDetails: parsed.showAgentDetails || false,
          simulationSpeed: parsed.simulationSpeed || 1,
        });
      }
    } catch (error) {
      console.error('Failed to load demo state:', error);
    }
  },
}));

// Helper hook to simulate agent work with automatic completion
export const useSimulateAgentWork = () => {
  const store = useDemoStore();
  
  const simulateWork = async (
    agent: AgentActivity['agent'],
    task: string,
    duration: number,
    reasoning?: string
  ): Promise<void> => {
    const adjustedDuration = duration / store.simulationSpeed;
    
    store.startAgentWork(agent, task, reasoning);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        store.completeAgentWork(agent);
        resolve();
      }, adjustedDuration);
    });
  };
  
  return { simulateWork };
};

// Initialize store from storage on load
if (typeof window !== 'undefined') {
  useDemoStore.getState().loadFromStorage();
}
