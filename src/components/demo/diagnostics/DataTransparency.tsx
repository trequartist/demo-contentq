import React, { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { 
  Database,
  Calendar,
  BarChart3,
  Shield,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Presentation,
  Code2,
  Clock,
  CheckCircle,
  ChevronRight,
  Info,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Activity,
  Users,
  GitBranch,
  MessageSquare,
  Share2,
  Lock,
  Unlock,
  TrendingUp,
  Filter,
  Layers,
  Zap,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataTransparencyProps {
  data: any;
}

export default function DataTransparency({ data }: DataTransparencyProps) {
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [selectedConfidence, setSelectedConfidence] = useState<string | null>(null);
  const [hoveredExport, setHoveredExport] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { data_transparency, export_options } = data;

  const getConfidenceColor = (level: string) => {
    if (level.includes('high')) return 'green';
    if (level.includes('medium')) return 'yellow';
    return 'orange';
  };

  const getExportIcon = (format: string) => {
    const formatLower = format.toLowerCase();
    if (formatLower.includes('json')) return <FileJson className="w-5 h-5" />;
    if (formatLower.includes('excel')) return <FileSpreadsheet className="w-5 h-5" />;
    if (formatLower.includes('summary')) return <FileText className="w-5 h-5" />;
    if (formatLower.includes('presentation')) return <Presentation className="w-5 h-5" />;
    if (formatLower.includes('api')) return <Code2 className="w-5 h-5" />;
    return <Download className="w-5 h-5" />;
  };

  const getExportColor = (format: string) => {
    const formatLower = format.toLowerCase();
    if (formatLower.includes('json') || formatLower.includes('api')) return 'purple';
    if (formatLower.includes('excel')) return 'green';
    if (formatLower.includes('summary')) return 'blue';
    if (formatLower.includes('presentation')) return 'orange';
    return 'gray';
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {data_transparency.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {data_transparency.section_subheader}
        </p>
        
        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data Integrity & Methodology</h3>
                <p className="text-gray-700 leading-relaxed">
                  This analysis synthesizes data from 7 primary sources, 500+ LLM responses, and 12 months of 
                  historical metrics. Every insight is tagged with confidence levels and source attribution. 
                  Our methodology prioritizes actionable intelligence over vanity metrics.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Collection Timeline - Enhanced Visual */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-gray-400" />
          Data Collection Timeline & Methodology
        </h2>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            {/* Primary Timeline */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Primary Analysis Period</h3>
                  <p className="text-2xl font-light text-blue-700 mt-1">
                    {data_transparency.collection_timeline.primary}
                  </p>
                </div>
              </div>
              
              {/* Visual Timeline */}
              <div className="relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 -translate-y-1/2" />
                <div className="relative flex justify-between items-center">
                  {['Jan 20', 'Jan 22', 'Jan 24', 'Jan 27'].map((date, idx) => (
                    <motion.div
                      key={date}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      <div className={`
                        w-4 h-4 rounded-full bg-white border-2
                        ${idx === 0 || idx === 3 
                          ? 'border-blue-600 shadow-lg' 
                          : 'border-gray-400'
                        }
                      `} />
                      <span className={`
                        absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap
                        ${idx === 0 || idx === 3 
                          ? 'font-medium text-blue-700' 
                          : 'text-gray-500'
                        }
                      `}>
                        {date}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Collection Frequency Grid */}
            <div className="mt-12">
              <h4 className="font-medium text-gray-900 mb-4">Update Frequency by Data Type</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(data_transparency.collection_timeline.frequency).map(([freq, desc], idx) => (
                  <motion.div
                    key={freq}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="p-5 bg-white rounded-lg hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`
                            p-2 rounded-lg transition-colors
                            ${freq === 'daily' 
                              ? 'bg-green-100 group-hover:bg-green-200' 
                              : freq === 'weekly' 
                              ? 'bg-blue-100 group-hover:bg-blue-200' 
                              : 'bg-purple-100 group-hover:bg-purple-200'
                            }
                          `}>
                            {freq === 'daily' && <Activity className="w-4 h-4 text-green-600" />}
                            {freq === 'weekly' && <RefreshCw className="w-4 h-4 text-blue-600" />}
                            {freq === 'historical' && <GitBranch className="w-4 h-4 text-purple-600" />}
                          </div>
                          <h5 className="font-medium capitalize text-gray-900">{freq}</h5>
                        </div>
                        <Badge className={`
                          ${freq === 'daily' 
                            ? 'bg-green-100 text-green-700' 
                            : freq === 'weekly' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                          }
                        `}>
                          {freq === 'daily' && 'Live'}
                          {freq === 'weekly' && 'Regular'}
                          {freq === 'historical' && 'Static'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{desc as string}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Data Sources Deep Dive - Enhanced Cards */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Database className="w-6 h-6 text-gray-400" />
          Data Sources & Sample Sizes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(data_transparency.sources_and_samples).map(([category, sources], idx) => {
            const isExpanded = expandedSource === category;
            const categoryColors = {
              seo_data: 'blue',
              ai_testing: 'purple',
              market_intelligence: 'green'
            };
            const color = categoryColors[category as keyof typeof categoryColors] || 'gray';
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                    isExpanded ? 'ring-2 ring-' + color + '-500' : ''
                  }`}
                  onClick={() => setExpandedSource(isExpanded ? null : category)}
                >
                  <div className={`h-1 bg-gradient-to-r ${
                    color === 'blue' ? 'from-blue-400 to-blue-600' :
                    color === 'purple' ? 'from-purple-400 to-purple-600' :
                    'from-green-400 to-green-600'
                  }`} />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {category.replace(/_/g, ' ')}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${color}-100 text-${color}-700`}>
                          {Object.keys(sources as any).length} sources
                        </Badge>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(sources as any).slice(0, isExpanded ? undefined : 3).map(([source, detail]) => (
                        <motion.div
                          key={source}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`border-l-2 pl-3 py-2 ${
                            isExpanded 
                              ? `border-${color}-400` 
                              : 'border-gray-200'
                          }`}
                        >
                          <h5 className="text-sm font-medium capitalize text-gray-900">
                            {source.replace(/_/g, ' ')}
                          </h5>
                          <p className="text-xs text-gray-600 mt-1">{detail as string}</p>
                        </motion.div>
                      ))}
                      
                      {!isExpanded && Object.keys(sources as any).length > 3 && (
                        <p className="text-xs text-gray-500 italic">
                          +{Object.keys(sources as any).length - 3} more sources...
                        </p>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Info className="w-4 h-4" />
                            <span>All data collected with proper authentication and rate limiting</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Confidence Levels - Visual Enhancement */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-gray-400" />
          Data Confidence & Reliability Scoring
        </h2>
        
        <Card className="overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(data_transparency.confidence_levels).map(([level, data]: [string, any], idx) => {
                const color = getConfidenceColor(level);
                const isSelected = selectedConfidence === level;
                
                return (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedConfidence(isSelected ? null : level)}
                    className="cursor-pointer"
                  >
                    <div className={`
                      p-6 rounded-xl border-2 transition-all
                      ${isSelected 
                        ? `bg-${color}-50 border-${color}-400 shadow-lg` 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {level.replace(/_/g, ' ')}
                        </h4>
                        <Badge className={`
                          ${color === 'green' ? 'bg-green-100 text-green-700' :
                            color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-orange-100 text-orange-700'
                          }
                        `}>
                          {data.threshold}
                        </Badge>
                      </div>
                      
                      {/* Visual Confidence Bar */}
                      <div className="mb-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${
                              color === 'green' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                              color === 'yellow' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                              'bg-gradient-to-r from-orange-400 to-orange-600'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: level.includes('high') ? '90%' : 
                                     level.includes('medium') ? '70%' : '50%' 
                            }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {data.includes.map((item: string, itemIdx: number) => (
                          <motion.div
                            key={itemIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 + itemIdx * 0.05 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className={`w-4 h-4 ${
                              color === 'green' ? 'text-green-600' :
                              color === 'yellow' ? 'text-yellow-600' :
                              'text-orange-600'
                            }`} />
                            <span className="text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <p className="text-xs text-gray-600">
                              {level.includes('high') && 
                                'Data verified through multiple sources with consistent results'
                              }
                              {level.includes('medium') && 
                                'Patterns identified with reasonable confidence, some variance expected'
                              }
                              {level.includes('exploratory') && 
                                'Forward-looking insights based on emerging patterns and expert analysis'
                              }
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Methodology Note */}
            <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Confidence Methodology</p>
                  <p className="text-sm text-gray-700">
                    Each data point is assigned a confidence score based on source reliability, 
                    sample size, recency, and cross-validation. Only high-confidence data drives 
                    primary recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Export Options - Premium Cards */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Download className="w-6 h-6 text-gray-400" />
          Export & Integration Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {export_options.map((option: any, idx: number) => {
            const color = getExportColor(option.format);
            const isHovered = hoveredExport === idx;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredExport(idx)}
                onMouseLeave={() => setHoveredExport(null)}
              >
                <Card className={`
                  overflow-hidden transition-all cursor-pointer
                  ${isHovered ? 'shadow-xl' : 'shadow-sm hover:shadow-lg'}
                `}>
                  <div className={`h-1 bg-gradient-to-r ${
                    color === 'purple' ? 'from-purple-400 to-purple-600' :
                    color === 'green' ? 'from-green-400 to-green-600' :
                    color === 'blue' ? 'from-blue-400 to-blue-600' :
                    color === 'orange' ? 'from-orange-400 to-orange-600' :
                    'from-gray-400 to-gray-600'
                  }`} />
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`
                        p-3 rounded-lg transition-all
                        ${isHovered 
                          ? `bg-${color}-100` 
                          : 'bg-gray-100'
                        }
                      `}>
                        <div className={`
                          ${isHovered 
                            ? `text-${color}-600` 
                            : 'text-gray-600'
                          }
                        `}>
                          {getExportIcon(option.format)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{option.format}</h3>
                        <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                        
                        {/* Export Features */}
                        <div className="space-y-2 mb-4">
                          {option.format.includes('API') && (
                            <>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Zap className="w-3 h-3" />
                                <span>Real-time data access</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Lock className="w-3 h-3" />
                                <span>OAuth 2.0 secured</span>
                              </div>
                            </>
                          )}
                          {option.format.includes('Excel') && (
                            <>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Layers className="w-3 h-3" />
                                <span>Interactive models</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Filter className="w-3 h-3" />
                                <span>Custom filters</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className={`
                            w-full transition-all
                            ${isHovered 
                              ? `bg-${color}-600 hover:bg-${color}-700` 
                              : 'bg-gray-600 hover:bg-gray-700'
                            }
                          `}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Features - Enhanced Grid */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-gray-400" />
          Platform Capabilities
        </h2>
        
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Interactive Features */}
              <div>
                <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Interactive Analysis Features
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Eye className="w-4 h-4" />,
                      title: 'Drill-down capability',
                      desc: 'Every metric expandable for details'
                    },
                    {
                      icon: <BarChart3 className="w-4 h-4" />,
                      title: 'Scenario modeling',
                      desc: 'Adjust strategies to see projections'
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      title: 'Competitive toggles',
                      desc: 'Show/hide competitor data'
                    },
                    {
                      icon: <Clock className="w-4 h-4" />,
                      title: 'Time-range selector',
                      desc: 'View trends over different periods'
                    },
                    {
                      icon: <Shield className="w-4 h-4" />,
                      title: 'Confidence indicators',
                      desc: 'See data reliability for each metric'
                    }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/50 rounded-lg hover:bg-white transition-colors"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">{feature.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Collaboration Features */}
              <div>
                <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Team Collaboration Tools
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <MessageSquare className="w-4 h-4" />,
                      title: 'Annotation system',
                      desc: 'Add notes to any section'
                    },
                    {
                      icon: <Share2 className="w-4 h-4" />,
                      title: 'Share specific insights',
                      desc: 'Deep-link to findings'
                    },
                    {
                      icon: <TrendingUp className="w-4 h-4" />,
                      title: 'Progress tracking',
                      desc: 'Monitor improvement over time'
                    },
                    {
                      icon: <GitBranch className="w-4 h-4" />,
                      title: 'Comparison mode',
                      desc: 'Before/after analysis'
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      title: 'Team workspace',
                      desc: 'Shared strategic planning'
                    }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/50 rounded-lg hover:bg-white transition-colors"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">{feature.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Privacy Toggle */}
            <div className="mt-8 p-4 bg-white/70 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {showDetails ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
                  </button>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Data Privacy Controls</p>
                    <p className="text-xs text-gray-600">
                      {showDetails ? 'Sensitive data visible' : 'Sensitive data hidden'}
                    </p>
                  </div>
                </div>
                <Badge className={showDetails ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                  {showDetails ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                  {showDetails ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>
      
      {/* Bottom CTA */}
      <Card className="bg-gray-900 text-white border-gray-900">
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3">Ready to Take Action?</h3>
          <p className="text-gray-300 mb-6">
            Export your complete analysis or schedule a strategy session to review these insights with our team.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Full Report
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
              Schedule Review
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}