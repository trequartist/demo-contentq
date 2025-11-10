import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, TrendingUp, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StreamCardProps {
  name: string;
  stream: 'competitors' | 'trends' | 'conversations';
  findingsCount: number;
  lastUpdated: Date;
  recentFindings: string[];
  onExplore: () => void;
}

const streamIcons = {
  competitors: AlertCircle,
  trends: TrendingUp,
  conversations: Users,
};

const streamColors = {
  competitors: 'text-red-500',
  trends: 'text-blue-500',
  conversations: 'text-green-500',
};

export function StreamCard({ name, stream, findingsCount, lastUpdated, recentFindings, onExplore }: StreamCardProps) {
  const Icon = streamIcons[stream];
  
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className={streamColors[stream] + " h-5 w-5"} />
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge variant="secondary">
            {findingsCount} findings
          </Badge>
        </div>
        <CardDescription>
          Last updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Recent Findings:</p>
          <ul className="space-y-1.5">
            {recentFindings.slice(0, 3).map((finding, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={onExplore} className="w-full gap-2">
          Explore Stream
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
