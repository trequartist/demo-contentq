"use client";

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  RefreshCw,
  Eye,
  Edit,
  Save,
  Send
} from 'lucide-react';
import Link from 'next/link';

type ImprovementStage = 'upload' | 'analysis' | 'suggestions' | 'editing' | 'complete';

export default function ImproveContentPage() {
  const [currentStage, setCurrentStage] = useState<ImprovementStage>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedContent, setUploadedContent] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // Sample underperforming content for demo
  const sampleContent = `Understanding Workflow Automation

Workflow automation helps businesses save time by automating repetitive tasks. In this guide, we'll explore the basics of automation and how to get started.

What is Workflow Automation?
Workflow automation is the process of using technology to complete tasks without human intervention. It can help with tasks like data entry, email sending, and report generation.

Benefits of Automation:
- Saves time
- Reduces errors  
- Improves efficiency
- Scales operations

Getting Started:
To get started with workflow automation, you need to identify repetitive tasks in your business and find the right tools to automate them.

Conclusion:
Workflow automation is a powerful tool that can help your business become more efficient and productive.`;

  const stages = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'editing', label: 'Editing', icon: Edit },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const getCurrentStageIndex = () => {
    return stages.findIndex(stage => stage.id === currentStage);
  };

  const nextStage = () => {
    const currentIndex = getCurrentStageIndex();
    if (currentIndex < stages.length - 1) {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentStage(stages[currentIndex + 1].id as ImprovementStage);
        setIsProcessing(false);
        
        // Trigger analysis when moving to analysis stage
        if (stages[currentIndex + 1].id === 'analysis') {
          performAnalysis();
        }
      }, 2000);
    }
  };

  const prevStage = () => {
    const currentIndex = getCurrentStageIndex();
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1].id as ImprovementStage);
    }
  };

  const performAnalysis = () => {
    // Simulate analysis based on the diagnostic report insights
    setTimeout(() => {
      setAnalysisResults({
        currentScore: 42,
        potentialScore: 87,
        issues: [
          {
            issue: "Generic title with low search volume",
            current: "Understanding Workflow Automation",
            suggested: "The Hidden 40%: Workflows Your Current Automation Can't Handle",
            impact: "+156% CTR"
          },
          {
            issue: "No concrete examples or data",
            finding: "Zero proof points to build trust",
            solution: "Add 3 real scenarios with actual metrics",
            impact: "+89% engagement"
          },
          {
            issue: "Weak competitive positioning",
            finding: "Doesn't address why choose Gumloop over alternatives",
            solution: "Add comparison section highlighting AI advantages",
            impact: "+34% conversion"
          },
          {
            issue: "Missing search optimization",
            finding: "No coverage of high-volume keywords",
            gaps: ["Zapier alternative", "automation cost", "AI workflows"],
            impact: "+230% organic traffic potential"
          }
        ],
        recommendations: [
          "Rewrite opening with Monday Morning problem hook",
          "Add TechCorp case study with 73% cost reduction",
          "Include 60/40 automation split framework",
          "Add interactive ROI calculator embed"
        ]
      });
    }, 3000);
  };

  const ProgressBar = () => (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Improve Existing Content</h1>
        <Link href="/demo/content-studio">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to Studio
          </button>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.id === currentStage;
          const isCompleted = index < getCurrentStageIndex();
          
          return (
            <div key={stage.id} className="flex items-center">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive ? 'bg-black text-white' :
                isCompleted ? 'bg-gray-900 text-white' :
                'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{stage.label}</span>
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar />

      <div className="px-8 py-6">
        {currentStage === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Content for Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste your existing content
                  </label>
                  <textarea
                    rows={12}
                    value={uploadedContent || sampleContent}
                    onChange={(e) => setUploadedContent(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-mono text-sm"
                    placeholder="Paste your blog post content here..."
                  />
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>{(uploadedContent || sampleContent).split(' ').length} words</span>
                    <button 
                      onClick={() => setUploadedContent(sampleContent)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Use sample content
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">What we'll analyze:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-gray-700">SEO optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-gray-700">Content structure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-gray-700">Engagement potential</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-gray-700">Competitive positioning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStage}
                  disabled={!uploadedContent && !sampleContent}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <span>Analyze Content</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'analysis' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Analysis Results</h2>
              
              {!analysisResults ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Analyzing content performance potential...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Score Comparison */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-4xl font-bold text-red-600 mb-2">
                        {analysisResults.currentScore}
                      </div>
                      <p className="text-sm text-red-700">Current Score</p>
                      <p className="text-xs text-red-600 mt-1">Underperforming</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {analysisResults.potentialScore}
                      </div>
                      <p className="text-sm text-green-700">Potential Score</p>
                      <p className="text-xs text-green-600 mt-1">With improvements</p>
                    </div>
                  </div>

                  {/* Critical Issues */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Critical Issues Found</h3>
                    <div className="space-y-4">
                      {analysisResults.issues.map((issue: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{issue.issue}</h4>
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                              HIGH IMPACT
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            {issue.current && (
                              <div>
                                <span className="font-medium text-gray-700">Current:</span>
                                <p className="text-gray-600">"{issue.current}"</p>
                              </div>
                            )}
                            {issue.suggested && (
                              <div>
                                <span className="font-medium text-gray-700">Suggested:</span>
                                <p className="text-gray-900">"{issue.suggested}"</p>
                              </div>
                            )}
                            {issue.finding && (
                              <div>
                                <span className="font-medium text-gray-700">Finding:</span>
                                <p className="text-gray-600">{issue.finding}</p>
                              </div>
                            )}
                            {issue.solution && (
                              <div>
                                <span className="font-medium text-gray-700">Solution:</span>
                                <p className="text-gray-600">{issue.solution}</p>
                              </div>
                            )}
                            {issue.gaps && (
                              <div>
                                <span className="font-medium text-gray-700">Missing Keywords:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {issue.gaps.map((gap: string, gIndex: number) => (
                                    <span key={gIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                      {gap}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="mt-2">
                              <span className="font-medium text-green-700">Expected Impact:</span>
                              <span className="text-green-600 ml-1">{issue.impact}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-900 text-white rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Priority Recommendations</h3>
                    <div className="space-y-2">
                      {analysisResults.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-200">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={prevStage}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                {analysisResults && (
                  <button
                    onClick={nextStage}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
                  >
                    <span>Apply All Recommendations</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStage === 'suggestions' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Enhanced Content Preview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Before */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Original Content</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 h-96 overflow-y-auto">
                    <div className="space-y-3 text-sm text-gray-700">
                      {sampleContent.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={paragraph.trim() === '' ? 'hidden' : ''}>
                          {paragraph.includes('Understanding Workflow Automation') ? (
                            <span className="bg-red-200 px-1 rounded line-through">{paragraph}</span>
                          ) : paragraph.includes('What is Workflow Automation?') ? (
                            <span className="bg-yellow-200 px-1 rounded">{paragraph}</span>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-center text-sm text-red-600">
                    Score: {analysisResults?.currentScore}/100
                  </div>
                </div>

                {/* After */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Enhanced Content</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 h-96 overflow-y-auto">
                    <div className="space-y-3 text-sm text-gray-700">
                      <h1 className="text-lg font-bold bg-green-200 px-1 rounded">
                        When Rules Break: How AI Handles the 40% of Workflows Traditional Automation Can't
                      </h1>
                      <p className="bg-green-200 px-1 rounded">
                        <strong>Picture this:</strong> It's 8AM Monday, and your sales director pings you about a $500K deal lost 
                        because automation failed to route an enterprise prospect correctly...
                      </p>
                      <p>
                        <strong className="bg-green-200 px-1 rounded">The 60/40 Split That Changes Everything</strong>
                      </p>
                      <p>
                        Through analyzing thousands of RevOps workflows at Gumloop, one clear pattern emerges. 
                        About 60% of business automation works exactly as intended, but the other 40% live in constant chaos...
                      </p>
                      <p className="bg-green-200 px-1 rounded">
                        <strong>Real Customer Example:</strong> TechCorp reduced automation costs by 73% after migrating from Zapier, 
                        going from $2,400/month to $650/month while improving accuracy from 79% to 94%.
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-green-600">
                    Projected Score: {analysisResults?.potentialScore}/100
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-3">Transformation Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+115%</div>
                    <p className="text-xs text-gray-600">Projected Performance</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+850</div>
                    <p className="text-xs text-gray-600">Net Words Added</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+3</div>
                    <p className="text-xs text-gray-600">Interactive Elements</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">62→78</div>
                    <p className="text-xs text-gray-600">Readability Score</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={prevStage}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={nextStage}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
                >
                  <span>Apply Enhancements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'editing' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Enhanced Content Editor</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span>Auto-saving...</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    When Rules Break: How AI Handles the 40% of Workflows Traditional Automation Can't
                  </h1>
                  <div className="text-gray-800 leading-relaxed space-y-4">
                    <p>
                      Picture this: It's 8AM Monday, and you're grabbing coffee when your sales director pings on Slack — 
                      "We just lost that $500K enterprise deal because the prospect never got routed to me—they sat in the 
                      general queue for four days while the competition closed them." The culprit? Their job title was 
                      "Chief Revenue Acceleration Officer" instead of the expected "VP Sales," so your routing rules 
                      didn't recognize them as enterprise-level.
                    </p>
                    <p>
                      By 9AM, your CEO is asking why a Fortune 500 company that filled out a demo request got sent a 
                      nurture email about "getting started" instead of being fast-tracked to enterprise sales. Turns out 
                      they described their company size as "large enterprise" instead of selecting "1000+ employees" from your dropdown.
                    </p>
                    <p className="bg-green-100 border-l-4 border-green-500 pl-4 py-2">
                      <strong>If this sounds familiar, you're experiencing the real cost of traditional rule-based automation hitting its limits.</strong> 
                      These aren't just operational hiccups—they're revenue leaks caused by automation that can't understand human communication patterns.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">The 60/40 Split That Changes Everything</h2>
                    <p>
                      Through analyzing thousands of RevOps workflows at Gumloop, one clear pattern emerges. About 60% of business 
                      automation works exactly as intended—welcome email sequences fire on schedule, data syncs between systems cleanly, 
                      and reports generate without issues. These are the workflows worth keeping on traditional automation.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
                      <h3 className="font-medium text-blue-900 mb-2">Real Customer Success: TechCorp's Transformation</h3>
                      <p className="text-blue-800 text-sm">
                        TechCorp reduced automation costs by 73% after migrating from Zapier ($2,400/month → $650/month) 
                        while improving lead routing accuracy from 79% to 94% using AI-powered decision making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={prevStage}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="flex space-x-3">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Enhanced Version</span>
                </button>
                <button
                  onClick={nextStage}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2"
                >
                  <span>Finalize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStage === 'complete' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Enhanced Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your content has been significantly improved with AI-powered optimizations. 
                Projected performance increase: +115%
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">42 → 87</div>
                  <p className="text-sm text-gray-600">Content Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">+230%</div>
                  <p className="text-sm text-gray-600">Traffic Potential</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">+156%</div>
                  <p className="text-sm text-gray-600">CTR Improvement</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Key Improvements Applied</h4>
                <div className="text-left space-y-1 text-sm text-gray-700">
                  <div>• Rewritten with problem-focused hook targeting Monday morning pain</div>
                  <div>• Added TechCorp case study with 73% cost reduction proof</div>
                  <div>• Included 60/40 automation framework for clarity</div>
                  <div>• Optimized for "Zapier alternative" and "AI workflows" keywords</div>
                  <div>• Added structured data and FAQ sections for featured snippets</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Link href="/demo/content-studio">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Back to Studio
                  </button>
                </Link>
                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Publish Enhanced Content</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}