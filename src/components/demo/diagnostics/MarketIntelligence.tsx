import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { 
  Users,
  TrendingUp,
  MessageSquare,
  Search,
  Calendar,
  ArrowRight,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketIntelligenceProps {
  data: any;
}

export default function MarketIntelligence({ data }: MarketIntelligenceProps) {
  const { market_intelligence } = data;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {market_intelligence.section_header}
        </h2>
        <p className="text-lg text-gray-600">
          {market_intelligence.section_subheader}
        </p>
      </div>

      {/* User Journey Mapping - Sankey Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Typical Journey to Gumloop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {market_intelligence.user_journey.typical_paths.map((path: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-8 bg-gradient-to-r from-blue-100 to-blue-500 rounded"
                      style={{ width: `${path.percentage * 3}px` }}
                    />
                    <span className="text-sm font-medium">{path.source}</span>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-700">
                  {path.percentage}%
                </Badge>
              </motion.div>
            ))}
            
            {/* Journey Insight */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                {market_intelligence.user_journey.journey_insight}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Community Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Data Sources */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Data sources:</span>
              {market_intelligence.community_intelligence.data_sources.map((source: string, idx: number) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>•</span>}
                  <span>{source}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Sentiment Evolution */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Sentiment Evolution ({market_intelligence.community_intelligence.sentiment_evolution[0].period})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {market_intelligence.community_intelligence.sentiment_evolution.map((sentiment: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{sentiment.topic}</span>
                      <Badge className={
                        parseInt(sentiment.trend) > 300 ? 'bg-red-100 text-red-700' :
                        parseInt(sentiment.trend) > 200 ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }>
                        {sentiment.trend}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-full rounded-full ${
                            parseInt(sentiment.trend) > 300 ? 'bg-red-500' :
                            parseInt(sentiment.trend) > 200 ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(parseInt(sentiment.trend) / 6, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verbatim Quotes */}
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Verbatim Intelligence</h3>
              <div className="space-y-3">
                {market_intelligence.community_intelligence.verbatim_quotes.map((quote: string, idx: number) => (
                  <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-700 italic">{quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Query Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Query Evolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
              
              {/* 2023 */}
              <div className="relative flex items-start gap-4 mb-6">
                <div className="relative z-10 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Historical Queries</h4>
                  <div className="flex flex-wrap gap-2">
                    {market_intelligence.search_query_evolution['2023_queries'].map((query: string, idx: number) => (
                      <Badge key={idx} className="bg-gray-100 text-gray-700">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2024 */}
              <div className="relative flex items-start gap-4 mb-6">
                <div className="relative z-10 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-medium">2024</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Current Queries</h4>
                  <div className="flex flex-wrap gap-2">
                    {market_intelligence.search_query_evolution['2024_queries'].map((query: string, idx: number) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2025 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-medium">2025</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Emerging Queries</h4>
                  <div className="flex flex-wrap gap-2">
                    {market_intelligence.search_query_evolution['2025_emerging'].map((query: string, idx: number) => (
                      <Badge key={idx} className="bg-green-100 text-green-700">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Insight */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Predictive Intelligence</p>
                  <p className="text-sm text-blue-800">
                    {market_intelligence.search_query_evolution.predictive_insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}