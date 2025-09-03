"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Calendar as CalendarIcon,
  X,
  Copy,
  Link2,
  Globe,
  FileText,
  Clock,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

interface CalendarEvent {
  id: string;
  date: number;
  title: string;
  description?: string;
  type: 'blog' | 'linkedin';
  status: string;
}

export default function ContentCalendarPage() {
  const { state, actions } = useDemo();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'blog' as 'blog' | 'linkedin'
  });
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const getEventsForDate = (day: number) => {
    return state.calendarEvents.filter(event => 
      event.date === day && 
      event.month === currentMonth.getMonth() && 
      event.year === currentMonth.getFullYear()
    );
  };
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setShowCreateModal(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && selectedDate) {
      actions.createCalendarEvent({
        date: selectedDate,
        month: currentMonth.getMonth(),
        year: currentMonth.getFullYear(),
        title: newEvent.title,
        shortTitle: newEvent.title.substring(0, 25) + '...',
        type: newEvent.type,
        status: 'pending',
        ideas: 0
      });
      
      // Also create a document
      actions.createDocument({
        title: newEvent.title,
        description: newEvent.description,
        type: newEvent.type,
        status: 'idea'
      });
      
      setShowCreateModal(false);
      setNewEvent({ title: '', description: '', type: 'blog' });
      setSelectedDate(null);
    }
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentMonth);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/assets" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Assets
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-semibold">{state.selectedAsset || 'deepgram'}</h1>
                  <p className="text-xs text-gray-500">Blog Content Studio</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <button className="flex items-center space-x-1 text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Document</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Diagnostics</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Playbook</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center space-x-6 mt-4">
            <Link href="/demo/content-studio/create" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Content</span>
            </Link>
            <Link href="/demo/content-studio" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <FileText className="w-4 h-4" />
              <span>My Documents</span>
            </Link>
            <Link href="/demo/content-studio/calendar" className="flex items-center space-x-2 text-sm text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Content Calendar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={goToToday}
              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Today
            </button>
            <div className="flex items-center space-x-1">
              <button 
                onClick={previousMonth}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-base font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  view === 'month' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  view === 'week' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('agenda')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  view === 'agenda' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Agenda
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search calendar"
                className="pl-10 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
        
        {/* View Tabs */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-900 font-medium">All entries</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">With ideas</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">No ideas</button>
          </div>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span className="text-green-600 font-medium">Blog</span>
            <span>{state.calendarEvents.length} entries</span>
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      <div className="p-6">
        {view === 'month' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-0">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="py-3 text-center border-b border-gray-200 bg-gray-50">
                  <span className="text-xs font-medium text-gray-500">{day}</span>
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0">
              {/* Previous month days */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`prev-${i}`} className="min-h-[100px] p-2 border-r border-b border-gray-200 bg-gray-50">
                  <span className="text-sm text-gray-400">
                    {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate() - firstDayOfMonth + i + 1}
                  </span>
                </div>
              ))}
              
              {/* Current month days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const events = getEventsForDate(day);
                const today = isToday(day);
                
                return (
                  <div 
                    key={day} 
                    className={`min-h-[100px] p-2 border-r border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
                      today ? 'bg-blue-50' : 'bg-white'
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className={`text-sm mb-2 font-medium ${today ? 'text-blue-600' : 'text-gray-700'}`}>
                      {today ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full">
                          {day}
                        </span>
                      ) : (
                        day
                      )}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div 
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                          className={`text-xs p-1 rounded cursor-pointer truncate ${
                            event.type === 'blog' 
                              ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          }`}
                        >
                          {event.shortTitle || event.title}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-gray-500">+{events.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Next month days */}
              {Array.from({ length: 42 - firstDayOfMonth - daysInMonth }, (_, i) => (
                <div key={`next-${i}`} className="min-h-[100px] p-2 border-r border-b border-gray-200 bg-gray-50">
                  <span className="text-sm text-gray-400">{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="flex justify-center gap-16 py-6 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{state.calendarEvents.length}</div>
                <div className="text-sm text-gray-500">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{state.documents.filter(d => d.status === 'idea').length}</div>
                <div className="text-sm text-gray-500">Content Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {state.calendarEvents.filter(e => 
                    e.month === currentMonth.getMonth() && 
                    e.year === currentMonth.getFullYear()
                  ).length}
                </div>
                <div className="text-sm text-gray-500">This Month</div>
              </div>
            </div>
          </div>
        )}

        {view === 'week' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-8 gap-0">
              <div className="border-r border-gray-200 p-2 bg-gray-50"></div>
              {getWeekDays().map((day) => (
                <div key={day.toISOString()} className="border-r border-gray-200 p-2 bg-gray-50">
                  <div className="text-xs font-medium text-gray-500 text-center">
                    {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </div>
                  <div className="text-lg font-medium text-center">{day.getDate()}</div>
                </div>
              ))}
            </div>
            <div className="min-h-[400px] grid grid-cols-8 gap-0">
              <div className="border-r border-t border-gray-200 p-2 text-xs text-gray-500 bg-gray-50">
                {/* Time slots */}
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="h-20 border-b border-gray-100 py-1">
                    {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                  </div>
                ))}
              </div>
              {getWeekDays().map((day, dayIndex) => (
                <div key={day.toISOString()} className="border-r border-t border-gray-200 p-2">
                  {/* Events for this day */}
                  <div className="space-y-2">
                    {getEventsForDate(day.getDate())
                      .filter(e => e.month === day.getMonth() && e.year === day.getFullYear())
                      .map(event => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`text-xs p-2 rounded cursor-pointer ${
                            event.type === 'blog'
                              ? 'bg-green-50 text-green-700 hover:bg-green-100'
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          }`}
                        >
                          <div className="font-medium truncate">{event.shortTitle || event.title}</div>
                          {event.ideas > 0 && (
                            <div className="text-xs mt-1">{event.ideas} ideas</div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'agenda' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {state.calendarEvents
                .sort((a, b) => {
                  const dateA = new Date(a.year, a.month, a.date);
                  const dateB = new Date(b.year, b.month, b.date);
                  return dateA.getTime() - dateB.getTime();
                })
                .map(event => {
                  const eventDate = new Date(event.year, event.month, event.date);
                  const isUpcoming = eventDate >= new Date();
                  
                  return (
                    <div key={event.id} className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-0">
                      <div className="text-center flex-shrink-0">
                        <div className={`text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center ${
                          isUpcoming ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {event.date}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {monthNames[event.month].substring(0, 3)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-2">
                          {eventDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div 
                          onClick={() => handleEventClick(event)}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-2">
                                {event.title}
                              </h4>
                              <div className="flex items-center space-x-3 text-xs text-gray-500">
                                <span className={`px-2 py-0.5 rounded-full ${
                                  event.type === 'blog' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-purple-100 text-purple-700'
                                }`}>
                                  {event.type}
                                </span>
                                {event.ideas > 0 && (
                                  <span className="flex items-center">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {event.ideas} ideas
                                  </span>
                                )}
                                <span className={`px-2 py-0.5 rounded-full ${
                                  event.status === 'complete' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {event.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      selectedEvent.type === 'blog'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedEvent.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {monthNames[selectedEvent.month]} {selectedEvent.date}, {selectedEvent.year}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700">
                {selectedEvent.description || 'No description available for this event.'}
              </p>
              
              <div className="flex items-center space-x-3 mt-6">
                <Link
                  href={`/demo/content-studio/create?title=${encodeURIComponent(selectedEvent.title)}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Content
                </Link>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit Event
                </button>
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Create Event - {monthNames[currentMonth.getMonth()]} {selectedDate}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewEvent({ title: '', description: '', type: 'blog' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Event description..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setNewEvent({ ...newEvent, type: 'blog' })}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                        newEvent.type === 'blog'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Blog
                    </button>
                    <button
                      onClick={() => setNewEvent({ ...newEvent, type: 'linkedin' })}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                        newEvent.type === 'linkedin'
                          ? 'bg-purple-50 border-purple-500 text-purple-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewEvent({ title: '', description: '', type: 'blog' });
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}