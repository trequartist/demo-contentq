import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Brain,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIEngineOptimizationProps {
  data: any;
}

export default function AIEngineOptimization({ data }: AIEngineOptimizationProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const { ai_engine_optimization } = data;

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-2xl font-light text-gray-900 mb-2">
          {ai_engine_optimization.section_header}
        </h1>
        <p className="text-gray-600">
          {ai_engine_optimization.section_subheader}
        </p>
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
              {ai_engine_optimization.executive_briefing}
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Scores - Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(ai_engine_optimization.coverage_scores).map(([model, score]: [string, any]) => (
          <Card key={model} className="bg-white border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{model}</h3>
                <p className="text-xs text-gray-600 mt-1">{score.description}</p>
              </div>
              <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                <Brain className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-light text-gray-900">{score.score}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gray-900"
                  initial={{ width: 0 }}
                  animate={{ width: `${score.score}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Concept Coverage Analysis - Executive Style */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Concept Coverage Analysis</h3>
          <div className="space-y-4">
            {ai_engine_optimization.concept_coverage.concepts.map((concept: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => setSelectedConcept(selectedConcept === concept.name ? null : concept.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-medium text-gray-800">{concept.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        concept.coverage_level === 'High' ? 'bg-gray-100 text-gray-700' :
                        concept.coverage_level === 'Medium' ? 'bg-gray-50 text-gray-600' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {concept.coverage_level} Coverage
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>Articles: {concept.articles_count}</span>
                      <span>•</span>
                      <span>Avg. Depth: {concept.avg_depth}/10</span>
                      <span>•</span>
                      <span>Last Updated: {concept.last_updated}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedConcept === concept.name ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {selectedConcept === concept.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-2">Gaps Identified:</p>
                            <ul className="space-y-1">
                              {concept.gaps.map((gap: string, gIdx: number) => (
                                <li key={gIdx} className="flex items-start gap-1">
                                  <span className="text-gray-400 text-xs">•</span>
                                  <span className="text-xs text-gray-600">{gap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-2">Recommended Actions:</p>
                            <ul className="space-y-1">
                              {concept.recommendations.map((rec: string, rIdx: number) => (
                                <li key={rIdx} className="flex items-start gap-1">
                                  <span className="text-gray-400 text-xs">•</span>
                                  <span className="text-xs text-gray-600">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Knowledge Graph Structure - Clean Visualization */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Knowledge Graph Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(ai_engine_optimization.knowledge_graph).map(([key, value]: [string, any]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-medium text-gray-800">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Coverage</span>
                    <span className="font-medium text-gray-800">{value.coverage}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Depth</span>
                    <span className="font-medium text-gray-800">{value.depth}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-medium text-gray-800">{value.connections}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Optimization Funnel - Executive Presentation */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Content Optimization Funnel</h3>
          <div className="space-y-3">
            {ai_engine_optimization.optimization_funnel.stages.map((stage: any, idx: number) => {
              const widthPercent = 100 - (idx * 20);
              return (
                <div key={idx} className="relative">
                  <div 
                    className="bg-gray-100 rounded-lg p-4 transition-all hover:bg-gray-50"
                    style={{ width: `${widthPercent}%`, marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{stage.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-light text-gray-900">{stage.score}%</p>
                        <p className="text-xs text-gray-500">{stage.impact}</p>
                      </div>
                    </div>
                  </div>
                  {idx < ai_engine_optimization.optimization_funnel.stages.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Model-Specific Optimizations - Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ai_engine_optimization.model_specific_optimizations.map((model: any, idx: number) => (
          <Card key={idx} className="bg-white border border-gray-200">
            <div className="p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedModel(expandedModel === model.model ? null : model.model)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <Brain className="w-4 h-4 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{model.model}</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedModel === model.model ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Optimization Score</span>
                  <span className="text-sm font-medium text-gray-800">{model.score}/100</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-900"
                    style={{ width: `${model.score}%` }}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedModel === model.model && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Improvements:</p>
                      <ul className="space-y-1">
                        {model.improvements.map((improvement: string, iIdx: number) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5" />
                            <span className="text-xs text-gray-600">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategic Recommendations */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Strategic Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Immediate Actions</h4>
              </div>
              <ul className="space-y-2">
                {ai_engine_optimization.recommendations.immediate.map((action: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Enhancement Opportunities</h4>
              </div>
              <ul className="space-y-2">
                {ai_engine_optimization.recommendations.enhancements.map((enhancement: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{enhancement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Risk Mitigation</h4>
              </div>
              <ul className="space-y-2">
                {ai_engine_optimization.recommendations.risks.map((risk: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}