"use client";

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import {
  ChatMessage,
  CreatorTab,
  DiagnosticsMode,
  PlaybookMode,
  ContentMode,
} from '@/lib/demo/creator/types';
import { useCreatorStore } from '@/lib/demo/creator/store';

interface ChatPanelProps {
  activeTab: CreatorTab;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

type QuickAction = { label: string; prompt: string };

type ModeOption<T extends string> = {
  id: T;
  label: string;
};

const modeOptionsByTab: Record<CreatorTab, ModeOption<any>[]> = {
  diagnostics: [
    { id: 'diagnostics', label: 'Diagnostics' },
    { id: 'insights', label: 'Insights' },
  ],
  playbook: [
    { id: 'playbook', label: 'Playbook' },
    { id: 'calendar', label: 'Calendar' },
  ],
  posts: [
    { id: 'create', label: 'Create' },
    { id: 'optimize', label: 'Optimize' },
  ],
};

const diagnosticsModeCopy: Record<DiagnosticsMode, string> = {
  diagnostics: 'Run a deep diagnostic pulse to benchmark performance.',
  insights: 'Reveal the stories and insights behind your diagnostics.',
};

const playbookModeCopy: Record<PlaybookMode, string> = {
  playbook: 'Design strategic blueprints tailored for your launch.',
  calendar: 'Orchestrate your go-to-market rhythm across channels.',
};

const contentModeCopy: Record<ContentMode, string> = {
  create: 'Ignite new content ideas and bring them to life fast.',
  optimize: 'Level up existing assets with upgrades and optimizations.',
};

const diagnosticsActions: Record<DiagnosticsMode, QuickAction[]> = {
  diagnostics: [
    { label: 'Run Full Analysis', prompt: 'Run comprehensive diagnostics for my system' },
    { label: 'Quick Check', prompt: 'Run a quick system health check' },
    { label: 'Performance Review', prompt: 'Analyze performance metrics' },
  ],
  insights: [
    { label: 'Spot Trends', prompt: 'Reveal key insights from my diagnostics' },
    { label: 'Insight Highlights', prompt: 'Summarize the most important insights' },
    { label: 'Action Opportunities', prompt: 'What actions should I take based on these insights?' },
  ],
};

const playbookActions: Record<PlaybookMode, QuickAction[]> = {
  playbook: [
    { label: 'Launch Strategy', prompt: 'Create a go-to-market launch playbook' },
    { label: 'Growth Blueprint', prompt: 'Design a growth acceleration playbook' },
    { label: 'Activation Plan', prompt: 'Outline a customer activation playbook' },
  ],
  calendar: [
    { label: 'Campaign Calendar', prompt: 'Draft a 4-week marketing calendar' },
    { label: 'Event Rhythm', prompt: 'Plan a cadence for launch events' },
    { label: 'Channel Mix', prompt: 'Build a channel-by-channel calendar' },
  ],
};

const contentActions: Record<ContentMode, QuickAction[]> = {
  create: [
    { label: 'Fresh Topic', prompt: 'Suggest new topics for our AI product blog' },
    { label: 'Draft Post', prompt: 'Draft a thought leadership article on AI ethics' },
    { label: 'Social Teasers', prompt: 'Create social posts for our latest launch' },
  ],
  optimize: [
    { label: 'Improve Draft', prompt: 'Improve this draft to be more punchy and concise' },
    { label: 'SEO Upgrade', prompt: 'Optimize this post for SEO around AI marketing' },
    { label: 'Repurpose Content', prompt: 'Turn this long-form article into social snippets' },
  ],
};

export function ChatPanel({ activeTab, messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modes = useCreatorStore((state) => state.modes);
  const setMode = useCreatorStore((state) => state.setMode);

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
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-1">
          {activeTab === 'diagnostics' && (activeMode === 'diagnostics' ? 'Diagnostics' : 'Insights')}
          {activeTab === 'playbook' && (activeMode === 'playbook' ? 'Playbook' : 'Calendar')}
          {activeTab === 'posts' && (activeMode === 'create' ? 'Create' : 'Optimize')}
        </h2>
        <p className="text-xs text-gray-500">
          Chat with AI assistant
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">Mode</p>
            <p className="text-xs text-gray-600">
              {activeTab === 'diagnostics' && diagnosticsModeCopy[activeMode as DiagnosticsMode]}
              {activeTab === 'playbook' && playbookModeCopy[activeMode as PlaybookMode]}
              {activeTab === 'posts' && contentModeCopy[activeMode as ContentMode]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {modeOptionsByTab[activeTab].map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setMode(activeTab, mode.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 0 && (
        <div className="flex-shrink-0 p-6 border-b border-gray-100">
          <p className="mb-3 text-xs font-medium text-gray-500">
            QUICK START
          </p>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onSendMessage(action.prompt)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-xs text-gray-400">
              Start a conversation
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs ${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message..."
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-400"
          />
          <button
            onClick={handleSend}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white transition hover:bg-gray-800"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
