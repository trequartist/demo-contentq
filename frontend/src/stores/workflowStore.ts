import { create } from "zustand";
import { getWorkflowByType } from "@/data/workflows";

export type WorkflowType = "blog" | "linkedin" | "calendar";
export type StageType = "input" | "selection" | "processing" | "approval" | "editor";
export type StageStatus = "completed" | "in-progress" | "pending";

export interface WorkflowStep {
  id: string;
  name: string;
  status: StageStatus;
}

export interface WorkflowStage {
  id: string;
  stepId: string; // Maps to the timeline step.id
  title: string;
  description: string;
  type: StageType;
  canGoBack: boolean;
  primaryAction: string;
  // For selection stages
  options?: Array<{ id: string; title: string; description: string; reasoning?: string }>;
  multiSelect?: boolean;
  selectedOptions?: string[];
  // For input stages
  inputLabel?: string;
  placeholder?: string;
  inputValue?: string;
  allowFileUpload?: boolean;
  acceptedFiles?: string;
  uploadedFiles?: File[];
  calendarEvent?: any;
  // For processing stages
  processingStage?: string;
  progress?: number;
  message?: string;
  agent?: 'Research' | 'Strategist' | 'Copywriter' | 'Editor' | 'Analyst';
  agentReasoning?: string;
  mockOutput?: any;
  // For editor stage
  showScoring?: boolean;
}

export interface WorkflowState {
  isActive: boolean;
  workflowType: WorkflowType | null;
  currentStageIndex: number;
  steps: WorkflowStep[];
  stages: WorkflowStage[];
  
  // Editor state
  editorContent: string;
  editorTitle: string;
  brief: {
    title: string;
    wordCount: number;
    readingTime: number;
    keywords: string[];
  } | null;
  
  // Actions
  startWorkflow: (type: WorkflowType) => void;
  pauseWorkflow: () => void;
  nextStage: () => void;
  previousStage: () => void;
  updateStageData: (data: Partial<WorkflowStage>) => void;
  updateEditorContent: (content: string) => void;
  updateEditorTitle: (title: string) => void;
  completeStage: () => void;
  insertIntoInput: (content: string, position: "replace" | "append" | "prepend") => void;
}


