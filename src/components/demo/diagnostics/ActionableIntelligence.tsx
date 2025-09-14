import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, ProgressBar } from '@/components/ui';
import { 
  Target,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ActionableIntelligenceProps {
  data: any;
}

export default function ActionableIntelligence({ data }: ActionableIntelligenceProps) {
  const [selectedPath, setSelectedPath] = useState<string>('depth_builder');
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
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {actionable_intelligence.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {actionable_intelligence.section_subheader}
        </p>
      </div>

      {/* Strategic Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionable_intelligence.strategic_paths.map((path: any) => {
          const color = getPathColor(path.id);
          const isSelected = selectedPath === path.id;
          
          return (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? `ring-2 ring-${color}-500 border-${color}-500` 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-3`}>
                    <div className={`text-${color}-600`}>
                      {getPathIcon(path.id)}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{path.name}</CardTitle>
                  <p className="text-sm text-gray-600 italic mt-1">{path.philosophy}</p>
                </CardHeader>
                <CardContent>
                  {/* Quick Metrics Preview */}
                  <div className="space-y-3">
                    {Object.entries(path.metrics_impact).slice(0, 2).map(([metric, data]: [string, any]) => (
                      <div key={metric}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">{metric.replace(/_/g, ' ')}</span>
                          <span className={`font-medium text-${color}-600`}>{data.change}</span>
                        </div>
                        <ProgressBar 
                          value={parseInt(data.change)} 
                          max={100}
                          className="h-2"
                          indicatorClassName={`bg-${color}-500`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <Button 
                        size="sm" 
                        className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white`}
                      >
                        View Detailed Plan
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Path Details */}
      {selectedPath && (
        <motion.div
          key={selectedPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {actionable_intelligence.strategic_paths.map((path: any) => {
            if (path.id !== selectedPath) return null;
            const color = getPathColor(path.id);
            
            return (
              <Card key={path.id} className="overflow-hidden">
                <div className={`h-2 bg-${color}-500`} />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                      <div className={`text-${color}-600`}>
                        {getPathIcon(path.id)}
                      </div>
                    </div>
                    <div>
                      <CardTitle>{path.name} - Detailed Strategy</CardTitle>
                      <p className="text-sm text-gray-600">{path.philosophy}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Metrics Impact */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4">Expected Impact</h3>
                      <div className="space-y-4">
                        {Object.entries(path.metrics_impact).map(([metric, data]: [string, any]) => (
                          <div key={metric} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium capitalize">
                                {metric.replace(/_/g, ' ')}
                              </span>
                              <Badge className={`bg-${color}-100 text-${color}-700`}>
                                {data.change}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{data.timeline}</span>
                            </div>
                            {data.position && (
                              <div className="mt-2 text-sm text-gray-600">
                                Target: {data.position}
                              </div>
                            )}
                            {data.achieved !== undefined && (
                              <div className="mt-2 flex items-center gap-2 text-sm">
                                <CheckCircle className={`w-4 h-4 text-${color}-600`} />
                                <span>Achievement expected</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resource Requirements */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4">Resource Requirements</h3>
                      <div className="space-y-3">
                        {path.resource_requirements.map((req: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>

                      {/* Success Indicators */}
                      {path.success_indicators && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 mb-3">Success Indicators</h4>
                          <div className="space-y-2">
                            {path.success_indicators.map((indicator: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className={`w-2 h-2 bg-${color}-500 rounded-full`} />
                                <span className="text-gray-600">{indicator}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      )}

      {/* Success Tracking Framework */}
      <Card>
        <CardHeader>
          <CardTitle>Success Tracking Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primary KPIs */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Primary KPIs (Based on chosen path)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(actionable_intelligence.success_tracking.primary_kpis).map(
                  ([pathId, kpis]: [string, any]) => {
                    const color = getPathColor(pathId);
                    const path = actionable_intelligence.strategic_paths.find((p: any) => p.id === pathId);
                    
                    return (
                      <div 
                        key={pathId}
                        className={`p-4 rounded-lg border ${
                          selectedPath === pathId 
                            ? `bg-${color}-50 border-${color}-200` 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <h4 className="font-medium text-sm mb-2">{path?.name}</h4>
                        <ul className="space-y-1">
                          {kpis.map((kpi: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              {kpi}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Secondary KPIs */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Universal KPIs</h3>
              <div className="flex flex-wrap gap-2">
                {actionable_intelligence.success_tracking.secondary_kpis.map((kpi: string, idx: number) => (
                  <Badge key={idx} className="bg-gray-100 text-gray-700">
                    {kpi}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Leading Indicators */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Leading Indicators (Weekly tracking)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {actionable_intelligence.success_tracking.leading_indicators.map((indicator: string, idx: number) => (
                  <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg text-center">
                    <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">{indicator}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}