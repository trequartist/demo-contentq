"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Document {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'brief' | 'post' | 'published' | 'idea';
  date: string;
  wordCount: number;
  type: 'blog' | 'linkedin';
  content?: string;
  tags?: string[];
  author?: string;
  lastEdited?: string;
}

interface Asset {
  id: string;
  name: string;
  company: string;
  type: 'blog' | 'linkedin';
  status: 'active' | 'inactive';
  progress: {
    document: boolean;
    diagnostics: boolean;
    playbook: boolean;
    completed: number;
    total: number;
  };
  lastUpdated: string;
}

interface DiagnosticReport {
  id: string;
  assetName: string;
  assetType: 'blog' | 'linkedin';
  date: string;
  status: 'good' | 'needs-work' | 'poor';
  visibilityScore: number;
  metrics: {
    visibility: number;
    content: number;
    position: number;
  };
  completed: boolean;
}

interface CalendarEvent {
  id: string;
  date: number;
  month: number;
  year: number;
  title: string;
  shortTitle: string;
  status: string;
  type: string;
  ideas: number;
  articles?: any[];
}

interface DemoState {
  documents: Document[];
  assets: Asset[];
  diagnostics: DiagnosticReport[];
  calendarEvents: CalendarEvent[];
  user: {
    name: string;
    email: string;
    company: string;
  };
  metrics: {
    totalContent: number;
    published: number;
    inProgress: number;
  };
  selectedAsset: string | null;
  searchQuery: string;
  filters: {
    status: string[];
    type: string[];
  };
}

interface DemoContextType {
  state: DemoState;
  actions: {
    createDocument: (doc: Partial<Document>) => void;
    updateDocument: (id: string, updates: Partial<Document>) => void;
    deleteDocument: (id: string) => void;
    searchDocuments: (query: string) => Document[];
    filterDocuments: (filters: any) => Document[];
    setSelectedAsset: (assetId: string) => void;
    createAsset: (asset: Partial<Asset>) => void;
    updateAsset: (id: string, updates: Partial<Asset>) => void;
    runDiagnostics: (assetId: string) => void;
    createCalendarEvent: (event: Partial<CalendarEvent>) => void;
    updateMetrics: () => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: any) => void;
  };
}

