import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Sliders,
  TrendingUp,
  Clock,
  Users,
  ChevronRight,
  ChevronDown,
  Zap,
  Target,
  BookOpen,
  Activity,
  Sparkles,
  AlertCircle,
  Info,
  BarChart3,
  DollarSign,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StrategicLeverageProps {
  data: any;
}

interface LeverPosition {
  [key: string]: number;
}

export default function StrategicLeverage({ data }: StrategicLeverageProps) {
  const { strategic_leverage } = data;
  const [leverPositions, setLeverPositions] = useState<LeverPosition>({
    depth_vs_breadth: 30,
    problem_vs_solution: 20,
    velocity_vs_quality: 30,
    original_vs_curated: 15,
    niche_vs_broad: 50
  });
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedLever, setExpandedLever] = useState<string | null>(null);
  const [hoveredScenario, setHoveredScenario] = useState<string | null>(null);

  const handleLeverChange = (leverId: string, value: number) => {
    setLeverPositions(prev => ({
      ...prev,
      [leverId]: value
    }));
  };

  const loadScenario = (scenarioName: string) => {
    const scenarios: { [key: string]: LeverPosition } = {
      'Fast Authority': {
        depth_vs_breadth: 20,
        problem_vs_solution: 60,
        velocity_vs_quality: 80,
        original_vs_curated: 30,
        niche_vs_broad: 80
      },
      'Premium Position': {
        depth_vs_breadth: 90,
        problem_vs_solution: 40,
        velocity_vs_quality: 20,
        original_vs_curated: 80,
        niche_vs_broad: 60
      },
      'Balanced Growth': {
        depth_vs_breadth: 50,
        problem_vs_solution: 50,
        velocity_vs_quality: 50,
        original_vs_curated: 50,
        niche_vs_broad: 50
      },
      'Problem Solver': {
        depth_vs_breadth: 60,
        problem_vs_solution: 90,
        velocity_vs_quality: 40,
        original_vs_curated: 70,
        niche_vs_broad: 70
      }
    };
    
    if (scenarios[scenarioName]) {
      setLeverPositions(scenarios[scenarioName]);
      setSelectedScenario(scenarioName);
    }
  };

  const calculateImpactScore = () => {
    const weights = {
      depth_vs_breadth: 0.25,
      problem_vs_solution: 0.3,
      velocity_vs_quality: 0.15,
      original_vs_curated: 0.2,
      niche_vs_broad: 0.1
    };
    
    let authorityScore = 0;
    let trafficScore = 0;
    let conversionScore = 0;
    
    // Calculate scores based on lever positions
    authorityScore = (leverPositions.depth_vs_breadth * 0.8 + 
                     leverPositions.original_vs_curated * 0.9 + 
                     leverPositions.niche_vs_broad * 0.6) / 3;
    
    trafficScore = ((100 - leverPositions.depth_vs_breadth) * 0.7 + 
                   leverPositions.velocity_vs_quality * 0.8 + 
                   (100 - leverPositions.niche_vs_broad) * 0.6) / 3;
    
    conversionScore = (leverPositions.problem_vs_solution * 0.9 + 
                      leverPositions.depth_vs_breadth * 0.5 + 
                      leverPositions.niche_vs_broad * 0.7) / 3;
    
    return { authorityScore, trafficScore, conversionScore };
  };

  const getLeverIcon = (leverId: string) => {
    const icons: { [key: string]: JSX.Element } = {
      depth_vs_breadth: <BookOpen className="w-5 h-5" />,
      problem_vs_solution: <Target className="w-5 h-5" />,
      velocity_vs_quality: <Zap className="w-5 h-5" />,
      original_vs_curated: <Activity className="w-5 h-5" />,
      niche_vs_broad: <Users className="w-5 h-5" />
    };
    return icons[leverId] || <Sliders className="w-5 h-5" />;
  };

  const getScenarioIcon = (scenario: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Fast Authority': <Zap className="w-5 h-5" />,
      'Premium Position': <Sparkles className="w-5 h-5" />,
      'Balanced Growth': <BarChart3 className="w-5 h-5" />,
      'Problem Solver': <Target className="w-5 h-5" />
    };
    return icons[scenario] || <Sliders className="w-5 h-5" />;
  };

  const getScenarioColor = (scenario: string) => {
    const colors: { [key: string]: string } = {
      'Fast Authority': 'purple',
      'Premium Position': 'blue',
      'Balanced Growth': 'green',
      'Problem Solver': 'orange'
    };
    return colors[scenario] || 'gray';
  };

  const { authorityScore, trafficScore, conversionScore } = calculateImpactScore();

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {strategic_leverage.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {strategic_leverage.section_subheader}
        </p>
        
        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Sliders className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Strategic Framework</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your content strategy requires deliberate trade-offs. Each lever below impacts different metrics - 
                  authority, traffic, and conversion. Current data suggests focusing on depth and problem-solving 
                  could yield 3x better results than competing on breadth against established players.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Impact Projection Dashboard */}
      <section className="mb-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Gauge className="w-6 h-6 text-gray-400" />
          Real-Time Impact Projection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Authority Score */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Authority Building</h3>
                  <p className="text-sm text-gray-600 mt-1">Domain expertise recognition</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-purple-600">
                    {Math.round(authorityScore)}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-purple-600">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>Potential</span>
                  </div>
                </div>
              </div>
              <ProgressBar 
                value={authorityScore} 
                max={100}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-600"
              />
            </div>
          </Card>

          {/* Traffic Score */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Traffic Growth</h3>
                  <p className="text-sm text-gray-600 mt-1">Organic reach expansion</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-blue-600">
                    {Math.round(trafficScore)}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>Velocity</span>
                  </div>
                </div>
              </div>
              <ProgressBar 
                value={trafficScore} 
                max={100}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
              />
            </div>
          </Card>

          {/* Conversion Score */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Conversion Impact</h3>
                  <p className="text-sm text-gray-600 mt-1">Purchase intent signals</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-green-600">
                    {Math.round(conversionScore)}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <DollarSign className="w-3 h-3" />
                    <span>Revenue</span>
                  </div>
                </div>
              </div>
              <ProgressBar 
                value={conversionScore} 
                max={100}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-green-500 to-green-600"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Pre-built Scenarios */}
      <section className="mb-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-gray-400" />
          Strategic Scenarios
        </h2>
        <p className="text-gray-600 mb-6">
          Quick presets based on successful content strategies. Select one to see how the levers adjust.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategic_leverage.scenarios.map((scenario: any, idx: number) => {
            const color = getScenarioColor(scenario.name);
            const Icon = getScenarioIcon(scenario.name);
            const isSelected = selectedScenario === scenario.name;
            
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setHoveredScenario(scenario.name)}
                onMouseLeave={() => setHoveredScenario(null)}
              >
                <Card 
                  className={`
                    cursor-pointer transition-all duration-300 overflow-hidden
                    ${isSelected 
                      ? `ring-2 ring-${color}-500 bg-${color}-50` 
                      : 'hover:shadow-lg'
                    }
                  `}
                  onClick={() => loadScenario(scenario.name)}
                >
                  <div className={`h-1 bg-gradient-to-r from-${color}-500 to-${color}-600`} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? `bg-${color}-100` : 'bg-gray-100'
                      }`}>
                        {React.cloneElement(Icon, { 
                          className: `w-5 h-5 ${isSelected ? `text-${color}-600` : 'text-gray-600'}` 
                        })}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{scenario.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                      </div>
                    </div>
                    
                    {/* Hover State - Show impact preview */}
                    <AnimatePresence>
                      {hoveredScenario === scenario.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-gray-200"
                        >
                          <div className="space-y-2 text-xs">
                            {scenario.name === 'Fast Authority' && (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time to Impact</span>
                                  <span className="font-medium">60-90 days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Focus</span>
                                  <span className="font-medium">Niche domination</span>
                                </div>
                              </>
                            )}
                            {scenario.name === 'Premium Position' && (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time to Impact</span>
                                  <span className="font-medium">6-12 months</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Focus</span>
                                  <span className="font-medium">Thought leadership</span>
                                </div>
                              </>
                            )}
                            {scenario.name === 'Balanced Growth' && (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time to Impact</span>
                                  <span className="font-medium">3-6 months</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Focus</span>
                                  <span className="font-medium">Steady progress</span>
                                </div>
                              </>
                            )}
                            {scenario.name === 'Problem Solver' && (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time to Impact</span>
                                  <span className="font-medium">30-45 days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Focus</span>
                                  <span className="font-medium">High intent traffic</span>
                                </div>
                              </>
                            )}
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

      {/* Interactive Levers */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Sliders className="w-6 h-6 text-gray-400" />
          Strategic Levers
        </h2>
        <p className="text-gray-600 mb-8">
          Adjust each lever to see how different strategies impact your projected outcomes. 
          Current positions are based on your existing content analysis.
        </p>
        
        <div className="space-y-6">
          {strategic_leverage.levers.map((lever: any) => {
            const leverValue = leverPositions[lever.id];
            const isExpanded = expandedLever === lever.id;
            
            // Determine which side we're leaning towards
            const leaningRight = leverValue > 50;
            const impactData = leaningRight 
              ? (lever.if_pull_toward_depth || lever.if_pull_toward_problems || lever.if_maximize_quality || lever.if_increase_original || lever.if_niche_down)
              : (lever.if_increase_velocity || lever.if_increase_curated);
            
            return (
              <motion.div
                key={lever.id}
                initial={false}
                animate={{ scale: isExpanded ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedLever(isExpanded ? null : lever.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {React.cloneElement(getLeverIcon(lever.id), { 
                            className: 'w-5 h-5 text-gray-700' 
                          })}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{lever.name}</h3>
                          {lever.current_position && typeof lever.current_position === 'object' && (
                            <p className="text-sm text-gray-600 mt-0.5">
                              Currently: {Object.entries(lever.current_position)
                                .map(([k, v]) => `${k}: ${v}${k === 'velocity_unit' ? '' : '%'}`)
                                .join(', ')
                              }
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    {/* Lever Slider */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">
                            {lever.id === 'depth_vs_breadth' && 'Breadth'}
                            {lever.id === 'problem_vs_solution' && 'Solution'}
                            {lever.id === 'velocity_vs_quality' && 'Velocity'}
                            {lever.id === 'original_vs_curated' && 'Curated'}
                            {lever.id === 'niche_vs_broad' && 'Broad'}
                          </span>
                          <span className="text-xs text-gray-500">({100 - leverValue}%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">({leverValue}%)</span>
                          <span className="text-sm font-medium text-gray-700">
                            {lever.id === 'depth_vs_breadth' && 'Depth'}
                            {lever.id === 'problem_vs_solution' && 'Problem'}
                            {lever.id === 'velocity_vs_quality' && 'Quality'}
                            {lever.id === 'original_vs_curated' && 'Original'}
                            {lever.id === 'niche_vs_broad' && 'Niche'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Custom Slider */}
                      <div className="relative h-12 flex items-center">
                        <div className="absolute inset-x-0 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="absolute h-full bg-gradient-to-r from-gray-400 to-purple-600"
                            style={{ width: `${leverValue}%` }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={leverValue}
                          onChange={(e) => handleLeverChange(lever.id, parseInt(e.target.value))}
                          className="relative w-full h-3 opacity-0 cursor-pointer z-10"
                        />
                        <motion.div 
                          className="absolute w-6 h-6 bg-white border-2 border-purple-600 rounded-full shadow-lg"
                          style={{ left: `calc(${leverValue}% - 12px)` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Impact Preview */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 pt-6 border-t"
                        >
                          {/* Current Strategy Analysis */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Current Position Analysis</p>
                                <p className="text-sm text-gray-600">
                                  Your lever is set at {leverValue}% towards {
                                    lever.id === 'depth_vs_breadth' ? (leverValue > 50 ? 'depth' : 'breadth') :
                                    lever.id === 'problem_vs_solution' ? (leverValue > 50 ? 'problems' : 'solutions') :
                                    lever.id === 'velocity_vs_quality' ? (leverValue > 50 ? 'quality' : 'velocity') :
                                    lever.id === 'original_vs_curated' ? (leverValue > 50 ? 'original' : 'curated') :
                                    leverValue > 50 ? 'niche' : 'broad'
                                  }. Adjust to see projected impacts.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Show impacts based on lever position */}
                          {impactData && (
                            <div className="space-y-4">
                              {/* Impact Metrics */}
                              {impactData.impact && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                                    Projected Positive Impacts
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(impactData.impact).map(([metric, value]) => (
                                      <motion.div 
                                        key={metric}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg"
                                      >
                                        <p className="text-xs text-gray-600 mb-1 capitalize">
                                          {metric.replace(/_/g, ' ')}
                                        </p>
                                        <p className="text-2xl font-light text-green-700">{value as string}</p>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Trade-offs */}
                              {impactData.tradeoff && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                                    Trade-offs to Consider
                                  </h4>
                                  <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                      {typeof impactData.tradeoff === 'string' 
                                        ? impactData.tradeoff
                                        : Object.entries(impactData.tradeoff)
                                            .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
                                            .join(' • ')
                                      }
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Timeline & Resources */}
                              <div className="grid grid-cols-2 gap-4">
                                {impactData.timeline && (
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <Clock className="w-5 h-5 text-blue-600" />
                                      <div>
                                        <p className="text-xs text-gray-600">Time to Impact</p>
                                        <p className="font-medium text-gray-900">{impactData.timeline}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {impactData.resource_need && (
                                  <div className="p-4 bg-purple-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <Users className="w-5 h-5 text-purple-600" />
                                      <div>
                                        <p className="text-xs text-gray-600">Resources Needed</p>
                                        <p className="font-medium text-gray-900">{impactData.resource_need}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Detailed Analysis */}
                              {impactData.detailed_analysis && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-indigo-600" />
                                    Strategic Insight
                                  </h4>
                                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      {impactData.detailed_analysis}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Examples */}
                              {impactData.examples && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3">Example Implementations</h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    {impactData.examples.map((example: string, idx: number) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                                      >
                                        <div className="flex items-center gap-2">
                                          <ArrowRight className="w-4 h-4 text-purple-600" />
                                          <span className="text-sm text-gray-700">{example}</span>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Niche Options (for niche_vs_broad lever) */}
                              {impactData.niche_options && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3">High-Potential Niches</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {impactData.niche_options.map((niche: any, idx: number) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                                      >
                                        <h5 className="font-medium text-gray-900 mb-2">{niche.niche}</h5>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {niche.searches && (
                                            <div className="flex items-center gap-1">
                                              <TrendingUp className="w-3 h-3 text-green-600" />
                                              <span className="text-gray-600">Volume: {niche.searches}</span>
                                            </div>
                                          )}
                                          {niche.competition && (
                                            <div className="flex items-center gap-1">
                                              <Activity className="w-3 h-3 text-blue-600" />
                                              <span className="text-gray-600">Competition: {niche.competition}</span>
                                            </div>
                                          )}
                                          {niche.value && (
                                            <div className="flex items-center gap-1">
                                              <DollarSign className="w-3 h-3 text-purple-600" />
                                              <span className="text-gray-600">Value: {niche.value}</span>
                                            </div>
                                          )}
                                          {niche.audience && (
                                            <div className="flex items-center gap-1">
                                              <Users className="w-3 h-3 text-orange-600" />
                                              <span className="text-gray-600">Audience: {niche.audience}</span>
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Research Opportunities (for original content lever) */}
                              {impactData.research_opportunities && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3">Original Research Opportunities</h4>
                                  <div className="space-y-2">
                                    {impactData.research_opportunities.map((opp: string, idx: number) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                      >
                                        <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                                        <span className="text-sm text-gray-700">{opp}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
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

      {/* Strategic Recommendation */}
      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-0">
        <div className="p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-purple-600" />
            Your Optimized Strategy Profile
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Authority Score</h4>
              <div className="text-3xl font-light text-purple-600">{Math.round(authorityScore)}%</div>
              <p className="text-sm text-gray-600 mt-1">Domain expertise signal</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Traffic Potential</h4>
              <div className="text-3xl font-light text-blue-600">{Math.round(trafficScore)}%</div>
              <p className="text-sm text-gray-600 mt-1">Organic growth velocity</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Conversion Impact</h4>
              <div className="text-3xl font-light text-green-600">{Math.round(conversionScore)}%</div>
              <p className="text-sm text-gray-600 mt-1">Revenue potential</p>
            </div>
          </div>
          
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Strategic Summary:</strong> Your current lever configuration suggests a 
              {authorityScore > trafficScore ? ' authority-first approach' : ' traffic-first approach'} 
              {' '}with projected {Math.round((authorityScore + trafficScore + conversionScore) / 3)}% overall effectiveness. 
              Consider adjusting levers above to optimize for your specific business goals.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors border border-purple-200">
              Save Strategy Configuration
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Generate Action Plan
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}