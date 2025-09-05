// UI Controller - Executes real frontend actions based on AI commands
// This is the brain that controls the entire frontend autonomously

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface UIAction {
  type: 'navigate' | 'click' | 'modal' | 'form' | 'workflow' | 'state' | 'scroll' | 'export' | 'toggle';
  target: string;
  params?: any;
}

export interface UIElement {
  id: string;
  selector?: string;
  stateRef?: string;
  handler?: () => void;
  description: string;
}

export class UIController {
  private router: AppRouterInstance;
  private stateRefs: Map<string, any> = new Map();
  private activeModals: Set<string> = new Set();
  private currentPage: string = '';
  
  // Complete mapping of all UI elements in the product
  private uiElements = {
    // Navigation targets
    navigation: {
      dashboard: '/demo/dashboard',
      content: '/demo/content-studio',
      calendar: '/demo/content-studio/calendar',
      create: '/demo/content-studio/create',
      documents: '/demo/content-studio',
      diagnostics: '/demo/diagnostics',
      playbook: '/demo/playbook',
      insights: '/demo/insights',
      analytics: '/demo/analytics',
      assets: '/demo/assets',
      settings: '/demo/settings',
      login: '/demo/login'
    },
    
    // Modal controls
    modals: {
      diagnostics: {
        fixModal: { setter: 'setShowFixModal', value: true },
        implementationModal: { setter: 'setShowImplementationModal', value: true },
        exportMenu: { setter: 'setExportFormat', value: 'json' }
      },
      playbook: {
        exportMenu: { setter: 'setShowExportMenu', value: true },
        implementationModal: { setter: 'setShowImplementationModal', value: true },
        emergencyModal: { setter: 'setShowEmergencyModal', value: true }
      },
      insights: {
        insightModal: { setter: 'setSelectedInsight', value: 'dynamic' },
        additionalInsights: { setter: 'setShowAdditionalInsights', value: true }
      },
      contentStudio: {
        topicModal: { setter: 'setShowTopicModal', value: true },
        scheduleModal: { setter: 'setShowScheduleModal', value: true }
      }
    },
    
    // Button actions
    buttons: {
      // Dashboard buttons
      createContent: {
        blog: { workflow: 'blog-create', navigate: '/demo/content-studio/create' },
        linkedin: { workflow: 'linkedin-create', navigate: '/demo/content-studio/create' },
        improve: { workflow: 'blog-improve', navigate: '/demo/content-studio/create' }
      },
      
      // Diagnostics buttons
      diagnostics: {
        exportJson: { function: 'handleExportReport', params: ['json'] },
        exportCsv: { function: 'handleExportReport', params: ['csv'] },
        startFixing: { modal: 'fixModal' },
        startImplementation: { modal: 'implementationModal' },
        fixIssues: { function: 'handleFixIssues' }
      },
      
      // Playbook buttons
      playbook: {
        exportPlaybook: { function: 'handleExportPlaybook' },
        startImplementation: { modal: 'implementationModal' },
        emergencyResponse: { modal: 'emergencyModal' },
        copyTopic: { function: 'handleCopyTopic' }
      },
      
      // Common actions
      common: {
        close: { action: 'closeModal' },
        save: { action: 'save' },
        cancel: { action: 'cancel' },
        refresh: { action: 'refresh' },
        search: { action: 'search' }
      }
    },
    
    // Form inputs
    forms: {
      contentCreation: {
        title: { field: 'title', type: 'text' },
        topic: { field: 'topic', type: 'text' },
        keywords: { field: 'keywords', type: 'text' },
        description: { field: 'description', type: 'textarea' },
        content: { field: 'content', type: 'textarea' }
      },
      linkedin: {
        angle: { field: 'selectedAngle', type: 'select' },
        hook: { field: 'hook', type: 'text' },
        painPoint: { field: 'painPoint', type: 'text' },
        outcome: { field: 'outcome', type: 'text' }
      },
      filters: {
        category: { field: 'selectedCategory', type: 'select' },
        priority: { field: 'selectedPriority', type: 'select' },
        timeframe: { field: 'timeframe', type: 'select' },
        sortBy: { field: 'sortBy', type: 'select' }
      }
    },
    
    // Workflows
    workflows: {
      content: {
        createBlog: { type: 'blog-create', stages: ['topic', 'outline', 'draft', 'optimize', 'publish'] },
        createLinkedIn: { type: 'linkedin-create', stages: ['input', 'angles', 'brief', 'create', 'schedule'] },
        improveContent: { type: 'blog-improve', stages: ['import', 'analysis', 'suggestions', 'editing', 'complete'] }
      }
    }
  };
  
