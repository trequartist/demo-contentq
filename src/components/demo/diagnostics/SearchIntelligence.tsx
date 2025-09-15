import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Search,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Target,
  Info,
  CheckCircle,
  XCircle,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchIntelligenceProps {
  data: any;
}

export default function SearchIntelligence({ data }: SearchIntelligenceProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredQuery, setHoveredQuery] = useState<string | null>(null);
  const { search_intelligence = {} } = data || {};

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-2xl font-light text-gray-900 mb-2">
          {search_intelligence.section_header || 'Search Intelligence Analysis'}
        </h1>
        <p className="text-gray-600 mb-6">
          {search_intelligence.section_subheader || 'Understanding your search visibility and opportunities'}
        </p>
        
        {/* Data Sources - Minimal */}
        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <span className="font-medium">Data sources:</span>
          {(search_intelligence?.data_sources || []).map((source: string, idx: number) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-gray-300">|</span>}
              <span>{source}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Executive Briefing */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-1 h-12 bg-gray-900 rounded-full flex-shrink-0" />
          <div>
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Key Finding
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {search_intelligence.executive_briefing || 'No executive briefing available'}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Metrics - Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(search_intelligence?.overview_metrics || {}).map(([key, metric]: [string, any]) => (
          <Card key={key} className="bg-white border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                <Search className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs text-gray-500">{metric.trend}</span>
            </div>
            <div className="mb-2">
              <p className="text-2xl font-light text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-600 mt-1">{metric.label}</p>
            </div>
            {metric.context && (
              <p className="text-xs text-gray-500">{metric.context}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Query Analysis - Executive Style */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">High-Value Query Opportunities</h3>
          <div className="space-y-3">
            {(search_intelligence?.high_value_queries || []).map((query: any, idx: number) => (
              <motion.div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => toggleSection(`query-${idx}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-sm font-medium text-gray-800">{query.query}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {query.monthly_volume} searches/mo
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Difficulty: {query.difficulty}/100</span>
                      <span>•</span>
                      <span>Intent: {query.intent}</span>
                      <span>•</span>
                      <span>Current Position: {query.current_position || 'Not ranking'}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === `query-${idx}` ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedSection === `query-${idx}` && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-3">{query.opportunity}</p>
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Recommended Action:</p>
                          <p className="text-xs text-gray-600">{query.recommendation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Technical Health - Clean Presentation */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Technical Health Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(search_intelligence?.technical_health || {}).map(([key, item]: [string, any]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`text-sm font-medium ${
                    item.score >= 80 ? 'text-gray-900' : 
                    item.score >= 60 ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {item.score}/100
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Competitive Comparison - Executive Table */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Competitive Landscape</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Competitor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Authority Score</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Ranking Keywords</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Est. Traffic</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Key Strength</th>
                </tr>
              </thead>
              <tbody>
                {(search_intelligence?.competitive_comparison || []).map((comp: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-800">{comp.competitor}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{comp.authority_score}/100</span>
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-600"
                            style={{ width: `${comp.authority_score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-700">{comp.ranking_keywords.toLocaleString()}</td>
                    <td className="py-3 text-sm text-gray-700">{comp.estimated_traffic}</td>
                    <td className="py-3 text-sm text-gray-600">{comp.strength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Strategic Recommendations - Executive Format */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Quick Wins</h3>
            </div>
            <ul className="space-y-2">
              {(search_intelligence?.recommendations?.quick_wins || []).map((win: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-700">{win}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Target className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Strategic Priorities</h3>
            </div>
            <ul className="space-y-2">
              {(search_intelligence?.recommendations?.strategic_priorities || []).map((priority: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-700">{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Critical Fixes</h3>
            </div>
            <ul className="space-y-2">
              {(search_intelligence?.recommendations?.critical_fixes || []).map((fix: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-700">{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}