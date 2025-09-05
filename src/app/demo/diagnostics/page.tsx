"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, ProgressBar } from '@/components/ui';
import { 
  TrendingUp, 
  AlertTriangle,
  CheckCircle, 
  ArrowRight,
  Search,
  Target,
  BarChart3,
  AlertCircle,
  Shield,
  Users,
  Zap,
  Brain,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  X,
  FileText,
  PlayCircle,
  CheckSquare
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRegisterUIState } from '@/hooks/useRegisterUIState';

export default function DiagnosticsPage() {
  const router = useRouter();
  const [diagnosticsData, setDiagnosticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('ai_visibility');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showFixModal, setShowFixModal] = useState(false);
  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | null>(null);
  const [actionProgress, setActionProgress] = useState<Record<string, boolean>>({});
  
  // Register state setters with UI controller for AI control
  useRegisterUIState({
    setShowFixModal,
    setShowImplementationModal,
    setExportFormat,
    setSelectedSection,
    setExpandedCard
  });
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const diagnosticsModule = await import('@/usableclientdata/data/diagnostics/diagnostics-gumloop.json');
        setDiagnosticsData(diagnosticsModule.default?.data || null);
      } catch (error) {
        console.error('Failed to load diagnostics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const getSeverityColor = (severity: string) => {
    const severityLower = severity?.toLowerCase() || '';
    if (severityLower === 'critical') return 'text-white bg-black';
    if (severityLower === 'high') return 'text-black bg-black/10 font-semibold';
    if (severityLower === 'medium') return 'text-black/70 bg-black/5';
    if (severityLower === 'low') return 'text-black/50 bg-white border border-black/20';
    return 'text-black/40 bg-white';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-black';
    if (score >= 60) return 'text-black/70';
    if (score >= 40) return 'text-black/50';
    return 'text-black/30';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-black';
    if (score >= 60) return 'bg-black/70';
    if (score >= 40) return 'bg-black/50';
    return 'bg-black/30';
  };

  // Export functionality
  const handleExportReport = (format: 'json' | 'csv') => {
    if (!diagnosticsData) return;
    
    if (format === 'json') {
      const dataStr = JSON.stringify(diagnosticsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `diagnostic-report-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'csv') {
      // Convert to CSV format
      const csvContent = generateCSVFromDiagnostics(diagnosticsData);
      const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);
      const exportFileDefaultName = `diagnostic-report-${new Date().toISOString().split('T')[0]}.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
    setExportFormat(null);
  };

  const generateCSVFromDiagnostics = (data: any) => {
    let csv = 'Section,Metric,Value,Status\n';
    
    // AI Visibility
    csv += `AI Visibility,Overall Score,${data.ai_visibility_overview.visibility_snapshot.overall_score},${data.ai_visibility_overview.visibility_snapshot.status}\n`;
    csv += `AI Visibility,Query Coverage,${data.ai_visibility_overview.visibility_snapshot.query_coverage},-\n`;
    
    // Blog Performance
    csv += `Performance Health,Content Strength,"${data.blog_performance_health.performance_snapshot.content_strength}",-\n`;
    csv += `Performance Health,Critical Weakness,"${data.blog_performance_health.performance_snapshot.critical_weakness}",-\n`;
    
    // Technical SEO
    csv += `Technical SEO,Overall Score,${data.technical_seo_foundation.technical_health.overall_score},-\n`;
    csv += `Technical SEO,Crawlability Score,${data.technical_seo_foundation.technical_health.crawlability_score},-\n`;
    
    // Competitive
    csv += `Competitive,Market Position,"${data.competitive_intelligence.market_position.your_position}",-\n`;
    csv += `Competitive,Market Leader,"${data.competitive_intelligence.market_position.market_leader}",-\n`;
    
    return csv;
  };

  const handleActionToggle = (actionId: string) => {
    setActionProgress(prev => ({
      ...prev,
      [actionId]: !prev[actionId]
    }));
  };

  const getCompletedActionsCount = () => {
    return Object.values(actionProgress).filter(Boolean).length;
  };

  interface ActionItem {
    id: string;
    title: string;
    priority: string;
    category: string;
    description: string;
  }

  const getAllActions = (): ActionItem[] => {
    if (!diagnosticsData) return [];
    
    const actions: ActionItem[] = [];
    
    // Add priority recommendations
    if (diagnosticsData.ai_visibility_overview?.priority_recommendations) {
      Object.values(diagnosticsData.ai_visibility_overview.priority_recommendations).forEach((rec: any) => {
        actions.push({
          id: rec.title,
          title: rec.title,
          priority: rec.priority,
          category: 'AI Visibility',
          description: rec.problem_citations
        });
      });
    }
    
    // Add technical fixes
    if (diagnosticsData.technical_seo_foundation?.immediate_technical_fixes) {
      diagnosticsData.technical_seo_foundation.immediate_technical_fixes.forEach((fix: any) => {
        actions.push({
          id: fix.action,
          title: fix.action,
          priority: 'High',
          category: 'Technical SEO',
          description: `${fix.current_metric} → ${fix.target_metric}`
        });
      });
    }
    
    // Add competitive actions
    if (diagnosticsData.competitive_intelligence?.immediate_actions) {
      diagnosticsData.competitive_intelligence.immediate_actions.forEach((action: string, idx: number) => {
        actions.push({
          id: `action-${idx}`,
          title: action,
          priority: 'Critical',
          category: 'Competitive',
          description: ''
        });
      });
    }
    
    return actions;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-black/20 border-t-black mx-auto"></div>
          <p className="mt-4 text-black/50 text-sm">Loading diagnostic report...</p>
        </div>
      </div>
    );
  }

  if (!diagnosticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-black/50">No diagnostic data available</p>
        </div>
      </div>
    );
  }

  const { 
    ai_visibility_overview,
    blog_performance_health,
    technical_seo_foundation,
    competitive_intelligence,
    executive_summary
  } = diagnosticsData;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-black">Content Diagnostic Report</h1>
              <p className="mt-1 text-sm text-black/40">
                Last updated: {new Date(diagnosticsData.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button 
                  variant="secondary"
                  className="text-sm border border-black/20 bg-white text-black hover:bg-black/5 transition-colors font-normal"
                  onClick={() => setExportFormat(exportFormat ? null : 'json')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                {exportFormat !== null && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-black/10 rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                    <button
                      onClick={() => handleExportReport('json')}
                      className="w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 rounded transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Export as JSON
                    </button>
                    <button
                      onClick={() => handleExportReport('csv')}
                      className="w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 rounded transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Export as CSV
                    </button>
                  </div>
                )}
              </div>
              <Button 
                className="bg-black text-white hover:bg-black/90 text-sm font-medium"
                onClick={() => setShowFixModal(true)}
                data-button-id="diagnostics.startFixing"
              >
                Start Fixing Issues
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Executive Summary */}
        <Card className="mb-8 border border-black/10 shadow-sm">
          <CardHeader className="border-b border-black/5 bg-black/[0.02]">
            <CardTitle className="text-lg font-medium text-black">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className={`text-3xl font-light ${getScoreColor(65.8)}`}>
                  65.8/100
                </div>
                <p className="text-xs text-black/40 mt-1 uppercase tracking-wider">Overall Health</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-black">
                  -$75K
                </div>
                <p className="text-xs text-black/40 mt-1 uppercase tracking-wider">Monthly MRR Loss</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-black">
                  35%
                </div>
                <p className="text-xs text-black/40 mt-1 uppercase tracking-wider">Query Coverage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-black">
                  78.5%
                </div>
                <p className="text-xs text-black/40 mt-1 uppercase tracking-wider">AI Visibility</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-black text-white rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white text-sm">Critical Threat</h4>
                    <p className="text-sm text-white/80 mt-1">
                      {ai_visibility_overview.visibility_snapshot.biggest_threat}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-black/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-black text-sm">Biggest Win</h4>
                    <p className="text-sm text-black/60 mt-1">
                      {ai_visibility_overview.visibility_snapshot.biggest_win}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-black/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-black/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-black text-sm">Market Context</h4>
                    <p className="text-sm text-black/60 mt-1">
                      {ai_visibility_overview.visibility_snapshot.market_context}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={selectedSection === 'ai_visibility' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedSection('ai_visibility')}
            className={selectedSection === 'ai_visibility' 
              ? 'bg-black text-white text-xs' 
              : 'bg-white text-black/60 border border-black/10 hover:border-black/20 hover:text-black text-xs'}
          >
            <Brain className="w-3 h-3 mr-2" />
            AI Visibility
          </Button>
          <Button
            variant={selectedSection === 'performance' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedSection('performance')}
            className={selectedSection === 'performance' 
              ? 'bg-black text-white text-xs' 
              : 'bg-white text-black/60 border border-black/10 hover:border-black/20 hover:text-black text-xs'}
          >
            <BarChart3 className="w-3 h-3 mr-2" />
            Performance Health
          </Button>
          <Button
            variant={selectedSection === 'technical' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedSection('technical')}
            className={selectedSection === 'technical' 
              ? 'bg-black text-white text-xs' 
              : 'bg-white text-black/60 border border-black/10 hover:border-black/20 hover:text-black text-xs'}
          >
            <Shield className="w-3 h-3 mr-2" />
            Technical SEO
          </Button>
          <Button
            variant={selectedSection === 'competitive' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedSection('competitive')}
            className={selectedSection === 'competitive' 
              ? 'bg-black text-white text-xs' 
              : 'bg-white text-black/60 border border-black/10 hover:border-black/20 hover:text-black text-xs'}
          >
            <Users className="w-3 h-3 mr-2" />
            Competitive Analysis
          </Button>
        </div>

        {/* AI Visibility Section */}
        {selectedSection === 'ai_visibility' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-black">AI Platform Visibility</h2>
            
            {/* Platform Performance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(ai_visibility_overview.platform_performance).map((platform: any, idx: number) => (
                <Card key={idx} className="border border-black/10 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{platform.platform}</CardTitle>
                      <Badge className={`text-xs ${platform.score < 30 ? 'bg-black/10 text-black' : 'bg-black/5 text-black/70'}`}>
                        {platform.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-black/40">Visibility Score</span>
                        <span className="text-sm font-medium text-black">{platform.score}</span>
                      </div>
                      <div className="w-full bg-black/5 rounded-full h-1.5">
                        <div className={`h-full rounded-full ${getProgressColor(parseInt(platform.score))}`} 
                             style={{width: `${platform.score}`}}></div>
                      </div>
                    </div>
                    <p className="text-xs text-black/60 mb-3">{platform.key_insight}</p>
                    <div>
                      <p className="text-xs font-medium text-black/80 mb-1">Major Gaps:</p>
                      <ul className="space-y-0.5">
                        {platform.major_gaps.slice(0, 3).map((gap: string, idx: number) => (
                          <li key={idx} className="text-xs text-black/50">• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Critical Gaps */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Critical Visibility Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.values(ai_visibility_overview.critical_gaps).map((gap: any, idx: number) => (
                    <div 
                      key={idx}
                      className="p-4 border-l-2 border-black/20 hover:bg-black/[0.02] cursor-pointer transition-colors"
                      onClick={() => setExpandedCard(expandedCard === gap.area ? null : gap.area)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-black text-sm">{gap.area}</h4>
                          <p className="text-sm text-black/50 mt-1">{gap.impact}</p>
                        </div>
                        {expandedCard === gap.area ? 
                          <ChevronUp className="w-4 h-4 text-black/30" /> : 
                          <ChevronDown className="w-4 h-4 text-black/30" />
                        }
                      </div>
                      {expandedCard === gap.area && (
                        <div className="mt-3 space-y-2 pl-4">
                          <div>
                            <span className="text-xs font-medium text-black/70">Current:</span>
                            <span className="text-xs text-black/50 ml-2">{gap.current_performance}</span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-black/70">Quick Win:</span>
                            <span className="text-xs text-black/50 ml-2">{gap.quick_win}</span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-black/70">Long-term:</span>
                            <span className="text-xs text-black/50 ml-2">{gap.long_term_strategy}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Priority Recommendations */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader className="border-b border-black/5">
                <CardTitle className="text-base font-medium">Priority Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {Object.values(ai_visibility_overview.priority_recommendations).map((rec: any, idx: number) => (
                    <div key={idx} className="p-4 bg-white border border-black/10 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-black text-sm">{rec.title}</h4>
                            <Badge className={getSeverityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-black/60 mb-3">{rec.problem_citations}</p>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs font-medium text-black/70">Business Case:</p>
                              <p className="text-xs text-black/50">{rec.business_case}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-black/70">Market Opportunity:</p>
                              <p className="text-xs text-black/50">{rec.market_opportunity}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-black/[0.03] rounded">
                            <p className="text-xs font-medium text-black/80">Risk of Inaction:</p>
                            <p className="text-xs text-black/60 mt-1">{rec.risk_of_inaction}</p>
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

        {/* Performance Health Section */}
        {selectedSection === 'performance' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-black">Content Performance Health</h2>
            
            {/* Performance Snapshot */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-black/70 mb-2">Content Strength:</p>
                    <p className="text-sm text-black/50">{blog_performance_health.performance_snapshot.content_strength}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-black/70 mb-2">Critical Weakness:</p>
                    <p className="text-sm text-black/60">{blog_performance_health.performance_snapshot.critical_weakness}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-black/[0.02] rounded-lg">
                  <p className="text-xs font-medium text-black/70 mb-2">Portfolio Distribution:</p>
                  <p className="text-sm text-black/50">{blog_performance_health.performance_snapshot.quality_distribution}</p>
                </div>
              </CardContent>
            </Card>

            {/* Funnel Stage Diagnosis */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Funnel Stage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(blog_performance_health.funnel_stage_diagnosis).map(([stage, data]: [string, any], idx: number) => (
                    <div key={idx} className="p-3 border-l-2 border-black/10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-black text-sm capitalize">
                          {stage.replace(/_/g, ' ')}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-black/40">{data.content_count} items</span>
                          <Badge className="bg-black/5 text-black/70 text-xs">
                            {data.avg_quality_score}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-black/50">{data.eeat_strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Health Alerts */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Critical Health Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blog_performance_health.content_health_alerts.map((alert: any, idx: number) => (
                    <div key={idx} className={`p-4 rounded-lg ${
                      alert.severity === 'CRITICAL' ? 'bg-black text-white' :
                      alert.severity === 'HIGH' ? 'bg-black/5 border border-black/10' :
                      'bg-white border border-black/10'
                    }`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          alert.severity === 'CRITICAL' ? 'text-white' : 'text-black/50'
                        }`} />
                        <div>
                          <h4 className={`font-medium text-sm ${alert.severity === 'CRITICAL' ? 'text-white' : 'text-black'}`}>
                            {alert.issue}
                          </h4>
                          <p className={`text-xs mt-1 ${alert.severity === 'CRITICAL' ? 'text-white/80' : 'text-black/60'}`}>
                            {alert.citations}
                          </p>
                          <p className={`text-xs mt-1 ${alert.severity === 'CRITICAL' ? 'text-white/60' : 'text-black/40'}`}>
                            Affects: {alert.affected_content_count}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Technical SEO Section */}
        {selectedSection === 'technical' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-black">Technical SEO Foundation</h2>
            
            {/* Technical Health Scores */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Technical Health Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/40">Overall</span>
                      <span className={`text-sm font-medium ${getScoreColor(technical_seo_foundation.technical_health.overall_score)}`}>
                        {technical_seo_foundation.technical_health.overall_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-black/5 rounded-full h-1.5">
                      <div className={`h-full rounded-full ${getProgressColor(technical_seo_foundation.technical_health.overall_score)}`} 
                           style={{width: `${technical_seo_foundation.technical_health.overall_score}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/40">Crawlability</span>
                      <span className={`text-sm font-medium ${getScoreColor(technical_seo_foundation.technical_health.crawlability_score)}`}>
                        {technical_seo_foundation.technical_health.crawlability_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-black/5 rounded-full h-1.5">
                      <div className={`h-full rounded-full ${getProgressColor(technical_seo_foundation.technical_health.crawlability_score)}`}
                           style={{width: `${technical_seo_foundation.technical_health.crawlability_score}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/40">Structure</span>
                      <span className={`text-sm font-medium ${getScoreColor(technical_seo_foundation.technical_health.structure_score)}`}>
                        {technical_seo_foundation.technical_health.structure_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-black/5 rounded-full h-1.5">
                      <div className={`h-full rounded-full ${getProgressColor(technical_seo_foundation.technical_health.structure_score)}`}
                           style={{width: `${technical_seo_foundation.technical_health.structure_score}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/40">Mobile</span>
                      <span className={`text-sm font-medium ${getScoreColor(technical_seo_foundation.technical_health.mobile_readiness_score)}`}>
                        {technical_seo_foundation.technical_health.mobile_readiness_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-black/5 rounded-full h-1.5">
                      <div className={`h-full rounded-full ${getProgressColor(technical_seo_foundation.technical_health.mobile_readiness_score)}`}
                           style={{width: `${technical_seo_foundation.technical_health.mobile_readiness_score}%`}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-black/[0.02] rounded">
                  <p className="text-sm text-black/60">{technical_seo_foundation.technical_health.status_summary}</p>
                </div>
              </CardContent>
            </Card>

            {/* Critical Technical Issues */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Critical Technical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technical_seo_foundation.critical_technical_issues.map((issue: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-black/10 rounded-lg">
                      <div>
                        <h4 className="font-medium text-black text-sm">{issue.issue}</h4>
                        <p className="text-xs text-black/50 mt-1">{issue.metric_value}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <p className="text-xs text-black/40 mt-1">{issue.seo_impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Immediate Fixes */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Immediate Technical Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technical_seo_foundation.immediate_technical_fixes.map((fix: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors">
                      <div>
                        <h4 className="font-medium text-black text-sm">{fix.action}</h4>
                        <p className="text-xs text-black/50 mt-1">
                          {fix.current_metric} → {fix.target_metric}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-black/70">{fix.expected_impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Competitive Analysis Section */}
        {selectedSection === 'competitive' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-black">Competitive Intelligence</h2>
            
            {/* Market Position */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-black/[0.03] rounded-lg">
                    <p className="text-xs font-medium text-black/80">Your Position</p>
                    <p className="text-sm text-black/60 mt-1">{competitive_intelligence.market_position.your_position}</p>
                  </div>
                  <div className="p-4 bg-white border border-black/10 rounded-lg">
                    <p className="text-xs font-medium text-black/80">Market Leader</p>
                    <p className="text-sm text-black/50 mt-1">
                      {competitive_intelligence.market_position.market_leader}: {competitive_intelligence.market_position.leader_advantage}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-black/10 rounded-lg">
                    <p className="text-xs font-medium text-black/80">Biggest Threat</p>
                    <p className="text-sm text-black/60 mt-1">
                      {competitive_intelligence.market_position.biggest_threat}: {competitive_intelligence.market_position.threat_reasoning}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitor Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {competitive_intelligence.competitor_analysis.map((competitor: any, idx: number) => (
                <Card key={idx} className="border border-black/10 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{competitor.competitor_name}</CardTitle>
                      <Badge className={`text-xs ${getSeverityColor(competitor.threat_level)}`}>
                        {competitor.threat_level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-black/40">AI Visibility</p>
                        <p className="text-sm font-medium text-black/80">{competitor.ai_visibility_score}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40">Content Velocity</p>
                        <p className="text-sm font-medium text-black/80">{competitor.content_velocity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40">Winning Strategy</p>
                        <p className="text-xs text-black/50">{competitor.winning_strategy}</p>
                      </div>
                      <div className="p-3 bg-black/[0.02] rounded">
                        <p className="text-xs font-medium text-black/70">Exploitable Weakness</p>
                        <p className="text-xs text-black/50 mt-1">{competitor.exploitable_weakness}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Strategic Recommendations */}
            <Card className="border border-black/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium">Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitive_intelligence.strategic_recommendations.map((rec: any, idx: number) => (
                    <div key={idx} className="p-4 border-l-2 border-black/20 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-black text-sm">{rec.recommendation}</h4>
                        <Badge className={`text-xs ${getSeverityColor(rec.priority_level)}`}>
                          {rec.priority_level}
                        </Badge>
                      </div>
                      <p className="text-sm text-black/60 mb-2">{rec.competitive_reasoning}</p>
                      <p className="text-xs font-medium text-black/80">Impact: <span className="font-normal text-black/60">{rec.business_impact}</span></p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Immediate Actions */}
        <Card className="mt-8 border border-black/10 shadow-sm">
          <CardHeader className="bg-black p-4 rounded-sm">
            <CardTitle className="text-white font-medium">Immediate Actions Required</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {competitive_intelligence?.immediate_actions?.map((action: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-black/10 rounded-lg hover:bg-black/[0.02] transition-colors group">
                  <Zap className="w-3 h-3 text-black/50 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-black/70">{action}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                className="bg-black text-white hover:bg-black/90 font-medium px-6"
                onClick={() => setShowImplementationModal(true)}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start Implementation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fix Issues Modal */}
      {showFixModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium text-black">Action Plan</h2>
                  <p className="text-sm text-black/50 mt-1">
                    {getCompletedActionsCount()} of {getAllActions().length} actions completed
                  </p>
                </div>
                <button 
                  onClick={() => setShowFixModal(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {getAllActions().map((action) => (
                  <div 
                    key={action.id}
                    className={`p-4 border rounded-lg transition-all ${
                      actionProgress[action.id] 
                        ? 'border-black bg-black/[0.02]' 
                        : 'border-black/10 bg-white hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleActionToggle(action.id)}
                        className={`mt-0.5 transition-colors ${
                          actionProgress[action.id] 
                            ? 'text-black' 
                            : 'text-black/30 hover:text-black/60'
                        }`}
                      >
                        <CheckSquare className={`w-5 h-5 ${
                          actionProgress[action.id] ? 'fill-current' : ''
                        }`} />
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-sm font-medium ${
                            actionProgress[action.id] 
                              ? 'text-black/50 line-through' 
                              : 'text-black'
                          }`}>
                            {action.title}
                          </h3>
                          <Badge className={getSeverityColor(action.priority)}>
                            {action.priority}
                          </Badge>
                          <Badge className="bg-white border border-black/20 text-black/60 text-xs">
                            {action.category}
                          </Badge>
                        </div>
                        {action.description && (
                          <p className={`text-xs ${
                            actionProgress[action.id] 
                              ? 'text-black/30' 
                              : 'text-black/50'
                          }`}>
                            {action.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-black/10 bg-black/[0.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-full bg-black/10 border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs text-black/50">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-black/50">3 team members assigned</span>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="secondary"
                    className="bg-white border border-black/20 text-black hover:bg-black/5"
                    onClick={() => router.push('/demo/playbook')}
                  >
                    Get AI Help
                  </Button>
                  <Button 
                    className="bg-black text-white hover:bg-black/90"
                    onClick={() => {
                      setShowFixModal(false);
                      router.push('/demo/content-studio/create');
                    }}
                  >
                    Start Creating Content
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Modal */}
      {showImplementationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium text-black">Implementation Roadmap</h2>
                  <p className="text-sm text-black/50 mt-1">30-60-90 Day Plan</p>
                </div>
                <button 
                  onClick={() => setShowImplementationModal(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* 30 Days */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                      30
                    </div>
                    <h3 className="font-medium text-black">First 30 Days - Quick Wins</h3>
                  </div>
                  <div className="pl-10 space-y-2">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Fix critical technical SEO issues</p>
                        <p className="text-xs text-black/40">Est. impact: +15% visibility</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Optimize top 10 performing pages</p>
                        <p className="text-xs text-black/40">Est. impact: +25% conversions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Launch AI visibility campaign</p>
                        <p className="text-xs text-black/40">Est. impact: +40% AI citations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 60 Days */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-sm font-medium">
                      60
                    </div>
                    <h3 className="font-medium text-black">Next 30 Days - Build Momentum</h3>
                  </div>
                  <div className="pl-10 space-y-2">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Implement content refresh program</p>
                        <p className="text-xs text-black/40">Est. impact: +35% organic traffic</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Launch competitive content strategy</p>
                        <p className="text-xs text-black/40">Est. impact: Win 20% market share</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 90 Days */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-medium">
                      90
                    </div>
                    <h3 className="font-medium text-black">Final 30 Days - Scale Impact</h3>
                  </div>
                  <div className="pl-10 space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Full AI-optimized content pipeline</p>
                        <p className="text-xs text-black/40">Est. impact: 3x content velocity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-black/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-black/70">Complete funnel optimization</p>
                      <p className="text-xs text-black/40">Est. impact: +30% potential growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-black text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Expected Impact</p>
                    <p className="text-xs text-white/70 mt-0.5">After 90 days of implementation</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light">+30% potential growth</p>
                    <p className="text-xs text-white/70">85% visibility score</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-black/10 bg-black/[0.02]">
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="secondary"
                  className="bg-white border border-black/20 text-black hover:bg-black/5"
                  onClick={() => {
                    const plan = "30-60-90 Day Implementation Plan\n\nFirst 30 Days:\n- Fix critical technical SEO issues\n- Optimize top 10 performing pages\n- Launch AI visibility campaign\n\n60 Days:\n- Implement content refresh program\n- Launch competitive content strategy\n\n90 Days:\n- Full AI-optimized content pipeline\n- Complete funnel optimization\n\nExpected Impact: +30% potential growth";
                    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(plan);
                    const linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', 'implementation-plan.txt');
                    linkElement.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Plan
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-black/90"
                  onClick={() => {
                    setShowImplementationModal(false);
                    setShowFixModal(true);
                  }}
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Begin Implementation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}