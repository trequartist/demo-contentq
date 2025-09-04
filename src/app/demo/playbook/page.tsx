"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trophy,
  Target,
  Clock,
  Zap,
  BookOpen,
  Lightbulb,
  BarChart3,
  Users,
  Rocket,
  DollarSign,
  Download,
  FileText,
  X,
  PlayCircle,
  CheckSquare,
  Copy,
  MessageCircle,
  Send
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlaybookPage() {
  const router = useRouter();
  const [playbookData, setPlaybookData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlay, setSelectedPlay] = useState<string | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [copiedTopic, setCopiedTopic] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const playbookModule = await import('@/usableclientdata/data/playbook/playbook-gumloop.json');
        setPlaybookData(playbookModule.default?.data || null);
      } catch (error) {
        console.error('Failed to load playbook data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const getTimelineIcon = (timeline: string) => {
    if (timeline.includes('1-7')) return <Zap className="w-4 h-4 text-black" />;
    if (timeline.includes('8-30')) return <TrendingUp className="w-4 h-4 text-black/70" />;
    if (timeline.includes('31-60')) return <Trophy className="w-4 h-4 text-black/60" />;
    if (timeline.includes('61-90')) return <BarChart3 className="w-4 h-4 text-black/50" />;
    return <Calendar className="w-4 h-4 text-black/40" />;
  };

  const getTimelineColor = (timeline: string) => {
    if (timeline.includes('1-7')) return 'bg-black text-white text-xs';
    if (timeline.includes('8-30')) return 'bg-black/10 text-black text-xs font-medium';
    if (timeline.includes('31-60')) return 'bg-white border border-black/20 text-black/70 text-xs';
    if (timeline.includes('61-90')) return 'bg-white border border-black/10 text-black/50 text-xs';
    return 'bg-white border border-black/10 text-black/40 text-xs';
  };

  // Export functionality
  const handleExportPlaybook = (format: 'json' | 'pdf' | 'markdown') => {
    if (!playbookData) return;
    
    if (format === 'json') {
      const dataStr = JSON.stringify(playbookData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `playbook-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'markdown') {
      const markdown = generateMarkdownFromPlaybook(playbookData);
      const dataUri = 'data:text/markdown;charset=utf-8,'+ encodeURIComponent(markdown);
      const exportFileDefaultName = `playbook-${new Date().toISOString().split('T')[0]}.md`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'pdf') {
      window.print();
    }
    
    setShowExportMenu(false);
  };

  const generateMarkdownFromPlaybook = (data: any) => {
    let markdown = `# ${data.playbook_title}\n\n`;
    markdown += `**Posts per week:** ${data.posts_per_week}\n\n`;
    markdown += `## Executive Summary\n\n${data.executive_summary}\n\n`;
    markdown += `## Overall Recommendations\n\n${data.overall_recommendations}\n\n`;
    markdown += `## Reasoning\n\n${data.reasoning_for_recommendations}\n\n`;
    
    markdown += `## Strategic Playbooks\n\n`;
    data.generated_playbook?.forEach((playbook: any, index: number) => {
      markdown += `### ${index + 1}. ${playbook.playbook_title}\n\n`;
      markdown += `${playbook.executive_summary}\n\n`;
      
      playbook.content_plays?.forEach((play: any) => {
        markdown += `#### ${play.play_name}\n`;
        markdown += `- **Timeline:** ${play.timeline}\n`;
        markdown += `- **Strategy:** ${play.implementation_strategy}\n`;
        markdown += `- **Metrics:** ${play.success_metrics?.join(', ')}\n`;
        markdown += `- **Formats:** ${play.content_formats?.join(', ')}\n\n`;
        
        if (play.example_topics?.length > 0) {
          markdown += `**Example Topics:**\n`;
          play.example_topics.forEach((topic: string) => {
            markdown += `- ${topic}\n`;
          });
          markdown += `\n`;
        }
      });
      
      if (playbook.next_steps?.length > 0) {
        markdown += `**Next Steps:**\n`;
        playbook.next_steps.forEach((step: string) => {
          markdown += `- ${step}\n`;
        });
        markdown += `\n`;
      }
    });
    
    markdown += `## Timeline-Based Content Plays\n\n`;
    data.content_plays?.forEach((play: any) => {
      markdown += `### ${play.play_name}\n`;
      markdown += `**Timeline:** ${play.timeline}\n`;
      markdown += `**Reasoning:** ${play.reasoning}\n`;
      markdown += `**Timeline Reasoning:** ${play.reasoning_for_timeline}\n`;
      markdown += `**Implementation:** ${play.implementation_strategy}\n\n`;
    });
    
    markdown += `## Next Steps\n\n`;
    data.next_steps?.forEach((step: string) => {
      markdown += `- ${step}\n`;
    });
    
    return markdown;
  };

  const handleStepToggle = (stepId: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const getCompletedStepsCount = () => {
    return Object.values(checkedSteps).filter(Boolean).length;
  };

  const getTotalStepsCount = () => {
    if (!playbookData) return 0;
    return playbookData.next_steps?.length || 0;
  };

  const handleCopyTopic = (topic: string) => {
    navigator.clipboard.writeText(topic);
    setCopiedTopic(topic);
    setTimeout(() => setCopiedTopic(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-black/20 border-t-black mx-auto"></div>
          <p className="mt-4 text-black/50 text-sm">Loading playbook...</p>
        </div>
      </div>
    );
  }

  if (!playbookData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-black/50">No playbook data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-black">{playbookData.playbook_title}</h1>
              <p className="mt-1 text-sm text-black/40">
                {playbookData.posts_per_week} posts per week • Last updated: {new Date(playbookData.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button 
                  variant="secondary"
                  className="text-sm border border-black/20 bg-white text-black hover:bg-black/5 transition-colors font-normal"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Playbook
                </Button>
                {showExportMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-black/10 rounded-lg shadow-sm p-2 z-10 min-w-[160px]">
                    <button
                      onClick={() => handleExportPlaybook('json')}
                      className="w-full text-left px-3 py-2 text-sm text-black/70 hover:bg-black/5 rounded transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Export as JSON
                    </button>
                    <button
                      onClick={() => handleExportPlaybook('markdown')}
                      className="w-full text-left px-3 py-2 text-sm text-black/70 hover:bg-black/5 rounded transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Export as Markdown
                    </button>
                    <button
                      onClick={() => handleExportPlaybook('pdf')}
                      className="w-full text-left px-3 py-2 text-sm text-black/70 hover:bg-black/5 rounded transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Print to PDF
                    </button>
                  </div>
                )}
              </div>
              <Button 
                className="bg-black text-white hover:bg-black/90 text-sm font-medium"
                onClick={() => setShowImplementationModal(true)}
              >
                Start Implementation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Executive Summary */}
        <Card className="mb-8 border border-black/10 shadow-sm">
          <CardHeader className="border-b border-black/5 bg-black/[0.02]">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-black/60" />
              <CardTitle className="text-lg font-medium text-black">Executive Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-black/70 leading-relaxed text-sm">
                {playbookData.executive_summary}
              </p>
              
              <div className="border-l-2 border-black/20 pl-4 py-2 bg-white rounded-r">
                <h4 className="font-medium text-black text-sm mb-2">Overall Recommendations</h4>
                <p className="text-black/60 text-sm">
                  {playbookData.overall_recommendations}
                </p>
              </div>

              <div className="bg-black/[0.02] rounded-lg p-4">
                <h4 className="font-medium text-black text-sm mb-2">Why This Approach</h4>
                <p className="text-black/50 text-xs">
                  {playbookData.reasoning_for_recommendations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Playbooks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-black">Strategic Playbooks</h2>
            <Badge variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
              {playbookData.generated_playbook?.length || 0} Playbooks
            </Badge>
          </div>

          <div className="space-y-4">
            {playbookData.generated_playbook?.map((playbook: any, index: number) => (
              <Card 
                key={index}
                className={`border border-black/10 cursor-pointer transition-all hover:border-black/20 ${
                  selectedPlay === playbook.playbook_title ? 'border-black/30 shadow-sm' : ''
                }`}
                onClick={() => setSelectedPlay(selectedPlay === playbook.playbook_title ? null : playbook.playbook_title)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        {index === 0 && <Rocket className="w-4 h-4 text-black" />}
                        {index === 1 && <Trophy className="w-4 h-4 text-black/70" />}
                        {index === 2 && <DollarSign className="w-4 h-4 text-black/60" />}
                        {index === 3 && <Users className="w-4 h-4 text-black/50" />}
                        {playbook.playbook_title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs text-black/50">
                        {playbook.executive_summary}
                      </CardDescription>
                    </div>
                    {selectedPlay === playbook.playbook_title ? 
                      <ChevronUp className="w-4 h-4 text-black/30" /> : 
                      <ChevronDown className="w-4 h-4 text-black/30" />
                    }
                  </div>
                </CardHeader>

                {selectedPlay === playbook.playbook_title && (
                  <CardContent className="pt-0">
                    {/* Content Plays within each playbook */}
                    <div className="space-y-4 mt-4">
                      {playbook.content_plays?.map((play: any, playIndex: number) => (
                        <div key={playIndex} className="border-l-2 border-black/10 pl-4">
                          <h4 className="font-medium text-black text-sm">{play.play_name}</h4>
                          <p className="text-xs text-black/50 mt-1">{play.implementation_strategy}</p>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start gap-2">
                              <Calendar className="w-3 h-3 text-black/30 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-black/70">Timeline:</span>
                                <span className="text-xs text-black/50 ml-1">{play.timeline}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Target className="w-3 h-3 text-black/30 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-black/70">Success Metrics:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {play.success_metrics?.map((metric: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
                                      {metric}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <BookOpen className="w-3 h-3 text-black/30 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium text-black/70">Content Formats:</span>
                                <span className="text-xs text-black/50 ml-1">
                                  {play.content_formats?.join(', ')}
                                </span>
                              </div>
                            </div>

                            {play.example_topics && play.example_topics.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs font-medium text-black/70">Example Topics:</span>
                                <ul className="mt-1 space-y-1">
                                  {play.example_topics.slice(0, 3).map((topic: string, topicIdx: number) => (
                                    <li 
                                      key={topicIdx} 
                                      className="text-xs text-black/50 flex items-start gap-1 group hover:bg-black/[0.02] p-1 rounded cursor-pointer"
                                      onClick={() => handleCopyTopic(topic)}
                                    >
                                      <span className="text-black/30">•</span>
                                      <span className="flex-1">{topic}</span>
                                      <Copy className={`w-3 h-3 ${copiedTopic === topic ? 'text-black' : 'text-black/20 opacity-0 group-hover:opacity-100'} transition-all`} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Playbook Next Steps */}
                    {playbook.next_steps && playbook.next_steps.length > 0 && (
                      <div className="mt-6 p-4 bg-black/[0.02] rounded-lg">
                        <h4 className="font-medium text-black text-sm mb-2">Next Steps</h4>
                        <ul className="space-y-1">
                          {playbook.next_steps.map((step: string, idx: number) => (
                            <li key={idx} className="text-xs text-black/60 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-black/40 mt-0.5 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline-based Content Plays */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-black">90-Day Execution Timeline</h2>
            <Badge variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
              {playbookData.content_plays?.length || 0} Phases
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {playbookData.content_plays?.map((play: any, index: number) => (
              <Card 
                key={index} 
                className="border border-black/10 cursor-pointer transition-all hover:border-black/20"
                onClick={() => setExpandedTimeline(expandedTimeline === play.play_name ? null : play.play_name)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTimelineIcon(play.timeline)}
                      <div>
                        <CardTitle className="text-sm font-medium">{play.play_name}</CardTitle>
                        <Badge className={getTimelineColor(play.timeline) + ' mt-1'}>
                          {play.timeline}
                        </Badge>
                      </div>
                    </div>
                    {expandedTimeline === play.play_name ? 
                      <ChevronUp className="w-4 h-4 text-black/30" /> : 
                      <ChevronDown className="w-4 h-4 text-black/30" />
                    }
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-xs text-black/60">{play.reasoning}</p>
                  
                  {expandedTimeline === play.play_name && (
                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-black/[0.02] rounded">
                        <h5 className="text-xs font-medium text-black/80 mb-1">Why This Timeline</h5>
                        <p className="text-xs text-black/50">{play.reasoning_for_timeline}</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-medium text-black/80 mb-1">Implementation Strategy</h5>
                        <p className="text-xs text-black/50">{play.implementation_strategy}</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-medium text-black/80 mb-1">Success Metrics</h5>
                        <div className="flex flex-wrap gap-1">
                          {play.success_metrics?.map((metric: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-medium text-black/80 mb-1">Example Topics</h5>
                        <ul className="space-y-1">
                          {play.example_topics?.slice(0, 4).map((topic: string, idx: number) => (
                            <li key={idx} className="text-xs text-black/50 flex items-start gap-1">
                              <span className="text-black/30">•</span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <Card className="border border-black/10 shadow-sm">
          <CardHeader className="border-b border-black/5">
            <div className="flex items-center gap-3">
              <Rocket className="w-5 h-5 text-black/60" />
              <CardTitle className="text-base font-medium">Immediate Next Steps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {playbookData.next_steps?.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors">
                  <CheckCircle className="w-4 h-4 text-black/50 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-black/70">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button 
                className="bg-black text-white hover:bg-black/90 font-medium"
                onClick={() => setShowEmergencyModal(true)}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start with Emergency Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Modal */}
      {showImplementationModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-sm border border-black/10 max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-black">Implementation Roadmap</h2>
                  <p className="text-sm text-black/50 mt-1">
                    Track your progress through the 90-day playbook
                  </p>
                </div>
                <button 
                  onClick={() => setShowImplementationModal(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Timeline Overview */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-black">Week 1</p>
                    <p className="text-xs text-black/50">Emergency Response</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-black/20 text-black mx-auto flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-black">Days 8-30</p>
                    <p className="text-xs text-black/50">Build Momentum</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-black/10 text-black mx-auto flex items-center justify-center">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-black">Days 31-60</p>
                    <p className="text-xs text-black/50">Establish Authority</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white border border-black/20 text-black mx-auto flex items-center justify-center">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-black">Days 61-90</p>
                    <p className="text-xs text-black/50">Scale & Optimize</p>
                  </div>
                </div>

                {/* Playbook Checklist */}
                <div>
                  <h3 className="font-medium text-black mb-3 text-sm">Playbook Checklist</h3>
                  <div className="space-y-2">
                    {playbookData?.generated_playbook?.map((playbook: any, index: number) => (
                      <div key={index} className="p-4 border border-black/10 rounded-lg">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => handleStepToggle(`playbook-${index}`)}
                            className={`mt-0.5 transition-colors ${
                              checkedSteps[`playbook-${index}`] 
                                ? 'text-black' 
                                : 'text-black/30 hover:text-black/60'
                            }`}
                          >
                            <CheckSquare className={`w-5 h-5 ${
                              checkedSteps[`playbook-${index}`] ? 'fill-current' : ''
                            }`} />
                          </button>
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${
                              checkedSteps[`playbook-${index}`] 
                                ? 'text-black/40 line-through' 
                                : 'text-black'
                            }`}>
                              {playbook.playbook_title}
                            </h4>
                            <p className="text-xs text-black/50 mt-1">
                              {playbook.executive_summary}
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
                                {playbook.content_plays?.length || 0} plays
                              </Badge>
                              <span className="text-xs text-black/40">
                                {playbook.next_steps?.length || 0} action items
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Links */}
                <div className="p-4 bg-black/[0.02] rounded-lg">
                  <h3 className="font-medium text-black mb-3 text-sm">Resources & Tools</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => router.push('/demo/content-studio/create')}
                      className="p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <BookOpen className="w-4 h-4" />
                        Content Studio
                      </div>
                      <p className="text-xs text-black/50 mt-1">Create content from playbook</p>
                    </button>
                    <button 
                      onClick={() => router.push('/demo/diagnostics')}
                      className="p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <BarChart3 className="w-4 h-4" />
                        Diagnostics
                      </div>
                      <p className="text-xs text-black/50 mt-1">Track performance metrics</p>
                    </button>
                    <button 
                      onClick={() => window.open('https://chat.openai.com', '_blank')}
                      className="p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <MessageCircle className="w-4 h-4" />
                        AI Assistant
                      </div>
                      <p className="text-xs text-black/50 mt-1">Get writing help</p>
                    </button>
                    <button 
                      onClick={() => handleExportPlaybook('markdown')}
                      className="p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <Download className="w-4 h-4" />
                        Export Guide
                      </div>
                      <p className="text-xs text-black/50 mt-1">Download playbook</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-black/10 bg-black/[0.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60">
                    Progress: {getCompletedStepsCount()} of {playbookData?.generated_playbook?.length || 0} playbooks started
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="secondary"
                    className="text-sm border border-black/20 bg-white text-black hover:bg-black/5"
                    onClick={() => {
                      setShowImplementationModal(false);
                      setShowEmergencyModal(true);
                    }}
                  >
                    Start Week 1
                  </Button>
                  <Button 
                    className="bg-black text-white hover:bg-black/90 text-sm"
                    onClick={() => {
                      setShowImplementationModal(false);
                      router.push('/demo/content-studio/create');
                    }}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Begin Creating
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Response Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-sm border border-black/10 max-w-2xl w-full">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-black">Emergency Response Plan</h2>
                  <p className="text-sm text-black/50 mt-1">First 7 days critical actions</p>
                </div>
                <button 
                  onClick={() => setShowEmergencyModal(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* Day-by-day plan */}
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${day === 1 ? 'bg-black' : 'bg-black/10'} ${day === 1 ? 'text-white' : 'text-black'} flex items-center justify-center text-sm font-medium`}>
                      {day}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black text-sm">Day {day}</h4>
                      <p className="text-xs text-black/60 mt-1">
                        {day === 1 && "Audit existing content and identify quick wins"}
                        {day === 2 && "Update and optimize top 3 performing pieces"}
                        {day === 3 && "Create emergency response content for critical queries"}
                        {day === 4 && "Implement technical fixes from diagnostics"}
                        {day === 5 && "Launch first content from playbook"}
                        {day === 6 && "Set up measurement and tracking systems"}
                        {day === 7 && "Review metrics and adjust strategy"}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button 
                          onClick={() => handleStepToggle(`day-${day}`)}
                          className={`text-sm ${
                            checkedSteps[`day-${day}`] 
                              ? 'text-black' 
                              : 'text-black/40'
                          }`}
                        >
                          {checkedSteps[`day-${day}`] ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                        </button>
                        <span className="text-xs text-black/40">
                          {checkedSteps[`day-${day}`] ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Actions */}
                <div className="mt-6 p-4 bg-black text-white rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Immediate Actions Required</h4>
                      <ul className="mt-2 space-y-1">
                        {playbookData?.next_steps?.slice(0, 3).map((step: string, idx: number) => (
                          <li key={idx} className="text-xs text-white/80 flex items-start gap-1">
                            <span className="text-white/60">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-black/10 bg-black/[0.02]">
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="secondary"
                  className="text-sm border border-black/20 bg-white text-black hover:bg-black/5"
                  onClick={() => {
                    const plan = `Emergency Response Plan - Week 1\n\n${
                      [1, 2, 3, 4, 5, 6, 7].map(day => `Day ${day}: ${
                        day === 1 ? "Audit existing content and identify quick wins" :
                        day === 2 ? "Update and optimize top 3 performing pieces" :
                        day === 3 ? "Create emergency response content for critical queries" :
                        day === 4 ? "Implement technical fixes from diagnostics" :
                        day === 5 ? "Launch first content from playbook" :
                        day === 6 ? "Set up measurement and tracking systems" :
                        "Review metrics and adjust strategy"
                      }`).join('\n')
                    }\n\nImmediate Actions:\n${playbookData?.next_steps?.slice(0, 3).map((s: string) => `- ${s}`).join('\n')}`;
                    
                    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(plan);
                    const linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', 'emergency-response-plan.txt');
                    linkElement.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Plan
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-black/90 text-sm"
                  onClick={() => {
                    setShowEmergencyModal(false);
                    router.push('/demo/content-studio/create');
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Start Day 1
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}