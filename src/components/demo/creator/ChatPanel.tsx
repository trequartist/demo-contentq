"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import type {
  CreatorTab,
  ChatMessage,
  DiagnosticsMode,
  PlaybookMode,
  ContentMode,
} from '@/lib/demo/creator/types';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { InlineModeSwitcher } from './InlineModeSwitcher';
import { CompactFilePreview } from './CompactFilePreview';
import { DragDropHandler } from './DragDropHandler';
import { convertToUploadedFile, generateFilePreview, synthesizeFiles } from '@/lib/demo/creator/file-processor';

interface ChatPanelProps {
  activeTab: CreatorTab;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

type QuickAction = { label: string; prompt: string };

const diagnosticsModeCopy: Record<DiagnosticsMode, string> = {
  diagnostics: 'Comprehensive system assessment and optimization recommendations.',
  insights: 'AI-powered insights and strategic narratives from your data.',
};

const playbookModeCopy: Record<PlaybookMode, string> = {
  playbook: 'Get a proven strategic blueprint that accelerates your market authority.',
  calendar: 'Build a content calendar that maximizes AI visibility and engagement.',
};

const contentModeCopy: Record<ContentMode, string> = {
  create: 'Create content that gets cited by AI assistants and drives real business results.',
  optimize: 'Transform your existing content into AI-magnet pieces that dominate search.',
};

const diagnosticsActions: Record<DiagnosticsMode, QuickAction[]> = {
  diagnostics: [
    { label: 'Full AI Visibility Audit', prompt: 'Run comprehensive diagnostics for my system' },
    { label: 'Quick Health Check', prompt: 'Run a quick system health check' },
    { label: 'SEO & AI Gap Analysis', prompt: 'Analyze performance metrics' },
  ],
  insights: [
    { label: 'Hidden Opportunities', prompt: 'Reveal key insights from my diagnostics' },
    { label: 'Market Intelligence', prompt: 'Summarize the most important insights' },
    { label: 'Priority Actions', prompt: 'What actions should I take based on these insights?' },
  ],
};

const playbookActions: Record<PlaybookMode, QuickAction[]> = {
  playbook: [
    { label: 'Adjust Timeline', prompt: 'Adjust the timeline for the AI-Native Content Strategy to 4 months' },
    { label: 'Add More Strategies', prompt: 'Add a social media strategy to the playbook' },
    { label: 'Focus on Specific Channel', prompt: 'Add more detail about email marketing in the competitive positioning section' },
    { label: 'Export Playbook', prompt: 'Export this playbook as a PDF document' },
  ],
  calendar: [
    { label: 'Adjust Timeline', prompt: 'Adjust the timeline for the AI-Native Content Strategy to 4 months' },
    { label: 'Add More Strategies', prompt: 'Add a social media strategy to the playbook' },
    { label: 'Focus on Specific Channel', prompt: 'Add more detail about email marketing in the competitive positioning section' },
    { label: 'Export Playbook', prompt: 'Export this playbook as a PDF document' },
  ],
};

const contentActions: Record<ContentMode, QuickAction[]> = {
  create: [
    { label: 'Generate Topics', prompt: 'Generate content topics for my industry' },
    { label: 'Create Brief', prompt: 'Create a content brief for a blog post' },
    { label: 'Write Draft', prompt: 'Write a complete article draft' },
  ],
  optimize: [
    { label: 'Optimize Content', prompt: 'Optimize my existing content for AI visibility' },
    { label: 'Improve SEO', prompt: 'Improve the SEO of my content' },
    { label: 'Enhance Structure', prompt: 'Enhance the structure and readability' },
  ],
};

export function ChatPanel({ activeTab, messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isResearchMode, setIsResearchMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modes = useCreatorStore((state) => state.modes);
  const setMode = useCreatorStore((state) => state.setMode);
  const toggleResearchMode = useCreatorStore((state) => state.toggleResearchMode);
  const researchSession = useCreatorStore((state) => state.researchSession);
  
  // Sync with store research mode
  useEffect(() => {
    setIsResearchMode(researchSession?.isActive || false);
  }, [researchSession?.isActive]);

  const addResearchMessage = useCreatorStore((state) => state.addResearchMessage);
  const addResearchFile = useCreatorStore((state) => state.addResearchFile);
  const removeResearchFile = useCreatorStore((state) => state.removeResearchFile);
  const addUploadedFile = useCreatorStore((state) => state.addUploadedFile);
  const removeUploadedFile = useCreatorStore((state) => state.removeUploadedFile);
  const sessions = useCreatorStore((state) => state.sessions);
  const setSynthesisResults = useCreatorStore((state) => state.setSynthesisResults);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeMode = modes[activeTab];

  const quickActions = (() => {
    if (activeTab === 'diagnostics') return diagnosticsActions[activeMode as DiagnosticsMode];
    if (activeTab === 'playbook') return playbookActions[activeMode as PlaybookMode];
    return contentActions[activeMode as ContentMode];
  })();

  const handleSend = () => {
    if (!input.trim()) return;
    
    if (isResearchMode) {
      // Research mode - add to research session, don't affect preview
      const userMessage = {
        id: crypto.randomUUID(),
        role: 'user' as const,
        text: input,
        timestamp: new Date().toISOString(),
      };
      addResearchMessage(userMessage);
      
      // Simulate AI response for research
      setTimeout(() => {
        const aiMessage = {
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          text: `Research: Analyzing "${input}". This is isolated research that won't affect your main workflow. I've found several relevant data points and patterns that could be useful for your analysis.`,
          timestamp: new Date().toISOString(),
        };
        addResearchMessage(aiMessage);
      }, 1000);
    } else {
      // Normal mode - affects preview panel
      onSendMessage(input);
    }
    
    setInput('');
  };

  const handleResearchToggle = () => {
    const newMode = !isResearchMode;
    setIsResearchMode(newMode);
    toggleResearchMode();
  };

  const handleFileUpload = async (files: File[]) => {
    if (isResearchMode) {
      // Research mode - add to research session
      for (const file of files) {
        const uploadedFile = await convertToUploadedFile(file);
        const preview = await generateFilePreview(file);
        addResearchFile({ ...uploadedFile, preview });
      }
    } else {
      // Normal mode - add to current session
      for (const file of files) {
        const uploadedFile = await convertToUploadedFile(file);
        const preview = await generateFilePreview(file);
        addUploadedFile(activeTab, { ...uploadedFile, preview });
      }
    }
  };

  const handleSynthesize = async () => {
    if (!isResearchMode || researchSession.uploadedFiles.length < 2) return;

    addResearchMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      text: '🔄 Analyzing and synthesizing your research files...',
      timestamp: new Date().toISOString(),
    });

    try {
      const synthesisResult = await synthesizeFiles(researchSession.uploadedFiles);
      setSynthesisResults(synthesisResult);

      addResearchMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: `## 📊 Research Synthesis Complete\n\n**Combined Analysis:**\n${synthesisResult.combinedSummary}\n\n**Key Insights:**\n${synthesisResult.keyInsights.map(insight => `• ${insight}`).join('\n')}\n\n**Common Themes:**\n${synthesisResult.commonThemes.map(theme => `• ${theme}`).join('\n')}\n\n**Research Recommendations:**\n${synthesisResult.recommendations.map(rec => `• ${rec}`).join('\n')}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      addResearchMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: '❌ Error during synthesis. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <>
      <div className="flex h-full flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === 'diagnostics' && (activeMode === 'diagnostics' ? 'Diagnostics' : 'Insights')}
                {activeTab === 'playbook' && (activeMode === 'playbook' ? 'Playbook' : 'Calendar')}
                {activeTab === 'posts' && (activeMode === 'create' ? 'Create' : 'Optimize')}
              </h2>
              <p className="text-base text-gray-500">
                Chat with AI assistant
              </p>
            </div>
            <button
              onClick={handleResearchToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isResearchMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Search className="w-4 h-4" />
              {isResearchMode ? 'Research Mode' : 'Research'}
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Mode</p>
              <p className="text-base text-gray-600 leading-relaxed">
                {activeTab === 'diagnostics' && diagnosticsModeCopy[activeMode as DiagnosticsMode]}
                {activeTab === 'playbook' && playbookModeCopy[activeMode as PlaybookMode]}
                {activeTab === 'posts' && contentModeCopy[activeMode as ContentMode]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                if (activeTab === 'diagnostics') {
                  return [
                    { id: 'diagnostics', label: 'Diagnostics' },
                    { id: 'insights', label: 'Insights' }
                  ].map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setMode(activeTab, mode.id as DiagnosticsMode)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  });
                } else if (activeTab === 'playbook') {
                  return [
                    { id: 'playbook', label: 'Playbook' },
                    { id: 'calendar', label: 'Calendar' }
                  ].map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setMode(activeTab, mode.id as PlaybookMode)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  });
                } else {
                  return [
                    { id: 'create', label: 'Create' },
                    { id: 'optimize', label: 'Optimize' }
                  ].map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setMode(activeTab, mode.id as ContentMode)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  });
                }
              })()}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length === 0 && (
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
            <p className="mb-4 text-sm font-semibold text-gray-900">
              Quick Start
            </p>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(action.prompt)}
                  className="group w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {action.label}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {(() => {
            const currentMessages = isResearchMode ? (researchSession?.messages || []) : messages;
            const hasMessages = currentMessages && currentMessages.length > 0;
            
            // Debug logging
            console.log('ChatPanel Debug:', {
              isResearchMode,
              messagesLength: messages.length,
              researchMessagesLength: researchSession?.messages?.length || 0,
              currentMessagesLength: currentMessages?.length || 0,
              hasMessages
            });
            
            if (!hasMessages) {
              return (
                <div className="flex h-full items-center justify-center text-center">
                  <div className="max-w-sm mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isResearchMode ? 'Start Research' : 'Start a conversation'}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {isResearchMode 
                        ? 'Upload files, ask research questions, or explore topics in isolation.'
                        : 'Ask questions, get insights, or explore your content strategy.'
                      }
                    </p>
                  </div>
                </div>
              );
            }
            
            return (
              <>
                {currentMessages.map((message, index) => {
                  // Check if this is a streaming message (Live Data Processing)
                  const isStreamingMessage = message.text.includes('## Live Data Processing') || 
                                           message.text.includes('Live Data Processing');
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                          message.role === 'user'
                            ? 'bg-black text-white'
                            : isStreamingMessage
                            ? 'bg-blue-50 border border-blue-200 text-blue-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {isStreamingMessage && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Live Processing</span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  );
                })}
                
                
                <div ref={messagesEndRef} />
              </>
            );
          })()}
        </div>

        {/* File Preview (All modes) */}
        {(() => {
          const currentFiles = isResearchMode 
            ? (researchSession?.uploadedFiles || [])
            : (sessions[activeTab]?.uploadedFiles || []);
          
          if (currentFiles.length > 0) {
            return (
              <div className="flex-shrink-0 border-t border-gray-100 p-4">
                <CompactFilePreview
                  files={currentFiles}
                  onRemoveFile={(fileId) => {
                    if (isResearchMode) {
                      removeResearchFile(fileId);
                    } else {
                      removeUploadedFile(activeTab, fileId);
                    }
                  }}
                  onSynthesize={isResearchMode ? handleSynthesize : undefined}
                  onFileClick={(file) => {
                    console.log('File clicked:', file.name);
                  }}
                />
              </div>
            );
          }
          return null;
        })()}

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-100 p-4">
          <DragDropHandler
            onFilesSelected={handleFileUpload}
            className="w-full"
          >
            <div className="flex items-center gap-2">
              {/* Mode switcher - Icon only */}
              <button
                onClick={() => {
                  setIsResearchMode(!isResearchMode);
                  toggleResearchMode();
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isResearchMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isResearchMode ? 'Research Mode' : 'Normal Mode'}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Main input container */}
              <div className="flex-1 relative">
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-gray-300 focus-within:bg-white transition-all px-3 py-2">
                  {/* File upload button (Available in all modes) */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Upload files"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>

                  {/* Textarea */}
                  <textarea
                    ref={(el) => {
                      if (el) {
                        el.style.height = 'auto';
                        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
                      }
                    }}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      // Auto-resize
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Message or upload files..."
                    className="flex-1 min-h-[40px] max-h-[120px] bg-transparent px-2 py-2 text-sm outline-none resize-none placeholder-gray-400"
                    rows={1}
                  />

                  {/* Send button */}
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </DragDropHandler>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf,text/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                handleFileUpload(Array.from(files));
              }
            }}
            className="hidden"
          />

          {/* File upload hint */}
          {(() => {
            const currentFiles = isResearchMode 
              ? (researchSession?.uploadedFiles || [])
              : (sessions[activeTab]?.uploadedFiles || []);
            
            if (currentFiles.length === 0) {
              return (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Drag files here or click the paperclip to upload
                  </p>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </>
  );
}