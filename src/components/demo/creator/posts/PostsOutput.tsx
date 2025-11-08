"use client";

import { useState, useRef, useEffect } from 'react';
import { ContentMode, PostOutput } from '@/lib/demo/creator/types';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import optimizationSuggestionsData from '@/usableclientdata/data/posts/optimization-suggestions.json';
import { useCreatorStore } from '@/lib/demo/creator/store';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  MoreHorizontal,
  Copy,
  Download,
  Maximize2,
  Send,
  ChevronLeft,
  ChevronRight,
  AlignLeft,
  AlignCenter,
  AlignRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

interface PostsOutputProps {
  data: PostOutput;
  mode?: ContentMode;
}

const optimizationSuggestions = optimizationSuggestionsData.suggestions;

export function PostsOutput({ data, mode = 'create' }: PostsOutputProps) {
  if (!data.draft) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">No content generated yet</h3>
          <p className="mt-2 text-sm text-gray-500">Start a new content request to see your generated draft.</p>
        </div>
      </div>
    );
  }

  // For optimize mode, show the same editor UI but with optimization suggestions in the sidebar
  const isOptimizeMode = mode === 'optimize';

  // Convert draft sections to markdown content
  const initialContent = data.draft.sections
    ?.map((section) => `## ${section.heading}\n\n${section.content}\n\n`)
    .join('') || '';

  const [content, setContent] = useState(`# ${data.draft.title || 'Untitled Post'}\n\n${initialContent}`);
  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('edit');
  const [seoPanelOpen, setSeoPanelOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const publishTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
  const targetWords = 1500;
  const readingTime = Math.ceil(wordCount / 200);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (publishTimeoutRef.current) {
        clearTimeout(publishTimeoutRef.current);
      }
    };
  }, []);

  const formatText = (format: string) => {
    if (typeof document === 'undefined') return;

    const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!textarea || !textarea.isConnected) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) return;

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map((line) => `- ${line}`).join('\n');
        break;
      case 'numbered':
        formattedText = selectedText.split('\n').map((line, idx) => `${idx + 1}. ${line}`).join('\n');
        break;
      case 'quote':
        formattedText = selectedText.split('\n').map((line) => `> ${line}`).join('\n');
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F7F8]">
      {/* Header */}
      <div className="border-b border-white/50 bg-white/80 backdrop-blur flex-shrink-0">
        {isPublished && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-3">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Post published successfully! 🎉</span>
            </div>
          </div>
        )}
        {publishError && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3">
            <div className="flex items-center justify-between gap-2 text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{publishError}</span>
              </div>
              <button
                onClick={() => setPublishError(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold text-gray-900">{data.draft?.title || 'Untitled Post'}</h1>
            {isOptimizeMode && (
              <div className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 border border-purple-200">
                Optimize Mode
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" className="text-sm" onClick={() => setViewMode(viewMode === 'preview' ? 'split' : 'preview')}>
              {viewMode === 'preview' ? 'Edit' : 'Preview'}
            </Button>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Draft</span>
              <span>{wordCount} / {targetWords} words</span>
              <span>SEO: <span className="text-gray-900 font-medium">86%</span></span>
              <span>Readability: <span className="text-gray-900 font-medium">92%</span></span>
            </div>

            <Button
              variant="secondary"
              onClick={async () => {
                setIsSaving(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setLastSaved(new Date());
                setIsSaving(false);
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>

            <Button
              className="bg-gray-900 text-white hover:bg-gray-800"
              disabled={isSaving || isPublishing}
              onClick={async () => {
                try {
                  if (!isMountedRef.current) return;

                  setPublishError(null);
                  setIsPublishing(true);

                  // Simulate publishing
                  await new Promise((resolve) => setTimeout(resolve, 2000));

                  if (!isMountedRef.current) return;

                  setIsPublishing(false);
                  setIsPublished(true);

                  // Clear any existing timeout
                  if (publishTimeoutRef.current) {
                    clearTimeout(publishTimeoutRef.current);
                  }

                  // Hide success message after 3 seconds
                  publishTimeoutRef.current = setTimeout(() => {
                    if (isMountedRef.current) {
                      setIsPublished(false);
                    }
                  }, 3000);
                } catch (error) {
                  console.error('Publishing error:', error);
                  if (isMountedRef.current) {
                    setIsPublishing(false);
                    setPublishError('Failed to publish. Please try again.');
                  }
                }
              }}
            >
              <Send className="w-4 h-4 mr-2" />
              {isPublishing ? 'Publishing...' : isPublished ? 'Published!' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="border-b border-white/50 bg-white/70 backdrop-blur flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'edit' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Edit
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'split' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 text-sm font-medium rounded ${viewMode === 'preview' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Preview
              </button>
            </div>

            {/* Formatting Buttons */}
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('bold')}>
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('italic')}>
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('strikethrough')}>
                <Strikethrough className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300 mx-1" />

              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('list')}>
                <List className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('numbered')}>
                <ListOrdered className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300 mx-1" />

              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('quote')}>
                <Quote className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => formatText('code')}>
                <Code className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => {
                const url = prompt('Enter URL:');
                const text = 'link text';
                if (url) setContent(content + `\n[${text}](${url})\n`);
              }}>
                <Link2 className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300 mx-1" />

              <button className="p-1.5 hover:bg-gray-100 rounded">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <AlignRight className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300 mx-1" />

              <button className="p-1.5 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-1.5 hover:bg-gray-100 rounded"
              onClick={() => {
                try {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(content);
                  }
                } catch (error) {
                  console.error('Copy error:', error);
                }
              }}
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-gray-100 rounded"
              onClick={() => {
                try {
                  if (typeof document === 'undefined') return;

                  const blob = new Blob([content], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'draft-content.md';

                  document.body.appendChild(a);
                  a.click();

                  setTimeout(() => {
                    if (a.parentNode && a.isConnected) {
                      document.body.removeChild(a);
                    }
                    URL.revokeObjectURL(url);
                  }, 100);
                } catch (error) {
                  console.error('Download error:', error);
                }
              }}
            >
              <Download className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden min-h-screen">
        {/* Editor/Preview Content */}
        <div className={`${viewMode === 'split' ? 'w-1/2' : 'flex-1'} flex flex-col`}> 
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 py-8">
              {viewMode === 'preview' ? (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {content}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[calc(100vh-200px)] text-gray-900 text-base leading-relaxed resize-none border-none outline-none"
                  placeholder="Start writing your content..."
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/50 bg-white/70 backdrop-blur px-6 py-3 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Auto-save enabled</span>
                <span>Last saved: Just now</span>
              </div>
              <div className="flex items-center gap-6">
                <span>{wordCount} words</span>
                <span>{readingTime} min read</span>
                <span>Markdown enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Split View Preview Panel */}
        {viewMode === 'split' && (
          <div className="w-1/2 border-l border-gray-200 flex flex-col">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-700">Preview</h3>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-4xl mx-auto px-8 py-6">
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar - SEO Panel or Optimization Suggestions */}
        {seoPanelOpen && (
          <div className="w-96 border-l border-white/40 bg-white/70 backdrop-blur flex flex-col">
            {/* Header */}
            <div className="border-b border-white/40 flex-shrink-0">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-900" />
                  <h3 className="text-sm font-medium text-gray-900">
                    {isOptimizeMode ? 'Optimization Suggestions' : 'SEO Score'}
                  </h3>
                </div>
                <button
                  onClick={() => setSeoPanelOpen(false)}
                  className="px-2 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {isOptimizeMode ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">Suggested Enhancements</h3>
                    <div className="space-y-3">
                      {optimizationSuggestions.map((suggestion, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                          <p className="text-sm font-semibold text-purple-600 mb-1">{suggestion.category}</p>
                          <p className="text-sm text-gray-700">{suggestion.recommendation}</p>
                          {suggestion.example && (
                            <p className="mt-2 text-xs text-gray-500">Example: {suggestion.example}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">Content Scores</h3>
                    
                    {/* AEO Optimization Score */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">AEO Score</span>
                        <span className="text-sm font-bold text-gray-900">{optimizationSuggestionsData.aeoOptimization.score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-blue-500" style={{ width: `${optimizationSuggestionsData.aeoOptimization.score}%` }} />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <span>🟡 {optimizationSuggestionsData.aeoOptimization.status}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">SEO Score</span>
                        <span className="text-sm font-bold text-gray-900">86/100</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-900" style={{ width: '86%' }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Excellent - Well optimized for search</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Readability</span>
                        <span className="text-sm font-bold text-gray-900">92/100</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-800" style={{ width: '92%' }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Excellent - Easy to read and understand</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">AEO Optimization</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">✅ STRENGTHS (What's working):</h4>
                        <ul className="space-y-1 text-xs text-gray-600">
                          {optimizationSuggestionsData.aeoOptimization.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">⚠️ IMPROVEMENT OPPORTUNITIES:</h4>
                        <div className="space-y-2">
                          {optimizationSuggestionsData.aeoOptimization.improvements.map((improvement, index) => (
                            <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                              <div className="flex items-center gap-1 text-xs font-medium text-yellow-800 mb-1">
                                🟡 {improvement.impact.charAt(0).toUpperCase() + improvement.impact.slice(1)} Impact: {improvement.title}
                              </div>
                              <p className="text-xs text-yellow-700">Why: {improvement.why}</p>
                              <p className="text-xs text-yellow-600">Expected lift: {improvement.expectedLift}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">SEO Checklist</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-gray-900" />
                        <span className="text-gray-700">Title includes target keyword</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-gray-900" />
                        <span className="text-gray-700">Headers properly structured</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Add internal links (0 found)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3">Target Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">AI automation (8)</Badge>
                      <Badge variant="secondary" className="text-xs">content marketing (6)</Badge>
                      <Badge variant="secondary" className="text-xs">workflow (5)</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toggle SEO Panel Button */}
        {!seoPanelOpen && (
          <button
            onClick={() => setSeoPanelOpen(true)}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-l-2xl shadow-[0_12px_28px_-18px_rgba(0,0,0,0.7)] hover:bg-black/90 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
