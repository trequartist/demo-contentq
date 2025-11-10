import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Target, TrendingUp, Radio, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDemoStore } from "@/stores/demoStore";
import { toast } from "sonner";
import type { GeneratedPlaybook } from "@/data/strategyData";

interface PlaybookDisplayProps {
  playbook: GeneratedPlaybook;
}

export function PlaybookDisplay({ playbook }: PlaybookDisplayProps) {
  const navigate = useNavigate();
  const setContext = useDemoStore(s => s.setContext);

  const handleCreateContent = (pillar: any, topic?: string) => {
    setContext({
      source: 'strategy',
      sourceId: playbook.id || 'playbook-1',
      title: topic || pillar.name,
      description: `From ${playbook.name} - ${pillar.name} pillar`,
      data: { playbook, pillar, topic }
    });
    
    toast.success('Context loaded from playbook', {
      description: `Creating content for: ${pillar.name}`
    });
    
    navigate('/studio');
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold">{playbook.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Based on {playbook.selectedPlays.length} selected content plays
        </p>
      </div>

      {/* Content Pillars */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Content Pillars</CardTitle>
          </div>
          <CardDescription>
            Core themes that organize your content strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {playbook.contentPillars.map((pillar, idx) => (
              <Card key={idx} className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{pillar.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Topics:</p>
                  <div className="space-y-1">
                    {pillar.topics.map((topic, topicIdx) => (
                      <div key={topicIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Strategic Goals</CardTitle>
          </div>
          <CardDescription>
            Outcome-focused objectives with measurable targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playbook.goals.map((goal, idx) => (
              <div key={idx}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{goal.outcome}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Metric: {goal.metric}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {goal.target}
                  </Badge>
                </div>
                {idx < playbook.goals.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Strategy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-primary" />
            <CardTitle>Channel Strategy</CardTitle>
          </div>
          <CardDescription>
            Publishing plan and channel-specific focus areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playbook.channelStrategy.map((channel, idx) => (
              <div key={idx}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{channel.channel}</h4>
                    <Badge variant="outline">{channel.frequency}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focus: {channel.focus}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {channel.contentTypes.map((type, typeIdx) => (
                      <Badge key={typeIdx} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                {idx < playbook.channelStrategy.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
