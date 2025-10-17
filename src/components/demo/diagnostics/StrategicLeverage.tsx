import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
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
  ArrowRight,
  RotateCcw,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StrategicLeverageProps {
  data: any;
}

interface LeverPosition {
  [key: string]: number;
}

interface ProjectedOutcomes {
  authorityScore: { current: number; projected: number; change: number };
  organicTraffic: { current: number; projected: number; change: number };
  aiVisibility: { current: number; projected: number; change: number };
  conversionRate: { current: number; projected: number; change: number };
}

export default function StrategicLeverage({ data }: StrategicLeverageProps) {
  const { strategic_leverage = {} } = data || {};
  const [leverPositions, setLeverPositions] = useState<LeverPosition>({
    depth_vs_breadth: 30,
    problem_vs_solution: 20,
    velocity_vs_quality: 30,
    original_vs_curated: 15,
    niche_vs_broad: 50
  });
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedLever, setExpandedLever] = useState<string | null>(null);
  const [projectedOutcomes, setProjectedOutcomes] = useState<ProjectedOutcomes>({
    authorityScore: { current: 42, projected: 42, change: 0 },
    organicTraffic: { current: 3200, projected: 3200, change: 0 },
    aiVisibility: { current: 23, projected: 23, change: 0 },
    conversionRate: { current: 2.1, projected: 2.1, change: 0 }
  });

  // Strategic Pillars Data
  const strategicPillars = [
    {
      id: 'technical_authority',
      title: 'Technical Authority',
      description: 'Become the go-to resource for complex automation challenges',
      icon: Target,
      color: 'blue',
      roi: '+340%',
      timeline: '6-12 months',
      metrics: [
        { label: 'Technical Backlinks', value: '+180%', trend: 'up' },
        { label: 'Expert Citations', value: '+95%', trend: 'up' },
        { label: 'Developer Trust', value: '+67%', trend: 'up' }
      ]
    },
    {
      id: 'problem_solving',
      title: 'Problem-Solving Hub',
      description: 'Own the troubleshooting and error-handling space',
      icon: Zap,
      color: 'green',
      roi: '+280%',
      timeline: '3-6 months',
      metrics: [
        { label: 'High-Intent Traffic', value: '+320%', trend: 'up' },
        { label: 'Conversion Rate', value: '+45%', trend: 'up' },
        { label: 'User Engagement', value: '+78%', trend: 'up' }
      ]
    },
    {
      id: 'ai_native',
      title: 'AI-Native Leadership',
      description: 'Lead the conversation on AI-powered automation',
      icon: Sparkles,
      color: 'purple',
      roi: '+420%',
      timeline: '9-18 months',
      metrics: [
        { label: 'AI Citations', value: '+250%', trend: 'up' },
        { label: 'Thought Leadership', value: '+150%', trend: 'up' },
        { label: 'Market Position', value: '+200%', trend: 'up' }
      ]
    }
  ];

  const leverData = [
    {
      id: 'depth_vs_breadth',
      name: 'Content Depth ←→ Breadth',
      left_label: 'Depth',
      right_label: 'Breadth',
      description: 'Focus on comprehensive guides vs. covering more topics',
      impacts: {
        depth: {
          aiCitations: '+45%',
          dwellTime: '+67%',
          backlinks: '+120%',
          traffic: '-30% initially'
        },
        breadth: {
          coverage: '+85%',
          rankingKeywords: '+230%',
          topicalAuthority: '+40%',
          contentQuality: '-15%'
        }
      },
      benefits: 'Deep content gets 3.4x more backlinks',
      tradeoffs: 'Breadth secures more rankings initially'
    },
    {
      id: 'problem_vs_solution',
      name: 'Problem Focus ←→ Solution Focus',
      left_label: 'Problem',
      right_label: 'Solution',
      description: 'Target pain points vs. promote features',
      impacts: {
        problem: {
          conversionIntent: '+320%',
          competition: '-67%',
          userTrust: '+45%',
          brandAwareness: '-20%'
        },
        solution: {
          brandVisibility: '+55%',
          directTraffic: '+30%',
          salesAlignment: '+80%',
          searchVolume: '-40%'
        }
      },
      benefits: 'Problem content has 3.2x conversion intent',
      tradeoffs: 'Solution content builds brand faster'
    },
    {
      id: 'velocity_vs_quality',
      name: 'Velocity ←→ Quality',
      left_label: 'Speed',
      right_label: 'Quality',
      description: 'Publish frequently vs. perfect each piece',
      impacts: {
        velocity: {
          indexedPages: '+180%',
          topicalCoverage: '+120%',
          testingData: '+200%',
          avgQuality: '-25%'
        },
        quality: {
          shareability: '+85%',
          authorityScore: '+60%',
          userEngagement: '+95%',
          publishingCost: '+150%'
        }
      },
      benefits: 'High velocity captures emerging trends',
      tradeoffs: 'Quality content builds lasting authority'
    },
    {
      id: 'original_vs_curated',
      name: 'Original Research ←→ Curation',
      left_label: 'Original',
      right_label: 'Curated',
      description: 'Create new insights vs. synthesize existing',
      impacts: {
        original: {
          thoughtLeadership: '+120%',
          mediaMentions: '+85%',
          competitiveMoat: '+95%',
          productionTime: '+200%'
        },
        curated: {
          publishingSpeed: '+150%',
          topicCoverage: '+180%',
          consistency: '+75%',
          uniqueness: '-40%'
        }
      },
      benefits: 'Original research gets 5x more citations',
      tradeoffs: 'Curation allows 3x publishing velocity'
    },
    {
      id: 'niche_vs_broad',
      name: 'Niche Focus ←→ Broad Appeal',
      left_label: 'Niche',
      right_label: 'Broad',
      description: 'Dominate specific verticals vs. general market',
      impacts: {
        niche: {
          marketDominance: '+180%',
          conversionRate: '+145%',
          communityEngagement: '+200%',
          totalMarket: '-60%'
        },
        broad: {
          addressableMarket: '+300%',
          brandAwareness: '+120%',
          partnershipOptions: '+150%',
          specificExpertise: '-45%'
        }
      },
      benefits: 'Niche focus yields 2.8x conversion rates',
      tradeoffs: 'Broad appeal maximizes market size'
    }
  ];

  // Calculate projected outcomes based on lever positions
  useEffect(() => {
    const calculateProjections = () => {
      const depthImpact = leverPositions.depth_vs_breadth / 100;
      const problemImpact = leverPositions.problem_vs_solution / 100;
      const qualityImpact = leverPositions.velocity_vs_quality / 100;
      const originalImpact = leverPositions.original_vs_curated / 100;
      const nicheImpact = leverPositions.niche_vs_broad / 100;

      const newProjections = {
        authorityScore: {
          current: 42,
          projected: Math.round(42 + (depthImpact * 25) + (qualityImpact * 20) + (originalImpact * 15)),
          change: 0
        },
        organicTraffic: {
          current: 3200,
          projected: Math.round(3200 * (1 + (depthImpact * 0.5) + (problemImpact * 0.7) + ((1 - qualityImpact) * 0.8))),
          change: 0
        },
        aiVisibility: {
          current: 23,
          projected: Math.round(23 + (depthImpact * 30) + (originalImpact * 25) + (qualityImpact * 15)),
          change: 0
        },
        conversionRate: {
          current: 2.1,
          projected: parseFloat((2.1 * (1 + (problemImpact * 0.8) + (nicheImpact * 0.6) + (qualityImpact * 0.3))).toFixed(1)),
          change: 0
        }
      };

      // Calculate percentage changes
      Object.keys(newProjections).forEach(key => {
        const metric = newProjections[key as keyof ProjectedOutcomes];
        metric.change = Math.round(((metric.projected - metric.current) / metric.current) * 100);
      });

      setProjectedOutcomes(newProjections);
    };

    calculateProjections();
  }, [leverPositions]);

  const handleLeverChange = (leverId: string, value: number) => {
    setLeverPositions(prev => ({
      ...prev,
      [leverId]: value
    }));
  };

  const loadScenario = (scenario: any) => {
    setLeverPositions({
      depth_vs_breadth: scenario.leverSettings.depth,
      problem_vs_solution: scenario.leverSettings.problem,
      velocity_vs_quality: scenario.leverSettings.velocity,
      original_vs_curated: scenario.leverSettings.original,
      niche_vs_broad: scenario.leverSettings.niche
    });
    setSelectedScenario(scenario.id);
  };

  const resetLevers = () => {
    setLeverPositions({
      depth_vs_breadth: 30,
      problem_vs_solution: 20,
      velocity_vs_quality: 30,
      original_vs_curated: 15,
      niche_vs_broad: 50
    });
    setSelectedScenario(null);
  };

  const scenarios = [
    {
      id: 'fast_authority',
      name: 'Fast Authority',
      philosophy: 'Move fast, own a niche',
      leverSettings: { depth: 40, problem: 70, velocity: 80, original: 30, niche: 90 },
      expectedOutcomes: ['#1 in RevOps automation (6 months)', '5x qualified traffic', '3x conversion rate'],
      resources: ['2 writers, 1 strategist', '$8K/month budget', '40 hours/week total'],
      icon: Zap,
      timeframe: '6 months'
    },
    {
      id: 'thought_leadership',
      name: 'Thought Leadership',
      philosophy: 'Quality over quantity, original insights',
      leverSettings: { depth: 85, problem: 30, velocity: 20, original: 90, niche: 40 },
      expectedOutcomes: ['Industry recognition', 'Premium brand position', 'High-value partnerships'],
      resources: ['1 senior writer, 2 researchers', '$15K/month budget', '60 hours/week total'],
      icon: Lightbulb,
      timeframe: '12 months'
    },
    {
      id: 'balanced_growth',
      name: 'Balanced Growth',
      philosophy: 'Sustainable, measured expansion',
      leverSettings: { depth: 50, problem: 50, velocity: 50, original: 50, niche: 50 },
      expectedOutcomes: ['Steady 30% QoQ growth', 'Broad market coverage', 'Predictable results'],
      resources: ['3 writers, 1 editor', '$12K/month budget', '50 hours/week total'],
      icon: Activity,
      timeframe: '9 months'
    }
  ];

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
            STRATEGIC LEVERAGE SYSTEM
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Five levers to accelerate your authority
          </p>
        </div>
        
        <p className="text-gray-600 leading-relaxed">
          Each lever impacts different outcomes. Your current position and resource constraints determine 
          the optimal combination. Adjust the levers below to model different strategic paths.
        </p>
      </motion.div>

      {/* Strategic Pillars */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-gray-400" />
          Strategic Pillars & ROI Projections
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {strategicPillars.map((pillar, idx) => (
            <Card key={pillar.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-${pillar.color}-50 rounded-lg flex items-center justify-center`}>
                    <pillar.icon className={`w-5 h-5 text-${pillar.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{pillar.title}</h3>
                    <p className="text-sm text-gray-500">{pillar.timeline}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{pillar.description}</p>
                
                <div className="space-y-3">
                  {pillar.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Projected ROI</span>
                    <span className="text-lg font-bold text-green-600">{pillar.roi}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Lever Dashboard */}
      <Card className="bg-white border border-gray-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-light text-gray-900">STRATEGIC LEVERS</h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={resetLevers}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {leverData.map((lever, idx) => (
              <motion.div
                key={lever.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {idx + 1}. {lever.name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      Current: {leverPositions[lever.id]}% {lever.left_label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{lever.description}</p>
                </div>

                {/* Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{lever.left_label}</span>
                    <span>{lever.right_label}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={leverPositions[lever.id]}
                    onChange={(e) => handleLeverChange(lever.id, parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #1f2937 0%, #1f2937 ${leverPositions[lever.id]}%, #e5e7eb ${leverPositions[lever.id]}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* Impact Preview */}
                <div 
                  className="cursor-pointer"
                  onClick={() => setExpandedLever(expandedLever === lever.id ? null : lever.id)}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {leverPositions[lever.id] <= 50 
                          ? `If you maximize ${lever.left_label}:`
                          : `If you maximize ${lever.right_label}:`
                        }
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedLever === lever.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedLever === lever.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 mb-3">
                              {lever.left_label} Benefits:
                            </h5>
                            <ul className="space-y-2">
                              {Object.entries(lever.impacts[leverPositions[lever.id] <= 50 ? 'depth' : 'breadth'] || lever.impacts.depth).map(([key, value], idx) => (
                                <li key={idx} className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="font-medium text-gray-800">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="border-l border-gray-200 pl-6">
                            <h5 className="text-xs font-medium text-gray-700 mb-3">Trade-off Analysis:</h5>
                            <p className="text-xs text-gray-600 mb-2">{lever.benefits}</p>
                            <p className="text-xs text-gray-500">{lever.tradeoffs}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Projected Outcomes */}
          <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
            <h4 className="text-sm font-medium mb-4">PROJECTED OUTCOMES (6-month projection)</h4>
            <div className="grid grid-cols-4 gap-6">
              {Object.entries(projectedOutcomes).map(([key, data]) => (
                <div key={key}>
                  <p className="text-xs text-gray-400 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-light">{data.projected}</span>
                    <span className="text-xs text-gray-400">
                      from {data.current}
                    </span>
                  </div>
                  <div className={`text-xs mt-1 ${data.change >= 0 ? 'text-gray-300' : 'text-gray-400'}`}>
                    {data.change >= 0 ? '+' : ''}{data.change}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Pre-configured Scenarios */}
      <div>
        <h3 className="text-lg font-light text-gray-900 mb-6">Pre-configured Strategic Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            const isSelected = selectedScenario === scenario.id;
            
            return (
              <motion.div
                key={scenario.id}
                whileHover={{ y: -2 }}
                onClick={() => loadScenario(scenario)}
              >
                <Card className={`bg-white border-2 cursor-pointer transition-all h-full ${
                  isSelected 
                    ? 'border-gray-900 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-xs text-gray-500">{scenario.timeframe}</span>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{scenario.name}</h4>
                    <p className="text-sm text-gray-600 italic mb-4">"{scenario.philosophy}"</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Lever Settings:</p>
                        <div className="space-y-1">
                          {Object.entries(scenario.leverSettings).map(([lever, value]) => (
                            <div key={lever} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 capitalize">{lever}:</span>
                              <span className="font-medium text-gray-800">{value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Expected Outcomes:</p>
                        <ul className="space-y-1">
                          {scenario.expectedOutcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-gray-400 text-xs">•</span>
                              <span className="text-xs text-gray-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Resources Required:</p>
                        <ul className="space-y-1">
                          {scenario.resources.map((resource, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-gray-400 text-xs">•</span>
                              <span className="text-xs text-gray-600">{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                      Load This Scenario →
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #1f2937;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #1f2937;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}