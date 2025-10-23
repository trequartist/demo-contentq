"use client";

import { useRef } from 'react';
import {
  CreatorTab,
  SessionData,
  DiagnosticsMode,
  PlaybookMode,
  ContentMode,
} from '@/lib/demo/creator/types';
import { useCreatorStore } from '@/lib/demo/creator/store';
import { DiagnosticsEmpty } from './diagnostics/DiagnosticsEmpty';
import { DiagnosticsStreaming } from './diagnostics/DiagnosticsStreaming';
import { DiagnosticsOutput } from './diagnostics/DiagnosticsOutput';
import { PlaybookEmpty } from './playbook/PlaybookEmpty';
import { PlaybookStreaming } from './playbook/PlaybookStreaming';
import { PlaybookOutput } from './playbook/PlaybookOutput';
import { StrategySelector } from './playbook/StrategySelector';
import { PostsEmpty } from './posts/PostsEmpty';
import { PostsStreaming } from './posts/PostsStreaming';
import { PostsOutput } from './posts/PostsOutput';
import { TopicSelector } from './posts/TopicSelector';
import { BriefEditor } from './posts/BriefEditor';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface OutputPanelProps {
  activeTab: CreatorTab;
  session: SessionData;
  onStartCreation: (text?: string) => void;
  onStrategyConfirm?: (ids: string[]) => void;
  onTopicSelect?: (topicId: string) => void;
  onTopicConfirm?: (topicId: string) => void;
  onPostTopicSelect?: (topic: any) => void;
  onBriefConfirm?: (brief: any) => void;
  onBrowseCalendar?: () => void;
  onBrowseDocuments?: () => void;
  onCalendarAngleSelect?: (topic: any, subtopic: any) => void;
}

export function OutputPanel({
  activeTab,
  session,
  onStartCreation,
  onStrategyConfirm,
  onPostTopicSelect,
  onBriefConfirm,
  onBrowseCalendar,
  onBrowseDocuments,
  onCalendarAngleSelect,
}: OutputPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { outputState, intermediateSteps } = session;
  const modes = useCreatorStore((state) => state.modes);

  const activeMode = modes[activeTab];

  const renderContent = () => {
    // Diagnostics
    if (activeTab === 'diagnostics') {
      if (outputState === 'empty') {
        return <DiagnosticsEmpty onStart={onStartCreation} />;
      }
      if (outputState === 'streaming' || outputState === 'processing') {
        return <DiagnosticsStreaming />;
      }
      if (outputState === 'complete' && session.diagnosticsOutput) {
        if (activeMode === 'insights') {
          return <DiagnosticsOutput data={session.diagnosticsOutput} variant="insights" />;
        }
        return <DiagnosticsOutput data={session.diagnosticsOutput} />;
      }
    }

    // Playbook
    if (activeTab === 'playbook') {
      if (outputState === 'empty') {
        return <PlaybookEmpty onStart={onStartCreation} />;
      }
      if (outputState === 'awaiting_strategy') {
        if (!session.playbookStrategies) return null;
        return (
          <div className="h-full overflow-y-auto p-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Launch Strategies</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Pick the strategies that align with your launch goals. Your playbook will adapt to your selection.
                  </p>
                </div>
                <StrategySelector
                  strategies={session.playbookStrategies}
                  onConfirm={(ids) => onStrategyConfirm?.(ids)}
                />
              </div>
            </div>
          </div>
        );
      }
      if (outputState === 'streaming' || outputState === 'processing') {
        return <PlaybookStreaming />;
      }
      if (outputState === 'complete' && session.playbookOutput) {
        return <PlaybookOutput data={session.playbookOutput} mode={activeMode as PlaybookMode} onAngleSelect={onCalendarAngleSelect} />;
      }
    }

    // Posts
    if (activeTab === 'posts') {
      if (outputState === 'empty') {
        return <PostsEmpty onStart={onStartCreation} onBrowseCalendar={onBrowseCalendar} onBrowseDocuments={onBrowseDocuments} />;
      }
      if (outputState === 'awaiting_input') {
        return (
          <div className="h-screen overflow-y-auto p-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">What would you like to write about?</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Describe your content idea, target audience, or specific topic you'd like to explore.
                  </p>
                </div>
                <div className="space-y-4">
                  <textarea
                    ref={textareaRef}
                    placeholder="e.g., 'Write about AI automation for small businesses' or 'Create a guide on content marketing trends'"
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const text = (e.target as HTMLTextAreaElement).value.trim();
                        if (text) {
                          onStartCreation?.(text);
                        }
                      }
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const text = textareaRef.current?.value.trim();
                        console.log('Generate Topics clicked, text:', text);
                        if (text) {
                          onStartCreation?.(text);
                        } else {
                          console.log('No text provided');
                        }
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generate Topics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (outputState === 'awaiting_topic') {
        if (!session.postOutput?.topics) return null;
        return (
          <div className="h-full overflow-y-auto p-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pick a Topic</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    We analyzed your request and generated tailored topics. Select one to continue.
                  </p>
                </div>
                <TopicSelector
                  topics={session.postOutput.topics}
                  onSelect={(topic) => onPostTopicSelect?.(topic)}
                />
              </div>
            </div>
          </div>
        );
      }
      if (outputState === 'awaiting_brief' && session.postOutput?.brief) {
        return (
          <div className="h-full overflow-y-auto p-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Review the Content Brief</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Edit any field if needed then generate the final draft.
                  </p>
                </div>
                <BriefEditor brief={session.postOutput.brief} onConfirm={(brief) => onBriefConfirm?.(brief)} />
              </div>
            </div>
          </div>
        );
      }
      if (outputState === 'streaming' || outputState === 'processing') {
        return <PostsStreaming steps={intermediateSteps} />;
      }
      if (outputState === 'complete' && session.postOutput?.draft) {
        return <PostsOutput data={session.postOutput} mode={activeMode as ContentMode} />;
      }
    }

    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${outputState}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="min-h-full bg-gradient-to-br from-gray-50 via-white to-gray-100"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
