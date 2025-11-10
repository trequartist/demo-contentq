import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BrainDocument } from "@/data/mockData";
import { Upload, FileText, Loader2, CheckCircle2, Sparkles } from "lucide-react";

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete?: (document: BrainDocument) => void;
}

type ProcessingStage = "idle" | "uploading" | "extracting" | "categorizing" | "linking" | "complete";

const stageMessages = {
  idle: "",
  uploading: "Uploading document...",
  extracting: "Extracting content and insights...",
  categorizing: "Categorizing and tagging...",
  linking: "Creating connections to existing knowledge...",
  complete: "Processing complete!",
};

export function DocumentUploadModal({
  open,
  onOpenChange,
  onUploadComplete,
}: DocumentUploadModalProps) {
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState<BrainDocument["category"]>("Strategic Foundation");
  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const simulateUpload = async () => {
    if (!fileName) return;

    // Uploading stage
    setStage("uploading");
    setProgress(0);
    await animateProgress(0, 25, 800);

    // Extracting stage
    setStage("extracting");
    await animateProgress(25, 50, 1200);

    // Categorizing stage
    setStage("categorizing");
    await animateProgress(50, 75, 1000);

    // Linking stage
    setStage("linking");
    await animateProgress(75, 100, 1000);

    // Complete
    setStage("complete");
    
    // Create mock document
    const newDocument: BrainDocument = {
      id: `doc-${Date.now()}`,
      name: fileName,
      category,
      uploadedAt: new Date(),
      processed: true,
      active: true,
      summary: "AI-generated summary will appear here after processing",
      fileType: fileName.split(".").pop()?.toUpperCase() || "PDF",
      insights: [
        "Key insight extracted from document",
        "Another important finding",
        "Strategic recommendation identified",
      ],
      usedIn: [],
      relevanceScore: Math.floor(Math.random() * 20) + 80,
    };

    // Wait a moment then callback
    setTimeout(() => {
      if (onUploadComplete) {
        onUploadComplete(newDocument);
      }
      handleClose();
    }, 1500);
  };

  const animateProgress = (start: number, end: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * (end - start) + start, end);
        setProgress(progress);

        if (elapsed < duration) {
          requestAnimationFrame(updateProgress);
        } else {
          setProgress(end);
          resolve();
        }
      };
      requestAnimationFrame(updateProgress);
    });
  };

  const handleClose = () => {
    setFileName("");
    setCategory("Strategic Foundation");
    setStage("idle");
    setProgress(0);
    onOpenChange(false);
  };

  const isProcessing = stage !== "idle" && stage !== "complete";

  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Document
          </DialogTitle>
          <DialogDescription>
            Add documents to your Marketing Brain to enhance ContentQ's understanding of your business.
          </DialogDescription>
        </DialogHeader>

        {stage === "idle" && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.zip"
                />
              </div>
              {fileName && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {fileName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as BrainDocument["category"])}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strategic Foundation">Strategic Foundation</SelectItem>
                  <SelectItem value="Content Strategy">Content Strategy</SelectItem>
                  <SelectItem value="Product Knowledge">Product Knowledge</SelectItem>
                  <SelectItem value="Market Intelligence">Market Intelligence</SelectItem>
                  <SelectItem value="Brand Assets">Brand Assets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={simulateUpload}
              disabled={!fileName}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload & Process
            </Button>
          </div>
        )}

        {(isProcessing || stage === "complete") && (
          <div className="space-y-6 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{stageMessages[stage]}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {stage === "complete" ? (
              <div className="text-center py-4">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm font-medium">Document processed successfully!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your Marketing Brain has been updated
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI agents are processing your document...</span>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
