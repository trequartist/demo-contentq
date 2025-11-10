import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft, Sparkles, Save, CheckCircle2 } from "lucide-react";
import { useDemoStore, useSimulateAgentWork } from "@/stores/demoStore";
import { reportTypes, mockDiagnosticsReport, mockDeepDiveReport, mockSavedReports, type SavedReport } from "@/data/researchData";
import { toast } from "sonner";

type WizardStep = 'select' | 'generate' | 'review';

interface ReportBuilderProps {
  onClose: () => void;
}

export function ReportBuilder({ onClose }: ReportBuilderProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('select');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedReport, setGeneratedReport] = useState<SavedReport | null>(null);
  const { addDocument } = useDemoStore();
  const { simulateWork } = useSimulateAgentWork();
  
  const handleGenerate = async () => {
    if (!selectedType) return;
    
    const reportConfig = reportTypes.find(r => r.id === selectedType);
    if (!reportConfig) return;
    
    setCurrentStep('generate');
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate multiple agents working in parallel for diagnostics
    if (selectedType === 'diagnostics') {
      // Show 6 agents working
      const agents: Array<'Research' | 'Analyst' | 'Strategist' | 'Copywriter' | 'Editor'> = ['Research', 'Research', 'Analyst', 'Analyst', 'Strategist', 'Editor'];
      
      for (let i = 0; i < agents.length; i++) {
        await simulateWork(
          agents[i],
          `Analyzing ${reportConfig.sections[i]}...`,
          2000,
          `Deep analysis of ${reportConfig.sections[i]} with comprehensive data gathering and insight generation.`
        );
        setProgress(((i + 1) / agents.length) * 100);
      }
      
      setGeneratedReport(mockDiagnosticsReport);
    } else if (selectedType === 'deepdive') {
      await simulateWork('Analyst', 'Analyzing quarterly trends...', 3000);
      setProgress(33);
      await simulateWork('Research', 'Gathering competitive intelligence...', 3000);
      setProgress(66);
      await simulateWork('Strategist', 'Creating strategic recommendations...', 3000);
      setProgress(100);
      setGeneratedReport(mockDeepDiveReport);
    } else {
      await simulateWork('Research', 'Monitoring competitor activities...', 2500);
      setProgress(50);
      await simulateWork('Analyst', 'Analyzing market signals...', 2500);
      setProgress(100);
      setGeneratedReport(mockSavedReports[2]);
    }
    
    setIsGenerating(false);
    setTimeout(() => {
      setCurrentStep('review');
    }, 500);
  };
  
  const handleSave = () => {
    if (!generatedReport) return;
    
    addDocument({
      id: generatedReport.id,
      name: generatedReport.title,
      category: 'Market Intelligence',
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: generatedReport.summary,
      fileType: 'Report',
    });
    
    toast.success("Report saved to Marketing Brain!");
    onClose();
  };
  
  // Step 1: Select Report Type
  if (currentStep === 'select') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Commission New Report</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select the type of research report you need
          </p>
        </div>
        
        <div className="grid gap-4">
          {reportTypes.map(type => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedType === type.id ? 'border-primary border-2 bg-primary/5' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      {selectedType === type.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{type.duration}</Badge>
                  <Badge variant="outline">{type.agents} agents</Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Sections included:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {type.sections.slice(0, 4).map((section, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{section}</Badge>
                    ))}
                    {type.sections.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{type.sections.length - 4}</Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Best for: {type.bestFor}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!selectedType}
            size="lg"
            className="gap-2"
          >
            Generate Report
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  // Step 2: Generate
  if (currentStep === 'generate') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span className="text-xl font-semibold">
              {isGenerating ? "Generating your report..." : "Report ready!"}
            </span>
          </div>
          <p className="text-muted-foreground">
            {selectedType === 'diagnostics'
              ? `${Math.ceil(progress / (100 / 6))} of 6 agents analyzing your content`
              : 'Multiple agents are working in parallel'
            }
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Step 3: Review
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{generatedReport?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {generatedReport?.sections.length} sections • Generated just now
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setCurrentStep('select'); setSelectedType(null); }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save to Marketing Brain
          </Button>
        </div>
      </div>
      
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm">{generatedReport?.summary}</p>
        </CardContent>
      </Card>
      
      <ScrollArea className="h-[600px]">
        <div className="space-y-6 pr-4">
          {generatedReport?.sections.map((section, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">{section.content}</pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={() => { setCurrentStep('select'); setSelectedType(null); }}>
          Create Another Report
        </Button>
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save to Marketing Brain
        </Button>
      </div>
    </div>
  );
}
