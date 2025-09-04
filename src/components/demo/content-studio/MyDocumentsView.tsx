import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Badge, Input } from '@/components/ui';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit3,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  MoreVertical
} from 'lucide-react';
import { contentStudioData } from '@/lib/content-studio-data-loader';

type Document = ReturnType<typeof contentStudioData.getDocuments>[0];
type FilterType = 'all' | 'published' | 'draft' | 'review' | 'scheduled';
type SortBy = 'modified' | 'created' | 'title' | 'engagement';

export default function MyDocumentsView() {
  const [documents, setDocuments] = useState<Document[]>(contentStudioData.getDocuments());
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortBy>('modified');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  useEffect(() => {
    let filtered = [...documents];

    // Apply filter
    if (filterType !== 'all') {
      filtered = filtered.filter(doc => doc.status === filterType);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return new Date(b.dates.modified).getTime() - new Date(a.dates.modified).getTime();
        case 'created':
          return new Date(b.dates.created).getTime() - new Date(a.dates.created).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'engagement':
          return (b.engagement.views + b.engagement.shares) - (a.engagement.views + a.engagement.shares);
        default:
          return 0;
      }
    });

    setFilteredDocs(filtered);
  }, [documents, filterType, searchQuery, sortBy]);

  const handleSelectDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return FileText;
      case 'case-study':
        return TrendingUp;
      case 'documentation':
        return FileText;
      case 'linkedin':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === 'delete') {
      selectedDocs.forEach(docId => {
        contentStudioData.deleteDocument(docId);
      });
      setDocuments(contentStudioData.getDocuments());
      setSelectedDocs([]);
    } else if (action === 'publish') {
      selectedDocs.forEach(docId => {
        contentStudioData.updateDocument(docId, { status: 'published' });
      });
      setDocuments(contentStudioData.getDocuments());
      setSelectedDocs([]);
    }
  };

  const handleSingleAction = (docId: string, action: string) => {
    if (action === 'delete') {
      contentStudioData.deleteDocument(docId);
      setDocuments(contentStudioData.getDocuments());
    } else if (action === 'duplicate') {
      const originalDoc = documents.find(d => d.id === docId);
      if (originalDoc) {
        contentStudioData.createDocument({
          ...originalDoc,
          title: `${originalDoc.title} (Copy)`,
          status: 'draft'
        });
        setDocuments(contentStudioData.getDocuments());
      }
    } else if (action === 'schedule') {
      const scheduleDate = new Date();
      scheduleDate.setDate(scheduleDate.getDate() + 7);
      contentStudioData.scheduleDocument(docId, scheduleDate.toISOString());
      setDocuments(contentStudioData.getDocuments());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All ({documents.length})
            </Button>
            <Button
              variant={filterType === 'published' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('published')}
            >
              Published ({documents.filter(d => d.status === 'published').length})
            </Button>
            <Button
              variant={filterType === 'draft' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('draft')}
            >
              Drafts ({documents.filter(d => d.status === 'draft').length})
            </Button>
            <Button
              variant={filterType === 'review' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('review')}
            >
              In Review ({documents.filter(d => d.status === 'review').length})
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
          >
            <option value="modified">Last Modified</option>
            <option value="created">Date Created</option>
            <option value="title">Title</option>
            <option value="engagement">Engagement</option>
          </select>
          
          {selectedDocs.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{selectedDocs.length} selected</Badge>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleBulkAction('publish')}
              >
                <Download className="w-4 h-4 mr-1" />
                Publish
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-red-600"
                onClick={() => handleBulkAction('delete')}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {filteredDocs.map((doc) => {
          const Icon = getDocumentIcon(doc.type);
          const isSelected = selectedDocs.includes(doc.id);
          
          return (
            <Card 
              key={doc.id} 
              className={`border-gray-200 hover:shadow-md transition-all ${
                isSelected ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectDoc(doc.id)}
                    className="mt-1 rounded border-gray-300"
                  />
                  
                  {/* Icon */}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.content.wordCount} words</span>
                          <span>•</span>
                          <span>{doc.content.readingTime} min read</span>
                          <span>•</span>
                          <span>Modified {new Date(doc.dates.modified).toLocaleDateString()}</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex items-center gap-2 mt-2">
                          {doc.metadata.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.metadata.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{doc.metadata.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        
                        {doc.dates.scheduled && (
                          <Badge variant="secondary">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(doc.dates.scheduled).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    {doc.status === 'published' && doc.performance && (
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Eye className="w-4 h-4" />
                          <span>{doc.performance.views?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Share2 className="w-4 h-4" />
                          <span>{doc.performance.shares || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                          <span>{doc.performance.comments || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Heart className="w-4 h-4" />
                          <span>{doc.performance.likes || 0}</span>
                        </div>
                        
                        {doc.metadata.seoScore > 0 && (
                          <>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">SEO</span>
                              <div className="flex items-center">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      doc.metadata.seoScore >= 80 ? 'bg-green-500' :
                                      doc.metadata.seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${doc.metadata.seoScore}%` }}
                                  />
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                  {doc.metadata.seoScore}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => window.open(`/demo/content-studio/document/${doc.id}`, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {(doc.status === 'draft' || doc.status === 'review') && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => window.open(`/demo/content-studio/edit/${doc.id}`, '_blank')}
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleSingleAction(doc.id, 'duplicate')}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Duplicate
                      </Button>
                      <div className="relative">
                        <Button variant="secondary" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredDocs.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No documents found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
