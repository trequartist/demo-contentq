// Content Studio Data Loader
import gumloopData from '@/usableclientdata/content-studio/gumloop-content-data.json';
import workflowTemplates from '@/usableclientdata/content-studio/workflow-templates.json';

export interface ContentStudioData {
  client: typeof gumloopData.client;
  workflows: typeof gumloopData.workflows;
  documents: typeof gumloopData.documents;
  calendar: typeof gumloopData.calendar;
  templates: typeof gumloopData.templates;
  analytics: typeof gumloopData.analytics;
  aiAssistant: typeof gumloopData.aiAssistant;
  workflowTemplates: typeof workflowTemplates;
}

class ContentStudioDataLoader {
  private static instance: ContentStudioDataLoader;
  private data: ContentStudioData;

  private constructor() {
    this.data = {
      client: gumloopData.client,
      workflows: gumloopData.workflows,
      documents: gumloopData.documents,
      calendar: gumloopData.calendar,
      templates: gumloopData.templates,
      analytics: gumloopData.analytics,
      aiAssistant: gumloopData.aiAssistant,
      workflowTemplates: workflowTemplates
    };
  }

  static getInstance(): ContentStudioDataLoader {
    if (!ContentStudioDataLoader.instance) {
      ContentStudioDataLoader.instance = new ContentStudioDataLoader();
    }
    return ContentStudioDataLoader.instance;
  }

  // Get all data
  getAllData(): ContentStudioData {
    return this.data;
  }

  // Get specific client data
  getClientData() {
    return this.data.client;
  }

  // Get workflows
  getWorkflows() {
    return this.data.workflows;
  }

  // Get documents with optional filtering
  getDocuments(filter?: { status?: string; type?: string }) {
    let docs = [...this.data.documents];
    
    if (filter?.status) {
      docs = docs.filter(doc => doc.status === filter.status);
    }
    
    if (filter?.type) {
      docs = docs.filter(doc => doc.type === filter.type);
    }
    
    return docs;
  }

  // Get document by ID
  getDocumentById(id: string) {
    return this.data.documents.find(doc => doc.id === id);
  }

  // Get calendar events
  getCalendarEvents(startDate?: Date, endDate?: Date) {
    let events = [...this.data.calendar.events];
    
    if (startDate && endDate) {
      events = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }
    
    return events;
  }

  // Get upcoming events
  getUpcomingEvents(limit: number = 5) {
    const now = new Date();
    return this.data.calendar.events
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  }

  // Get analytics
  getAnalytics() {
    return this.data.analytics;
  }

  // Get AI suggestions
  getAISuggestions() {
    return this.data.aiAssistant.suggestions;
  }

  // Get workflow templates
  getWorkflowTemplates(workflowType: 'blog' | 'linkedin' | 'improve') {
    switch (workflowType) {
      case 'blog':
        return this.data.workflowTemplates.blogWorkflow;
      case 'linkedin':
        return this.data.workflowTemplates.linkedinWorkflow;
      case 'improve':
        return this.data.workflowTemplates.improveWorkflow;
      default:
        return null;
    }
  }

  // Create new document (mock)
  createDocument(document: Partial<typeof gumloopData.documents[0]>) {
    const newDoc = {
      id: `doc-${Date.now()}`,
      ...document,
      dates: {
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        published: null,
        ...document.dates
      },
      performance: {
        views: 0,
        shares: 0,
        comments: 0,
        likes: 0,
        ...document.performance
      }
    } as typeof gumloopData.documents[0];
    
    this.data.documents.push(newDoc);
    return newDoc;
  }

  // Update document (mock)
  updateDocument(id: string, updates: Partial<typeof gumloopData.documents[0]>) {
    const index = this.data.documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      this.data.documents[index] = {
        ...this.data.documents[index],
        ...updates,
        dates: {
          ...this.data.documents[index].dates,
          ...updates.dates,
          modified: new Date().toISOString()
        }
      } as typeof gumloopData.documents[0];
      return this.data.documents[index];
    }
    return null;
  }

  // Delete document (mock)
  deleteDocument(id: string) {
    const index = this.data.documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      const deleted = this.data.documents.splice(index, 1);
      return deleted[0];
    }
    return null;
  }

  // Schedule document
  scheduleDocument(documentId: string, date: string) {
    const docData = this.getDocumentById(documentId);
    if (!docData) return null;
    
    const doc = this.updateDocument(documentId, {
      status: 'scheduled',
      dates: {
        ...docData.dates,
        scheduled: date
      } as any
    });
    
    if (doc) {
      // Add to calendar
      const event = {
        id: `evt-${Date.now()}`,
        title: `Publish: ${doc.title}`,
        type: 'publish',
        date: date,
        documentId: documentId,
        status: 'scheduled'
      };
      this.data.calendar.events.push(event);
    }
    
    return doc;
  }
}

export const contentStudioData = ContentStudioDataLoader.getInstance();
