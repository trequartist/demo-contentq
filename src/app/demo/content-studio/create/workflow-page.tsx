"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import workflowData from '@/usableclientdata/data/content-workflow-data.json';
import DraftEditorPage from './draft';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Input, Textarea } from '@/components/ui';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Target, 
  Brain, 
  RefreshCw, 
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Clock,
  DollarSign,
  Save,
  Download,
  Eye,
  Hash,
  Users,
  Zap
} from 'lucide-react';

export default function WorkflowPage() {
  const router = useRouter();
  const store = useContentStudioStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load workflow data from JSON
  const workflowContent = workflowData.whenRulesBreakWorkflow;

  useEffect(() => {
    // Initialize with data from JSON if starting fresh
    if (!store.activeWorkflow) {
      store.startWorkflow('blog-create');
      store.setUserInput({
        companyName: workflowContent.stages.input.companyName,
        requirements: workflowContent.stages.input.requirements,
        targetAudience: workflowContent.stages.input.targetAudience,
        keywords: workflowContent.stages.input.keywords,
        tone: workflowContent.stages.input.tone
      });
    }
  }, []);

  const handleNextStage = async () => {
    setIsProcessing(true);
    
    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (store.currentStage === 'input') {
      // Generate topics from workflow data
      const topics = [
        {
          id: 'topic-1',
          title: workflowContent.stages.topics.selectedTopic,
          description: 'Focus on the hidden failures of rule-based systems and AI\'s adaptive approach',
          relevance: 95,
          searchVolume: '8,100/mo',
          competition: 'Low',
          opportunity: '30% potential growth',
          keywords: ['AI automation', 'workflow failures', 'RevOps']
        },
        ...workflowContent.stages.topics.alternatives.slice(0, 2).map((alt, idx) => ({
          id: `topic-${idx + 2}`,
          title: alt,
          description: 'Alternative angle focusing on specific pain points',
          relevance: 85 - (idx * 5),
          searchVolume: `${6500 - (idx * 1000)}/mo`,
          competition: idx === 0 ? 'Medium' : 'Low',
          opportunity: `${100 - (idx * 10)}% time saved potential`,
          keywords: ['automation', 'workflows', 'business']
        }))
      ];
      store.setTopicOptions(topics);
      store.nextStage();
    } else if (store.currentStage === 'topics' && store.selectedTopic) {
      // Generate brief from workflow data
      const brief = {
        title: store.selectedTopic.title,
        hook: workflowContent.stages.brief.hook,
        targetAudience: workflowContent.stages.brief.targetAudience,
        outline: workflowContent.stages.brief.outline,
        seoOptimization: workflowContent.stages.brief.seoOptimization,
        estimatedReadTime: workflowContent.stages.brief.estimatedReadTime,
        callToAction: workflowContent.stages.brief.callToAction
      };
      store.setBrief(brief);
      store.nextStage();
    } else if (store.currentStage === 'brief') {
      // Load draft content
      store.setDraft(workflowContent.stages.draft.content);
      store.nextStage();
    } else if (store.currentStage === 'draft') {
      store.nextStage();
    }
    
    setIsProcessing(false);
  };

  const handleSaveProgress = () => {
    const documentId = store.saveProgress();
    console.log('Progress saved with ID:', documentId);
  };

  // Render Draft Stage - Use your draft.tsx component
  if (store.currentStage === 'draft') {
    return <DraftEditorPage />;
  }

  const stages = [
    { id: 'input', name: 'Requirements', icon: FileText },
    { id: 'topics', name: 'Topics', icon: Target },
    { id: 'brief', name: 'Brief', icon: Brain },
    { id: 'draft', name: 'Draft', icon: FileText },
    { id: 'complete', name: 'Complete', icon: CheckCircle }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === store.currentStage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/demo/content-studio')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Blog Content</h1>
                <p className="text-sm text-gray-600">AI-powered content creation workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={handleSaveProgress}>
                <Save className="w-4 h-4 mr-1" />
                Save Progress
              </Button>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                ~45 min
              </Badge>
              <Badge variant="secondary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = stage.id === store.currentStage;
              const isComplete = currentStageIndex > index;
              
              return (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${
                    isActive ? 'text-gray-900' : isComplete ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-gray-900 text-white' : 
                      isComplete ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      {isComplete && stage.id !== store.currentStage ? 
                        <CheckCircle className="w-5 h-5" /> : 
                        <Icon className="w-5 h-5" />
                      }
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">{stage.name}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-3 transition-all ${
                      isComplete ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Input Stage */}
        {store.currentStage === 'input' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Content Requirements</CardTitle>
                  <CardDescription>Define your content goals and parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                    <Input
                      value={store.userInput.companyName}
                      onChange={(e) => store.setUserInput({...store.userInput, companyName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Target Audience</label>
                    <Input
                      value={store.userInput.targetAudience}
                      onChange={(e) => store.setUserInput({...store.userInput, targetAudience: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Content Requirements</label>
                    <Textarea
                      value={store.userInput.requirements}
                      onChange={(e) => store.setUserInput({...store.userInput, requirements: e.target.value})}
                      rows={5}
                      className="font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Keywords</label>
                    <Input
                      value={store.userInput.keywords.join(', ')}
                      onChange={(e) => store.setUserInput({
                        ...store.userInput, 
                        keywords: e.target.value.split(',').map(k => k.trim())
                      })}
                      placeholder="AI automation, workflow automation, RevOps"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Tone & Style</label>
                    <Input
                      value={store.userInput.tone}
                      onChange={(e) => store.setUserInput({...store.userInput, tone: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-900">Market Opportunity</h4>
                      <p className="text-sm text-yellow-800 mt-1">
                        8,100 monthly searches for "Zapier too expensive" with 0% {store.userInput.companyName} presence
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-700">Potential growth</span>
                          <span className="font-medium text-yellow-900">30%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-700">Competition</span>
                          <Badge className="bg-green-100 text-green-700">Low</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Content Gap</span>
                      <Badge className="bg-red-100 text-red-700">Critical</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Audience Match</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Success Probability</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Est. Engagement</span>
                      <span className="font-medium">3.2x avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Topics Stage */}
        {store.currentStage === 'topics' && (
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Choose Your Topic Angle</CardTitle>
                    <CardDescription>Select the best approach based on search data and competition</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    <Brain className="w-3 h-3 mr-1" />
                    AI-Generated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {store.topicOptions.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => store.selectTopic(topic)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      store.selectedTopic?.id === topic.id 
                        ? 'border-gray-900 bg-gray-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{topic.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{topic.searchVolume}</span>
                          </div>
                          <Badge 
                            variant="secondary"
                            className={
                              topic.competition === 'Low' ? 'bg-green-100 text-green-700' :
                              topic.competition === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }
                          >
                            {topic.competition} competition
                          </Badge>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{topic.opportunity}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {topic.keywords.map((kw, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Hash className="w-2 h-2 mr-0.5" />
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {topic.relevance}% match
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                // Regenerate topics
                setIsProcessing(true);
                setTimeout(() => {
                  // Add logic to regenerate topics
                  setIsProcessing(false);
                }, 1500);
              }}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
              Generate Different Topics
            </Button>
          </div>
        )}

        {/* Brief Stage */}
        {store.currentStage === 'brief' && store.brief && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Content Brief</CardTitle>
                      <CardDescription>Review and refine your AI-generated structure</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {store.brief.estimatedReadTime}
                      </Badge>
                      <Badge variant="secondary">
                        ~2,500 words
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Hook */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Opening Hook</h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 italic">"{store.brief.hook}"</p>
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Target Audience</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Primary: {store.brief.targetAudience.primary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Secondary: {store.brief.targetAudience.secondary}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 font-medium mb-1">Pain Points:</p>
                          <div className="flex flex-wrap gap-1">
                            {store.brief.targetAudience.painPoints.map((pain, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {pain}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Outline */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Content Structure</h3>
                      <div className="space-y-3">
                        {store.brief.outline.map((section, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{section.section}</h4>
                                <ul className="mt-2 space-y-1">
                                  {section.points.map((point, pidx) => (
                                    <li key={pidx} className="text-sm text-gray-600 flex items-start">
                                      <span className="text-gray-400 mr-2">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Badge variant="secondary" className="ml-3">
                                ~{section.wordCount} words
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Call to Action</h3>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-900">{store.brief.callToAction}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {/* SEO Optimization */}
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Primary Keyword</p>
                      <Badge variant="secondary" className="text-xs">
                        {store.brief.seoOptimization.primaryKeyword}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Secondary Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {store.brief.seoOptimization.secondaryKeywords.slice(0, 3).map((kw, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Structured Data</p>
                      <div className="flex flex-wrap gap-1">
                        {store.brief.seoOptimization.structuredData.map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions Answered */}
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Questions This Post Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {store.brief.seoOptimization.questionsThisPostAnswers.slice(0, 4).map((q, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-gray-400 mr-2">?</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              {workflowContent.stages.draft.aiSuggestions && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-blue-600" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {workflowContent.stages.draft.aiSuggestions.slice(0, 3).map((suggestion, idx) => (
                        <li key={idx} className="text-xs text-blue-800 flex items-start">
                          <span className="text-blue-600 mr-2">→</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Complete Stage */}
        {store.currentStage === 'complete' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Published Successfully!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your content is now live and optimized for maximum engagement and search visibility.
            </p>
            
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Performance Prediction</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">3,847</p>
                  <p className="text-sm text-gray-600">Expected views/mo</p>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Lead Generation</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">50-75</p>
                  <p className="text-sm text-gray-600">MQLs expected</p>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <DollarSign className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Revenue Impact</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">$25-50K</p>
                  <p className="text-sm text-gray-600">Potential growth</p>
                </CardContent>
              </Card>
            </div>    

            {/* Performance Insights */}
            {workflowContent.performance && (
              <Card className="border-gray-200 max-w-2xl mx-auto mb-8">
                <CardHeader>
                  <CardTitle className="text-sm">Live Performance Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Views</span>
                      <span className="font-medium">{workflowContent.performance.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avg. Time on Page</span>
                      <span className="font-medium">{workflowContent.performance.avgTimeOnPage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-medium text-green-600">{workflowContent.performance.conversionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AI Mentions</span>
                      <span className="font-medium">{workflowContent.performance.aiMentions}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Insight:</strong> {workflowContent.performance.insight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => router.push('/demo/content-studio')}
                variant="secondary"
              >
                Back to Studio
              </Button>
              <Button
                onClick={() => {
                  store.reset();
                  store.startWorkflow('blog-create');
                }}
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                Create Another
              </Button>
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-1" />
                Export Content
              </Button>
              <Button variant="secondary">
                <Eye className="w-4 h-4 mr-1" />
                View Live
              </Button>
            </div>
          </div>
        )}
        {/* Action Buttons */}
        {store.currentStage !== 'complete' && (
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="secondary"
              onClick={() => store.previousStage()}
              disabled={currentStageIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNextStage}
              disabled={
                isProcessing || 
                (store.currentStage === 'topics' && !store.selectedTopic)
              }
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {store.currentStage === 'input' ? 'Generate Topics' :
                   store.currentStage === 'topics' ? 'Create Brief' :
                   store.currentStage === 'brief' ? 'Generate Draft' : 'Publish'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}