  constructor(router: AppRouterInstance) {
    this.router = router;
    this.currentPage = typeof window !== 'undefined' ? window.location.pathname : '';
  }
  
  // Register state setters from components
  registerStateRef(name: string, ref: any) {
    this.stateRefs.set(name, ref);
  }
  
  // Main execution function
  async execute(action: UIAction): Promise<any> {
    switch (action.type) {
      case 'navigate':
        return this.navigate(action.target, action.params);
      case 'click':
        return this.clickButton(action.target, action.params);
      case 'modal':
        return this.toggleModal(action.target, action.params);
      case 'form':
        return this.fillForm(action.target, action.params);
      case 'workflow':
        return this.startWorkflow(action.target, action.params);
      case 'state':
        return this.setState(action.target, action.params);
      case 'scroll':
        return this.scrollTo(action.target);
      case 'export':
        return this.exportData(action.target, action.params);
      case 'toggle':
        return this.toggleElement(action.target, action.params);
      default:
        return { success: false, message: 'Unknown action type' };
    }
  }
  
  // Navigate to a page
  private async navigate(target: string, params?: any) {
    const route = this.uiElements.navigation[target as keyof typeof this.uiElements.navigation];
    
    if (route) {
      this.router.push(route);
      this.currentPage = route;
      
      // Wait for navigation to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return { 
        success: true, 
        message: `Navigated to ${target}`,
        currentPage: route 
      };
    }
    
