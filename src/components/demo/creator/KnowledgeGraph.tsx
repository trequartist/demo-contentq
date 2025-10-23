"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Link, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  percentage: number;
  category: 'core' | 'peripheral' | 'bridge';
  connections: string[];
  description: string;
  strength: number;
}

interface KnowledgeGraphProps {
  data?: {
    nodes: GraphNode[];
    insights: string[];
    strategies: string[];
  };
}

export function KnowledgeGraph({ data }: KnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'core' | 'peripheral' | 'bridge'>('all');
  const svgRef = useRef<SVGSVGElement>(null);

  // Default data if none provided
  const defaultData = {
    nodes: [
      {
        id: 'integration',
        name: 'Integration',
        percentage: 76,
        category: 'core' as const,
        connections: ['make', 'zapier', 'n8n', 'no-code'],
        description: 'Core integration and automation platform',
        strength: 0.9
      },
      {
        id: 'zapier',
        name: 'Zapier',
        percentage: 87,
        category: 'core' as const,
        connections: ['integration', 'make', 'no-code'],
        description: 'Leading workflow automation platform',
        strength: 0.95
      },
      {
        id: 'make',
        name: 'Make',
        percentage: 53,
        category: 'core' as const,
        connections: ['integration', 'zapier', 'n8n'],
        description: 'Visual automation platform',
        strength: 0.7
      },
      {
        id: 'n8n',
        name: 'n8n',
        percentage: 38,
        category: 'core' as const,
        connections: ['integration', 'make'],
        description: 'Open-source workflow automation',
        strength: 0.6
      },
      {
        id: 'no-code',
        name: 'No-Code',
        percentage: 79,
        category: 'core' as const,
        connections: ['integration', 'zapier'],
        description: 'No-code automation solutions',
        strength: 0.85
      },
      {
        id: 'gumloop',
        name: 'Gumloop',
        percentage: 4,
        category: 'peripheral' as const,
        connections: ['integration'],
        description: 'Emerging automation platform',
        strength: 0.2
      }
    ],
    insights: [
      "You're peripheral to the main category cluster",
      "Strong opportunity to bridge core concepts",
      "Integration focus shows market alignment"
    ],
    strategies: [
      "Create bridge content linking you to core concepts",
      "Leverage integration partnerships",
      "Position as complementary to established players"
    ]
  };

  const graphData = data || defaultData;
  const filteredNodes = graphData.nodes.filter(node => 
    filter === 'all' || node.category === filter
  );

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
    const maxSize = 120;
    return minSize + (percentage / 100) * (maxSize - minSize);
  };

  const getConnectionStrength = (strength: number) => {
    return Math.max(1, strength * 8);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-full'} flex flex-col bg-gradient-to-br from-gray-50 to-gray-100`}>
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Automation Knowledge Graph</h1>
              <p className="text-sm text-gray-600">Interactive relationship mapping and strategic insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Nodes</option>
              <option value="core">Core Concepts</option>
              <option value="peripheral">Peripheral</option>
              <option value="bridge">Bridge</option>
            </select>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Graph Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 p-8">
            <div className="relative w-full h-full">
              {/* Graph Container */}
              <div className="relative w-full h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Nodes */}
                <div className="absolute inset-0 p-8">
                  <div className="relative w-full h-full">
                    {filteredNodes.map((node, index) => {
                      const size = getNodeSize(node.percentage);
                      const isSelected = selectedNode?.id === node.id;
                      const isHovered = hoveredNode === node.id;
                      
                      // Calculate position (simplified grid layout)
                      const cols = Math.ceil(Math.sqrt(filteredNodes.length));
                      const row = Math.floor(index / cols);
                      const col = index % cols;
                      const x = (col / (cols - 1)) * 80 + 10; // 10% to 90% of width
                      const y = (row / (Math.ceil(filteredNodes.length / cols) - 1)) * 80 + 10; // 10% to 90% of height

                      return (
                        <motion.div
                          key={node.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: isHovered ? 1.1 : 1,
                            opacity: 1,
                            x: `${x}%`,
                            y: `${y}%`
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30,
                            delay: index * 0.1
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setSelectedNode(node)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <div className={`relative w-${Math.round(size/8)} h-${Math.round(size/8)}`}>
                            {/* Connection Lines */}
                            {node.connections.map((connectionId, connIndex) => {
                              const connectedNode = filteredNodes.find(n => n.id === connectionId);
                              if (!connectedNode) return null;
                              
                              const connCol = Math.floor(filteredNodes.findIndex(n => n.id === connectionId) / cols);
                              const connRow = filteredNodes.findIndex(n => n.id === connectionId) % cols;
                              const connX = (connCol / (cols - 1)) * 80 + 10;
                              const connY = (connRow / (Math.ceil(filteredNodes.length / cols) - 1)) * 80 + 10;
                              
                              return (
                                <motion.line
                                  key={connectionId}
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.8, delay: index * 0.1 + connIndex * 0.1 }}
                                  x1={`${x}%`}
                                  y1={`${y}%`}
                                  x2={`${connX}%`}
                                  y2={`${connY}%`}
                                  stroke="currentColor"
                                  strokeWidth={getConnectionStrength(node.strength)}
                                  strokeOpacity={0.3}
                                  className="text-gray-400"
                                />
                              );
                            })}
                            
                            {/* Node */}
                            <motion.div
                              className={`w-full h-full rounded-full bg-gradient-to-br ${getNodeColor(node.category)} shadow-lg flex items-center justify-center text-white font-semibold text-sm relative overflow-hidden`}
                              style={{ width: size, height: size }}
                              animate={{
                                boxShadow: isSelected 
                                  ? '0 0 0 4px rgba(59, 130, 246, 0.5)' 
                                  : isHovered 
                                  ? '0 8px 25px rgba(0,0,0,0.15)' 
                                  : '0 4px 12px rgba(0,0,0,0.1)'
                              }}
                            >
                              {/* Node Content */}
                              <div className="text-center">
                                <div className="font-bold text-sm leading-tight">
                                  {node.name}
                                </div>
                                <div className="text-xs opacity-90">
                                  {node.percentage}%
                                </div>
                              </div>
                              
                              {/* Category Indicator */}
                              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Legend */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Node size = Mention frequency</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <span className="text-sm text-gray-600">Line thickness = Relationship strength</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Color = Category ownership</span>
              </div>
            </div>
          </div>

          {/* Node Details */}
          {selectedNode && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedNode.name}</div>
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-semibold">{selectedNode.connections.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Insights
            </h3>
            <div className="space-y-3">
              {graphData.insights.map((insight, index) => (
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
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Strategies
            </h3>
            <div className="space-y-3">
              {graphData.strategies.map((strategy, index) => (
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
  );
}
