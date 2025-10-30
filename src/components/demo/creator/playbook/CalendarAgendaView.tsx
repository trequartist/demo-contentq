"use client";

import { Calendar, Target, Zap, Clock, FileText, MessageSquare, TrendingUp } from 'lucide-react';

interface CalendarAgendaViewProps {
  scheduledTopics: any[];
  onTopicClick: (topic: any) => void;
}

export function CalendarAgendaView({ scheduledTopics, onTopicClick }: CalendarAgendaViewProps) {
  // Group topics by date
  const groupedTopics = scheduledTopics.reduce((acc: any, topic: any) => {
    const dateKey = new Date(topic.date).toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(topic);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedTopics).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const getImpactColor = (impactLevel: string) => {
    switch (impactLevel) {
      case 'high':
        return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'text-emerald-500' };
      case 'critical':
        return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-500' };
      case 'medium':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-500' };
      case 'low':
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'text-gray-500' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'text-gray-500' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-4 w-4" />;
      case 'linkedin':
        return <MessageSquare className="h-4 w-4" />;
      case 'improve':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog':
        return 'Blog Post';
      case 'linkedin':
        return 'LinkedIn';
      case 'improve':
        return 'Content Improvement';
      default:
        return type;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateOnly = date.toDateString();
    const todayOnly = today.toDateString();
    const tomorrowOnly = tomorrow.toDateString();

    if (dateOnly === todayOnly) {
      return 'Today';
    } else if (dateOnly === tomorrowOnly) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Schedule</h2>
          <p className="text-sm text-gray-500">{scheduledTopics.length} topics planned</p>
        </div>

        {/* Agenda List */}
        <div className="space-y-6">
          {sortedDates.map((dateKey) => {
            const date = new Date(dateKey);
            const topics = groupedTopics[dateKey];
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div key={dateKey} className={`${isToday ? 'ring-2 ring-blue-200' : ''} rounded-2xl`}>
                {/* Date Header */}
                <div className={`sticky top-0 z-10 px-6 py-4 rounded-t-2xl ${isToday ? 'bg-blue-50 border-b border-blue-200' : 'bg-gray-50 border-b border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <Calendar className={`h-5 w-5 ${isToday ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className={`font-semibold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                        {formatDate(dateKey)}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                      isToday ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
                    </span>
                  </div>
                </div>

                {/* Topics for this date */}
                <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-t-0 border-gray-200">
                  {topics.map((topic: any) => {
                    const colors = getImpactColor(topic.impactLevel);
                    
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onTopicClick(topic)}
                        className={`w-full text-left p-4 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-md transition-all group cursor-pointer`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Type Icon */}
                          <div className={`mt-1 ${colors.icon}`}>
                            {getTypeIcon(topic.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {topic.title}
                              </h4>
                              <span className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                                {getTypeLabel(topic.type)}
                              </span>
                            </div>

                            {topic.hook && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:line-clamp-none">
                                {topic.hook}
                              </p>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {topic.impactLevel && (
                                <div className="flex items-center gap-1">
                                  <Zap className={`h-3 w-3 ${colors.icon}`} />
                                  <span className={colors.text}>{topic.impactLevel} impact</span>
                                </div>
                              )}
                              {topic.subtopics && (
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  <span>{topic.subtopics.length} angles available</span>
                                </div>
                              )}
                              {topic.estimatedTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{topic.estimatedTime}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {sortedDates.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled content</h3>
            <p className="text-sm text-gray-500">Topics will appear here once they're scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}


