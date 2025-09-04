import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  Edit3,
  Plus,
  Filter,
  TrendingUp,
  Users,
  MessageSquare,
  X,
  PlayCircle,
  CheckCircle2,
  PenTool,
  Lightbulb
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { contentStudioData } from '@/lib/content-studio-data-loader';

type ViewMode = 'month' | 'week' | 'list';

interface CalendarViewProps {
  onEventClick?: (event: any) => void;
  onCreateContent?: (date: Date, type: string) => void;
}

interface ScheduledTopic {
  id: string;
  title: string;
  date: string;
  type: 'blog' | 'linkedin' | 'improve';
  status: 'topic' | 'brief' | 'draft' | 'complete';
  description?: string;
  keywords?: string[];
  targetAudience?: string;
}

export default function CalendarView({ onEventClick, onCreateContent }: CalendarViewProps = {}) {
  const router = useRouter();
  const contentStore = useContentStudioStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ScheduledTopic | null>(null);
  const [scheduledTopics, setScheduledTopics] = useState<ScheduledTopic[]>([
    {
      id: 'topic-1',
      title: 'Ultimate Guide to Migrating from AWS/Google/OpenAI',
      date: new Date(2025, 8, 3).toISOString(),
      type: 'blog',
      status: 'complete',
      description: 'The Ultimate Guide to Migrating from AWS/Google/OpenAI Whisper to Deepgram',
      keywords: ['migration', 'AWS', 'Deepgram', 'voice AI'],
      targetAudience: 'CTOs and technical architects'
    },
    {
      id: 'topic-2',
      title: 'Transparent STT Benchmarking Methodology',
      date: new Date(2025, 8, 11).toISOString(),
      type: 'blog',
      status: 'complete',
      description: 'Transparent, reproducible benchmarking for real-time STT',
      keywords: ['benchmarking', 'STT', 'performance'],
      targetAudience: 'ML engineers and researchers'
    },
    {
      id: 'topic-3',
      title: 'Deepgram Integration Blueprints',
      date: new Date(2025, 8, 18).toISOString(),
      type: 'blog',
      status: 'complete',
      description: 'End-to-End Implementation Guides for Top Ecosystem Platforms',
      keywords: ['integration', 'Twilio', 'Salesforce', 'MS Teams'],
      targetAudience: 'Integration engineers'
    },
    {
      id: 'topic-4',
      title: 'AI-Powered Content Optimization',
      date: new Date(2025, 8, 15).toISOString(),
      type: 'improve',
      status: 'topic',
      description: 'How to improve existing content with AI analysis',
      keywords: ['AI', 'content optimization', 'SEO'],
      targetAudience: 'Content marketers'
    },
    {
      id: 'topic-5',
      title: 'Voice AI Success Stories',
      date: new Date(2025, 8, 22).toISOString(),
      type: 'linkedin',
      status: 'brief',
      description: 'Real customer success stories with voice AI',
      targetAudience: 'Business leaders'
    },
    {
      id: 'topic-6',
      title: 'Future of Speech Recognition',
      date: new Date(2025, 8, 25).toISOString(),
      type: 'blog',
      status: 'draft',
      description: 'Predictions for speech recognition in 2026',
      keywords: ['future', 'AI', 'speech recognition'],
      targetAudience: 'Tech innovators'
    },
    {
      id: 'topic-7',
      title: 'Building Real-Time Voice Apps',
      date: new Date(2025, 8, 28).toISOString(),
      type: 'blog',
      status: 'topic',
      description: 'Complete guide to building voice-enabled applications',
      keywords: ['voice apps', 'real-time', 'development'],
      targetAudience: 'Developers'
    }
  ]);

  // Get calendar events and scheduled documents
  const events = contentStudioData.getCalendarEvents();
  const scheduledDocs = contentStudioData.getDocuments({ status: 'scheduled' });

  // Combine all events including scheduled topics
  const allEvents = [
    ...events.map(e => ({
      ...e,
      type: e.type || 'event'
    })),
    ...scheduledDocs.map(doc => ({
      id: doc.id,
      title: doc.title,
      date: doc.dates.scheduled!,
      type: 'publish',
      time: new Date(doc.dates.scheduled!).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      category: doc.type
    })),
    ...scheduledTopics.map(topic => ({
      id: topic.id,
      title: topic.title,
      date: topic.date,
      type: 'topic',
      status: topic.status,
      category: topic.type,
      description: topic.description,
      time: '9:00 AM'
    }))
  ];

  const handleTopicClick = (topic: ScheduledTopic) => {
    setSelectedTopic(topic);
    setShowTopicModal(true);
  };

  const startWorkflow = (topic: ScheduledTopic) => {
    // Set the topic data in store
    contentStore.startWorkflow(topic.type === 'linkedin' ? 'linkedin-create' : 'blog-create');
    contentStore.setDraft(JSON.stringify({
      title: topic.title,
      content: topic.description || '',
      stage: 'topic',
      keywords: topic.keywords || [],
      targetAudience: topic.targetAudience || ''
    }));
    
    // Navigate to the appropriate workflow
    router.push('/demo/content-studio/create');
    setShowTopicModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'topic': return <Lightbulb className="w-4 h-4" />;
      case 'brief': return <PenTool className="w-4 h-4" />;
      case 'draft': return <Edit3 className="w-4 h-4" />;
      case 'complete': return <CheckCircle2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'topic': return 'bg-white border border-black/20 text-black/70';
      case 'brief': return 'bg-black/10 text-black';
      case 'draft': return 'bg-black/20 text-black';
      case 'complete': return 'bg-black text-white';
      default: return 'bg-black/5 text-black/60';
    }
  };

  // Get month details
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  // Generate calendar days
  const days = [];
  const date = new Date(startDate);
  while (date <= endDate) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allEvents.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  // Get upcoming events
  const upcomingEvents = allEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'publish':
        return 'bg-black text-white text-xs';
      case 'deadline':
        return 'bg-black/10 text-black text-xs font-medium';
      case 'review':
        return 'bg-white border border-black/20 text-black/70 text-xs';
      case 'meeting':
        return 'bg-black/5 text-black/60 text-xs';
      default:
        return 'bg-white border border-black/10 text-black/50 text-xs';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'publish':
        return FileText;
      case 'meeting':
        return Users;
      case 'review':
        return Edit3;
      default:
        return Calendar;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-black min-w-[150px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button className="bg-black text-white hover:bg-black/90" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Schedule Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="col-span-3">
          {viewMode === 'month' && (
            <Card className="border border-black/10">
              <CardContent className="p-4">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-0 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-black/60 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-0 border-t border-l border border-black/10">
                  {days.map((day, idx) => {
                    const dayEvents = getEventsForDate(day);
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const isToday = day.toDateString() === new Date().toDateString();
                    const isSelected = selectedDate?.toDateString() === day.toDateString();
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDate(day)}
                        className={`min-h-[100px] p-2 border-r border-b border border-black/10 cursor-pointer transition-all ${
                          !isCurrentMonth ? 'bg-black/[0.02]' : 'bg-white'
                        } ${isSelected ? 'ring-2 ring-black ring-inset' : ''} hover:bg-black/[0.02]`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-white bg-black w-6 h-6 rounded-full flex items-center justify-center' :
                          isCurrentMonth ? 'text-black' : 'text-black/40'
                        }`}>
                          {day.getDate()}
                        </div>
                        
                        {/* Events */}
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event, eventIdx) => (
                            <div
                              key={eventIdx}
                              onClick={() => {
                                if (event.type === 'topic') {
                                  const topic = scheduledTopics.find(t => t.id === event.id);
                                  if (topic) handleTopicClick(topic);
                                } else {
                                  onEventClick?.(event);
                                }
                              }}
                                                    className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                        event.type === 'topic' ? getStatusColor((event as any).status) : getEventColor(event.type)
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {event.type === 'topic' && (
                          <span className="inline-flex">{getStatusIcon((event as any).status)}</span>
                        )}
                                <span className="truncate">{event.title}</span>
                              </div>
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-black/50">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          
          {viewMode === 'list' && (
            <Card className="border border-black/10">
              <CardHeader>
                <CardTitle>Scheduled Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map(event => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-black/[0.02] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getEventColor(event.type).replace('text', 'bg').replace('700', '100')}`}>
                            <Icon className={`w-4 h-4 ${getEventColor(event.type).replace('bg', 'text').replace('100', '700')}`} />
                          </div>
                          <div>
                            <p className="font-medium text-black">{event.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {event.type}
                              </Badge>
                              <span className="text-xs text-black/50">
                                {new Date(event.date).toLocaleDateString()} at {(event as any).time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" size="sm">
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Date Details */}
          {selectedDate && (
            <Card className="border border-black/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map(event => {
                      const Icon = getEventIcon(event.type);
                      return (
                        <div key={event.id} className="p-2 bg-black/[0.02] rounded-lg">
                          <div className="flex items-start gap-2">
                            <Icon className="w-4 h-4 text-black/60 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">{event.title}</p>
                              <p className="text-xs text-black/50 mt-1">{(event as any).time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-black/50">No events scheduled</p>
                  )}
                </div>
                <Button className="w-full mt-3 bg-black text-white hover:bg-black/90" size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Event
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Upcoming Events */}
          <Card className="border border-black/10">
            <CardHeader>
              <CardTitle className="text-sm">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      event.type === 'publish' ? 'bg-blue-500' :
                      event.type === 'deadline' ? 'bg-red-500' :
                      event.type === 'review' ? 'bg-black/30' : 'bg-black/50'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black line-clamp-1">
                        {event.title}
                      </p>
                      <p className="text-xs text-black/50">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Stats */}
          <Card className="border border-black/10">
            <CardHeader>
              <CardTitle className="text-sm">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/60">To Publish</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/60">In Review</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/60">Deadlines</span>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Topic Workflow Modal */}
      {showTopicModal && selectedTopic && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-sm border border-black/10 max-w-2xl w-full">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-black">Content Workflow</h2>
                  <p className="text-sm text-black/50 mt-1">Transform your topic into published content</p>
                </div>
                <button 
                  onClick={() => setShowTopicModal(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Topic Details */}
              <div className="mb-6 p-4 bg-black/[0.02] rounded-lg">
                <h3 className="font-medium text-black mb-2">{selectedTopic.title}</h3>
                <p className="text-sm text-black/60 mb-3">{selectedTopic.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <Badge className="bg-white border border-black/20 text-black/60">
                    {selectedTopic.type === 'linkedin' ? 'LinkedIn Post' : 'Blog Article'}
                  </Badge>
                  <Badge className={getStatusColor(selectedTopic.status)}>
                    {getStatusIcon(selectedTopic.status)}
                    <span className="ml-1">{selectedTopic.status}</span>
                  </Badge>
                  {selectedTopic.targetAudience && (
                    <span className="text-black/40">
                      <Users className="w-3 h-3 inline mr-1" />
                      {selectedTopic.targetAudience}
                    </span>
                  )}
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-3">Workflow Steps</h3>
                <div className="space-y-2">
                  {/* Topic */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    selectedTopic.status === 'topic' ? 'bg-black text-white' : 'bg-white border border-black/10'
                  }`}>
                    <Lightbulb className={`w-5 h-5 ${selectedTopic.status === 'topic' ? 'text-white' : 'text-black/50'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${selectedTopic.status === 'topic' ? 'text-white' : 'text-black'}`}>
                        Topic Research
                      </p>
                      <p className={`text-xs ${selectedTopic.status === 'topic' ? 'text-white/70' : 'text-black/50'}`}>
                        Define topic, keywords, and audience
                      </p>
                    </div>
                    {selectedTopic.status !== 'topic' && <CheckCircle2 className="w-5 h-5 text-black" />}
                  </div>

                  {/* Brief */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    selectedTopic.status === 'brief' ? 'bg-black text-white' : 
                    ['draft', 'complete'].includes(selectedTopic.status) ? 'bg-white border border-black/10' :
                    'bg-black/[0.02] opacity-60'
                  }`}>
                    <PenTool className={`w-5 h-5 ${selectedTopic.status === 'brief' ? 'text-white' : 'text-black/50'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${selectedTopic.status === 'brief' ? 'text-white' : 'text-black'}`}>
                        Create Brief
                      </p>
                      <p className={`text-xs ${selectedTopic.status === 'brief' ? 'text-white/70' : 'text-black/50'}`}>
                        Outline structure and key points
                      </p>
                    </div>
                    {['draft', 'complete'].includes(selectedTopic.status) && <CheckCircle2 className="w-5 h-5 text-black" />}
                  </div>

                  {/* Draft */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    selectedTopic.status === 'draft' ? 'bg-black text-white' : 
                    selectedTopic.status === 'complete' ? 'bg-white border border-black/10' :
                    'bg-black/[0.02] opacity-60'
                  }`}>
                    <Edit3 className={`w-5 h-5 ${selectedTopic.status === 'draft' ? 'text-white' : 'text-black/50'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${selectedTopic.status === 'draft' ? 'text-white' : 'text-black'}`}>
                        Write Content
                      </p>
                      <p className={`text-xs ${selectedTopic.status === 'draft' ? 'text-white/70' : 'text-black/50'}`}>
                        Create and refine the full content
                      </p>
                    </div>
                    {selectedTopic.status === 'complete' && <CheckCircle2 className="w-5 h-5 text-black" />}
                  </div>

                  {/* Complete */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    selectedTopic.status === 'complete' ? 'bg-black text-white' : 'bg-black/[0.02] opacity-60'
                  }`}>
                    <CheckCircle2 className={`w-5 h-5 ${selectedTopic.status === 'complete' ? 'text-white' : 'text-black/50'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${selectedTopic.status === 'complete' ? 'text-white' : 'text-black'}`}>
                        Publish
                      </p>
                      <p className={`text-xs ${selectedTopic.status === 'complete' ? 'text-white/70' : 'text-black/50'}`}>
                        Schedule and publish content
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="secondary"
                  onClick={() => setShowTopicModal(false)}
                  className="bg-white border border-black/20 text-black hover:bg-black/5"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => startWorkflow(selectedTopic)}
                  className="bg-black text-white hover:bg-black/90"
                  disabled={selectedTopic.status === 'complete'}
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {selectedTopic.status === 'topic' ? 'Start Workflow' :
                   selectedTopic.status === 'brief' ? 'Continue to Draft' :
                   selectedTopic.status === 'draft' ? 'Finalize Content' :
                   'Completed'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}