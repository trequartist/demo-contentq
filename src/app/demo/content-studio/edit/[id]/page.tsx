"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  X,
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Code,
  Image,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Eye,
  FileText,
  Tag,
  Clock
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

export default function DocumentEditPage() {
  const params = useParams();
  const router = useRouter();
  const { state, actions } = useDemo();
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const doc = state.documents.find(d => d.id === params.id);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
      setDescription(doc.description);
      setContent(doc.content || '');
      setStatus(doc.status);
      setTags(doc.tags || []);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [params.id, state.documents]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
    
    actions.updateDocument(document.id, {
      title,
      description,
      content,
      status,
      tags,
      wordCount
    });
    
    setSaving(false);
    router.push(`/demo/content-studio/document/${document.id}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      router.push(`/demo/content-studio/document/${document.id}`);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'link':
        newText = `[${selectedText}](url)`;
        break;
      case 'h1':
        newText = `# ${selectedText}`;
        break;
      case 'h2':
        newText = `## ${selectedText}`;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        break;
      case 'list':
        newText = `- ${selectedText}`;
        break;
      case 'ordered-list':
        newText = `1. ${selectedText}`;
        break;
      default:
        newText = selectedText;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + newText.length);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Document not found</h2>
          <p className="text-gray-600 mb-4">The document you're looking for doesn't exist.</p>
          <Link
            href="/demo/content-studio"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">Edit Document</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Auto-saving...</span>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter document title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Brief description of your document..."
                    rows={3}
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  
                  {/* Formatting Toolbar */}
                  <div className="bg-gray-50 border border-gray-300 border-b-0 rounded-t-lg p-2 flex items-center space-x-1 flex-wrap">
                    <button
                      onClick={() => insertFormatting('bold')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertFormatting('italic')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                      onClick={() => insertFormatting('h1')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Heading 1"
                    >
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertFormatting('h2')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Heading 2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                      onClick={() => insertFormatting('list')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertFormatting('ordered-list')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                      onClick={() => insertFormatting('quote')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertFormatting('code')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Code"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertFormatting('link')}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showPreview ? (
                    <div className="min-h-[400px] p-4 border border-gray-300 rounded-b-lg bg-white prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') 
                      }} />
                    </div>
                  ) : (
                    <textarea
                      id="content-editor"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[400px] px-4 py-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Start writing your content..."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Document Settings</h3>
              
              {/* Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="idea">Idea</option>
                  <option value="brief">Brief</option>
                  <option value="draft">Draft</option>
                  <option value="post">Post</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  disabled
                  value={document.type}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <option value="blog">Blog</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add tag..."
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Word Count</span>
                  <span className="text-sm font-medium text-gray-900">{wordCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Characters</span>
                  <span className="text-sm font-medium text-gray-900">{content.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reading Time</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.ceil(wordCount / 200)} min
                  </span>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">History</h3>
              <div className="space-y-2">
                <div className="text-xs text-gray-600">
                  <p className="font-medium">Created</p>
                  <p>{document.date}</p>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-medium">Last Modified</p>
                  <p>{document.lastEdited || 'Just now'}</p>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-medium">Author</p>
                  <p>{document.author || state.user.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
