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
  ArrowUpRight,
  RefreshCw,
  BookOpen,
  Settings,
  Monitor
} from 'lucide-react';
import { Card } from '@/components/ui';
import Link from 'next/link';

export default function ContentQOverviewPage() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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

  const productSteps = [
    {
      id: 1,
      title: "Discover",
      subtitle: "AI Visibility Audit",
      description: "Comprehensive analysis across ChatGPT, Claude, Perplexity, and Gemini",
      icon: Search,
      color: "blue",
      features: [
        "AI mention rate analysis",
        "Competitive benchmarking", 
        "Gap identification",
        "Platform-specific insights"
      ]
    },
    {
      id: 2,
      title: "Plan",
      subtitle: "Strategic Playbook",
      description: "AI-powered content strategy tailored to your market position",
      icon: Target,
      color: "purple",
        features: [
        "Content calendar generation",
        "Topic prioritization",
        "AI optimization scores",
        "Implementation roadmap"
      ]
    },
    {
      id: 3,
      title: "Create",
      subtitle: "AI-Assisted Content",
      description: "Human-AI collaboration for maximum impact and efficiency",
      icon: FileText,
      color: "green",
        features: [
        "AI-generated first drafts",
        "Expert editing interface",
        "Brand voice optimization",
        "Performance tracking"
      ]
    }
  ];

  const platforms = [
    { name: 'ChatGPT', icon: MessageSquare, color: 'text-green-600' },
    { name: 'Claude', icon: Brain, color: 'text-orange-600' },
    { name: 'Perplexity', icon: Globe, color: 'text-blue-600' },
    { name: 'Gemini', icon: Sparkles, color: 'text-purple-600' }
  ];

  const results = [
    {
      metric: "AI Visibility Score",
      before: "23/100",
      after: "78/100",
      improvement: "+55 points",
      description: "From invisible to authoritative"
    },
    {
      metric: "AI Mentions",
      before: "4%",
      after: "67%",
      improvement: "+63%",
      description: "Competitive visibility achieved"
    },
    {
      metric: "Content ROI",
      before: "2.1x",
      after: "8.4x",
      improvement: "+6.3x",
      description: "AI-optimized content performance"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
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
              <span className="text-blue-600"> AI Visibility</span>
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

          {/* Platform Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center items-center gap-8 mt-16"
          >
            {platforms.map((platform, idx) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                  <platform.icon className={`w-8 h-8 ${platform.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{platform.name}</span>
              </motion.div>
            ))}
          </motion.div>
                </div>
      </section>

      {/* Product Flow Section */}
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
              Your AI Visibility Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your content from invisible to authoritative
            </p>
        </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {productSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative group"
              >
                <Card className="bg-white border border-gray-200 p-8 h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                      {step.id}
                  </div>
                </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-${step.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>

                  {/* Content */}
                      <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-3">{step.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                    {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow for connection */}
                  {index < productSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined process that builds AI visibility systematically
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2" />
            
            <div className="space-y-12">
              {[
                { icon: Search, title: 'Research', description: 'AI analyzes market gaps and opportunities', time: 'Day 1' },
                { icon: Target, title: 'Strategy', description: 'Prioritized content plan with AI impact scores', time: 'Day 2-3' },
                { icon: FileText, title: 'Creation', description: 'AI drafts, you refine with expertise', time: 'Day 4-7' },
                { icon: BarChart3, title: 'Analytics', description: 'Track AI mentions and performance', time: 'Ongoing' },
                { icon: RefreshCw, title: 'Iterate', description: 'Optimize based on data and feedback', time: 'Weekly' }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <p className="text-sm text-gray-500">{step.time}</p>
                        </div>
                            </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                </div>
                  
                  <div className="hidden md:block w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center relative z-10">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  </div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
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
              Measurable Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real impact from AI-optimized content strategy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{result.metric}</h3>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-2xl font-bold text-gray-400 line-through">{result.before}</div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="text-2xl font-bold text-green-600">{result.after}</div>
                </div>
                
                <div className="text-lg font-bold text-green-600 mb-2">{result.improvement}</div>
                <p className="text-sm text-gray-600">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Own Your AI Presence?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies building AI visibility before their competitors catch up
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
        </div>
      </section>
    </div>
  );
}