"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { Button, Badge, Input, Textarea } from '@/components/ui';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Eye, 
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function EditDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const documentId = params.id as string;
  
  const [document, setDocument] = useState(contentStudioData.getDocumentById(documentId));
  const [title, setTitle] = useState(document?.title || '');
  const [content, setContent] = useState(document?.content?.excerpt || '');
  const [tags, setTags] = useState(document?.metadata?.tags?.join(', ') || '');
  const [category, setCategory] = useState(document?.metadata?.category || '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  useEffect(() => {
    if (!document) {
      router.push('/demo/content-studio');
      return;
    }
  }, [document, router]);

  if (!document) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    contentStudioData.updateDocument(documentId, {
      title,
      content: {
        ...document.content,
        excerpt: content,
        wordCount: content.split(/\s+/).length,
        sections: document.content?.sections || []
      } as any,
      metadata: {
        ...document.metadata,
        tags: tags.split(',').map(t => t.trim()),
        category
      }
    } as any);
    
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    contentStudioData.updateDocument(documentId, {
      title,
      content: {
        ...document.content,
        excerpt: content,
        wordCount: content.split(/\s+/).length,
        sections: document.content?.sections || []
      } as any,
      metadata: {
        ...document.metadata,
        tags: tags.split(',').map(t => t.trim()),
        category
      },
      status: 'published',
      dates: {
        ...document.dates,
        published: new Date().toISOString() as any
      }
    } as any);
    
    router.push('/demo/content-studio');
  };

  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/demo/content-studio')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Edit Document</h1>
                <p className="text-sm text-gray-600">{document.type} • {document.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{wordCount} words</span>
                <span>{readingTime} min read</span>
                <Badge 
                  variant="secondary"
                  className={
                    document.status === 'published' ? 'bg-green-100 text-green-700' :
                    document.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    document.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }
                >
                  {document.status}
                </Badge>
              </div>
              
              <Button
                variant="secondary"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              {document.status !== 'published' && (
                <Button
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Editor */}
          <div className="col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your content..."
                rows={20}
                className="font-sans text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., AI Automation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tags</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., RevOps, AI, Automation"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Document Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">
                    {new Date(document.dates.created).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modified</span>
                  <span className="text-gray-900">
                    {new Date(document.dates.modified).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Author</span>
                  <span className="text-gray-900">{document.author.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last saved</span>
                  <span className="text-gray-900">
                    {(() => {
                      const diff = Date.now() - lastSaved.getTime();
                      const minutes = Math.floor(diff / 60000);
                      if (minutes === 0) return 'Just now';
                      if (minutes === 1) return '1 minute ago';
                      if (minutes < 60) return `${minutes} minutes ago`;
                      return 'Over an hour ago';
                    })()}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            {document.status === 'published' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Views</span>
                    <span className="text-sm font-medium text-gray-900">
                      {document.performance.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shares</span>
                    <span className="text-sm font-medium text-gray-900">
                      {document.performance.shares}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Comments</span>
                    <span className="text-sm font-medium text-gray-900">
                      {document.performance.comments}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Conversion</span>
                    <span className="text-sm font-medium text-green-600">
                      {document.performance.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Scores */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">SEO Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">SEO Score</span>
                    <span className="text-sm font-bold text-green-600">
                      {document.metadata.seoScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${document.metadata.seoScore}%` }} 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">AEO Score</span>
                    <span className="text-sm font-bold text-yellow-600">
                      {document.metadata.aeoScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500" 
                      style={{ width: `${document.metadata.aeoScore}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Readability</span>
                    <span className="text-sm font-bold text-blue-600">
                      {document.metadata.readabilityScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${document.metadata.readabilityScore}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button size="sm" variant="secondary" className="w-full text-xs">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI Improve
                </Button>
                <Button size="sm" variant="secondary" className="w-full text-xs">
                  <TrendingUp className="w-3 h-3 mr-2" />
                  SEO Analysis
                </Button>
                <Button size="sm" variant="secondary" className="w-full text-xs">
                  <Eye className="w-3 h-3 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}