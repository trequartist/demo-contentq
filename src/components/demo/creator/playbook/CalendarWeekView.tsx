"use client";

import { ChevronLeft, ChevronRight, Clock, Target, Zap } from 'lucide-react';

interface CalendarWeekViewProps {
  currentDate: Date;
  scheduledTopics: any[];
  onTopicClick: (topic: any) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function CalendarWeekView({ currentDate, scheduledTopics, onTopicClick, onNavigate }: CalendarWeekViewProps) {
  // Calculate week start (Sunday)
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
  // Generate 7 days for the week
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    weekDays.push(day);
  }

  const getTopicsForDate = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0];
    return scheduledTopics.filter((topic: any) => {
      const topicDate = new Date(topic.date).toISOString().split('T')[0];
      return topicDate === dayStr;
    });
  };

  const getImpactColor = (impactLevel: string) => {
    switch (impactLevel) {
      case 'high':
        return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      case 'critical':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'medium':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'low':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-600';
      case 'linkedin':
        return 'bg-purple-600';
      case 'improve':
        return 'bg-emerald-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <p className="text-sm text-gray-500">Week view</p>
            </div>
            <button
              onClick={() => onNavigate('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Next week"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <button
            onClick={() => {
              const today = new Date();
              onNavigate('prev'); // This will be handled by parent to set to today
            }}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            Today
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 h-full">
          {weekDays.map((day, idx) => {
            const dayTopics = getTopicsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={idx}
                className={`border-r last:border-r-0 border-gray-200 ${
                  isToday ? 'bg-blue-50/30' : 'bg-white'
                }`}
              >
                {/* Day Header */}
                <div className={`sticky top-0 p-3 border-b border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      isToday
                        ? 'text-white bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center'
                        : 'text-gray-900'
                    }`}
                  >
                    {day.getDate()}
                  </div>
                </div>

                {/* Topics for this day */}
                <div className="p-2 space-y-2">
                  {dayTopics.map((topic: any) => (
                    <button
                      key={topic.id}
                      onClick={() => onTopicClick(topic)}
                      className={`w-full text-left p-3 rounded-lg border ${getImpactColor(
                        topic.impactLevel
                      )} hover:shadow-md transition-all group cursor-pointer`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${getTypeColor(topic.type)} flex-shrink-0 mt-1`} />
                        <span className="text-xs font-semibold text-gray-900 flex-1 line-clamp-2 group-hover:line-clamp-none">
                          {topic.title}
                        </span>
                      </div>
                      
                      {topic.impactLevel && (
                        <div className="flex items-center gap-1 text-[10px] font-medium mt-1">
                          <Zap className="h-3 w-3" />
                          <span>{topic.impactLevel} impact</span>
                        </div>
                      )}
                      
                      {topic.subtopics && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                          <Target className="h-3 w-3" />
                          <span>{topic.subtopics.length} angles</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


