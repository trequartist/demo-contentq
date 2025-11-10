import { useState } from "react";
import { FileText, Trash2, FileImage, File, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentUpload } from "./DocumentUpload";

interface ContextDocument {
  id: string;
  name: string;
  type: "pdf" | "docx" | "txt" | "md" | "image";
  size: string;
  uploadDate: string;
  active: boolean;
  tags?: string[];
}

interface ContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: ContextDocument[];
  onUpload: (files: File[]) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function ContextDialog({
  open,
  onOpenChange,
  documents,
  onUpload,
  onToggle,
  onRemove,
  onClearAll,
}: ContextDialogProps) {
  const activeCount = documents.filter((d) => d.active).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Context Documents
          </DialogTitle>
          <DialogDescription>
            Upload documents to include in your AI context
          </DialogDescription>
        </DialogHeader>

        <div className="px-6">
          <DocumentUpload onUpload={onUpload} />
        </div>

        {activeCount > 0 && (
          <div className="px-6 pt-4">
            <Card className="p-3 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {activeCount} document{activeCount !== 1 ? "s" : ""} in AI context
                </span>
              </div>
            </Card>
          </div>
        )}

        <ScrollArea className="flex-1 px-6 pb-6">
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No documents yet. Upload files to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <FileIcon type={doc.type} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • {doc.uploadDate}
                        </p>
                        {doc.tags && (
                          <div className="flex gap-1 mt-2">
                            {doc.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs h-5"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={doc.active}
                        onCheckedChange={() => onToggle(doc.id)}
                        aria-label="Include in AI context"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemove(doc.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>

        {documents.length > 0 && (
          <div className="p-6 pt-0 border-t border-border">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onClearAll}
                className="flex-1"
              >
                Clear All
              </Button>
              <Badge variant="secondary" className="h-9 px-3">
                {activeCount} active
              </Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FileIcon({ type }: { type: string }) {
  const iconClass = "h-10 w-10 text-muted-foreground";

  if (type === "image") {
    return <FileImage className={iconClass} />;
  }

  if (type === "pdf" || type === "docx") {
    return <FileText className={iconClass} />;
  }

  return <File className={iconClass} />;
}
