import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ResearchFinding } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useDemoStore } from "@/stores/demoStore";
import { toast } from "sonner";

interface FindingCardProps {
  finding: ResearchFinding;
}

const importanceColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function FindingCard({ finding }: FindingCardProps) {
  const navigate = useNavigate();
  const setContext = useDemoStore(s => s.setContext);
  
  const handleCreateContent = () => {
    // Set cross-module context
    setContext({
      source: 'research',
      sourceId: finding.id,
      title: finding.title,
      description: finding.summary,
      data: finding
    });
    
    // Show success toast
    toast.success('Context loaded from research', {
      description: 'Creating content with research insights'
    });
    
    // Navigate to Studio
    navigate('/studio');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={importanceColors[finding.importance]} variant="secondary">
                {finding.importance}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(finding.date, { addSuffix: true })}
              </span>
            </div>
            <CardTitle className="text-base">{finding.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm">
          {finding.summary}
        </CardDescription>
        
        {finding.source && (
          <a
            href={finding.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View source
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={handleCreateContent} className="gap-1">
            <Sparkles className="h-3 w-3" />
            Create Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
