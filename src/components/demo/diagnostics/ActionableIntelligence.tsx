import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Target,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  ChevronRight,
  Zap,
  Sparkles,
  BarChart3,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Activity,
  AlertCircle,
  Gauge,
  Info,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionableIntelligenceProps {
  data: any;
}

export default function ActionableIntelligence({ data }: ActionableIntelligenceProps) {
  const [selectedPath, setSelectedPath] = useState<string>('depth_builder');
  const [expandedKPI, setExpandedKPI] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { actionable_intelligence } = data;

  const getPathIcon = (pathId: string) => {
    const icons: { [key: string]: JSX.Element } = {
      depth_builder: <Target className="w-6 h-6" />,
      problem_solver: <Zap className="w-6 h-6" />,
      category_creator: <Award className="w-6 h-6" />
    };
    return icons[pathId] || <Target className="w-6 h-6" />;
  };

  const getPathColor = (pathId: string) => {
    const colors: { [key: string]: string } = {
      depth_builder: 'blue',
      problem_solver: 'green',
      category_creator: 'purple'
    };
    return colors[pathId] || 'gray';
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {actionable_intelligence.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {actionable_intelligence.section_subheader}
        </p>
        
        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Strategic Decision Point</h3>
                <p className="text-gray-700 leading-relaxed">
                  Based on your current position - strong developer community trust (47% referral traffic) but 
                  weak organic presence (10% search traffic) - each path below offers a different approach to 
                  building market authority. Choose based on your resources and timeline.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Strategic Path Cards - Enhanced Interactive Selection */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-gray-400" />
          Three Strategic Paths to Authority
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {actionable_intelligence.strategic_paths.map((path: any) => {
            const color = getPathColor(path.id);
            const isSelected = selectedPath === path.id;
            const isHovered = hoveredPath === path.id;
            
            return (
              <motion.div
                key={path.id}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative"
              >
                <div 
                  className={`
                    h-full cursor-pointer transition-all duration-300
                    ${isSelected ? 'scale-[1.02]' : ''}
                  `}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <Card className={`
                    h-full overflow-hidden border-2 transition-all
                    ${isSelected 
                      ? `border-${color}-400 shadow-2xl` 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                    }
                  `}>
                    {/* Colored Top Bar */}
                    <div className={`h-2 bg-gradient-to-r ${
                      color === 'blue' ? 'from-blue-400 to-blue-600' :
                      color === 'green' ? 'from-green-400 to-green-600' :
                      'from-purple-400 to-purple-600'
                    }`} />
                    
                    <div className="p-6">
                      {/* Icon and Title */}
                      <div className="mb-4">
                        <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center mb-4
                          ${isSelected || isHovered
                            ? `bg-gradient-to-br ${
                                color === 'blue' ? 'from-blue-100 to-blue-200' :
                                color === 'green' ? 'from-green-100 to-green-200' :
                                'from-purple-100 to-purple-200'
                              }`
                            : 'bg-gray-100'
                          }
                        `}>
                          <div className={`${
                            isSelected || isHovered 
                              ? `text-${color}-600` 
                              : 'text-gray-600'
                          }`}>
                            {getPathIcon(path.id)}
                          </div>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">{path.name}</h3>
                        <p className="text-sm text-gray-600 italic mt-1">{path.philosophy}</p>
                      </div>
                      
                      {/* Metrics Preview */}
                      <div className="space-y-4">
                        {Object.entries(path.metrics_impact).map(([metric, data]: [string, any]) => {
                          const value = parseInt(data.change || data.position || '0');
                          
                          return (
                            <div key={metric} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {metric.replace(/_/g, ' ')}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Badge className={`
                                    ${isSelected 
                                      ? `bg-${color}-100 text-${color}-700` 
                                      : 'bg-gray-100 text-gray-700'
                                    }
                                  `}>
                                    {data.change || data.position || 'Yes'}
                                  </Badge>
                                  <ArrowUpRight className={`w-3 h-3 ${
                                    isSelected ? `text-${color}-600` : 'text-gray-400'
                                  }`} />
                                </div>
                              </div>
                              
                              {/* Progress Bar */}
                              {data.change && (
                                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`absolute h-full bg-gradient-to-r ${
                                      color === 'blue' ? 'from-blue-400 to-blue-600' :
                                      color === 'green' ? 'from-green-400 to-green-600' :
                                      'from-purple-400 to-purple-600'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: isSelected || isHovered ? `${value}%` : 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                  />
                                </div>
                              )}
                              
                              {/* Timeline */}
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{data.timeline}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Selection State */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <div className={`
                              text-center p-3 rounded-lg font-medium
                              bg-${color}-600 text-white
                            `}>
                              Currently Selected
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </div>
                
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`
                      absolute -top-3 -right-3 w-8 h-8 rounded-full 
                      bg-${color}-600 text-white
                      flex items-center justify-center shadow-lg
                    `}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Selected Path Details - Enhanced Deep Dive */}
      <AnimatePresence mode="wait">
        {selectedPath && (
          <motion.section
            key={selectedPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gray-400" />
              Implementation Roadmap
            </h2>
            
            {actionable_intelligence.strategic_paths.map((path: any) => {
              if (path.id !== selectedPath) return null;
              const color = getPathColor(path.id);
              
              return (
                <div key={path.id} className="space-y-6">
                  {/* Strategy Overview Card */}
                  <Card className="overflow-hidden">
                    <div className={`h-3 bg-gradient-to-r ${
                      color === 'blue' ? 'from-blue-400 to-blue-600' :
                      color === 'green' ? 'from-green-400 to-green-600' :
                      'from-purple-400 to-purple-600'
                    }`} />
                    
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-8">
                        <div className={`
                          p-4 rounded-xl shadow-sm
                          bg-gradient-to-br ${
                            color === 'blue' ? 'from-blue-100 to-blue-200' :
                            color === 'green' ? 'from-green-100 to-green-200' :
                            'from-purple-100 to-purple-200'
                          }
                        `}>
                          <div className={`text-${color}-600`}>
                            {getPathIcon(path.id)}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-gray-900">{path.name}</h3>
                          <p className="text-lg text-gray-600 italic mt-1">{path.philosophy}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Expected Outcomes */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                            <Gauge className="w-5 h-5 text-gray-400" />
                            Expected Outcomes
                          </h4>
                          
                          <div className="space-y-4">
                            {Object.entries(path.metrics_impact).map(([metric, data]: [string, any]) => {
                              const value = parseInt(data.change || data.position || '0');
                              
                              return (
                                <motion.div 
                                  key={metric}
                                  whileHover={{ scale: 1.02 }}
                                  className={`
                                    p-5 rounded-xl border-2 transition-all
                                    bg-gradient-to-r ${
                                      color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
                                      color === 'green' ? 'from-green-50 to-green-100 border-green-200' :
                                      'from-purple-50 to-purple-100 border-purple-200'
                                    }
                                  `}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-gray-900 capitalize">
                                      {metric.replace(/_/g, ' ')}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Badge className={`bg-white text-${color}-700 font-semibold`}>
                                        {data.change || data.position || 'Achieved'}
                                      </Badge>
                                      {data.change && (
                                        <ArrowUpRight className={`w-4 h-4 text-${color}-600`} />
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Visual Progress */}
                                  {data.change && (
                                    <div className="mb-3">
                                      <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                                        <motion.div
                                          className={`h-full bg-gradient-to-r ${
                                            color === 'blue' ? 'from-blue-400 to-blue-600' :
                                            color === 'green' ? 'from-green-400 to-green-600' :
                                            'from-purple-400 to-purple-600'
                                          }`}
                                          initial={{ width: 0 }}
                                          animate={{ width: `${value}%` }}
                                          transition={{ duration: 1, delay: 0.2 }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span className="text-gray-600">{data.timeline}</span>
                                    </div>
                                    {data.achieved && (
                                      <div className="flex items-center gap-1">
                                        <CheckCircle className={`w-4 h-4 text-${color}-600`} />
                                        <span className="text-gray-600">High confidence</span>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Implementation Requirements */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            Implementation Requirements
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Resources */}
                            <div className="p-5 bg-gray-50 rounded-xl">
                              <h5 className="font-medium text-gray-900 mb-3">Resources Needed</h5>
                              <div className="space-y-3">
                                {path.resource_requirements.map((req: string, idx: number) => (
                                  <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className={`
                                      w-2 h-2 rounded-full mt-1.5
                                      bg-${color}-500
                                    `} />
                                    <span className="text-sm text-gray-700">{req}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Success Metrics */}
                            {path.success_indicators && (
                              <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                <h5 className="font-medium text-gray-900 mb-3">Success Indicators</h5>
                                <div className="grid grid-cols-2 gap-3">
                                  {path.success_indicators.map((indicator: string, idx: number) => (
                                    <motion.div 
                                      key={idx}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle className={`w-4 h-4 text-${color}-600`} />
                                      <span className="text-sm text-gray-700">{indicator}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-8 flex justify-center">
                        <button className={`
                          px-8 py-4 rounded-lg font-medium text-white shadow-lg
                          bg-gradient-to-r ${
                            color === 'blue' ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' :
                            color === 'green' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                            'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                          }
                          transition-all hover:shadow-xl hover:scale-105
                          flex items-center gap-2
                        `}>
                          Generate Detailed Implementation Plan
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Success Tracking Framework - Premium Redesign */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gray-400" />
          Success Tracking Framework
        </h2>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-8">
            <div className="max-w-5xl mx-auto">
              {/* Dynamic KPI Dashboard */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-gray-400" />
                  Dynamic KPIs Based on Selected Path
                </h3>
                
                <AnimatePresence mode="wait">
                  {selectedPath && (
                    <motion.div
                      key={selectedPath}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {actionable_intelligence.strategic_paths.map((path: any) => {
                        if (path.id !== selectedPath) return null;
                        const color = getPathColor(path.id);
                        const kpis = actionable_intelligence.success_tracking.primary_kpis[path.id] || [];
                        
                        return (
                          <div key={path.id}>
                            {/* Selected Path Header */}
                            <div className={`
                              p-6 rounded-xl mb-6
                              bg-gradient-to-r ${
                                color === 'blue' ? 'from-blue-100 to-blue-200' :
                                color === 'green' ? 'from-green-100 to-green-200' :
                                'from-purple-100 to-purple-200'
                              }
                            `}>
                              <div className="flex items-center gap-4">
                                <div className={`
                                  p-3 bg-white rounded-lg shadow-sm
                                `}>
                                  <div className={`text-${color}-600`}>
                                    {getPathIcon(path.id)}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-xl font-medium text-gray-900">
                                    Primary KPIs for {path.name}
                                  </h4>
                                  <p className="text-gray-600 mt-1">{path.philosophy}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* KPI Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {kpis.map((kpi: string, idx: number) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                  onClick={() => setExpandedKPI(expandedKPI === kpi ? null : kpi)}
                                  className="cursor-pointer"
                                >
                                  <div className={`
                                    p-6 bg-white rounded-xl border-2 transition-all
                                    ${expandedKPI === kpi 
                                      ? `border-${color}-400 shadow-lg` 
                                      : 'border-gray-200 hover:border-gray-300'
                                    }
                                  `}>
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <div className={`
                                          w-10 h-10 rounded-lg flex items-center justify-center
                                          ${expandedKPI === kpi
                                            ? `bg-${color}-100`
                                            : 'bg-gray-100'
                                          }
                                        `}>
                                          <Activity className={`w-5 h-5 ${
                                            expandedKPI === kpi ? `text-${color}-600` : 'text-gray-600'
                                          }`} />
                                        </div>
                                        <h5 className="font-medium text-gray-900 capitalize">
                                          {kpi.replace(/_/g, ' ')}
                                        </h5>
                                      </div>
                                      <ChevronRight className={`
                                        w-5 h-5 text-gray-400 transition-transform
                                        ${expandedKPI === kpi ? 'rotate-90' : ''}
                                      `} />
                                    </div>
                                    
                                    {/* KPI Preview Metric */}
                                    <div className="flex items-baseline gap-2">
                                      <span className={`text-3xl font-light ${
                                        expandedKPI === kpi ? `text-${color}-600` : 'text-gray-900'
                                      }`}>
                                        {kpi.includes('word count') && '3,847'}
                                        {kpi.includes('comprehensiveness') && '94%'}
                                        {kpi.includes('query match') && '87%'}
                                        {kpi.includes('pain point') && '12/15'}
                                        {kpi.includes('new term') && '23'}
                                        {kpi.includes('media') && '47'}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {kpi.includes('word count') && 'avg words'}
                                        {kpi.includes('comprehensiveness') && 'score'}
                                        {kpi.includes('query match') && 'relevance'}
                                        {kpi.includes('pain point') && 'covered'}
                                        {kpi.includes('new term') && 'rankings'}
                                        {kpi.includes('media') && 'mentions'}
                                      </span>
                                    </div>
                                    
                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                      {expandedKPI === kpi && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="mt-4 pt-4 border-t border-gray-200"
                                        >
                                          <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                              <span className="text-gray-600">Target</span>
                                              <span className="font-medium text-gray-900">
                                                {kpi.includes('word count') && '4,000+ words'}
                                                {kpi.includes('comprehensiveness') && '>90%'}
                                                {kpi.includes('query match') && '>85%'}
                                                {kpi.includes('pain point') && '15/15'}
                                                {kpi.includes('new term') && '50+ rankings'}
                                                {kpi.includes('media') && '100+ mentions'}
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                              <span className="text-gray-600">Timeline</span>
                                              <span className="font-medium text-gray-900">
                                                {kpi.includes('word count') && '3 months'}
                                                {kpi.includes('comprehensiveness') && '6 months'}
                                                {kpi.includes('query match') && '2 months'}
                                                {kpi.includes('pain point') && '4 months'}
                                                {kpi.includes('new term') && '9 months'}
                                                {kpi.includes('media') && '12 months'}
                                              </span>
                                            </div>
                                            <div className="mt-3">
                                              <div className="flex items-center gap-2 mb-2">
                                                <Info className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs font-medium text-gray-700">How to measure</span>
                                              </div>
                                              <p className="text-xs text-gray-600">
                                                {kpi.includes('word count') && 'Average word count across top 20 performing pages'}
                                                {kpi.includes('comprehensiveness') && 'Topic coverage score from content audit tools'}
                                                {kpi.includes('query match') && 'Search intent alignment from GSC data'}
                                                {kpi.includes('pain point') && 'Customer problem coverage analysis'}
                                                {kpi.includes('new term') && 'Track rankings for category-defining terms'}
                                                {kpi.includes('media') && 'PR mentions and thought leadership coverage'}
                                              </p>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Universal KPIs Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gray-400" />
                  Universal Success Metrics
                </h3>
                <div className="p-6 bg-white rounded-xl">
                  <p className="text-sm text-gray-600 mb-4">
                    Track these regardless of your chosen strategy:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {actionable_intelligence.success_tracking.secondary_kpis.map((kpi: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {kpi.includes('AI') && <Sparkles className="w-4 h-4 text-purple-600" />}
                          {kpi.includes('Search') && <Search className="w-4 h-4 text-blue-600" />}
                          {kpi.includes('Engagement') && <Users className="w-4 h-4 text-green-600" />}
                          {kpi.includes('Conversion') && <DollarSign className="w-4 h-4 text-orange-600" />}
                          <span className="text-sm font-medium text-gray-900">{kpi}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {kpi.includes('AI') && 'Citations in LLM responses'}
                          {kpi.includes('Search') && 'Organic ranking progress'}
                          {kpi.includes('Engagement') && 'Time on page, scroll depth'}
                          {kpi.includes('Conversion') && 'Sign-ups from content'}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Leading Indicators Dashboard */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  Leading Indicators Dashboard
                </h3>
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
                  <div className="p-6">
                    <p className="text-sm text-gray-700 mb-6">
                      Weekly tracking metrics that predict future success:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {actionable_intelligence.success_tracking.leading_indicators.map((indicator: string, idx: number) => {
                        const trends = ['+12%', '+23%', '-5%', '+34%', '+8%'];
                        const isPositive = !trends[idx].includes('-');
                        
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Activity className="w-5 h-5 text-indigo-600" />
                              <Badge className={`
                                ${isPositive 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                                }
                              `}>
                                {trends[idx]}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {indicator}
                            </p>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${
                                  isPositive 
                                    ? 'bg-gradient-to-r from-green-400 to-green-600' 
                                    : 'bg-gradient-to-r from-red-400 to-red-600'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.abs(parseInt(trends[idx])) * 2}%` }}
                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Insights Box */}
                    <div className="mt-6 p-4 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Weekly Review Insight</p>
                          <p className="text-sm text-gray-700">
                            Your content velocity is up 23% but keyword movements are down 5%. 
                            Consider focusing on quality over quantity for the next sprint.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}