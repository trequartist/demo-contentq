import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContextIndicatorProps {
  source: "research" | "calendar" | "brain" | "strategy";
  title: string;
  description?: string;
  onRemove?: () => void;
  className?: string;
}

const sourceConfig = {
  research: {
    label: "From Research",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  calendar: {
    label: "Scheduled",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  brain: {
    label: "Using",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  strategy: {
    label: "From Playbook",
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  },
};

export function ContextIndicator({
  source,
  title,
  description,
  onRemove,
  className,
}: ContextIndicatorProps) {
  const config = sourceConfig[source];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border bg-card animate-fade-in",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className={cn("text-xs", config.color)}>
            {config.label}
          </Badge>
          <span className="text-sm font-medium truncate">{title}</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
