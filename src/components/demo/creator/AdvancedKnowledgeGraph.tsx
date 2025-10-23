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
  Minimize2,
  Filter,
  Search
} from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  percentage: number;
  category: 'core' | 'peripheral' | 'bridge';
  connections: string[];
  description: string;
  strength: number;
  x: number;
  y: number;
}

interface KnowledgeGraphProps {
  data?: {
    nodes: GraphNode[];
    insights: string[];
    strategies: string[];
  };
}

export function AdvancedKnowledgeGraph({ data }: KnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'core' | 'peripheral' | 'bridge'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  // Default data with proper positioning
  const defaultData = {
    nodes: [
      {
        id: 'integration',
        name: 'Integration',
        percentage: 76,
        category: 'core' as const,
        connections: ['make', 'zapier', 'n8n', 'no-code'],
        description: 'Core integration and automation platform',
        strength: 0.9,
        x: 300,
        y: 200
      },
      {
        id: 'zapier',
        name: 'Zapier',
        percentage: 87,
        category: 'core' as const,
        connections: ['integration', 'make', 'no-code'],
        description: 'Leading workflow automation platform',
        strength: 0.95,
        x: 500,
        y: 150
      },
      {
        id: 'make',
        name: 'Make',
        percentage: 53,
        category: 'core' as const,
        connections: ['integration', 'zapier', 'n8n'],
        description: 'Visual automation platform',
        strength: 0.7,
        x: 200,
        y: 300
      },
      {
        id: 'n8n',
        name: 'n8n',
        percentage: 38,
        category: 'core' as const,
        connections: ['integration', 'make'],
        description: 'Open-source workflow automation',
        strength: 0.6,
        x: 100,
        y: 200
      },
      {
        id: 'no-code',
        name: 'No-Code',
        percentage: 79,
        category: 'core' as const,
        connections: ['integration', 'zapier'],
        description: 'No-code automation solutions',
        strength: 0.85,
        x: 400,
        y: 100
      },
      {
        id: 'gumloop',
        name: 'Gumloop',
        percentage: 4,
        category: 'peripheral' as const,
        connections: ['integration'],
        description: 'Emerging automation platform',
        strength: 0.2,
        x: 600,
        y: 350
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
  const filteredNodes = graphData.nodes.filter(node => {
    const matchesFilter = filter === 'all' || node.category === filter;
    const matchesSearch = searchTerm === '' || 
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getNodeColor = (category: string) => {
    switch (category) {
      case 'core': return '#3B82F6';
      case 'peripheral': return '#F59E0B';
      case 'bridge': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getNodeSize = (percentage: number) => {
    const minSize = 30;
    const maxSize = 80;
    return minSize + (percentage / 100) * (maxSize - minSize);
  };

  const getConnectionStrength = (strength: number) => {
    return Math.max(1, strength * 6);
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
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
              />
            </div>
            
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
            <div className="relative w-full h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* SVG Graph */}
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="absolute inset-0"
                viewBox="0 0 800 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Connection Lines */}
                {filteredNodes.map((node) => 
                  node.connections.map((connectionId) => {
                    const connectedNode = filteredNodes.find(n => n.id === connectionId);
                    if (!connectedNode) return null;
                    
                    return (
                      <motion.line
                        key={`${node.id}-${connectionId}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        x1={node.x}
                        y1={node.y}
                        x2={connectedNode.x}
                        y2={connectedNode.y}
                        stroke={getNodeColor(node.category)}
                        strokeWidth={getConnectionStrength(node.strength)}
                        strokeOpacity={hoveredNode === node.id || hoveredNode === connectionId ? 0.8 : 0.4}
                        className="transition-all duration-300"
                      />
                    );
                  })
                )}

                {/* Nodes */}
                {filteredNodes.map((node, index) => {
                  const size = getNodeSize(node.percentage);
                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoveredNode === node.id;
                  
                  return (
                    <motion.g
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        delay: index * 0.1
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Node Circle */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={size / 2}
                        fill={getNodeColor(node.category)}
                        stroke={isSelected ? '#3B82F6' : 'white'}
                        strokeWidth={isSelected ? 4 : 2}
                        className="drop-shadow-lg"
                        animate={{
                          filter: isHovered 
                            ? 'drop-shadow(0 8px 25px rgba(0,0,0,0.25))' 
                            : 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                        }}
                      />
                      
                      {/* Node Text */}
                      <text
                        x={node.x}
                        y={node.y - 5}
                        textAnchor="middle"
                        className="text-white font-bold text-sm pointer-events-none"
                        fill="white"
                      >
                        {node.name}
                      </text>
                      
                      <text
                        x={node.x}
                        y={node.y + 8}
                        textAnchor="middle"
                        className="text-white font-medium text-xs pointer-events-none"
                        fill="white"
                        opacity={0.9}
                      >
                        {node.percentage}%
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
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
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Node size = Mention frequency</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <span className="text-sm text-gray-600">Line thickness = Relationship strength</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Color = Category ownership</span>
              </div>
            </div>
          </div>

          {/* Node Details */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 border-b border-gray-200"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

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
