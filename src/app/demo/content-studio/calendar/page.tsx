"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarView from '@/components/demo/content-studio/CalendarView';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { 
  ArrowLeft, 
  Plus, 
  Calendar as CalendarIcon,
  FileText,
  Edit3,
  Clock,
  Users
} from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const store = useContentStudioStore();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');

  const handleCreateFromCalendar = (eventType: string, scheduledDate?: Date) => {
    // Start a blog creation workflow from calendar
    if (eventType === 'blog') {
      store.startWorkflow('blog-create');
      // Pre-populate with scheduled date if provided
      if (scheduledDate) {
        store.setContentData({
          userInput: 'Gumloop',
          selectedTopic: '',
          brief: '',
          draft: '',
          scheduledDate: scheduledDate.toISOString()
        });
      }
      router.push('/demo/content-studio/create');
    } else if (eventType === 'linkedin') {
      store.startWorkflow('linkedin-create');
      router.push('/demo/content-studio/create');
    }
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    
    // If it's a scheduled content event, allow editing
    if (event.type === 'publish' && event.documentId) {
      const document = contentStudioData.getDocumentById(event.documentId);
      if (document && (document.status === 'draft' || document.status === 'review')) {
        router.push(`/demo/content-studio/edit/${event.documentId}`);
      } else if (document) {
        router.push(`/demo/content-studio/document/${event.documentId}`);
      }
    } else if (event.type === 'meeting' || event.type === 'review') {
      // For meetings or reviews, show event details
      console.log('Event details:', event);
    }
  };

  const handleEditDocument = (documentId: string) => {
    router.push(`/demo/content-studio/edit/${documentId}`);
  };

  const upcomingEvents = contentStudioData.getUpcomingEvents(5);
  const todayEvents = contentStudioData.getCalendarEvents().filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/demo/content-studio')}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-black/60" />
              </button>
              <div>
                <h1 className="text-xl font-light text-black">Content Calendar</h1>
                <p className="text-sm text-black/40">Plan and schedule your content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <CalendarView 
          onEventClick={handleEventClick}
          onCreateContent={(date, type) => handleCreateFromCalendar(type, date)}
        />
      </div>
    </div>
  );
}