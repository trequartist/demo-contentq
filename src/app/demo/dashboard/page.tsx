"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Calendar,
  FileText, 
  Plus,
  ArrowRight,
  ChevronRight,
  Info,
  Sparkles,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  Target,
  Activity,
  Zap,
  Brain,
  Globe,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import dashboardData from '@/usableclientdata/data/dashboard/dashboard.json';

export default function DashboardPage() {
  const router = useRouter();
  const contentStore = useContentStudioStore();
  const data = dashboardData;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return data.overview.greeting.morning;
    if (hour < 17) return data.overview.greeting.afternoon;
    return data.overview.greeting.evening;
  };

  // Format date
  const formatDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

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

  const quickActions = [
    {
      title: "Blog Post",
      description: "Create AI-optimized blog content",
      icon: FileText,
      color: "blue",
      action: () => {
        router.push('/demo/creator?tab=posts');
      }
    },
    {
      title: "LinkedIn Post",
      description: "Professional social content",
      icon: MessageSquare,
      color: "purple",
      action: () => {
        router.push('/demo/creator?tab=posts');
      }
    },
    {
      title: "Improve Content",
      description: "Enhance existing content",
      icon: TrendingUp,
      color: "green",
      action: () => {
        router.push('/demo/creator?tab=posts');
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getContentIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'blog': return FileText;
      case 'linkedin': return MessageSquare;
      case 'twitter': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getGreeting()}, {data.overview.userName}
              </h1>
              <p className="text-gray-600">
                {formatDate()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-600">Available Assets</p>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">Blog</Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">LinkedIn</Badge>
            </div>
          </motion.div>

          {/* Main Action Cards */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Create New Content */}
            <motion.div variants={fadeInUp}>
              <Card 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                onClick={() => router.push('/demo/creator?tab=posts')}
              >
                <CardContent className="p-8 h-64 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Create New Content</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">Start with AI assistance and expert guidance</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                      <span>Get started</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Calendar */}
            <motion.div variants={fadeInUp}>
              <Card 
                className="bg-white border border-gray-200 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                onClick={() => router.push('/demo/creator?tab=playbook')}
              >
                <CardContent className="p-8 h-64 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-7 h-7 text-blue-600" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Calendar</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Plan and schedule your content strategy</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      <span>View calendar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Documents */}
            <motion.div variants={fadeInUp}>
              <Card 
                className="bg-white border border-gray-200 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                onClick={() => router.push('/demo/creator?tab=diagnostics')}
              >
                <CardContent className="p-8 h-64 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-green-600" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Documents</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Browse and manage all your content</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      <span>View documents</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Recent Activity and Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button 
                  onClick={() => router.push('/demo/creator?tab=diagnostics')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {data.recentActivity.slice(0, 6).map((item, idx) => {
                  const ContentIcon = getContentIcon(item.platform);
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <ContentIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge 
                            className={`text-xs font-medium ${getStatusColor(item.status)}`}
                          >
                            {item.status === 'post' ? 'Post' : 
                             item.status === 'brief' ? 'Brief' :
                             item.status === 'published' ? 'Published' :
                             item.status === 'scheduled' ? 'Scheduled' :
                             item.status === 'review' ? 'In Review' :
                             'Draft'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {item.platform}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    onClick={action.action}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${action.color}-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Insights Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insight</h3>
              <p className="text-gray-700 leading-relaxed">
                {data.tips && data.tips[1] ? data.tips[1].description : 
                 `Complete your ${data.overview.stats.inProgress.value} drafts before starting new content.`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}