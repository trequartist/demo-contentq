"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import * as Icons from 'lucide-react';
import { Card, Button, Badge, Input } from '@/components/ui';
import actionsDatabase from '@/usableclientdata/ai-assistant/actions-database.json';
import productActions from '@/usableclientdata/ai-assistant/product-specific-actions.json';
import aiContent from '@/usableclientdata/ai-assistant-content.json';
import promptExamples from '@/usableclientdata/ai-assistant/prompt-examples.json';
// @ts-ignore
import Fuse from 'fuse.js';
import { ActionExecutor } from '@/lib/ai-assistant/action-executor';
import { AdvancedMatcher } from '@/lib/ai-assistant/advanced-matcher';
import { UltraAdvancedAlgorithms } from '@/lib/ai-assistant/ultra-advanced-algorithms';
import megaUIActions from '@/usableclientdata/ai-assistant/mega-ui-actions.json';
import { useUIController } from '@/lib/ai-assistant/ui-context';

const { 
  Sparkles, X, Send, ChevronLeft, ChevronRight, 
  Command, Search, Mic, Camera, Paperclip, 
  Clock, Star, Zap, Brain, Target,
  BarChart3, FileText, Settings, PlayCircle,
  CheckCircle, AlertCircle, Info, ArrowRight
} = Icons;

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  actions?: any[];
  metadata?: any;
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  steps: TaskStep[];
  result?: any;
}

interface TaskStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: any;
}