    return { success: false, message: `Unknown navigation target: ${target}` };
  }
  
  // Click a button programmatically
  private async clickButton(buttonId: string, params?: any) {
    // Try to find the button in DOM first
    const button = document.querySelector(`[data-button-id="${buttonId}"]`) as HTMLButtonElement;
    
    if (button) {
      button.click();
      return { success: true, message: `Clicked button: ${buttonId}` };
    }
    
    // If not in DOM, execute the associated action
    const [category, action] = buttonId.split('.');
    const buttonConfig = this.uiElements.buttons[category as keyof typeof this.uiElements.buttons];
    
    if (buttonConfig && buttonConfig[action as keyof typeof buttonConfig]) {
      const config = buttonConfig[action as keyof typeof buttonConfig] as any;
      
      if (config.workflow) {
        return this.startWorkflow(config.workflow, params);
      }
      
      if (config.navigate) {
        return this.navigate(config.navigate, params);
      }
      
      if (config.modal) {
        return this.toggleModal(config.modal, true);
      }
      
      if (config.function && this.stateRefs.has(config.function)) {
        const fn = this.stateRefs.get(config.function);
        fn(...(config.params || []));
        return { success: true, message: `Executed function: ${config.function}` };
      }
    }
    
    // Fallback: try to click by selector
    const element = document.querySelector(buttonId) as HTMLElement;
    if (element) {
      element.click();
      return { success: true, message: `Clicked element: ${buttonId}` };
    }
    
    return { success: false, message: `Button not found: ${buttonId}` };
  }
  
  // Toggle modal visibility
  private async toggleModal(modalName: string, show: boolean = true) {
    // Find the modal configuration
    for (const [page, modals] of Object.entries(this.uiElements.modals)) {
      const modal = modals[modalName as keyof typeof modals];
      
      if (modal) {
        const setter = this.stateRefs.get(modal.setter);
        
        if (setter) {
          const value = modal.value === 'dynamic' ? params : (show ? modal.value : null);
          setter(value);
          
          if (show) {
            this.activeModals.add(modalName);
          } else {
            this.activeModals.delete(modalName);
          }
          
          return { 
            success: true, 
            message: `${show ? 'Opened' : 'Closed'} modal: ${modalName}`,
            activeModals: Array.from(this.activeModals)
          };
        }
      }
    }
    
    return { success: false, message: `Modal not found: ${modalName}` };
  }
  
  // Fill form fields
  private async fillForm(formName: string, data: Record<string, any>) {
    const form = this.uiElements.forms[formName as keyof typeof this.uiElements.forms];
    
    if (!form) {
      return { success: false, message: `Form not found: ${formName}` };
    }
    
    const results: any[] = [];
    
    for (const [fieldName, fieldConfig] of Object.entries(form)) {
      if (data[fieldName] !== undefined) {
        const config = fieldConfig as any;
        const setter = this.stateRefs.get(`set${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`);
        
        if (setter) {
          setter(data[fieldName]);
          results.push({ field: fieldName, value: data[fieldName], success: true });
        } else {
          // Try to fill input directly in DOM
          const input = document.querySelector(`[name="${config.field}"]`) as HTMLInputElement;
          if (input) {
            input.value = data[fieldName];
            input.dispatchEvent(new Event('change', { bubbles: true }));
            results.push({ field: fieldName, value: data[fieldName], success: true });
          }
        }
      }
    }
    
    return { 
      success: true, 
      message: `Filled form: ${formName}`,
      filledFields: results 
    };
  }
  
  // Start a workflow
  private async startWorkflow(workflowName: string, params?: any) {
    const contentStore = this.stateRefs.get('contentStore');
    
    if (contentStore && contentStore.startWorkflow) {
      contentStore.startWorkflow(workflowName);
      
      // Navigate to appropriate page
      await this.navigate('create', params);
      
      return { 
        success: true, 
        message: `Started workflow: ${workflowName}`,
        workflow: workflowName 
      };
    }
    
    return { success: false, message: `Unable to start workflow: ${workflowName}` };
  }
  
  // Set component state directly
  private async setState(stateKey: string, value: any) {
    const setter = this.stateRefs.get(stateKey);
    
    if (setter) {
      setter(value);
      return { 
        success: true, 
        message: `Set state: ${stateKey}`,
        newValue: value 
      };
    }
    
    return { success: false, message: `State setter not found: ${stateKey}` };
  }
  
  // Scroll to element
  private async scrollTo(target: string) {
    const element = document.querySelector(target) as HTMLElement;
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return { success: true, message: `Scrolled to: ${target}` };
    }
    
    return { success: false, message: `Element not found: ${target}` };
  }
  
  // Export data
  private async exportData(dataType: string, format: string = 'json') {
    const exportHandlers = this.stateRefs.get('exportHandlers');
    
    if (exportHandlers && exportHandlers[dataType]) {
      exportHandlers[dataType](format);
      return { 
        success: true, 
        message: `Exported ${dataType} as ${format}`,
        dataType,
        format 
      };
    }
    
    // Try to find export button and click it
    const exportButton = document.querySelector(`[data-export="${dataType}"]`) as HTMLButtonElement;
    if (exportButton) {
      exportButton.click();
      return { success: true, message: `Triggered export for: ${dataType}` };
    }
    
    return { success: false, message: `Export handler not found: ${dataType}` };
  }
  
  // Toggle UI element visibility
  private async toggleElement(elementId: string, show?: boolean) {
    const element = document.querySelector(elementId) as HTMLElement;
    
    if (element) {
      if (show !== undefined) {
        element.style.display = show ? 'block' : 'none';
      } else {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
      }
      
      return { 
        success: true, 
        message: `Toggled element: ${elementId}`,
        visible: element.style.display !== 'none'
      };
    }
    
    return { success: false, message: `Element not found: ${elementId}` };
  }
  
  // Get current UI state
  getCurrentState() {
    return {
      currentPage: this.currentPage,
      activeModals: Array.from(this.activeModals),
      registeredRefs: Array.from(this.stateRefs.keys())
    };
  }
  
  // Perform complex UI sequences
  async executeSequence(actions: UIAction[]): Promise<any[]> {
    const results = [];
    
    for (const action of actions) {
      const result = await this.execute(action);
      results.push(result);
      
      // Add delay between actions for UI to update
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return results;
  }
  
  // Smart action detection from natural language
  detectAction(input: string): UIAction[] {
    const actions: UIAction[] = [];
    const normalized = input.toLowerCase();
    
    // Navigation detection
    if (normalized.includes('go to') || normalized.includes('navigate') || normalized.includes('open')) {
      for (const [key, route] of Object.entries(this.uiElements.navigation)) {
        if (normalized.includes(key)) {
          actions.push({ type: 'navigate', target: key });
          break;
        }
      }
    }
    
    // Modal detection
    if (normalized.includes('show') || normalized.includes('open')) {
      if (normalized.includes('modal') || normalized.includes('dialog')) {
        for (const [page, modals] of Object.entries(this.uiElements.modals)) {
          for (const modalName of Object.keys(modals)) {
            if (normalized.includes(modalName.toLowerCase())) {
              actions.push({ type: 'modal', target: modalName, params: true });
              break;
            }
          }
        }
      }
    }
    
    // Button click detection
    if (normalized.includes('click') || normalized.includes('press') || normalized.includes('tap')) {
      // Extract button identifier
      const buttonMatch = normalized.match(/(?:click|press|tap)\s+(?:the\s+)?(\w+)/);
      if (buttonMatch) {
        actions.push({ type: 'click', target: buttonMatch[1] });
      }
    }
    
    // Workflow detection
    if (normalized.includes('create') || normalized.includes('start')) {
      if (normalized.includes('blog')) {
        actions.push({ type: 'workflow', target: 'blog-create' });
      } else if (normalized.includes('linkedin')) {
        actions.push({ type: 'workflow', target: 'linkedin-create' });
      } else if (normalized.includes('improve')) {
        actions.push({ type: 'workflow', target: 'blog-improve' });
      }
    }
    
    // Export detection
    if (normalized.includes('export') || normalized.includes('download')) {
      let format = 'json';
      if (normalized.includes('csv')) format = 'csv';
      else if (normalized.includes('pdf')) format = 'pdf';
      else if (normalized.includes('excel')) format = 'excel';
      
      actions.push({ type: 'export', target: 'data', params: format });
    }
    
    // Form filling detection
    if (normalized.includes('fill') || normalized.includes('enter') || normalized.includes('type')) {
      const formMatch = normalized.match(/(?:fill|enter|type)\s+(.+)/);
      if (formMatch) {
        // Extract form data from input
        const formData = this.extractFormData(formMatch[1]);
        if (Object.keys(formData).length > 0) {
          actions.push({ type: 'form', target: 'contentCreation', params: formData });
        }
      }
    }
    
    return actions;
  }
  
  // Extract form data from natural language
  private extractFormData(input: string): Record<string, any> {
    const data: Record<string, any> = {};
    
    // Extract title
    const titleMatch = input.match(/title[:\s]+["']?([^"',]+)["']?/i);
    if (titleMatch) data.title = titleMatch[1].trim();
    
    // Extract topic
    const topicMatch = input.match(/(?:topic|about)[:\s]+["']?([^"',]+)["']?/i);
    if (topicMatch) data.topic = topicMatch[1].trim();
    
    // Extract keywords
    const keywordsMatch = input.match(/keywords?[:\s]+["']?([^"']+)["']?/i);
    if (keywordsMatch) data.keywords = keywordsMatch[1].trim();
    
    return data;
  }
}
