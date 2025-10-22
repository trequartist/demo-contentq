"use client";

import { create } from 'zustand';
import type {
  CreatorState,
  CreatorTab,
  ChatMessage,
  OutputState,
  DiagnosticsOutput,
  PlaybookStrategy,
  PlaybookOutput,
  PostOutput,
  IntermediateStep,
  DiagnosticsMode,
  PlaybookMode,
  ContentMode,
} from './types';

const createEmptySession = () => ({
  messages: [] as ChatMessage[],
  outputState: 'empty' as OutputState,
  intermediateSteps: [] as IntermediateStep[],
  
  // Version management
  activeVersion: 1 as 1 | 2,
  hasV2: false,
  v1Data: undefined as any,
  v2Data: undefined as any,
  
  diagnosticsOutput: undefined as DiagnosticsOutput | undefined,
  playbookStrategies: undefined as PlaybookStrategy[] | undefined,
  selectedStrategies: undefined as string[] | undefined,
  playbookOutput: undefined as PlaybookOutput | undefined,
  postOutput: undefined as PostOutput | undefined,
  mode: undefined as DiagnosticsMode | PlaybookMode | ContentMode | undefined,
});

interface CreatorStore extends CreatorState {
  setActiveTab: (tab: CreatorTab) => void;
  setMode: (tab: CreatorTab, mode: DiagnosticsMode | PlaybookMode | ContentMode) => void;
  addMessage: (tab: CreatorTab, message: ChatMessage) => void;
  setOutputState: (tab: CreatorTab, state: OutputState) => void;
  removeMessagesByRole: (tab: CreatorTab, role: ChatMessage['role']) => void;

  // Version management
  setActiveVersion: (tab: CreatorTab, version: 1 | 2) => void;
  generateV2: (tab: CreatorTab, v2Data: any) => void;
  storeV1Data: (tab: CreatorTab, v1Data: any) => void;

  // Diagnostics
  setDiagnosticsOutput: (output: DiagnosticsOutput) => void;

  // Playbook
  setPlaybookStrategies: (strategies: PlaybookStrategy[]) => void;
  setSelectedStrategies: (ids: string[]) => void;
  setPlaybookOutput: (output: PlaybookOutput) => void;

  // Posts
  setPostOutput: (output: PostOutput) => void;

  // Generic
  setIntermediateSteps: (tab: CreatorTab, steps: IntermediateStep[]) => void;
  resetSession: (tab: CreatorTab) => void;
}

const baseStore = create<CreatorStore>((set) => ({
  activeTab: 'diagnostics',
  modes: {
    diagnostics: 'diagnostics',
    playbook: 'playbook',
    posts: 'create',
  },
  sessions: {
    diagnostics: createEmptySession(),
    playbook: createEmptySession(),
    posts: createEmptySession(),
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setMode: (tab, mode) =>
    set((state) => {
      const updatedModes = { ...state.modes };
      if (tab === 'diagnostics') {
        updatedModes.diagnostics = mode as DiagnosticsMode;
      } else if (tab === 'playbook') {
        updatedModes.playbook = mode as PlaybookMode;
      } else if (tab === 'posts') {
        updatedModes.posts = mode as ContentMode;
      }

      return {
        modes: updatedModes,
        sessions: {
          ...state.sessions,
          [tab]: {
            ...state.sessions[tab],
            mode,
          },
        },
      };
    }),

  addMessage: (tab, message) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          messages: [...state.sessions[tab].messages, message],
        },
      },
    })),

  removeMessagesByRole: (tab, role) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          messages: state.sessions[tab].messages.filter((msg) => msg.role !== role),
        },
      },
    })),

  setOutputState: (tab, outputState) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          outputState,
        },
      },
    })),

  // Diagnostics
  setDiagnosticsOutput: (diagnosticsOutput) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        diagnostics: {
          ...state.sessions.diagnostics,
          diagnosticsOutput,
        },
      },
    })),

  // Playbook
  setPlaybookStrategies: (playbookStrategies) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        playbook: {
          ...state.sessions.playbook,
          playbookStrategies,
        },
      },
    })),

  setSelectedStrategies: (selectedStrategies) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        playbook: {
          ...state.sessions.playbook,
          selectedStrategies,
        },
      },
    })),

  setPlaybookOutput: (playbookOutput) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        playbook: {
          ...state.sessions.playbook,
          playbookOutput,
        },
      },
    })),

  // Posts
  setPostOutput: (postOutput) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        posts: {
          ...state.sessions.posts,
          postOutput,
        },
      },
    })),

  setIntermediateSteps: (tab, intermediateSteps) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          intermediateSteps,
        },
      },
    })),

  resetSession: (tab) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: createEmptySession(),
      },
    })),

  // Version management actions
  setActiveVersion: (tab, version) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          activeVersion: version,
        },
      },
    })),

  generateV2: (tab, v2Data) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          v2Data,
          hasV2: true,
          activeVersion: 2, // Auto-switch to V2
        },
      },
    })),

  storeV1Data: (tab, v1Data) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [tab]: {
          ...state.sessions[tab],
          v1Data,
        },
      },
    })),
}));

export const useCreatorStore = Object.assign(baseStore, {
  use: new Proxy({}, {
    get: (_, prop: keyof CreatorStore) => () => baseStore((state) => state[prop]),
  }) as any,
});
