import { useState } from "react";
import { Search, Loader2, ExternalLink, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

interface ResearchResult {
  answer: string;
  sources: Source[];
}

interface ResearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToChat: (result: ResearchResult) => void;
}

export function ResearchDialog({ open, onOpenChange, onAddToChat }: ResearchDialogProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: ResearchResult = {
        answer: `Based on research about "${query}", here are the key insights. This is a comprehensive answer that would come from the research API, providing detailed information about the topic with citations to reliable sources.`,
        sources: [
          {
            id: "1",
            title: "Industry Report 2024",
            url: "https://example.com/report",
            snippet: "Key findings from the latest industry analysis..."
          },
          {
            id: "2",
            title: "Expert Analysis",
            url: "https://example.com/analysis",
            snippet: "In-depth perspective from industry leaders..."
          },
          {
            id: "3",
            title: "Research Study",
            url: "https://example.com/study",
            snippet: "Academic research on the subject matter..."
          }
        ]
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const handleAddToChat = () => {
    if (result) {
      onAddToChat(result);
      onOpenChange(false);
      // Reset for next search
      setQuery("");
      setResult(null);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setQuery("");
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Research
          </DialogTitle>
          <DialogDescription>
            Search for information to enhance your content
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="What would you like to research?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSearch();
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6">
          {!result && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter a search query to start researching
              </p>
            </div>
          )}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Researching...</p>
            </div>
          )}
          
          {result && (
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-medium mb-2">Answer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.answer}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Sources</h4>
                <div className="space-y-2">
                  {result.sources.map((source, index) => (
                    <Card key={source.id} className="p-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="shrink-0">
                          [{index + 1}]
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium mb-1 truncate">
                            {source.title}
                          </h5>
                          <p className="text-xs text-muted-foreground mb-2">
                            {source.snippet}
                          </p>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            View source
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button onClick={handleAddToChat} className="w-full">
                Add to Chat
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
