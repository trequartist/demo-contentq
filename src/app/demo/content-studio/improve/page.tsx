"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  FileText,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Clock,
  ArrowRight,
  Search
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ImprovementSuggestion {
  id: string;
  type: 'seo' | 'readability' | 'engagement' | 'structure';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
}

export default function ImproveContentPage() {
  const { state } = useDemo();
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'blog' | 'linkedin'>('all');
  const [showResults, setShowResults] = useState(false);

  const suggestions: ImprovementSuggestion[] = [
    {
      id: '1',
      type: 'seo',
      title: 'Optimize Meta Description',
      description: 'Add a compelling meta description between 150-160 characters to improve CTR',
      impact: 'high',
      effort: 'low'
    },
    {
      id: '2',
      type: 'readability',
      title: 'Simplify Complex Sentences',
      description: 'Break down 3 sentences that are over 30 words for better readability',
      impact: 'medium',
      effort: 'low'
    },
    {
      id: '3',
      type: 'engagement',
      title: 'Add Visual Content',
      description: 'Include 2-3 relevant images or infographics to increase engagement',
      impact: 'high',
      effort: 'medium'
    },
    {
      id: '4',
      type: 'structure',
      title: 'Improve Content Structure',
      description: 'Add subheadings every 300 words to improve scannability',
      impact: 'medium',
      effort: 'low'
    },
    {
      id: '5',
      type: 'seo',
      title: 'Add Internal Links',
      description: 'Link to 3-5 related articles to improve site navigation and SEO',
      impact: 'medium',
      effort: 'low'
    }
  ];

  const filteredDocuments = state.documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAnalyze = async (document: any) => {
    setSelectedDocument(document);
    setAnalyzing(true);
    setShowResults(false);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalyzing(false);
    setShowResults(true);
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high':
        return 'bg-black text-white';
      case 'medium':
        return 'bg-gray-600 text-white';
      case 'low':
        return 'bg-gray-300 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getEffortColor = (effort: string) => {
    switch(effort) {
      case 'low':
        return 'text-black';
      case 'medium':
        return 'text-gray-600';
      case 'high':
        return 'text-gray-400';
      default:
        return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'seo':
        return <Target className="w-4 h-4" />;
      case 'readability':
        return <FileText className="w-4 h-4" />;
      case 'engagement':
        return <TrendingUp className="w-4 h-4" />;
      case 'structure':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  if (showResults && selectedDocument) {
    return (
      <div className="min-h-screen bg-white">
        <div className="px-8 py-6 border-b border-gray-200">
          <button
            onClick={() => {
              setShowResults(false);
              setSelectedDocument(null);
            }}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to selection</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">Content Improvement Report</h1>
              <p className="text-sm text-gray-600 mt-1">{selectedDocument.title}</p>
            </div>
            <button
              onClick={() => router.push(`/demo/content-studio/edit/${selectedDocument.id}`)}
              className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Apply Improvements</span>
            </button>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Score Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">73</div>
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-black h-1.5 rounded-full" style={{ width: '73%' }} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">68</div>
              <div className="text-sm text-gray-600">SEO Score</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">82</div>
              <div className="text-sm text-gray-600">Readability</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-black h-1.5 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">71</div>
              <div className="text-sm text-gray-600">Engagement</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: '71%' }} />
              </div>
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">Improvement Suggestions</h2>
              <p className="text-sm text-gray-600 mt-1">
                {suggestions.length} recommendations to enhance your content
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-black mb-1">{suggestion.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Impact:</span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactColor(suggestion.impact)}`}>
                              {suggestion.impact}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Effort:</span>
                            <span className={`text-xs font-medium ${getEffortColor(suggestion.effort)}`}>
                              {suggestion.effort}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="px-3 py-1.5 text-sm text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Estimated time to implement: <span className="font-medium text-black">45 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Export Report
                  </button>
                  <button
                    onClick={() => router.push(`/demo/content-studio/edit/${selectedDocument.id}`)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Start Improving
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-6 border-b border-gray-200">
        <Link href="/demo/content-studio">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Content Studio</span>
          </button>
        </Link>
        
        <h1 className="text-2xl font-semibold text-black">Improve Existing Content</h1>
        <p className="text-sm text-gray-600 mt-1">
          Select content to analyze and get AI-powered improvement suggestions
        </p>
      </div>

      <div className="px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              {(['all', 'blog', 'linkedin'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-sm font-medium rounded capitalize transition-all ${
                    activeFilter === filter ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black mb-2">{doc.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{doc.excerpt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-500 capitalize">{doc.type}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{doc.lastEdited}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      doc.status === 'published' ? 'bg-black text-white' :
                      doc.status === 'draft' ? 'bg-gray-200 text-gray-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-black">72</div>
                      <div className="text-xs text-gray-600">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-black">1.2k</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-black">4.5%</div>
                      <div className="text-xs text-gray-600">CTR</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAnalyze(doc)}
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Analyze & Improve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-sm text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search' : 'Create content first to improve it'}
            </p>
            <Link href="/demo/content-studio/create">
              <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors">
                Create Content
              </button>
            </Link>
          </div>
        )}

        {/* Analyzing Modal */}
        {analyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-8 text-center">
              <RefreshCw className="w-12 h-12 text-black mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-black mb-2">Analyzing Content</h2>
              <p className="text-sm text-gray-600">
                Running comprehensive analysis on your content...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
