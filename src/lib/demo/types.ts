// Real data structures from diagnostic and playbook
export interface DiagnosticReport {
  id: string;
  overallScore: number;
  aiVisibility: number;
  competitivePosition: string;
  criticalGaps: string[];
  opportunities: Array<{
    title: string;
    searches: number;
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
  }>;
}

export interface PlaybookStrategy {
  id: string;
  title: string;
  plays: Array<{
    id: string;
    name: string;
    effort: number;
    opportunity: number;
    impact: 'high' | 'medium' | 'low';
    status: 'active' | 'planned' | 'completed';
    description: string;
  }>;
  timeline: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
    phase4: string[];
  };
}

export interface ContentWorkflow {
  id: string;
  type: 'create' | 'improve' | 'linkedinCreate';
  stage: 'input' | 'topics' | 'brief' | 'draft' | 'complete';
  status: 'pending' | 'in_progress' | 'completed';
  data: any;
  progress: number;
}
