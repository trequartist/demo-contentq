import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChatTab } from "./ChatTab";
import { ResearchDialog } from "./ResearchDialog";
import { ContextDialog } from "./ContextDialog";
import { useDemoStore } from "@/stores/demoStore";

interface AssistantPanelProps {
  currentInput?: string;
  onInsertContent?: (content: string, position: "replace" | "append" | "prepend") => void;
  onUpdateInput?: (newValue: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "chat" | "research" | "context";
  metadata?: {
    sources?: any[];
    documents?: any[];
  };
}

interface ContextDocument {
  id: string;
  name: string;
  type: "pdf" | "docx" | "txt" | "md" | "image";
  size: string;
  uploadDate: string;
  active: boolean;
  tags?: string[];
}

export function AssistantPanel({ 
  currentInput, 
  onInsertContent,
  onUpdateInput 
}: AssistantPanelProps) {
  const navigate = useNavigate();
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contextDocs, setContextDocs] = useState<ContextDocument[]>([]);

  // Get active brain documents from demo store
  const { brainDocuments, activeBrainDocuments } = useDemoStore();
  const activeDocs = brainDocuments.filter(doc => activeBrainDocuments.includes(doc.id));
  
  const activeContextCount = contextDocs.filter((d) => d.active).length;

  const handleAddResearch = (result: { answer: string; sources: any[] }) => {
    const message: Message = {
      id: Date.now().toString(),
      role: "assistant",
      type: "research",
      content: result.answer,
      metadata: { sources: result.sources },
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleUploadDocuments = (files: File[]) => {
    const newDocs: ContextDocument[] = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: getFileType(file.name),
      size: formatFileSize(file.size),
      uploadDate: new Date().toLocaleDateString(),
      active: true,
      tags: ["recent"],
    }));

    setContextDocs((prev) => [...prev, ...newDocs]);

    const message: Message = {
      id: Date.now().toString(),
      role: "assistant",
      type: "context",
      content: `Added ${newDocs.length} document${newDocs.length !== 1 ? "s" : ""} to context`,
      metadata: { documents: newDocs },
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleToggleDocument = (id: string) => {
    setContextDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, active: !doc.active } : doc))
    );
  };

  const handleRemoveDocument = (id: string) => {
    setContextDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleClearAllDocuments = () => {
    setContextDocs([]);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">ContentQ AI Assistant</h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-b border-border px-4 py-3 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsResearchOpen(true)}
          className="gap-2 rounded-full border border-border hover:bg-accent"
        >
          <Search className="h-4 w-4" />
          Research
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsContextOpen(true)}
          className="gap-2 rounded-full border border-border hover:bg-accent relative"
        >
          <FileText className="h-4 w-4" />
          Context
          {activeContextCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {activeContextCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Context Indicator */}
      {activeContextCount > 0 && (
        <div className="px-4 py-2 bg-green-50 dark:bg-green-950/20 border-b border-green-200 dark:border-green-900">
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
            <FileText className="h-4 w-4" />
            <span className="font-medium">{activeContextCount} document{activeContextCount !== 1 ? "s" : ""} in context</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsContextOpen(true)}
              className="ml-auto h-7 text-xs"
            >
              Manage
            </Button>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatTab
          currentInput={currentInput}
          onInsertContent={onInsertContent}
          onUpdateInput={onUpdateInput}
          messages={messages}
          onMessagesChange={setMessages}
        />
      </div>

      {/* Dialogs */}
      <ResearchDialog
        open={isResearchOpen}
        onOpenChange={setIsResearchOpen}
        onAddToChat={handleAddResearch}
      />
      <ContextDialog
        open={isContextOpen}
        onOpenChange={setIsContextOpen}
        documents={contextDocs}
        onUpload={handleUploadDocuments}
        onToggle={handleToggleDocument}
        onRemove={handleRemoveDocument}
        onClearAll={handleClearAllDocuments}
      />
    </div>
  );
}

function getFileType(filename: string): "pdf" | "docx" | "txt" | "md" | "image" {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) return "image";
  if (ext === "pdf") return "pdf";
  if (ext === "docx" || ext === "doc") return "docx";
  if (ext === "txt") return "txt";
  if (ext === "md") return "md";
  return "txt";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
