"use client";

import React from 'react';
import { Badge } from '@/components/ui';

interface WelcomeHeaderProps {
  userName: string;
  currentDate: string;
  totalContent: number;
  blogCount: number;
  linkedinCount: number;
  publishedCount: number;
  inProgressCount: number;
}

export default function WelcomeHeader({
  userName,
  currentDate,
  totalContent,
  blogCount,
  linkedinCount,
  publishedCount,
  inProgressCount
}: WelcomeHeaderProps) {
  return (
    <div className="bg-white">
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good evening, {userName}
            </h1>
            <p className="text-gray-600">{currentDate}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-sm text-gray-500">Available Assets</span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="primary" size="sm">Blog</Badge>
                <Badge variant="secondary" size="sm">LinkedIn</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content Overview Stats */}
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{totalContent}</div>
            <div className="text-gray-600">Total content</div>
            <div className="text-sm text-gray-500 mt-1">
              {blogCount} blog • {linkedinCount} linkedin
            </div>
          </div>
          <div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{publishedCount}</div>
            <div className="text-gray-600">Published</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{inProgressCount}</div>
            <div className="text-gray-600">In progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}
