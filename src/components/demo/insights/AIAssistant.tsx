"use client";

import React, { useState } from 'react';
import { 
  Brain,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: string;
  priority: string;
  title: string;
  reason: string;
  impact: string;
  effort: string;
}

interface AIAssistantProps {
  data: {
    suggestions: Suggestion[];
    metrics: {
      contentGaps: number;
      opportunities: number;
      competitorMoves: number;
      trendingTopics: number;
    };
  };
}

const AIAssistant: React.FC<AIAssistantProps> = ({ data }) => {
  const [suggestions] = useState<Suggestion[]>(data?.suggestions || []);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalyzing(false);
  };

  const getSuggestionIcon = (type: string) => {
    switch(type) {
      case 'content':
        return <Target className="w-4 h-4" />;
      case 'optimization':
        return <TrendingUp className="w-4 h-4" />;
      case 'strategy':
        return <Brain className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-black text-white';
      case 'medium':
        return 'bg-gray-600 text-white';
      case 'low':
        return 'bg-gray-300 text-gray-700';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const getEffortIndicator = (effort: string) => {
    switch(effort) {
      case 'low':
        return { width: '33%', label: 'Low' };
      case 'medium':
        return { width: '66%', label: 'Medium' };
      case 'high':
        return { width: '100%', label: 'High' };
      default:
        return { width: '50%', label: 'Unknown' };
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-black" />
            <h2 className="text-lg font-semibold text-black">AI Assistant</h2>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="p-1.5 text-gray-500 hover:text-black transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-black">{data.metrics.contentGaps}</div>
            <div className="text-xs text-gray-600">Content Gaps</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-black">{data.metrics.opportunities}</div>
            <div className="text-xs text-gray-600">Opportunities</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-black">{data.metrics.competitorMoves}</div>
            <div className="text-xs text-gray-600">Competitor Moves</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-bold text-black">{data.metrics.trendingTopics}</div>
            <div className="text-xs text-gray-600">Trending Topics</div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">AI Recommendations</h3>
        <div className="space-y-3">
          {suggestions.map((suggestion) => {
            const effortInfo = getEffortIndicator(suggestion.effort);
            return (
              <div
                key={suggestion.id}
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSuggestion === suggestion.id
                    ? 'border-black shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSuggestion(suggestion.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                      </div>
                      <h4 className="text-sm font-medium text-black line-clamp-2">
                        {suggestion.title}
                      </h4>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <p className="text-xs text-gray-600 mb-3">
                  {suggestion.reason}
                </p>

                <div className="space-y-2">
                  {/* Impact */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Impact:</span>
                    <span className="text-xs font-medium text-black">{suggestion.impact}</span>
                  </div>

                  {/* Effort */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Effort:</span>
                      <span className="text-xs text-gray-600">{effortInfo.label}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-black h-1 rounded-full transition-all"
                        style={{ width: effortInfo.width }}
                      />
                    </div>
                  </div>
                </div>

                {selectedSuggestion === suggestion.id && (
                  <button className="mt-3 w-full px-3 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2">
                    <span>Take Action</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">AI Analysis</span>
          <span className="text-xs text-black font-medium">95% Confidence</span>
        </div>
        <button className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>Generate More Suggestions</span>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;