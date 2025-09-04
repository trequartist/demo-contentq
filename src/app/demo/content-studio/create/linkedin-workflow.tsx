"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Input, Textarea } from '@/components/ui';
import { 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Target, 
  Brain, 
  RefreshCw, 
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Clock,
  Users,
  Hash,
  Save,
  Send,
  CheckCircle2
} from 'lucide-react';

export default function LinkedInWorkflowPage() {
  const router = useRouter();
  const store = useContentStudioStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const templates = contentStudioData.getWorkflowTemplates('linkedin');
  
  const [formData, setFormData] = useState({
    companyName: (templates as any)?.requirements?.companyName || 'Gumloop',
    postIdea: '',
    targetAudience: (templates as any)?.requirements?.defaultAudience || '',
    tone: (templates as any)?.requirements?.defaultTone || 'Professional yet conversational',
    hashtags: (templates as any)?.requirements?.defaultHashtags || [],
    painPoint: '',
    outcome: ''
  });

  const [selectedAngle, setSelectedAngle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [briefContent, setBriefContent] = useState<any>(null);
  const [angleOptions] = useState([
    {
      id: 'personal-story',
      title: 'Personal Story',
      description: 'Share a vulnerability or lesson learned',
      hook: 'Start with "I made a $X mistake..." or "Last week changed everything..."',
      structure: 'Hook → Context → Conflict → Resolution → Lesson → CTA',
      engagement: 'High (3-5x average)',
      example: 'I lost $50K by ignoring this one automation metric...'
    },
    {
      id: 'contrarian-view',
      title: 'Contrarian Take',
      description: 'Challenge conventional wisdom',
      hook: 'Start with "Everyone says X, but..." or "Unpopular opinion:"',
      structure: 'Contrarian statement → Evidence → Why others are wrong → Your approach → Results',
      engagement: 'Very High (4-6x average)',
      example: 'Stop A/B testing. Here\'s what actually moves revenue...'
    },
    {
      id: 'data-insight',
      title: 'Data Revelation',
      description: 'Share surprising statistics or research',
      hook: 'Lead with shocking stat or "We analyzed X and found..."',
      structure: 'Data hook → Context → Deep dive → Implications → Action items',
      engagement: 'High (2-4x average)',
      example: '87% of AI tools fail because of this one integration issue...'
    },
    {
      id: 'how-to-guide',
      title: 'Tactical How-To',
      description: 'Step-by-step process or framework',
      hook: 'Promise specific outcome in specific timeframe',
      structure: 'Promise → Problem context → Step-by-step → Results → Template/Resource',
      engagement: 'Medium-High (2-3x average)',
      example: 'How we automated 73% of our sales process in 30 days (step-by-step)'
    },
    {
      id: 'industry-prediction',
      title: 'Future Prediction',
      description: 'Bold prediction about industry changes',
      hook: 'Start with "In 2025, X will be dead" or "The next 12 months will..."',
      structure: 'Prediction → Current state → Signals of change → Impact → How to prepare',
      engagement: 'High (3-4x average)',
      example: 'AI SDRs will replace 60% of sales teams by 2025. Here\'s why...'
    },
    {
      id: 'myth-buster',
      title: 'Myth Buster',
      description: 'Debunk common misconceptions',
      hook: 'Start with "The biggest lie in X is..." or "Stop believing this about Y"',
      structure: 'Myth statement → Why it\'s wrong → Evidence → Truth → New approach',
      engagement: 'High (3-5x average)',
      example: 'The biggest lie in SaaS: "More features = more value"'
    }
  ]);

  useEffect(() => {
    if (!store.activeWorkflow || store.activeWorkflow !== 'linkedin-create') {
      store.startWorkflow('linkedin-create');
    }
  }, []);

  const handleNextStage = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (store.currentStage === 'input') {
      store.nextStage();
    } else if (store.currentStage === 'angles' && selectedAngle) {
      // Generate brief
      const angle = angleOptions.find(a => a.id === selectedAngle);
      setBriefContent({
        angle: angle,
        structure: angle?.structure,
        hook: angle?.hook,
        targetLength: '1,300-1,500 characters',
        bestTime: 'Tuesday 9 AM EST or Thursday 11 AM EST',
        expectedEngagement: angle?.engagement,
        hashtags: ['#automation', '#AI', '#saas', '#growth', '#leadership'],
        painPoint: formData.painPoint,
        outcome: formData.outcome
      });
      store.nextStage();
    } else if (store.currentStage === 'brief') {
      // Generate post
      const angle = angleOptions.find(a => a.id === selectedAngle);
      setPostContent(generateLinkedInPost(angle!, formData));
      store.nextStage();
    } else if (store.currentStage === 'post') {
      store.nextStage();
    }
    
    setIsProcessing(false);
  };

  const generateLinkedInPost = (angle: any, data: any) => {
    if (angle.id === 'personal-story') {
      return `Last week, I learned a $500K lesson about automation...

It started with a Monday morning crisis.

Our enterprise lead sat in the wrong queue for 4 days because their title was "Chief Revenue Acceleration Officer" instead of "VP Sales."

The competition closed them while we were debugging routing rules.

Here's what this taught me about the 40% of automation that traditional rules can't handle:

1️⃣ Format variations break everything
   → Phone numbers have 10+ formats
   → Job titles are creative chaos
   → Company sizes are subjective

2️⃣ Context matters more than keywords
   → "Interested" from Fortune 500 ≠ startup inquiry
   → "ASAP" means different things to different people
   → Intent requires understanding, not matching

3️⃣ Edge cases multiply exponentially
   → Every new rule creates 3 new exceptions
   → Maintenance becomes a full-time job
   → The complexity compounds weekly

The solution? AI that understands intent, not just patterns.

At ${data.companyName}, we've seen RevOps teams reduce manual fixes by 60-80% and recover 15+ hours weekly.

What's your most frustrating automation failure?

${data.hashtags.join(' ')}`;
    } else if (angle.id === 'industry-insight') {
      return `3 automation trends RevOps leaders can't ignore in 2024:

After analyzing 1,000+ RevOps workflows, the patterns are clear.

1. The 60/40 Split
   • 60% of workflows work fine with rules
   • 40% require human-like reasoning
   • Most teams try to force everything into rules

2. The Hidden Cost Crisis
   • Average team spends 15 hrs/week on fixes
   • $75K monthly impact from broken workflows
   • 127 failed leads per month on average

3. The AI Advantage
   • 79% → 94% routing accuracy improvement
   • 12% conversion rate (vs 2% industry avg)
   • 207% ROI within 90 days

The teams winning in 2024 aren't adding more rules.
They're using AI to handle what rules never could.

Ready to fix your Monday morning crisis?

${data.hashtags.join(' ')}`;
    } else {
      return `Your automation shouldn't break when humans act human.

Yet here we are.

${data.hashtags.join(' ')}`;
    }
  };

  const stages = [
    { id: 'input', name: 'Requirements', icon: MessageSquare },
    { id: 'angles', name: 'Angles', icon: Target },
    { id: 'brief', name: 'Brief', icon: Brain },
    { id: 'post', name: 'Post', icon: MessageSquare },
    { id: 'complete', name: 'Complete', icon: CheckCircle }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === store.currentStage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/demo/content-studio')}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-black/60" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-black">Create LinkedIn Post</h1>
                <p className="text-sm text-black/60">Professional content optimized for engagement</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                ~20 min
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
      <div className="bg-black/[0.02] border-b border border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = stage.id === store.currentStage;
              const isComplete = currentStageIndex > index;
              
              return (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${
                    isActive ? 'text-black' : isComplete ? 'text-green-600' : 'text-black/40'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-black text-white' : 
                      isComplete ? 'bg-green-100' : 'bg-black/10'
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
                      isComplete ? 'bg-green-600' : 'bg-black/20'
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
              <Card className="border border-black/10">
                <CardHeader>
                  <CardTitle>Post Requirements</CardTitle>
                  <CardDescription>Define your LinkedIn post goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Post Idea</label>
                    <Textarea
                      value={formData.postIdea}
                      onChange={(e) => setFormData({...formData, postIdea: e.target.value})}
                      placeholder="What message do you want to share with your network?"
                      rows={4}
                      className="font-sans"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Target Audience</label>
                    <Input
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      placeholder="RevOps professionals, B2B SaaS leaders"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Tone</label>
                    <Input
                      value={formData.tone}
                      onChange={(e) => setFormData({...formData, tone: e.target.value})}
                      placeholder="Professional yet conversational"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Hashtags</label>
                    <Input
                      value={formData.hashtags.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData, 
                        hashtags: e.target.value.split(',').map(h => h.trim())
                      })}
                      placeholder="#RevOps, #Automation, #AI"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900">Best Practices</h4>
                      <ul className="text-sm text-blue-800 mt-2 space-y-1">
                        <li>• Post Tuesday-Thursday, 8-10 AM</li>
                        <li>• Keep under 1,300 characters</li>
                        <li>• Use 3-5 relevant hashtags</li>
                        <li>• Include a question to drive engagement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-black/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Engagement Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Expected Views</span>
                      <span className="font-medium">2,500-5,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Engagement Rate</span>
                      <span className="font-medium">8-12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Best Day</span>
                      <span className="font-medium">Tuesday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Angles Stage */}
        {store.currentStage === 'angles' && (
          <Card className="border border-black/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Choose Your Angle</CardTitle>
                  <CardDescription>Select the best approach for your message</CardDescription>
                </div>
                <Badge variant="secondary">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {angleOptions.map((angle) => (
                <div
                  key={angle.id}
                  onClick={() => setSelectedAngle(angle.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAngle === angle.id 
                      ? 'border-black bg-black/[0.02] shadow-sm' 
                      : 'border-black/10 hover:border-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-black">{angle.title}</h3>
                        <Badge 
                          className={
                            angle.engagement.includes('Very High') ? 'bg-black text-white text-xs' :
                            angle.engagement.includes('High') ? 'bg-black/10 text-black text-xs border-0' :
                            'bg-white border border-black/20 text-black/60 text-xs'
                          }
                        >
                          {angle.engagement}
                        </Badge>
                      </div>
                      <p className="text-sm text-black/60 mb-2">{angle.description}</p>
                      <p className="text-sm text-black/80 font-medium mb-1">Hook approach:</p>
                      <p className="text-sm text-black/70 italic mb-2">"{angle.hook}"</p>
                      <p className="text-xs text-black/50 mb-1">Example: {angle.example}</p>
                      <div className="mt-3 pt-3 border-t border-black/5">
                        <p className="text-xs text-black/40">Structure: {angle.structure}</p>
                      </div>
                    </div>
                    {selectedAngle === angle.id && (
                      <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Brief Stage */}
        {store.currentStage === 'brief' && briefContent && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="border border-black/10">
                <CardHeader>
                  <CardTitle>Post Brief</CardTitle>
                  <CardDescription>Review your LinkedIn post structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-2">Angle</h3>
                    <div className="p-3 bg-black/[0.02] rounded-lg">
                      <p className="font-medium">{briefContent.angle.name}</p>
                      <p className="text-sm text-black/60 mt-1">{briefContent.angle.hook}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-black mb-2">Structure</h3>
                    <p className="text-sm text-gray-700">{briefContent.structure}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-black mb-2">Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {briefContent.hashtags.map((tag: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                          <Hash className="w-3 h-3 mr-1" />
                          {tag.replace('#', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border border-black/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Target Length</span>
                      <span className="font-medium">{briefContent.targetLength}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Best Time</span>
                      <span className="font-medium">{briefContent.bestTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60">Expected Engagement</span>
                      <Badge variant="secondary" className="text-xs">
                        {briefContent.expectedEngagement}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Post Stage */}
        {store.currentStage === 'post' && (
          <Card className="border border-black/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your LinkedIn Post</CardTitle>
                  <CardDescription>Review and edit your post before publishing</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {postContent.length} chars
                  </Badge>
                  <Badge variant="secondary">
                    ~{Math.ceil(postContent.split(' ').length / 200)} min read
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={15}
                className="font-sans text-sm"
              />
              <div className="mt-4 flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="secondary" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Complete Stage */}
        {store.currentStage === 'complete' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">LinkedIn Post Ready!</h2>
            <p className="text-black/60 mb-8 max-w-md mx-auto">
              Your post is optimized for maximum engagement and ready to publish.
            </p>
            
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
                  store.startWorkflow('linkedin-create');
                }}
                className="bg-black text-white hover:bg-gray-800"
              >
                Create Another
              </Button>
              <Button variant="secondary">
                <Send className="w-4 h-4 mr-1" />
                Post to LinkedIn
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
                (store.currentStage === 'angles' && !selectedAngle) ||
                (store.currentStage === 'input' && !formData.postIdea)
              }
              className="bg-black text-white hover:bg-gray-800"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {store.currentStage === 'input' ? 'Generate Angles' :
                   store.currentStage === 'angles' ? 'Create Brief' :
                   store.currentStage === 'brief' ? 'Generate Post' :
                   store.currentStage === 'post' ? 'Finish' : 'Continue'}
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
