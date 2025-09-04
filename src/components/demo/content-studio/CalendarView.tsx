import React, { useState, useEffect } from 'react';
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
  Lightbulb,
  ArrowRight,
  Sparkles,
  Target,
  BookOpen
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import calendarTopics from '@/usableclientdata/content-studio/gumloop-calendar-topics.json';

type ViewMode = 'month' | 'week' | 'list';

interface CalendarViewProps {
  onEventClick?: (event: any) => void;
  onCreateContent?: (date: Date, type: string) => void;
}

interface Subtopic {
  id: string;
  title: string;
  hook: string;
  angle: string;
  keyPoints: string[];
  expectedOutcome: string;
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
  subtopics?: Subtopic[];
}

export default function CalendarView({ onEventClick, onCreateContent }: CalendarViewProps = {}) {
  const router = useRouter();
  const contentStore = useContentStudioStore();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ScheduledTopic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [workflowStage, setWorkflowStage] = useState<'subtopics' | 'brief' | 'draft'>('subtopics');
  const [briefContent, setBriefContent] = useState<string>('');
  const [draftContent, setDraftContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Load topics from JSON
  const [scheduledTopics, setScheduledTopics] = useState<ScheduledTopic[]>([]);

  useEffect(() => {
    // Convert dates and set topics
    const topics = calendarTopics.scheduledTopics.map(topic => ({
      ...topic,
      date: new Date(topic.date).toISOString(),
      type: topic.type as 'blog' | 'linkedin' | 'improve',
      status: topic.status as 'topic' | 'brief' | 'draft' | 'complete'
    }));
    setScheduledTopics(topics);
  }, []);

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
      time: '9:00 AM',
      subtopics: topic.subtopics
    }))
  ];

  const handleTopicClick = (topic: ScheduledTopic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    setWorkflowStage('subtopics');
    setBriefContent('');
    setDraftContent('');
    setShowTopicModal(true);
  };

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    generateBrief(subtopic);
  };

  const generateBrief = async (subtopic: Subtopic) => {
    setIsGenerating(true);
    setWorkflowStage('brief');
    
    // Simulate brief generation
    setTimeout(() => {
      const brief = `# ${subtopic.title}

## Hook
${subtopic.hook}

## Angle
${subtopic.angle}

## Target Audience
${selectedTopic?.targetAudience || 'RevOps Managers and Operations Directors'}

## Key Points to Cover
${subtopic.keyPoints.map(point => `• ${point}`).join('\n')}

## Expected Outcome
${subtopic.expectedOutcome}

## Content Structure

### 1. Opening Hook (100 words)
Start with the compelling hook that immediately resonates with the target audience's pain point.

### 2. Problem Definition (300 words)
- Current state analysis
- Specific examples of the problem
- Quantified impact on business

### 3. Solution Introduction (400 words)
- How Gumloop addresses this specific challenge
- Key differentiators from traditional approaches
- Technical advantages of AI-native automation

### 4. Implementation Guide (500 words)
- Step-by-step approach
- Best practices
- Common pitfalls to avoid
- Timeline expectations

### 5. Real-World Examples (600 words)
- Customer success stories
- Before/after metrics
- Specific use cases
- ROI demonstration

### 6. Key Takeaways (200 words)
- Bullet-point summary
- Action items
- Next steps

## SEO Optimization
- Primary Keywords: ${selectedTopic?.keywords?.join(', ') || 'Gumloop, AI automation, RevOps'}
- Meta Title: ${subtopic.title.substring(0, 60)}
- Meta Description: ${subtopic.hook.substring(0, 160)}

## Call to Action
Encourage readers to try Gumloop with a specific next step related to the content topic.`;

      setBriefContent(brief);
      setIsGenerating(false);
    }, 2000);
  };

  const generateDraft = async () => {
    setIsGenerating(true);
    setWorkflowStage('draft');
    
    // Simulate draft generation
    setTimeout(() => {
      const draft = `# ${selectedSubtopic?.title}

${selectedSubtopic?.hook}

If you're managing RevOps at a growing B2B SaaS company, you know this scenario all too well. The automation you carefully built is now your biggest headache, consuming hours of manual fixes and still letting critical opportunities slip through the cracks.

## The Current Reality: When Good Automation Goes Bad

${selectedTopic?.type === 'blog' ? `Let's be honest about what's really happening in your RevOps stack right now:

**Monday Morning Fire Drills**
Every week starts the same way - urgent Slack messages about failed workflows, misrouted leads, and automation errors that somehow always affect your most important deals. Your team has become professional firefighters, spending 15+ hours weekly on manual fixes that automation was supposed to eliminate.

**The Hidden Cost Explosion**
That $99/month automation tool? It's now $299/month with overages, and you're still hitting limits. But the real cost isn't the subscription - it's the revenue leaking through the cracks. One misrouted enterprise lead can cost $50K+. Multiply that by the dozens of edge cases your rules can't handle, and you're looking at serious revenue impact.

**The Complexity Death Spiral**
Every fix creates two new problems. Your automation has become a house of cards - 500+ rules that nobody fully understands, where changing one thing breaks three others. New team members need months to understand the system, and even then, they're scared to touch it.` : 
`The reality is stark: traditional rule-based automation handles about 60% of your workflows adequately. But it's the other 40% - the edge cases, the context-dependent decisions, the scenarios you didn't predict - that consume 80% of your time and cause 90% of your headaches.`}

## Why Traditional Solutions Keep Failing

The fundamental problem isn't your implementation - it's the approach itself. Rule-based automation assumes predictability in an inherently unpredictable environment.

${selectedSubtopic?.keyPoints.map(point => `### ${point}
Traditional automation treats every input as a data point to be routed according to predefined logic. But revenue operations deal with human intent, context, and nuance that rules simply cannot capture. When a Fortune 500 company fills out your form with a Gmail address, when a decision-maker uses their personal LinkedIn, when an enterprise deal comes through an unexpected channel - rules fail, and deals die.`).join('\n\n')}

## The AI-Native Solution: Understanding Intent, Not Just Following Rules

This is where AI-native automation fundamentally differs. Instead of trying to predict every scenario, it understands intent and adapts in real-time.

**Pattern Recognition at Scale**
AI doesn't just look at individual data points - it recognizes patterns across thousands of interactions. That Gmail address? AI knows it's connected to a Fortune 500 company based on LinkedIn data, domain research, and behavioral patterns.

**Context-Aware Decision Making**
Every routing decision considers the full context: company size, engagement history, content consumed, similar successful deals. It's like having your best RevOps person reviewing every single lead, 24/7, without fatigue or human error.

**Self-Healing Workflows**
When something unexpected happens, AI doesn't just fail and wait for manual intervention. It recognizes the issue, attempts alternative approaches, and learns from the resolution. Your 3 AM workflow failures become 3 AM workflow fixes.

## Real Implementation: From Chaos to Control in 30 Days

Here's exactly how teams are making this transformation:

**Week 1: Foundation and Quick Wins**
- Audit your current automation to identify the biggest pain points
- Implement AI routing for your highest-value lead sources
- Set up parallel running to ensure zero disruption
- Typical result: 50% reduction in Monday morning fires

**Week 2: Expanding Intelligence**
- Add context enrichment to all lead routing
- Implement intelligent lead scoring based on intent signals
- Create self-healing workflows for common failure points
- Typical result: 70% reduction in manual interventions

**Week 3: Advanced Optimization**
- Fine-tune AI models based on your specific patterns
- Implement predictive routing for complex scenarios
- Add intelligent escalation for edge cases
- Typical result: 85% reduction in manual fixes

**Week 4: Scale and Refine**
- Full migration of critical workflows
- Team training on AI-assisted operations
- Documentation and knowledge transfer
- Typical result: 15+ hours per week recovered

## The Proof: Real Teams, Real Results

**TechCo (1000+ employees, B2B SaaS)**
"We went from 20 hours weekly on manual fixes to under 2 hours. But the real win? We haven't lost a single enterprise lead to bad routing in 6 months." - Sarah Chen, VP RevOps

**StartupCo (50 employees, High-Growth)**
"Our 3-person RevOps team now operates like a 10-person team. AI handles the complexity we couldn't even attempt before." - Marcus Johnson, RevOps Manager

**ScaleCo (500 employees, Series C)**
"60% cost reduction on automation tools, 80% reduction in manual work, and our lead-to-opportunity conversion improved by 23%." - Lisa Park, Director of Operations

## Your Next Steps: From Reading to Results

${selectedSubtopic?.expectedOutcome}

The question isn't whether AI automation is the future - it's whether you'll be an early adopter who gains competitive advantage, or a late follower trying to catch up.

**Immediate Action Items:**
1. Calculate your current manual fix hours (be honest - include the 'quick checks')
2. Identify your top 3 workflow pain points
3. Map out which of your rules handle edge cases (spoiler: they don't)
4. Consider the revenue impact of your current automation gaps

**The Bottom Line**
Every week you wait is another week of:
- Lost revenue from misrouted leads
- Burned hours on manual fixes
- Team frustration and turnover risk
- Competitive disadvantage against AI-adopting competitors

The transformation from rule-based to AI-native automation isn't just an upgrade - it's a fundamental shift in how RevOps operates. Teams that make this shift now will have an insurmountable advantage in efficiency, accuracy, and scalability.

Ready to stop firefighting and start scaling? [Your AI automation transformation starts here →]

---

*Questions This Post Answers:*
- How much time should RevOps teams spend on manual automation fixes?
- What percentage of workflows can't be handled by traditional rules?
- How long does it take to migrate from rule-based to AI automation?
- What's the real cost of staying with traditional automation tools?
- How do AI workflows handle edge cases differently than rules?`;

      setDraftContent(draft);
      setIsGenerating(false);
    }, 3000);
  };

  const finalizeAndPublish = () => {
    // Set the content in store
    contentStore.startWorkflow(selectedTopic?.type === 'linkedin' ? 'linkedin-create' : 'blog-create');
    contentStore.setDraft(draftContent);
    contentStore.setContentData({
      title: selectedSubtopic?.title || '',
      brief: briefContent,
      content: draftContent,
      keywords: selectedTopic?.keywords || [],
      targetAudience: selectedTopic?.targetAudience || ''
    });
    
    // Navigate to content studio
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
                              onClick={(e) => {
                                e.stopPropagation();
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

          {viewMode === 'week' && (
            <Card className="border border-black/10">
              <CardContent className="p-4">
                {/* Week View Header */}
                <div className="grid grid-cols-8 gap-0 mb-4">
                  <div className="text-sm font-medium text-black/60 py-2">Time</div>
                  {(() => {
                    const weekStart = new Date(currentDate);
                    const day = weekStart.getDay();
                    weekStart.setDate(weekStart.getDate() - day);
                    const weekDays = [];
                    for (let i = 0; i < 7; i++) {
                      const date = new Date(weekStart);
                      date.setDate(weekStart.getDate() + i);
                      weekDays.push(date);
                    }
                    return weekDays.map((date, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-medium text-black/60">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className={`text-lg font-medium ${
                          date.toDateString() === new Date().toDateString() 
                            ? 'text-white bg-black rounded-full w-8 h-8 flex items-center justify-center mx-auto' 
                            : 'text-black'
                        }`}>
                          {date.getDate()}
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Week Grid */}
                <div className="border-t border-black/10">
                  {/* Time slots */}
                  {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-0 border-b border-black/5 min-h-[60px]">
                      <div className="text-xs text-black/40 p-2 border-r border-black/5">{time}</div>
                      {(() => {
                        const weekStart = new Date(currentDate);
                        const day = weekStart.getDay();
                        weekStart.setDate(weekStart.getDate() - day);
                        const weekCells = [];
                        for (let i = 0; i < 7; i++) {
                          const date = new Date(weekStart);
                          date.setDate(weekStart.getDate() + i);
                          const dayEvents = getEventsForDate(date).filter(e => 
                            (e as any).time === time || (!!(e as any).time && (e as any).time.includes(time.split(' ')[0]))
                          );
                          
                          weekCells.push(
                            <div key={i} className="border-r border-black/5 p-1 hover:bg-black/[0.02]">
                              {dayEvents.map((event, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    if (event.type === 'topic') {
                                      const topic = scheduledTopics.find(t => t.id === event.id);
                                      if (topic) handleTopicClick(topic);
                                    } else {
                                      onEventClick?.(event);
                                    }
                                  }}
                                  className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity mb-1 ${
                                    event.type === 'topic' ? getStatusColor((event as any).status) : getEventColor(event.type)
                                  }`}
                                >
                                  <span className="truncate">{event.title}</span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return weekCells;
                      })()}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === 'list' && (
            <Card className="border border-black/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scheduled Content & Topics</CardTitle>
                  <Badge className="bg-black/5 text-black border-0">
                    {allEvents.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allEvents
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(event => {
                      const eventDate = new Date(event.date);
                      const isToday = eventDate.toDateString() === new Date().toDateString();
                      const isPast = eventDate < new Date();
                      const Icon = event.type === 'topic' 
                        ? Lightbulb 
                        : getEventIcon(event.type);
                      
                      return (
                        <div 
                          key={event.id} 
                          className={`flex items-start justify-between p-4 rounded-lg border transition-all cursor-pointer hover:border-black/20 ${
                            isToday ? 'bg-black/[0.02] border-black/20' : 
                            isPast ? 'opacity-50 bg-white border-black/5' : 
                            'bg-white border-black/10'
                          }`}
                          onClick={() => {
                            if (event.type === 'topic') {
                              const topic = scheduledTopics.find(t => t.id === event.id);
                              if (topic) handleTopicClick(topic);
                            } else {
                              onEventClick?.(event);
                            }
                          }}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              event.type === 'topic' ? 'bg-black text-white' :
                              event.type === 'publish' ? 'bg-black/10' :
                              'bg-black/5'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-black">
                                  {event.title}
                                </p>
                                {isToday && (
                                  <Badge className="bg-black text-white border-0 text-xs">
                                    Today
                                  </Badge>
                                )}
                              </div>
                              {(event as any).description && (
                                <p className="text-sm text-black/60 mb-2">
                                  {(event as any).description}
                                </p>
                              )}
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-black/40">
                                  <Calendar className="w-3 h-3 inline mr-1" />
                                  {eventDate.toLocaleDateString('en-US', { 
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                                {(event as any).time && (
                                  <span className="text-black/40">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {(event as any).time}
                                  </span>
                                )}
                                <Badge className={`${
                                  event.type === 'topic' 
                                    ? getStatusColor((event as any).status)
                                    : 'bg-black/5 text-black/60 border-0'
                                }`}>
                                  {event.type === 'topic' ? (
                                    <>
                                      {getStatusIcon((event as any).status)}
                                      <span className="ml-1">{(event as any).status}</span>
                                    </>
                                  ) : event.type}
                                </Badge>
                                {(event as any).category && (
                                  <Badge className="bg-white border border-black/10 text-black/50">
                                    {(event as any).category}
                                  </Badge>
                                )}
                              </div>
                              {event.type === 'topic' && (event as any).subtopics && (
                                <div className="mt-3 flex items-center gap-2">
                                  <span className="text-xs text-black/40">4 content angles available</span>
                                  <ArrowRight className="w-3 h-3 text-black/40" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {event.type === 'topic' && (
                              <Button
                                size="sm"
                                className="bg-black text-white hover:bg-black/90"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const topic = scheduledTopics.find(t => t.id === event.id);
                                  if (topic) handleTopicClick(topic);
                                }}
                              >
                                <PlayCircle className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            )}
                            {event.type === 'publish' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white border border-black/20 text-black hover:bg-black/5"
                              >
                                <Edit3 className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            )}
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
          {/* Upcoming Events */}
          <Card className="border border-black/10">
            <CardHeader>
              <CardTitle className="text-sm">Upcoming Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledTopics.slice(0, 5).map(topic => (
                  <div 
                    key={topic.id} 
                    className="flex items-start gap-2 cursor-pointer hover:bg-black/[0.02] p-2 rounded-lg transition-colors"
                    onClick={() => handleTopicClick(topic)}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      topic.type === 'blog' ? 'bg-black' :
                      topic.type === 'linkedin' ? 'bg-black/60' : 'bg-black/40'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black line-clamp-1">
                        {topic.title}
                      </p>
                      <p className="text-xs text-black/50">
                        {new Date(topic.date).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })} • {topic.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Topic Workflow Modal */}
      {showTopicModal && selectedTopic && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-sm border border-black/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-black">
                    {workflowStage === 'subtopics' && 'Select Content Angle'}
                    {workflowStage === 'brief' && 'Content Brief'}
                    {workflowStage === 'draft' && 'Final Draft'}
                  </h2>
                  <p className="text-sm text-black/50 mt-1">
                    {selectedTopic.title}
                  </p>
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
              {/* Workflow Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${workflowStage === 'subtopics' ? 'text-black' : 'text-black/30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      workflowStage === 'subtopics' ? 'bg-black text-white' : 'bg-black/10'
                    }`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Select Angle</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-black/20" />
                  <div className={`flex items-center gap-2 ${workflowStage === 'brief' ? 'text-black' : 'text-black/30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      workflowStage === 'brief' ? 'bg-black text-white' : 
                      workflowStage === 'draft' ? 'bg-black/10' : 'bg-black/5'
                    }`}>
                      <PenTool className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Generate Brief</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-black/20" />
                  <div className={`flex items-center gap-2 ${workflowStage === 'draft' ? 'text-black' : 'text-black/30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      workflowStage === 'draft' ? 'bg-black text-white' : 'bg-black/5'
                    }`}>
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Create Draft</span>
                  </div>
                </div>
              </div>

              {/* Stage Content */}
              {workflowStage === 'subtopics' && (
                <div>
                  <p className="text-sm text-black/60 mb-4">
                    Choose the angle that best aligns with your content strategy and audience needs
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedTopic.subtopics?.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        onClick={() => handleSubtopicSelect(subtopic)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-black/20 ${
                          selectedSubtopic?.id === subtopic.id 
                            ? 'border-black bg-black/[0.02]' 
                            : 'border-black/10 bg-white'
                        }`}
                      >
                        <h4 className="font-medium text-black mb-2 text-sm">
                          {subtopic.title}
                        </h4>
                        <p className="text-xs text-black/60 mb-3">
                          {subtopic.hook}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className="bg-black/5 text-black/70 border-0">
                            {subtopic.keyPoints.length} Key Points
                          </Badge>
                          <Badge className="bg-white border border-black/10 text-black/50">
                            <Target className="w-3 h-3 mr-1" />
                            High Impact
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedSubtopic && (
                    <div className="mt-6 p-4 bg-black/[0.02] rounded-lg border border-black/10">
                      <h4 className="text-sm font-medium text-black mb-2">Selected Angle Details</h4>
                      <p className="text-sm text-black/80 mb-2">{selectedSubtopic.angle}</p>
                      <p className="text-xs text-black/60">Expected Outcome: {selectedSubtopic.expectedOutcome}</p>
                    </div>
                  )}
                </div>
              )}

              {workflowStage === 'brief' && (
                <div>
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin mb-4" />
                      <p className="text-sm text-black/60">Generating content brief...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 p-3 bg-black/[0.02] rounded-lg border border-black/10">
                        <div className="flex items-center gap-2 text-sm text-black/60">
                          <Sparkles className="w-4 h-4" />
                          <span>AI-generated brief based on selected angle</span>
                        </div>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm text-black/80 bg-white p-4 rounded-lg border border-black/10">
                          {briefContent}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {workflowStage === 'draft' && (
                <div>
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin mb-4" />
                      <p className="text-sm text-black/60">Creating final draft...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 p-3 bg-black/[0.02] rounded-lg border border-black/10">
                        <div className="flex items-center gap-2 text-sm text-black/60">
                          <BookOpen className="w-4 h-4" />
                          <span>Complete draft ready for review and publishing</span>
                        </div>
                      </div>
                      <div className="prose prose-sm max-w-none max-h-[400px] overflow-y-auto">
                        <div className="whitespace-pre-wrap font-sans text-sm text-black/80 bg-white p-4 rounded-lg border border-black/10">
                          {draftContent.substring(0, 2000)}...
                          
                          <p className="mt-4 text-xs text-black/40 italic">
                            [Draft continues - {draftContent.split(' ').length} words total]
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-between mt-6">
                <Button 
                  variant="secondary"
                  onClick={() => {
                    if (workflowStage === 'brief') setWorkflowStage('subtopics');
                    else if (workflowStage === 'draft') setWorkflowStage('brief');
                    else setShowTopicModal(false);
                  }}
                  className="bg-white border border-black/20 text-black hover:bg-black/5"
                >
                  {workflowStage === 'subtopics' ? 'Cancel' : 'Back'}
                </Button>
                
                <Button 
                  onClick={() => {
                    if (workflowStage === 'subtopics' && selectedSubtopic) {
                      handleSubtopicSelect(selectedSubtopic);
                    } else if (workflowStage === 'brief') {
                      generateDraft();
                    } else if (workflowStage === 'draft') {
                      finalizeAndPublish();
                    }
                  }}
                  className="bg-black text-white hover:bg-black/90"
                  disabled={
                    (workflowStage === 'subtopics' && !selectedSubtopic) || 
                    isGenerating
                  }
                >
                  {workflowStage === 'subtopics' && (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Generate Brief
                    </>
                  )}
                  {workflowStage === 'brief' && (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Create Draft
                    </>
                  )}
                  {workflowStage === 'draft' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Finalize & Edit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}