import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Badge, Input } from '@/components/ui';
import { 
  Search, 
  Grid3X3,
  List,
  Grid,
  MoreHorizontal,
  SortAsc,
  RefreshCw,
  Plus
} from 'lucide-react';
import { contentStudioData } from '@/lib/content-studio-data-loader';

type Document = ReturnType<typeof contentStudioData.getDocuments>[0];
type FilterType = 'all' | 'briefs' | 'drafts' | 'published' | 'ideas';
type ViewMode = 'grid' | 'list';

export default function MyDocumentsViewNew() {
  const [documents, setDocuments] = useState<Document[]>(contentStudioData.getDocuments());
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('modified');

  useEffect(() => {
    let filtered = [...documents];

    // Apply filter
    if (filterType === 'briefs') {
      filtered = filtered.filter(doc => doc.status === 'review');
    } else if (filterType === 'drafts') {
      filtered = filtered.filter(doc => doc.status === 'draft');
    } else if (filterType === 'published') {
      filtered = filtered.filter(doc => doc.status === 'published');
    } else if (filterType === 'ideas') {
      filtered = filtered.filter(doc => doc.status === 'draft' && doc.content.wordCount < 100);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      if (sortBy === 'modified') {
        return new Date(b.dates.modified).getTime() - new Date(a.dates.modified).getTime();
      } else if (sortBy === 'created') {
        return new Date(b.dates.created).getTime() - new Date(a.dates.created).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredDocs(filtered);
  }, [documents, filterType, searchQuery, sortBy]);

  const getStatusBadge = (status: string, type: string) => {
    if (status === 'published') {
      return <Badge className="bg-black text-white text-xs">Post</Badge>;
    } else if (status === 'draft') {
      return <Badge className="bg-white border border-black/20 text-black/60 text-xs">Draft</Badge>;
    } else if (status === 'review') {
      return <Badge className="bg-black/10 text-black text-xs border-0">Brief</Badge>;
    }
    return <Badge className="bg-black/5 text-black/60 text-xs border-0">Post</Badge>;
  };

  const getDocumentCounts = () => {
    return {
      all: documents.length,
      briefs: documents.filter(d => d.status === 'review').length,
      drafts: documents.filter(d => d.status === 'draft').length,
      published: documents.filter(d => d.status === 'published').length,
      ideas: documents.filter(d => d.status === 'draft' && d.content.wordCount < 100).length
    };
  };

  const counts = getDocumentCounts();

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/30" />
            <Input
              type="text"
              placeholder="Search: title, content, today, this week, 500 words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border-black/10 focus:border-black/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-black/10 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-black/5' : 'hover:bg-black/[0.02]'}`}
            >
              <Grid3X3 className="w-4 h-4 text-black/60" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-black/5' : 'hover:bg-black/[0.02]'}`}
            >
              <List className="w-4 h-4 text-black/60" />
            </button>
            <button className="p-2 hover:bg-black/[0.02] transition-colors">
              <Grid className="w-4 h-4 text-black/60" />
            </button>
          </div>

          <Button variant="secondary" size="sm" className="bg-white border border-black/20 text-black hover:bg-black/5">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>

          <Button variant="secondary" size="sm" className="bg-white border border-black/20 text-black hover:bg-black/5">
            <RefreshCw className="w-4 h-4" />
          </Button>

          <Button className="bg-black hover:bg-black/90 text-white" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-black text-white p-1 rounded-lg w-fit">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            filterType === 'all' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          All {counts.all}
        </button>
        <button
          onClick={() => setFilterType('briefs')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            filterType === 'briefs' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          Briefs {counts.briefs}
        </button>
        <button
          onClick={() => setFilterType('drafts')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            filterType === 'drafts' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          Drafts {counts.drafts}
        </button>
        <button
          onClick={() => setFilterType('published')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            filterType === 'published' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          Published {counts.published}
        </button>
        <button
          onClick={() => setFilterType('ideas')}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            filterType === 'ideas' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          Ideas {counts.ideas}
        </button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-sm text-black/40">
        <span>{filteredDocs.length} of {documents.length} documents</span>
        <span>LinkedIn</span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="border border-black/10 hover:border-black/20 transition-all cursor-pointer shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  {getStatusBadge(doc.status, doc.type)}
                  <span className="text-xs text-black/40">
                    {new Date(doc.dates.modified).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-medium text-black text-sm line-clamp-2 leading-tight">
                  {doc.title}
                </h3>

                {/* Content Preview */}
                <p className="text-xs text-black/50 line-clamp-3 leading-relaxed">
                  {doc.content.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <span className="text-xs text-black/40">
                    {doc.content.wordCount} words
                  </span>
                  <button className="text-black/30 hover:text-black/60 transition-colors">
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
          <div className="text-black/40 mb-2">No documents found</div>
          <div className="text-sm text-black/30">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
}
