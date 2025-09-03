"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Grid3x3,
  List,
  ChevronDown,
  FileText,
  Calendar,
  Sparkles,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  Globe
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

export default function ContentStudioPage() {
  const { state, actions } = useDemo();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [filteredDocuments, setFilteredDocuments] = useState(state.documents);

  const tabs = [
    { id: 'all', label: 'All', count: state.documents.length },
    { id: 'briefs', label: 'Briefs', count: state.documents.filter(d => d.status === 'brief').length },
    { id: 'drafts', label: 'Drafts', count: state.documents.filter(d => d.status === 'draft').length },
    { id: 'published', label: 'Published', count: state.documents.filter(d => d.status === 'published').length },
    { id: 'ideas', label: 'Ideas', count: state.documents.filter(d => d.status === 'idea').length }
  ];

  useEffect(() => {
    let filtered = [...state.documents];
    
    // Filter by tab
    if (activeTab !== 'all') {
      const statusMap: Record<string, string> = {
        'briefs': 'brief',
        'drafts': 'draft',
        'published': 'published',
        'ideas': 'idea'
      };
      const targetStatus = statusMap[activeTab];
      if (targetStatus) {
        filtered = filtered.filter(d => d.status === targetStatus);
      }
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'words':
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });
    
    setFilteredDocuments(filtered);
  }, [state.documents, activeTab, searchQuery, sortBy]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published':
      case 'post':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'draft':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'brief':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'idea':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleDuplicate = (doc: any) => {
    actions.createDocument({
      ...doc,
      title: `${doc.title} (Copy)`,
      status: 'draft',
      id: undefined
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      actions.deleteDocument(id);
    }
  };

  const handleExport = (doc: any) => {
    const content = JSON.stringify(doc, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/assets" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Assets
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-semibold">{state.selectedAsset || 'deepgram'}</h1>
                  <p className="text-xs text-gray-500">Blog Content Studio</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <button className="flex items-center space-x-1 text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Document</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Diagnostics</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Playbook</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center space-x-6 mt-4">
            <Link href="/demo/content-studio/create" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Create Content</span>
            </Link>
            <Link href="/demo/content-studio" className="flex items-center space-x-2 text-sm text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
              <FileText className="w-4 h-4" />
              <span>My Documents</span>
            </Link>
            <Link href="/demo/content-studio/calendar" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Content Calendar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search title, content, today, this week, 500 words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="words">Sort by Words</option>
            </select>
            <Link
              href="/demo/content-studio/create"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Document Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            {filteredDocuments.length} of {state.documents.length} documents
          </span>
          <span className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Blog
          </span>
        </div>

        {/* Document Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <span className="text-xs text-gray-400">{doc.date}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === doc.id ? null : doc.id)}
                      className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {showActionMenu === doc.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <Link
                          href={`/demo/content-studio/document/${doc.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Link>
                        <Link
                          href={`/demo/content-studio/edit/${doc.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDuplicate(doc)}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleExport(doc)}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <Link href={`/demo/content-studio/document/${doc.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {doc.title}
                  </h3>
                </Link>
                
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {doc.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {doc.wordCount} words
                  </span>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 2 && (
                        <span className="text-gray-400">+{doc.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Words</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/demo/content-studio/document/${doc.id}`}>
                        <p className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {doc.title}
                        </p>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{doc.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{doc.wordCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{doc.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/demo/content-studio/document/${doc.id}`}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/demo/content-studio/edit/${doc.id}`}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}