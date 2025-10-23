"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Lightbulb,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  percentage: number;
  category: 'core' | 'peripheral' | 'bridge';
  description: string;
}

interface CompactKnowledgeGraphProps {
  onExpand?: () => void;
}

export function CompactKnowledgeGraph({ onExpand }: CompactKnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const nodes: GraphNode[] = [
    {
      id: 'integration',
      name: 'Integration',
      percentage: 76,
      category: 'core',
      description: 'Core integration and automation platform'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      percentage: 87,
      category: 'core',
      description: 'Leading workflow automation platform'
    },
    {
      id: 'make',
      name: 'Make',
      percentage: 53,
      category: 'core',
      description: 'Visual automation platform'
    },
    {
      id: 'n8n',
      name: 'n8n',
      percentage: 38,
      category: 'core',
      description: 'Open-source workflow automation'
    },
    {
      id: 'no-code',
      name: 'No-Code',
      percentage: 79,
      category: 'core',
      description: 'No-code automation solutions'
    },
    {
      id: 'gumloop',
      name: 'Gumloop',
      percentage: 4,
      category: 'peripheral',
      description: 'Emerging automation platform'
    }
  ];

  const insights = [
    "You're peripheral to the main category cluster",
    "Strong opportunity to bridge core concepts"
  ];

  const strategies = [
    "Create bridge content linking you to core concepts",
    "Leverage integration partnerships"
  ];

  const getNodeColor = (category: string) => {
    switch (category) {
      case 'core': return 'from-blue-500 to-blue-600';
      case 'peripheral': return 'from-orange-500 to-orange-600';
      case 'bridge': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getNodeSize = (percentage: number) => {
    const minSize = 40;
    const maxSize = 80;
    return minSize + (percentage / 100) * (maxSize - minSize);
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Workflow Automation Knowledge Graph</h2>
              <p className="text-sm text-gray-600">Interactive relationship mapping</p>
            </div>
          </div>
          
          {onExpand && (
            <button
              onClick={onExpand}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Maximize2 className="w-4 h-4" />
              Expand View
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Graph Visualization */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="relative h-full">
              {/* Compact Node Grid */}
              <div className="grid grid-cols-2 gap-4 h-full">
                {nodes.map((node, index) => {
                  const size = getNodeSize(node.percentage);
                  const isSelected = selectedNode?.id === node.id;
                  
                  return (
                    <motion.button
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedNode(node)}
                      className={`relative p-4 rounded-xl bg-gradient-to-br ${getNodeColor(node.category)} text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isSelected ? 'ring-4 ring-blue-300' : ''
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold mb-1">{node.name}</div>
                        <div className="text-sm opacity-90">{node.percentage}%</div>
                      </div>
                      
                      {/* Category indicator */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Node Details */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xl font-bold text-gray-900">{selectedNode.name}</div>
                    <div className="text-sm text-gray-600">{selectedNode.description}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mention Frequency</span>
                      <span className="font-semibold">{selectedNode.percentage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category</span>
                      <span className="font-semibold capitalize">{selectedNode.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Insights
              </h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <p className="text-sm text-yellow-800">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strategies */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Strategic Recommendations
              </h3>
              <div className="space-y-3">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-sm text-green-800">{strategy}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
