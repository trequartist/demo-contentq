"use client";

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CreatorTab, DiagnosticsMode, PlaybookMode, ContentMode } from '@/lib/demo/creator/types';
import { useCreatorStore } from '@/lib/demo/creator/store';

interface CreatorShellProps {
  activeTab: CreatorTab;
  onTabChange: (tab: CreatorTab) => void;
  chatPanel: React.ReactNode;
  previewPanel: React.ReactNode;
}

type ModeDefinition<T extends string> = {
  id: T;
  label: string;
  tagline: string;
};

const primaryTabs: Array<{ id: CreatorTab; label: string }> = [
  { id: 'diagnostics', label: 'Intelligence' },
  { id: 'playbook', label: 'Plan' },
  { id: 'posts', label: 'Posts' },
];

const diagnosticsModes: ModeDefinition<DiagnosticsMode>[] = [
  { id: 'diagnostics', label: 'Diagnostics', tagline: 'Full system assessment' },
  { id: 'insights', label: 'Insights', tagline: 'Narratives and signals' },
];

const playbookModes: ModeDefinition<PlaybookMode>[] = [
  { id: 'playbook', label: 'Plan', tagline: 'Strategic blueprint' },
  { id: 'calendar', label: 'Calendar', tagline: 'Campaign cadence' },
];

const contentModes: ModeDefinition<ContentMode>[] = [
  { id: 'create', label: 'Create', tagline: 'Generate new content' },
  { id: 'optimize', label: 'Optimize', tagline: 'Elevate existing assets' },
];

export function CreatorShell({ activeTab, onTabChange, chatPanel, previewPanel }: CreatorShellProps) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const modes = useCreatorStore.use.modes();
  const setMode = useCreatorStore.use.setMode();

  const modeOptions = useMemo(() => {
    if (activeTab === 'diagnostics') {
      return diagnosticsModes;
    }
    if (activeTab === 'playbook') {
      return playbookModes;
    }
    return contentModes;
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-white">
      {/* Collapsible Chat Panel */}
      <div
        className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${
          isChatOpen ? 'border-r border-gray-100' : ''
        }`}
        style={{ width: isChatOpen ? 480 : 0 }}
      >
        <div
          className={`h-full bg-white transition-opacity duration-300 overflow-y-auto ${
            isChatOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {chatPanel}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ right: '-12px' }}
        >
          {isChatOpen ? (
            <ChevronLeft className="h-3 w-3 text-gray-600" />
          ) : (
            <ChevronRight className="h-3 w-3 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Preview Panel */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        {/* Minimal Top Bar with Tabs */}
        <div className="border-b border-gray-100 bg-white">
          <div className="px-8 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1">
              {primaryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Demo User</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100 bg-white/95">
          <div className="px-8 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Mode
              </p>
              <p className="text-sm text-gray-700">
                {modeOptions.find((mode) => mode.id === modes[activeTab])?.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {modeOptions.map((mode) => {
                const isActive = modes[activeTab] === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setMode(activeTab, mode.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto">
          {previewPanel}
        </div>
      </div>
    </div>
  );
}