export default function GlobalAiAssistant() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showExamples, setShowExamples] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('navigation');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uiController = useUIController();
  const actionExecutor = useRef(new ActionExecutor({ pathname }, router)).current;
  const advancedMatcher = new AdvancedMatcher();
  const ultraAlgorithms = new UltraAdvancedAlgorithms();

  // Initialize Fuse.js for fuzzy matching
  const fuseOptions = {
    keys: ['patterns', 'actions', 'variations'],
    threshold: 0.3,
    includeScore: true
  };

  // Get current context based on pathname
  const getCurrentContext = () => {
    if (pathname.includes('dashboard')) return 'dashboard';
    if (pathname.includes('content-studio')) return 'content_studio';
    if (pathname.includes('analytics')) return 'analytics';
    if (pathname.includes('diagnostics')) return 'diagnostics';
    if (pathname.includes('playbook')) return 'playbook';
    if (pathname.includes('insights')) return 'insights';
    if (pathname.includes('assets')) return 'assets';
    if (pathname.includes('settings')) return 'settings';
    return 'general';
  };

  // Ultra-smart command parser using 10+ advanced matching algorithms
  const parseCommand = async (input: string) => {
    
    // Show processing state
    const processingMessage: Message = {
      id: 'processing-' + Date.now(),
      type: 'system',
      content: '🧠 Processing with 12 algorithms...',
      timestamp: new Date(),
      status: 'processing'
    };
    setMessages(prev => [...prev, processingMessage]);
    
    // First try ultra-advanced algorithms for best match
    const allActions = getAllPossibleActions();
    const ultraMatch = ultraAlgorithms.ultraMatch(input, allActions, { 
      page: pathname, 
      history: commandHistory 
    });
    
    // Remove processing message
    setMessages(prev => prev.filter(m => m.id !== processingMessage.id));
    
    if (ultraMatch.confidence > 0.6) {
      // Execute the best matched action with UI control
      const { intent, entities } = advancedMatcher.extractIntent(ultraMatch.match);
      
      // Try to execute real UI action first
      const uiActionResult = await executeUIAction(ultraMatch.match, intent, entities);
      if (uiActionResult.success) {
        return {
          ...uiActionResult,
          message: `✨ ${uiActionResult.message}\n[AI: ${ultraMatch.algorithm} - ${Math.round(ultraMatch.confidence * 100)}% confidence]`,
          type: 'success'
        };
      }
      
      // Fallback to standard action executor
      const result = await actionExecutor.execute(ultraMatch.match, intent, entities);
      
      if (result.success) {
        return {
          ...result,
          message: `${result.message}\n[AI: ${ultraMatch.algorithm} - ${Math.round(ultraMatch.confidence * 100)}% confidence]`
        };
      }
    }
    
    // Fallback to advanced matcher
    const { intent, confidence, entities } = advancedMatcher.extractIntent(input);
    
    if (confidence > 0.5) {
      const uiActionResult = await executeUIAction(input, intent, entities);
      if (uiActionResult.success) {
        return uiActionResult;
      }
      
      const result = await actionExecutor.execute(input, intent, entities);
      if (result.success) {
        return result;
      }
    }
    const context = getCurrentContext();
    const normalizedInput = input.toLowerCase().trim();
    
    // Check for natural language patterns
    for (const [questionType, patterns] of Object.entries(actionsDatabase.naturalLanguagePatterns.questions)) {
      for (const pattern of patterns) {
        if (normalizedInput.startsWith(pattern)) {
          return handleQuestion(questionType, normalizedInput);
        }
      }
    }

    // Check for intent-based actions
    for (const [intent, synonyms] of Object.entries(actionsDatabase.naturalLanguagePatterns.intents)) {
      for (const synonym of synonyms) {
        if (normalizedInput.includes(synonym)) {
          return handleIntent(intent, normalizedInput, context);
        }
      }
    }

    // Fuzzy match against action categories
    const searchableActions = flattenActions();
    const fuse = new Fuse(searchableActions, fuseOptions);
    const results = fuse.search(normalizedInput);
    
    if (results.length > 0 && results[0].score! < 0.4) {
      return executeAction(results[0].item);
    }

    // Try to match with product-specific actions
    const productResult = await matchProductAction(normalizedInput);
    if (productResult) {
      return productResult;
    }
    
    // Fallback to AI interpretation
    return interpretWithAI(normalizedInput);
  };

  // Flatten actions for searchability
  const flattenActions = () => {
    const flattened: any[] = [];
    
    Object.entries(actionsDatabase.actionCategories).forEach(([category, categoryData]) => {
      Object.entries(categoryData).forEach(([subCategory, data]: [string, any]) => {
        if (data.patterns) {
          flattened.push({
            category,
            subCategory,
            patterns: data.patterns,
            actions: data.actions || [],
            variations: data.variations || []
          });
        }
      });
    });
    
    return flattened;
  };

  // Handle different types of questions
  const handleQuestion = (type: string, input: string) => {
    const responses: Record<string, string> = {
      what: `I'll help you understand that. Let me analyze...`,
      how: `I'll guide you through the process step by step...`,
      why: `Let me explain the reasoning behind this...`,
      when: `I'll help you determine the best timing...`,
      where: `I'll locate that information for you...`,
      who: `I'll identify the relevant people or roles...`
    };
    
    return {
      type: 'response',
      content: responses[type] || 'Let me help you with that...',
      actions: getSuggestedActions(input)
    };
  };

  // Handle intent-based actions
  const handleIntent = (intent: string, input: string, context: string) => {
    const contextActions = actionsDatabase.contextualActions[context as keyof typeof actionsDatabase.contextualActions] || [];
    const relevantActions = contextActions.filter(action => 
      action.toLowerCase().includes(intent.toLowerCase())
    );
    
    return {
      type: 'action',
      intent,
      actions: relevantActions,
      context
    };
  };

  // Match with product-specific actions
  const matchProductAction = async (input: string) => {
    // Extract intent from input
    let intent = 'generic';
    for (const [key, synonyms] of Object.entries(actionsDatabase.naturalLanguagePatterns.intents)) {
      for (const synonym of synonyms) {
        if (input.includes(synonym)) {
          intent = key;
          break;
        }
      }
    }
    
    // Execute using ActionExecutor
    const result = await actionExecutor.execute(input, intent, {});
    
    if (result.navigation) {
      router.push(result.navigation);
    }
    
    return {
      type: 'execution',
      content: result.message,
      data: result.data,
      actions: result.actions?.map(a => ({
        label: a.label,
        action: a.action,
        icon: a.icon || 'Sparkles'
      })),
      workflow: result.workflow
    };
  };
  
  // Execute an action
  const executeAction = async (action: any) => {
    const task: Task = {
      id: Date.now().toString(),
      title: action.subCategory || 'Task',
      description: `Executing ${action.category} operation`,
      status: 'in_progress',
      steps: generateTaskSteps(action)
    };
    
    setCurrentTask(task);
    
    // Simulate task execution
    for (let i = 0; i < task.steps.length; i++) {
      task.steps[i].status = 'in_progress';
      setCurrentTask({...task});
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      task.steps[i].status = 'completed';
      task.steps[i].result = `Step ${i + 1} completed successfully`;
      setCurrentTask({...task});
    }
    
    task.status = 'completed';
    setCurrentTask(task);
    
    return {
      type: 'task_complete',
      task
    };
  };

  // Generate task steps based on action
  const generateTaskSteps = (action: any): TaskStep[] => {
    const baseSteps = [
      { id: '1', name: 'Validating request', status: 'pending' as const, result: undefined },
      { id: '2', name: 'Preparing resources', status: 'pending' as const, result: undefined },
      { id: '3', name: 'Executing action', status: 'pending' as const, result: undefined },
      { id: '4', name: 'Verifying results', status: 'pending' as const, result: undefined }
    ];
    
    if (action.workflows) {
      return action.workflows.map((workflow: string, index: number) => ({
        id: `${index + 1}`,
        name: workflow.charAt(0).toUpperCase() + workflow.slice(1).replace('_', ' '),
        status: 'pending' as const,
        result: undefined
      }));
    }
    
    return baseSteps;
  };

  // AI interpretation fallback
  const interpretWithAI = (input: string) => {
    return {
      type: 'ai_response',
      content: `I understand you want to: "${input}". Let me process this request and provide the best solution...`,
      suggestions: getSmartSuggestions(input)
    };
  };

  // Execute UI action directly on the frontend
  const executeUIAction = async (action: string, intent: string, entities: any) => {
    try {
      const normalizedAction = action.toLowerCase();
      
      // Navigation actions
      if (intent === 'navigate' || normalizedAction.includes('go to') || normalizedAction.includes('navigate')) {
        const pages = megaUIActions.uiActions.navigation.pages;
        for (const page of pages) {
          if (normalizedAction.includes(page)) {
            router.push(`/demo/${page}`);
            return {
              success: true,
              message: `Navigated to ${page}`,
              navigation: `/demo/${page}`
            };
          }
        }
      }
      
      // Button click actions
      if (intent === 'click' || normalizedAction.includes('click') || normalizedAction.includes('press')) {
        // Find button by data-button-id or text
        const buttonText = normalizedAction.replace(/click|press|tap|hit/g, '').trim();
        const button = document.querySelector(`[data-button-id*="${buttonText}"]`) as HTMLButtonElement;
        
        if (button) {
          button.click();
          // Add visual feedback
          button.classList.add('ring-2', 'ring-black', 'ring-offset-2');
          setTimeout(() => {
            button.classList.remove('ring-2', 'ring-black', 'ring-offset-2');
          }, 1000);
          
          return {
            success: true,
            message: `Clicked ${buttonText} button`
          };
        }
      }
      
      // Modal actions
      if (normalizedAction.includes('open modal') || normalizedAction.includes('show modal')) {
        const modalTypes = megaUIActions.uiActions.modals.specific;
        for (const modal of modalTypes) {
          if (normalizedAction.includes(modal.toLowerCase().replace('modal', ''))) {
            // Simulate modal opening via button click
            const modalButton = document.querySelector(`[data-modal="${modal}"], [aria-controls="${modal}"]`) as HTMLButtonElement;
            if (modalButton) {
              modalButton.click();
              return {
                success: true,
                message: `Opened ${modal}`
              };
            }
          }
        }
      }
      
      // Form filling actions
      if (intent === 'fill' || normalizedAction.includes('fill') || normalizedAction.includes('enter')) {
        const inputText = normalizedAction.replace(/fill|enter|type|input/g, '').trim();
        const [fieldName, ...valueParts] = inputText.split(' with ');
        const value = valueParts.join(' with ');
        
        if (fieldName && value) {
          const input = document.querySelector(`[name*="${fieldName}"], [placeholder*="${fieldName}"], [id*="${fieldName}"]`) as HTMLInputElement;
          if (input) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Visual feedback
            input.classList.add('border-2', 'border-green-500');
            setTimeout(() => {
              input.classList.remove('border-2', 'border-green-500');
            }, 1000);
            
            return {
              success: true,
              message: `Filled ${fieldName} with "${value}"`
            };
          }
        }
      }
      
      // Content Studio specific actions
      if (pathname.includes('content-studio')) {
        if (normalizedAction.includes('create blog') || normalizedAction.includes('new post')) {
          // Click create button or navigate to create view
          const createButton = document.querySelector('[data-action="create"], [data-view="create"]') as HTMLButtonElement;
          if (createButton) {
            createButton.click();
            return {
              success: true,
              message: 'Started blog creation workflow'
            };
          }
        }
        
        if (normalizedAction.includes('improve content')) {
          // Click improve button or navigate to improve view
          const improveButton = document.querySelector('[data-action="improve"], [data-view="improve"]') as HTMLButtonElement;
          if (improveButton) {
            improveButton.click();
            return {
              success: true,
              message: 'Opened content improvement workflow'
            };
          }
        }
      }
      
      // Analytics actions
      if (normalizedAction.includes('show metrics') || normalizedAction.includes('analytics')) {
        router.push('/demo/analytics');
        return {
          success: true,
          message: 'Loading analytics dashboard...',
          navigation: '/demo/analytics'
        };
      }
      
      // Export actions
      if (normalizedAction.includes('export') || normalizedAction.includes('download')) {
        const format = normalizedAction.includes('pdf') ? 'pdf' : 
                      normalizedAction.includes('csv') ? 'csv' : 
                      normalizedAction.includes('json') ? 'json' : 'pdf';
        
        // Trigger export
        const exportButton = document.querySelector('[data-button-id*="export"]') as HTMLButtonElement;
        if (exportButton) {
          exportButton.click();
          return {
            success: true,
            message: `Exporting as ${format.toUpperCase()}...`
          };
        }
      }
      
      return { success: false };
    } catch (error) {
      console.error('UI Action execution error:', error);
      return { success: false };
    }
  };
  
  // Get all possible actions from mega UI actions
  const getAllPossibleActions = (): string[] => {
    const actions: string[] = [];
    
    // Add all navigation combinations
    megaUIActions.uiActions.navigation.pages.forEach(page => {
      megaUIActions.uiActions.navigation.actions.forEach(action => {
        actions.push(`${action} ${page}`);
      });
    });
    
    // Add button actions
    Object.entries(megaUIActions.uiActions.buttons.specificButtons).forEach(([category, buttons]) => {
      (buttons as string[]).forEach(button => {
        actions.push(`click ${button}`);
        actions.push(`press ${button}`);
      });
    });
    
    // Add workflow actions
    megaUIActions.uiActions.workflows.content.forEach(workflow => {
      actions.push(workflow.replace('_', ' '));
    });
    
    // Add form actions
    Object.values(megaUIActions.uiActions.forms.fields).forEach((fields: any) => {
      fields.forEach((field: string) => {
        actions.push(`fill ${field}`);
        actions.push(`enter ${field}`);
      });
    });
    
    // Add modal actions
    megaUIActions.uiActions.modals.specific.forEach(modal => {
      actions.push(`open ${modal}`);
      actions.push(`close ${modal}`);
    });
    
    return actions.slice(0, 1000); // Return top 1000 for performance
  };
  
  // Get ultra-smart suggestions based on input and context
  const getSmartSuggestions = (input: string) => {
    const context = getCurrentContext();
    const timeOfDay = new Date().getHours();
    const suggestions: string[] = [];
    
    // Time-based suggestions
    if (timeOfDay < 12) {
      suggestions.push(...actionsDatabase.smartSuggestions.based_on_time.morning);
    } else if (timeOfDay < 17) {
      suggestions.push(...actionsDatabase.smartSuggestions.based_on_time.afternoon);
    } else {
      suggestions.push(...actionsDatabase.smartSuggestions.based_on_time.evening);
    }
    
    // Context-based suggestions
    const contextActions = actionsDatabase.contextualActions[context as keyof typeof actionsDatabase.contextualActions] || [];
    suggestions.push(...contextActions.slice(0, 3));
    
    // Add product-specific suggestions
    const contextData = productActions.productFeatures[context as keyof typeof productActions.productFeatures];
    if (contextData && 'naturalLanguage' in contextData && Array.isArray((contextData as any).naturalLanguage)) {
      suggestions.push(...(contextData as any).naturalLanguage.slice(0, 2));
    }
    
    return suggestions.slice(0, 5);
  };

  // Get suggested actions based on input
  const getSuggestedActions = (input: string) => {
    const suggestions = getSmartSuggestions(input);
    return suggestions.map(suggestion => ({
      label: suggestion.replace(/_/g, ' ').charAt(0).toUpperCase() + suggestion.slice(1).replace(/_/g, ' '),
      action: suggestion,
      icon: getActionIcon(suggestion)
    }));
  };

  // Get appropriate icon for action
  const getActionIcon = (action: string): string => {
    if (action.includes('create') || action.includes('add')) return 'Plus';
    if (action.includes('analyze') || action.includes('metrics')) return 'BarChart3';
    if (action.includes('optimize') || action.includes('improve')) return 'Zap';
    if (action.includes('schedule') || action.includes('time')) return 'Clock';
    if (action.includes('export') || action.includes('download')) return 'Download';
    if (action.includes('settings') || action.includes('config')) return 'Settings';
    return 'Sparkles';
  };

  // Handle command submission with enhanced feedback
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    // Add to history
    setCommandHistory(prev => [...prev, inputValue]);
    setHistoryIndex(-1);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    const command = inputValue;
    setInputValue('');
    
    // Process command
    const result = await parseCommand(command);
    
    // Add assistant response with enhanced formatting
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: (result as any).content || (result as any).message || 'Processing your request...',
      timestamp: new Date(),
      actions: (result as any).actions || [],
      status: (result as any).type === 'error' ? 'error' : 'completed',
      metadata: {
        confidence: (result as any).confidence,
        algorithm: (result as any).algorithm,
        navigation: (result as any).navigation
      }
    };
    setMessages(prev => [...prev, assistantMessage]);
    
    // Handle navigation if specified
    if ((result as any).navigation) {
      setTimeout(() => {
        router.push((result as any).navigation);
      }, 500);
    }
    
    // Update suggestions based on result
    if ((result as any).suggestions) {
      setSuggestions((result as any).suggestions);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    // Skip keyboard shortcuts on login page
    if (pathname === '/demo/login') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open assistant
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      // Up/Down arrows for command history
      if (isOpen && inputRef.current === document.activeElement) {
        if (e.key === 'ArrowUp' && commandHistory.length > 0) {
          e.preventDefault();
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
        } else if (e.key === 'ArrowDown' && historyIndex > -1) {
          e.preventDefault();
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInputValue(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, commandHistory, historyIndex]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  
  // Don't render on login page
  if (pathname === '/demo/login') {
    return null;
  }

  if (!isOpen) {
    return (
      <>
        {/* Floating button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50"
        >
          <Sparkles className="w-6 h-6" />
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-black rounded-full animate-ping" />
        </button>
        
        {/* Keyboard shortcut hint */}
        <div className="fixed bottom-6 right-24 bg-black text-white px-3 py-1 rounded-full text-xs opacity-0 hover:opacity-100 transition-opacity z-50">
          Press ⌘K
        </div>
      </>
    );
  }

  return (
    <div className={`fixed top-0 right-0 h-full ${isPanelExpanded ? 'w-[480px]' : 'w-[320px]'} bg-white border-l border-black/10 shadow-2xl z-50 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium">AI Command Center</h3>
            <p className="text-xs text-white/60">
              {getCurrentContext().replace('_', ' ').charAt(0).toUpperCase() + getCurrentContext().slice(1).replace('_', ' ')} Context
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            {isPanelExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="border-b border-black/10 p-3 flex items-center gap-2 overflow-x-auto">
        {getSmartSuggestions('').slice(0, 5).map((suggestion, index) => {
          const Icon = Icons[getActionIcon(suggestion) as keyof typeof Icons] as React.ComponentType<any>;
          return (
            <button
              key={index}
              onClick={() => {
                setInputValue(suggestion.replace(/_/g, ' '));
                handleSubmit();
              }}
              className="px-3 py-1.5 bg-white border border-black/10 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <Icon className="w-3 h-3" />
              {suggestion.replace(/_/g, ' ').charAt(0).toUpperCase() + suggestion.slice(1).replace(/_/g, ' ')}
            </button>
          );
        })}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-black/20" />
            </div>
            <h3 className="text-lg font-medium text-black/80 mb-2">AI Command Center</h3>
            <p className="text-sm text-black/50 mb-6">
              Type a command or question. I can help with anything in your product.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-black/40 font-medium">Try these commands:</p>
              <div className="space-y-1">
                {promptExamples.popularCommands.slice(0, 4).map((cmd, idx) => (
                  <code key={idx} className="block text-xs bg-black/5 px-2 py-1 rounded cursor-pointer hover:bg-black/10" onClick={() => {
                    setInputValue(cmd);
                    handleSubmit();
                  }}>{cmd}</code>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start gap-3 ${
                message.type === 'user' ? 'justify-end' : ''
              }`}>
                {message.type !== 'user' && (
                  <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                )}
                <div className={`flex-1 max-w-[90%] ${
                  message.type === 'user' ? 'bg-black text-white rounded-lg px-4 py-2' : ''
                }`}>
                  <p className={`text-sm ${
                    message.type === 'user' ? 'text-white' : 'text-black/80'
                  }`}>
                    {message.content}
                  </p>
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => {
                        const Icon = Icons[action.icon as keyof typeof Icons] as React.ComponentType<any>;
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setInputValue(action.action);
                              handleSubmit();
                            }}
                            className="px-3 py-1.5 bg-white border border-black/10 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all text-xs font-medium flex items-center gap-1"
                          >
                            {Icon && <Icon className="w-3 h-3" />}
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
        
        {/* Current Task Progress */}
        {currentTask && (
          <Card className="border border-black/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-black">{currentTask.title}</h4>
              <Badge className={`text-xs ${
                currentTask.status === 'completed' ? 'bg-green-100 text-green-800' :
                currentTask.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {currentTask.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="space-y-2">
              {currentTask.steps.map((step) => (
                <div key={step.id} className="flex items-center gap-2">
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : step.status === 'in_progress' ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-black/10 rounded-full" />
                  )}
                  <span className={`text-xs ${
                    step.status === 'completed' ? 'text-black/60' : 'text-black/80'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-black/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type a command or ask anything..."
              className="w-full px-4 py-2 pr-20 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/20 transition-colors"
              list="command-suggestions"
            />
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black/60"
              title="Show command examples"
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsListening(!isListening)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded ${
                isListening ? 'bg-red-500 text-white' : 'text-black/40 hover:text-black/60'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="p-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-black/40">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-black/5 rounded text-xs">↑↓</kbd>
            <span>History</span>
            <kbd className="px-1.5 py-0.5 bg-black/5 rounded text-xs">Esc</kbd>
            <span>Close</span>
            <button onClick={() => setShowExamples(!showExamples)} className="text-xs text-black/60 hover:text-black ml-2">
              {showExamples ? 'Hide' : 'Show'} Examples
            </button>
          </div>
                      <span>AI-Powered • {megaUIActions.statistics.grandTotal.toLocaleString()}+ Actions • 12 Algorithms</span>
        </div>
        
        {/* Command Suggestions Datalist */}
        <datalist id="command-suggestions">
          {advancedMatcher.getSuggestions(inputValue).map((suggestion, idx) => (
            <option key={idx} value={suggestion} />
          ))}
        </datalist>
      </div>
      
      {/* Examples Panel */}
      {showExamples && (
        <div className="absolute bottom-full mb-2 right-0 w-full max-h-[500px] bg-white border border-black/10 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 border-b border-black/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-black">Command Examples</h3>
              <button onClick={() => setShowExamples(false)} className="p-1 hover:bg-black/5 rounded">
                <X className="w-4 h-4 text-black/40" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(promptExamples.categories).slice(0, 8).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === key
                      ? 'bg-black text-white'
                      : 'bg-white text-black/60 hover:text-black border border-black/10'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 max-h-[350px] overflow-y-auto">
            {(promptExamples.categories as any)[selectedCategory] && (
              <div>
                <p className="text-xs text-black/60 mb-3">
                  {(promptExamples.categories as any)[selectedCategory].description}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {(promptExamples.categories as any)[selectedCategory].examples.map((example: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputValue(example.replace(' → ', '').split(' → ')[0]);
                        setShowExamples(false);
                        handleSubmit();
                      }}
                      className="text-left px-3 py-2 bg-black/[0.02] hover:bg-black/[0.05] rounded-lg transition-colors group"
                    >
                      <code className="text-xs text-black/80 group-hover:text-black">{example}</code>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
