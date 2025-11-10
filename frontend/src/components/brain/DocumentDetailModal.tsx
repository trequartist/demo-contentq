import { BrainDocument } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Calendar,
  Power,
  TrendingUp,
  ExternalLink,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useDemoStore } from "@/stores/demoStore";
import { toast } from "sonner";

interface DocumentDetailModalProps {
  document: BrainDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleActive?: (docId: string) => void;
}

export function DocumentDetailModal({
  document,
  open,
  onOpenChange,
  onToggleActive,
}: DocumentDetailModalProps) {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                {document.name}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {document.summary}
              </DialogDescription>
            </div>
            <Badge
              variant={document.active ? "default" : "outline"}
              className="shrink-0"
            >
              {document.active ? (
                <>
                  <Power className="mr-1 h-3 w-3" />
                  Active
                </>
              ) : (
                "Inactive"
              )}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium mt-1">{document.category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">File Type</p>
              <p className="font-medium mt-1">{document.fileType || "PDF"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Uploaded</p>
              <p className="font-medium mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(document.uploadedAt, { addSuffix: true })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Relevance Score</p>
              <p className="font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {document.relevanceScore || 85}%
              </p>
            </div>
          </div>

          <Separator />

          {/* AI Insights */}
          {document.insights && document.insights.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                AI-Extracted Insights
              </h3>
              <ul className="space-y-2">
                {document.insights.map((insight, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Usage Information */}
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <ExternalLink className="h-4 w-4 text-primary" />
              Used In ({document.usedIn?.length || 0})
            </h3>
            {document.usedIn && document.usedIn.length > 0 ? (
              <div className="space-y-2">
                {document.usedIn.map((usage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {usage.itemName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {usage.module} •{" "}
                        {formatDistanceToNow(usage.lastUsed, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      {usage.module}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                This document hasn't been used in any content yet.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {onToggleActive && (
              <Button
                onClick={() => onToggleActive(document.id)}
                variant={document.active ? "outline" : "default"}
                className="flex-1"
              >
                <Power className="mr-2 h-4 w-4" />
                {document.active ? "Deactivate" : "Activate"}
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <ExternalLink className="mr-2 h-4 w-4" />
              Use in Content
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
