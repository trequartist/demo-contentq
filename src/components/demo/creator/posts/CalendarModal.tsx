"use client";

import { useState, useEffect } from 'react';
import { X, Sparkles, Target, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import calendarTopics from '@/usableclientdata/content-studio/gumloop-calendar-topics.json';

interface Subtopic {
  id: string;
  title: string;
  hook: string;
  angle: string;
  keyPoints: string[];
  expectedOutcome: string;
}

interface ScheduledTopic {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
  description?: string;
  keywords?: string[];
  targetAudience?: string;
  subtopics?: Subtopic[];
}

interface CalendarModalProps {
  onSelectTopic: (topic: ScheduledTopic, subtopic: Subtopic) => void;
  onClose: () => void;
}

export function CalendarModal({ onSelectTopic, onClose }: CalendarModalProps) {
  const [topics, setTopics] = useState<ScheduledTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ScheduledTopic | null>(null);

  useEffect(() => {
    const loadedTopics = calendarTopics.scheduledTopics.map(topic => ({
      ...topic,
      date: new Date(topic.date).toISOString(),
    }));
    setTopics(loadedTopics);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedTopic ? selectedTopic.title : 'Content Calendar'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedTopic ? 'Select a content angle to continue' : 'Choose from curated topics and angles'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {!selectedTopic ? (
            // Topic List
            <div className="grid gap-4 md:grid-cols-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="group rounded-2xl border-2 border-gray-100 bg-white p-6 text-left transition-all hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      {topic.type}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(topic.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Sparkles className="h-3 w-3" />
                    <span>{topic.subtopics?.length || 0} angles available</span>
                    <span>•</span>
                    <span>{topic.targetAudience}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Subtopic List
            <div className="space-y-4">
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-sm text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
              >
                ← Back to topics
              </button>

              <div className="grid gap-4 md:grid-cols-1">
                {selectedTopic.subtopics?.map((subtopic) => (
                  <button
                    key={subtopic.id}
                    onClick={() => onSelectTopic(selectedTopic, subtopic)}
                    className="group w-full rounded-2xl border-2 border-gray-100 bg-white p-6 text-left transition-all hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                          {subtopic.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 italic">"{subtopic.hook}"</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-600">{subtopic.angle}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {subtopic.keyPoints.slice(0, 4).map((point, idx) => (
                              <span key={idx} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                {point}
                              </span>
                            ))}
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            <span className="font-medium">Expected:</span> {subtopic.expectedOutcome}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            {selectedTopic
              ? `${selectedTopic.subtopics?.length || 0} angles available • Select one to generate content`
              : `${topics.length} topics in your calendar • Click to explore angles`}
          </p>
        </div>
      </div>
    </div>
  );
}

