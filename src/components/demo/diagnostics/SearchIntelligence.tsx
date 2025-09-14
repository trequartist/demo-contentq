import React, { useState } from 'react';
import { Card, Badge, ProgressBar } from '@/components/ui';
import { 
  Search,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Target,
  Info,
  CheckCircle,
  XCircle,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchIntelligenceProps {
  data: any;
}

export default function SearchIntelligence({ data }: SearchIntelligenceProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredQuery, setHoveredQuery] = useState<string | null>(null);
  const { search_intelligence } = data;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Executive Briefing */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {search_intelligence.section_header}
        </h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          {search_intelligence.section_subheader}
        </p>
        
        {/* Data Sources */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <span className="font-medium">Data sources:</span>
          <div className="flex items-center gap-2">
            {search_intelligence.data_sources.map((source: string, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-300">•</span>}
                <span className="bg-gray-100 px-3 py-1 rounded-full">{source}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Executive Insight Box */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Strategic Insight</h3>
                <p className="text-gray-700 leading-relaxed">
                  {search_intelligence.search_landscape.insight}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Query Classification Analysis */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Search className="w-6 h-6 text-gray-400" />
          Search Landscape Overview
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(search_intelligence.search_landscape.query_classification).map(
            ([type, data]: [string, any]) => {
              const icon = type === 'problem_aware' ? AlertCircle : 
                          type === 'solution_aware' ? Target : 
                          Zap;
              const IconComponent = icon;
              const color = type === 'problem_aware' ? 'red' : 
                           type === 'solution_aware' ? 'blue' : 
                           'green';
              
              return (
                <Card key={type} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-1 bg-gradient-to-r from-${color}-500 to-${color}-600`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className={`w-5 h-5 text-${color}-600`} />
                          <h3 className="text-lg font-medium capitalize">
                            {type.replace(/_/g, ' ')} Searches
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 italic">{data.pattern}</p>
                      </div>
                      <Badge className={`bg-${color}-100 text-${color}-700 font-medium`}>
                        {data.percentage}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {data.examples.map((example: any, idx: number) => (
                        <motion.div 
                          key={idx}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredQuery(`${type}-${idx}`)}
                          onMouseLeave={() => setHoveredQuery(null)}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{example.query}</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {example.volume.toLocaleString()}{example.unit}
                            </span>
                          </div>
                          <AnimatePresence>
                            {hoveredQuery === `${type}-${idx}` && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 text-xs text-gray-600"
                              >
                                {type === 'problem_aware' && "High conversion intent - users experiencing pain"}
                                {type === 'solution_aware' && "Comparison stage - evaluating options"}
                                {type === 'feature_specific' && "Specific needs - ready to evaluate"}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            }
          )}
        </div>
      </section>

      {/* Technical SEO Audit */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Activity className="w-6 h-6 text-gray-400" />
          Technical SEO Audit
        </h2>

        {/* Overall Health Score */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gumloop Technical Health</h3>
                <p className="text-gray-600">Comprehensive analysis of technical SEO factors</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-gray-900">
                  {search_intelligence.technical_seo_audit.gumloop_health.overall_score}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  of {search_intelligence.technical_seo_audit.gumloop_health.max_score}
                </div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-700">
                  Needs Improvement
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Core Web Vitals */}
          <Card>
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-400" />
                Core Web Vitals
              </h4>
              <div className="space-y-4">
                {Object.entries(search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals).map(
                  ([metric, data]: [string, any]) => {
                    if (metric === 'mobile_score' || metric === 'desktop_score') return null;
                    
                    const isGood = data.status === 'Good';
                    const isNeedsImprovement = data.status === 'Needs improvement';
                    
                    return (
                      <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-sm uppercase">{metric}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold">
                              {data.value}{data.unit}
                            </span>
                            <Badge className={`text-xs ${
                              isGood ? 'bg-green-100 text-green-700' :
                              isNeedsImprovement ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {data.status}
                            </Badge>
                          </div>
                        </div>
                        {isGood ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    );
                  }
                )}
                
                {/* Mobile/Desktop Scores */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-light text-gray-900">
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.mobile_score}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Mobile Score</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-light text-gray-900">
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.desktop_score}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Desktop Score</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Crawlability & Indexation */}
          <Card>
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                Crawlability & Indexation
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Pages Indexed</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.current}/
                      {search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.total}
                    </span>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.percentage}%
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-600">Orphan Pages</span>
                  <span className="font-medium text-red-600">
                    {search_intelligence.technical_seo_audit.gumloop_health.crawlability.orphan_pages} detected
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-gray-600">Crawl Errors</span>
                  <span className="font-medium text-yellow-600">
                    {search_intelligence.technical_seo_audit.gumloop_health.crawlability.crawl_errors.soft_404s} soft 404s
                  </span>
                </div>
                
                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">XML Sitemap</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">
                        {search_intelligence.technical_seo_audit.gumloop_health.crawlability.sitemap.last_updated}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Robots.txt</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Properly configured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* On-Page Optimization */}
        <Card className="mt-6">
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-6">On-Page Optimization</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(search_intelligence.technical_seo_audit.gumloop_health.on_page).map(
                ([metric, data]: [string, any]) => {
                  if (metric === 'internal_linking') return null;
                  
                  const percentage = data.percentage;
                  const isGood = percentage >= 80;
                  const isMedium = percentage >= 50;
                  
                  return (
                    <div key={metric}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {metric.replace(/_/g, ' ')}
                        </span>
                        <span className={`font-semibold ${
                          isGood ? 'text-green-600' :
                          isMedium ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={percentage} 
                        max={100}
                        className="h-2"
                        indicatorClassName={
                          isGood ? 'bg-green-500' :
                          isMedium ? 'bg-yellow-500' :
                          'bg-red-500'
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {data.optimized || data.present || data.proper} of {data.total}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
            
            {/* Internal Linking Alert */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Internal Linking Issue</p>
                <p className="text-sm text-red-700">
                  Average {search_intelligence.technical_seo_audit.gumloop_health.on_page.internal_linking.avg_per_page} links per page - 
                  {' '}{search_intelligence.technical_seo_audit.gumloop_health.on_page.internal_linking.status}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Competitive Comparison */}
        <Card className="mt-6">
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-6">Competitive Technical Comparison</h4>
            <div className="space-y-4">
              {search_intelligence.technical_seo_audit.competitive_comparison.map((comp: any, idx: number) => {
                const isGumloop = comp.competitor === 'Gumloop';
                const scoreColor = comp.score >= 80 ? 'green' : 
                                 comp.score >= 60 ? 'yellow' : 'red';
                
                return (
                  <div key={idx} className={`${isGumloop ? 'ring-2 ring-purple-500 rounded-lg p-1' : ''}`}>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <span className={`text-sm font-medium w-24 ${isGumloop ? 'text-purple-700' : 'text-gray-700'}`}>
                        {comp.competitor}
                      </span>
                      <div className="flex-1">
                        <div className="relative">
                          <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full bg-gradient-to-r from-${scoreColor}-400 to-${scoreColor}-500`}
                              initial={{ width: 0 }}
                              animate={{ width: `${comp.score}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                            />
                          </div>
                          <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-semibold text-white">
                            {comp.score}/100
                          </span>
                        </div>
                      </div>
                      {comp.advantages.length > 0 && (
                        <div className="hidden lg:block max-w-xs">
                          <p className="text-xs text-gray-600">{comp.advantages[0]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </section>

      {/* SERP Feature Opportunities */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-gray-400" />
          SERP Feature Opportunities
        </h2>

        {/* Actionable Insight Alert */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Actionable Intelligence</h3>
                <p className="text-gray-700">
                  {search_intelligence.serp_features.actionable_insight}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {search_intelligence.serp_features.missing_features.map((feature: any, idx: number) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{feature.feature}</h4>
                    {feature.capture_rate !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-600">Your capture rate:</span>
                            <span className="font-semibold text-red-600">{feature.capture_rate}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature.competitor}:</span>
                            <span className="font-semibold text-green-600">{feature.competitor_rate}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {feature.status && (
                      <Badge className="mt-2 bg-gray-100 text-gray-700">{feature.status}</Badge>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Action Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="p-8">
          <h3 className="text-xl font-medium mb-3">Ready to Improve Your Search Visibility?</h3>
          <p className="text-gray-300 mb-6">
            Technical improvements alone could increase your organic traffic by 30-40% within 60 days.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              View Technical Fixes
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors">
              Download SEO Checklist
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}