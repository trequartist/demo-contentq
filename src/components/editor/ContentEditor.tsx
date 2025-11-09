import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Eye,
  Download,
  Share2,
  Sparkles,
  FileText,
  FileCode,
  Hash,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useWorkflowStore } from "@/stores/workflowStore";
import { useToast } from "@/hooks/use-toast";

export function ContentEditor() {
  const { editorTitle, editorContent, updateEditorTitle, updateEditorContent } = useWorkflowStore();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(true);
  const [content, setContent] = useState(editorContent || "");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Update word and character counts
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, "").trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setCharCount(text.length);
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (!isSaved) {
      const timer = setTimeout(() => {
        updateEditorContent(content);
        setIsSaved(true);
        toast({
          title: "Auto-saved",
          description: "Your content has been saved",
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaved, content, updateEditorContent, toast]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsSaved(false);
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const editorDiv = document.getElementById("rich-editor");
    if (editorDiv) {
      handleContentChange(editorDiv.innerHTML);
    }
  };

  const handleExport = (format: "markdown" | "html" | "text") => {
    let exportContent = "";
    let filename = `${editorTitle || "untitled"}`;
    let mimeType = "text/plain";

    switch (format) {
      case "markdown":
        exportContent = content.replace(/<[^>]*>/g, "");
        filename += ".md";
        mimeType = "text/markdown";
        break;
      case "html":
        exportContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${editorTitle || "Untitled"}</title>
</head>
<body>
  <h1>${editorTitle || "Untitled"}</h1>
  ${content}
</body>
</html>`;
        filename += ".html";
        mimeType = "text/html";
        break;
      case "text":
        exportContent = content.replace(/<[^>]*>/g, "");
        filename += ".txt";
        break;
    }

    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported successfully",
      description: `Content exported as ${format.toUpperCase()}`,
    });
  };

  const handleAICommand = (command: string) => {
    toast({
      title: "AI Feature",
      description: `${command} - Coming soon with AI integration`,
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Brief Header */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
        <Badge variant="outline" className="gap-1">
          <FileText className="h-3 w-3" />
          Brief
        </Badge>
        <span className="text-small text-muted-foreground">
          AI in Healthcare • 1,500-2,000 words • Target: 8 min read
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant={isSaved ? "success" : "secondary"} className="gap-1">
            {isSaved ? (
              <>
                <Check className="h-3 w-3" />
                Saved
              </>
            ) : (
              "Saving..."
            )}
          </Badge>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <Input
          placeholder="Untitled Document"
          value={editorTitle}
          onChange={(e) => {
            updateEditorTitle(e.target.value);
            setIsSaved(false);
          }}
          className="border-0 text-3xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Editor Toolbar */}
      <div className="sticky top-0 z-10 flex items-center gap-2 rounded-lg border border-border bg-card/95 p-2 backdrop-blur">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("bold")}
          >
            <strong>B</strong>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("italic")}
          >
            <em>I</em>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("underline")}
          >
            <u>U</u>
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("formatBlock", "<h1>")}
          >
            H1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("formatBlock", "<h2>")}
          >
            H2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("formatBlock", "<h3>")}
          >
            H3
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("insertUnorderedList")}
          >
            • List
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("insertOrderedList")}
          >
            1. List
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat("formatBlock", "<blockquote>")}
          >
            "
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        {/* AI Commands */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <Sparkles className="h-4 w-4" />
              AI
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleAICommand("Improve Writing")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Improve Writing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAICommand("Make Shorter")}>
              Shorten
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAICommand("Make Longer")}>
              Expand
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAICommand("Fix Grammar")}>
              Fix Grammar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAICommand("Change Tone: Professional")}>
              Tone: Professional
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAICommand("Change Tone: Casual")}>
              Tone: Casual
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAICommand("Change Tone: Friendly")}>
              Tone: Friendly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {wordCount} words • {charCount} characters
          </span>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div
          id="rich-editor"
          contentEditable
          className="prose prose-sm max-w-none min-h-[500px] focus:outline-none"
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
          suppressContentEditableWarning
        />
      </div>

      {/* Action Bar */}
      <div className="sticky bottom-0 flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSaved(true);
              toast({ title: "Draft saved" });
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("markdown")}>
                <Hash className="mr-2 h-4 w-4" />
                Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("html")}>
                <FileCode className="mr-2 h-4 w-4" />
                HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("text")}>
                <FileText className="mr-2 h-4 w-4" />
                Plain Text
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="mr-2 h-4 w-4" />
            SEO Check
          </Button>
          <Button variant="default" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
