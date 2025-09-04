"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui';
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Hash,
  Clock,
  TrendingUp,
  Eye,
  Share2,
  Download,
  Edit3,
  MoreVertical
} from 'lucide-react';

export default function DocumentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [document, setDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get document from contentStudioData
    const doc = contentStudioData.getDocumentById(id);
    if (doc) {
      setDocument(doc);
    }
    setIsLoading(false);
  }, [id]);

  const handlePublish = () => {
    if (document) {
      contentStudioData.updateDocument(document.id, {
        status: 'published'
      });
      setDocument({...document, status: 'published'});
    }
  };

  const handleEdit = () => {
    router.push(`/demo/content-studio/edit/${document?.id}`);
  };

  const handleSchedule = () => {
    if (document) {
      contentStudioData.scheduleDocument(document.id, new Date().toISOString());
      const updated = contentStudioData.getDocumentById(document.id);
      if (updated) {
        setDocument(updated);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': 'bg-gray-100 text-gray-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'published': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Document not found</p>
          <Button 
            onClick={() => router.push('/demo/content-studio')}
            className="mt-4"
          >
            Back to Content Studio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push('/demo/content-studio')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{document.title}</h1>
                  <p className="text-sm text-gray-600">
                    {document.type} • Created {new Date(document.dates?.created || new Date()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(document.status)}>
                {document.status}
              </Badge>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEdit}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSchedule}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800"
                size="sm"
                onClick={handlePublish}
                disabled={document.status === 'published'}
              >
                <Eye className="w-4 h-4 mr-2" />
                Publish
              </Button>
              <Button
                variant="secondary"
                size="sm"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    {document.content?.excerpt || 'No excerpt available'}
                  </p>
                  
                  {document.content?.keyTakeaways && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Takeaways</h3>
                      <ul className="space-y-2">
                        {document.content.keyTakeaways.map((takeaway: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span className="text-gray-700">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {document.content?.sections && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Sections</h3>
                      <div className="space-y-2">
                        {document.content.sections.map((section: string, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            {document.performance && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Real-time content performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(document.performance).map(([key, value]: [string, any]) => (
                      <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Details */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Author</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {document.author?.name || 'Unknown'}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Modified</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {new Date(document.dates?.modified || new Date()).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Word Count</p>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {document.content?.wordCount || 0} words
                    </span>
                  </div>
                </div>

                {document.content?.targetKeywords && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {document.content.targetKeywords.map((keyword: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            {document.metadata && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-base">SEO Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {document.metadata.metaTitle && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Meta Title</p>
                      <p className="text-sm text-gray-900">{document.metadata.metaTitle}</p>
                    </div>
                  )}
                  
                  {document.metadata.metaDescription && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Meta Description</p>
                      <p className="text-sm text-gray-900">{document.metadata.metaDescription}</p>
                    </div>
                  )}
                  
                  {document.metadata.slug && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">URL Slug</p>
                      <p className="text-sm text-gray-900 font-mono">{document.metadata.slug}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Document
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Documents */}
        <Card className="border-gray-200 mt-6">
          <CardHeader>
            <CardTitle>Related Documents</CardTitle>
            <CardDescription>Other content you might want to review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contentStudioData.getAllData().documents
                .filter((doc: any) => doc.id !== document.id)
                .slice(0, 3)
                .map((doc: any) => (
                  <div 
                    key={doc.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/demo/content-studio/document/${doc.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{doc.title}</h3>
                      <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {doc.content?.excerpt || 'No excerpt available'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.type} • {new Date(doc.dates?.created || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}