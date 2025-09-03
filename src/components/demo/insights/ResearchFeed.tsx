"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  Target,
  Clock,
  ChevronRight,
  Filter,
  RefreshCw
} from 'lucide-react';

interface ResearchItem {
  id: string;
  type: string;
  title: string;
  source: string;
  time: string;
  relevance: number;
  summary: string;
  tags: string[];
}

interface ResearchFeedProps {
  data: {
    items: ResearchItem[];
  };
}

const ResearchFeed: React.FC<ResearchFeedProps> = ({ data }) => {
  const [items] = useState<ResearchItem[]>(data?.items || []);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'trend':
        return <TrendingUp className="w-4 h-4" />;
      case 'competitor':
        return <Target className="w-4 h-4" />;
      case 'insight':
        return <Zap className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'bg-black';
    if (relevance >= 70) return 'bg-gray-600';
    return 'bg-gray-400';
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredItems = selectedType === 'all' 
    ? items 
    : items.filter(item => item.type === selectedType);

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-black">Research Feed</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Live</span>
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2">
          {['all', 'trend', 'competitor', 'insight', 'market'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-full capitalize transition-all ${
                selectedType === type
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={handleRefresh}
            className="ml-auto p-1.5 text-gray-500 hover:text-black transition-colors"
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Feed Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
              index === 0 ? 'border-black' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-black line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{item.source}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className={`w-12 h-1 rounded-full ${getRelevanceColor(item.relevance)}`} />
                <span className="text-xs text-gray-500">{item.relevance}%</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {item.summary}
            </p>

            {/* Tags */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{filteredItems.length} insights</span>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchFeed;