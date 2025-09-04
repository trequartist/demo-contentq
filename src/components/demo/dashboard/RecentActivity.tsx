"use client";

import React from 'react';
import { BarChart3, Search, FileText, Activity } from 'lucide-react';

interface ActivityItem {
  type: 'diagnostic' | 'opportunity' | 'content' | 'workflow';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'new' | 'success' | 'pending';
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'diagnostic': return BarChart3;
      case 'opportunity': return Search;
      case 'content': return FileText;
      case 'workflow': return Activity;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-black text-white';
      case 'new': return 'bg-blue-100 text-blue-600';
      case 'success': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <p className="text-sm text-gray-600 mt-1">Latest updates and insights</p>
      </div>
      
      <div className="p-6 space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}