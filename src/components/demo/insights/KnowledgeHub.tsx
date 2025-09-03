"use client";

import React, { useState } from 'react';
import { 
  BookOpen,
  TrendingUp,
  Award,
  BarChart3,
  FileText,
  Target,
  Eye,
  Bookmark,
  ChevronRight,
  Plus
} from 'lucide-react';

interface KnowledgeCategory {
  id: string;
  name: string;
  count: number;
  trending: boolean;
  icon: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  type: string;
  views: number;
  saves: number;
  lastUpdated: string;
}

interface KnowledgeHubProps {
  data: {
    stats: {
      totalInsights: number;
      weeklyGrowth: number;
      topCategory: string;
      healthScore: number;
    };
    categories: KnowledgeCategory[];
    recentItems: KnowledgeItem[];
  };
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const getCategoryIcon = (iconName: string) => {
    switch(iconName) {
      case 'code':
        return <FileText className="w-4 h-4" />;
      case 'briefcase':
        return <Award className="w-4 h-4" />;
      case 'chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'star':
        return <Award className="w-4 h-4" />;
      case 'target':
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'guide':
        return <BookOpen className="w-3 h-3" />;
      case 'whitepaper':
        return <FileText className="w-3 h-3" />;
      case 'tool':
        return <Target className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-black">Knowledge Hub</h2>
          <button className="p-1.5 text-gray-500 hover:text-black transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Health Score */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Health Score</span>
            <span className="text-lg font-bold text-black">{data.stats.healthScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-black h-1.5 rounded-full transition-all"
              style={{ width: `${data.stats.healthScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-gray-500">
              {data.stats.totalInsights} insights
            </span>
            <span className="text-black font-medium">
              +{data.stats.weeklyGrowth} this week
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-xs font-medium text-gray-600 uppercase mb-2">Categories</h3>
        <div className="space-y-2">
          {data.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                {getCategoryIcon(category.icon)}
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs">{category.count}</span>
                {category.trending && (
                  <TrendingUp className="w-3 h-3" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">Recent Items</h3>
        <div className="space-y-3">
          {data.recentItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-black line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-500">{item.type}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {item.views}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="w-3 h-3 mr-1" />
                    {item.saves}
                  </span>
                </div>
                <span>{item.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <button className="w-full px-3 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>Browse All Content</span>
        </button>
      </div>
    </div>
  );
};

export default KnowledgeHub;