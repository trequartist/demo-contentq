"use client";

import React from 'react';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  title: string;
  time: string;
  icon: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'content_ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'gap_identified':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'score_increase':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'content_created':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">Activity Feed</h3>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                ${getActivityColor(activity.type)}
              `}>
                <span className="text-sm">{activity.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All Activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
