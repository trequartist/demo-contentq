import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
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
  Code2
} from 'lucide-react';

interface DataTransparencyProps {
  data: any;
}

export default function DataTransparency({ data }: DataTransparencyProps) {
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

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {data_transparency.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {data_transparency.section_subheader}
        </p>
      </div>

      {/* Data Collection Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Data Collection Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Primary Collection Period</h4>
              <p className="text-lg text-blue-700">{data_transparency.collection_timeline.primary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(data_transparency.collection_timeline.frequency).map(([freq, desc]) => (
                <div key={freq} className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-medium capitalize mb-1">{freq} Updates</h5>
                  <p className="text-sm text-gray-600">{desc as string}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sources and Sample Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(data_transparency.sources_and_samples).map(([category, sources]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                {category.replace(/_/g, ' ').toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(sources as any).map(([source, detail]) => (
                  <div key={source} className="border-l-2 border-gray-200 pl-3">
                    <h5 className="text-sm font-medium capitalize">
                      {source.replace(/_/g, ' ')}
                    </h5>
                    <p className="text-xs text-gray-600">{detail as string}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confidence Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Confidence Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(data_transparency.confidence_levels).map(([level, data]: [string, any]) => {
              const color = getConfidenceColor(level);
              
              return (
                <div key={level} className={`p-4 bg-${color}-50 rounded-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-medium text-${color}-900 capitalize`}>
                      {level.replace(/_/g, ' ')}
                    </h4>
                    <Badge className={`bg-${color}-100 text-${color}-700`}>
                      {data.threshold}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {data.includes.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 bg-${color}-600 rounded-full`} />
                        <span className={`text-${color}-800`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {export_options.map((option: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {getExportIcon(option.format)}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{option.format}</h5>
                    <p className="text-xs text-gray-600">{option.description}</p>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="mt-3 text-xs"
                    >
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements Note */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Available Interactions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Drill-down capability: Every metric expandable for details
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Scenario modeling: Adjust strategies to see projections
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Competitive toggles: Show/hide competitor data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Time-range selector: View trends over different periods
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Confidence indicators: See data reliability for each metric
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Collaboration Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  Annotation system: Add notes to any section
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  Share specific insights: Deep-link to findings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  Progress tracking: Monitor improvement over time
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  Comparison mode: Before/after analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  Team workspace: Shared strategic planning
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}