import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, Sparkles, TrendingUp, Target, Zap, Volume2, Search, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkflowStore } from "@/stores/workflowStore";

interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

interface ContextDocument {
  id: string;
  name: string;
  type: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "chat" | "research" | "context";
  metadata?: {
    sources?: Source[];
    documents?: ContextDocument[];
  };
}

interface ChatTabProps {
  currentInput?: string;
  onInsertContent?: (content: string, position: "replace" | "append" | "prepend") => void;
  onUpdateInput?: (newValue: string) => void;
  messages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
}

export function ChatTab({ 
  currentInput, 
  onInsertContent, 
  onUpdateInput,
  messages: externalMessages = [],
  onMessagesChange
}: ChatTabProps) {
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const messages = externalMessages.length > 0 ? externalMessages : internalMessages;
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { isActive, currentStageIndex, stages } = useWorkflowStore();
  
  const currentStage = isActive && stages[currentStageIndex] ? stages[currentStageIndex] : undefined;
  const isInputStage = currentStage?.type === "input";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickActions = [
    { icon: Sparkles, label: "Improve this", action: "improve" },
    { icon: TrendingUp, label: "Add examples", action: "examples" },
    { icon: Target, label: "Suggest keywords", action: "keywords" },
    { icon: Zap, label: "Make it longer", action: "longer" },
    { icon: Volume2, label: "Change tone", action: "tone" },
  ];

  const handleQuickAction = (action: string) => {
    let prompt = "";
    switch (action) {
      case "improve":
        prompt = "Improve this content to make it more engaging and clear.";
        break;
      case "examples":
        prompt = "Add relevant examples to illustrate the key points.";
        break;
      case "keywords":
        prompt = "Suggest SEO keywords for this content.";
        break;
      case "longer":
        prompt = "Expand this content with more details and depth.";
        break;
      case "tone":
        prompt = "Suggest different tone variations for this content.";
        break;
    }
    
    if (currentInput) {
      handleSend(prompt);
    }
  };

  const handleSend = (customPrompt?: string) => {
    const messageText = customPrompt || input;
    if (!messageText.trim()) return;

    // If in input stage and no custom prompt, update the workflow input directly
    if (isInputStage && !customPrompt && onUpdateInput) {
      onUpdateInput(messageText);
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    const newMessages = [...messages, userMessage];
    if (onMessagesChange) {
      onMessagesChange(newMessages);
    } else {
      setInternalMessages(newMessages);
    }
    if (!customPrompt) setInput("");
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I can help you with that. ${isInputStage && currentInput ? `Based on your current input: "${currentInput.substring(0, 50)}..."` : ""} Here are my suggestions...`,
      };
      const newMessages = [...messages, assistantMessage];
      if (onMessagesChange) {
        onMessagesChange(newMessages);
      } else {
        setInternalMessages(newMessages);
      }
      setIsThinking(false);
    }, 1000);
  };

  const handleInsertMessage = (content: string) => {
    if (onInsertContent) {
      onInsertContent(content, "append");
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Input Stage Mode */}
      {isInputStage && (
        <div className="p-4 pb-0">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Share your content idea</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Type your topic, key ideas, or questions below
                  </div>
                </div>
              </div>
              {currentInput && (
                <div className="text-xs text-muted-foreground">
                  {currentInput.length} characters
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions - Only show when there's content */}
      {isInputStage && currentInput && currentInput.length > 50 && (
        <div className="p-4 pb-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction(action.action)}
                className="justify-start gap-2"
              >
                <action.icon className="h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 && !isInputStage && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-medium mb-2">How can I help you?</h3>
            <p className="text-sm text-muted-foreground">
              Ask me anything about your content workflow.
            </p>
          </div>
        )}
        
        {messages.length === 0 && isInputStage && !currentInput && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="mb-4 p-4 rounded-full bg-primary/10">
              <svg
                className="h-12 w-12 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Start typing your content idea</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your topic, key points, or questions below.
              <br />
              I'll help you create amazing content!
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge variant="secondary" className="text-xs">Blog posts</Badge>
              <Badge variant="secondary" className="text-xs">LinkedIn updates</Badge>
              <Badge variant="secondary" className="text-xs">Articles</Badge>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Research message type */}
              {message.type === "research" && (
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex items-start gap-3 p-4">
                    <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-2 text-sm">Research Results</h4>
                      <p className="text-sm leading-relaxed mb-3">{message.content}</p>
                      {message.metadata?.sources && message.metadata.sources.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {message.metadata.sources.map((source, i) => (
                            <div key={source.id} className="flex items-start gap-2 text-xs">
                              <Badge variant="secondary" className="shrink-0">[{i + 1}]</Badge>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                {source.title}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                      {onInsertContent && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInsertMessage(message.content)}
                          className="h-8 text-xs"
                        >
                          Insert into content
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Context message type */}
              {message.type === "context" && (
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-3 p-3">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{message.content}</p>
                      {message.metadata?.documents && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {message.metadata.documents.length} document(s) added
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Regular chat message */}
              {(!message.type || message.type === "chat") && (
                <div
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.role === "assistant" && onInsertContent && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleInsertMessage(message.content)}
                        className="mt-2 h-7 text-xs"
                      >
                        Insert into input
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg bg-muted p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isInputStage
                ? "Type your content idea here..."
                : "Ask me anything..."
            }
            className="min-h-[80px] resize-none"
            aria-label={isInputStage ? "Content input" : "Message assistant"}
            autoFocus={isInputStage}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            size="icon"
            className="h-[80px] w-[80px] shrink-0"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {isInputStage && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to save • Shift+Enter for new line
          </p>
        )}
      </div>
    </div>
  );
}

function MessageCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
