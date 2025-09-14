import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { 
  Sliders,
  TrendingUp,
  Clock,
  Users,
  ChevronRight,
  Zap,
  Target,
  BookOpen,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {strategic_leverage.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {strategic_leverage.section_subheader}
        </p>
      </div>

      {/* Pre-built Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-built Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {strategic_leverage.scenarios.map((scenario: any, idx: number) => (
              <Button
                key={idx}
                variant={selectedScenario === scenario.name ? 'primary' : 'secondary'}
                onClick={() => loadScenario(scenario.name)}
                className="h-auto py-4 px-4 justify-start"
              >
                <div className="text-left">
                  <h4 className="font-medium mb-1">{scenario.name}</h4>
                  <p className="text-xs opacity-70">{scenario.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Levers */}
      <div className="space-y-6">
        {strategic_leverage.levers.map((lever: any) => (
          <Card key={lever.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedLever(expandedLever === lever.id ? null : lever.id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  {getLeverIcon(lever.id)}
                  {lever.name}
                </CardTitle>
                <ChevronRight 
                  className={`w-5 h-5 transition-transform ${
                    expandedLever === lever.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </CardHeader>
            <CardContent>
              {/* Lever Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {lever.id === 'depth_vs_breadth' && 'Breadth'}
                    {lever.id === 'problem_vs_solution' && 'Solution'}
                    {lever.id === 'velocity_vs_quality' && 'Velocity'}
                    {lever.id === 'original_vs_curated' && 'Curated'}
                    {lever.id === 'niche_vs_broad' && 'Broad'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {lever.id === 'depth_vs_breadth' && 'Depth'}
                    {lever.id === 'problem_vs_solution' && 'Problem'}
                    {lever.id === 'velocity_vs_quality' && 'Quality'}
                    {lever.id === 'original_vs_curated' && 'Original'}
                    {lever.id === 'niche_vs_broad' && 'Niche'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={leverPositions[lever.id]}
                  onChange={(e) => handleLeverChange(lever.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    Current: {leverPositions[lever.id]}%
                  </span>
                </div>
              </div>

              {/* Impact Preview */}
              <motion.div
                initial={false}
                animate={{ height: expandedLever === lever.id ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t">
                  {/* Show different impacts based on lever position */}
                  {leverPositions[lever.id] > 50 && lever.if_pull_toward_depth && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">
                        If You Pull Toward {lever.id === 'depth_vs_breadth' ? 'Depth' : 
                                           lever.id === 'problem_vs_solution' ? 'Problems' :
                                           lever.id === 'velocity_vs_quality' ? 'Quality' :
                                           lever.id === 'original_vs_curated' ? 'Original' :
                                           'Niche'}
                      </h4>
                      
                      {/* Impact Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(lever.if_pull_toward_depth.impact || {}).map(([metric, value]) => (
                          <div key={metric} className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">{metric.replace(/_/g, ' ')}</p>
                            <p className="text-lg font-medium text-green-700">{value as string}</p>
                          </div>
                        ))}
                      </div>

                      {/* Trade-offs */}
                      {lever.if_pull_toward_depth.tradeoff && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Trade-off:</strong> {
                              typeof lever.if_pull_toward_depth.tradeoff === 'string' 
                                ? lever.if_pull_toward_depth.tradeoff
                                : Object.entries(lever.if_pull_toward_depth.tradeoff)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(', ')
                            }
                          </p>
                        </div>
                      )}

                      {/* Timeline & Resources */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{lever.if_pull_toward_depth.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{lever.if_pull_toward_depth.resource_need}</span>
                        </div>
                      </div>

                      {/* Detailed Analysis */}
                      {lever.if_pull_toward_depth.detailed_analysis && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {lever.if_pull_toward_depth.detailed_analysis}
                          </p>
                        </div>
                      )}

                      {/* Examples */}
                      {lever.if_pull_toward_depth.examples && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Examples:</h5>
                          <div className="flex flex-wrap gap-2">
                            {lever.if_pull_toward_depth.examples.map((example: string, idx: number) => (
                              <Badge key={idx} className="bg-gray-100 text-gray-700">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Niche Options */}
                      {lever.if_niche_down && lever.if_niche_down.niche_options && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Niche Options:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {lever.if_niche_down.niche_options.map((niche: any, idx: number) => (
                              <div key={idx} className="p-3 bg-white border rounded-lg">
                                <h6 className="font-medium text-sm">{niche.niche}</h6>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                                  <span>Searches: {niche.searches}</span>
                                  {niche.competition && <span>Competition: {niche.competition}</span>}
                                  {niche.value && <span>Value: {niche.value}</span>}
                                  {niche.audience && <span>Audience: {niche.audience}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Show velocity impact if relevant */}
                  {lever.if_increase_velocity && leverPositions[lever.id] < 50 && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">If You Increase Velocity</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(lever.if_increase_velocity.impact || {}).map(([metric, value]) => (
                          <div key={metric} className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">{metric.replace(/_/g, ' ')}</p>
                            <p className="text-lg font-medium text-blue-700">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Research Opportunities */}
                  {lever.if_increase_original && lever.if_increase_original.research_opportunities && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Research Opportunities:</h5>
                      <ul className="space-y-1">
                        {lever.if_increase_original.research_opportunities.map((opp: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Projected Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">6-Month Projection</h4>
              <p className="text-sm text-gray-600 mt-1">
                Based on current lever settings
              </p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Key Metrics</h4>
              <p className="text-sm text-gray-600 mt-1">
                Authority, traffic, conversions
              </p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Resource Needs</h4>
              <p className="text-sm text-gray-600 mt-1">
                Team, time, expertise required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}