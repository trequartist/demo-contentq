import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  MessageSquare,
  Sparkles,
  Plus,
  X,
  Save,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/stores/demoStore";
import { mockFoundationStrategy } from "@/data/mockData";
import { strategySuggestions, type FoundationStrategyData, emptyFoundationStrategy } from "@/data/strategyData";
import { toast } from "sonner";

export function FoundationStrategy() {
  const { brainDocuments, addDocument } = useDemoStore();
  
  // Check if foundation already exists in brain
  const existingFoundation = brainDocuments.find(doc => 
    doc.category === 'Strategic Foundation' && doc.name === 'Foundation Strategy'
  );
  
  const [strategy, setStrategy] = useState<FoundationStrategyData>(
    existingFoundation ? mockFoundationStrategy : emptyFoundationStrategy
  );
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);

  const updateField = (section: keyof FoundationStrategyData, field: string, value: any) => {
    setStrategy(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addArrayItem = (section: keyof FoundationStrategyData, field: string) => {
    setStrategy(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] as string[]), ''],
      },
    }));
  };

  const removeArrayItem = (section: keyof FoundationStrategyData, field: string, index: number) => {
    setStrategy(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section][field] as string[]).filter((_, i) => i !== index),
      },
    }));
  };

  const updateArrayItem = (section: keyof FoundationStrategyData, field: string, index: number, value: string) => {
    setStrategy(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section][field] as string[]).map((item, i) => i === index ? value : item),
      },
    }));
  };

  const applySuggestion = (section: keyof FoundationStrategyData, field: string, value: string) => {
    updateField(section, field, value);
    setShowSuggestions(null);
    toast.success("Suggestion applied");
  };

  const handleSave = () => {
    // Simulate saving to Marketing Brain
    const doc = {
      id: 'foundation-strategy',
      name: 'Foundation Strategy',
      category: 'Strategic Foundation' as const,
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: 'Complete strategic foundation including target customer, messaging, and positioning',
      fileType: 'Strategy',
    };
    
    addDocument(doc);
    toast.success("Foundation strategy saved to Marketing Brain!");
  };

  const hasContent = strategy.targetCustomer.who || strategy.messaging.primaryMessage || strategy.positioning.category;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Strategic Foundation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Define your target customer, messaging, and market positioning
          </p>
        </div>
        {hasContent && (
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save to Marketing Brain
          </Button>
        )}
      </div>

      {/* Target Customer Section */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Target Customer</CardTitle>
                <CardDescription>Who you're creating content for</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Required</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Who they are */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="who">Who they are</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setShowSuggestions(showSuggestions === 'who' ? null : 'who')}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            <Input
              id="who"
              value={strategy.targetCustomer.who}
              onChange={(e) => updateField('targetCustomer', 'who', e.target.value)}
              placeholder="e.g., B2B SaaS marketing leaders at mid-market companies"
            />
            {showSuggestions === 'who' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.targetCustomer.who.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => applySuggestion('targetCustomer', 'who', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Pain Points */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Pain Points</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  if (showSuggestions === 'painPoints') {
                    setShowSuggestions(null);
                  } else {
                    setShowSuggestions('painPoints');
                  }
                }}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            {strategy.targetCustomer.painPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => updateArrayItem('targetCustomer', 'painPoints', index, e.target.value)}
                  placeholder="What problem do they face?"
                />
                {strategy.targetCustomer.painPoints.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem('targetCustomer', 'painPoints', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => addArrayItem('targetCustomer', 'painPoints')}
            >
              <Plus className="h-3 w-3" />
              Add Pain Point
            </Button>
            {showSuggestions === 'painPoints' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.targetCustomer.painPoints.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      const emptyIndex = strategy.targetCustomer.painPoints.findIndex(p => !p);
                      if (emptyIndex !== -1) {
                        updateArrayItem('targetCustomer', 'painPoints', emptyIndex, suggestion);
                      } else {
                        addArrayItem('targetCustomer', 'painPoints');
                        setTimeout(() => {
                          updateArrayItem('targetCustomer', 'painPoints', strategy.targetCustomer.painPoints.length, suggestion);
                        }, 0);
                      }
                      toast.success("Pain point added");
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Goals */}
          <div className="space-y-2">
            <Label>Goals</Label>
            {strategy.targetCustomer.goals.map((goal, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={goal}
                  onChange={(e) => updateArrayItem('targetCustomer', 'goals', index, e.target.value)}
                  placeholder="What do they want to achieve?"
                />
                {strategy.targetCustomer.goals.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem('targetCustomer', 'goals', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => addArrayItem('targetCustomer', 'goals')}
            >
              <Plus className="h-3 w-3" />
              Add Goal
            </Button>
          </div>

          <Separator />

          {/* Decision Factors */}
          <div className="space-y-2">
            <Label>Decision Factors</Label>
            {strategy.targetCustomer.decisionFactors.map((factor, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={factor}
                  onChange={(e) => updateArrayItem('targetCustomer', 'decisionFactors', index, e.target.value)}
                  placeholder="What influences their buying decision?"
                />
                {strategy.targetCustomer.decisionFactors.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem('targetCustomer', 'decisionFactors', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => addArrayItem('targetCustomer', 'decisionFactors')}
            >
              <Plus className="h-3 w-3" />
              Add Decision Factor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messaging Section */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Messaging Hierarchy</CardTitle>
                <CardDescription>Core messages that drive your content</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Required</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primary Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="primary-message">Primary Message</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setShowSuggestions(showSuggestions === 'primaryMessage' ? null : 'primaryMessage')}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            <Textarea
              id="primary-message"
              value={strategy.messaging.primaryMessage}
              onChange={(e) => updateField('messaging', 'primaryMessage', e.target.value)}
              placeholder="Your main value proposition in one compelling sentence"
              rows={2}
            />
            {showSuggestions === 'primaryMessage' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.messaging.primaryMessage.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => applySuggestion('messaging', 'primaryMessage', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Value Proposition */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="value-prop">Value Proposition</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setShowSuggestions(showSuggestions === 'valueProp' ? null : 'valueProp')}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            <Textarea
              id="value-prop"
              value={strategy.messaging.valueProposition}
              onChange={(e) => updateField('messaging', 'valueProposition', e.target.value)}
              placeholder="Explain the unique value you provide"
              rows={3}
            />
            {showSuggestions === 'valueProp' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.messaging.valueProposition.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => applySuggestion('messaging', 'valueProposition', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Positioning Section */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Market Positioning</CardTitle>
                <CardDescription>How you stand out in the market</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="category">Category</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setShowSuggestions(showSuggestions === 'category' ? null : 'category')}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            <Input
              id="category"
              value={strategy.positioning.category}
              onChange={(e) => updateField('positioning', 'category', e.target.value)}
              placeholder="e.g., AI-Powered Content Marketing Platform"
            />
            {showSuggestions === 'category' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.positioning.category.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => applySuggestion('positioning', 'category', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Unique Angle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="unique-angle">Unique Angle</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setShowSuggestions(showSuggestions === 'uniqueAngle' ? null : 'uniqueAngle')}
              >
                <Sparkles className="h-3 w-3" />
                AI Assist
              </Button>
            </div>
            <Textarea
              id="unique-angle"
              value={strategy.positioning.uniqueAngle}
              onChange={(e) => updateField('positioning', 'uniqueAngle', e.target.value)}
              placeholder="What makes you different from competitors?"
              rows={2}
            />
            {showSuggestions === 'uniqueAngle' && (
              <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground">AI Suggestions:</p>
                {strategySuggestions.positioning.uniqueAngle.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => applySuggestion('positioning', 'uniqueAngle', suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Competitive Advantage */}
          <div className="space-y-2">
            <Label htmlFor="competitive-advantage">Competitive Advantage</Label>
            <Input
              id="competitive-advantage"
              value={strategy.positioning.competitiveAdvantage}
              onChange={(e) => updateField('positioning', 'competitiveAdvantage', e.target.value)}
              placeholder="Why customers choose you"
            />
          </div>

          <Separator />

          {/* Brand Voice */}
          <div className="space-y-2">
            <Label htmlFor="brand-voice">Brand Voice</Label>
            <Input
              id="brand-voice"
              value={strategy.positioning.brandVoice}
              onChange={(e) => updateField('positioning', 'brandVoice', e.target.value)}
              placeholder="e.g., Professional yet approachable, data-driven"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button (bottom) */}
      {hasContent && (
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save to Marketing Brain
          </Button>
        </div>
      )}
    </div>
  );
}
