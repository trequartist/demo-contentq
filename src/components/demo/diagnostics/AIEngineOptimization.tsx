import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Brain,
  Network,
  FileText,
  TrendingUp,
  AlertCircle,
  Sparkles,
  GitBranch,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Quote,
  Target,
  Info,
  ExternalLink,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIEngineOptimizationProps {
  data: any;
}

export default function AIEngineOptimization({ data }: AIEngineOptimizationProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [showDeepDive, setShowDeepDive] = useState<string | null>(null);
  const { ai_engine_optimization } = data;

  const conceptColors = {
    primary: 'purple',
    secondary: 'blue',
    tertiary: 'orange'
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {ai_engine_optimization.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {ai_engine_optimization.section_subheader}
        </p>
        
        {/* Data Sources */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <span className="font-medium">Data sources:</span>
          <div className="flex flex-wrap items-center gap-2">
            {ai_engine_optimization.data_sources.map((source: string, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-300">•</span>}
                <span className="bg-gray-100 px-3 py-1 rounded-full">{source}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Critical AI Visibility Gap</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {ai_engine_optimization.category_comprehension.key_finding}
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-gray-600">Gumloop mention rate: <span className="font-semibold text-red-600">4%</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-600">Zapier mention rate: <span className="font-semibold text-green-600">87%</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Comprehension Analysis */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-gray-900 flex items-center gap-3">
            <Network className="w-6 h-6 text-gray-400" />
            How LLMs Understand "Workflow Automation"
          </h2>
          <button
            onClick={() => setShowDeepDive(showDeepDive === 'category' ? null : 'category')}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Info className="w-4 h-4" />
            Testing Methodology
          </button>
        </div>

        {/* Deep Dive Panel */}
        <AnimatePresence>
          {showDeepDive === 'category' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="bg-purple-50 border-purple-200">
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Testing Methodology</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {ai_engine_optimization.prompt_insights.testing_methodology}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                      <span>127 category-relevant queries tested across each platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                      <span>Queries designed to mimic real user search patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                      <span>Results analyzed for brand mentions, positioning, and context</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Concept Association Network */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(ai_engine_optimization.category_comprehension.concept_associations).map(
            ([level, concepts]: [string, any]) => {
              const color = conceptColors[level as keyof typeof conceptColors];
              
              return (
                <Card key={level} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-1 bg-gradient-to-r from-${color}-500 to-${color}-600`} />
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium capitalize mb-1">
                        {level} Associations
                      </h3>
                      <p className="text-sm text-gray-600">
                        {level === 'primary' && 'Mentioned in 80%+ of responses'}
                        {level === 'secondary' && 'Mentioned in 40-79% of responses'}
                        {level === 'tertiary' && 'Mentioned in <40% of responses'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {concepts.map((concept: any, idx: number) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            selectedConcept === concept.concept
                              ? `bg-${color}-100 border-2 border-${color}-500`
                              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedConcept(selectedConcept === concept.concept ? null : concept.concept)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{concept.concept}</span>
                            <span className={`text-lg font-semibold text-${color}-600`}>
                              {concept.mention_rate}%
                            </span>
                          </div>
                          {concept.status && (
                            <Badge 
                              className={`text-xs ${
                                concept.status === 'critical gap' ? 'bg-red-100 text-red-700' :
                                concept.status === 'emerging' ? 'bg-green-100 text-green-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {concept.status}
                            </Badge>
                          )}
                          
                          {/* Expanded Details */}
                          <AnimatePresence>
                            {selectedConcept === concept.concept && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t"
                              >
                                {concept.concept === 'Gumloop' && (
                                  <p className="text-sm text-gray-600">
                                    Only mentioned in highly specific technical queries. Missing from general automation searches 
                                    where 96% of potential customers begin their journey.
                                  </p>
                                )}
                                {concept.concept === 'Zapier' && (
                                  <p className="text-sm text-gray-600">
                                    Dominates as the default reference point. LLMs use Zapier to explain the entire category, 
                                    making it nearly impossible for alternatives to gain visibility.
                                  </p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      </section>

      {/* Citation Pattern Analysis */}
      <section className="mt-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-gray-400" />
          Citation Pattern Analysis
        </h2>

        {/* Citation Funnel Visualization */}
        <Card className="mb-6">
          <div className="p-8">
            <h3 className="font-medium text-gray-900 mb-6">What Gets Cited in AI Responses</h3>
            
            {/* Funnel */}
            <div className="space-y-4">
              {/* High Probability */}
              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-medium">High Citation Probability</h4>
                      <p className="text-green-100">
                        &gt;{ai_engine_optimization.citation_patterns.high_probability.threshold}% chance of being cited
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">
                        {ai_engine_optimization.citation_patterns.your_content_analysis.high_probability}%
                      </div>
                      <div className="text-sm text-green-100">of your content</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ai_engine_optimization.citation_patterns.high_probability.factors.map((factor: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-green-200" />
                        <span className="text-green-50">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Medium Probability */}
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white" 
                     style={{ width: '85%', marginLeft: '7.5%' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-medium">Medium Citation Probability</h4>
                      <p className="text-yellow-100">
                        {ai_engine_optimization.citation_patterns.medium_probability.threshold_min}-{ai_engine_optimization.citation_patterns.medium_probability.threshold_max}% chance
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">
                        {ai_engine_optimization.citation_patterns.your_content_analysis.medium_probability}%
                      </div>
                      <div className="text-sm text-yellow-100">of your content</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {ai_engine_optimization.citation_patterns.medium_probability.factors.map((factor: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-200">•</span>
                        <span className="text-yellow-50">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Low Probability */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white" 
                     style={{ width: '70%', marginLeft: '15%' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-medium">Low Citation Probability</h4>
                      <p className="text-red-100">
                        &lt;{ai_engine_optimization.citation_patterns.low_probability.threshold}% chance
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">
                        {ai_engine_optimization.citation_patterns.your_content_analysis.low_probability}%
                      </div>
                      <div className="text-sm text-red-100">of your content</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {ai_engine_optimization.citation_patterns.low_probability.factors.map((factor: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-red-200">•</span>
                        <span className="text-red-50">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Strategic Insight</p>
                  <p className="text-sm text-amber-800">
                    With only {ai_engine_optimization.citation_patterns.your_content_analysis.high_probability}% of your content 
                    optimized for AI citations, you're missing significant visibility opportunities. Focus on creating comprehensive, 
                    well-structured guides with clear frameworks and recent data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* LLM Knowledge Graph Position */}
      <section className="mt-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-gray-400" />
          LLM Knowledge Graph Position
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Positions Comparison */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6">Entity Recognition Comparison</h3>
              
              {/* Zapier Position */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Zapier's Position</h4>
                  <Badge className="bg-green-100 text-green-700">Central Node</Badge>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Knowledge Connections</p>
                      <p className="text-2xl font-light text-gray-900">
                        {ai_engine_optimization.knowledge_graph_position.zapier_position.connections.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Query Relevance</p>
                      <p className="text-2xl font-light text-gray-900">
                        {ai_engine_optimization.knowledge_graph_position.zapier_position.query_relevance}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Strongly linked to:</p>
                    <div className="flex flex-wrap gap-2">
                      {ai_engine_optimization.knowledge_graph_position.zapier_position.linked_concepts.map((concept: string, idx: number) => (
                        <Badge key={idx} className="bg-white text-gray-700 text-xs">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gumloop Position */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Gumloop's Position</h4>
                  <Badge className="bg-red-100 text-red-700">Peripheral Node</Badge>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Knowledge Connections</p>
                      <p className="text-2xl font-light text-red-700">
                        {ai_engine_optimization.knowledge_graph_position.gumloop_position.connections}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Query Relevance</p>
                      <p className="text-2xl font-light text-red-700">
                        {ai_engine_optimization.knowledge_graph_position.gumloop_position.query_relevance}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-red-700">
                    {ai_engine_optimization.knowledge_graph_position.gumloop_position.status}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Path to Centrality */}
          <Card>
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6">Path to Centrality Analysis</h3>
              <p className="text-sm text-gray-600 mb-4">
                Three viable paths to improve your knowledge graph position:
              </p>
              
              <div className="space-y-3">
                {ai_engine_optimization.knowledge_graph_position.path_to_centrality.map((path: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedPath(expandedPath === path.path ? null : path.path)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{path.path}</h4>
                            <p className="text-sm text-gray-600">Example: {path.example}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedPath === path.path ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedPath === path.path && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 border-t bg-gray-50"
                        >
                          <div className="pt-4 space-y-3">
                            {path.path === 'Sub-category ownership' && (
                              <>
                                <p className="text-sm text-gray-700">
                                  Create and dominate a new category like "intelligent automation" where Zapier's 
                                  limitations become apparent. Focus on AI-enhanced workflows that traditional tools can't handle.
                                </p>
                                <div className="space-y-2">
                                  <h5 className="text-sm font-medium text-gray-900">Action Items:</h5>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Create definitive "Intelligent Automation" guide</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Build AI workflow templates library</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Publish thought leadership on AI-first automation</span>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {path.path === 'Use-case dominance' && (
                              <>
                                <p className="text-sm text-gray-700">
                                  Own specific verticals where your strengths shine. RevOps automation is already 
                                  showing promise - double down and expand to related areas.
                                </p>
                                <div className="space-y-2">
                                  <h5 className="text-sm font-medium text-gray-900">Target Verticals:</h5>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>RevOps teams (34K searches/month)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>E-commerce operations (67K searches/month)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Healthcare workflows (12K searches/month)</span>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {path.path === 'Problem-space authority' && (
                              <>
                                <p className="text-sm text-gray-700">
                                  Become the go-to resource for workflow problems. Users searching for solutions to 
                                  broken automations have 3.2x higher purchase intent.
                                </p>
                                <div className="space-y-2">
                                  <h5 className="text-sm font-medium text-gray-900">Content Strategy:</h5>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Workflow debugging guides</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Error handling patterns</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                                      <span>Performance optimization content</span>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Prompt Engineering Insights */}
      <section className="mt-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Brain className="w-6 h-6 text-gray-400" />
          Prompt Engineering Insights
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Where You Appear */}
          <Card>
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Prompts Where You Appear</h3>
              <div className="space-y-3">
                {ai_engine_optimization.prompt_insights.where_you_appear.map((prompt: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{prompt.prompt}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-200 text-gray-700 text-xs">
                            {prompt.mentions} mention{prompt.mentions !== 1 ? 's' : ''}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Typically appears 3rd-4th in results
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {ai_engine_optimization.prompt_insights.where_you_appear.length === 0 && (
                  <p className="text-sm text-gray-500 italic">Limited visibility in current prompts</p>
                )}
              </div>
            </div>
          </Card>

          {/* Where You Should Appear */}
          <Card className="border-2 border-purple-200">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">High-Value Prompts to Target</h3>
              <div className="space-y-3">
                {ai_engine_optimization.prompt_insights.where_you_should_appear.map((prompt: any, idx: number) => (
                  <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-2">{prompt.prompt}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            {prompt.mentions} current mentions
                          </Badge>
                          {prompt.competition && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              {prompt.competition} competition
                            </Badge>
                          )}
                          {prompt.opportunity && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {prompt.opportunity}
                            </Badge>
                          )}
                          {prompt.category && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              {prompt.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Bottom Action Section */}
      <Card className="mt-12 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3">Ready to Improve Your AI Visibility?</h3>
          <p className="text-purple-100 mb-6">
            Increasing your AI platform visibility from 4% to 40% could drive 3-5x more qualified traffic 
            as AI-driven discovery becomes the primary way users find solutions.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              View AI Optimization Guide
            </button>
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
              Download Citation Checklist
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}