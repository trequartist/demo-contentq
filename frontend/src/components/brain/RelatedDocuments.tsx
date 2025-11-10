import { BrainDocument } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, FileText, ExternalLink, Power } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface RelatedDocumentsProps {
  documents: BrainDocument[];
  title?: string;
  maxItems?: number;
  onViewDocument?: (doc: BrainDocument) => void;
  compact?: boolean;
}

export function RelatedDocuments({
  documents,
  title = "Related Documents",
  maxItems = 5,
  onViewDocument,
  compact = false,
}: RelatedDocumentsProps) {
  const displayedDocs = documents.slice(0, maxItems);

  if (documents.length === 0) {
    return null;
  }

  return (
    <Card className={cn(compact && "border-0 shadow-none")}>
      <CardHeader className={cn("pb-3", compact && "px-0 pt-0")}>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          {title}
          <Badge variant="secondary" className="ml-auto">
            {documents.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("space-y-2", compact && "px-0 pb-0")}>
        {displayedDocs.map((doc) => (
          <div
            key={doc.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
              doc.active ? "bg-primary/5 border-primary/20" : "bg-muted/30",
              onViewDocument && "cursor-pointer hover:bg-muted/50"
            )}
            onClick={() => onViewDocument?.(doc)}
          >
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {doc.category} • {formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}
                  </p>
                </div>
                {doc.active && (
                  <Badge variant="outline" className="shrink-0">
                    <Power className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              {doc.summary && !compact && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {doc.summary}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {documents.length > maxItems && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
          >
            <ExternalLink className="mr-2 h-3 w-3" />
            View all {documents.length} documents
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
