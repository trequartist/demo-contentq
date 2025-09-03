"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Copy,
  Share2,
  Eye,
  Clock,
  User,
  Tag,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

export default function DocumentViewPage() {
  const params = useParams();
  const router = useRouter();
  const { state, actions } = useDemo();
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doc = state.documents.find(d => d.id === params.id);
    if (doc) {
      setDocument(doc);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [params.id, state.documents]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      actions.deleteDocument(document.id);
      router.push('/demo/content-studio');
    }
  };

  const handleExport = () => {
    const content = JSON.stringify(document, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    a.click();
  };

  const handleDuplicate = () => {
    actions.createDocument({
      ...document,
      title: `${document.title} (Copy)`,
      status: 'draft',
      id: undefined
    });
    router.push('/demo/content-studio');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published':
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
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
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/demo/content-studio"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Documents
              </Link>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(document.status)}
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href={`/demo/content-studio/edit/${document.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDuplicate}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Document Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{document.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{document.description}</p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{document.author || 'Anonymous'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Last edited {document.lastEdited || 'recently'}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                <span>{document.wordCount} words</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{Math.floor(Math.random() * 100) + 50} views</span>
              </div>
            </div>

            {/* Tags */}
            {document.tags && document.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-4">
                <Tag className="w-4 h-4 text-gray-400" />
                {document.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Document Body */}
          <div className="p-8">
            <div className="prose max-w-none">
              {document.content ? (
                <div dangerouslySetInnerHTML={{ __html: document.content }} />
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Points</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Advanced speech recognition technology with industry-leading accuracy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Reproducible benchmarking methodology for transparent performance metrics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Enterprise-grade compliance and security features</span>
                    </li>
                  </ul>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technical Specifications</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 text-gray-600 font-medium">Model</td>
                          <td className="py-2 text-gray-900">Nova-3 Advanced</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600 font-medium">Accuracy</td>
                          <td className="py-2 text-gray-900">95.8% WER</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600 font-medium">Latency</td>
                          <td className="py-2 text-gray-900">&lt; 200ms</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600 font-medium">Languages</td>
                          <td className="py-2 text-gray-900">30+ supported</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Conclusion</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Document Actions */}
          <div className="p-8 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Publish
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Preview
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Auto-saved {document.lastEdited || 'recently'}
              </div>
            </div>
          </div>
        </div>

        {/* Related Documents */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.documents
              .filter(d => d.id !== document.id && d.type === document.type)
              .slice(0, 3)
              .map(doc => (
                <Link
                  key={doc.id}
                  href={`/demo/content-studio/document/${doc.id}`}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{doc.title}</h4>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{doc.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{doc.wordCount} words</span>
                    <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
