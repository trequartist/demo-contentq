import React from 'react';
import { Card, CardContent, Badge, ProgressBar } from '@/components/ui';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Brain, 
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

interface ExecutiveSummaryProps {
  data: any;
}

export default function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const { executive_summary, data_sources, analysis_period } = data;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/20 to-transparent animate-gradient" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl font-light text-gray-900 mb-2">
              {executive_summary.headline}
            </h1>
            <p className="text-xl text-gray-600 italic">
              {executive_summary.subheadline}
            </p>
          </motion.div>

          {/* Data Sources Badge Strip */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 overflow-x-auto"
          >
            <div className="flex gap-3 pb-2 min-w-max">
              {data_sources.map((source: any, idx: number) => (
                <Badge 
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 py-2 text-sm flex items-center gap-2"
                >
                  <span className="text-lg">{source.icon}</span>
                  <span className="font-medium">{source.source}</span>
                  <span className="text-gray-500">• {source.description}</span>
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Key Finding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {executive_summary.key_finding}
            </p>
          </motion.div>

          {/* Performance Snapshot */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {Object.entries(executive_summary.performance_snapshot).map(([key, metric]: [string, any]) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {key === 'search_visibility' && <Search className="w-5 h-5 text-gray-600" />}
                    {key === 'ai_discoverability' && <Brain className="w-5 h-5 text-gray-600" />}
                    {key === 'technical_excellence' && <BarChart3 className="w-5 h-5 text-gray-600" />}
                    {key === 'market_penetration' && <Target className="w-5 h-5 text-gray-600" />}
                  </div>
                  <span className="text-3xl font-light text-gray-900">
                    {metric.score}{metric.unit || ''}/{metric.max || ''}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-xs text-gray-500">{metric.label}</p>
                {metric.max && (
                  <div className="mt-3">
                    <ProgressBar 
                      value={metric.score} 
                      max={metric.max}
                      className="h-2"
                      indicatorClassName={
                        metric.score >= 70 ? 'bg-green-500' :
                        metric.score >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Analysis Period */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Calendar className="w-4 h-4" />
            <span>Analysis period: {analysis_period.start} to {analysis_period.end}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}