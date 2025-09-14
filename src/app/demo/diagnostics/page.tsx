"use client";

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@/components/ui';
import { 
  Download,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  Brain,
  Sliders,
  Users as UsersIcon,
  BarChart3,
  Target,
  Database
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRegisterUIState } from '@/hooks/useRegisterUIState';

// Import all section components
import ExecutiveSummary from '@/components/demo/diagnostics/ExecutiveSummary';
import SearchIntelligence from '@/components/demo/diagnostics/SearchIntelligence';
import AIEngineOptimization from '@/components/demo/diagnostics/AIEngineOptimization';
import StrategicLeverage from '@/components/demo/diagnostics/StrategicLeverage';
import CompetitiveIntelligence from '@/components/demo/diagnostics/CompetitiveIntelligence';
import MarketIntelligence from '@/components/demo/diagnostics/MarketIntelligence';
import ActionableIntelligence from '@/components/demo/diagnostics/ActionableIntelligence';
import DataTransparency from '@/components/demo/diagnostics/DataTransparency';

const sections = [
  { id: 'executive', name: 'Executive Summary', icon: Home },
  { id: 'search', name: 'Search Intelligence', icon: Search },
  { id: 'ai', name: 'AI Engine Optimization', icon: Brain },
  { id: 'leverage', name: 'Strategic Leverage', icon: Sliders },
  { id: 'competitive', name: 'Competitive Intelligence', icon: UsersIcon },
  { id: 'market', name: 'Market Intelligence', icon: BarChart3 },
  { id: 'actionable', name: 'Actionable Intelligence', icon: Target },
  { id: 'transparency', name: 'Data Transparency', icon: Database }
];

export default function DiagnosticsPage() {
  const router = useRouter();
  const [diagnosticsData, setDiagnosticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // Register state setters with UI controller for AI control
  useRegisterUIState({
    setCurrentSection,
    setShowExportMenu
  });
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the new comprehensive diagnostics data
        const diagnosticsModule = await import('@/usableclientdata/data/diagnostics/diagnostics-gumloop-v2.json');
        setDiagnosticsData(diagnosticsModule.default?.data || null);
      } catch (error) {
        console.error('Failed to load diagnostics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleExportReport = (format: string) => {
    if (!diagnosticsData) return;
    
    if (format === 'json') {
      const dataStr = JSON.stringify(diagnosticsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `gumloop-diagnostic-report-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
    setShowExportMenu(false);
  };

  const navigateSection = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-purple-200 border-t-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm">Loading comprehensive diagnostic report...</p>
        </div>
      </div>
    );
  }

  if (!diagnosticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <div className="text-center">
          <p className="text-gray-500">No diagnostic data available</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (sections[currentSection].id) {
      case 'executive':
        return <ExecutiveSummary data={diagnosticsData} />;
      case 'search':
        return <SearchIntelligence data={diagnosticsData} />;
      case 'ai':
        return <AIEngineOptimization data={diagnosticsData} />;
      case 'leverage':
        return <StrategicLeverage data={diagnosticsData} />;
      case 'competitive':
        return <CompetitiveIntelligence data={diagnosticsData} />;
      case 'market':
        return <MarketIntelligence data={diagnosticsData} />;
      case 'actionable':
        return <ActionableIntelligence data={diagnosticsData} />;
      case 'transparency':
        return <DataTransparency data={diagnosticsData} />;
      default:
        return <ExecutiveSummary data={diagnosticsData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push('/demo/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Content Intelligence Report</h1>
                <p className="text-sm text-gray-500">
                  Analysis period: {diagnosticsData.analysis_period.start} to {diagnosticsData.analysis_period.end}
                </p>
              </div>
            </div>
            <div className="relative">
              <Button 
                variant="secondary"
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              {showExportMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                  {diagnosticsData.export_options.map((option: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleExportReport(option.format.toLowerCase().includes('json') ? 'json' : 'other')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      {option.format}
                      <span className="block text-xs text-gray-500">{option.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="sticky top-[73px] z-40 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              {sections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={currentSection === idx ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setCurrentSection(idx)}
                    className={currentSection === idx 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {section.name}
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateSection('prev')}
                disabled={currentSection === 0}
                className="p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600 px-2">
                {currentSection + 1} / {sections.length}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateSection('next')}
                disabled={currentSection === sections.length - 1}
                className="p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderSection()}
      </div>

      {/* Footer Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => navigateSection('prev')}
              disabled={currentSection === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentSection > 0 && sections[currentSection - 1].name}
            </Button>
            
            <div className="flex items-center gap-2">
              {sections.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentSection ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={() => navigateSection('next')}
              disabled={currentSection === sections.length - 1}
              className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
            >
              {currentSection < sections.length - 1 && sections[currentSection + 1].name}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}