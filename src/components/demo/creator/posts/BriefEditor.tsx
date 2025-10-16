"use client";

import { useState } from 'react';
import { PostBrief } from '@/lib/demo/creator/types';
import { Edit3, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface BriefEditorProps {
  brief: PostBrief;
  onConfirm: (editedBrief: PostBrief) => void;
}

export function BriefEditor({ brief: initialBrief, onConfirm }: BriefEditorProps) {
  const [brief, setBrief] = useState(initialBrief);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full space-y-4 rounded-xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Content Brief</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
        >
          <Edit3 className="h-3 w-3" />
          {isEditing ? 'Done editing' : 'Edit'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Topic</label>
          {isEditing ? (
            <input
              type="text"
              value={brief.topic}
              onChange={(e) => setBrief({ ...brief, topic: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          ) : (
            <p className="text-sm font-medium text-gray-900">{brief.topic}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Target Audience</label>
          {isEditing ? (
            <input
              type="text"
              value={brief.targetAudience}
              onChange={(e) => setBrief({ ...brief, targetAudience: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          ) : (
            <p className="text-sm text-gray-900">{brief.targetAudience}</p>
          )}
        </div>

        {(brief as any).audienceDetails && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Audience Details</label>
            <p className="text-sm text-gray-600 leading-relaxed">{(brief as any).audienceDetails}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Tone</label>
          {isEditing ? (
            <input
              type="text"
              value={brief.tone}
              onChange={(e) => setBrief({ ...brief, tone: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          ) : (
            <p className="text-sm text-gray-900">{brief.tone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Key Messages</label>
          <div className="flex flex-wrap gap-2">
            {brief.keyMessages.map((message, index) => (
              <span key={index} className="rounded-full bg-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
                {message}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Structure</label>
          <ol className="space-y-1">
            {brief.structure.map((item, index) => (
              <li key={index} className="text-sm text-gray-700">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </div>

        {(brief as any).seoKeywords && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">SEO Keywords</label>
            <div className="flex flex-wrap gap-2">
              {(brief as any).seoKeywords.map((keyword: string, index: number) => (
                <span key={index} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {(brief as any).competitorAngles && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Competitive Differentiation</label>
            <ul className="space-y-1">
              {(brief as any).competitorAngles.map((angle: string, index: number) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600">→</span>
                  {angle}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(brief as any).researchNotes && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Research & Data Points</label>
            <div className="space-y-2 rounded-lg bg-slate-50 border border-slate-200 p-3">
              {(brief as any).researchNotes.map((note: string, index: number) => (
                <div key={index} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-slate-400 flex-shrink-0">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(brief as any).callouts && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Content Callouts</label>
            <ul className="space-y-1">
              {(brief as any).callouts.map((callout: string, index: number) => (
                <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600">📌</span>
                  {callout}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Button
        onClick={() => onConfirm(brief)}
        variant="primary"
        className="w-full rounded-xl bg-black py-3 hover:bg-gray-800 mt-4"
      >
        <CheckCircle className="mr-2 h-4 w-4" />
        Generate Final Draft
      </Button>
    </div>
  );
}

