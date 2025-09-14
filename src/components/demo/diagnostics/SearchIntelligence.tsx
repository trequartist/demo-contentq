import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar, Button } from '@/components/ui';
import { 
  Search,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BarChart3,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchIntelligenceProps {
  data: any;
}

export default function SearchIntelligence({ data }: SearchIntelligenceProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { search_intelligence } = data;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {search_intelligence.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {search_intelligence.section_subheader}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Data sources:</span>
          {search_intelligence.data_sources.map((source: string, idx: number) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>•</span>}
              <span>{source}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Query Classification Treemap */}
      <Card>
        <CardHeader>
          <CardTitle>Search Landscape Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(search_intelligence.search_landscape.query_classification).map(
              ([type, data]: [string, any]) => (
                <div key={type} className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium capitalize">
                      {type.replace(/_/g, ' ')} Searches
                    </h3>
                    <Badge className="bg-gray-100 text-gray-700">
                      {data.percentage}% of volume
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 italic mb-3">{data.pattern}</div>
                  <div className="space-y-2">
                    {data.examples.map((example: any, idx: number) => (
                      <div 
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => toggleSection(`${type}-${idx}`)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{example.query}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {example.volume.toLocaleString()}{example.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          
          {/* Insight Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-900">
                {search_intelligence.search_landscape.insight}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical SEO Audit */}
      <Card>
        <CardHeader>
          <CardTitle>Technical SEO Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Gumloop Technical Health */}
            <div>
              <h3 className="text-lg font-medium mb-4">Gumloop Technical Health</h3>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-light">
                    {search_intelligence.technical_seo_audit.gumloop_health.overall_score}
                  </span>
                  <span className="text-gray-500">/{search_intelligence.technical_seo_audit.gumloop_health.max_score}</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Needs Improvement
                </Badge>
              </div>

              {/* Core Web Vitals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">LCP</span>
                    <span className="text-sm font-medium">
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.lcp.value}
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.lcp.unit}
                    </span>
                  </div>
                  <Badge 
                    className={
                      search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.lcp.status === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.lcp.status}
                  </Badge>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">FID</span>
                    <span className="text-sm font-medium">
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.fid.value}
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.fid.unit}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.fid.status}
                  </Badge>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">CLS</span>
                    <span className="text-sm font-medium">
                      {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.cls.value}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {search_intelligence.technical_seo_audit.gumloop_health.core_web_vitals.cls.status}
                  </Badge>
                </div>
              </div>

              {/* Crawlability & On-Page */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Crawlability & Indexation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pages Indexed</span>
                      <span className="font-medium">
                        {search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.current}/
                        {search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.total} 
                        ({search_intelligence.technical_seo_audit.gumloop_health.crawlability.pages_indexed.percentage}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Orphan Pages</span>
                      <span className="font-medium text-red-600">
                        {search_intelligence.technical_seo_audit.gumloop_health.crawlability.orphan_pages} detected
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Crawl Errors</span>
                      <span className="font-medium text-yellow-600">
                        {search_intelligence.technical_seo_audit.gumloop_health.crawlability.crawl_errors.soft_404s} soft 404s
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">On-Page Optimization</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Title Tags</span>
                        <span className="font-medium">
                          {search_intelligence.technical_seo_audit.gumloop_health.on_page.title_tags.percentage}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={search_intelligence.technical_seo_audit.gumloop_health.on_page.title_tags.percentage} 
                        max={100}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Meta Descriptions</span>
                        <span className="font-medium">
                          {search_intelligence.technical_seo_audit.gumloop_health.on_page.meta_descriptions.percentage}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={search_intelligence.technical_seo_audit.gumloop_health.on_page.meta_descriptions.percentage} 
                        max={100}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">H1 Usage</span>
                        <span className="font-medium">
                          {search_intelligence.technical_seo_audit.gumloop_health.on_page.h1_usage.percentage}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={search_intelligence.technical_seo_audit.gumloop_health.on_page.h1_usage.percentage} 
                        max={100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Comparison */}
            <div>
              <h3 className="text-lg font-medium mb-4">Competitive Technical Comparison</h3>
              <div className="space-y-3">
                {search_intelligence.technical_seo_audit.competitive_comparison.map((comp: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-24">{comp.competitor}</span>
                    <div className="flex-1">
                      <ProgressBar 
                        value={comp.score} 
                        max={100}
                        className="h-6"
                        showLabel
                      />
                    </div>
                    {comp.advantages.length > 0 && (
                      <div className="text-xs text-gray-500 hidden md:block">
                        {comp.advantages[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SERP Feature Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>SERP Feature Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {search_intelligence.serp_features.missing_features.map((feature: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{feature.feature}</h4>
                  {feature.capture_rate !== undefined && (
                    <div className="text-sm">
                      <span className="text-red-600 font-medium">{feature.capture_rate}%</span>
                      <span className="text-gray-500"> vs </span>
                      <span className="text-green-600 font-medium">{feature.competitor} {feature.competitor_rate}%</span>
                    </div>
                  )}
                  {feature.status && (
                    <Badge className="bg-gray-200 text-gray-700">{feature.status}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-900">
                {search_intelligence.serp_features.actionable_insight}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}