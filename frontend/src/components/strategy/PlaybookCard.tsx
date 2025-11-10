import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Target, TrendingUp, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentPlay } from "@/data/strategyData";

interface PlaybookCardProps {
  play: ContentPlay;
  selected?: boolean;
  onSelect?: (id: string) => void;
  selectable?: boolean;
}

const categoryIcons = {
  Awareness: Target,
  Consideration: TrendingUp,
  Decision: ShoppingCart,
  Retention: Users,
};

const categoryColors = {
  Awareness: 'text-blue-500',
  Consideration: 'text-purple-500',
  Decision: 'text-green-500',
  Retention: 'text-orange-500',
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function PlaybookCard({ play, selected = false, onSelect, selectable = true }: PlaybookCardProps) {
  const Icon = categoryIcons[play.category];

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer",
        selected && "border-primary border-2 bg-primary/5",
        !selectable && "cursor-default"
      )}
      onClick={() => selectable && onSelect?.(play.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn("h-4 w-4", categoryColors[play.category])} />
              <Badge variant="outline" className="text-xs">
                {play.category}
              </Badge>
              {play.recommended && (
                <Badge variant="secondary" className="text-xs">
                  Recommended
                </Badge>
              )}
            </div>
            <CardTitle className="text-base flex items-center gap-2">
              {play.title}
              {selectable && (
                selected ? 
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> : 
                  <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {play.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge className={difficultyColors[play.difficulty]} variant="secondary">
              {play.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {play.timeToValue}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Best for:</p>
            <ul className="text-xs space-y-0.5">
              {play.bestFor.slice(0, 2).map((item, idx) => (
                <li key={idx} className="text-muted-foreground">• {item}</li>
              ))}
              {play.bestFor.length > 2 && (
                <li className="text-muted-foreground">• +{play.bestFor.length - 2} more</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
