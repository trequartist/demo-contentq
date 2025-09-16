"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
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
  Database,
  FileText,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRegisterUIState } from '@/hooks/useRegisterUIState';
import { motion, AnimatePresence } from 'framer-motion';

// Import all section components
import ExecutiveSummary from '@/components/demo/diagnostics/ExecutiveSummary';
import SearchIntelligence from '@/components/demo/diagnostics/SearchIntelligence';
import AIDiscoverability from '@/components/demo/diagnostics/AIDiscoverability';
import AIEngineOptimization from '@/components/demo/diagnostics/AIEngineOptimization';
import StrategicLeverage from '@/components/demo/diagnostics/StrategicLeverage';
import CompetitiveIntelligence from '@/components/demo/diagnostics/CompetitiveIntelligence';
import MarketIntelligence from '@/components/demo/diagnostics/MarketIntelligence';
import ActionableIntelligence from '@/components/demo/diagnostics/ActionableIntelligence';
import DataTransparency from '@/components/demo/diagnostics/DataTransparency';

const sections = [
  { 
    id: 'executive', 
    name: 'Executive Summary', 
    icon: Home,
    description: 'High-level insights and key findings'
  },
  { 
    id: 'search', 
    name: 'Search Intelligence', 
    icon: Search,
    description: 'SEO analysis and search behavior patterns'
  },
  { 
    id: 'ai-discoverability', 
    name: 'AI Discoverability', 
    icon: Brain,
    description: 'LLM visibility and citation analysis'
  },
  { 
    id: 'ai', 
    name: 'AI Engine Optimization', 
    icon: Brain,
    description: 'Content optimization for AI understanding'
  },
  { 
    id: 'leverage', 
    name: 'Strategic Leverage', 
    icon: Sliders,
    description: 'Interactive strategy modeling'
  },
  { 
    id: 'competitive', 
    name: 'Competitive Intelligence', 
    icon: UsersIcon,
    description: 'Market positioning and competitor analysis'
  },
  { 
    id: 'market', 
    name: 'Market Intelligence', 
    icon: BarChart3,
    description: 'User behavior and market trends'
  },
  { 
    id: 'actionable', 
    name: 'Actionable Intelligence', 
    icon: Target,
    description: 'Strategic recommendations and next steps'
  },
  { 
    id: 'transparency', 
    name: 'Data & Methodology', 
    icon: Database,
    description: 'Data sources and confidence levels'
  }
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
    
    const dataStr = JSON.stringify(diagnosticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const filename = `gumloop-intelligence-report-${new Date().toISOString().split('T')[0]}.${format}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
    
    setShowExportMenu(false);
  };

  const navigateSection = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigateSection('prev');
    if (e.key === 'ArrowRight') navigateSection('next');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-light">Analyzing your content ecosystem...</p>
        </div>
      </div>
    );
  }

  if (!diagnosticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No diagnostic data available</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    const components = {
      executive: ExecutiveSummary,
      search: SearchIntelligence,
      'ai-discoverability': AIDiscoverability,
      ai: AIEngineOptimization,
      leverage: StrategicLeverage,
      competitive: CompetitiveIntelligence,
      market: MarketIntelligence,
      actionable: ActionableIntelligence,
      transparency: DataTransparency
    };
    
    const Component = components[sections[currentSection].id as keyof typeof components];
    return <Component data={diagnosticsData} />;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/demo/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              
              <div className="border-l border-gray-200 pl-6">
                <h1 className="text-2xl font-light text-gray-900">
                  Content Intelligence Report
                </h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Analysis period: {diagnosticsData.analysis_period.start} to {diagnosticsData.analysis_period.end}</span>
                </div>
              </div>
            </div>

            {/* Export Menu */}
            <div className="relative">
              <Button 
                variant="secondary"
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm font-medium transition-all"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              
              <AnimatePresence>
                {showExportMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-1 z-50 min-w-[240px]"
                  >
                    {diagnosticsData.export_options.map((option: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleExportReport(option.format.toLowerCase().includes('json') ? 'json' : option.format.toLowerCase())}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors group"
                      >
                        <div className="font-medium group-hover:text-gray-900">{option.format}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Premium Navigation */}
        <nav className="px-8 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-1 py-1 overflow-x-auto scrollbar-hide">
              {sections.map((section, idx) => {
                const Icon = section.icon;
                const isActive = currentSection === idx;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(idx)}
                    className={`
                      flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-sm whitespace-nowrap">{section.name}</div>
                      {isActive && (
                        <div className="text-xs text-gray-500 mt-0.5">{section.description}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-1 bg-gray-200 -mx-8 mt-1">
              <motion.div 
                className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1400px] mx-auto px-8 py-12"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elegant Footer Navigation */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateSection('prev')}
              disabled={currentSection === 0}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-lg transition-all
                ${currentSection === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Previous</div>
                {currentSection > 0 && (
                  <div className="font-medium text-sm">{sections[currentSection - 1].name}</div>
                )}
              </div>
            </button>
            
            {/* Section Dots */}
            <div className="flex items-center gap-3">
              {sections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSection(idx)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${idx === currentSection 
                      ? 'w-8 bg-purple-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                    }
                  `}
                />
              ))}
            </div>
            
            <button
              onClick={() => navigateSection('next')}
              disabled={currentSection === sections.length - 1}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-lg transition-all
                ${currentSection === sections.length - 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">Next</div>
                {currentSection < sections.length - 1 && (
                  <div className="font-medium text-sm">{sections[currentSection + 1].name}</div>
                )}
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}