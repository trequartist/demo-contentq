"use client";

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  companyName: string;
}

export default function DashboardHeader({ userName, companyName }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your content performance overview for {companyName}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/demo/content-studio/create">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Content</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
