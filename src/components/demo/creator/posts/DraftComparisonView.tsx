"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface DraftComparisonViewProps {
  draftV1: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
  draftV2: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
  onAcceptV2: () => void;
  onRejectV2: () => void;
}

export function DraftComparisonView({ draftV1, draftV2, onAcceptV2, onRejectV2 }: DraftComparisonViewProps) {
  const [selectedVersion, setSelectedVersion] = useState<1 | 2>(2);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Draft Comparison</h2>
            <p className="text-sm text-gray-600 mt-1">Review changes and choose which version to keep</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRejectV2}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 inline mr-2" />
              Keep Original
            </button>
            <button
              onClick={onAcceptV2}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4 inline mr-2" />
              Accept Changes
            </button>
          </div>
        </div>

        {/* Version Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedVersion(1)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedVersion === 1
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Original Draft
          </button>
          <button
            onClick={() => setSelectedVersion(2)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedVersion === 2
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Updated Draft
          </button>
          <div className="ml-auto text-sm text-gray-500">
            Toggle between versions or view side-by-side below
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-0 h-full">
          {/* Version 1 */}
          <div className={`border-r border-gray-300 bg-white p-8 overflow-auto ${selectedVersion === 1 ? 'ring-2 ring-gray-900 ring-inset' : ''}`}>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-3">
                  Version 1 - Original
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{draftV1.title}</h1>
              </div>

              <div className="space-y-8">
                {draftV1.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Version 2 */}
          <div className={`bg-blue-50 p-8 overflow-auto ${selectedVersion === 2 ? 'ring-2 ring-blue-600 ring-inset' : ''}`}>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-3">
                  Version 2 - Updated
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{draftV2.title}</h1>
              </div>

              <div className="space-y-8">
                {draftV2.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Changes:</span> Updated tone, added statistics, enhanced engagement
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRejectV2}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Keep Original
            </button>
            <button
              onClick={onAcceptV2}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Accept Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


