"use client";

import React from 'react';
import Link from 'next/link';
import { Plus, Calendar, FileText } from 'lucide-react';

export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Create New Content - Primary Action */}
      <Link href="/demo/content-studio/create">
        <div className="bg-black text-white rounded-2xl p-8 hover:scale-105 transition-all cursor-pointer group">
          <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-4 group-hover:bg-white/20 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Create New Content</h3>
          <p className="text-gray-300 text-sm mb-4">Start with AI assistance</p>
          <div className="text-sm text-white">
            Get started →
          </div>
        </div>
      </Link>

      {/* Calendar */}
      <Link href="/demo/content-studio/calendar">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-gray-200 transition-colors">
            <Calendar className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Calendar</h3>
          <p className="text-gray-600 text-sm mb-4">Plan your content</p>
          <div className="text-sm text-gray-700">
            View calendar
          </div>
        </div>
      </Link>

      {/* Documents */}
      <Link href="/demo/content-studio">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-gray-200 transition-colors">
            <FileText className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Documents</h3>
          <p className="text-gray-600 text-sm mb-4">Browse all content</p>
          <div className="text-sm text-gray-700">
            View documents
          </div>
        </div>
      </Link>
    </div>
  );
}
