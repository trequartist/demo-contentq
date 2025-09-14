import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar } from '@/components/ui';
import { 
  Brain,
  Network,
  FileText,
  TrendingUp,
  AlertCircle,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AIEngineOptimizationProps {
  data: any;
}

export default function AIEngineOptimization({ data }: AIEngineOptimizationProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const { ai_engine_optimization } = data;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {ai_engine_optimization.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {ai_engine_optimization.section_subheader}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Data sources:</span>
          {ai_engine_optimization.data_sources.map((source: string, idx: number) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>•</span>}
              <span>{source}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Category Comprehension - Interactive Network Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            How LLMs Understand "Workflow Automation"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Concept Association Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(ai_engine_optimization.category_comprehension.concept_associations).map(
                ([level, concepts]: [string, any]) => (
                  <div key={level}>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 capitalize">
                      {level} Associations
                      {level === 'primary' && ' (80%+ mentions)'}
                      {level === 'secondary' && ' (40-79% mentions)'}
                      {level === 'tertiary' && ' (<40% mentions)'}
                    </h3>
                    <div className="space-y-2">
                      {concepts.map((concept: any, idx: number) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedConcept === concept.concept
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedConcept(concept.concept)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{concept.concept}</span>
                            <span className="text-sm text-gray-600">{concept.mention_rate}%</span>
                          </div>
                          {concept.status && (
                            <Badge 
                              className={
                                concept.status === 'critical gap' ? 'bg-red-100 text-red-700 mt-1' :
                                concept.status === 'emerging' ? 'bg-green-100 text-green-700 mt-1' :
                                'bg-yellow-100 text-yellow-700 mt-1'
                              }
                            >
                              {concept.status}
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Key Finding */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Key Finding</p>
                  <p className="text-sm text-amber-800">
                    {ai_engine_optimization.category_comprehension.key_finding}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Citation Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Citation Pattern Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Citation Probability Funnel */}
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">High Citation Probability (&gt;{ai_engine_optimization.citation_patterns.high_probability.threshold}%)</h4>
                  <Badge className="bg-green-100 text-green-700">
                    {ai_engine_optimization.citation_patterns.your_content_analysis.high_probability}% of your content
                  </Badge>
                </div>
                <ul className="space-y-1 text-sm text-green-800">
                  {ai_engine_optimization.citation_patterns.high_probability.factors.map((factor: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-yellow-900">
                    Medium Citation Probability ({ai_engine_optimization.citation_patterns.medium_probability.threshold_min}-{ai_engine_optimization.citation_patterns.medium_probability.threshold_max}%)
                  </h4>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    {ai_engine_optimization.citation_patterns.your_content_analysis.medium_probability}% of your content
                  </Badge>
                </div>
                <ul className="space-y-1 text-sm text-yellow-800">
                  {ai_engine_optimization.citation_patterns.medium_probability.factors.map((factor: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-red-900">Low Citation Probability (&lt;{ai_engine_optimization.citation_patterns.low_probability.threshold}%)</h4>
                  <Badge className="bg-red-100 text-red-700">
                    {ai_engine_optimization.citation_patterns.your_content_analysis.low_probability}% of your content
                  </Badge>
                </div>
                <ul className="space-y-1 text-sm text-red-800">
                  {ai_engine_optimization.citation_patterns.low_probability.factors.map((factor: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LLM Knowledge Graph Position */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            LLM Knowledge Graph Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Positions */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Zapier's Position</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Connections</span>
                      <span className="text-lg font-medium">{ai_engine_optimization.knowledge_graph_position.zapier_position.connections.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Query Relevance</span>
                      <span className="text-lg font-medium">{ai_engine_optimization.knowledge_graph_position.zapier_position.query_relevance}%</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Linked to:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ai_engine_optimization.knowledge_graph_position.zapier_position.linked_concepts.map((concept: string, idx: number) => (
                          <Badge key={idx} className="text-xs bg-gray-200 text-gray-700">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Gumloop's Position</h4>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Connections</span>
                      <span className="text-lg font-medium text-red-700">{ai_engine_optimization.knowledge_graph_position.gumloop_position.connections}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Query Relevance</span>
                      <span className="text-lg font-medium text-red-700">{ai_engine_optimization.knowledge_graph_position.gumloop_position.query_relevance}%</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-red-700">{ai_engine_optimization.knowledge_graph_position.gumloop_position.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Path to Centrality */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Path to Centrality Analysis</h4>
              <div className="space-y-3">
                {ai_engine_optimization.knowledge_graph_position.path_to_centrality.map((path: any, idx: number) => (
                  <div key={idx} className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-blue-900">{path.path}</h5>
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-blue-700">Example: {path.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Engineering Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Prompt Engineering Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              {ai_engine_optimization.prompt_insights.testing_methodology}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Prompts Where You Appear</h4>
                <div className="space-y-2">
                  {ai_engine_optimization.prompt_insights.where_you_appear.map((prompt: any, idx: number) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{prompt.prompt}</span>
                        <Badge className="bg-gray-200 text-gray-700">
                          {prompt.mentions} mention{prompt.mentions !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Prompts Where You Should Appear</h4>
                <div className="space-y-2">
                  {ai_engine_optimization.prompt_insights.where_you_should_appear.map((prompt: any, idx: number) => (
                    <div key={idx} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{prompt.prompt}</span>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-100 text-red-700">
                            {prompt.mentions} mentions
                          </Badge>
                          {prompt.competition && (
                            <Badge className="bg-green-100 text-green-700">
                              {prompt.competition} competition
                            </Badge>
                          )}
                          {prompt.opportunity && (
                            <Badge className="bg-blue-100 text-blue-700">
                              {prompt.opportunity} opportunity
                            </Badge>
                          )}
                          {prompt.category && (
                            <Badge className="bg-purple-100 text-purple-700">
                              {prompt.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}