const DemoContext = createContext<DemoContextType | null>(null);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return context;
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DemoState>({
    documents: [],
    assets: [],
    diagnostics: [],
    calendarEvents: [],
    user: {
      name: 'Ashish',
      email: 'ashish@kiwiq.ai',
      company: 'KiwiQ'
    },
    metrics: {
      totalContent: 102,
      published: 47,
      inProgress: 30
    },
    selectedAsset: null,
    searchQuery: '',
    filters: {
      status: [],
      type: []
    }
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load documents
      const docsResponse = await fetch('/api/demo/documents');
      const documents = await docsResponse.json().catch(() => generateInitialDocuments());
      
      // Load assets
      const assetsResponse = await fetch('/api/demo/assets');
      const assets = await assetsResponse.json().catch(() => generateInitialAssets());
      
      // Load diagnostics
      const diagnosticsResponse = await fetch('/api/demo/diagnostics');
      const diagnostics = await diagnosticsResponse.json().catch(() => generateInitialDiagnostics());
      
      // Load calendar
      const calendarResponse = await fetch('/api/demo/calendar');
      const calendarEvents = await calendarResponse.json().catch(() => generateInitialCalendarEvents());

      setState(prev => ({
        ...prev,
        documents,
        assets,
        diagnostics,
        calendarEvents
      }));
    } catch (error) {
      // Use generated data if API fails
      setState(prev => ({
        ...prev,
        documents: generateInitialDocuments(),
        assets: generateInitialAssets(),
        diagnostics: generateInitialDiagnostics(),
        calendarEvents: generateInitialCalendarEvents()
      }));
    }
  };

  const generateInitialDocuments = (): Document[] => {
    return [
      {
        id: 'doc-1',
        title: 'Achieving Enterprise-Grade Speech Recognition: Deepgram\'s Nova-3 Model Benchmarking',
        description: 'Comprehensive analysis of Deepgram\'s Nova-3 model performance in enterprise environments',
        status: 'draft',
        date: '2025-03-09',
        wordCount: 719,
        type: 'blog',
        tags: ['AI', 'Speech Recognition', 'Enterprise'],
        author: 'Ashish',
        lastEdited: '2 hours ago'
      },
      {
        id: 'doc-2',
        title: 'Setting the Standard: Deepgram\'s Reproducible Benchmarking',
        description: 'Establishing industry standards for speech-to-text benchmarking',
        status: 'post',
        date: '2025-03-09',
        wordCount: 603,
        type: 'blog',
        tags: ['Benchmarking', 'Standards'],
        author: 'Ashish',
        lastEdited: '1 day ago'
      },
      {
        id: 'doc-3',
        title: 'Advanced Speech-to-Text Benchmarking and Compliance Strategies',
        description: 'Enterprise voice compliance and benchmarking strategies',
        status: 'draft',
        date: '2025-03-09',
        wordCount: 703,
        type: 'blog',
        tags: ['Compliance', 'Enterprise', 'Voice AI'],
        author: 'Ashish',
        lastEdited: '3 days ago'
      },
      {
        id: 'doc-4',
        title: 'LinkedIn Post: AI Leadership Insights',
        description: 'Thought leadership on AI implementation strategies',
        status: 'published',
        date: '2025-03-08',
        wordCount: 150,
        type: 'linkedin',
        tags: ['Leadership', 'AI'],
        author: 'Ashish',
        lastEdited: '1 week ago'
      },
      {
        id: 'doc-5',
        title: 'Building Scalable Voice AI Solutions',
        description: 'Architecture patterns for scalable voice AI implementations',
        status: 'brief',
        date: '2025-03-07',
        wordCount: 0,
        type: 'blog',
        tags: ['Architecture', 'Scalability'],
        author: 'Ashish',
        lastEdited: '2 weeks ago'
      }
    ];
  };

  const generateInitialAssets = (): Asset[] => {
    return [
      {
        id: 'asset-1',
        name: 'Deepgram',
        company: 'deepgram',
        type: 'blog',
        status: 'active',
        progress: {
          document: true,
          diagnostics: true,
          playbook: true,
          completed: 3,
          total: 3
        },
        lastUpdated: '2025-08-25'
      },
      {
        id: 'asset-2',
        name: 'bhavya-misra-70979351',
        company: 'bhavya-misra-70979351',
        type: 'linkedin',
        status: 'active',
        progress: {
          document: true,
          diagnostics: true,
          playbook: true,
          completed: 3,
          total: 3
        },
        lastUpdated: '2025-08-25'
      }
    ];
  };

  const generateInitialDiagnostics = (): DiagnosticReport[] => {
    return [
      {
        id: 'diag-1',
        assetName: 'bhavya-misra-70979351',
        assetType: 'linkedin',
        date: '2025-08-25',
        status: 'good',
        visibilityScore: 61,
        metrics: {
          visibility: 61,
          content: 75,
          position: 76
        },
        completed: true
      },
      {
        id: 'diag-2',
        assetName: 'Deepgram',
        assetType: 'blog',
        date: '2025-08-15',
        status: 'needs-work',
        visibilityScore: 57,
        metrics: {
          visibility: 57,
          content: 70,
          position: 72
        },
        completed: false
      }
    ];
  };

  const generateInitialCalendarEvents = (): CalendarEvent[] => {
    return [
      {
        id: 'event-1',
        date: 3,
        month: 8,
        year: 2025,
        title: 'The Ultimate Guide to Migrating from AWS/Google/OpenAI Whisper to Deepgram',
        shortTitle: 'The Ultimate Guide to M...',
        status: 'complete',
        type: 'blog',
        ideas: 4
      },
      {
        id: 'event-2',
        date: 11,
        month: 8,
        year: 2025,
        title: 'Transparent, reproducible benchmarking for real-time STT',
        shortTitle: 'Transparent, reproducti...',
        status: 'complete',
        type: 'blog',
        ideas: 4
      },
      {
        id: 'event-3',
        date: 18,
        month: 8,
        year: 2025,
        title: 'Deepgram Integration Blueprints',
        shortTitle: 'Deepgram Integration B...',
        status: 'complete',
        type: 'blog',
        ideas: 4
      }
    ];
  };

  const actions = {
    createDocument: (doc: Partial<Document>) => {
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        title: doc.title || 'Untitled Document',
        description: doc.description || '',
        status: doc.status || 'draft',
        date: new Date().toISOString().split('T')[0],
        wordCount: 0,
        type: doc.type || 'blog',
        tags: doc.tags || [],
        author: state.user.name,
        lastEdited: 'Just now',
        ...doc
      };
      
      setState(prev => ({
        ...prev,
        documents: [newDoc, ...prev.documents]
      }));
    },

    updateDocument: (id: string, updates: Partial<Document>) => {
      setState(prev => ({
        ...prev,
        documents: prev.documents.map(doc => 
          doc.id === id ? { ...doc, ...updates, lastEdited: 'Just now' } : doc
        )
      }));
    },

    deleteDocument: (id: string) => {
      setState(prev => ({
        ...prev,
        documents: prev.documents.filter(doc => doc.id !== id)
      }));
    },

    searchDocuments: (query: string) => {
      if (!query) return state.documents;
      
      const lowerQuery = query.toLowerCase();
      return state.documents.filter(doc => 
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.description.toLowerCase().includes(lowerQuery) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    },

    filterDocuments: (filters: any) => {
      let filtered = [...state.documents];
      
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(doc => filters.status.includes(doc.status));
      }
      
      if (filters.type && filters.type.length > 0) {
        filtered = filtered.filter(doc => filters.type.includes(doc.type));
      }
      
      return filtered;
    },

    setSelectedAsset: (assetId: string) => {
      setState(prev => ({ ...prev, selectedAsset: assetId }));
    },

    createAsset: (asset: Partial<Asset>) => {
      const newAsset: Asset = {
        id: `asset-${Date.now()}`,
        name: asset.name || 'New Asset',
        company: asset.company || '',
        type: asset.type || 'blog',
        status: 'active',
        progress: {
          document: false,
          diagnostics: false,
          playbook: false,
          completed: 0,
          total: 3
        },
        lastUpdated: new Date().toISOString().split('T')[0],
        ...asset
      };
      
      setState(prev => ({
        ...prev,
        assets: [...prev.assets, newAsset]
      }));
    },

    updateAsset: (id: string, updates: Partial<Asset>) => {
      setState(prev => ({
        ...prev,
        assets: prev.assets.map(asset => 
          asset.id === id ? { ...asset, ...updates } : asset
        )
      }));
    },

    runDiagnostics: (assetId: string) => {
      const asset = state.assets.find(a => a.id === assetId);
      if (!asset) return;

      const newReport: DiagnosticReport = {
        id: `diag-${Date.now()}`,
        assetName: asset.name,
        assetType: asset.type,
        date: new Date().toISOString().split('T')[0],
        status: 'good',
        visibilityScore: Math.floor(Math.random() * 40) + 60,
        metrics: {
          visibility: Math.floor(Math.random() * 40) + 60,
          content: Math.floor(Math.random() * 40) + 60,
          position: Math.floor(Math.random() * 40) + 60
        },
        completed: true
      };

      setState(prev => ({
        ...prev,
        diagnostics: [newReport, ...prev.diagnostics]
      }));
    },

    createCalendarEvent: (event: Partial<CalendarEvent>) => {
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`,
        date: event.date || 1,
        month: event.month || new Date().getMonth(),
        year: event.year || new Date().getFullYear(),
        title: event.title || 'New Event',
        shortTitle: event.shortTitle || 'New Event',
        status: 'pending',
        type: 'blog',
        ideas: 0,
        ...event
      };

      setState(prev => ({
        ...prev,
        calendarEvents: [...prev.calendarEvents, newEvent]
      }));
    },

    updateMetrics: () => {
      const published = state.documents.filter(d => d.status === 'published').length;
      const inProgress = state.documents.filter(d => d.status === 'draft' || d.status === 'brief').length;
      
      setState(prev => ({
        ...prev,
        metrics: {
          totalContent: prev.documents.length,
          published,
          inProgress
        }
      }));
    },

    setSearchQuery: (query: string) => {
      setState(prev => ({ ...prev, searchQuery: query }));
    },

    setFilters: (filters: any) => {
      setState(prev => ({ ...prev, filters }));
    }
  };

  return (
    <DemoContext.Provider value={{ state, actions }}>
      {children}
    </DemoContext.Provider>
  );
};
