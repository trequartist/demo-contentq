"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText,
  Target,
  Users,
  MessageSquare,
  Check,
  ChevronRight,
  Lightbulb,
  Brain,
  Rocket,
  BookOpen,
  PenTool,
  Search
} from 'lucide-react';
import { useDemo } from '@/lib/demo/demo-context';

type ContentType = 'create' | 'improve' | null;
type StepType = 'topic' | 'audience' | 'brief' | 'generate' | 'review';

interface ContentData {
  title: string;
  topic: string;
  audience: string;
  tone: string;
  keywords: string[];
  brief: string;
  content: string;
  type: 'blog' | 'linkedin';
}

export default function CreateContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { actions } = useDemo();
  
  const [selectedOption, setSelectedOption] = useState<ContentType>(null);
  const [currentStep, setCurrentStep] = useState<StepType>('topic');
  const [generating, setGenerating] = useState(false);
  
  const [contentData, setContentData] = useState<ContentData>({
    title: '',
    topic: '',
    audience: '',
    tone: 'professional',
    keywords: [],
    brief: '',
    content: '',
    type: searchParams.get('type') as 'blog' | 'linkedin' || 'blog'
  });

  const [keywordInput, setKeywordInput] = useState('');

  const steps = [
    { id: 'topic', label: 'Topic & Title', icon: Lightbulb },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'brief', label: 'Brief', icon: FileText },
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'review', label: 'Review', icon: Check }
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as StepType);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as StepType);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedContent = `# ${contentData.title}

## Introduction

This content addresses the topic of ${contentData.topic} for our ${contentData.audience} audience.

## Key Points

${contentData.brief}

## Main Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is where your AI-generated content would appear, tailored to your specifications and optimized for your target audience.

### Section 1: Understanding the Basics

Your content here would explore the fundamental concepts related to ${contentData.topic}.

### Section 2: Advanced Strategies

This section would dive deeper into sophisticated approaches and best practices.

### Section 3: Implementation Guide

Step-by-step instructions for putting these concepts into practice.

## Conclusion

Summarizing the key takeaways and providing actionable next steps for your readers.

---

*Keywords: ${contentData.keywords.join(', ')}*
*Tone: ${contentData.tone}*
`;
    
    setContentData({ ...contentData, content: generatedContent });
    setGenerating(false);
    handleNext();
  };

  const handlePublish = () => {
    actions.createDocument({
      title: contentData.title,
      description: contentData.brief.substring(0, 200),
      content: contentData.content,
      status: 'draft',
      type: contentData.type,
      tags: contentData.keywords
    });
    
    router.push('/demo/content-studio');
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !contentData.keywords.includes(keywordInput.trim())) {
      setContentData({
        ...contentData,
        keywords: [...contentData.keywords, keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setContentData({
      ...contentData,
      keywords: contentData.keywords.filter(k => k !== keyword)
    });
  };

  if (!selectedOption) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/demo/content-studio" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Content Studio
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
          <div className="max-w-4xl w-full text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Amazing Content</h1>
            <p className="text-gray-600">Choose your content creation approach</p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
            {/* Create Content Option */}
            <div 
              className={`relative bg-white border-2 rounded-xl p-8 text-center cursor-pointer transition-all hover:shadow-xl transform hover:scale-105 ${
                selectedOption === 'create' ? 'border-blue-500 shadow-xl' : 'border-gray-200'
              }`}
              onClick={() => setSelectedOption('create')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Content</h2>
              <p className="text-sm text-gray-600 mb-6">
                AI-powered content creation with guided workflow
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span>Topic Selection</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <PenTool className="w-4 h-4 text-gray-400" />
                  <span>Brief & Draft</span>
                </div>
              </div>
              <button 
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Creating</span>
              </button>
            </div>

            {/* Improve Content Option */}
            <div 
              className={`relative bg-white border-2 rounded-xl p-8 text-center cursor-pointer transition-all hover:shadow-xl transform hover:scale-105 ${
                selectedOption === 'improve' ? 'border-purple-500 shadow-xl' : 'border-gray-200'
              }`}
              onClick={() => router.push('/demo/content-studio/improve')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Improve Content</h2>
              <p className="text-sm text-gray-600 mb-6">
                Enhance existing content with AI analysis
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span>Content Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Brain className="w-4 h-4 text-gray-400" />
                  <span>AI Improvements</span>
                </div>
              </div>
              <button 
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Improve Content</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Content Creation Wizard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/demo/content-studio" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back to Content Studio
            </Link>
            <span className="text-sm text-gray-500">
              {contentData.type === 'blog' ? 'Blog Post' : 'LinkedIn Post'}
            </span>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-blue-600 text-white' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wizard Content */}
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Topic Step */}
          {currentStep === 'topic' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your topic?</h2>
              <p className="text-gray-600 mb-6">Let's start with the main topic and title for your content.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Title
                  </label>
                  <input
                    type="text"
                    value={contentData.title}
                    onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a compelling title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Topic
                  </label>
                  <textarea
                    value={contentData.topic}
                    onChange={(e) => setContentData({ ...contentData, topic: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe the main topic you want to cover..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {contentData.keywords.map(keyword => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center space-x-1"
                        >
                          <span>{keyword}</span>
                          <button
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add keyword..."
                      />
                      <button
                        onClick={handleAddKeyword}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audience Step */}
          {currentStep === 'audience' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Who's your audience?</h2>
              <p className="text-gray-600 mb-6">Define your target audience and the tone of your content.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={contentData.audience}
                    onChange={(e) => setContentData({ ...contentData, audience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technical professionals, Business leaders, Developers..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone of Voice
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['professional', 'casual', 'technical', 'friendly', 'authoritative', 'educational'].map(tone => (
                      <button
                        key={tone}
                        onClick={() => setContentData({ ...contentData, tone })}
                        className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                          contentData.tone === tone
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Brief Step */}
          {currentStep === 'brief' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your brief</h2>
              <p className="text-gray-600 mb-6">Outline the key points and structure of your content.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Brief
                  </label>
                  <textarea
                    value={contentData.brief}
                    onChange={(e) => setContentData({ ...contentData, brief: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Outline the main points you want to cover..."
                    rows={8}
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                    AI Suggestions
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Include statistics and data points</li>
                    <li>• Add real-world examples</li>
                    <li>• Consider potential objections</li>
                    <li>• End with a clear call-to-action</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Generate Step */}
          {currentStep === 'generate' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to generate!</h2>
              <p className="text-gray-600 mb-8">AI will create your content based on your specifications.</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-medium text-gray-900 mb-3">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="text-gray-900 font-medium">{contentData.title || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Audience:</span>
                    <span className="text-gray-900 font-medium">{contentData.audience || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tone:</span>
                    <span className="text-gray-900 font-medium capitalize">{contentData.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keywords:</span>
                    <span className="text-gray-900 font-medium">{contentData.keywords.length} added</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center mx-auto"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review your content</h2>
              <p className="text-gray-600 mb-6">Review and edit the generated content before publishing.</p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {contentData.content}
                  </pre>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentStep('generate')}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 'topic'}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {currentStep !== 'generate' && currentStep !== 'review' && (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 'topic' && !contentData.title) ||
                  (currentStep === 'audience' && !contentData.audience) ||
                  (currentStep === 'brief' && !contentData.brief)
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}