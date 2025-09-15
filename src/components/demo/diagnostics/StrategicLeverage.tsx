import React, { useState } from 'react';
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

  const handleLeverChange = (leverId: string, value: number) => {
    setLeverPositions(prev => ({
      ...prev,
      [leverId]: value
    }));
  };

  const calculateImpact = () => {
    const weights = {
      depth_vs_breadth: 0.25,
      problem_vs_solution: 0.2,
      velocity_vs_quality: 0.2,
      original_vs_curated: 0.15,
      niche_vs_broad: 0.2
    };

    return Object.entries(leverPositions).reduce((total, [lever, position]) => {
      return total + (position * weights[lever as keyof typeof weights]);
    }, 0);
  };

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-2xl font-light text-gray-900 mb-2">
          {strategic_leverage.section_header}
        </h1>
        <p className="text-gray-600">
          {strategic_leverage.section_subheader}
        </p>
      </div>

      {/* Executive Briefing */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-1 h-12 bg-gray-900 rounded-full flex-shrink-0" />
          <div>
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Key Finding
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {strategic_leverage.executive_briefing}
            </p>
          </div>
        </div>
      </div>

      {/* Lever Controls - Executive Style */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-900">Strategic Lever Controls</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Overall Impact:</span>
              <span className="text-lg font-light text-gray-900">{Math.round(calculateImpact())}%</span>
            </div>
          </div>

          <div className="space-y-6">
            {strategic_leverage.lever_controls.map((lever: any) => (
              <motion.div
                key={lever.id}
                className="border border-gray-200 rounded-lg p-4"
                whileHover={{ backgroundColor: '#fafafa' }}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedLever(expandedLever === lever.id ? null : lever.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                      <Sliders className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{lever.name}</h4>
                      <p className="text-xs text-gray-600">{lever.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedLever === lever.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
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
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {/* Slider */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>{lever.left_label}</span>
                            <span>{lever.right_label}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={leverPositions[lever.id]}
                            onChange={(e) => handleLeverChange(lever.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #374151 0%, #374151 ${leverPositions[lever.id]}%, #e5e7eb ${leverPositions[lever.id]}%, #e5e7eb 100%)`
                            }}
                          />
                          <div className="text-center text-sm font-medium text-gray-700 mt-2">
                            {leverPositions[lever.id]}%
                          </div>
                        </div>

                        {/* Impact Analysis */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 rounded p-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Benefits</p>
                            <p className="text-xs text-gray-600">{lever.benefits}</p>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Trade-offs</p>
                            <p className="text-xs text-gray-600">{lever.tradeoffs}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Strategic Scenarios - Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategic_leverage.strategic_scenarios.map((scenario: any) => (
          <Card 
            key={scenario.id}
            className={`bg-white border border-gray-200 cursor-pointer transition-all ${
              selectedScenario === scenario.id ? 'shadow-md border-gray-400' : 'hover:shadow-sm'
            }`}
            onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center">
                  {scenario.id === 'authority_focus' && <Target className="w-5 h-5 text-gray-600" />}
                  {scenario.id === 'velocity_focus' && <Zap className="w-5 h-5 text-gray-600" />}
                  {scenario.id === 'efficiency_focus' && <Activity className="w-5 h-5 text-gray-600" />}
                </div>
                <span className="text-xs text-gray-500">{scenario.timeframe}</span>
              </div>

              <h3 className="text-sm font-medium text-gray-900 mb-2">{scenario.name}</h3>
              <p className="text-xs text-gray-600 mb-4">{scenario.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Expected Growth</span>
                  <span className="font-medium text-gray-800">{scenario.metrics.growth}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Resource Need</span>
                  <span className="font-medium text-gray-800">{scenario.metrics.resources}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="font-medium text-gray-800">{scenario.metrics.risk}</span>
                </div>
              </div>

              {selectedScenario === scenario.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <p className="text-xs text-gray-600">{scenario.detailed_impact}</p>
                </motion.div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Impact Projections - Executive Dashboard */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Impact Projections</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {strategic_leverage.impact_projections.map((projection: any, idx: number) => (
              <div key={idx} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  {projection.value}
                </div>
                <p className="text-xs text-gray-600">{projection.metric}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {projection.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-gray-600" />
                  ) : projection.trend === 'down' ? (
                    <ArrowDownRight className="w-3 h-3 text-gray-600" />
                  ) : null}
                  <span className="text-xs text-gray-500">{projection.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Strategic Recommendations */}
      <Card className="bg-white border border-gray-200">
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Strategic Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Immediate Actions</h4>
              </div>
              <ul className="space-y-2">
                {strategic_leverage.recommendations.immediate_actions.map((action: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Strategic Shifts</h4>
              </div>
              <ul className="space-y-2">
                {strategic_leverage.recommendations.strategic_shifts.map((shift: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{shift}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-medium text-gray-800">Watch Points</h4>
              </div>
              <ul className="space-y-2">
                {strategic_leverage.recommendations.watch_points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #374151;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #374151;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}