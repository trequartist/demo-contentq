"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  BarChart3,
  CheckCircle,
  Zap,
  Sparkles,
  MessageSquare,
  Globe,
  Database,
  Activity,
  ChevronRight,
  Play,
  Star,
  Award,
  Clock,
  DollarSign,
  Eye,
  Search,
  Lightbulb,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '@/components/ui';
import Link from 'next/link';

export default function ContentQOverviewPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Content Intelligence</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              How ContentQ Builds Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Visibility</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your buyers are asking AI assistants, not search engines. 
              <span className="font-semibold text-gray-900">67% of B2B buyers</span> now start with AI tools. 
              Is your brand showing up in AI responses?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/demo/creator?tab=diagnostics">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3"
                >
                  Start Your Visibility Audit
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* AI Assistant Icons Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center items-center gap-8 mt-16"
          >
            {[
              { icon: MessageSquare, name: 'ChatGPT', color: 'text-green-600' },
              { icon: Brain, name: 'Claude', color: 'text-orange-600' },
              { icon: Globe, name: 'Perplexity', color: 'text-blue-600' },
              { icon: Sparkles, name: 'Gemini', color: 'text-purple-600' }
            ].map((ai, idx) => (
              <motion.div
                key={ai.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                  <ai.icon className={`w-8 h-8 ${ai.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{ai.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The AI Citation Gap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While your competitors dominate search results, AI assistants are becoming the new discovery channel. 
              Most brands are invisible to AI systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '67%',
                label: 'of B2B buyers start with AI tools',
                description: 'Traditional SEO is no longer enough'
              },
              {
                stat: '4%',
                label: 'average AI mention rate',
                description: 'Most brands are invisible to AI'
              },
              {
                stat: '3.2x',
                label: 'higher conversion intent',
                description: 'AI-driven traffic converts better'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gray-900 mb-2">{item.stat}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{item.label}</div>
                <div className="text-gray-600">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Getting Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ContentQ transforms your content strategy in two simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white border border-gray-200 p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Step 1: Discover Your AI Visibility</h3>
                    <p className="text-gray-600">Instant AI visibility audit across ChatGPT, Claude, Perplexity, Gemini</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">AI Visibility Score</span>
                    <span className="text-2xl font-bold text-gray-900">23/100</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '23%' }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Critical - Immediate action needed</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Comprehensive AI platform testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Competitive analysis & benchmarking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Detailed gap analysis report</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white border border-gray-200 p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Step 2: Get Your Action Plan</h3>
                    <p className="text-gray-600">AI-powered strategy tailored to your market position</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Strategic Priority</span>
                    <span className="text-lg font-bold text-purple-600">Problem-Solving Hub</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Focus on troubleshooting content to capture high-intent traffic with 3.2x conversion rates
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Prioritized content recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">AI-optimized content templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Implementation roadmap & timeline</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help You Execute */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How We Help You Execute
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three ways we work with you to build AI visibility
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Tell You What to Post',
                description: 'AI-powered content calendar with topic recommendations and AI impact scores',
                features: [
                  'Topic recommendations with AI visibility scores',
                  'Optimal publishing schedule',
                  'Content angle suggestions',
                  'Competitive gap analysis'
                ],
                color: 'blue'
              },
              {
                icon: FileText,
                title: 'Help You Create Content',
                description: 'AI + Human collaboration: We draft, you refine with your expertise',
                features: [
                  'AI-generated first drafts',
                  'Expert editing interface',
                  'Brand voice optimization',
                  'SEO & AI optimization'
                ],
                color: 'green'
              },
              {
                icon: BarChart3,
                title: 'Show What\'s Working',
                description: 'Track AI visibility growth and content ROI with detailed analytics',
                features: [
                  'AI mention tracking',
                  'Content performance metrics',
                  'ROI measurement',
                  'Optimization recommendations'
                ],
                color: 'purple'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Card className="bg-white border border-gray-200 p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  
                  <div className="space-y-3">
                    {item.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Human Partnership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The AI-Human Partnership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine AI efficiency with human expertise for maximum impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* AI Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Handles</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    'Research & data analysis',
                    'First draft generation',
                    'SEO optimization',
                    'Performance tracking',
                    'Competitive monitoring'
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Human Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">You Handle</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    'Strategic input & direction',
                    'Expert editing & refinement',
                    'Brand voice & messaging',
                    'Final approval & publishing',
                    'Customer feedback integration'
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Workflow */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined process that builds AI visibility systematically
            </p>
          </motion.div>

          <div className="relative">
            {/* Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { icon: Search, title: 'Research', description: 'AI analyzes market gaps and opportunities' },
                { icon: Target, title: 'Strategy', description: 'Prioritized content plan with AI impact scores' },
                { icon: FileText, title: 'Creation', description: 'AI drafts, you refine with expertise' },
                { icon: BarChart3, title: 'Analytics', description: 'Track AI mentions and performance' },
                { icon: RefreshCw, title: 'Iterate', description: 'Optimize based on data and feedback' }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  
                  {/* Arrow */}
                  {idx < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 transform translate-x-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Happens After Onboarding?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your journey to AI visibility with measurable milestones
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
            
            <div className="space-y-12">
              {[
                {
                  time: 'Week 1',
                  title: 'Visibility Audit Complete',
                  description: 'Comprehensive AI visibility analysis across all platforms',
                  icon: CheckCircle,
                  color: 'green'
                },
                {
                  time: 'Week 2',
                  title: 'First Content Published',
                  description: 'AI-optimized content goes live with tracking enabled',
                  icon: FileText,
                  color: 'blue'
                },
                {
                  time: 'Month 1',
                  title: 'AI Mentions Begin Appearing',
                  description: 'First citations in AI responses with measurable impact',
                  icon: MessageSquare,
                  color: 'purple'
                },
                {
                  time: 'Month 3',
                  title: 'Measurable Visibility Lift',
                  description: 'Significant improvement in AI mention rates and organic traffic',
                  icon: TrendingUp,
                  color: 'orange'
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative flex items-center gap-8"
                >
                  <div className={`w-16 h-16 bg-${milestone.color}-100 rounded-full flex items-center justify-center relative z-10`}>
                    <milestone.icon className={`w-8 h-8 text-${milestone.color}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-gray-500">{milestone.time}</span>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Own Your AI Presence?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies building AI visibility before their competitors catch up
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/demo/creator?tab=diagnostics">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  Start Your Visibility Audit
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}