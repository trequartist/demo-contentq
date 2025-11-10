import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowLeft, Sparkles, Save } from "lucide-react";
import { useDemoStore, useSimulateAgentWork } from "@/stores/demoStore";
import { contentPlays, mockGeneratedPlaybook, type ContentPlay } from "@/data/strategyData";
import { PlaybookCard } from "./PlaybookCard";
import { PlaybookDisplay } from "./PlaybookDisplay";
import { toast } from "sonner";

type WizardStep = 'select' | 'generate' | 'review';

export function PlaybookWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('select');
  const [selectedPlays, setSelectedPlays] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedPlaybook, setGeneratedPlaybook] = useState(mockGeneratedPlaybook);
  const { addDocument } = useDemoStore();
  const { simulateWork } = useSimulateAgentWork();

  const togglePlay = (playId: string) => {
    setSelectedPlays(prev => 
      prev.includes(playId) 
        ? prev.filter(id => id !== playId)
        : [...prev, playId]
    );
  };

  const filteredPlays = categoryFilter === 'all' 
    ? contentPlays 
    : contentPlays.filter(play => play.category === categoryFilter);

  const handleGenerate = async () => {
    if (selectedPlays.length === 0) {
      toast.error("Please select at least one content play");
      return;
    }

    setCurrentStep('generate');
    setIsGenerating(true);
    setProgress(0);

    // Simulate Strategist Agent working
    await simulateWork(
      'Strategist',
      'Analyzing selected plays and building strategy...',
      2000,
      'Evaluating content plays, mapping to business goals, and creating strategic framework.'
    );

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 60) {
          clearInterval(progressInterval);
          return 60;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(async () => {
      clearInterval(progressInterval);
      setProgress(70);

      // Simulate Copywriter Agent working
      await simulateWork(
        'Copywriter',
        'Creating content pillars and channel strategy...',
        2000,
        'Developing content themes, defining goals, and mapping distribution channels for maximum impact.'
      );

      const finalInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(finalInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(finalInterval);
        setProgress(100);
        setIsGenerating(false);
        
        // Update playbook with selected plays
        setGeneratedPlaybook({
          ...mockGeneratedPlaybook,
          selectedPlays,
          id: 'playbook-' + Date.now(),
          createdAt: new Date(),
        });

        setTimeout(() => {
          setCurrentStep('review');
        }, 500);
      }, 2000);
    }, 2000);
  };

  const handleSave = () => {
    addDocument({
      id: generatedPlaybook.id,
      name: generatedPlaybook.name,
      category: 'Content Strategy',
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: `Playbook with ${generatedPlaybook.contentPillars.length} pillars, ${generatedPlaybook.goals.length} goals, and ${generatedPlaybook.channelStrategy.length} channels`,
      fileType: 'Playbook',
    });
    
    toast.success("Playbook saved to Marketing Brain!");
  };

  const handleStartOver = () => {
    setCurrentStep('select');
    setSelectedPlays([]);
    setCategoryFilter('all');
    setProgress(0);
  };

  // Step 1: Select Plays
  if (currentStep === 'select') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Create Your Playbook</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select content plays that align with your goals. We recommend starting with 3-5 plays.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
            <TabsList>
              <TabsTrigger value="all">All ({contentPlays.length})</TabsTrigger>
              <TabsTrigger value="Awareness">
                Awareness ({contentPlays.filter(p => p.category === 'Awareness').length})
              </TabsTrigger>
              <TabsTrigger value="Consideration">
                Consideration ({contentPlays.filter(p => p.category === 'Consideration').length})
              </TabsTrigger>
              <TabsTrigger value="Decision">
                Decision ({contentPlays.filter(p => p.category === 'Decision').length})
              </TabsTrigger>
              <TabsTrigger value="Retention">
                Retention ({contentPlays.filter(p => p.category === 'Retention').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {selectedPlays.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {selectedPlays.length} selected
            </Badge>
          )}
        </div>

        {/* Content Plays Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlays.map(play => (
            <PlaybookCard
              key={play.id}
              play={play}
              selected={selectedPlays.includes(play.id)}
              onSelect={togglePlay}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedPlays.length === 0 
              ? "Select at least one content play to continue"
              : `${selectedPlays.length} play${selectedPlays.length > 1 ? 's' : ''} selected`
            }
          </p>
          <Button
            onClick={handleGenerate}
            disabled={selectedPlays.length === 0}
            size="lg"
            className="gap-2"
          >
            Generate Playbook
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
              {isGenerating ? "Generating your playbook..." : "Playbook ready!"}
            </span>
          </div>
          <p className="text-muted-foreground">
            {progress < 60 
              ? "Strategist Agent is analyzing your selected plays"
              : progress < 100
              ? "Copywriter Agent is creating content pillars and goals"
              : "Your playbook has been generated successfully"
            }
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="text-center text-sm text-muted-foreground">
              {progress}% complete
            </div>
          </CardContent>
        </Card>

        {!isGenerating && progress === 100 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Proceeding to review...
            </p>
          </div>
        )}
      </div>
    );
  }

  // Step 3: Review
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review Your Playbook</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your strategic content playbook is ready
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleStartOver}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Start Over
          </Button>
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save to Marketing Brain
          </Button>
        </div>
      </div>

      {/* Generated Playbook Display */}
      <PlaybookDisplay playbook={generatedPlaybook} />

      {/* Bottom Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={handleStartOver}>
          Create Another Playbook
        </Button>
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save to Marketing Brain
        </Button>
      </div>
    </div>
  );
}
