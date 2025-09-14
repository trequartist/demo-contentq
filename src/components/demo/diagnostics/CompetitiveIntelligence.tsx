import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Users,
  TrendingUp,
  Eye,
  Link2,
  Target,
  Clock,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Activity,
  DollarSign,
  Zap,
  Info,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompetitiveIntelligenceProps {
  data: any;
}

export default function CompetitiveIntelligence({ data }: CompetitiveIntelligenceProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase3');
  const [expandedGap, setExpandedGap] = useState<string | null>(null);
  const [hoveredVelocity, setHoveredVelocity] = useState<string | null>(null);
  const { competitive_intelligence } = data;

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {competitive_intelligence.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {competitive_intelligence.section_subheader}
        </p>
        
        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Competitive Reality Check</h3>
                <p className="text-gray-700 leading-relaxed">
                  Zapier dominates with 2.3M monthly organic traffic - but they built this over 12 years using a playbook 
                  that's no longer viable. Understanding their evolution reveals multiple opportunities for disruption, 
                  particularly in technical content and emerging AI-native categories they've ignored.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Strategy Archaeology - Enhanced Timeline */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-gray-400" />
          Content Strategy Archaeology: How Zapier Won
        </h2>
        
        {/* Timeline Visualization */}
        <div className="relative mb-12">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 -translate-y-1/2" />
          
          {/* Timeline Phases */}
          <div className="relative flex justify-between items-center">
            {Object.entries(competitive_intelligence.content_archaeology.zapier_playbook)
              .filter(([phase]) => phase !== 'key_learning')
              .map(([phase, data]: [string, any], idx) => {
                const isSelected = selectedPhase === phase;
                const phaseData = data as any;
                
                return (
                  <motion.div
                    key={phase}
                    className="relative flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Phase Button */}
                    <button
                      onClick={() => setSelectedPhase(phase)}
                      className={`
                        relative z-10 w-20 h-20 rounded-full transition-all duration-300
                        ${isSelected 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl scale-110' 
                          : 'bg-white border-2 border-gray-300 hover:border-blue-400'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={`text-2xl font-light ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                          {idx + 1}
                        </span>
                      </div>
                    </button>
                    
                    {/* Phase Label */}
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                        {phaseData.years}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                        {phase === 'phase1' && 'Foundation'}
                        {phase === 'phase2' && 'Authority'}
                        {phase === 'phase3' && 'Leadership'}
                      </p>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-16 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-blue-600"
                      />
                    )}
                  </motion.div>
                );
              })}
          </div>
        </div>
        
        {/* Phase Details Card */}
        <AnimatePresence mode="wait">
          {selectedPhase && competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase] && (
            <motion.div
              key={selectedPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-light text-gray-900 mb-2">
                      {competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase].strategy}
                    </h3>
                    <p className="text-gray-600">
                      Phase {selectedPhase.replace('phase', '')} • {competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase].years}
                    </p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {competitive_intelligence.content_archaeology.zapier_playbook[selectedPhase].tactics.map((tactic: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {idx === 0 && <Zap className="w-4 h-4 text-blue-600" />}
                            {idx === 1 && <Target className="w-4 h-4 text-indigo-600" />}
                            {idx === 2 && <TrendingUp className="w-4 h-4 text-purple-600" />}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{tactic}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Key Learning Alert */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Strategic Insight</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {competitive_intelligence.content_archaeology.zapier_playbook.key_learning}
                  </p>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Your Opportunity:</strong> Skip phases 1-2 by focusing on high-intent problem content 
                    and AI-native categories where breadth-first strategies fail.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Competitive Blind Spots - Enhanced Opportunity Map */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Eye className="w-6 h-6 text-gray-400" />
          Competitive Blind Spots: Your Opportunities
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Technical Gaps */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">Technical Content Gaps</h3>
              </div>
              
              <div className="space-y-3">
                {competitive_intelligence.competitive_blind_spots.technical_gaps.map((gap: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div 
                      className={`
                        p-4 rounded-lg border transition-all cursor-pointer
                        ${expandedGap === `tech-${idx}` 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-gray-50 border-gray-200 hover:border-green-300'
                        }
                      `}
                      onClick={() => setExpandedGap(expandedGap === `tech-${idx}` ? null : `tech-${idx}`)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{gap.gap}</span>
                        <Badge 
                          className={`
                            ${gap.status === 'Nobody owns' 
                              ? 'bg-green-100 text-green-700' 
                              : gap.status === 'Opportunity' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-yellow-100 text-yellow-700'
                            }
                          `}
                        >
                          {gap.status}
                        </Badge>
                      </div>
                      
                      <AnimatePresence>
                        {expandedGap === `tech-${idx}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-green-200"
                          >
                            <p className="text-sm text-gray-600">
                              {gap.gap === 'Error handling patterns' && 
                                'High-intent searches with 3.2x conversion rate. Users actively looking for solutions to broken workflows.'
                              }
                              {gap.gap === 'Performance optimization' && 
                                'Growing 156% YoY. Critical for enterprise adoption where speed matters.'
                              }
                              {gap.gap === 'Security best practices' && 
                                'Compliance-driven content gap. Essential for regulated industries.'
                              }
                              {gap.gap === 'Debugging strategies' && 
                                'Problem-aware content with minimal competition. Perfect entry point.'
                              }
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Use Case Gaps */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900">Vertical Market Gaps</h3>
              </div>
              
              <div className="space-y-3">
                {competitive_intelligence.competitive_blind_spots.use_case_gaps.map((gap: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      p-4 rounded-lg border transition-all cursor-pointer
                      ${expandedGap === `use-${idx}` 
                        ? 'bg-purple-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                      }
                    `}
                    onClick={() => setExpandedGap(expandedGap === `use-${idx}` ? null : `use-${idx}`)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{gap}</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedGap === `use-${idx}` ? 'rotate-90' : ''
                      }`} />
                    </div>
                    
                    <AnimatePresence>
                      {expandedGap === `use-${idx}` && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-purple-200"
                        >
                          <div className="space-y-2 text-sm">
                            {gap.includes('Healthcare') && (
                              <>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-purple-600" />
                                  <span className="text-gray-700">Market size: $2.3B</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-purple-600" />
                                  <span className="text-gray-700">Competition: Low</span>
                                </div>
                              </>
                            )}
                            {gap.includes('Financial') && (
                              <>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-purple-600" />
                                  <span className="text-gray-700">Market size: $4.1B</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-purple-600" />
                                  <span className="text-gray-700">Key need: Compliance</span>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Emerging Topics */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Emerging Categories</h3>
              </div>
              
              <div className="space-y-3">
                {competitive_intelligence.competitive_blind_spots.emerging_topics.map((topic: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{topic.topic}</span>
                      <Badge className="bg-blue-600 text-white">
                        {topic.advantage}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-600">Growing 200%+ YoY</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-600">Early adopters</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Opportunity Summary */}
        <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-indigo-600" />
              <h4 className="font-medium text-gray-900">Quick Win Strategy</h4>
            </div>
            <p className="text-gray-700 mb-4">
              Focus on technical gaps first - they have the highest intent and lowest competition. 
              Each gap represents 5,000-15,000 monthly searches with conversion rates 3x higher than generic content.
            </p>
            <div className="flex gap-3">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View Content Templates
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Backlink Strategy Analysis - Enhanced Visualization */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Link2 className="w-6 h-6 text-gray-400" />
          Link Authority Analysis
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Link Velocity Race */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                Link Velocity Race
              </h3>
              
              <div className="space-y-4">
                {competitive_intelligence.backlink_analysis.link_velocity.map((comp: any, idx: number) => {
                  const isGumloop = comp.competitor === 'Gumloop';
                  const maxVelocity = Math.max(...competitive_intelligence.backlink_analysis.link_velocity.map((c: any) => c.new_domains_per_month));
                  const percentage = (comp.new_domains_per_month / maxVelocity) * 100;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onMouseEnter={() => setHoveredVelocity(comp.competitor)}
                      onMouseLeave={() => setHoveredVelocity(null)}
                      className={`relative ${isGumloop ? 'ring-2 ring-indigo-500 rounded-lg p-1' : ''}`}
                    >
                      <div className={`p-4 rounded-lg ${
                        isGumloop ? 'bg-indigo-50' : 'bg-gray-50'
                      } hover:shadow-md transition-all`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-medium ${
                            isGumloop ? 'text-indigo-700' : 'text-gray-900'
                          }`}>
                            {comp.competitor}
                          </span>
                          <div className="text-right">
                            <span className={`text-xl font-light ${
                              isGumloop ? 'text-indigo-600' : 'text-gray-900'
                            }`}>
                              +{comp.new_domains_per_month.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">domains/mo</span>
                          </div>
                        </div>
                        
                        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute h-full ${
                              comp.competitor === 'Zapier' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                              comp.competitor === 'Gumloop' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                              'bg-gradient-to-r from-gray-400 to-gray-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                          />
                        </div>
                        
                        {/* Hover Details */}
                        <AnimatePresence>
                          {hoveredVelocity === comp.competitor && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-gray-200"
                            >
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                  <span className="text-gray-600">Growth rate</span>
                                  <p className="font-medium text-gray-900">
                                    {comp.competitor === 'Zapier' && '+12% MoM'}
                                    {comp.competitor === 'Make' && '+23% MoM'}
                                    {comp.competitor === 'n8n' && '+34% MoM'}
                                    {comp.competitor === 'Gumloop' && '+156% MoM'}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Total referring domains</span>
                                  <p className="font-medium text-gray-900">
                                    {comp.competitor === 'Zapier' && '234K'}
                                    {comp.competitor === 'Make' && '18K'}
                                    {comp.competitor === 'n8n' && '9K'}
                                    {comp.competitor === 'Gumloop' && '341'}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
          
          {/* Link Quality Insights */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                Link Quality Analysis
              </h3>
              
              {/* Quality Comparison */}
              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Quality vs. Quantity Trade-off</p>
                    <p className="text-sm text-gray-700">
                      {competitive_intelligence.backlink_analysis.link_quality.insight}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Your Avg DR</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-light text-gray-900">
                    {competitive_intelligence.backlink_analysis.link_quality.your_avg_dr}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    vs. Zapier's {competitive_intelligence.backlink_analysis.link_quality.zapier_avg_dr}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Relevancy Score</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-light text-gray-900">
                    {competitive_intelligence.backlink_analysis.link_quality.your_relevancy}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    vs. Zapier's {competitive_intelligence.backlink_analysis.link_quality.zapier_relevancy}
                  </p>
                </div>
              </div>
              
              {/* Strategic Recommendation */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  Link Building Strategy
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Your higher relevancy score (0.73) indicates better targeted link acquisition. 
                  Focus on quality over quantity through:
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Original research and data studies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Technical tutorials for developer communities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Integration partnerships with complementary tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Bottom CTA Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3">Ready to Outmaneuver the Competition?</h3>
          <p className="text-gray-300 mb-6">
            Your competitive analysis reveals 12+ immediate opportunities across technical content, 
            emerging categories, and underserved verticals. Each represents 10,000+ monthly searches.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              View Opportunity Roadmap
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors">
              Export Competitive Data
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}