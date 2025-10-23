"use client";

import { useMemo, useState } from 'react';
import { PlaybookOutput as PlaybookData, PlaybookMode } from '@/lib/demo/creator/types';
import { FileText, Target, TrendingUp, Calendar, Clock, BarChart3, Flag, Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';
import calendarTopicsV1 from '@/usableclientdata/content-studio/gumloop-calendar-topics.json';
import calendarTopicsV2 from '@/usableclientdata/content-studio/gumloop-calendar-topics-v2.json';
import { useCreatorStore } from '@/lib/demo/creator/store';

interface PlaybookOutputProps {
  data: PlaybookData;
  mode?: PlaybookMode;
  onAngleSelect?: (topic: any, subtopic: any) => void;
}

export function PlaybookOutput({ data, mode = 'playbook', onAngleSelect }: PlaybookOutputProps) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [selectedCalendarTopic, setSelectedCalendarTopic] = useState<any>(null);
  const [showAnglesModal, setShowAnglesModal] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());
  
  // Get version state from store
  const session = useCreatorStore(state => state.sessions.playbook);
  const setActiveVersion = useCreatorStore(state => state.setActiveVersion);
  const setOutputState = useCreatorStore(state => state.setOutputState);
  
  const activeVersion = session.activeVersion || 1;
  const hasV2 = session.hasV2 || false;

  // Use version data for calendar topics
  const calendarData = activeVersion === 2 && session.v2Data?.calendarTopics
    ? session.v2Data.calendarTopics
    : (session.v1Data?.calendarTopics || calendarTopicsV1);
  
  const scheduledTopics = useMemo(() => (calendarData as any).scheduledTopics || [], [calendarData]);

  // Use v1Data or v2Data based on activeVersion
  const versionData = activeVersion === 2 && session.v2Data 
    ? { ...data, ...session.v2Data }
    : (session.v1Data ? { ...data, ...session.v1Data } : data);

  // Get selected strategies from session state (preserved across versions)
  const selectedStrategies = session.selectedStrategies || [];

  // Filter sections based on selected strategies
  const filteredPlaybook = useMemo(() => {
    const allSections = versionData.generated_playbook || [];
    
    // If no strategies selected, show all sections
    if (!selectedStrategies || selectedStrategies.length === 0) {
      return allSections;
    }
    
    // For V1: Show only selected strategies
    if (activeVersion === 1) {
      return allSections.filter((section: any) => {
        // Map strategy IDs to section titles for V1
      const strategyMap: Record<string, string[]> = {
        'migration-accelerator': ['The Migration Accelerator'],
        'ai-native-authority': ['The AI-Native Authority'], 
        'transparency-advantage': ['The Transparency Advantage'],
          'use-case-accelerator': ['The Use Case Accelerator']
        };
        
        const selectedStrategyNames = selectedStrategies.map((id: string) => 
          strategyMap[id] || [id]
        ).flat();
        
        return selectedStrategyNames.includes(section.playbook_title);
      });
    }
    
    // For V2: Show both original selected strategies AND new recommended strategies
    if (activeVersion === 2) {
      return allSections.filter((section: any) => {
        // Show sections that are either original selected or new recommended
        return section.strategy_type === 'original_selected' || 
               section.strategy_type === 'new_recommended';
      });
    }
    
    return allSections;
  }, [selectedStrategies, versionData.generated_playbook, activeVersion]);

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    ...filteredPlaybook.map((section: any, idx: number) => ({
      id: `section-${idx}`,
      label: section.playbook_title,
      icon: Target,
    })),
    { id: 'next-steps', label: 'Next Steps', icon: TrendingUp },
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  if (mode === 'calendar') {
    // Generate calendar grid
    const now = currentCalendarDate;
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const calendarDays = [];
    const date = new Date(startDate);
    while (date <= endDate) {
      calendarDays.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

  const getTopicsForDate = (day: Date) => {
      const dayStr = day.toISOString().split('T')[0];
      return scheduledTopics.filter((topic: any) => {
        const topicDate = new Date(topic.date).toISOString().split('T')[0];
        return topicDate === dayStr;
      });
    };

    return (
      <div className="h-full flex bg-[#F7F7F8]">
        {/* Left: Topic Cards */}
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto max-h-screen">
          <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Scheduled Topics</h2>
              <p className="text-sm text-gray-500 mt-1">{scheduledTopics.length} topics planned</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-slate-500">AI visibility impact:</span>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  <Zap className="h-2.5 w-2.5" /> Critical
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  <Zap className="h-2.5 w-2.5" /> High
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Zap className="h-2.5 w-2.5" /> Medium
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  <Zap className="h-2.5 w-2.5" /> Low
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {scheduledTopics.map((topic: any) => (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedCalendarTopic(topic);
                  setShowAnglesModal(true);
                }}
                className="rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg p-5 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs uppercase tracking-wide px-2 py-1 rounded bg-blue-50 text-blue-700 font-medium">
                    {topic.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(topic.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">{topic.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{topic.description}</p>
                
                {topic.impactLevel && (
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm">
                        {topic.impactLevel === 'high' ? '🟢' : 
                         topic.impactLevel === 'medium' ? '🟡' : 
                         topic.impactLevel === 'low' ? '🔴' : 
                         topic.impactLevel === 'negative' ? '⛔' : '🟡'}
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {topic.expectedPoints || '+2-3'} points expected
                      </span>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      topic.impactLevel === 'high' ? 'bg-green-50 text-green-700 border border-green-200' :
                      topic.impactLevel === 'medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                      topic.impactLevel === 'low' ? 'bg-red-50 text-red-700 border border-red-200' :
                      topic.impactLevel === 'negative' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                      {topic.impactLevel} impact
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Target className="h-3 w-3" />
                  <span>{topic.subtopics?.length || 0} angles available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Calendar Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="min-w-[240px] text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <p className="text-sm text-gray-500">Content publishing calendar</p>
              </div>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => setCurrentCalendarDate(new Date())}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              Today
            </button>
          </div>

          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-700 py-3 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                const dayTopics = getTopicsForDate(day);
                const isCurrentMonth = day.getMonth() === now.getMonth();
                const isToday = day.toDateString() === now.toDateString();

                return (
                  <div
                    key={idx}
                    className={`min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 ${
                      !isCurrentMonth ? 'bg-gray-50/50' : 'bg-white'
                    } ${isToday ? 'bg-blue-50/30' : ''}`}
                  >
                    <div
                      className={`text-sm font-semibold mb-2 ${
                        isToday
                          ? 'text-white bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center'
                          : isCurrentMonth
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {day.getDate()}
                    </div>

                    <div className="space-y-1.5">
                      {dayTopics.map((topic: any) => {
                        const getImpactDisplay = (impactLevel: string) => {
                          switch (impactLevel) {
                            case 'high':
                              return { emoji: '🟢', color: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200', text: 'High AI Impact' };
                            case 'medium':
                              return { emoji: '🟡', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200', text: 'Medium AI Impact' };
                            case 'low':
                              return { emoji: '🔴', color: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200', text: 'Low AI Impact' };
                            case 'negative':
                              return { emoji: '⛔', color: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200', text: 'Negative Impact' };
                            default:
                              return { emoji: '🟡', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200', text: 'Medium AI Impact' };
                          }
                        };
                        
                        const impact = getImpactDisplay(topic.impactLevel);
                        
                        return (
                          <div
                            key={topic.id}
                            onClick={() => {
                              setSelectedCalendarTopic(topic);
                              setShowAnglesModal(true);
                            }}
                            className={`relative text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-colors truncate font-medium border ${impact.color}`}
                            title={`${impact.text} ${topic.expectedPoints || ''} - ${topic.impactRationale || ''}`}
                          >
                            <div className="flex items-center gap-1">
                              <span className="text-xs">{impact.emoji}</span>
                              <span className="truncate">{topic.title}</span>
                              <span className="text-xs opacity-70">ℹ️</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Angles Modal */}
        {showAnglesModal && selectedCalendarTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 p-6 bg-gradient-to-r from-blue-50 to-white">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCalendarTopic.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Select a content angle</p>
                </div>
                <button
                  onClick={() => setShowAnglesModal(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                <div className="grid grid-cols-2 gap-4">
                  {selectedCalendarTopic.subtopics?.map((subtopic: any) => (
                    <div
                      key={subtopic.id}
                      onClick={() => {
                        if (onAngleSelect) {
                          onAngleSelect(selectedCalendarTopic, subtopic);
                        }
                      }}
                      className="rounded-2xl border-2 border-gray-100 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {subtopic.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 italic">"{subtopic.hook}"</p>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-600">{subtopic.angle}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {subtopic.keyPoints.slice(0, 3).map((point: string, idx: number) => (
                            <span key={idx} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                              {point}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          <span className="font-medium">Expected:</span> {subtopic.expectedOutcome}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <p className="text-xs text-gray-500 text-center">
                  {selectedCalendarTopic.subtopics?.length || 0} angles available • Click to select and create content
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F7F7F8]">
      {/* VERSION TOGGLE - Only show if V2 exists */}
      {hasV2 && (
        <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Compare Versions:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVersion('playbook', 1)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeVersion === 1
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Version 1 (Original)
                </button>
                <button
                  onClick={() => setActiveVersion('playbook', 2)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeVersion === 2
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Version 2 (Optimized) ✨
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                // Reset to strategy selection
                setOutputState('playbook', 'awaiting_strategy');
              }}
              className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
            >
              Change Strategies
            </button>
          </div>
        </div>
      )}
      
      {/* Strategy Selection Button - Show when no V2 but strategies are selected */}
      {!hasV2 && selectedStrategies.length > 0 && (
        <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Selected Strategies:</span>
              <span className="text-sm font-medium text-gray-900">{selectedStrategies.length} strategies</span>
            </div>
            <button
              onClick={() => {
                // Reset to strategy selection
                setOutputState('playbook', 'awaiting_strategy');
              }}
              className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
            >
              Change Strategies
            </button>
          </div>
        </div>
      )}
      
      {/* Section Tabs */}
      <div className="flex-shrink-0 sticky top-0 z-20 bg-[#F7F7F8]/95 backdrop-blur border-b border-white/40">
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === idx;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(idx)}
                  className={`group flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-[0_14px_28px_-20px_rgba(0,0,0,0.75)]'
                      : 'bg-white text-gray-600 border border-white/60 shadow-sm hover:text-black hover:border-gray-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-black'}`} />
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto min-h-screen">
        <div className="px-8 py-6">
          {activeSection === 0 && (
            // Overview Section
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="rounded-3xl bg-white border border-white/60 shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{versionData.playbook_title}</h1>
                <p className="text-lg text-gray-700 mb-6">{versionData.executive_summary}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Posts per Week</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">{versionData.posts_per_week}</div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Selected Strategies</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">{selectedStrategies.length}</div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Playbook Sections</div>
                    <div className="mt-2 text-2xl font-semibold text-gray-900">{filteredPlaybook.length}</div>
                  </div>
                </div>
              </div>

              {/* Playbook Sections Overview */}
              <div className="space-y-6">
                {filteredPlaybook.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="rounded-3xl border border-white/60 bg-white shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-xl font-bold text-gray-900">{section.playbook_title}</h2>
                      {section.strategy_type && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          section.strategy_type === 'original_selected' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {section.strategy_type === 'original_selected' ? 'Your Selection' : 'AI Recommended'}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">{section.executive_summary}</p>
                    
                    {section.overall_recommendations && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                        <p className="text-sm text-gray-700">{section.overall_recommendations}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.content_plays?.slice(0, 2).map((play: any, playIndex: number) => (
                        <div key={playIndex} className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{play.play_name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{play.implementation_strategy}</p>
                          <div className="text-xs text-gray-500">
                            <strong>Timeline:</strong> {play.timeline}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {section.next_steps && section.next_steps.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {section.next_steps.slice(0, 3).map((step: string, stepIndex: number) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
                ))}
              </div>
            </div>
          )}

          {activeSection > 0 && activeSection <= filteredPlaybook.length && filteredPlaybook.length > 0 && (
            // Individual Playbook Section
            <div className="mx-auto max-w-4xl">
              {(() => {
                const section = filteredPlaybook[activeSection - 1];
                return (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      <div className="p-8 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.playbook_title}</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{section.executive_summary}</p>
                        
                        {section.overall_recommendations && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                            <p className="text-sm text-gray-700">{section.overall_recommendations}</p>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Plays</h3>
                        <div className="space-y-6">
                          {section.content_plays?.map((play: any, playIndex: number) => (
                            <div key={playIndex} className="border border-gray-200 rounded-xl p-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">{play.play_name}</h4>
                              <p className="text-gray-700 mb-4">{play.implementation_strategy}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">Content Formats</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {play.content_formats?.map((format: string, idx: number) => (
                                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                        {format}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">Timeline</h5>
                                  <span className="text-gray-700">{play.timeline}</span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h5 className="font-semibold text-gray-900 mb-2">Success Metrics</h5>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                  {play.success_metrics?.map((metric: string, idx: number) => (
                                    <li key={idx}>{metric}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Example Topics</h5>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                  {play.example_topics?.map((topic: string, idx: number) => (
                                    <li key={idx}>{topic}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {activeSection === sections.length - 1 && data.next_steps && (
            // Next Steps Section
            <div className="mx-auto max-w-4xl">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {data.next_steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}