import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { 
  Brain,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Database,
  Activity,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIDiscoverabilityProps {
  data: any;
}

export default function AIDiscoverability({ data }: AIDiscoverabilityProps) {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [selectedQueryCategory, setSelectedQueryCategory] = useState<string>('direct-tool');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { ai_discoverability = {} } = data || {};

  const platformData = {
    'ChatGPT': {
      icon: MessageSquare,
      mentionRate: 0,
      totalQueries: 127,
      status: 'Critical',
      sampleQuery: 'Best workflow automation for startups',
      response: "For startups, I'd recommend:\n1. Zapier - Most versatile, 5000+ integrations\n2. Make - Visual workflow builder\n3. n8n - Self-hosted option for control...",
      reasons: [
        'Training data cutoff predates your growth',
        'Insufficient authoritative mentions',
        'Lack of integration directory pages'
      ]
    },
    'Claude': {
      icon: Brain,
      mentionRate: 2,
      totalQueries: 127,
      status: 'Low',
      sampleQuery: 'Workflow automation comparison',
      response: "Here's a comparison of popular workflow automation tools:\n• Zapier: Best for ease of use\n• Make: Great visual interface\n• n8n: Open source option...",
      reasons: [
        'Limited market presence',
        'Few technical resources published',
        'Minimal community discussions'
      ]
    },
    'Perplexity': {
      icon: Globe,
      mentionRate: 1,
      totalQueries: 50,
      status: 'Critical',
      sampleQuery: 'Modern automation platforms',
      response: "The leading automation platforms include Zapier, Make.com, and Integromat...",
      reasons: [
        'Real-time search misses your content',
        'Competitor content dominates SERPs',
        'No featured snippets captured'
      ]
    },
    'Gemini': {
      icon: Sparkles,
      mentionRate: 0,
      totalQueries: 50,
      status: 'Critical',
      sampleQuery: 'Enterprise workflow tools',
      response: "For enterprise workflow automation, consider Microsoft Power Automate, Zapier Enterprise, or MuleSoft...",
      reasons: [
        'No enterprise-focused content',
        'Missing from comparison articles',
        'Low domain authority signals'
      ]
    }
  };

  const queryCategories = {
    'direct-tool': {
      title: 'Direct Tool Queries',
      queries: [
        { query: 'workflow automation tools', zapier: 100, make: 70, n8n: 27, gumloop: 0 },
        { query: 'best automation platform', zapier: 95, make: 65, n8n: 22, gumloop: 0 },
        { query: 'no-code automation', zapier: 88, make: 72, n8n: 15, gumloop: 0 }
      ]
    },
    'problem-solution': {
      title: 'Problem-Solution Queries',
      queries: [
        { query: 'fix broken automations', zapier: 0, make: 0, n8n: 0, gumloop: 0 },
        { query: 'automation error handling', zapier: 12, make: 5, n8n: 8, gumloop: 0 },
        { query: 'workflow debugging tools', zapier: 8, make: 0, n8n: 15, gumloop: 0 }
      ]
    },
    'comparison': {
      title: 'Comparison Queries',
      queries: [
        { query: 'zapier vs make vs n8n', zapier: 100, make: 92, n8n: 85, gumloop: 0 },
        { query: 'automation tool comparison', zapier: 82, make: 74, n8n: 41, gumloop: 0 },
        { query: 'zapier alternatives', zapier: 100, make: 67, n8n: 52, gumloop: 0 }
      ]
    },
    'use-case': {
      title: 'Use-Case Queries',
      queries: [
        { query: 'automation for RevOps teams', zapier: 42, make: 18, n8n: 5, gumloop: 0 },
        { query: 'sales automation tools', zapier: 67, make: 23, n8n: 12, gumloop: 0 },
        { query: 'marketing workflow automation', zapier: 78, make: 45, n8n: 8, gumloop: 0 }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-200 rounded-xl p-10"
      >
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-extralight text-gray-900 mb-2 tracking-tight">
            AI DISCOVERABILITY & LLM INTELLIGENCE
          </h1>
          <p className="text-lg text-gray-600 font-light">
            How artificial intelligence understands your category
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Testing: 127 queries across ChatGPT, Claude, Perplexity, Gemini</span>
          <span className="text-gray-300">•</span>
          <span>Analysis period: January 20-27, 2025</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700 font-medium">Confidence: High for current state, Medium for projections</span>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-8"
      >
        <h2 className="text-lg font-light text-gray-900 mb-4">Current Reality: You're nearly invisible to AI systems.</h2>
        <div className="border-b border-gray-200 pb-6 mb-6">
          <p className="text-gray-600 leading-relaxed">
            When potential customers ask AI about workflow automation, they hear about Zapier 76% of the time, 
            Make 31% of the time, and Gumloop just 4% of the time. This isn't just about brand awareness—it's 
            about being part of the consideration set when 73% of B2B buyers now use AI in their research process.
          </p>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-1 h-16 bg-gray-900 rounded-full flex-shrink-0" />
          <div>
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              The good news: AI citations are still emerging, and first-mover advantage is available in several sub-categories.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Platform-by-Platform Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(platformData).map(([platform, data], idx) => {
          const Icon = data.icon;
          const isExpanded = expandedPlatform === platform;
          
          return (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedPlatform(isExpanded ? null : platform)}
                  className="w-full p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-medium text-gray-900">{platform}</h3>
                        <p className="text-sm text-gray-500">GPT-4 Model</p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      data.status === 'Critical' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {data.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-extralight text-gray-900">{data.mentionRate}</span>
                      <span className="text-lg font-extralight text-gray-500">/{data.totalQueries}</span>
                      <span className="text-sm text-gray-500">queries</span>
                    </div>
                    <p className="text-sm text-gray-600">Mention Rate: {((data.mentionRate / data.totalQueries) * 100).toFixed(0)}%</p>
                  </div>
                  
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="h-full bg-gray-700"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.mentionRate / data.totalQueries) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">View detailed analysis</p>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Sample Query:</h4>
                          <p className="text-sm text-gray-600 italic">"{data.sampleQuery}"</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">AI Response:</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700 whitespace-pre-line">{data.response}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Why You're Missing:</h4>
                          <ul className="space-y-2">
                            {data.reasons.map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span className="text-sm text-gray-700">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          View all 127 tested queries
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Query Category Performance */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">Query Category Performance</h3>
          
          {/* Category Selector */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto">
            {Object.entries(queryCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedQueryCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedQueryCategory === key 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          {/* Query Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Query</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Zapier</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Make</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">n8n</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Gumloop</th>
                </tr>
              </thead>
              <tbody>
                {queryCategories[selectedQueryCategory as keyof typeof queryCategories].queries.map((query, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-4 text-sm text-gray-700">{query.query}</td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{query.zapier}%</span>
                        {query.zapier > 0 && <CheckCircle className="w-3 h-3 text-gray-600" />}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{query.make}%</span>
                        {query.make > 0 && <CheckCircle className="w-3 h-3 text-gray-600" />}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{query.n8n}%</span>
                        {query.n8n > 0 && <CheckCircle className="w-3 h-3 text-gray-600" />}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{query.gumloop}%</span>
                        {query.gumloop === 0 && <XCircle className="w-3 h-3 text-gray-400" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Key Insight:</span> {
                selectedQueryCategory === 'problem-solution' 
                  ? 'No specific tools mentioned in problem-focused queries (opportunity!)'
                  : selectedQueryCategory === 'direct-tool'
                  ? 'Competitors dominate direct tool searches'
                  : selectedQueryCategory === 'comparison'
                  ? 'Never suggested as an alternative to competitors'
                  : 'Weak presence in specific use-case queries'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Knowledge Graph Visualization */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">The Workflow Automation Knowledge Graph</h3>
          
          <div className="relative h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            {/* Simplified Knowledge Graph */}
            <div className="relative">
              {/* Central Node */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setHoveredNode('automation')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="w-32 h-32 bg-gray-900 text-white rounded-full flex items-center justify-center cursor-pointer">
                  <div className="text-center">
                    <p className="text-sm font-medium">AUTOMATION</p>
                    <p className="text-xs">100% central</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Connected Nodes */}
              {[
                { name: 'Zapier', position: 'top-0 left-0', connection: '87%', size: 'w-24 h-24' },
                { name: 'No-Code', position: 'top-0 right-0', connection: '79%', size: 'w-20 h-20' },
                { name: 'Integration', position: 'bottom-0 right-0', connection: '76%', size: 'w-20 h-20' },
                { name: 'Make', position: 'bottom-0 left-0', connection: '53%', size: 'w-20 h-20' },
                { name: 'n8n', position: 'top-1/2 -left-32', connection: '38%', size: 'w-16 h-16' },
                { name: 'Gumloop', position: 'top-1/2 -right-32', connection: '4%', size: 'w-12 h-12', highlight: true }
              ].map((node, idx) => (
                <motion.div
                  key={node.name}
                  className={`absolute ${node.position} ${node.size} ${
                    node.highlight ? 'bg-gray-300' : 'bg-gray-700'
                  } text-white rounded-full flex items-center justify-center cursor-pointer`}
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => setHoveredNode(node.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="text-center">
                    <p className="text-xs font-medium">{node.name}</p>
                    <p className="text-xs">{node.connection}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Add connection lines here */}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 text-xs text-gray-600">
              <p>Node size = Mention frequency</p>
              <p>Line thickness = Relationship strength</p>
              <p>Color = Category ownership</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Insight:</span> You're peripheral to the main category cluster.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Strategy:</span> Create bridge content linking you to core concepts.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Citation Pattern Intelligence */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <h3 className="text-lg font-light text-gray-900 mb-6">What Makes Content Citable by AI</h3>
          
          <p className="text-gray-600 mb-6">
            We analyzed 500+ pieces of content that AI systems cite. Here's the formula for AI visibility:
          </p>
          
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">High Citation Probability (&gt;70% chance)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '2,000+ word comprehensive guides',
                'Clear numbered lists/frameworks',
                'Recent publication (<6 months)',
                'Author credentials visible',
                'Multiple examples/case studies',
                'Structured data markup',
                'FAQ sections with direct answers'
              ].map((criterion, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{criterion}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Your Content Audit:</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-light text-gray-900 mb-1">4</p>
                <p className="text-xs text-gray-600">pieces (8%) meet high citation criteria</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-light text-gray-900 mb-1">16</p>
                <p className="text-xs text-gray-600">pieces (34%) meet medium citation criteria</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-light text-gray-900 mb-1">27</p>
                <p className="text-xs text-gray-600">pieces (58%) unlikely to be cited</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg">
              <p className="text-sm mb-1">
                <span className="font-medium">Quick Win:</span> Add structured FAQs to your top 10 pages.
              </p>
              <p className="text-sm text-gray-300">
                Expected Impact: +25% citation probability in 30 days.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* High-Opportunity Prompts */}
      <div className="space-y-6">
        <h3 className="text-lg font-light text-gray-900">Where You Should Appear</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              prompt: 'How to debug workflow automation failures',
              current: 'Generic advice, no tools mentioned',
              opportunity: 'Create definitive debugging guide',
              searches: '3,400',
              competition: 'None'
            },
            {
              prompt: 'Workflow automation for RevOps teams',
              current: 'HubSpot/Salesforce dominated',
              opportunity: 'RevOps-specific positioning',
              searches: '2,100',
              competition: 'Low'
            },
            {
              prompt: 'Self-healing automation tools',
              current: 'Concept not well-defined',
              opportunity: 'Category creation',
              searches: 'Growing 340% YoY',
              competition: 'None'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full">
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">"{item.prompt}"</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Current:</p>
                      <p className="text-sm text-gray-700">{item.current}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Opportunity:</p>
                      <p className="text-sm text-gray-700">{item.opportunity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>Searches: {item.searches}</span>
                    <span>Competition: {item.competition}</span>
                  </div>
                  
                  <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                    Generate Content Brief
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Immediate Actions</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Add FAQ schema to all pages',
                'Create 5 problem-solving guides',
                'Build comparison pages',
                'Publish recent case studies'
              ].map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">Content Strategy</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Definitive debugging guide',
                'RevOps automation playbook',
                'Error handling database',
                'Integration directory'
              ].map((strategy, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium text-gray-900">AI Optimization</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Structured data markup',
                'Clear numbered frameworks',
                'Author bylines & dates',
                'Comprehensive FAQs'
              ].map((optimization, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{optimization}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}