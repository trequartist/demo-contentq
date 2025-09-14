import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar } from '@/components/ui';
import { 
  Users,
  TrendingUp,
  Eye,
  Link2,
  Target,
  Clock,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CompetitiveIntelligenceProps {
  data: any;
}

export default function CompetitiveIntelligence({ data }: CompetitiveIntelligenceProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase3');
  const { competitive_intelligence } = data;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {competitive_intelligence.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {competitive_intelligence.section_subheader}
        </p>
      </div>

      {/* Content Strategy Archaeology - Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Zapier's Playbook (Deconstructed)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {Object.entries(competitive_intelligence.content_archaeology.zapier_playbook).map(([phase, data]: [string, any]) => (
                phase !== 'key_learning' && (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhase(phase)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedPhase === phase
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {data.years}
                  </button>
                )
              ))}
            </div>

            {/* Phase Details */}
            <motion.div
              key={selectedPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              {selectedPhase && competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase] && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase].strategy}
                  </h3>
                  <ul className="space-y-2">
                    {competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase].tactics.map((tactic: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                        {tactic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Key Learning */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Key Learning</p>
                  <p className="text-sm text-amber-800">
                    {competitive_intelligence.content_archaeology.zapier_playbook.key_learning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Blind Spots - Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Competitive Blind Spots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Gaps */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Technical Gaps</h3>
              <div className="space-y-2">
                {competitive_intelligence.competitive_blind_spots.technical_gaps.map((gap: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{gap.gap}</span>
                      <Badge 
                        className={
                          gap.status === 'Nobody owns' ? 'bg-green-100 text-green-700' :
                          gap.status === 'Opportunity' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {gap.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Case Gaps */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Use Case Gaps</h3>
              <div className="space-y-2">
                {competitive_intelligence.competitive_blind_spots.use_case_gaps.map((gap: string, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm">{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Topics */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Emerging Topics</h3>
              <div className="space-y-2">
                {competitive_intelligence.competitive_blind_spots.emerging_topics.map((topic: any, idx: number) => (
                  <div key={idx} className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic.topic}</span>
                      <Badge className="bg-blue-100 text-blue-700">
                        {topic.advantage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backlink Strategy Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Backlink Strategy Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Link Velocity Comparison */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Link Velocity Comparison</h3>
              <div className="space-y-3">
                {competitive_intelligence.backlink_analysis.link_velocity.map((comp: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-24">{comp.competitor}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          +{comp.new_domains_per_month.toLocaleString()} domains/month
                        </span>
                      </div>
                      <ProgressBar 
                        value={Math.min(comp.new_domains_per_month / 30, 100)} 
                        max={100}
                        className="h-4"
                        indicatorClassName={
                          comp.competitor === 'Zapier' ? 'bg-red-500' :
                          comp.competitor === 'Gumloop' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link Quality Analysis */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-2">Link Quality Insight</p>
                  <p className="text-sm text-blue-800">
                    {competitive_intelligence.backlink_analysis.link_quality.insight}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-white/50 rounded p-2">
                      <p className="text-xs text-gray-600">Your Average DR</p>
                      <p className="text-lg font-medium">{competitive_intelligence.backlink_analysis.link_quality.your_avg_dr}</p>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <p className="text-xs text-gray-600">Your Relevancy</p>
                      <p className="text-lg font-medium">{competitive_intelligence.backlink_analysis.link_quality.your_relevancy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}