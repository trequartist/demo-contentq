"use client";

import { useState, useEffect } from 'react';
import { Search, FileText, Calendar, MoreHorizontal, X } from 'lucide-react';
import { Card, CardContent, Input, Badge } from '@/components/ui';
import { contentStudioData } from '@/lib/content-studio-data-loader';

type Document = ReturnType<typeof contentStudioData.getDocuments>[0];

interface DocumentsPanelProps {
  onSelectDocument?: (doc: Document) => void;
  onClose?: () => void;
}

export function DocumentsPanel({ onSelectDocument, onClose }: DocumentsPanelProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);

  useEffect(() => {
    const docs = contentStudioData.getDocuments();
    setDocuments(docs);
    setFilteredDocs(docs);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDocs(documents);
    } else {
      const filtered = documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocs(filtered);
    }
  }, [searchTerm, documents]);

  const getStatusBadge = (status: string, type: string) => {
    const statusConfig = {
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Draft' },
      published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Published' },
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Scheduled' },
      idea: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Idea' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

    return (
      <Badge className={`${config.bg} ${config.text} border-0 text-xs`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Documents</h2>
            <p className="text-sm text-gray-500">Browse and reuse your content</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="p-6">
        <div className="mb-4 text-sm text-gray-500">
          {filteredDocs.length} {filteredDocs.length === 1 ? 'document' : 'documents'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.id}
              className="border border-gray-100 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
              onClick={() => onSelectDocument?.(doc)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    {getStatusBadge(doc.status, doc.type)}
                    <span className="text-xs text-gray-400">
                      {new Date(doc.dates.modified).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                    {doc.title}
                  </h3>

                  {/* Content Preview */}
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {doc.content.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FileText className="h-3 w-3" />
                      <span>{doc.content.wordCount} words</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-gray-300 hover:text-gray-600 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No documents found</div>
            <div className="text-sm text-gray-300">Try adjusting your search</div>
          </div>
        )}
      </div>
    </div>
  );
}

