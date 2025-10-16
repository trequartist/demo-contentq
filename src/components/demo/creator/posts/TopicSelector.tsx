"use client";

import { useState } from 'react';
import { PostTopic } from '@/lib/demo/creator/types';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

interface TopicSelectorProps {
  topics: PostTopic[];
  onSelect: (topic: PostTopic) => void;
}

export function TopicSelector({ topics, onSelect }: TopicSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    const topic = topics.find((t) => t.id === selectedId);
    if (topic) {
      onSelect(topic);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Select a Topic
        </h3>
        <p className="text-xs text-gray-600">
          Choose the topic that best fits your content goals
        </p>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {topics.map((topic) => {
          const isSelected = selectedId === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => setSelectedId(topic.id)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {isSelected ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{topic.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{topic.description}</p>

                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-gray-500">
                      {Math.round(topic.relevance * 100)}% relevance
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleConfirm}
        disabled={!selectedId}
        variant="primary"
        className="w-full rounded-xl bg-black py-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue with Selected Topic
      </Button>
    </div>
  );
}

