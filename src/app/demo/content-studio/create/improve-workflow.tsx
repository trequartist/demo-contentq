"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import { contentStudioData } from '@/lib/content-studio-data-loader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Textarea } from '@/components/ui';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  Search, 
  Sparkles, 
  CheckCircle,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Target,
  Edit3,
  Save,
  Clock,
  BarChart3,
  Zap
} from 'lucide-react';

export default function ImproveWorkflowPage() {
  const router = useRouter();
  const store = useContentStudioStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const templates = contentStudioData.getWorkflowTemplates('improve');
  
  const [importedContent, setImportedContent] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [improvedContent, setImprovedContent] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!store.activeWorkflow || store.activeWorkflow !== 'blog-improve') {
      store.startWorkflow('blog-improve');
    }
  }, []);

  const handleNextStage = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (store.currentStage === 'import') {
      // Move to analysis
      store.nextStage();
      performAnalysis();
    } else if (store.currentStage === 'analysis') {
      // Generate suggestions
      generateSuggestions();
      store.nextStage();
    } else if ((store.currentStage as string) === 'suggestions') {
      // Apply improvements
      applyImprovements();
      store.nextStage();
    } else if ((store.currentStage as string) === 'editing') {
      store.nextStage();
    }
    
    setIsProcessing(false);
  };

  const performAnalysis = () => {
    setAnalysisResults({
      seo: {
        current: 65,
        potential: 92,
        issues: [
          'Title needs optimization',
          'Missing meta description',
          'Low keyword density',
          'No internal links'
        ]
      },
      aeo: {
        current: 45,
        potential: 78,
        issues: [
          'No structublack data',
          'Missing FAQ section',
          'No definition boxes',
          'Lacks comparison tables'
        ]
      },
      readability: {
        current: 72,
        potential: 88,
        issues: [
          'Long paragraphs',
          'Complex sentences',
          'Low transition word usage'
        ]
      },
      engagement: {
        current: 58,
        potential: 85,
        issues: [
          'Weak hook',
          'No visual elements mentioned',
          'Generic CTA'
        ]
      }
    });
  };

  const generateSuggestions = () => {
    setSuggestions([
      {
        id: 'seo-1',
        category: 'SEO',
        title: 'Optimize Title for Search',
        description: 'Add target keyword "AI automation" to the beginning of title',
        impact: '+15 SEO score',
        priority: 'high'
      },
      {
        id: 'seo-2',
        category: 'SEO',
        title: 'Add Meta Description',
        description: 'Create compelling 150-160 character meta description',
        impact: '+10 SEO score',
        priority: 'high'
      },
      {
        id: 'aeo-1',
        category: 'AEO',
        title: 'Add FAQ Section',
        description: 'Include 5-7 common questions with detailed answers',
        impact: '+20 AEO score',
        priority: 'medium'
      },
      {
        id: 'aeo-2',
        category: 'AEO',
        title: 'Create Comparison Table',
        description: 'Add table comparing AI vs rule-based automation',
        impact: '+15 AEO score',
        priority: 'medium'
      },
      {
        id: 'read-1',
        category: 'Readability',
        title: 'Break Up Long Paragraphs',
        description: 'Split paragraphs over 4 sentences',
        impact: '+8 readability',
        priority: 'low'
      },
      {
        id: 'engage-1',
        category: 'Engagement',
        title: 'Strengthen Opening Hook',
        description: 'Start with compelling statistic or scenario',
        impact: '+12 engagement',
        priority: 'high'
      }
    ]);
  };

  const applyImprovements = () => {
    let improved = importedContent;
    
    // Apply selected improvements (mock)
    if (selectedSuggestions.includes('seo-1')) {
      improved = `# AI Automation: ${improved.substring(2)}`;
    }
    
    if (selectedSuggestions.includes('aeo-1')) {
      improved += `\n\n## Frequently Asked Questions\n\n### What is AI automation?\nAI automation uses machine learning to handle complex, context-dependent tasks...\n\n### How is it different from rule-based automation?\nUnlike rules, AI understands intent and context...`;
    }
    
    setImprovedContent(improved);
  };

  const toggleSuggestion = (id: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const stages = [
    { id: 'import', name: 'Import', icon: Upload },
    { id: 'analysis', name: 'Analysis', icon: Search },
    { id: 'suggestions', name: 'Suggestions', icon: Sparkles },
    { id: 'editing', name: 'Editing', icon: Edit3 },
    { id: 'complete', name: 'Complete', icon: CheckCircle }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === store.currentStage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black/10">
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
                <h1 className="text-xl font-light text-black">Improve Existing Content</h1>
                <p className="text-sm text-black/40">AI-poweblack content optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-black/5 text-black/60 border-black/10">
                <Clock className="w-3 h-3 mr-1" />
                ~30 min
              </Badge>
              <Badge variant="secondary" className="bg-black/5 text-black/60 border-black/10">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Poweblack
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-black/[0.02] border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = stage.id === store.currentStage;
              const isComplete = currentStageIndex > index;
              
              return (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${
                    isActive ? 'text-black' : isComplete ? 'text-black/80' : 'text-black/40'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-black text-white' : 
                      isComplete ? 'bg-black/10' : 'bg-black/5'
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
                      isComplete ? 'bg-black/60' : 'bg-black/20'
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
        {/* Import Stage */}
        {store.currentStage === 'import' && (
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle>Import Your Content</CardTitle>
              <CardDescription>Paste your existing content or provide a URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-black/20 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-black/40 mx-auto mb-4" />
                <p className="text-black/60 mb-4">Drop your file here or paste content below</p>
                <div className="flex items-center justify-center gap-4">
                  <Button variant="secondary">Upload File</Button>
                  <Button variant="secondary">Import from URL</Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">Or paste your content</label>
                <Textarea
                  value={importedContent}
                  onChange={(e) => setImportedContent(e.target.value)}
                  placeholder="Paste your blog post, article, or any content you want to improve..."
                  rows={12}
                  className="font-sans"
                />
              </div>

              <div className="bg-black/[0.02] border border-black/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-black">What we'll analyze</h4>
                    <ul className="text-sm text-black/80 mt-2 space-y-1">
                      <li>• SEO optimization opportunities</li>
                      <li>• AEO (Answer Engine Optimization)</li>
                      <li>• Readability and structure</li>
                      <li>• Engagement and conversion elements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Stage */}
        {store.currentStage === 'analysis' && analysisResults && (
          <div className="space-y-6">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Content Analysis Results</CardTitle>
                <CardDescription>We've identified multiple improvement opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* SEO Analysis */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">SEO Score</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-black/40">{analysisResults.seo.current}</span>
                          <ArrowRight className="w-4 h-4 text-black/40" />
                          <span className="text-2xl font-bold text-black/60">{analysisResults.seo.potential}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-black/50 to-black/50" style={{ width: `${analysisResults.seo.potential}%` }} />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {analysisResults.seo.issues.map((issue: string, idx: number) => (
                          <li key={idx} className="text-sm text-black/60 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-black/50" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AEO Analysis */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">AEO Score</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-black/40">{analysisResults.aeo.current}</span>
                          <ArrowRight className="w-4 h-4 text-black/40" />
                          <span className="text-2xl font-bold text-black/60">{analysisResults.aeo.potential}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-black/50 to-black/50" style={{ width: `${analysisResults.aeo.potential}%` }} />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {analysisResults.aeo.issues.map((issue: string, idx: number) => (
                          <li key={idx} className="text-sm text-black/60 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-black/50" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Readability Analysis */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">Readability</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-black/60">{analysisResults.readability.current}</span>
                          <ArrowRight className="w-4 h-4 text-black/40" />
                          <span className="text-2xl font-bold text-black/60">{analysisResults.readability.potential}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-black/50 to-black/50" style={{ width: `${analysisResults.readability.potential}%` }} />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {analysisResults.readability.issues.map((issue: string, idx: number) => (
                          <li key={idx} className="text-sm text-black/60 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-black/50" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Engagement Analysis */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">Engagement</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-black/60">{analysisResults.engagement.current}</span>
                          <ArrowRight className="w-4 h-4 text-black/40" />
                          <span className="text-2xl font-bold text-black/60">{analysisResults.engagement.potential}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-black/50 to-black/50" style={{ width: `${analysisResults.engagement.potential}%` }} />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {analysisResults.engagement.issues.map((issue: string, idx: number) => (
                          <li key={idx} className="text-sm text-black/60 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-black/50" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Suggestions Stage */}
        {(store.currentStage as string) === 'suggestions' && (
          <div className="space-y-6">
            <Card className="border-black/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Improvement Suggestions</CardTitle>
                    <CardDescription>Select the improvements you want to apply</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {selectedSuggestions.length} selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => toggleSuggestion(suggestion.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedSuggestions.includes(suggestion.id)
                          ? 'border-black bg-black/[0.02] shadow-sm'
                          : 'border-black/10 hover:border-black/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="secondary"
                              className={
                                suggestion.category === 'SEO' ? 'bg-black/5 text-black/70' :
                                suggestion.category === 'AEO' ? 'bg-black/5 text-black/70' :
                                suggestion.category === 'Readability' ? 'bg-black/5 text-black/70' :
                                'bg-black/5 text-black/70'
                              }
                            >
                              {suggestion.category}
                            </Badge>
                            <Badge 
                              variant="secondary"
                              className={
                                suggestion.priority === 'high' ? 'bg-black/5 text-black/70' :
                                suggestion.priority === 'medium' ? 'bg-black/5 text-black/70' :
                                'bg-black/5 text-black/70'
                              }
                            >
                              {suggestion.priority} priority
                            </Badge>
                          </div>
                          <h3 className="font-medium text-black">{suggestion.title}</h3>
                          <p className="text-sm text-black/60 mt-1">{suggestion.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <TrendingUp className="w-4 h-4 text-black/60" />
                            <span className="text-sm font-medium text-black/60">{suggestion.impact}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedSuggestions.includes(suggestion.id)
                              ? 'bg-black border-black'
                              : 'border-black/20'
                          }`}>
                            {selectedSuggestions.includes(suggestion.id) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Editing Stage */}
        {(store.currentStage as string) === 'editing' && (
          <Card className="border-black/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Review Improved Content</CardTitle>
                  <CardDescription>AI has applied your selected improvements</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-black/5 text-black/70">
                    +27 SEO Score
                  </Badge>
                  <Badge variant="secondary" className="bg-black/5 text-black/70">
                    +33 AEO Score
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={improvedContent || importedContent}
                onChange={(e) => setImprovedContent(e.target.value)}
                rows={20}
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
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-black/60" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Content Improved!</h2>
            <p className="text-black/60 mb-8 max-w-md mx-auto">
              Your content has been optimized and is ready to publish.
            </p>
            
            <div className="bg-black/[0.02] rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-medium text-black mb-4">Improvement Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-black/60">SEO Score</p>
                  <p className="text-2xl font-bold text-black/60">92/100</p>
                </div>
                <div>
                  <p className="text-black/60">AEO Score</p>
                  <p className="text-2xl font-bold text-black/60">78/100</p>
                </div>
                <div>
                  <p className="text-black/60">Readability</p>
                  <p className="text-2xl font-bold text-black/60">88/100</p>
                </div>
                <div>
                  <p className="text-black/60">Engagement</p>
                  <p className="text-2xl font-bold text-black/60">85/100</p>
                </div>
              </div>
            </div>
            
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
                  store.startWorkflow('blog-improve');
                }}
                className="bg-black text-white hover:bg-black/80"
              >
                Improve Another
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
                (store.currentStage === 'import' && !importedContent)
              }
              className="bg-black text-white hover:bg-black/80"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {store.currentStage === 'import' ? 'Analyze Content' :
                   store.currentStage === 'analysis' ? 'Get Suggestions' :
                   (store.currentStage as any) === 'suggestions' ? 'Apply Improvements' :
                   (store.currentStage as any) === 'editing' ? 'Finish' : 'Continue'}
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
