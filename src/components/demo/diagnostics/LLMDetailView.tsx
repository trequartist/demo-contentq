"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { X, TrendingUp, TrendingDown, Target, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface LLMDetailViewProps {
  llmData: {
    name: string;
    score: number;
    previousScore: number;
    change: number;
    weight: number;
    citationAnalysis: {
      mentionedIn: number;
      totalQueries: number;
      averagePosition: number;
      citationContext: string;
    };
    whatsWorking: string[];
    gapsAndOpportunities: string[];
    recommendedActions: string[];
  };
  onClose: () => void;
}

export default function LLMDetailView({ llmData, onClose }: LLMDetailViewProps) {
  const isPositive = llmData.change > 0;
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeIcon = changeIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{llmData.name} — Score: {llmData.score}/100</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <ChangeIcon className="w-4 h-4" />
                {isPositive ? '+' : ''}{llmData.change} from previous
              </div>
              <span className="text-sm text-gray-500">({llmData.weight}% weight)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          <div className="space-y-8">
            {/* Citation Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                CITATION ANALYSIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{llmData.citationAnalysis.mentionedIn}</div>
                  <div className="text-sm text-blue-700">of {llmData.citationAnalysis.totalQueries} test queries</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">{llmData.citationAnalysis.averagePosition}</div>
                  <div className="text-sm text-green-700">average position</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-900">{llmData.citationAnalysis.citationContext}</div>
                  <div className="text-xs text-purple-700">citation context</div>
                </div>
              </div>
            </Card>

            {/* What's Working */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                WHAT'S WORKING
              </h3>
              <div className="space-y-3">
                {llmData.whatsWorking.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gaps & Opportunities */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                GAPS & OPPORTUNITIES
              </h3>
              <div className="space-y-3">
                {llmData.gapsAndOpportunities.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-orange-800">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                RECOMMENDED ACTIONS
              </h3>
              <div className="space-y-3">
                {llmData.recommendedActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-blue-800">{action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
