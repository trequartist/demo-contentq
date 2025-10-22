import { ReactNode } from 'react';

export type CreatorTab = 'diagnostics' | 'playbook' | 'posts';

export type DiagnosticsMode = 'diagnostics' | 'insights';
export type PlaybookMode = 'playbook' | 'calendar';
export type ContentMode = 'create' | 'optimize';

export interface CreatorModes {
  diagnostics: DiagnosticsMode;
  playbook: PlaybookMode;
  posts: ContentMode;
}
export type OutputState =
  | 'empty'
  | 'awaiting_input'
  | 'awaiting_strategy'
  | 'awaiting_topic'
  | 'awaiting_brief'
  | 'streaming'
  | 'processing'
  | 'complete';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  component?: ReactNode; // For interactive components in chat
}

export interface IntermediateStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'complete';
  description?: string;
}

// Diagnostics
export type DiagnosticsOutput = Record<string, any>;

// Playbook
export interface PlaybookStrategy {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
}

export interface PlaybookContentPlay {
  play_name: string;
  implementation_strategy: string;
  content_formats?: string[];
  success_metrics?: string[];
  timeline?: string;
  resource_requirements?: string;
  example_topics?: string[];
}

export interface PlaybookSection {
  playbook_title: string;
  executive_summary: string;
  overall_recommendations?: string;
  content_plays?: PlaybookContentPlay[];
}

export interface PlaybookOutput {
  playbook_title: string;
  executive_summary: string;
  overall_recommendations: string;
  reasoning_for_recommendations: string;
  posts_per_week: number;
  generated_playbook?: PlaybookSection[];
  next_steps?: string[];
  selectedStrategies?: string[];
  [key: string]: any;
}

// Posts
export interface PostTopic {
  id: string;
  title: string;
  description: string;
  relevance: number;
}

export interface PostBrief {
  topic: string;
  targetAudience: string;
  keyMessages: string[];
  tone: string;
  structure: string[];
}

export interface PostDraft {
  title: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}

export interface PostOutput {
  topics?: PostTopic[];
  selectedTopic?: PostTopic;
  brief?: PostBrief;
  draft?: PostDraft;
}

// Session Data
export interface SessionData {
  messages: ChatMessage[];
  outputState: OutputState;
  mode?: DiagnosticsMode | PlaybookMode | ContentMode;
  
  // Version management
  activeVersion: 1 | 2;
  hasV2: boolean;
  v1Data?: any;
  v2Data?: any;
  
  // Tab-specific state
  diagnosticsOutput?: DiagnosticsOutput;
  playbookStrategies?: PlaybookStrategy[];
  selectedStrategies?: string[];
  playbookOutput?: PlaybookOutput;
  postOutput?: PostOutput;
  intermediateSteps: IntermediateStep[];
}

export interface CreatorState {
  activeTab: CreatorTab;
  sessions: {
    diagnostics: SessionData;
    playbook: SessionData;
    posts: SessionData;
  };
  modes: CreatorModes;
}