// Note: Workflow definitions moved to src/data/workflows.ts

];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  isActive: false,
  workflowType: null,
  currentStageIndex: 0,
  steps: [],
  stages: [],
  editorContent: "",
  editorTitle: "",
  brief: null,

  startWorkflow: (type) => {
    // Get workflow from new data file
    const stages = getWorkflowByType(type);
    
    // Generate steps from stages
    const uniqueStepIds = [...new Set(stages.map(s => s.stepId))];
    const steps: WorkflowStep[] = uniqueStepIds.map((stepId, index) => ({
      id: stepId,
      name: stepId.charAt(0).toUpperCase() + stepId.slice(1),
      status: index === 0 ? "in-progress" : "pending",
    }));

    set({
      isActive: true,
      workflowType: type,
      currentStageIndex: 0,
      steps,
      stages,
      editorContent: "",
      editorTitle: "",
      brief: null,
    });
  },

  pauseWorkflow: () => {
    set({
      isActive: false,
      workflowType: null,
      currentStageIndex: 0,
      steps: [],
      stages: [],
    });
  },

  nextStage: () => {
    const { currentStageIndex, stages, steps } = get();
    if (currentStageIndex < stages.length - 1) {
      const nextIndex = currentStageIndex + 1;
      const currentStage = stages[currentStageIndex];
      const nextStage = stages[nextIndex];
      
      // Update step statuses based on stepId mapping
      const updatedSteps = [...steps];
      const currentStepIndex = steps.findIndex(s => s.id === currentStage.stepId);
      const nextStepIndex = steps.findIndex(s => s.id === nextStage.stepId);
      
      // Only mark current step as complete if moving to a DIFFERENT step
      if (nextStepIndex !== currentStepIndex && currentStepIndex !== -1 && nextStepIndex !== -1) {
        updatedSteps[currentStepIndex].status = "completed";
        updatedSteps[nextStepIndex].status = "in-progress";
      }
      
      set({ currentStageIndex: nextIndex, steps: updatedSteps });
      
      // Auto-start processing stages
      if (nextStage.type === "processing") {
        setTimeout(() => get().completeStage(), 100);
      }
    }
  },

  previousStage: () => {
    const { currentStageIndex, stages, steps } = get();
    if (currentStageIndex > 0) {
      const prevIndex = currentStageIndex - 1;
      const currentStage = stages[currentStageIndex];
      const prevStage = stages[prevIndex];
      
      // Update step statuses based on stepId mapping
      const updatedSteps = [...steps];
      const currentStepIndex = steps.findIndex(s => s.id === currentStage.stepId);
      const prevStepIndex = steps.findIndex(s => s.id === prevStage.stepId);
      
      // Only update step status if moving to a DIFFERENT step
      if (prevStepIndex !== currentStepIndex && currentStepIndex !== -1 && prevStepIndex !== -1) {
        updatedSteps[currentStepIndex].status = "pending";
        updatedSteps[prevStepIndex].status = "in-progress";
      }
      
      set({ currentStageIndex: prevIndex, steps: updatedSteps });
    }
  },

  updateStageData: (data) => {
    const { currentStageIndex, stages } = get();
    const updatedStages = [...stages];
    updatedStages[currentStageIndex] = {
      ...updatedStages[currentStageIndex],
      ...data,
    };
    set({ stages: updatedStages });
  },

  updateEditorContent: (content) => {
    set({ editorContent: content });
  },

  updateEditorTitle: (title) => {
    set({ editorTitle: title });
  },

  completeStage: () => {
    const { currentStageIndex, stages } = get();
    const currentStage = stages[currentStageIndex];

    // Simulate processing for processing stages with agent work
    if (currentStage.type === "processing") {
      // Start agent work in demo store if agent is specified
      if (currentStage.agent && typeof window !== 'undefined') {
        // Import and use demo store dynamically
        import('@/stores/demoStore').then(({ useDemoStore }) => {
          const demoStore = useDemoStore.getState();
          demoStore.startAgentWork(
            currentStage.agent!,
            currentStage.title,
            currentStage.agentReasoning
          );
        });
      }
      
      const interval = setInterval(() => {
        const stage = get().stages[currentStageIndex];
        const progress = stage.progress || 0;
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Complete agent work in demo store
          if (currentStage.agent && typeof window !== 'undefined') {
            import('@/stores/demoStore').then(({ useDemoStore }) => {
              const demoStore = useDemoStore.getState();
              demoStore.completeAgentWork(currentStage.agent!);
            });
          }
          
          // Store mock output if available
          if (currentStage.mockOutput) {
            // Store the output based on stage type
            if (currentStage.id === 'brief-generation' || currentStage.id === 'brief') {
              get().updateStageData({ mockOutput: currentStage.mockOutput });
              // Set brief data
              if (currentStage.mockOutput.title) {
                set({ 
                  brief: {
                    title: currentStage.mockOutput.title,
                    wordCount: currentStage.mockOutput.targetWordCount,
                    readingTime: currentStage.mockOutput.estimatedReadTime,
                    keywords: currentStage.mockOutput.keywords,
                  }
                });
              }
            } else if (currentStage.id === 'content-generation' || currentStage.id === 'post-generation') {
              // Set editor content
              set({ 
                editorContent: currentStage.mockOutput,
                editorTitle: get().brief?.title || "Untitled",
              });
            }
          }
          
          get().nextStage();
        } else {
          get().updateStageData({ progress: progress + 10 });
        }
      }, 300);
    } else {
      get().nextStage();
    }
  },

  insertIntoInput: (content, position) => {
    const { currentStageIndex, stages } = get();
    const currentStage = stages[currentStageIndex];
    
    if (currentStage?.type === "input") {
      const currentValue = currentStage.inputValue || "";
      let newValue = "";
      
      switch (position) {
        case "replace":
          newValue = content;
          break;
        case "append":
          newValue = currentValue + (currentValue ? "\n\n" : "") + content;
          break;
        case "prepend":
          newValue = content + (currentValue ? "\n\n" : "") + currentValue;
          break;
      }
      
      get().updateStageData({ inputValue: newValue });
    }
  },
}));
